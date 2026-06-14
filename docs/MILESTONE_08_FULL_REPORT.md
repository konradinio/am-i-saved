# Milestone 8 — Full AI Report
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 7

---

## Objective

Generate the Full Spiritual Report immediately after payment confirmation and display it on-screen in the same browser session — no email required to view the report for the first time. The user should see their full report within ~30 seconds of completing payment.

---

## Report Generation Flow

```
Stripe webhook (M7)
  → updateUserById (converts anonymous account)
  → INSERT payments
  → generateFullReport() triggered (server-side)

User redirected to /assessment/[id]/full-report
  → Page polls ai_reports.generated_at every 2–3 seconds
  → Loading state displayed while generating
  → Report renders automatically when generated_at is set
  → PDF download button appears when report_files row exists (M9)
  → "We also emailed you a copy" appears after M10 email is sent
```

---

## Scope

- Full report generation via OpenAI (triggered from M7 webhook, server-side only)
- Category-by-category breakdown
- Scripture, prayer, and coaching recommendations
- Personal action plan
- Confession preparation notes (for denominations that observe confession)
- Spiritual safety guardrails enforced
- Report persisted to Supabase `ai_reports` table
- Full report display page with loading state
- Page polls `ai_reports` for `generated_at` until report is ready
- PDF download button (shows when `report_files` row exists — M9)
- Email confirmation message (shows after M10 email is sent)

---

## Report Sections

1. Spiritual Safety Disclaimer (always first, never removed)
2. Full Narrative Analysis
3. Category-by-Category Breakdown
4. Reflection Recommendations
5. Prayer Recommendations
6. Scripture Recommendations
7. Coaching Recommendations
8. Confession Preparation Notes (denominations that observe confession only)
9. Personal Action Plan

---

## Full Report Page Loading State

The `/assessment/[id]/full-report` page must handle the time between payment completion and report readiness (typically 15–30 seconds for an OpenAI call).

**Loading state requirements:**
- Displayed immediately when user lands on the page
- Faith-appropriate copy: *"Your personalized spiritual report is being prepared..."*
- Polling interval: every 2–3 seconds against `ai_reports.generated_at`
- Timeout: 60 seconds — if still not ready, show: *"This is taking longer than expected. Your report will be available in your account shortly."*
- When ready: report renders on the page without navigation — no reload required

**Payment verification:** Before showing the loading state or the report, verify the `payments` record server-side. If no payment found, redirect to summary page. Never trust client-side claim of payment.

---

## Deliverables

- [ ] `generateFullReport()` function in `lib/ai/openai.ts`
- [ ] `POST /api/ai/generate-full-report` real implementation
- [ ] Full report generation triggered from M7 webhook
- [ ] Full report display page with all sections
- [ ] Loading state with polling mechanism (2–3 second interval, 60 second timeout)
- [ ] Payment verification before displaying report (server-side check of `payments` table)
- [ ] Report persisted to `ai_reports` table
- [ ] PDF download button (appears when `report_files` row exists)
- [ ] "We also emailed you a copy" confirmation (appears after M10 email sent)

---

## Dependencies

- Milestone 7 complete (payment record exists, webhook triggers generation)
- `OPENAI_API_KEY` set
- `SUPABASE_SERVICE_ROLE_KEY` set (AI report written by service role)

---

## Success Criteria

- [ ] Full report generated only after verified payment
- [ ] Loading state displayed while report is being generated
- [ ] Report appears on-screen automatically when ready (no manual page refresh)
- [ ] All report sections populated
- [ ] Spiritual safety disclaimer visible at top
- [ ] No salvation declarations in output
- [ ] Report persisted in Supabase `ai_reports` table
- [ ] PDF download button visible when PDF is available
- [ ] Unauthenticated access redirects to summary page (no direct URL access without payment)
