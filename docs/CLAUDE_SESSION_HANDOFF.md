---
# Claude Session Handoff
## Am I Saved? — New Session Quick-Start Guide

**Last updated:** 2026-06-07
**Current milestone:** M1 Complete — M2 Not Started

> This file is the first thing a new Claude session should read.
> It summarizes everything needed to continue development without prior context.
> After reading this file, read: ARCHITECTURE_MASTER.md, ACTIVE_MILESTONE.md,
> PROJECT_LOG.md, and the current milestone spec doc.

---

## 1. Who You Are Working With

- **Developer:** Konrad (konradinio@gmail.com)
- **Project:** Am I Saved? — a Christian spiritual reflection web application
- **Working directory:** `c:\PRIV\MyAPPS\am-i-saved`
- **Platform:** Windows 11 Enterprise, PowerShell + Bash available
- **Node.js:** v24.15.0 | npm 11.12.1

---

## 2. Project Identity (Never Change These)

| Field | Value |
|---|---|
| Public product name | **Am I Saved?** |
| Technical project name | `am-i-saved` |
| GitHub repo | `https://github.com/konradinio/am-i-saved.git` |
| Vercel project | `am-i-saved` (not yet linked) |
| Supabase project | `am-i-saved` (not yet created) |
| Git branch | `main` |

---

## 3. Permanent Spiritual Safety Constraint

**This constraint is permanent. It overrides everything. It must never be removed or weakened.**

> The platform must NEVER claim certainty regarding salvation.
> The platform must NEVER declare whether a person is saved or not saved.
> The platform must NEVER declare that a person is destined for heaven or hell.
> Only God knows the human heart.

**Enforced at code level:** `SPIRITUAL_SAFETY_DISCLAIMER` constant in
`src/lib/ai/openai.ts` must be injected into every AI prompt.

**Core tagline:** *Not certainty about heaven, but clarity about your soul.*

---

## 4. Technology Stack (Quick Reference)

| Technology | Version | Notes |
|---|---|---|
| Next.js | 16.2.7 | App Router, RSC, Server Actions |
| TypeScript | ^5 | Strict mode — no `any` |
| Tailwind CSS | ^4 | `@theme` in `globals.css` — no `tailwind.config.js` |
| shadcn/ui | 4.10.0 | Components in `src/components/ui/` |
| Supabase | `@supabase/ssr@0.10.3` | `createBrowserClient` / `createServerClient` |
| Stripe | `stripe@22.2.0` / `@stripe/stripe-js@9.7.0` | Server secret / browser publishable |
| OpenAI | `openai@6.42.0` | Server-side only |
| Resend | `resend@6.12.4` | Transactional email |
| Recharts | `recharts@3.8.1` | All chart components need `"use client"` |
| React-PDF | `@react-pdf/renderer@4.5.1` | API routes only — never in RSC |
| Zod | `zod@4.4.3` | All system boundaries |

---

## 5. Critical Rules — Do Not Violate

1. **React-PDF** — import only inside API routes. Never in Server Components or Client Components.
2. **Recharts** — all chart components must have `"use client"` directive.
3. **OpenAI / Stripe secret key / Supabase service role key** — server-side only. Never in Client Components.
4. **Next.js 16 dynamic params** — `params` in page components are `Promise<{...}>` — must `await` them.
5. **Payment status** — never trust client-reported payment status. Only trust Stripe webhook + database.
6. **Stripe webhook** — always verify signature with `STRIPE_WEBHOOK_SECRET`. Never process unverified events.
7. **AI output** — always inject `SPIRITUAL_SAFETY_DISCLAIMER`. Never declare salvation status.
8. **Zod** — validate all input at system boundaries (API routes, Server Actions).
9. **Two-commit rule** — every milestone produces: (1) docs-only commit, (2) code commit.
10. **ESLint rule** — `_param` underscore prefix convention is NOT configured. Remove unused parameters instead.
11. **Tailwind v4** — use `@theme` directive in CSS. Do not create `tailwind.config.js`.
12. **Supabase** — use `@supabase/ssr`, not deprecated auth helpers. `createBrowserClient` for client, `createServerClient` for server.

---

## 6. Current Project State

### Milestone 1 — Complete ✅

Everything in M1 is scaffolding and placeholders. No real business logic exists yet.

