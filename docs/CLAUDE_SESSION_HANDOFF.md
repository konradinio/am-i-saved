# Claude Session Handoff
## Am I Saved?

**Last updated:** 2026-06-13
**Purpose:** Operational handoff for future Claude sessions. NOT historical.
For full history see `docs/DEVELOPMENT_HISTORY.md`.

> This file answers: "If a new Claude session starts tomorrow, what does it need to know immediately?"

---

## Session Bootstrap Prompt

**Copy and paste this at the start of any new Claude session:**

```
Before doing anything else, read these files in order:

1. docs/CLAUDE_SESSION_HANDOFF.md      ← Start here (this file)
2. CLAUDE.md                            ← AI session rules
3. docs/ACTIVE_MILESTONE.md            ← What are we working on right now?
4. docs/ARCHITECTURE_MASTER.md         ← Full technical architecture
5. docs/PROJECT_LOG.md                 ← Key decisions made so far
6. docs/DEVELOPMENT_HISTORY.md         ← Full project history if needed

Do not write any code or make any changes until you have read all six files
and confirmed the current milestone, current status, and open issues.
```

---

## 1. Project Snapshot

| Field | Value |
|---|---|
| **Product name** | Am I Saved? |
| **Technical name** | `am-i-saved` |
| **GitHub remote** | `https://github.com/konradinio/am-i-saved.git` |
| **Current branch** | `main` |
| **Current milestone** | **M3 — Complete. M4 — Not started.** |
| **Current status** | M3 complete. Awaiting instruction to begin M4. |
| **TypeScript** | Zero errors |
| **ESLint** | Zero warnings |

### Permanent Spiritual Safety Constraint

> The platform must NEVER declare whether a person is saved or not saved.
> The platform must NEVER claim certainty about heaven, hell, or divine judgment.
> Core purpose: *Not certainty about heaven, but clarity about your soul.*

This is a hard architectural constraint, not a style preference.
`SPIRITUAL_SAFETY_DISCLAIMER` in `src/lib/ai/openai.ts` must be injected into every AI prompt.

---

## 2. Architecture Summary

**Stack:** Next.js 16.2.7 (App Router) + TypeScript (strict) + Tailwind CSS v4 + shadcn/ui
**Database:** Supabase PostgreSQL + Auth + Storage
**Payments:** Stripe (Checkout + webhooks)
**AI:** OpenAI (server-side only, prompt versioning)
**Email:** Resend (signed URLs only, no report content in body)
**Charts:** Recharts (all chart components require `"use client"`)
**PDF:** React-PDF (`@react-pdf/renderer`) — API routes ONLY, never RSC
**Validation:** Zod at all system boundaries
**Hosting:** Vercel (not yet linked)

**Design palette:** Navy `#0f1f3c` · Gold `#c9973a` · Ivory `#f5f0e8`

**CRITICAL BREAKING CHANGE — Next.js 16:**
- `middleware.ts` is **deprecated** in Next.js v16.0.0
- The file is now `src/proxy.ts`
- The exported function must be named `proxy` (not `middleware`)
- Do NOT create `middleware.ts` — it silently does nothing in v16

**Full architecture:** `docs/ARCHITECTURE_MASTER.md`

---

## 3. Current Environment

| System | Status | Notes |
|---|---|---|
| **Git** | ✅ Initialized | 8 commits on `main` (after M3) |
| **GitHub** | ✅ Pushed | Main branch pushed after M3 completion |
| **Supabase** | ✅ Credentials set | `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Supabase DB** | ⚠️ Migrations not yet applied | 8 migration files exist; apply via Dashboard SQL Editor |
| **Storage bucket** | ⚠️ Not yet created | Create private bucket `reports` in Supabase Dashboard |
| **Vercel** | ❌ Not linked | Must link before first deployment |
| **Local dev** | ✅ Runnable | `npm run dev` → `http://localhost:3000` |
| **TypeScript** | ✅ Clean | `npx tsc --noEmit` → zero errors |
| **ESLint** | ✅ Clean | `npm run lint` → zero warnings |
| **`.env.local`** | ✅ Partially populated | Has Supabase URL and anon key; service role key not yet set |

