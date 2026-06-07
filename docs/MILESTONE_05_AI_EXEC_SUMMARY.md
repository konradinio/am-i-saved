# Milestone 5 — AI Executive Summary
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 4

---

## Objective

Generate a free AI-powered executive summary after assessment completion using OpenAI.

---

## Scope

- OpenAI integration (server-side API route only)
- Executive Summary generation with spiritual safety guardrails
- Structured JSON output matching `ExecutiveSummaryContent` type
- Prompt versioning
- Result persisted to `ai_reports` table in Supabase
- Summary displayed on assessment summary page

---

## Deliverables

- [ ] `generateExecutiveSummary()` function in `lib/ai/openai.ts`
- [ ] `POST /api/ai/generate-summary` real implementation
- [ ] Executive Summary display component
- [ ] Spiritual safety disclaimer displayed above summary
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
- `OPENAI_API_KEY` set

---

## Success Criteria

- [ ] Executive Summary generated after assessment submission
- [ ] Summary displayed to user within 30 seconds
- [ ] Spiritual safety disclaimer visible on summary page
- [ ] Report persisted in Supabase `ai_reports` table
- [ ] No salvation declarations in output
