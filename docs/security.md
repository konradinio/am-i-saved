# Security Document
## Am I Saved?

**Version:** 2.0.0 | **Created:** 2026-06-06 | **Updated:** 2026-06-13

---

## User Data Sensitivity

Spiritual assessment data is among the most sensitive personal data a user can share. It reveals beliefs, conscience, moral struggles, and faith practices.

**Principles:**
- Data is never shared publicly or sold
- Data is never used to train AI models without explicit consent
- Data is never embedded in email bodies — only secure download links
- All data is scoped to the authenticated user via Row Level Security
- Users must be able to delete their data (GDPR/privacy requirement — future milestone)

---

## Anonymous Assessment Model

The primary funnel requires no account creation. All assessment data is saved under an anonymous Supabase `auth.users` entry from the moment the user starts the questionnaire.

**How it works:**
- `startAnonymousSession()` calls `supabase.auth.signInAnonymously()` at assessment start
- Supabase creates a real `auth.users` row with `is_anonymous = true` and a stable `user_id`
- All `assessments` and `assessment_responses` rows are written under this `user_id`
- RLS policies use `auth.uid() = user_id` — this pattern works identically for anonymous and permanent users; no service-role bypass is needed for anonymous data access
- The anonymous session is maintained in a browser cookie via `@supabase/ssr`

**Data persistence risk:** If the user clears their browser cookies or switches devices before paying, their anonymous session is lost and assessment data cannot be recovered without email. This is a known limitation communicated to the user at assessment start. It is resolved at M7 when email is collected.

**Anonymous user cleanup:** Unconverted anonymous users (no `payments` row, `is_anonymous = true`, older than 30 days) will be purged by a scheduled cron job. Not yet implemented — deferred to a post-launch maintenance task.

---

## Anonymous-to-Email Account Conversion (M7+)

Account conversion occurs inside the Stripe webhook handler — not via a registration form. This is the primary conversion path.

**Conversion sequence (strict order):**

1. Verify `stripe-signature` header — abort if invalid
2. Parse `checkout.session.completed` event
3. Extract `user_id` from `session.metadata.user_id` (set server-side at checkout creation — not user-controllable)
4. Extract `customer_email` from `session.customer_email` (Stripe-validated during payment — more reliable than pre-checkout form input)
5. Call `supabase.auth.admin.updateUserById(userId, { email: customerEmail })` via service role client
   - Sets the email on the existing anonymous `auth.users` row
   - `is_anonymous` flag becomes `false`
   - No password is set
6. Insert row into `payments` table
7. Trigger Full Report generation

**Why `customer_email` from Stripe (not from the pre-checkout form):** The email the user typed in the pre-checkout form is used to pre-fill Stripe Checkout. The email Stripe returns in the webhook (`session.customer_email`) is what Stripe actually used during payment processing — it may differ if the user edited it inside Stripe Checkout. Using the Stripe-side email ensures the account email matches what Stripe has on record.

**Idempotency:** Before executing steps 5–7, check `payments` for an existing row with the same `stripe_payment_intent_id`. If found, return `200 OK` without re-running conversion logic. This prevents double-conversion on Stripe's at-least-once delivery of webhook events.

**`user_id` in Stripe metadata:** Set server-side when the checkout session is created. Stripe metadata is not user-editable after session creation. This value is trusted.

---

## Passwordless Magic-Link Authentication (M7+)

Users converted through the primary funnel have no password. Magic link is their only sign-in method.

**Sign-in flow:**
1. User visits `/login`, enters email, clicks "Send magic link"
2. `signInWithMagicLink()` Server Action calls `supabase.auth.signInWithOtp({ email })`
3. Supabase sends an email with a one-time token link
4. User clicks the link → `/auth/callback` exchanges the token for a session cookie
5. Session is set server-side via `@supabase/ssr`; `proxy.ts` refreshes it on every request

