# Architecture Master Document
## Am I Saved? — Christian Spiritual Reflection Platform

**Version:** 1.3.0
**Created:** 2026-06-06
**Last updated:** 2026-06-13
**Milestone:** 3 — Database (product funnel revised pre-M4)

---

## Overview

Am I Saved? is a modular, server-first web platform built on Next.js 16 (App Router). Users complete a spiritual self-assessment questionnaire, receive a free AI-generated executive summary, and can unlock a comprehensive full spiritual report via Stripe.

**Core constraint:** The platform must NEVER claim certainty regarding salvation, heaven, hell, or divine judgment. Only God knows the human heart.

**Core purpose:** Not certainty about heaven, but clarity about your soul.

---

## Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 16, React, TypeScript | SSR, App Router, type safety |
| UI | Tailwind CSS v4, shadcn/ui | Utility-first, accessible components |
| Backend | Next.js Server Actions, API Routes | Co-located, type-safe server logic |
| Database | Supabase PostgreSQL | Managed Postgres, built-in auth, RLS |
| Auth | Supabase Auth | Magic Links + OTP, session management |
| Storage | Supabase Storage | PDF storage with signed URLs |
| AI | OpenAI API | GPT-4 for spiritual report generation |
| Payments | Stripe | Checkout, webhooks, Apple/Google Pay |
| Email | Resend | Transactional email delivery |
| Charts | Recharts | Client-side SVG charts, PDF-exportable |
| PDF | React-PDF | Server-side PDF generation in API routes |
| Validation | Zod | Runtime type validation on all inputs |
| Hosting | Vercel | Next.js-optimized, serverless |

---

## Architectural Principles

### Security First
- All secrets in environment variables only
- All AI calls server-side (never client-side)
- All Stripe operations server-side
- Stripe webhooks verified with signing secret
- Supabase service role key never exposed to browser
- Row Level Security (RLS) on all tables (Milestone 3+)
- Never trust client-reported payment status

### Mobile First
- Tailwind CSS responsive utilities throughout
- Touch-friendly UI components
- Native mobile app feel

### Server-Side AI
- All OpenAI calls in API routes or Server Actions
- Prompt versioning enforced (PROMPT_VERSION constant)
- Spiritual safety guardrails in every prompt
- AI output never declares salvation status

### Scalability
- Loosely coupled modules — each can be developed independently
- Supabase handles database scaling
- Vercel handles serverless auto-scaling
- React-PDF runs in API routes to avoid browser memory limits

### Maintainability
- Clear folder structure — one concern per directory
- TypeScript strict mode
- Zod validation at all system boundaries
- Documentation as code — docs/ always in sync with codebase

---

## Core Modules

| Module | Milestone | Description |
|---|---|---|
| Foundation | M1 | Project structure, placeholder pages, docs |
| Auth | M2 | Supabase Auth — Magic Links + OTP |
| Database | M3 | Schema, migrations, RLS policies |
| Questionnaire | M4 | Multi-path assessment engine |
| AI Executive Summary | M5 | Free OpenAI-powered summary |
| Charts | M6 | Recharts radar, bar, and progress charts |
| Stripe Paywall | M7 | Full report checkout flow |
| Full AI Report | M8 | Comprehensive spiritual narrative |
| PDF Generation | M9 | React-PDF server-side generation |
| Email Delivery | M10 | Resend — PDF download link delivery |
| Gift Codes | M11 | Assessment gift purchase + redemption |
| Examination of Conscience | M12 | Catholic + General Christian paths |
| Coaching | M13 | Coach booking + calendar integration |
| Sponsorship | M14 | Sponsored coaching codes |

---

## Data Flow

```
User
  → Homepage
  → Start Assessment — NO LOGIN REQUIRED
  → startAnonymousSession() → anonymous auth.users entry (is_anonymous = true)
  → Questionnaire Engine (M4) — auto-saves progress to anonymous user_id
  → Submit Assessment
  → OpenAI: Executive Summary (M5) — server-side only
  → Charts displayed on same page as summary (M6) — FREE TIER
  → [Free users stop here — upsell CTA visible]
  → User clicks "Unlock Full Report" → email collection form
  → Stripe Checkout — email + anonymous user_id in metadata
  → Payment confirmed via Webhook (M7):
      → supabase.auth.admin.updateUserById(userId, { email }) — anonymous→email account
      → INSERT payments record
      → generateFullReport() triggered
  → User redirected to /assessment/[id]/full-report (loading state)
  → OpenAI: Full Report (M8) — server-side, triggered from webhook
  → Report renders on-screen when ready (~15–30 seconds)
  → React-PDF: Generate PDF (M9) — API route only, async after report text ready
  → Supabase Storage: Upload PDF (M9)
  → "Download PDF" button activates on report page
  → Resend: Combined email — magic link + PDF download link (M10)
  → User returns to account via magic link (no password required, ever)
```

