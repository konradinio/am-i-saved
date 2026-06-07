// Placeholder — AI Executive Summary generation endpoint.
// TODO (Milestone 5): Implement real OpenAI call, verify auth, persist result to Supabase.
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  // TODO (Milestone 5): Parse assessmentId from request body (Zod validation)
  // TODO (Milestone 5): Verify user session (server-side)
  // TODO (Milestone 5): Call openai.ts generateExecutiveSummary()
  // TODO (Milestone 5): Persist result to ai_reports table
  // TODO (Milestone 5): NEVER include salvation declarations in AI output
  return NextResponse.json({ ok: true, message: "Placeholder endpoint." });
}
