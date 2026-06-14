# Project Log
## Am I Saved?

A running record of meaningful project history, decisions, and milestones.

---

## 2026-06-13 — Product Pivot: Anonymous-First Full Funnel (Pre-M4 Decision)

**Type:** Product decision (not a milestone — no code changed)
**Status:** Approved and documented

### Summary

The primary user funnel was revised before Milestone 4 development began. The new funnel removes all registration friction from the assessment flow and defers email collection to the point of payment.

### Old Funnel

User registers (email + password) → confirms email → signs in → completes assessment → sees summary → pays → gets report by email.

### New Funnel (Approved)

User starts assessment immediately (no login, no registration) → completes assessment anonymously → sees free Executive Summary + Charts → clicks "Unlock Full Report" → enters email only → pays via Stripe → Full Report shown on-screen instantly → PDF download on same page → magic link email for future account access.

### Product Decisions

1. **No registration in the primary funnel.** The `/register` page remains available as a secondary path but is not surfaced during the primary assessment-to-purchase journey.

2. **Email collected at the point of payment (M7), not at assessment start.** Email is the most valuable piece of user data. It is requested at the moment of highest purchase intent — after the user has seen their personalized summary and decided to pay.

3. **No password in the primary funnel.** Users who pay are converted from anonymous to email-linked accounts via `supabase.auth.admin.updateUserById(userId, { email })` in the Stripe webhook. Magic link is their only sign-in mechanism. This reduces support burden and removes a friction point for the target audience (many of whom forget passwords).

4. **No countdown timer on the upsell CTA.** The CTA appears naturally after the summary renders. Countdown timers conflict with the spiritual, reflective tone of the product.

5. **Full Report displayed on-screen immediately after payment.** "Immediately" means within ~30 seconds, with a loading state. The user does not need to check their email to read their report.

6. **Charts shown in the free tier (on the summary page).** Radar chart and bar chart are visible before the paywall. This increases conversion by demonstrating the product's visual quality before asking for payment.

7. **Historical Progress chart deferred to post-launch.** Requires a permanent account with multiple assessments. Not available in the primary funnel until M7+ account system is mature.

8. **Launch pricing: $2.99.** Retained as specified. Can be adjusted post-launch.

9. **No mid-assessment email capture in MVP.** Optional "save your progress" email field during the assessment is a good idea but adds scope. Deferred to a future milestone.

### Security Decisions

- The Stripe webhook now calls `supabase.auth.admin.updateUserById()`, requiring `SUPABASE_SERVICE_ROLE_KEY` in the webhook handler. This was already planned for M7 (payment record insert). No new secret is required.
- Email collected via the Stripe `customer_email` field in the webhook (not from the pre-checkout form), ensuring the email used for account creation matches the email Stripe validated during payment.
- Webhook idempotency check required: check `payments` table for existing `stripe_payment_intent_id` before processing.

### Milestone Impact Summary

| Milestone | Change |
|---|---|
| M4 Questionnaire | Remove auth dependency; `startAnonymousSession()` at start; no cross-device save in M4 |
| M5 Summary | Add upsell CTA at bottom of summary page (no countdown timer) |
| M6 Charts | Charts co-located with summary page (not a separate dashboard page); historical chart deferred |
| M7 Stripe Paywall | Major rewrite: email form + `customer_email` in checkout + webhook conversion |
| M8 Full Report | Webhook-triggered; loading state on page; on-screen display; no "check email" step |
| M9 PDF | Background async; download button on report page; signed URL on-demand |
| M10 Email | Single combined email: magic link + PDF download link (not just PDF link) |

### Documentation Updated (2026-06-13)

All milestone specs, ROADMAP, PRODUCT_VISION, ACTIVE_MILESTONE, ARCHITECTURE_MASTER, and CLAUDE_SESSION_HANDOFF updated to reflect the approved funnel.

### Next Steps

Begin M4 — Questionnaire Engine. No auth required.

---

## 2026-06-08 — Milestone 3: Database Schema, RLS & Anonymous Strategy Complete

**Milestone:** 3 — Database
**Status:** Complete

### Summary of Changes

Created the complete Supabase PostgreSQL schema: 13 tables, 11 ENUM types, Row Level Security on all tables, and a `profiles` auto-create trigger. Implemented Supabase anonymous sign-ins as the anonymous-first strategy. Updated TypeScript types, Supabase client generics, `requireUser()`, `signUp` conversion logic, and the account page.

### Architecture Decisions