---

## Security Architecture

### Secrets Model
```
Public (NEXT_PUBLIC_*):     Supabase URL, Supabase anon key, Stripe publishable key
Private (server only):       Supabase service role key, OpenAI key, Stripe secret,
                             Stripe webhook secret, Resend key
Never in source code:        All of the above — .env.local only
```

### Next.js 16 Proxy (Breaking Change)

`middleware.ts` is deprecated in Next.js v16.0.0 and renamed to `proxy.ts`.
The exported function must be named `proxy` (not `middleware`).

```ts
// src/proxy.ts  ← correct (Next.js 16)
export async function proxy(request: NextRequest) { ... }
```

Do NOT create `src/middleware.ts` — it will silently do nothing in v16.

### Authentication Flow (M2+)
1. Anonymous users access all assessment routes — no login prompted (M4+)
2. At payment (M7): email collected → Stripe webhook converts anonymous account to email-linked account
3. Magic link is the primary returning-user sign-in method (no password required in primary funnel)
4. `/login` magic link: user enters email → Supabase sends OTP → user clicks → `/auth/callback` exchanges code for session
5. `/login` password: `signInWithPassword` — available for users who registered with password
6. `proxy.ts` calls `auth.getUser()` on every request to refresh the session cookie
7. Protected routes call `requireUser()` — server-side session verification
8. Client-side auth state is never trusted

### Anonymous-First Flow (M3+)

Assessment routes (`/assessment/*`) are intentionally public. When a user starts an
assessment, `startAnonymousSession()` creates a real Supabase `auth.users` entry with
`is_anonymous = true`. All data is saved with this `user_id`. RLS works identically
for anonymous and permanent users — no NULL user_id, no service-role bypass needed.

**Primary conversion path (M7 Stripe webhook):**
`supabase.auth.admin.updateUserById(userId, { email })` — email-only conversion, no password.
The `user_id` stays the same — zero data migration. The `is_anonymous` flag becomes `false`.
Magic link is the sole future sign-in method for these accounts.

**Secondary conversion path (registration form):**
`supabase.auth.updateUser({ email, password })` — full account with password.
Used by users who click `/register` directly (not the primary funnel).

**Anonymous cleanup:** Unconverted anonymous users are not deleted automatically.
A cron cleanup job (delete `is_anonymous = true` users older than 30 days with no
payment) is deferred to a later milestone.

### Payment Security (M7+)
1. Checkout session created server-side with Stripe secret key
2. User redirected to Stripe Checkout
3. Stripe sends webhook event to `/api/stripe/webhook`
4. Webhook signature verified with `STRIPE_WEBHOOK_SECRET`
5. Payment status updated in Supabase by webhook handler only
6. Report unlocked based on database payment record — never client claim

---

## Folder Structure

```
src/
  app/
    (public)/           Public marketing pages
    (auth)/             Login, register, account
    assessment/         Assessment flow with dynamic routes
    conscience/         Examination of Conscience module
    gift/               Gift code purchase and redemption
    coaching/           Coaching booking and calendar
    sponsor/            Sponsorship purchase and redemption
    api/
      ai/               AI generation endpoints (server only)
      stripe/           Stripe Checkout + webhook
      pdf/              PDF generation (React-PDF, server only)
      email/            Email delivery endpoints
  components/
    ui/                 shadcn/ui primitives
    layout/             Header, Footer, Navigation
    assessment/         Assessment-specific components
    charts/             Recharts chart components
    report/             Report display components
    payment/            Paywall and checkout components
    gift/               Gift code UI
    coaching/           Coaching booking UI
  lib/
    supabase/           client.ts, server.ts
    stripe/             client.ts, server.ts
    ai/                 openai.ts
    email/              resend.ts
    pdf/                generate-report-pdf.ts
    validation/         schemas.ts (Zod)
    auth/               require-user.ts
    utils/              shared utilities
  types/
    index.ts            All domain TypeScript types

docs/                   Architecture, roadmap, milestone docs
supabase/
  migrations/           SQL migration files
  policies/             RLS policy files
data/
  questionnaire/        JSON questionnaire definitions (M4+)
```
