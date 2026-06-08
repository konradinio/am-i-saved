---
# Development History
## Am I Saved? — Permanent Project Record

**Version:** 1.0.0
**Created:** 2026-06-06
**Last updated:** 2026-06-07
**Governed by:** Documentation Governance Requirement — update at every milestone completion.

> This is the authoritative historical record of the Am I Saved? project.
> Every architectural decision, technology selection, command, and implementation
> action is recorded here for continuity across Claude sessions, developers, and time.

---

## Maintenance Rule

**Every milestone completion must update this file.** Add a new section under
"Milestone History" covering: decisions made, commands run, files created/changed,
validation results, known issues introduced, and issues resolved.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Public product name** | Am I Saved? |
| **Technical project name** | am-i-saved |
| **GitHub repository** | `am-i-saved` (owner: konradinio) |
| **GitHub URL** | `https://github.com/konradinio/am-i-saved.git` |
| **Local project folder** | `c:\PRIV\MyAPPS\am-i-saved` |
| **Vercel project name** | `am-i-saved` (not yet linked) |
| **Supabase project name** | `am-i-saved` (not yet created) |
| **Git branch** | `main` |
| **Git user** | Konrad / konradinio@gmail.com |

---

## 2. Project Vision

### Purpose

Am I Saved? gives every Christian — and every sincere seeker — an honest, private,
and structured way to examine their spiritual life. The platform does not judge the
soul. It illuminates the conscience.

**Core purpose (permanent tagline):** *Not certainty about heaven, but clarity about your soul.*

### Spiritual Safety Constraint (PERMANENT — NEVER OVERRIDE)

> The platform must NEVER claim certainty regarding salvation.
> The platform must NEVER declare whether a person is saved or not saved.
> The platform must NEVER declare that a person is destined for heaven or hell.
> Only God knows the human heart. The AI must not claim otherwise.

This constraint is enforced at three levels:
1. `SPIRITUAL_SAFETY_DISCLAIMER` constant in `src/lib/ai/openai.ts` — injected into every AI prompt
2. `docs/prompts.md` — 7 absolute AI safety rules
3. This document and `ARCHITECTURE_MASTER.md` — architectural record

### Target Audience

| Segment | Description |
|---|---|
| Primary | Practicing Catholics and Protestants seeking honest self-examination |
| Secondary | Orthodox Christians, non-denominational Christians |
| Tertiary | Seekers and non-Christians open to spiritual reflection |
| Coaching clients | Users seeking personalized spiritual direction |
| Gift buyers | People wanting to give the gift of reflection to loved ones |
| Sponsors | Donors funding coaching access for those who cannot afford it |

### Core Value Proposition

1. **Private** — Answers never shared publicly; spiritual data handled with dignity
2. **Honest** — The platform never flatters; reflects truthfully
3. **Structured** — Categories, scores, and recommendations give actionable clarity
4. **Non-judgmental** — No salvation declaration; only reflection and growth
5. **Denominationally inclusive** — Catholic, Protestant, Orthodox, and general paths
6. **Professional** — Beautiful charts, detailed reports, PDF delivery

### Monetization

| Product | Model |
|---|---|
| Spiritual Assessment + Executive Summary | Free (always) |
| Full Spiritual Report + PDF + Email | Paid (price TBD) |
| Gift Assessment Code | Paid |
| Coaching Session (one-on-one) | Paid per session |
| Sponsored Coaching Code | Paid by sponsor for another |

---

## 3. Pre-Development Technology Decisions

All technology selections were made before any code was written as part of a
pre-development planning session.

### Next.js 16.2.7

**Selected:** Yes — primary framework.

**Why:** App Router provides React Server Components, streaming, and co-located
server actions. Server-side-first architecture is required for security (OpenAI keys,
Stripe secret keys, Supabase service role key must never reach the browser). Next.js
16 (major version from 15.x lineage with breaking changes) was the current stable
version at project inception.

**Breaking changes vs Next.js 15:** Dynamic route `params` are now async
(`Promise<{ param: string }>`); all page components using params must `await` them.

### TypeScript (strict mode)

**Selected:** Yes — enforced project-wide.

**Why:** The project handles spiritual, payment, and user identity data. Type safety
prevents silent bugs at data boundaries. Strict mode enabled (`"strict": true` in
tsconfig). No `any` types except where unavoidable with third-party libraries.

### Tailwind CSS v4

**Selected:** Yes.

**Why:** Utility-first CSS allows fast, consistent styling. v4 was selected for
future-proofing. **Breaking change vs v3:** v4 uses CSS-native configuration via
`@theme` directive in `globals.css`. No `tailwind.config.js` exists.
Custom colors defined as: `--color-navy: #0f1f3c`, `--color-gold: #c9973a`,
`--color-ivory: #f5f0e8`.

### shadcn/ui 4.10.0

**Selected:** Yes — UI component library.

**Why:** Built on Radix UI (accessible primitives). Components are copied into
`src/components/ui/` (owned code, not a black-box dependency). Initialized with
`npx shadcn@4.10.0 init`. Components added: `button`, `card`, `badge`, `separator`.

