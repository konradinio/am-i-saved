// Placeholder — PDF generation endpoint.
// React-PDF must run inside an API route (server-side), never in a Server Component.
// TODO (Milestone 9): Implement real PDF generation using @react-pdf/renderer.
import { NextResponse } from "next/server";

export async function POST() {
  // TODO (Milestone 9): Parse assessmentId from request body (Zod validation)
  // TODO (Milestone 9): Verify user session and payment status (server-side)
  // TODO (Milestone 9): Generate PDF with @react-pdf/renderer
  // TODO (Milestone 9): Upload to Supabase Storage (PDF_STORAGE_BUCKET)
  // TODO (Milestone 9): Return signed download URL (time-limited)
  // TODO (Milestone 9): PDF must include: Logo, Date, User Name, Charts, Summary, Analysis, Disclaimer
  return NextResponse.json({ ok: true, message: "Placeholder endpoint." });
}