1. **Supabase anonymous sign-ins** — `supabase.auth.signInAnonymously()` creates a real auth.users entry with `is_anonymous = true`. `user_id` is never NULL. RLS and Supabase query builder work identically for anonymous and permanent users. Zero data migration on account conversion: same `user_id` is kept, `updateUser()` called on anonymous session.

2. **`ai_coaching_sessions` deferred to M5** — Schema depends on AI coaching interaction design (chat? structured questions?). Creating tables before the design exists risks a mid-data migration in M5.

3. **Human coaching tables deferred to M13** — Privacy-first redesign required. No PII beyond display_name and email.

4. **Supabase `Database` type hand-written** — `src/types/database.ts` provides type-safe query builder access. Required `Relationships: []` on every table and `Views`/`Functions`/`CompositeTypes` in the schema to satisfy the `@supabase/postgrest-js` `GenericTable` / `GenericSchema` constraints.

5. **`SECURITY DEFINER` on profile trigger** — The `handle_new_user()` function runs with owner privileges so it can insert into `public.profiles` from a trigger on `auth.users` (different schema).

### Security Decisions

- Service-role-only writes enforced at the RLS policy level for `ai_reports`, `report_files`, `payments`, `gift_codes`, `coaching_sponsorships`
- Storage RLS policy gates download access to path-scoped PDFs: `(storage.foldername(name))[1] = auth.uid()::text`
- No client INSERT policy on `profiles` — trigger only. Prevents users from creating profiles for other users.
- `ON DELETE RESTRICT` on payments → users with payments cannot be deleted (data retention)

### Product Decisions

1. **Anonymous user cleanup deferred** — Document the need, implement later. The risk is bounded: anonymous users without payment won't accumulate payment records, and the cleanup cron will be straightforward to add.
2. **`age_range` only, no exact age or DOB** — Privacy principle: collect the minimum required for denomination-path personalization.

### Known Limitations

- Migrations not yet applied to Supabase (manual step required)
- Storage bucket `reports` must be created manually in Supabase Dashboard
- `SUPABASE_SERVICE_ROLE_KEY` not yet set in `.env.local`
- Rate limiting still not implemented (deferred from M2)

### Next Steps

M4 — Questionnaire Engine: question JSON definitions, assessment start flow (calls `startAnonymousSession()`), step pages with `assessment_responses` inserts, profile completion.

---

## 2026-06-08 — Milestone 2: Authentication Foundation Complete

**Milestone:** 2 — Authentication
**Status:** Complete

### Summary of Changes

Implemented full Supabase Auth using an anonymous-first strategy. Only `/account`
is protected; all assessment routes remain publicly accessible so users can complete
an assessment before deciding to create an account.

### Architecture Decisions

1. **`proxy.ts` not `middleware.ts`** — Next.js 16 broke `middleware.ts` in v16.0.0.
   The file is now `src/proxy.ts` and the exported function must be named `proxy`.
   This was a critical breaking change discovered by reading `node_modules/next/dist/docs/`.

2. **Anonymous-first flow** — Assessment routes are public by design. Auth is
   presented as an upgrade prompt when the user chooses to unlock the full report.
   This lowers friction for new users and is the correct product architecture.

3. **`user_metadata` for profile data** — Until M3 creates a `profiles` table,
   `nickname`, `denomination`, and `age_range` are stored in Supabase `user_metadata`.
   This avoids a DB schema dependency in M2.

4. **Email + password AND Magic Link** — Original M2 spec was magic link only.
   Actual implementation added password auth as primary option (better UX for
   returning users) with magic link as an alternative. Toggle in `LoginForm`.

5. **`useActionState` (React 19)** — Form state management uses the new React 19
   hook. Imported from `react` (not `react-dom`). Required because forms are Client
   Components that need to show loading and error states from Server Actions.

6. **Open redirect protection** — The `?redirect=` param is validated to start
   with `/` before being used. Prevents phishing via redirecting to external URLs.

### Files Created

- `src/proxy.ts` — session refresh + `/account` route protection
- `src/app/auth/callback/route.ts` — Supabase OTP code exchange
- `src/app/actions/auth.ts` — signIn, signUp, signInWithMagicLink, signOut
- `src/components/auth/LoginForm.tsx` — password + magic link toggle (Client Component)
- `src/components/auth/RegisterForm.tsx` — registration form (Client Component)

### Files Modified