### Supabase

**Selected:** Yes — database + auth + storage.

**Why:** Managed PostgreSQL with built-in Row Level Security, Magic Link / OTP
authentication (ideal for a spiritual tool where password friction should be low),
and object storage for PDF reports. `@supabase/ssr` package used for Next.js App
Router compatibility (`createBrowserClient` for client, `createServerClient` for server).

**Version installed:** `@supabase/ssr@0.10.3`, `@supabase/supabase-js@2.107.0`

**Not yet created:** The Supabase project must be created before Milestone 2.

### Stripe

**Selected:** Yes — payments.

**Why:** Industry standard for SaaS payments. Supports Checkout (hosted),
Apple Pay, Google Pay, Link, and Cards without PCI scope for the platform.
Webhook signature verification with `STRIPE_WEBHOOK_SECRET` is mandatory
(payment status is never trusted from client).

**Packages:** `stripe@22.2.0` (server-side), `@stripe/stripe-js@9.7.0` (browser publishable key only).

**Note:** `apiVersion` was intentionally omitted from the Stripe server constructor
to avoid a type mismatch between the installed SDK version (`2026-05-27.dahlia`)
and a hardcoded string. This will be set explicitly in Milestone 7.

### OpenAI

**Selected:** Yes — AI report generation.

**Why:** GPT-4 class models are capable of nuanced, theologically-informed spiritual
reflection. All calls are server-side only. `PROMPT_VERSION = "v1.0.0"` constant
ensures every AI-generated report is traceable to the prompt version that created it.

**Package:** `openai@6.42.0`

**Key constraint:** `SPIRITUAL_SAFETY_DISCLAIMER` in `src/lib/ai/openai.ts` must be
injected into every prompt. The AI must never declare salvation status.

### Resend

**Selected:** Yes — transactional email.

**Why:** Modern email API with excellent developer experience. Used exclusively for
transactional emails (report delivery, gift codes, coaching confirmations). Reports
are never embedded in email bodies — only signed download URLs are sent (security requirement).

**Package:** `resend@6.12.4`

### Recharts

**Selected:** Yes — data visualization.

**Why:** React-native SVG chart library. Renders spiritual health data as radar,
bar, and progress charts. **Critical constraint:** All Recharts components require
`"use client"` directive due to DOM dependency. Never use Recharts in a Server Component.

**Package:** `recharts@3.8.1`

### React-PDF (`@react-pdf/renderer`)

**Selected:** Yes — server-side PDF generation.

**Why:** Generates professional branded PDF reports. **Critical constraint:**
React-PDF uses browser APIs and must ONLY run inside API route handlers
(`/api/pdf/generate`). It must NEVER be imported in Server Components or Client
Components — doing so will crash the server with a browser API error.

**Package:** `@react-pdf/renderer@4.5.1`

### GitHub

**Selected:** Yes — version control hosting.

**Why:** Standard, integrates with Vercel for automatic deployments.
Remote: `https://github.com/konradinio/am-i-saved.git`

### Vercel

**Selected:** Yes — hosting.

**Why:** Best-in-class Next.js hosting. Serverless functions, automatic deployments
from GitHub, environment variable management, preview deployments per branch.
Project not yet linked — must be done before first deployment.

### VSCode + Claude Code (Claude Sonnet 4.6)

**Selected:** Yes — development environment.

**Why:** VSCode with Claude Code extension allows AI-assisted development with
full codebase context. Claude Sonnet 4.6 (`claude-sonnet-4-6`) was the model
used throughout Milestone 1. `CLAUDE.md` / `AGENTS.md` provide persistent
project instructions to every Claude session.

---

## 4. Development Environment Setup

### Hardware / OS

- Platform: Windows 11 Enterprise (10.0.26100)
- Shell: PowerShell (primary) + Bash (via Git for Windows)
- Working directory: `c:\PRIV\MyAPPS\am-i-saved`

### Installed Tools

| Tool | Version | Notes |
|---|---|---|
| Node.js | v24.15.0 | |
| npm | 11.12.1 | |
| Git | Pre-installed | |
| VSCode | Current | |
| Claude Code | VSCode extension | AI coding assistant |

### Git Configuration

```bash
git config user.email "konradinio@gmail.com"
git config user.name "Konrad"
```

### Repository Remote

```bash
git remote add origin https://github.com/konradinio/am-i-saved.git
```

Remote was added after project creation. As of Milestone 1 completion, no push
to remote has been performed. Local `main` tracks `remotes/origin/main`.

---

## 5. Milestone 1 Planning

### Intended Objective

Create a production-ready project skeleton. No business logic. Establish all
folder structures, placeholder files, service stubs, documentation, and types
so that every subsequent milestone can build on a stable foundation without
revisiting project structure.

### Scope

- Next.js 16 scaffold with TypeScript, Tailwind v4, shadcn/ui
- Complete `src/` folder structure matching architecture spec
- Homepage (full implementation — hero, CTAs, feature cards, disclaimer)
- All 20 placeholder pages
- All 6 placeholder API route handlers
- 8 typed service stub files
- 10 domain TypeScript types
- `SpiritualRadarChart` placeholder with mock data
- `.gitignore`, `.env.example`
- `README.md`
- 24 documentation files in `docs/`
- Git initialized with 2 structured commits

