// Placeholder — Email delivery endpoint.
// TODO (Milestone 10): Implement real email delivery via Resend.
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  // TODO (Milestone 10): Parse assessmentId from request body (Zod validation)
  // TODO (Milestone 10): Verify user session and payment status (server-side)
  // TODO (Milestone 10): Get signed PDF URL from Supabase Storage
  // TODO (Milestone 10): Send email via Resend with secure download link
  // SECURITY: Never embed sensitive report content directly in the email body.
  // Always send a secure, time-limited download link.
  return NextResponse.json({ ok: true, message: "Placeholder endpoint." });
}