**Node.js:** v24.15.0 | **npm:** 11.12.1 | **Platform:** Windows 11, `c:\PRIV\MyAPPS\am-i-saved`

---

## 4. Completed Work

### Milestone 1 — Foundation ✅ (2026-06-06)

- Next.js 16.2.7 scaffolded with TypeScript strict, Tailwind v4, shadcn/ui
- Full `src/` folder structure, 20 placeholder pages, 6 API stubs
- Homepage, Header, Footer, Navigation — fully implemented
- `SpiritualRadarChart` with Recharts, 10 domain types, 8 service stubs
- 26 documentation files, `.env.example`, `.gitignore`, `README.md`

### Milestone 2 — Authentication ✅ (2026-06-08)

- `src/proxy.ts` — session refresh + `/account` route protection (Next.js 16 proxy)
- `src/app/auth/callback/route.ts` — Supabase OTP code exchange
- `src/app/actions/auth.ts` — signIn, signUp, signInWithMagicLink, signOut
- `src/components/auth/LoginForm.tsx` — password + magic link toggle
- `src/components/auth/RegisterForm.tsx` — full registration form
- `/login`, `/register`, `/account` pages — real implementations
- Zod schemas: loginSchema, magicLinkSchema, registerSchema
- Real `requireUser()` via `supabase.auth.getUser()`

### Milestone 3 — Database ✅ (2026-06-08)

- 8 SQL migration files in `supabase/migrations/`
- 13 tables with RLS enabled, 11 ENUM types
- `profiles` table with auto-create trigger + M2 user backfill
- Storage RLS policy for `reports` bucket
- `src/types/database.ts` — typed Supabase Database generic (13 tables, 11 ENUMs)
- Updated `src/types/index.ts` — AgeRange, AssessmentActionPlan, ConscienceResponse, ConscienceActionPlan, updated UserProfile/Assessment/ConscienceSession
- Supabase clients now use `<Database>` generic for type-safe queries
- `require-user.ts` reads from `profiles` table; `AuthUser` has `isAnonymous` flag
- `auth.ts` — anonymous → permanent account conversion in `signUp`, new `startAnonymousSession()`
- Account page — anonymous session banner, email hidden for anonymous users

---

## 5. In Progress

**Nothing is currently in progress.**

M3 is complete. Product funnel documentation has been revised (2026-06-13 product pivot — see PROJECT_LOG.md). The project is ready to begin M4.

---

## 6. Open Issues

| Issue | Priority | Resolution |
|---|---|---|
| Migrations not applied to Supabase | High | Apply via Dashboard SQL Editor in numeric order |
| Storage bucket `reports` not created | High | Supabase Dashboard → Storage → New bucket → `reports` → Private |
| `SUPABASE_SERVICE_ROLE_KEY` not set | High | Required before M5 (AI report generation) |
| Rate limiting not implemented | High | Required before production launch; add in M5 or M7 |
| Anonymous user cleanup deferred | Medium | Cron to delete `is_anonymous` users >30 days, no payment |
| GitHub remote not pushed | Medium | Run `git push -u origin main` when ready |
| Vercel project not linked | Medium | Required before first deployment |
| `profiles` data not yet in Supabase | Medium | Migrations must be applied first |
| No `.gitattributes` | Low | CRLF warnings on Windows (cosmetic only) |

---

## 7. Current Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Migrations not applied | High | All M3 code depends on these tables; errors until applied |
| Local git not pushed | Medium | Data loss risk. Push to GitHub |
| `SUPABASE_SERVICE_ROLE_KEY` not set | Medium | `createServiceClient()` will error when first called (M5/M7) |
| No test suite | High | Add Vitest + Playwright in M4 or M5 |

---

## 8. Database Schema (M3)

**Apply migrations in order (supabase/migrations/):**

```
20260608000001_extensions_and_enums.sql  — UUID extension, 11 ENUMs, update_updated_at trigger
20260608000002_profiles.sql              — profiles table, trigger, backfill, RLS
20260608000003_assessments.sql           — assessments, assessment_responses, RLS
20260608000004_reports.sql               — ai_reports, report_files, chart_snapshots, RLS
20260608000005_action_plans.sql          — assessment_action_plans, RLS
20260608000006_payments.sql              — payments, gift_codes, coaching_sponsorships, RLS
20260608000007_conscience.sql            — conscience_sessions/responses/action_plans, RLS
20260608000008_storage.sql               — Storage RLS (bucket must exist first)
```