### Out of Scope (M1)

- Real authentication
- Real database or migrations
- Real questionnaire logic
- Real AI calls
- Real Stripe integration
- Real PDF generation
- Real email delivery

### Architecture Decisions Made in M1

1. App Router over Pages Router (RSC, streaming, server actions)
2. Tailwind v4 `@theme` directive (no `tailwind.config.js`)
3. `@supabase/ssr` for session management (not `@supabase/auth-helpers-nextjs`)
4. React-PDF isolated to API routes only
5. All Recharts components as Client Components (`"use client"`)
6. `SPIRITUAL_SAFETY_DISCLAIMER` as a code-level constant (not just documentation)
7. Prompt versioning via `PROMPT_VERSION` constant
8. Two-commit git strategy (docs first, code second)
9. Design palette locked: Navy `#0f1f3c`, Gold `#c9973a`, Ivory `#f5f0e8`
10. Denomination paths: Catholic, Protestant, Orthodox, Non-Denominational, Non-Christian, Unsure

---

## 6. Commands Executed

### Project Creation

```bash
# Create Next.js 16.2.7 app
npx create-next-app@16.2.7 am-i-saved \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### Dependency Installation

```bash
# Core runtime dependencies
npm install \
  @supabase/ssr \
  @supabase/supabase-js \
  @stripe/stripe-js \
  stripe \
  openai \
  resend \
  @react-pdf/renderer \
  recharts \
  lucide-react \
  zod \
  clsx \
  tailwind-merge \
  class-variance-authority

# shadcn/ui runtime (added by shadcn init)
# Includes: @radix-ui/react-slot, @radix-ui/react-separator,
#           tw-animate-css, @base-ui/react

# Dev dependencies
npm install --save-dev \
  @types/react-pdf \
  geist
```

Note: `@stripe/stripe-js` was added as a second pass after a TypeScript error
revealed it was missing from the initial install.

### shadcn/ui Initialization

```bash
npx shadcn@4.10.0 init
npx shadcn@4.10.0 add button card badge separator
```

### Validation

```bash
# TypeScript check — must return zero output (zero errors)
npx tsc --noEmit

# ESLint
npm run lint
```

### Git Setup

```bash
git init
git remote add origin https://github.com/konradinio/am-i-saved.git
git config user.email "konradinio@gmail.com"
git config user.name "Konrad"

# Commit 1 — documentation only
git add docs/ README.md
git commit -m "docs: establish architecture, roadmap and milestone framework"

