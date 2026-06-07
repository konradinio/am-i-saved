# Milestone 8 — Full AI Report
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 7

---

## Objective

Generate a comprehensive full spiritual report for paid users using OpenAI.

---

## Scope

- Full report generation via OpenAI (server-side API route only)
- Category-by-category breakdown
- Scripture, prayer, and coaching recommendations
- Personal action plan
- Confession preparation notes
- Spiritual safety guardrails enforced
- Report persisted to Supabase

---

## Report Sections

1. Disclaimer
2. Full Narrative Analysis
3. Category-by-Category Breakdown
4. Reflection Recommendations
5. Prayer Recommendations
6. Scripture Recommendations
7. Coaching Recommendations
8. Confession Preparation Notes (denominations that observe confession)
9. Personal Action Plan

---

## Deliverables

- [ ] `generateFullReport()` function in `lib/ai/openai.ts`
- [ ] `POST /api/ai/generate-full-report` real implementation
- [ ] Full report display page with all sections
- [ ] Payment verification before generation (server-side)
- [ ] Report persisted to `ai_reports` table
- [ ] Trigger PDF generation and email after report is ready

---

## Dependencies

- Milestone 7 complete (payment verified)
- `OPENAI_API_KEY` set

---

## Success Criteria

- [ ] Full report generated only after verified payment
- [ ] All report sections populated
- [ ] Spiritual safety disclaimer visible
- [ ] No salvation declarations in output
- [ ] Report persisted in Supabase