**Deferred tables:**
- `ai_coaching_sessions`, `ai_coaching_action_plans` → M5 (AI coaching design TBD)
- `life_spiritual_coaches`, `human_coaching_sessions`, `human_coaching_action_plans` → M13

**Anonymous identity strategy:** `supabase.auth.signInAnonymously()` → real `auth.users` entry with `is_anonymous = true`. Same `user_id` throughout, zero data migration.

**Primary conversion (M7 webhook — email-only):** `supabase.auth.admin.updateUserById(userId, { email })` — no password set; magic link is the only future sign-in method. This is the primary funnel conversion path.

**Secondary conversion (registration form):** `supabase.auth.updateUser({ email, password })` — full account with password. Available via `/register` as a secondary path.

---

## 9. Pending Integrations

### Supabase

**Status:** Credentials set. Migrations NOT applied. Schema exists only as SQL files.

**Before M4 testing:**
1. Apply 8 migrations via Dashboard SQL Editor (in order)
2. Create private bucket `reports` in Storage
3. Set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (required for M5/M7)
4. Enable Anonymous sign-ins in Supabase Dashboard → Authentication → Providers → Anonymous

### Stripe

**Status:** Not integrated. SDK installed. Required before M7.

### OpenAI

**Status:** Not integrated. SDK installed. Required before M5.

### Resend

**Status:** Not integrated. SDK installed. Required before M10.

### Vercel

**Status:** Not linked. Required before first deployment.

---

## 10. Required Credentials

**Never store secrets in source code or this file. All secrets go in `.env.local` only.**

| Credential | Environment Variable | Status |
|---|---|---|
| Supabase Project URL | `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set |
| Supabase anon key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set |
| Supabase service role key | `SUPABASE_SERVICE_ROLE_KEY` | ❌ Not yet set |
| Supabase DB URL | `DATABASE_URL` | ❌ Not yet set |
| App base URL | `NEXT_PUBLIC_APP_URL` | ❌ Needed for magic link |
| OpenAI API key | `OPENAI_API_KEY` | ❌ M5 |
| Stripe secret key | `STRIPE_SECRET_KEY` | ❌ M7 |
| Stripe publishable key | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ❌ M7 |
| Stripe webhook secret | `STRIPE_WEBHOOK_SECRET` | ❌ M7 |
| Resend API key | `RESEND_API_KEY` | ❌ M10 |
| Email sender address | `EMAIL_FROM` | ❌ M10 |

---

## 11. Recommended Next Step

**Before starting M4:**

1. Apply M3 migrations to Supabase (Dashboard SQL Editor, 8 files in order)
2. Create `reports` storage bucket (private) in Supabase Dashboard
3. Enable Anonymous sign-ins in Supabase Dashboard
4. Test full auth flow locally: `npm run dev` → register → account page → sign out
5. Then begin M4 — Questionnaire Engine

---

## 12. Handoff Summary

Am I Saved? is a Christian spiritual reflection platform. Milestones 1–3 are complete.
The database schema is defined as 8 SQL migration files (not yet applied to Supabase).
Supabase clients are fully typed with the `Database` generic.

**Product funnel (revised 2026-06-13):** Anonymous-first. No login required to start or
complete the assessment. Email is collected only at the point of payment (M7). The Stripe
webhook converts the anonymous account to an email-linked account with no password set.
Magic link is the only future sign-in method for primary-funnel users. Full report is
displayed on-screen immediately after payment (with loading state, ~15–30 seconds). PDF
and a combined magic-link email follow asynchronously.

The spiritual safety constraint — the platform must never declare a person saved or unsaved
— is enforced in code and must never be removed.

The project is in a clean, committed, lint-free, TypeScript-clean state. Main branch pushed
to GitHub. Migrations have not been applied to Supabase.

**Next action:** Apply Supabase migrations → Enable anonymous sign-ins → Begin M4 — Questionnaire Engine (no login required in M4 flow).