# Commit 2 — all code
git add -A
git commit -m "chore: create initial project foundation"
```

---

## 7. Repository Structure Created

```
am-i-saved/                         Root
├── .claude/settings.local.json     Claude Code extension settings
├── .env.example                    All required env vars (safe to commit)
├── .gitignore                      Blocks .env.local and real env files
├── AGENTS.md                       AI coding instructions (→ CLAUDE.md)
├── CLAUDE.md                       Points to AGENTS.md
├── README.md                       Project overview and setup guide
├── components.json                 shadcn/ui configuration
├── eslint.config.mjs               ESLint config (Next.js + TypeScript)
├── next.config.ts                  Next.js config
├── package.json                    Dependencies (Node 24, npm 11)
├── postcss.config.mjs              PostCSS for Tailwind v4
├── tsconfig.json                   TypeScript strict mode
│
├── docs/                           Documentation (all files, 24 total)
│   ├── ACTIVE_MILESTONE.md         Current milestone status
│   ├── ARCHITECTURE_MASTER.md      Full architecture reference
│   ├── BACKLOG.md                  P0–P3 backlog + M1 tech debt
│   ├── CLAUDE_SESSION_HANDOFF.md   New-session quick-start guide
│   ├── DEVELOPMENT_HISTORY.md      ← This file. Permanent project record.
│   ├── MILESTONE_01_FOUNDATION.md
│   ├── MILESTONE_02_AUTH.md
│   ├── MILESTONE_03_DATABASE.md
│   ├── MILESTONE_04_QUESTIONNAIRE.md
│   ├── MILESTONE_05_AI_EXEC_SUMMARY.md
│   ├── MILESTONE_06_CHARTS.md
│   ├── MILESTONE_07_STRIPE_PAYWALL.md
│   ├── MILESTONE_08_FULL_REPORT.md
│   ├── MILESTONE_09_PDF.md
│   ├── MILESTONE_10_EMAIL.md
│   ├── MILESTONE_11_GIFT_CODES.md
│   ├── MILESTONE_12_CONSCIENCE.md
│   ├── MILESTONE_13_COACHING.md
│   ├── MILESTONE_14_SPONSORSHIP.md
│   ├── PRODUCT_VISION.md
│   ├── PROJECT_LOG.md              Chronological decision log
│   ├── ROADMAP.md                  15-phase product roadmap
│   ├── prompts.md                  AI safety rules + prompt schemas
│   └── security.md                 Security model and requirements
│
├── public/                         Static assets (default Next.js SVGs)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              Root layout — Geist fonts, Header, Footer
│   │   ├── page.tsx                Homepage — full implementation
│   │   ├── globals.css             Tailwind v4 @theme + brand tokens
│   │   ├── favicon.ico
│   │   ├── about/page.tsx          Placeholder
│   │   ├── account/page.tsx        Placeholder (protected — M2)
│   │   ├── contact/page.tsx        Placeholder
│   │   ├── how-it-works/page.tsx   Placeholder
│   │   ├── login/page.tsx          Placeholder (M2)
│   │   ├── pricing/page.tsx        Placeholder (M7)
│   │   ├── privacy/page.tsx        Placeholder
│   │   ├── register/page.tsx       Placeholder (M2)
│   │   ├── terms/page.tsx          Placeholder
│   │   ├── assessment/
│   │   │   ├── start/page.tsx      Placeholder (M4)
│   │   │   ├── history/page.tsx    Placeholder (M4)
│   │   │   └── [assessmentId]/
│   │   │       ├── step/[stepId]/page.tsx   Placeholder (M4)
│   │   │       ├── summary/page.tsx         Placeholder (M5)
│   │   │       ├── full-report/page.tsx     Placeholder (M8)
│   │   │       └── upgrade/page.tsx         Placeholder (M7)
│   │   ├── conscience/
│   │   │   ├── page.tsx            Placeholder (M12)
│   │   │   ├── start/page.tsx      Placeholder (M12)
│   │   │   └── history/page.tsx    Placeholder (M12)
│   │   ├── gift/
│   │   │   ├── page.tsx            Placeholder (M11)
│   │   │   └── redeem/page.tsx     Placeholder (M11)
│   │   ├── coaching/
│   │   │   ├── page.tsx            Placeholder (M13)
│   │   │   ├── book/page.tsx       Placeholder (M13)
│   │   │   └── calendar/page.tsx   Placeholder (M13)
│   │   ├── sponsor/
│   │   │   ├── page.tsx            Placeholder (M14)
│   │   │   └── redeem/page.tsx     Placeholder (M14)
│   │   └── api/
│   │       ├── ai/generate-summary/route.ts       Placeholder (M5)
│   │       ├── ai/generate-full-report/route.ts   Placeholder (M8)
│   │       ├── email/send-report/route.ts         Placeholder (M10)
│   │       ├── pdf/generate/route.ts              Placeholder (M9)
│   │       ├── stripe/create-checkout-session/route.ts  Placeholder (M7)
│   │       └── stripe/webhook/route.ts            Placeholder (M7)
│   │
│   ├── components/
│   │   ├── charts/
│   │   │   └── SpiritualRadarChart.tsx   Recharts radar, mock data, "use client"
│   │   ├── layout/
│   │   │   ├── Header.tsx          Sticky header, logo, nav, CTA buttons
│   │   │   ├── Footer.tsx          Disclaimer text, copyright, links
│   │   │   └── Navigation.tsx      Responsive nav, mobile hamburger, "use client"
│   │   └── ui/
│   │       ├── badge.tsx           shadcn/ui
│   │       ├── button.tsx          shadcn/ui
│   │       ├── card.tsx            shadcn/ui
│   │       └── separator.tsx       shadcn/ui
│   │
│   ├── lib/
│   │   ├── ai/openai.ts            OpenAI client, PROMPT_VERSION, SPIRITUAL_SAFETY_DISCLAIMER
│   │   ├── auth/require-user.ts    requireUser() stub → redirect("/login")
│   │   ├── email/resend.ts         Resend client, EMAIL_FROM constant
│   │   ├── pdf/generate-report-pdf.ts   Typed placeholder, returns { ok: false }
│   │   ├── stripe/
│   │   │   ├── client.ts           getStripe() singleton (browser, publishable key)
│   │   │   └── server.ts           stripe instance (server only, secret key)
│   │   ├── supabase/
│   │   │   ├── client.ts           createClient() → createBrowserClient
│   │   │   └── server.ts           createClient() + createServiceClient()
│   │   ├── utils.ts                shadcn/ui utils shim (re-exports cn())
│   │   ├── utils/index.ts          cn(), formatDate(), truncate()
│   │   └── validation/schemas.ts   Zod: uuidSchema, emailSchema, paginationSchema
│   │
│   └── types/
│       └── index.ts                10 domain types (see Section 8)
│
├── supabase/
│   ├── migrations/                 Empty — SQL migrations added in M3
│   └── policies/                   Empty — RLS policies added in M3
│
└── data/
    └── questionnaire/              Empty — JSON question files added in M4
