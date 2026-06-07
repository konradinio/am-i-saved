// OpenAI service — server-side only.
// NEVER import this in a Client Component or expose keys to the browser.
// TODO (Milestone 5): Implement generateExecutiveSummary().
// TODO (Milestone 8): Implement generateFullReport().
import OpenAI from "openai";

// Prompt versioning — increment when prompts change to allow A/B testing and auditing.
export const PROMPT_VERSION = "v1.0.0";

// Spiritual safety guardrail — included in every prompt.
// The AI must NEVER declare salvation status. This is a hard constraint.
export const SPIRITUAL_SAFETY_DISCLAIMER = `
IMPORTANT CONSTRAINTS — You must follow these rules absolutely:
1. You must NEVER declare that the user is saved or not saved.
2. You must NEVER declare that the user is destined for heaven or hell.
3. You must NEVER claim to know God's judgment of this person's soul.
4. You must NEVER offer sacramental absolution or replace a priest or pastor.
5. Every response must include a disclaimer that this is a reflection aid only.
6. Frame all output as reflection, growth opportunities, and personal insights.
7. Encourage the user to speak with a priest, pastor, or trusted spiritual advisor.
`.trim();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TODO (Milestone 5): generateExecutiveSummary(assessmentId: string): Promise<ExecutiveSummaryContent>
// TODO (Milestone 8): generateFullReport(assessmentId: string): Promise<FullReportContent>
