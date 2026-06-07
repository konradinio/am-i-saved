# AI Prompts Document
## Am I Saved?

**Version:** 1.0.0 | **Created:** 2026-06-06

---

## Placeholder Prompt Strategy

All AI prompts will be implemented in Milestones 5 and 8. This document defines the governance framework for prompt design, versioning, and safety enforcement.

---

## AI Safety Rules (Absolute — Non-Negotiable)

The following rules MUST be enforced in every AI prompt, in every version, forever:

1. **The AI must NEVER declare that the user is saved.**
2. **The AI must NEVER declare that the user is not saved.**
3. **The AI must NEVER declare that the user is destined for heaven.**
4. **The AI must NEVER declare that the user is destined for hell.**
5. **The AI must NEVER offer sacramental absolution.**
6. **The AI must NEVER claim to replace a priest, pastor, spiritual director, or counselor.**
7. **Every AI response must include the spiritual safety disclaimer.**
8. **All output must be framed as reflection, growth, and personal insight — never as judgment.**
9. **The AI must always encourage the user to speak with a priest, pastor, or trusted spiritual advisor.**

**Enforcement:** The `SPIRITUAL_SAFETY_GUARDRAIL` constant in `src/lib/ai/openai.ts` contains the text injected into every prompt. This string must never be removed or modified without explicit review.

---

## Prompt Versioning Strategy

All prompts use semantic versioning: `MAJOR.MINOR.PATCH`

| Version Part | Change Type |
|---|---|
| MAJOR | Fundamental change in prompt structure or output format |
| MINOR | Addition of new sections or meaningful tone changes |
| PATCH | Minor wording improvements, typo fixes |

The current prompt version is stored in `src/lib/ai/openai.ts` as `PROMPT_VERSION`.

Every AI report in Supabase stores the `promptVersion` used to generate it. This enables:
- Auditing what prompt produced what output
- A/B testing different prompt versions
- Rolling back to a previous prompt if quality regresses
- Compliance with future regulatory requirements

---

## Executive Summary Prompt (Milestone 5)

**Prompt ID:** `executive-summary-v1`
**Status:** Placeholder — to be implemented in Milestone 5

**Inputs:**
- User denomination
- All assessment responses (structured JSON)
- Assessment category scores

**Expected Output (structured JSON):**
```json
{
  "disclaimer": "string",
  "summary": "string",
  "spiritualStrengths": ["string"],
  "areasOfGrowth": ["string"],
  "reflectionQuestions": ["string"],
  "suggestedNextSteps": ["string"]
}
```

**Tone:** Compassionate, honest, non-judgmental, encouraging.

---

## Full Report Prompt (Milestone 8)

**Prompt ID:** `full-report-v1`
**Status:** Placeholder — to be implemented in Milestone 8

**Inputs:**
- User denomination
- All assessment responses (structured JSON)
- Assessment category scores
- Executive Summary content

**Expected Output (structured JSON):**
```json
{
  "disclaimer": "string",
  "narrativeAnalysis": "string",
  "categoryBreakdown": [
    {
      "category": "string",
      "score": 0,
      "narrative": "string",
      "reflections": ["string"]
    }
  ],
  "reflectionRecommendations": ["string"],
  "prayerRecommendations": ["string"],
  "scriptureRecommendations": ["string"],
  "coachingRecommendations": ["string"],
  "confessionPreparationNotes": ["string"],
  "personalActionPlan": ["string"]
}
```

---

## Spiritual Safety Guardrail (Current)

The following text is injected into every prompt. Do not modify without review.

```
IMPORTANT CONSTRAINTS — You must follow these rules absolutely:
1. You must NEVER declare that the user is saved or not saved.
2. You must NEVER declare that the user is destined for heaven or hell.
3. You must NEVER claim to know God's judgment of this person's soul.
4. You must NEVER offer sacramental absolution or replace a priest or pastor.
5. Every response must include a disclaimer that this is a reflection aid only.
6. Frame all output as reflection, growth opportunities, and personal insights.
7. Encourage the user to speak with a priest, pastor, or trusted spiritual advisor.
```
