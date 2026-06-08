# Milestone 3 — Database
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 2

---

## Objective

Create the complete Supabase database schema with Row Level Security on all tables.
M3 also replaces the temporary `user_metadata` profile storage introduced in M2
with a proper `profiles` table in Supabase PostgreSQL.

---

## Scope

- All SQL migration files
- RLS policies for every table
- Supabase Storage bucket for PDFs
- Database seed data (denomination paths, test data)

---

## Anonymous Session Strategy

Assessment data created by unauthenticated users is stored with `user_id = null`
until the user creates an account. On registration, an account-linking step
migrates anonymous assessment data to the new authenticated user_id.
This is a M3 + M4 concern and does not affect M2 auth implementation.

## Profiles Table (Replaces M2 user_metadata)

In M2, `nickname`, `denomination`, and `age_range` are stored in Supabase
`user_metadata` as a temporary measure. In M3, these move to the `profiles` table.

**Planned `profiles` schema:**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | Auto-generated |
| `user_id` | uuid (FK → auth.users) | Unique, not null |
| `email` | text | Mirrors auth.users.email |
| `nickname` | text | Optional display name |
| `spiritual_path` | text | Current assessment path |
| `denomination` | text | From denominationValues enum |
| `assessment_done` | boolean | Has completed at least one assessment |
| `ai_life_spiritual_coaching_done` | boolean | Has used AI coaching |
| `human_life_spiritual_coaching_done` | boolean | Has booked human coaching |
| `created_at` | timestamptz | Set on insert |
| `updated_at` | timestamptz | Auto-updated via trigger |

## Tables

| Table | Description |
|---|---|
| `profiles` | User profile — nickname, denomination, spiritual path, activity flags |
| `assessments` | Assessment sessions with status tracking |
| `assessment_responses` | Individual answers per question |
| `ai_reports` | Generated AI reports (exec summary + full report) |
| `payments` | Stripe payment records |
| `report_files` | PDF file references in Supabase Storage |
| `gift_codes` | Gift code purchase and redemption records |
| `conscience_sessions` | Examination of Conscience sessions |
| `coaching_bookings` | Coaching session bookings |
| `coaching_sponsorships` | Sponsored coaching records |
| `chart_snapshots` | Chart data snapshots for historical tracking |

---

## Deliverables

- [ ] SQL migration for all 11 tables
- [ ] RLS policy for all tables
- [ ] Supabase Storage bucket `reports` created
- [ ] Storage policy — user can only access their own files
- [ ] Supabase trigger — auto-create profile on user signup

---

## Dependencies

- Milestone 2 complete
- `SUPABASE_SERVICE_ROLE_KEY` set
- `DATABASE_URL` set

---

## Success Criteria

- [ ] All tables created in Supabase
- [ ] RLS enabled and enforced on all tables
- [ ] User can only read/write their own data
- [ ] Storage bucket accessible with signed URLs
