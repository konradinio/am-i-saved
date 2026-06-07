// Placeholder — AI Full Report generation endpoint.
// TODO (Milestone 8): Implement real OpenAI call, verify payment server-side, persist result.
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  // TODO (Milestone 8): Parse assessmentId from request body (Zod validation)
  // TODO (Milestone 8): Verify user session (server-side)
  // TODO (Milestone 8): Verify payment status from Supabase (NEVER trust client)
  // TODO (Milestone 8): Call openai.ts generateFullReport()
  // TODO (Milestone 8): Persist result to ai_reports table
  // TODO (Milestone 8): Trigger PDF generation and email delivery
  return NextResponse.json({ ok: true, message: "Placeholder endpoint." });
}
