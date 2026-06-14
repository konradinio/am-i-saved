# Milestone 5 — AI Executive Summary
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 4

---

## Objective

Generate a free AI-powered executive summary after assessment completion using OpenAI. The summary page is the gateway to the paid Full Report — the upsell CTA is displayed at the bottom of this page after the summary renders.

---

## Scope

- OpenAI integration (server-side API route only)
- Executive Summary generation with spiritual safety guardrails
- Structured JSON output matching `ExecutiveSummaryContent` type
- Prompt versioning
- Result persisted to `ai_reports` table in Supabase
- Summary displayed on assessment summary page
- Spiritual Health Radar Chart and Strengths Bar Chart displayed on the same page (M6 charts embedded here)
- Upsell CTA displayed after summary content: "Unlock Full Report — $2.99"

---

## Summary Page Layout (Free Tier)

The `/assessment/[id]/summary` page displays everything in the free tier on one screen:

1. Spiritual safety disclaimer
2. Executive Summary text (AI-generated)
3. Spiritual Health Radar Chart (real data — M6)
4. Strengths vs Growth Areas Bar Chart (real data — M6)
5. Upsell CTA block: "Unlock Full Report" (leads to M7 email collection + Stripe Checkout)

**No countdown timer on the upsell CTA.** The CTA appears naturally after the summary renders.
Copy: *"Ready to go deeper? Unlock your Full Spiritual Report for $2.99."*

---

## Deliverables

- [ ] `generateExecutiveSummary()` function in `lib/ai/openai.ts`
- [ ] `POST /api/ai/generate-summary` real implementation
- [ ] Executive Summary display component
- [ ] Spiritual safety disclaimer displayed above summary
- [ ] Charts integrated on summary page (Milestone 6 dependency)
- [ ] Upsell CTA component at bottom of summary page
- [ ] Error handling (OpenAI timeout, rate limit, malformed JSON)
- [ ] Retry logic (max 2 retries)
- [ ] Prompt version logged with each report

---

## AI Safety Requirements

- PROMPT_VERSION must be logged with every generated report
- `SPIRITUAL_SAFETY_GUARDRAIL` injected into every prompt
- Output must never contain salvation declarations
- Output must include disclaimer text

---

## Dependencies

- Milestone 4 complete (assessment with category scores)
- Milestone 6 complete (charts embedded on summary page)
- `OPENAI_API_KEY` set

---

## Success Criteria

- [ ] Executive Summary generated after assessment submission
- [ ] Summary displayed to user within 30 seconds
- [ ] Spiritual safety disclaimer visible on summary page
- [ ] Charts visible on summary page (radar + bar)
- [ ] Upsell CTA displayed below summary with no countdown timer
- [ ] Report persisted in Supabase `ai_reports` table
- [ ] No salvation declarations in output
