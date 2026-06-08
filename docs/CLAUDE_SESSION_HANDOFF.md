# Claude Session Handoff
## Am I Saved?

**Last updated:** 2026-06-08
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
| **Current milestone** | **M2 — Complete. M3 — Not started.** |
| **Current status** | M2 complete. Awaiting instruction to begin M3. |
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
| **Git** | ✅ Initialized | 6 commits on `main` (after M2) |
| **GitHub** | ⚠️ Remote set, not pushed | Remote exists; no push performed yet |
| **Supabase** | ✅ Credentials set | `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Vercel** | ❌ Not linked | Must link before first deployment |
| **Local dev** | ✅ Runnable | `npm run dev` → `http://localhost:3000` |
| **TypeScript** | ✅ Clean | `npx tsc --noEmit` → zero errors |
| **ESLint** | ✅ Clean | `npm run lint` → zero warnings |
| **`.env.local`** | ✅ Populated | Has Supabase URL and anon key; service role key not yet set |

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
- 8 typed service stub files
- 10 domain TypeScript types in `src/types/index.ts`
- `SpiritualRadarChart` — Recharts radar chart with mock data
- `.env.example`, `.gitignore`, `README.md`
- 26 documentation files in `docs/`
- Git initialized, 4 commits

### Milestone 2 — Authentication ✅ (2026-06-08)

- `src/proxy.ts` — session refresh + `/account` route protection (Next.js 16 proxy, not middleware)
- `src/app/auth/callback/route.ts` — Supabase OTP code → session exchange
- `src/app/actions/auth.ts` — signIn, signUp, signInWithMagicLink, signOut (Server Actions)
- `src/components/auth/LoginForm.tsx` — password + magic link toggle (Client Component, `useActionState`)
- `src/components/auth/RegisterForm.tsx` — registration form (Client Component, `useActionState`)
- `/login` page — real form, redirect handling, error display
- `/register` page — real form
- `/account` page — protected, user profile from `user_metadata`, spiritual safety disclaimer, sign out
- Zod schemas: `loginSchema`, `magicLinkSchema`, `registerSchema`, `denominationValues`, `ageRangeValues`
- Real `requireUser()` via `supabase.auth.getUser()` — replaces redirect stub
- Anonymous-first: only `/account` is protected; all assessment routes remain public

---

## 5. In Progress

**Nothing is currently in progress.**

M2 is complete. The project is held at M2 awaiting instruction to begin M3.

---

## 6. Open Issues

| Issue | Priority | Resolution |
|---|---|---|
| GitHub remote not pushed | Medium | Run `git push -u origin main` when ready |
| Supabase service role key not set | High | Required before M3 (DB operations) |
| Vercel project not linked | Medium | Required before first deployment |
| `profiles` table not yet created | High | Nickname/denomination in `user_metadata` for now; full table in M3 |
| Rate limiting on auth endpoints | High | Add in M3 |
| No `.gitattributes` | Low | CRLF warnings on every commit (Windows) |
| No error boundary components | Medium | Add in M3 |
| No loading state components | Medium | Add in M3 |

---

## 7. Current Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Local git not pushed | Medium | Data loss risk. Push to GitHub as first step. |
| No `profiles` DB table yet | High | User metadata limited to auth.users.user_metadata |
| No RLS policies yet | High | Database work not started (M3). No sensitive data stored yet. |
| No test suite | High | Add Vitest + Playwright starting M3 |
| Stripe `apiVersion` not pinned | Low | Will be set explicitly in M7 |

---

## 8. Pending Integrations

### Supabase

**Status:** Credentials set in `.env.local`. DB schema not yet created.

**What's needed before M3:**
1. Service role key → `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
2. DB connection string → `DATABASE_URL` in `.env.local`
3. Enable Email provider in Supabase Auth settings (if not already done)
4. Configure Magic Link redirect URL to `http://localhost:3000/auth/callback`

**What's already built:**
- `src/lib/supabase/client.ts` — `createBrowserClient` (clean, no TODOs)
- `src/lib/supabase/server.ts` — `createClient()` + `createServiceClient()` (clean, no TODOs)
- `src/proxy.ts` — session refresh on every request
- Full auth flow (login, register, magic link, sign out)

### Stripe

**Status:** Not integrated. SDK installed. Required before M7.

### OpenAI

**Status:** Not integrated. SDK installed. Required before M5.

### Resend

**Status:** Not integrated. SDK installed. Required before M10.

### Vercel

**Status:** Not linked. Required before first deployment.

---

## 9. Required Credentials

**Never store secrets in source code or this file. All secrets go in `.env.local` only.**

| Credential | Environment Variable | Status |
|---|---|---|
| Supabase Project URL | `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set |
| Supabase anon key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set |
| Supabase service role key | `SUPABASE_SERVICE_ROLE_KEY` | ❌ Not yet set |
| Supabase DB URL | `DATABASE_URL` | ❌ Not yet set |
| OpenAI API key | `OPENAI_API_KEY` | ❌ M5 |
| Stripe secret key | `STRIPE_SECRET_KEY` | ❌ M7 |
| Stripe publishable key | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ❌ M7 |
| Stripe webhook secret | `STRIPE_WEBHOOK_SECRET` | ❌ M7 |
| Resend API key | `RESEND_API_KEY` | ❌ M10 |
| Email sender address | `EMAIL_FROM` | ❌ M10 |
| App base URL | `NEXT_PUBLIC_APP_URL` | ❌ Needed for magic link callback |

---

## 10. Recommended Next Step

**Before starting M3:**

1. `git push -u origin main` — push all local commits to GitHub
2. Set `NEXT_PUBLIC_APP_URL=http://localhost:3000` in `.env.local` (needed for magic link)
3. In Supabase dashboard: enable Email auth, set redirect URL to `http://localhost:3000/auth/callback`
4. Test registration + login flow locally via `npm run dev`
5. Copy service role key → `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
6. Then begin M3 — Database

---

## 11. Handoff Summary

Am I Saved? is a Christian spiritual reflection platform. Milestone 2 (Authentication)
is complete as of 2026-06-08. Users can register, sign in with password or magic link,
and sign out. Only `/account` is protected — all assessment routes are public, supporting
the anonymous-first product philosophy. The `profiles` database table is deferred to M3;
user metadata (nickname, denomination, age range) is temporarily stored in Supabase
`user_metadata`.

The project is in a clean, committed, lint-free, TypeScript-clean state. It has not been
pushed to GitHub.

The permanent spiritual safety constraint — the platform must never declare whether
a person is saved or not saved — is enforced at the code level in `src/lib/ai/openai.ts`
and must never be removed.

**Next action:** Push to GitHub → Complete Supabase project setup → Begin M3.
