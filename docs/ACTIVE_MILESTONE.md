# Active Milestone
## Am I Saved?

**Last updated:** 2026-06-14

---

## Current Status

| Field | Value |
|---|---|
| **Current Milestone** | 3 — Database |
| **Status** | Complete |
| **Started** | 2026-06-08 |
| **Completed** | 2026-06-08 |
| **Next Milestone** | 4 — Questionnaire Engine |

---

## Milestone 3 Deliverables

| Deliverable | Status |
|---|---|
| 8 SQL migration files in `supabase/migrations/` | Done |
| 11 PostgreSQL ENUM types | Done |
| 13 tables with RLS enabled | Done |
| `profiles` auto-create trigger on auth.users INSERT | Done |
| M2 user backfill in profiles migration | Done |
| Storage RLS policy for `reports` bucket | Done |
| `src/types/database.ts` — Supabase Database generic type | Done |
| `src/types/index.ts` — updated domain types | Done |
| Supabase clients typed with `<Database>` | Done |
| `require-user.ts` — reads from profiles table, isAnonymous flag | Done |
| `auth.ts` — anonymous → permanent account conversion | Done |
| `auth.ts` — `startAnonymousSession()` for M4 assessment start | Done |
| Account page — anonymous session banner | Done |
| TypeScript: zero errors | Done |
| ESLint: zero warnings | Done |
| Build: pass | Done |
| Docs commit | Done |
| Code commit | Done |

---

## Project Memory System

The following files exist to support cross-session development continuity:

| File | Purpose |
|---|---|
| `docs/DEVELOPMENT_HISTORY.md` | Permanent historical record — technology decisions, commands, git log, errors, timeline |
| `docs/CLAUDE_SESSION_HANDOFF.md` | Operational handoff — current state, environment status, open issues, session bootstrap prompt |

A new Claude session should read `CLAUDE_SESSION_HANDOFF.md` first.

---

## Open Issues

| Issue | Priority | Notes |
|---|---|---|
| Migrations not yet applied to Supabase | High | Apply via Dashboard SQL Editor or `supabase db push` |
| Storage bucket `reports` not yet created | High | Create in Supabase Dashboard → Storage before running migration 008 |
| `SUPABASE_SERVICE_ROLE_KEY` not yet set | High | Required before M5 (AI report generation) |
| Rate limiting not yet implemented | High | Required before production launch |
| Anonymous user cleanup not implemented | Medium | Cron job to delete `is_anonymous` users >30 days old |
| GitHub remote not pushed | Medium | Run `git push -u origin main` |
| Vercel project not linked | Medium | Required before first deployment |
| No `.gitattributes` for CRLF | Low | Minor Windows dev issue |

---

## Pre-M4 Work Completed (2026-06-14)

### Visual Identity / Homepage Redesign

A full homepage redesign and visual identity implementation was completed before beginning M4.
This was a product decision to establish brand identity before building the questionnaire flow.

**Design concept:** Waterline metaphor — sky (warm gold) / wave divider / ocean (deep teal) —
inspired by Matthew 14:22-33 (Peter walking on water). Two hands reaching across the waterline
as the central visual motif.

| Deliverable | Status |
|---|---|
| New color tokens: teal, teal-light, wave-foam, abyss, gold-sunrise, amber, ray | Done |
| Cormorant Garamond display font added to layout | Done |
| CSS-only animation keyframes: wave-move, ray-pulse, float-gentle, fade-up | Done |
| Scroll reveal CSS (.reveal / .reveal.visible) + prefers-reduced-motion | Done |
| WaveDivider component — animated dual-layer SVG waves | Done |
| HandsMotif component — abstract SVG illustration (two hands, Matthew 14:28) | Done |
| ScrollReveal component — IntersectionObserver client wrapper | Done |
| Homepage rewrite — waterline hero, wave divider, ocean zone, 4 sections | Done |
| How It Works page — real 4-step content | Done |
| Assessment Start page — ocean-themed with denomination grid | Done |
| Assessment Step page — ocean gradient, glassmorphism card, progress bar | Done |
| Executive Summary page — styled with upsell CTA | Done |
| Full Report page — dark abyss, loading state, report section stubs | Done |
| Footer — updated to abyss background (#071523) | Done |
| Pricing page — $TBD changed to $2.99 | Done |
| TypeScript: zero errors | Done |
| ESLint: zero warnings | Done |
| Build: pass (32 routes) | Done |

### Pricing Update

`src/app/pricing/page.tsx` — Full Report price changed from `$TBD` to `$2.99`.

---

## Milestone 4 Preview

**Milestone 4 — Questionnaire Engine**

Scope:
- JSON question definitions in `data/questionnaire/`
- Multi-path assessment engine (denomination-aware paths)
- Assessment start page — calls `startAnonymousSession()` silently, creates `assessments` row
- No login required — anonymous Supabase session used throughout
- Question step pages — saves `assessment_responses` rows
- Profile completion during assessment (nickname, denomination, age range)
- Privacy nudge displayed before free-text answer fields
- Assessment progress auto-save (same-browser resume via anonymous cookie)
- Submit assessment → transitions status to `submitted`

Dependencies:
- M3 complete (done) — assessments, assessment_responses tables created
- Anonymous session strategy implemented (done)
- Anonymous sign-ins enabled in Supabase Dashboard (required before M4 testing)

Not in scope for M4:
- Assessment history page (requires permanent account — deferred to post-M7)
- Cross-device save and resume (requires email collection — not available until M7)