**TypeScript:** Zero errors (`npx tsc --noEmit` clean)
**ESLint:** Zero warnings (`npm run lint` clean)

### What Is Real (Not Placeholder)

- Homepage (`src/app/page.tsx`) — full hero, CTAs, feature cards, disclaimer
- Header, Footer, Navigation components — fully implemented
- Root layout (`src/app/layout.tsx`) — Geist fonts, metadata, design tokens
- `globals.css` — brand colors, `@theme` directive
- Domain types (`src/types/index.ts`) — 10 fully typed entities
- `SPIRITUAL_SAFETY_DISCLAIMER` in `src/lib/ai/openai.ts` — permanent constant
- All documentation files — 24 files in `docs/`

### What Is Placeholder

- All 20 pages except homepage — return a styled placeholder div
- All 6 API route handlers — return `{ ok: true, message: "Placeholder endpoint." }`
- `requireUser()` — always redirects to `/login` (no real auth)
- All service stub functions — clients initialized but no functions implemented
- `SpiritualRadarChart` — uses hardcoded mock data

### What Does Not Exist Yet

- Supabase project (must create before M2)
- Any database tables or migrations
- Authentication (M2)
- Questionnaire engine (M4)
- Any AI calls (M5)
- Any Stripe integration (M7)
- Vercel deployment (future)

---

## 7. Environment Variables Required

All env vars are documented in `.env.example`. Copy to `.env.local` before running.

```bash
cp .env.example .env.local
# Then fill in real values
```

| Variable | Required For | Source |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | SEO, email links | Local: `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL` | All Supabase | Supabase dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase browser | Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase | Supabase dashboard |
| `DATABASE_URL` | Direct DB access | Supabase dashboard |
| `OPENAI_API_KEY` | AI generation | OpenAI platform |
| `STRIPE_SECRET_KEY` | Stripe server | Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification | Stripe CLI / dashboard |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe browser | Stripe dashboard |
| `RESEND_API_KEY` | Email delivery | Resend dashboard |
| `EMAIL_FROM` | Email sender | Verified domain in Resend |
| `PDF_STORAGE_BUCKET` | PDF storage | Value: `reports` |

---

## 8. How to Run Locally

```bash
# Install dependencies (if not already installed)
npm install

# Copy env file and fill in values
cp .env.example .env.local

# Start dev server
npm run dev
# → http://localhost:3000

# TypeScript check
npx tsc --noEmit

# ESLint
npm run lint

# Production build test
npm run build
```

---

## 9. Git State

| Field | Value |
|---|---|
| Branch | `main` |
| Latest commit | `0bcc91f` — `chore: create initial project foundation` |
| Remote | `https://github.com/konradinio/am-i-saved.git` |
| Push status | Not yet pushed to remote |

### Two-Commit Convention (Every Milestone)

```bash
# Commit 1 — docs only
git add docs/
git commit -m "docs: <milestone description>"

# Commit 2 — all code
git add -A
git commit -m "feat: <milestone description>"
```

---

## 10. Design System

### Colors

| Name | Hex | Tailwind usage |
|---|---|---|
| Deep Navy | `#0f1f3c` | `bg-navy`, `text-navy` |
| Warm Gold | `#c9973a` | `bg-gold`, `text-gold` |
| Soft Ivory | `#f5f0e8` | `bg-ivory`, `text-ivory` |

Defined in `src/app/globals.css` under `@theme`:
```css
@theme {
  --color-navy: #0f1f3c;
  --color-gold: #c9973a;
  --color-ivory: #f5f0e8;
}
```

Body default: `bg-navy text-ivory` (set in `src/app/layout.tsx`).

### Typography

Geist Sans and Geist Mono (Google Fonts / Next.js font optimization).

### Component Library

shadcn/ui components in `src/components/ui/`. Add new components with:
```bash
npx shadcn@4.10.0 add <component-name>
```

---

## 11. Folder Map (Key Files Only)