**Magic links in the report delivery email (M10):**
The report email contains a pre-generated magic link created server-side via `supabase.auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo: ... } })`. This gives the user one-click access to their report and account from any device without signing in separately.

**Magic link security properties:**
- Single-use: token is invalidated after first use
- Expiry: Supabase default is 1 hour (configurable in Supabase Dashboard)
- PKCE flow: Supabase uses PKCE by default with `@supabase/ssr`, preventing token interception
- Email link is not a session — it must be clicked to exchange for a session

**Security risk:** If a user loses access to their email account, they lose access to their Am I Saved? account. There is no alternative recovery mechanism for passwordless users. Acceptable risk at this price point and product category.

**Open redirect protection on magic link:** The `redirectTo` path in `supabase.auth.admin.generateLink()` is always a hardcoded internal path — never derived from user input.

---

## Stripe Webhook — Supabase Admin API Usage

The webhook handler at `POST /api/stripe/webhook` requires elevated Supabase permissions to convert anonymous accounts and write payment records.

**Admin API call:** `supabase.auth.admin.updateUserById(userId, { email })` requires the `SUPABASE_SERVICE_ROLE_KEY`. This key bypasses all RLS policies.

**Safeguards:**
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only — never exposed to client
- The webhook handler verifies `stripe-signature` BEFORE calling any Supabase Admin API. An unverified event is rejected immediately with no side effects.
- `user_id` is read from `session.metadata.user_id` — set server-side at checkout creation, not user-editable
- `customer_email` is read from `session.customer_email` — set by Stripe during payment, not from user input to our server
- Idempotency check prevents re-running admin API calls on duplicate webhook events
- Service role client (`createServiceClient()`) is instantiated only inside the webhook handler; not shared with client-side code

**What the admin API call does:** Updates one field (`email`) on one `auth.users` row identified by a server-set UUID. It cannot be used to affect other users' data because the `user_id` is validated against the payment session metadata.

---

## Email Typo and Delivery Risks

Email is collected without prior verification in the primary funnel. The user types their email before Stripe Checkout. Stripe may show this email during checkout, but does not validate deliverability.

**Risks:**
- User types an incorrect email → magic link never arrives → user cannot access account from another device
- User's current browser session still works (same anonymous cookie) until it expires
- If the Resend delivery fails (transient error, spam filter), the user still has on-screen access but cannot receive the magic link