```

---

## 8. Documentation Governance

All documentation files in `docs/` are treated as source code:
- Never out of sync with the codebase
- Updated at every milestone completion
- Reviewed before any milestone begins

| File | Purpose | Updated |
|---|---|---|
| `ACTIVE_MILESTONE.md` | Current milestone, deliverables, open issues, next preview | Every milestone |
| `ARCHITECTURE_MASTER.md` | Full stack, principles, modules, data flow, security, folder structure | When architecture changes |
| `BACKLOG.md` | P0–P3 backlog items, known tech debt | Every milestone |
| `CLAUDE_SESSION_HANDOFF.md` | New Claude session quick-start guide | Every milestone |
| `DEVELOPMENT_HISTORY.md` | Permanent chronological project record | Every milestone |
| `MILESTONE_0N_*.md` | Spec for each milestone (objective, scope, deliverables, success criteria) | When scope changes |
| `PRODUCT_VISION.md` | Vision, audience, value proposition, monetization | When product decisions change |
| `PROJECT_LOG.md` | Running log of meaningful decisions (one entry per milestone) | Every milestone |
| `ROADMAP.md` | Phase-by-phase product roadmap | When phases change |
| `prompts.md` | AI safety rules, prompt schemas, versioning strategy | When prompts change |
| `security.md` | Security model, data sensitivity, requirements | When security requirements change |

---

## 9. Git History

### Repository

- **Remote:** `https://github.com/konradinio/am-i-saved.git`
- **Branch:** `main`
- **Push status:** Not yet pushed (as of Milestone 1 completion)

### Commit Log

| Hash | Date | Message |
|---|---|---|
| `2381bce` | 2026-06-06 20:15 CST | `Initial commit from Create Next App` |
| `58a223e` | 2026-06-06 21:13 CST | `docs: establish architecture, roadmap and milestone framework` |
| `0bcc91f` | 2026-06-06 21:19 CST | `chore: create initial project foundation` |

### Commit 1 — `2381bce` (Create Next App initial commit)

Generated automatically by `create-next-app`. Contains:
- `.claude/settings.local.json`, `.gitignore`, `AGENTS.md`, `CLAUDE.md`
- `eslint.config.mjs`, `next.config.ts`, `package.json`, `package-lock.json`
- `postcss.config.mjs`, `tsconfig.json`
- `public/` SVG assets
- Default `src/app/` (layout, page, globals.css, favicon.ico)

### Commit 2 — `58a223e` (Documentation framework)

23 files changed, 1960 insertions. Contains:
- `README.md` (rewritten with full project overview)
- All 22 files in `docs/` (see Section 8)

### Commit 3 — `0bcc91f` (Code foundation)

60 files changed, 6573 insertions. Contains:
- `.env.example`, `components.json`
- Updated `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`
- All 20 placeholder pages
- All 6 placeholder API route handlers
- All `src/components/` files
- All `src/lib/` files
- `src/types/index.ts`

### Two-Commit Strategy (Architectural Rule)

Every milestone must produce exactly two commits:
1. **Docs commit:** `docs: <milestone description>` — `docs/` changes only
2. **Code commit:** `feat: <milestone description>` or `chore: <milestone description>` — all other files

This keeps documentation changes isolated and git-bisectable.

---

## 10. Validation Results

### After Milestone 1 Completion

#### TypeScript (`npx tsc --noEmit`)

**Result: PASS — zero errors, zero warnings.**

Errors resolved during development:

| Error | Cause | Fix |
|---|---|---|
| `Cannot find module '@stripe/stripe-js'` | Package not installed in initial pass | `npm install @stripe/stripe-js` |
| `Type '"2025-05-28.basil"' not assignable to '"2026-05-27.dahlia"'` | Stripe SDK version mismatch | Removed `apiVersion` from Stripe constructor |
| Recharts `Tooltip` formatter typed as `(value: number)` | Recharts expects `ValueType \| undefined` | Changed to `(value) =>` with `value ?? 0` |

#### ESLint (`npm run lint`)

**Result: PASS — zero warnings, zero errors.**

Warnings resolved after initial Milestone 1 commit:

| Warning | File | Fix |
|---|---|---|
| `'_req' is defined but never used` | `api/ai/generate-summary/route.ts` | Removed parameter + `NextRequest` import |
| `'_req' is defined but never used` | `api/ai/generate-full-report/route.ts` | Same |
| `'_req' is defined but never used` | `api/email/send-report/route.ts` | Same |
| `'_req' is defined but never used` | `api/pdf/generate/route.ts` | Same |
| `'_req' is defined but never used` | `api/stripe/create-checkout-session/route.ts` | Same |
| `'_body' is assigned but never used` | `api/stripe/webhook/route.ts` | Removed `const _body = await req.text()` line; also removed `req` parameter |

**Root cause:** The ESLint config (Next.js default) does not configure `argsIgnorePattern`
for the underscore prefix convention. The fix was to remove unused parameters entirely
rather than rely on the underscore convention.

---

## 11. Known Placeholders

Every placeholder is tagged `// TODO (Milestone N):` in source code.

### Pages