- `src/lib/validation/schemas.ts` — added loginSchema, magicLinkSchema, registerSchema
- `src/lib/auth/require-user.ts` — real Supabase implementation, expanded AuthUser type
- `src/lib/supabase/client.ts` — removed TODO comments
- `src/lib/supabase/server.ts` — removed TODO comments
- `src/app/login/page.tsx` — replaced placeholder
- `src/app/register/page.tsx` — replaced placeholder
- `src/app/account/page.tsx` — real protected page with profile and disclaimer

### Validation Results

- `npx tsc --noEmit` → zero errors
- `npm run lint` → zero warnings
- `npm run build` → pass (32 routes compiled)

---

## 2026-06-07 — Project Memory System Established

**Type:** Documentation governance
**Status:** Complete

### Summary

Created two permanent documentation files to enable cross-session development
continuity. Future Claude sessions must never depend on chat history — all
project knowledge lives inside the repository.

- **`docs/DEVELOPMENT_HISTORY.md`** — The authoritative permanent historical record.
  Covers all technology selections and rationale, all commands executed, full
  repository structure, all errors encountered and fixed, full git history,
  all known placeholders, active risks, and a chronological development timeline.
  Updated at every milestone completion.

- **`docs/CLAUDE_SESSION_HANDOFF.md`** — The operational handoff document for
  future Claude sessions. NOT historical. Answers "what does the next session need
  to know immediately?" Covers current project snapshot, environment status,
  pending integrations, required credentials, open issues, active risks, and
  a Session Bootstrap Prompt for copy-paste use.

### Documentation Governance Rule Added

`CLAUDE.md` updated with mandatory end-of-milestone documentation update rule:
at the end of every milestone, four files must be updated:
`PROJECT_LOG.md`, `ACTIVE_MILESTONE.md`, `DEVELOPMENT_HISTORY.md`, `CLAUDE_SESSION_HANDOFF.md`.

---

## 2026-06-06 — Milestone 1: Foundation Complete

**Milestone:** 1 — Foundation
**Status:** Complete

### Summary of Changes

- Next.js 16.2.7 project scaffolded with TypeScript, Tailwind CSS v4, shadcn/ui
- Complete folder structure created per architecture spec
- Homepage with hero section, feature cards, and spiritual safety disclaimer
- All 20 placeholder pages across public, auth, assessment, conscience, gift, coaching, and sponsor routes
- 6 placeholder API route handlers returning `{ ok: true, message: "Placeholder endpoint." }`
- 8 service stub files with TODO markers (Supabase, Stripe, OpenAI, Resend, PDF, Validation, Auth, Utils)
- TypeScript domain types for all 10 core entities
- SpiritualRadarChart placeholder with Recharts and static mock data
- .env.example with all required environment variables
- Complete documentation framework (24 docs files)
- Git repository initialized with 2 structured commits

### Architectural Decisions

1. **Next.js 16 with App Router** — Selected over Pages Router for React Server Components, streaming, and modern patterns.
2. **Tailwind CSS v4** — Breaking change from v3; uses CSS-native configuration, `@theme` directive instead of `tailwind.config.js`.
3. **shadcn/ui** — Component library installed in `src/components/ui/`; initialized with `npx shadcn@latest init`.
4. **Supabase SSR** — Using `@supabase/ssr` for server-side session management compatible with Next.js App Router.
5. **React-PDF in API routes only** — React-PDF uses browser APIs and must be isolated in API routes to avoid RSC crash.
6. **Recharts as Client Component** — All chart components use `"use client"` directive due to DOM dependency.

### Security Decisions

1. **`.env.local` excluded from git** — `.gitignore` updated to allow `.env.example` while blocking all real env files.
2. **Server-only service clients** — Supabase service role key and OpenAI key only accessible in server-side files.
3. **Spiritual safety guardrail string** — Defined in `lib/ai/openai.ts` to be included in every AI prompt.

### Product Decisions

1. **Denomination paths** — Platform will support Catholic, Protestant, Orthodox, Non-Denominational, Non-Christian, and Unsure.
2. **Two-tier model** — Executive Summary (free) + Full Report (paid) is the core revenue model.
3. **Design palette** — Deep Navy (#0f1f3c), Warm Gold (#c9973a), Soft Ivory (#f5f0e8).

### Known Limitations

- No real authentication (Milestone 2)
- No database schema or data persistence (Milestone 3)
- No questionnaire logic (Milestone 4)
- No real AI calls (Milestone 5)
- No real Stripe integration (Milestone 7)
- `requireUser()` is a redirect stub only
- Tailwind utility classes for brand colors use inline CSS variable references

### Next Steps

Proceed to Milestone 2: Authentication (Supabase Auth — Magic Links + OTP).