```
src/lib/ai/openai.ts           ← PROMPT_VERSION + SPIRITUAL_SAFETY_DISCLAIMER
src/lib/auth/require-user.ts   ← requireUser() stub (M2 will make this real)
src/lib/supabase/client.ts     ← createBrowserClient (Client Components)
src/lib/supabase/server.ts     ← createServerClient (Server Components, API routes)
src/lib/stripe/client.ts       ← getStripe() singleton (browser, publishable key)
src/lib/stripe/server.ts       ← stripe instance (server only, secret key)
src/lib/pdf/generate-report-pdf.ts  ← placeholder, returns { ok: false }
src/lib/validation/schemas.ts  ← Zod base schemas (add per-feature schemas in M3+)
src/types/index.ts             ← All domain TypeScript types
src/app/globals.css            ← Tailwind v4 @theme + brand tokens
src/app/layout.tsx             ← Root layout (fonts, metadata, Header, Footer)
src/app/page.tsx               ← Homepage (full implementation)
```

---

## 12. Domain Types (Reference)

All types in `src/types/index.ts`:

- `UserProfile` — user identity and denomination
- `Denomination` — `catholic | protestant | orthodox | non_denominational | non_christian | unsure`
- `Assessment` — assessment session with status lifecycle
- `AssessmentStatus` — `in_progress | submitted | summary_ready | paid | full_report_ready`
- `AssessmentResponse` — individual question answer
- `QuestionType` — `single_choice | multiple_choice | likert | free_text`
- `AIReport` — generated report with prompt version tracking
- `ExecutiveSummaryContent` — free-tier AI report structure
- `FullReportContent` — paid-tier AI report structure
- `CategoryReport` — per-category analysis within full report
- `Payment` — Stripe payment record
- `PaymentProduct` — `full_report | gift_assessment | coaching_session | sponsored_coaching`
- `GiftCode` — gift assessment code with redemption state
- `ConscienceSession` — examination of conscience session
- `CoachingBooking` — coaching session booking
- `CoachingSponsorship` — sponsorship record
- `ChartDataPoint` — `{ category: SpiritualCategory, score: number, fullMark: number }`
- `SpiritualCategory` — `Faith | Prayer | Charity | Forgiveness | Humility | Scripture | Community | Repentance`
- `ApiResponse<T>` — standard API response shape (`ok: true | false`)

---

## 13. Next Milestone: M2 — Authentication

**Pre-requisites before starting M2:**
1. Supabase project created at supabase.com
2. `.env.local` populated with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Supabase email provider configured in dashboard

**M2 scope** (see `docs/MILESTONE_02_AUTH.md` for full spec):
- `src/middleware.ts` — session refresh + route protection
- Real login page — `supabase.auth.signInWithPassword()` + magic link
- Real register page — `supabase.auth.signUp()`
- Real account page — authenticated user view + sign out
- Real `requireUser()` in `src/lib/auth/require-user.ts`
- Server Actions for signIn / signUp / signOut
- `.gitattributes` for CRLF line ending fix

---

## 14. Documentation Files to Read for Full Context

In priority order for a new session:

1. **This file** — `docs/CLAUDE_SESSION_HANDOFF.md` (you are reading it)
2. `CLAUDE.md` — AI session instructions (points to `AGENTS.md`)
3. `docs/ACTIVE_MILESTONE.md` — current milestone status
4. `docs/ARCHITECTURE_MASTER.md` — full stack, principles, data flow, security
5. `docs/PROJECT_LOG.md` — decisions made so far
6. `docs/DEVELOPMENT_HISTORY.md` — complete historical record
7. `docs/MILESTONE_0N_*.md` — spec for the current milestone being worked
8. `docs/prompts.md` — AI safety rules (read before any AI work)
9. `docs/security.md` — security requirements (read before auth/payments work)

---

## 15. Common Mistakes to Avoid

| Mistake | Correct Approach |
|---|---|
| Importing React-PDF in a Server Component | Only import in `/api/pdf/generate/route.ts` |
| Recharts component without `"use client"` | Always add `"use client"` to chart components |
| Trusting `params` as synchronous in Next.js 16 pages | Always `await params` — it is a `Promise` |
| Using `any` in TypeScript | Use proper types from `src/types/index.ts` |
| Naming unused params with `_prefix` | Remove the parameter entirely; ESLint won't accept `_prefix` |
| Creating `tailwind.config.js` | v4 uses `@theme` in `globals.css` only |
| Using `@supabase/auth-helpers-nextjs` | Use `@supabase/ssr` instead |
| Starting Milestone N+1 before Milestone N is confirmed complete | Always wait for explicit approval |
| Hardcoding secrets in source code | Always use `process.env.VARIABLE_NAME` |
| Calling AI from a Client Component | All AI calls must be in Server Actions or API routes |