| Route | File | Target Milestone |
|---|---|---|
| `/login` | `src/app/login/page.tsx` | M2 |
| `/register` | `src/app/register/page.tsx` | M2 |
| `/account` | `src/app/account/page.tsx` | M2 |
| `/about` | `src/app/about/page.tsx` | Pre-launch |
| `/contact` | `src/app/contact/page.tsx` | Pre-launch |
| `/how-it-works` | `src/app/how-it-works/page.tsx` | Pre-launch |
| `/pricing` | `src/app/pricing/page.tsx` | M7 |
| `/privacy` | `src/app/privacy/page.tsx` | Pre-launch |
| `/terms` | `src/app/terms/page.tsx` | Pre-launch |
| `/assessment/start` | `src/app/assessment/start/page.tsx` | M4 |
| `/assessment/history` | `src/app/assessment/history/page.tsx` | M4 |
| `/assessment/[id]/step/[stepId]` | `src/app/assessment/[assessmentId]/step/[stepId]/page.tsx` | M4 |
| `/assessment/[id]/summary` | `src/app/assessment/[assessmentId]/summary/page.tsx` | M5 |
| `/assessment/[id]/upgrade` | `src/app/assessment/[assessmentId]/upgrade/page.tsx` | M7 |
| `/assessment/[id]/full-report` | `src/app/assessment/[assessmentId]/full-report/page.tsx` | M8 |
| `/conscience` | `src/app/conscience/page.tsx` | M12 |
| `/conscience/start` | `src/app/conscience/start/page.tsx` | M12 |
| `/conscience/history` | `src/app/conscience/history/page.tsx` | M12 |
| `/gift` | `src/app/gift/page.tsx` | M11 |
| `/gift/redeem` | `src/app/gift/redeem/page.tsx` | M11 |
| `/coaching` | `src/app/coaching/page.tsx` | M13 |
| `/coaching/book` | `src/app/coaching/book/page.tsx` | M13 |
| `/coaching/calendar` | `src/app/coaching/calendar/page.tsx` | M13 |
| `/sponsor` | `src/app/sponsor/page.tsx` | M14 |
| `/sponsor/redeem` | `src/app/sponsor/redeem/page.tsx` | M14 |

### API Routes

| Route | File | Target Milestone |
|---|---|---|
| `POST /api/ai/generate-summary` | `src/app/api/ai/generate-summary/route.ts` | M5 |
| `POST /api/ai/generate-full-report` | `src/app/api/ai/generate-full-report/route.ts` | M8 |
| `POST /api/email/send-report` | `src/app/api/email/send-report/route.ts` | M10 |
| `POST /api/pdf/generate` | `src/app/api/pdf/generate/route.ts` | M9 |
| `POST /api/stripe/create-checkout-session` | `src/app/api/stripe/create-checkout-session/route.ts` | M7 |
| `POST /api/stripe/webhook` | `src/app/api/stripe/webhook/route.ts` | M7 |

### Service Stubs

| File | Placeholder Behavior | Target Milestone |
|---|---|---|
| `src/lib/auth/require-user.ts` | `requireUser()` always redirects to `/login` | M2 |
| `src/lib/ai/openai.ts` | Client initialized; no generation functions yet | M5 |
| `src/lib/pdf/generate-report-pdf.ts` | Returns `{ ok: false, error: "Not implemented" }` | M9 |
| `src/lib/email/resend.ts` | Client initialized; no send functions yet | M10 |
| `src/lib/stripe/server.ts` | Client initialized; no checkout/webhook helpers | M7 |
| `src/lib/validation/schemas.ts` | Only base schemas (uuid, email, pagination) | M3+ |

### Charts

| Component | Placeholder Behavior | Target Milestone |
|---|---|---|
| `SpiritualRadarChart.tsx` | Uses hardcoded mock data; no real props used | M6 |

---

## 12. Risks and Technical Debt

### Active Risks

| Risk | Severity | Notes |
|---|---|---|
| Supabase project not created | High | Required before M2 can begin |
| GitHub remote not pushed | Medium | Local only; risk of data loss |
| Vercel project not linked | Medium | Required before first deployment |
| No rate limiting | High | Must add in M2 or M3 |
| `requireUser()` is a redirect stub | High | All "protected" routes are currently unprotected |
| No `.gitattributes` for line endings | Low | CRLF warnings on every commit on Windows |
| No error boundary components | Medium | Add in M2 |
| No loading state components | Medium | Add in M2 |
| No 404 page | Low | Add before launch |
| No robots.txt or sitemap | Low | Add before launch |

### Technical Debt (Milestone 1)

| Item | Priority | Notes |
|---|---|---|
| `src/lib/utils.ts` duplicates `src/lib/utils/index.ts` | Low | shadcn places `utils.ts` at `lib/utils.ts`; both coexist. shadcn components import from `@/lib/utils`, custom code from `@/lib/utils/index.ts`. |
| Stripe `apiVersion` not set | Low | Will be set explicitly in M7 when Stripe version is confirmed |
| No automated test suite | High | Add Vitest + Playwright starting M3 |
| Tailwind color utilities rely on CSS variables | Medium | Confirm `text-navy`, `bg-gold`, `text-ivory` work correctly in M2 |

---

## 13. Current Status

**As of 2026-06-07:**

