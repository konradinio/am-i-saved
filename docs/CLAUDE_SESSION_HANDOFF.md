# Claude Session Handoff
## Am I Saved?

**Last updated:** 2026-06-07
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
| **Current milestone** | **M1 — Complete. M2 — Not started.** |
| **Current status** | Holding at M1. Awaiting instruction to begin M2. |
| **Last commit** | `89da4f7` — `docs: establish permanent Claude session memory system` |
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

**Full architecture:** `docs/ARCHITECTURE_MASTER.md`

---

## 3. Current Environment

| System | Status | Notes |
|---|---|---|
| **Git** | ✅ Initialized | 4 commits on `main` |
| **GitHub** | ⚠️ Remote set, not pushed | Remote exists; no push performed yet |
| **Supabase** | ❌ Not created | Must create project before M2 |
| **Vercel** | ❌ Not linked | Must link before first deployment |
| **Local dev** | ✅ Runnable | `npm run dev` → `http://localhost:3000` |
| **TypeScript** | ✅ Clean | `npx tsc --noEmit` → zero errors |
| **ESLint** | ✅ Clean | `npm run lint` → zero warnings |
| **`.env.local`** | ❌ Not created | Must copy from `.env.example` and fill values |

**Node.js:** v24.15.0 | **npm:** 11.12.1 | **Platform:** Windows 11, `c:\PRIV\MyAPPS\am-i-saved`

---

## 4. Completed Work

### Milestone 1 — Foundation ✅ (2026-06-06)

- Next.js 16.2.7 scaffolded with TypeScript strict, Tailwind v4, shadcn/ui
- Full `src/` folder structure created
- Homepage — full implementation (hero, CTAs, 6 feature cards, disclaimer)
- Header, Footer, Navigation components — fully implemented
- Root layout with Geist fonts and brand design tokens
- 20 placeholder pages (all routes stubbed, no business logic)
- 6 placeholder API route handlers (all return `{ ok: true, message: "Placeholder endpoint." }`)
- 8 typed service stub files (`supabase/client`, `supabase/server`, `stripe/client`, `stripe/server`, `ai/openai`, `email/resend`, `pdf/generate-report-pdf`, `auth/require-user`)
- 10 domain TypeScript types in `src/types/index.ts`
- `SpiritualRadarChart` — Recharts radar chart with mock data
- `.env.example`, `.gitignore`, `README.md`
- 26 documentation files in `docs/`
- Git initialized, 4 commits

### Post-M1 Cleanup (2026-06-07)

- Fixed 6 ESLint warnings in placeholder API routes (removed unused `req` parameters)
- Created `docs/DEVELOPMENT_HISTORY.md` — permanent project record
- Created `docs/CLAUDE_SESSION_HANDOFF.md` — this file

---

## 5. In Progress

**Nothing is currently in progress.**

M1 is complete. The project is held at M1 awaiting instruction to begin M2.

---

## 6. Open Issues

| Issue | Priority | Resolution |
|---|---|---|
| GitHub remote not pushed | Medium | Run `git push -u origin main` when ready |
| Supabase project not created | High | Required before M2 can begin |
| Vercel project not linked | Medium | Required before first deployment |
| `.env.local` not created | High | Required before `npm run dev` with real services |
| No `.gitattributes` | Low | CRLF warnings on every commit (Windows); add in M2 |
| No rate limiting | High | Add in M2 or M3 |
| No error boundary components | Medium | Add in M2 |
| No loading state components | Medium | Add in M2 |
| `requireUser()` is a redirect stub | High | Real auth in M2 — all "protected" routes currently unprotected |

---

## 7. Current Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Local git not pushed | Medium | Data loss risk. Push to GitHub as first step. |
| Supabase project doesn't exist | High | M2 cannot start without it. Create before coding. |
| No test suite | High | Add Vitest + Playwright starting M3 |
| No real authentication | High | Every "protected" route is actually public right now |
| Stripe `apiVersion` not pinned | Low | Will be set explicitly in M7 |
| `src/lib/utils.ts` vs `src/lib/utils/index.ts` | Low | Both coexist; shadcn imports from `utils.ts`, custom code from `utils/index.ts` |

---

## 8. Pending Integrations

### Supabase

**Status:** Not created.

**What's needed before M2:**
1. Create project at supabase.com (name: `am-i-saved`)
2. Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
3. Copy anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
4. Copy service role key → `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
5. Enable Email provider in Supabase Auth settings
6. Configure Magic Link redirect URL to `http://localhost:3000/auth/callback`