**Mitigations implemented:**
- Email field shows the collected address before Stripe redirect: *"Your report will be sent to: [email]"* — allows user to correct it
- `/login` page allows any user to request a new magic link by entering their email — recovery path if the original link was missed or the email was wrong (Supabase will return an error if the email doesn't match an account)
- Email sending failure is logged but does not block report access
- "We also emailed you a copy" message is shown only after confirmed successful Resend delivery

**Explicit non-mitigation:** Email deliverability verification (MX record lookup, disposable email detection) is not implemented in MVP. Acceptable risk at $2.99 price point.

---

## Email Verification Strategy

The platform does not require email verification before payment. Email is verified implicitly:

1. The user provides an email before Stripe Checkout
2. Stripe displays this email during checkout (the user sees it; this is a soft confirmation)
3. The report is shown on-screen immediately after payment — the user does not depend on email to see their report
4. The magic link email is sent after the PDF is ready — if the email is wrong, the user still has their report in the current session
5. If the user wants access from another device and has the wrong email, they must contact support

**Future consideration:** Optional "confirm your email" step between email entry and Stripe Checkout redirect. Not implemented in MVP.

---

## AI Privacy Considerations

- All OpenAI API calls are server-side only
- User assessment data sent to OpenAI is used for generation only (not training under enterprise terms)
- Prompt versioning ensures auditability of what was sent
- AI output must always include a disclaimer that it is not a judgment of the soul
- The `SPIRITUAL_SAFETY_GUARDRAIL` string is injected into every AI prompt
- AI must NEVER declare: saved, unsaved, destined for heaven, destined for hell
- Prompt engineering logs should be monitored for guardrail violations

---

## Sensitive Assessment Data Protection

Spiritual assessment data (beliefs, conscience examination, moral struggles) is treated with the highest data sensitivity level.

**At rest:**
- Stored in Supabase PostgreSQL, hosted in the EU or US region (select region during Supabase project creation)
- RLS ensures no cross-user data access at the database layer
- `assessment_responses` are immutable: no UPDATE or DELETE policy exists for any user, including the owner

**In transit:**
- All connections use TLS (Supabase and Vercel enforce HTTPS)
- No assessment data passes through the browser in unencrypted form

**In AI prompts:**
- Assessment answers are included in structured prompt fields only — never concatenated raw into a prompt string
- Zod-validated before use in AI prompts
- OpenAI is called with enterprise API terms (no training on API data)

**In PDF:**
- Assessment answers are included in the Full Report PDF
- PDF is stored in a private Supabase Storage bucket (`reports`)
- PDF file path includes the user's UUID: `reports/{user_id}/{assessment_id}.pdf`
- No public access URL exists — only signed time-limited URLs

**In email:**
- Assessment content is NEVER included in the email body
- Only signed Supabase Storage URLs (PDF download links) and magic links are sent
- If a signed URL is forwarded by the user, the recipient can download the PDF — acceptable; this is the user's choice

---

## PDF Access Security

PDF reports are stored in a private Supabase Storage bucket and are not publicly accessible.

**Storage bucket:** `reports` — private bucket, created manually in Supabase Dashboard before running migration 008.

**Storage RLS policy:**
```sql
-- Users can only access files in their own UUID folder
(storage.foldername(name))[1] = auth.uid()::text
```
This means a user at `/account` can only request signed URLs for files at `reports/{their_uuid}/*`. Other users' PDFs are inaccessible.

**Service role uploads:** The PDF generation API route uses `createServiceClient()` (service role key) to upload to Storage, bypassing RLS. Service role is server-side only. The upload path is always `reports/{user_id}/{assessment_id}.pdf` where both values are server-derived, not user-supplied.

**`report_files` table:** Stores `storage_path` only (`reports/{user_id}/{assessment_id}.pdf`). The URL is never stored — it is always generated fresh on request. This ensures expired links cannot be reused from the database.

---

## Signed URL Strategy

Signed URLs provide time-limited, authenticated access to private Supabase Storage objects.

**Implementation:**
- Generated on-demand when the user clicks "Download PDF" on the report page
- Generated server-side using `supabase.storage.from('reports').createSignedUrl(path, expirySeconds)`
- Expiry: **48 hours** (1 hour would be too short given the email delivery use case)
- Not stored in any database table — generated fresh per request
- If a signed URL is shared or leaked, it remains valid until expiry; after expiry it is permanently invalid with no recourse needed

**Why not permanent URLs:** Permanent URLs for sensitive spiritual data would allow indefinite access if leaked (e.g., forwarded link). Time-limited URLs bound the exposure window.

**Why 48 hours (not 24):** The report delivery email may arrive hours after payment and may be read on a different day. 24 hours risks the download link expiring before the user acts on the email. 48 hours is sufficient for prompt action while still bounding the exposure window.

---

## Stripe Security Principles

- Stripe secret key (`STRIPE_SECRET_KEY`) is server-side only — never exposed to browser
- Stripe publishable key (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) is safe for client
- Stripe webhooks MUST be verified with `STRIPE_WEBHOOK_SECRET` before any processing — this is the first operation in the webhook handler, before any Supabase calls
- Raw request body (`req.text()`) must be used for signature verification — no JSON parsing before `stripe.webhooks.constructEvent()`
- Payment status is ONLY updated via verified webhook events — never via client claims
- Checkout sessions are created server-side and validated server-side
- `user_id` placed in Stripe `metadata` at checkout session creation (server-side) — not user-editable
- Idempotency: check `payments.stripe_payment_intent_id` before processing to prevent duplicate payment records and duplicate account conversions
- Stripe webhook handler calls `supabase.auth.admin.updateUserById()` — requires `SUPABASE_SERVICE_ROLE_KEY`; this call is gated behind signature verification

---

## Authentication Security (M2+)

### Session Management

- Supabase session cookies are set and refreshed server-side via `@supabase/ssr`
- `proxy.ts` calls `supabase.auth.getUser()` on every request to refresh the session token
- Sessions are verified server-side via `requireUser()` — client-side auth state is never trusted
- The service role key (`SUPABASE_SERVICE_ROLE_KEY`) bypasses RLS — used only in server-side admin operations, never in the browser

### Anonymous Session Security

- Anonymous sessions are real Supabase auth sessions with cookies managed by `@supabase/ssr`
- `is_anonymous = true` is a server-side flag on `auth.users` — clients cannot modify it
- RLS treats anonymous users identically to permanent users: `auth.uid() = user_id` applies to both
- Anonymous sessions persist in browser cookies; no server-side session list exists to enumerate them
- An attacker who obtains an anonymous session cookie can read that user's assessment data — same risk as any session cookie theft; mitigated by HTTPS and cookie security attributes

### Open Redirect Protection

The `?redirect=` query parameter on `/login` is validated before use:
```ts
const safePath = redirectTo.startsWith("/") ? redirectTo : "/account";
```
This prevents an attacker from using the login page to redirect users to external phishing sites.

### Screenshot Blocking

Screenshot and screen recording cannot be reliably blocked in a web application.
Browser developer tools, OS-level screen capture, and third-party capture software
all bypass any client-side prevention attempts. **This feature will NOT be implemented.**
Users are warned that the platform cannot protect against external recording.

### Next.js 16 Proxy vs Middleware

`middleware.ts` is deprecated in Next.js 16. The file is now `proxy.ts`.
Creating a `middleware.ts` file would silently do nothing in v16, leaving routes unprotected.
This project uses only `src/proxy.ts`. Do not create `src/middleware.ts`.

---

## Row Level Security (M3 — Complete)

Row Level Security is ENABLED on all 13 tables created in M3. No table has a public read policy.

**RLS pattern:** `auth.uid() = user_id` covers both anonymous (`is_anonymous = true`) and permanent users. Anonymous users have a stable `user_id` — RLS works identically for both account types without any service-role bypass.

**User-owned tables (full CRUD):**
- `assessments`: SELECT/INSERT/UPDATE by owner
- `assessment_action_plans`: ALL by owner
- `conscience_sessions`: SELECT/INSERT/UPDATE by owner
- `conscience_action_plans`: ALL by owner
- `chart_snapshots`: SELECT/INSERT/UPDATE by owner

**Immutable user tables (no UPDATE/DELETE policy):**
- `assessment_responses`: SELECT/INSERT only — responses cannot be modified after submission
- `conscience_responses`: SELECT/INSERT only — responses cannot be modified after submission

**Service-role-only writes (clients cannot INSERT or UPDATE):**
- `ai_reports`: SELECT by owner; INSERT/UPDATE by service role (AI generation)
- `report_files`: SELECT by owner; INSERT by service role (PDF generation)
- `payments`: SELECT by owner; INSERT/UPDATE by service role (Stripe webhook)
- `gift_codes`: SELECT by purchaser OR redeemed_by; writes by service role
- `coaching_sponsorships`: SELECT by sponsor OR recipient; writes by service role

**Trigger-only INSERT (no client INSERT policy):**
- `profiles`: Created automatically by `handle_new_user()` trigger (SECURITY DEFINER)

**RLS assumption — user_id integrity:** RLS assumes `auth.uid()` correctly identifies the session owner. This assumption holds as long as:
1. Session cookies are not stolen (HTTPS required in production)
2. `auth.uid()` cannot be spoofed (guaranteed by Supabase — the JWT is signed with the project's JWT secret)
3. No row is inserted with a `user_id` other than `auth.uid()` (enforced by INSERT policies)

**Storage RLS:**
- Bucket `reports` (private): Users can SELECT files where the first path component equals their UUID
- Service role bypasses RLS entirely for PDF uploads

**ON DELETE behavior:**
- CASCADE: profiles, assessments, assessment_responses, ai_reports, chart_snapshots, assessment_action_plans, conscience_sessions, conscience_responses, conscience_action_plans
- RESTRICT: payments, report_files, gift_codes, coaching_sponsorships (prevent data loss on user delete)

---

## Secret Management Rules

1. **Never** commit `.env.local` or any file containing real API keys
2. **Never** hardcode secrets in source code
3. **Never** log secrets to console (even in development)
4. All secrets live in `.env.local` locally and Vercel Environment Variables in production
5. `.env.example` is the only env file committed — it contains no real values
6. Rotate keys immediately if accidentally committed
7. Use separate Stripe API keys for test and production environments
8. Use separate Supabase projects for development and production

---

## GitHub Security Guidelines

1. Enable branch protection on `main`
2. Require pull request reviews before merging
3. Enable Dependabot for dependency vulnerability alerts
4. Enable secret scanning on the repository
5. Never force-push to `main`
6. Review all dependencies before adding them

---

## Rate Limiting (Required Before Production Launch)

Rate limiting must be implemented before production launch on:
- `/api/ai/generate-summary` — prevent OpenAI cost abuse
- `/api/ai/generate-full-report` — prevent OpenAI cost abuse
- `/api/stripe/create-checkout-session` — prevent checkout spam; consider per-IP + per-assessment limits
- `/api/email/send-report` — prevent email abuse
- `/api/pdf/generate` — prevent PDF generation abuse
- Auth endpoints — prevent brute-force magic link requests

Recommended: Vercel's built-in rate limiting or Upstash Redis with `@upstash/ratelimit`.

**Anonymous user rate limiting note:** Anonymous users do not have a persistent identity beyond their session cookie. Rate limiting anonymous API calls must be done by IP address or by assessment ID, not by user ID.

---

## Input Sanitization

All user input must be validated with Zod at every API boundary. No raw user input should be passed to:
- OpenAI prompts (inject into structured prompt fields only)
- SQL queries (use Supabase client parameterized queries only)
- Email content (strip HTML)
- PDF content (validate before rendering)

**Email address input (M7):** The email collected before Stripe Checkout is validated with Zod `emailSchema` (RFC-compliant format check). It is displayed back to the user for confirmation before submission. It is NOT used directly for the account conversion — the webhook uses `session.customer_email` from Stripe instead.

---

## Future Production Security Considerations

The following are not implemented in MVP but are required before or shortly after public launch:

| Item | Priority | Notes |
|---|---|---|
| Rate limiting on all AI and email endpoints | High | Must ship before launch |
| Anonymous user cleanup cron job | High | Purge `is_anonymous` users >30 days with no payment |
| Email typo recovery flow | Medium | Allow user to update email from account page if magic link never arrived |
| GDPR right to erasure | Medium | User-initiated account + data deletion |
| Supabase Auth email templates branded | Medium | Replace Supabase default magic link email template with branded version |
| Signed URL expiry monitoring | Low | Alert if PDF downloads spike (could indicate URL leakage) |
| OpenAI prompt output logging | Medium | Store prompt + output hash for audit trail; do not store raw output |
| MFA for admin operations | Medium | If admin dashboard is built, protect it with MFA |
| Supabase project separation (dev/prod) | High | Never use the same Supabase project for development and production |
| Vercel preview deployment secrets | Medium | Preview deployments should use separate, non-production API keys |
| Content Security Policy headers | Medium | Add CSP headers via `next.config.ts` before launch |
| Webhook signing key rotation procedure | Low | Document and test the procedure for rotating `STRIPE_WEBHOOK_SECRET` |
