# Architecture Master Document
## Am I Saved? — Christian Spiritual Reflection Platform

**Version:** 1.0.0
**Created:** 2026-06-06
**Milestone:** 1 — Foundation

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
  → Start Assessment (requires Auth — M2)
  → Questionnaire Engine (M4) — auto-saves progress
  → Submit Assessment
  → OpenAI: Executive Summary (M5) — server-side only
  → Charts displayed (M6)
  → [Free users stop here]
  → Stripe Checkout (M7)
  → Payment confirmed via Webhook (M7)
  → OpenAI: Full Report (M8) — server-side only
  → React-PDF: Generate PDF (M9) — API route only
  → Supabase Storage: Upload PDF (M9)
  → Resend: Email secure download link (M10)
  → User downloads PDF
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

### Authentication Flow (M2+)
1. User requests magic link or OTP via email
2. Supabase Auth handles token generation and verification
3. Session cookie set server-side via @supabase/ssr
4. All protected routes call `requireUser()` — server-side session check
5. Client never trusted for auth state

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