**What's already built:** `src/lib/supabase/client.ts` and `src/lib/supabase/server.ts` — both are stubs waiting for real credentials.

### Stripe

**Status:** Not integrated. SDK installed.

**What's needed before M7:**
1. Create/access Stripe account
2. Copy secret key → `STRIPE_SECRET_KEY`
3. Copy publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Create products in Stripe dashboard (Full Report, Gift Code, Coaching Session)
5. Set up webhook endpoint → `STRIPE_WEBHOOK_SECRET`

**What's already built:** `src/lib/stripe/client.ts` and `src/lib/stripe/server.ts` — initialized, no functions yet.

### OpenAI

**Status:** Not integrated. SDK installed.

**What's needed before M5:**
1. Create/access OpenAI API key
2. Copy → `OPENAI_API_KEY` in `.env.local`

**What's already built:** `src/lib/ai/openai.ts` — client initialized, `SPIRITUAL_SAFETY_DISCLAIMER` and `PROMPT_VERSION = "v1.0.0"` defined.

### Resend

**Status:** Not integrated. SDK installed.

**What's needed before M10:**
1. Create/access Resend account
2. Verify sending domain
3. Copy API key → `RESEND_API_KEY`
4. Set `EMAIL_FROM` to verified sender address

**What's already built:** `src/lib/email/resend.ts` — client initialized, `EMAIL_FROM` constant from env.

### Vercel

**Status:** Not linked.

**What's needed before first deployment:**
1. Create Vercel project named `am-i-saved`
2. Link GitHub repo for automatic deployments
3. Add all environment variables from `.env.example` to Vercel project settings
4. Configure custom domain (when ready)

---

## 9. Required Credentials

**Never store secrets in source code or this file. All secrets go in `.env.local` only.**

| Credential | Environment Variable | Where to Get |
|---|---|---|
| Supabase Project URL | `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| Supabase anon key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same |
| Supabase service role key | `SUPABASE_SERVICE_ROLE_KEY` | Same (keep secret) |
| Supabase DB URL | `DATABASE_URL` | Supabase dashboard → Settings → Database |
| OpenAI API key | `OPENAI_API_KEY` | platform.openai.com |
| Stripe secret key | `STRIPE_SECRET_KEY` | dashboard.stripe.com → API keys |
| Stripe publishable key | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same |
| Stripe webhook secret | `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks |
| Resend API key | `RESEND_API_KEY` | resend.com |
| Email sender address | `EMAIL_FROM` | Verified domain in Resend |
| App base URL | `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` locally |
| PDF bucket name | `PDF_STORAGE_BUCKET` | Value: `reports` |

See `.env.example` for the full template.

---

## 10. Recommended Next Step

**Before writing any M2 code:**

1. `git push -u origin main` — push all 4 local commits to GitHub
2. Create Supabase project at supabase.com (name: `am-i-saved`)
3. Copy credentials into `.env.local`
4. `npm run dev` — confirm the app runs with real Supabase credentials
5. Then begin M2 — Authentication

**M2 bootstrap prompt** (from `docs/DEVELOPMENT_HISTORY.md` Section 12):

```
Implement Milestone 2 — Authentication.
Reference: docs/MILESTONE_02_AUTH.md, docs/ARCHITECTURE_MASTER.md, docs/security.md.
Pre-requisites confirmed: Supabase project created, .env.local populated.
```

---

## 11. Handoff Summary

Am I Saved? is a Christian spiritual reflection platform. Milestone 1 (Foundation) is
complete as of 2026-06-06. The codebase is a fully-typed Next.js 16.2.7 App Router
project with Tailwind CSS v4, shadcn/ui, and typed service stubs for every third-party
integration. All 20 application pages and 6 API routes are placeholders. No real
business logic, authentication, database, or payments exist yet.

The project is in a clean, committed, lint-free, TypeScript-clean state. It has not
been pushed to GitHub and has no live services connected.

The immediate blocker before Milestone 2 can begin is creating the Supabase project
and populating `.env.local`. No code changes are required first.

The permanent spiritual safety constraint — the platform must never declare whether
a person is saved or not saved — is enforced at the code level in `src/lib/ai/openai.ts`
and must never be removed.

**Next action:** Push to GitHub → Create Supabase project → Begin M2.
