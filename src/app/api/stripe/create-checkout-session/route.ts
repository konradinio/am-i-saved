// Placeholder — Stripe Checkout session creation endpoint.
// TODO (Milestone 7): Implement real Stripe Checkout session, verify auth, persist payment record.
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  // TODO (Milestone 7): Parse product and metadata from request body (Zod validation)
  // TODO (Milestone 7): Verify user session (server-side)
  // TODO (Milestone 7): Create Stripe Checkout session (server-side only, secret key)
  // TODO (Milestone 7): Return session URL for client redirect
  // SECURITY: Never trust client-reported payment status. Verify via webhook only.
  return NextResponse.json({ ok: true, message: "Placeholder endpoint." });
}
