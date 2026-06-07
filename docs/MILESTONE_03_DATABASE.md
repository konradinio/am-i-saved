# Milestone 3 — Database
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 2

---

## Objective

Create the complete Supabase database schema with Row Level Security on all tables.

---

## Scope

- All SQL migration files
- RLS policies for every table
- Supabase Storage bucket for PDFs
- Database seed data (denomination paths, test data)

---

## Tables

| Table | Description |
|---|---|
| `profiles` | User profile — display name, denomination, avatar |
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
