# Security Document
## Am I Saved?

**Version:** 1.0.0 | **Created:** 2026-06-06

---

## User Data Sensitivity

Spiritual assessment data is among the most sensitive personal data a user can share. It reveals beliefs, conscience, moral struggles, and faith practices.

**Principles:**
- Data is never shared publicly or sold
- Data is never used to train AI models without explicit consent
- Data is never embedded in email bodies — only secure download links
- All data is scoped to the authenticated user via Row Level Security
- Users must be able to delete their data (GDPR/privacy requirement — future)

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

## Stripe Security Principles

- Stripe secret key (`STRIPE_SECRET_KEY`) is server-side only — never exposed to browser
- Stripe publishable key (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) is safe for client
- Stripe webhooks MUST be verified with `STRIPE_WEBHOOK_SECRET` before processing
- Raw request body must be used for signature verification (no body parsing before verification)
- Payment status is ONLY updated via verified webhook events — never via client claims
- Checkout sessions are created server-side and validated server-side
- Idempotency keys used for payment operations to prevent double-charges (Milestone 7)

---

## Future RLS Requirement

Row Level Security (RLS) on all Supabase tables is mandatory before any real user data is stored. This will be implemented in Milestone 3.

**Required RLS rules (Milestone 3):**
- `profiles`: User can only read/write their own profile
- `assessments`: User can only read/write their own assessments
- `assessment_responses`: User can only read/write their own responses
- `ai_reports`: User can only read their own reports
- `payments`: User can only read their own payments
- `report_files`: User can only read files they own
- `gift_codes`: Purchaser sees codes they bought; recipient sees codes redeemed by them
- `conscience_sessions`: User can only read/write their own sessions
- `coaching_bookings`: User sees their own bookings; coach sees bookings assigned to them
- `coaching_sponsorships`: Sponsor sees their sponsorships; recipient sees theirs

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

## Rate Limiting (Required — Milestone 2 or 3)

Rate limiting must be implemented before production launch on:
- `/api/ai/generate-summary` — prevent OpenAI cost abuse
- `/api/ai/generate-full-report` — prevent OpenAI cost abuse
- `/api/stripe/create-checkout-session` — prevent checkout spam
- `/api/email/send-report` — prevent email abuse
- Auth endpoints — prevent brute-force attacks

Recommended: Vercel's built-in rate limiting or Upstash Redis with `@upstash/ratelimit`.

---

## Input Sanitization

All user input must be validated with Zod at every API boundary. No raw user input should be passed to:
- OpenAI prompts (inject into structured prompt fields only)
- SQL queries (use Supabase client parameterized queries only)
- Email content (strip HTML)
- PDF content (validate before rendering)
