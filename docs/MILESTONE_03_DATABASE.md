# Milestone 3 — Database Schema, RLS & Anonymous Strategy
## Am I Saved?

**Status:** Complete | **Started:** 2026-06-08 | **Completed:** 2026-06-08
**Depends on:** Milestone 2

---

## Objective

Create the complete Supabase PostgreSQL database schema with Row Level Security on all tables. Implement Supabase anonymous sign-ins as the anonymous-first identity strategy. Replace the temporary `user_metadata` profile storage from M2 with a proper `profiles` table.

---

## Anonymous Session Strategy: Option 4 — Supabase Anonymous Sign-ins

When a user starts an assessment without an account, the app calls `supabase.auth.signInAnonymously()`. This creates a real entry in `auth.users` with `is_anonymous = true`.

**Why this approach:**
- `user_id` is never NULL — RLS works identically for anonymous and permanent users
- No service-role bypass required for anonymous data access
- Zero data migration on account conversion: `user_id` stays the same
- Clean upgrade path: call `supabase.auth.updateUser({ email, password })` on the anonymous session

**Account conversion (implemented in M3):**
- `signUp` Server Action detects `user.is_anonymous` and calls `updateUser` instead of `signUp`
- Profile table is updated with registration metadata (nickname, denomination, age_range)
- All assessment data retains the same `user_id` — no migration needed

**Anonymous user cleanup (deferred — NOT in M3):**
- Unconverted anonymous users accumulate in `auth.users` as `is_anonymous = true`
- A cron job to delete `is_anonymous = true` users older than 30 days with no payment is needed
- Document this requirement; implement as a separate cleanup milestone

---

## Tables Created

| Table | Milestone Use | RLS Strategy |
|---|---|---|
| `profiles` | M3+ | User reads/updates own; trigger creates on signup |
| `assessments` | M4+ | User CRUD own; anonymous users included |
| `assessment_responses` | M4+ | User reads/inserts own; immutable (no update) |
| `ai_reports` | M5+ | User reads own; service role writes |
| `report_files` | M9+ | User reads own; service role writes |
| `chart_snapshots` | M6+ | User CRUD own |
| `assessment_action_plans` | M8+ | User full CRUD own |
| `payments` | M7+ | User reads own; service role writes |
| `gift_codes` | M11+ | Purchaser + recipient both read |
| `coaching_sponsorships` | M14+ | Sponsor + recipient both read |
| `conscience_sessions` | M12+ | User CRUD own |
| `conscience_responses` | M12+ | User reads/inserts own; immutable |
| `conscience_action_plans` | M12+ | User full CRUD own |

**Deferred to M5:** `ai_coaching_sessions`, `ai_coaching_action_plans`
— Schema depends on the AI coaching interaction design defined in M5.

**Deferred to M13:** `life_spiritual_coaches`, `human_coaching_sessions`, `human_coaching_action_plans`
— Privacy-first redesign needed; no PII fields beyond display_name and email.

---

## PostgreSQL ENUMs Created

| ENUM | Values |
|---|---|
| `assessment_status` | in_progress, submitted, summary_ready, paid, full_report_ready |
| `report_type` | executive_summary, full_report |
| `payment_status` | pending, succeeded, failed, refunded |
| `payment_product` | full_report, gift_assessment, coaching_session, sponsored_coaching |
| `action_plan_status` | pending, in_progress, completed, cancelled |
| `denomination` | catholic, protestant, orthodox, non_denominational, non_christian, unsure |
| `age_range` | under_18, 18_24, 25_34, 35_44, 45_54, 55_64, 65_plus |
| `conscience_path` | adult_catholic, youth_catholic, general_christian |
| `gift_code_status` | available, redeemed, expired |
| `session_status` | in_progress, completed |
| `question_type` | single_choice, multiple_choice, likert, free_text |

---

## Migration Files

```
supabase/migrations/
  20260608000001_extensions_and_enums.sql  — UUID extension, all ENUMs, update_updated_at trigger
  20260608000002_profiles.sql              — profiles table, trigger, backfill, RLS
  20260608000003_assessments.sql           — assessments, assessment_responses, RLS
  20260608000004_reports.sql               — ai_reports, report_files, chart_snapshots, RLS
  20260608000005_action_plans.sql          — assessment_action_plans, RLS
  20260608000006_payments.sql              — payments, gift_codes, coaching_sponsorships, RLS
  20260608000007_conscience.sql            — conscience_sessions, conscience_responses, conscience_action_plans, RLS
  20260608000008_storage.sql               — Storage RLS policy for "reports" bucket
```

**To apply migrations:**
1. Supabase Dashboard → SQL Editor → paste each file in order, or
2. `supabase db push` (requires Supabase CLI and `SUPABASE_DB_URL`)

