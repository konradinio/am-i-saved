# Project Log
## Am I Saved?

A running record of meaningful project history, decisions, and milestones.

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
