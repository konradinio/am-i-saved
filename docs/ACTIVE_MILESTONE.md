# Active Milestone
## Am I Saved?

**Last updated:** 2026-06-08

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

## Milestone 4 Preview

**Milestone 4 — Questionnaire Engine**

Scope:
- JSON question definitions in `data/questionnaire/`
- Multi-path assessment engine (denomination-aware paths)
- Assessment start page — calls `startAnonymousSession()`, creates `assessments` row
- Question step pages — saves `assessment_responses` rows
- Profile completion during assessment (nickname, denomination, age range)
- Assessment progress auto-save
- Assessment history page
- Submit assessment → transitions status to `submitted`

Dependencies:
- M3 complete (done) — assessments, assessment_responses tables created
- Anonymous session strategy implemented (done)