**Storage bucket prerequisite:** Create a private bucket named `reports` in the Supabase Dashboard before running migration 008.

---

## RLS Security Model

**All tables:** RLS is ENABLED. No table has a public read policy.

**Pattern:** `auth.uid() = user_id` — covers both anonymous and permanent users.

**Service-role-only tables (INSERT/UPDATE restricted to server):**
- `ai_reports` — written by AI generation API route
- `report_files` — written by PDF generation API route
- `payments` — written by Stripe webhook handler
- `gift_codes` — written by Stripe webhook handler after gift purchase
- `coaching_sponsorships` — written by Stripe webhook handler

**Trigger-only INSERT (no client INSERT policy):**
- `profiles` — created automatically on auth.users INSERT via `handle_new_user()` trigger

---

## TypeScript Types

### New file: `src/types/database.ts`
Supabase `Database` type with Row/Insert/Update for all 13 tables and all 11 ENUMs.
Pass as `createBrowserClient<Database>` and `createServerClient<Database>` generics.

### Updated: `src/types/index.ts`
- Added `AgeRange` type
- Updated `UserProfile` (matches profiles table: userId, nickname, ageRange, activity flags)
- Updated `Assessment` (denominationPath, executiveSummaryViewedAt)
- Updated `AssessmentResponse` (added userId)
- Added `ActionPlanStatus`, `AssessmentActionPlan`
- Replaced `ConscienceSessionStatus` with `SessionStatus`
- Updated `ConscienceSession` (matches DB: removed prayerSuggestions/confessionNotes)
- Added `ConscienceResponse`, `ConscienceActionPlan`
- Removed `CoachingBooking`, `CoachingBookingStatus` (deferred to M13)
- Updated `Payment.metadata` to `Record<string, unknown>`

---

## Application Code Changes

### `src/lib/supabase/client.ts`
Added `<Database>` generic to `createBrowserClient`.

### `src/lib/supabase/server.ts`
Added `<Database>` generic to `createServerClient` (both client and service client).

### `src/lib/auth/require-user.ts`
- `AuthUser` type: added `isAnonymous: boolean`, changed `ageRange` to `AgeRange | null`
- `requireUser()` and `getOptionalUser()` now query the `profiles` table for nickname/denomination/age_range
- Falls back to `user_metadata` if profile row missing (backfill edge cases)

### `src/app/actions/auth.ts`
- `signUp`: detects `user.is_anonymous` — calls `updateUser` (conversion) instead of `signUp`
- `signUp`: syncs profile table after anonymous → permanent conversion
- Added `startAnonymousSession()` Server Action for M4 assessment start flow

### `src/app/account/page.tsx`
- Added anonymous session banner: warns user about temporary session, links to /register
- Hides email field for anonymous users (anonymous sessions have no email)

---

## Deliverables Checklist

| Deliverable | Status |
|---|---|
| 8 SQL migration files in `supabase/migrations/` | Done |
| 11 PostgreSQL ENUM types | Done |
| 13 tables with RLS enabled | Done |
| `profiles` auto-create trigger | Done |
| M2 user backfill in profiles migration | Done |
| Storage RLS policy for `reports` bucket | Done |
| `src/types/database.ts` — Supabase Database generic type | Done |
| `src/types/index.ts` — updated domain types | Done |
| Supabase clients typed with `<Database>` | Done |
| `require-user.ts` — reads from profiles table | Done |
| `auth.ts` — anonymous → permanent conversion | Done |
| `auth.ts` — `startAnonymousSession()` for M4 | Done |
| Account page — anonymous session banner | Done |
| TypeScript: zero errors | Done |
| ESLint: zero warnings | Done |
| Build: pass | Done |
| Docs commit | Done |
| Code commit | Done |

---

## Known Limitations

1. **No Supabase CLI configured** — migrations must be applied manually via Dashboard SQL Editor or `supabase db push`. Supabase CLI setup is a separate ops task.
2. **Anonymous cleanup deferred** — anonymous users accumulate in `auth.users` until a cron cleanup is implemented (future milestone).
3. **`SUPABASE_SERVICE_ROLE_KEY` required before M5** — service role client in `createServiceClient()` will error if the key is not set. M3 tables are created but service-role writes (AI reports, payments) aren't needed until M5/M7.
4. **Storage bucket must be created manually** — `supabase/migrations/20260608000008_storage.sql` applies RLS policies only. The bucket itself must be created in the Dashboard.
5. **Rate limiting not yet implemented** — deferred from M2; must be added before production launch.

---

## Next Steps (Milestone 4)

- Questionnaire engine: multi-path assessment with JSON question definitions
- Assessment start page: calls `startAnonymousSession()`, creates `assessments` row
- Question step pages: save `assessment_responses` rows
- Profile completion during assessment (nickname, denomination, age_range questions)
- Assessment history page