| Area | Status |
|---|---|
| Project scaffolded | ✅ Complete |
| TypeScript | ✅ Zero errors |
| ESLint | ✅ Zero warnings |
| Homepage | ✅ Full implementation |
| Placeholder pages | ✅ 20 pages created |
| Placeholder API routes | ✅ 6 routes created |
| Service stubs | ✅ 8 stubs created |
| Domain types | ✅ 10 types defined |
| Documentation | ✅ 24 docs files |
| Git history | ✅ 3 commits on `main` |
| GitHub push | ⚠️ Not yet pushed |
| Supabase project | ❌ Not yet created |
| Vercel project | ❌ Not yet linked |
| Milestone 2 | ⏳ Not started |

**Current milestone:** M1 Complete. Holding at M1. Next: M2 — Authentication.

---

## 14. Historical Timeline

### 2026-06-06

**~18:00 CST — Project Conception**
Project planning session initiated. Two PDF documents provided:
1. Milestone 1 Prompt — exact scope for M1
2. AI Coding Assistant Project Setup Prompt v2 — master architecture/constitution document

**~18:30 CST — Pre-Development Planning**
Technology stack selected, documented, and approved. Project identity confirmed:
- Public name: Am I Saved?
- Technical name: am-i-saved
- All platform names aligned

**~19:00 CST — Development Begins**

```bash
npx create-next-app@16.2.7 am-i-saved ...
```

Initial `2381bce` commit created automatically by `create-next-app`.

**~19:00–21:00 CST — Milestone 1 Execution**

Sequential implementation:
1. `package.json` — all dependencies installed
2. shadcn/ui initialized, 4 components added
3. `.gitignore` updated, `.env.example` created
4. `src/types/index.ts` — 10 domain types
5. `src/lib/` — 8 service stubs
6. `src/components/layout/` — Header, Footer, Navigation
7. `src/app/globals.css` — Tailwind v4 `@theme` + brand tokens
8. `src/app/layout.tsx` — Root layout with Geist fonts
9. `src/app/page.tsx` — Full homepage
10. All 20 placeholder pages
11. All 6 placeholder API route handlers
12. `SpiritualRadarChart.tsx` — Recharts mock data
13. `README.md` — Full project documentation
14. All 24 `docs/` files

**~21:00 CST — TypeScript Errors Fixed**

Three TypeScript errors encountered and resolved:
- `@stripe/stripe-js` not installed → `npm install @stripe/stripe-js`
- Stripe `apiVersion` type mismatch → removed `apiVersion` from constructor
- Recharts `Tooltip` formatter type → changed to `(value) =>` with `value ?? 0`

`npx tsc --noEmit` → zero errors.

**~21:13 CST — Commit 2 Created**

```
58a223e docs: establish architecture, roadmap and milestone framework
```
23 files changed, 1960 insertions.

**~21:19 CST — Commit 3 Created**

```
0bcc91f chore: create initial project foundation
```
60 files changed, 6573 insertions.

**~21:30 CST — Milestone 1 Complete**

Full Milestone 1 Completion Report delivered (12-section format).

### 2026-06-07

**ESLint Cleanup**

6 ESLint warnings resolved in all API route placeholder files.
All route handlers changed from `POST(_req: NextRequest)` to `POST()`.
`NextRequest` import removed from all 6 files.

`npm run lint` → zero warnings, zero errors.

**Documentation Memory System Created**

`docs/DEVELOPMENT_HISTORY.md` and `docs/CLAUDE_SESSION_HANDOFF.md` created.
Purpose: Enable new Claude sessions to reconstruct full project state without
prior context.

---

## Milestone History

### Milestone 1 — Foundation (2026-06-06) ✅

**Status:** Complete
**Commits:** `58a223e`, `0bcc91f`
**TypeScript:** Zero errors
**ESLint:** Zero warnings (6 warnings fixed on 2026-06-07)
**Files created:** 83 (excluding `node_modules`, `.next`, `package-lock.json`)
**Docs created:** 24

**Key decisions:**
- Next.js 16 App Router chosen for RSC and server-side-first architecture
- Tailwind v4 `@theme` directive (breaking change vs v3, no `tailwind.config.js`)
- `@supabase/ssr` for session management
- React-PDF restricted to API routes only (browser API isolation)
- `SPIRITUAL_SAFETY_DISCLAIMER` enforced as a code constant
- Two-commit git strategy established as permanent convention

**Known issues introduced:** 6 ESLint warnings (fixed same-day 2026-06-07)

### Milestone 2 — Authentication Foundation (2026-06-08) ✅

**Status:** Complete
**TypeScript:** Zero errors
**ESLint:** Zero warnings
**Build:** Pass (32 routes)

**Key decisions:**

1. **`proxy.ts` not `middleware.ts`** — Next.js 16 deprecated `middleware.ts` in v16.0.0.
   Critical discovery from reading `node_modules/next/dist/docs/proxy.md`.
   The file is now `src/proxy.ts` and the exported function must be named `proxy`.
   This was not documented externally — only discoverable from the Next.js 16 local docs.

2. **Anonymous-first philosophy** — Only `/account` is protected. All assessment routes
   (`/assessment/*`) are public so users can complete the questionnaire without creating
   an account. Auth is offered at the full report paywall (M7). This decision differs
   from the original M2 spec which assumed all routes would be protected.

