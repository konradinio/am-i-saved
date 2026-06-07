# Am I Saved?

> **Not certainty about heaven, but clarity about your soul.**

A Christian spiritual reflection and self-assessment platform. Am I Saved? helps people honestly examine their relationship with God, their faith, conscience, and spiritual growth — without ever claiming to determine salvation.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript |
| UI | Tailwind CSS v4, shadcn/ui |
| Backend | Next.js Server Actions, API Routes |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth (Magic Links + OTP) |
| Storage | Supabase Storage |
| AI | OpenAI API |
| Payments | Stripe (Checkout, Webhooks) |
| Email | Resend |
| Charts | Recharts |
| PDF | React-PDF |
| Validation | Zod |
| Hosting | Vercel |

---

## Setup

### Prerequisites

- Node.js 20+
- npm 10+
- A Supabase project
- A Stripe account (test mode for development)
- An OpenAI API key
- A Resend account

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-org/am-i-saved.git
cd am-i-saved

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your keys

# 4. Run the development server
npm run dev
```

Open http://localhost:3000 to view the app.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values.

**WARNING: Never commit `.env.local` to source control. It contains secrets.**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Public URL of the app |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (client-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only — never expose) |
| `DATABASE_URL` | Direct PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key (server only) |
| `STRIPE_SECRET_KEY` | Stripe secret key (server only) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client-safe) |
| `RESEND_API_KEY` | Resend API key (server only) |
| `EMAIL_FROM` | Sender email address |
| `PDF_STORAGE_BUCKET` | Supabase Storage bucket name for PDFs |

---

## Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Project Structure

```
src/
  app/           Next.js App Router — pages and API routes
  components/    React components (UI, layout, charts, etc.)
  lib/           Service layer (Supabase, Stripe, OpenAI, etc.)
  types/         TypeScript type definitions

docs/            Architecture, roadmap, milestone docs
supabase/        Database migrations and RLS policies
data/            Static questionnaire data (future)
```

---

## Roadmap

| Milestone | Description | Status |
|---|---|---|
| 01 | Foundation & Documentation | Complete |
| 02 | Authentication (Supabase Auth) | Pending |
| 03 | Database Schema & RLS | Pending |
| 04 | Questionnaire Engine | Pending |
| 05 | AI Executive Summary | Pending |
| 06 | Professional Charts | Pending |
| 07 | Stripe Paywall | Pending |
| 08 | Full AI Report | Pending |
| 09 | PDF Generation | Pending |
| 10 | Email Delivery | Pending |
| 11 | Gift Codes | Pending |
| 12 | Examination of Conscience | Pending |
| 13 | Spiritual Coaching | Pending |
| 14 | Coaching Sponsorship | Pending |

See docs/ROADMAP.md for full details.

---

## Security Notes

- All API keys live in `.env.local` only — never in source code
- All AI calls are server-side only
- All Stripe operations are server-side only
- Stripe webhooks are verified with `STRIPE_WEBHOOK_SECRET`
- Supabase service role key is server-only and never exposed to the browser
- Row Level Security (RLS) will be implemented in Milestone 3

**Warning: Never commit `.env.local`. It contains secrets.**

---

## Spiritual Safety

The platform is built around one core principle:

> "Am I Saved? does not judge your soul, determine salvation, replace sacramental confession, replace spiritual direction, or substitute for professional counseling. Only God knows the human heart."

This constraint is enforced at every level: UI copy, AI prompt engineering, and platform design.

---

## License

Private. All rights reserved.