3. **`user_metadata` bridge** — Nickname, denomination, and age range are stored in
   Supabase `user_metadata` as a temporary measure until M3 creates the `profiles` table.
   The `requireUser()` function reads from `user_metadata` and maps to the `AuthUser` type.

4. **Email + password added** — Original M2 spec was magic link only. Password auth
   was added as the primary option. Magic link is a toggle in `LoginForm`.

5. **Open redirect protection** — `?redirect=` parameter validated via
   `redirectTo.startsWith("/")` guard before use.

6. **`useActionState` from `react`** — React 19's `useActionState` is imported from
   the `react` package (not `react-dom`). This was important to get right for strict TypeScript.

**Files created (M2):**

- `src/proxy.ts`
- `src/app/auth/callback/route.ts`
- `src/app/actions/auth.ts`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`

**Files modified (M2):**

- `src/lib/validation/schemas.ts` — added loginSchema, magicLinkSchema, registerSchema, denominationValues, ageRangeValues
- `src/lib/auth/require-user.ts` — real Supabase implementation, expanded AuthUser type
- `src/lib/supabase/client.ts` — removed TODO comments
- `src/lib/supabase/server.ts` — removed TODO comments
- `src/app/login/page.tsx` — replaced placeholder
- `src/app/register/page.tsx` — replaced placeholder
- `src/app/account/page.tsx` — real protected page

**Known issues introduced:** none
**Known issues resolved:** All TypeScript errors and ESLint warnings

### Milestone 3 — Database Schema, RLS & Anonymous Strategy (2026-06-08) ✅

**Status:** Complete
**TypeScript:** Zero errors
**ESLint:** Zero warnings
**Build:** Pass (34 routes, pre-existing config warning in Stripe placeholder unchanged)

**Key decisions:**

1. **Supabase anonymous sign-ins (Option 4)** — Anonymous users get a real `auth.users`
   entry with `is_anonymous = true`. `user_id` is always non-null. RLS works identically
   for anonymous and permanent users. Zero data migration on account conversion. Alternative
   considered: nullable `user_id` in assessment tables — rejected because it requires
   service-role bypass for all anonymous data access and creates a complex migration later.

2. **`ai_coaching_sessions` and `ai_coaching_action_plans` deferred to M5** — Their schema
   depends on the AI coaching interaction design (chat vs. structured questionnaire) which
   isn't defined until M5. Creating them now risks a schema change mid-product with
   data already present.

3. **`life_spiritual_coaches` and human coaching tables deferred to M13** — Privacy-first
   redesign needed. Future schema uses `display_name` only; no address, sex, or phone.
   Privacy review required before adding any PII fields.

4. **`Relationships: []` required in Database type** — The `@supabase/postgrest-js` package's
   `GenericTable` type requires a `Relationships` field. Missing this field causes all
   `.from()` query results to be typed as `never`. Discovered during M3 TypeScript validation.
   Auto-generated Supabase types always include this field; hand-written Database types must too.

5. **`Views`, `Functions`, `CompositeTypes` required in Database type** — The `GenericSchema`
   constraint in `@supabase/postgrest-js` requires `Views` and `Functions`. Added as
   `{ [_ in never]: never }` empty types.

6. **Backfill in profiles migration** — Migration 002 includes an idempotent INSERT to create
   profile rows for any `auth.users` that existed before M3 (i.e., M2 test accounts).
   This prevents NULL-profile edge cases in `require-user.ts`.

7. **Profile trigger `SECURITY DEFINER`** — The `handle_new_user()` trigger function is
   declared `SECURITY DEFINER` so it runs with owner privileges when inserting into
   `public.profiles` from the `auth.users` INSERT event.

**Files created (M3):**

- `supabase/migrations/20260608000001_extensions_and_enums.sql`
- `supabase/migrations/20260608000002_profiles.sql`
- `supabase/migrations/20260608000003_assessments.sql`
- `supabase/migrations/20260608000004_reports.sql`
- `supabase/migrations/20260608000005_action_plans.sql`
- `supabase/migrations/20260608000006_payments.sql`
- `supabase/migrations/20260608000007_conscience.sql`
- `supabase/migrations/20260608000008_storage.sql`
- `src/types/database.ts` — Supabase Database generic type (13 tables, 11 ENUMs)

**Files modified (M3):**

- `src/types/index.ts` — added AgeRange, ActionPlanStatus, AssessmentActionPlan, ConscienceResponse, ConscienceActionPlan; updated UserProfile, Assessment, AssessmentResponse, ConscienceSession; removed CoachingBooking/CoachingBookingStatus
- `src/lib/supabase/client.ts` — added `<Database>` generic
- `src/lib/supabase/server.ts` — added `<Database>` generic to both clients
- `src/lib/auth/require-user.ts` — reads from profiles table; added isAnonymous; changed ageRange type to AgeRange
- `src/app/actions/auth.ts` — signUp detects is_anonymous for conversion; added startAnonymousSession()
- `src/app/account/page.tsx` — anonymous session banner; hides email for anonymous users

**Known issues introduced:** none
**Known issues resolved:** `profiles` table not yet created (M2 open issue)
