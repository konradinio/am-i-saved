// Placeholder — Stripe webhook handler.
// TODO (Milestone 7): Implement real webhook signature verification and event handling.
import { NextRequest, NextResponse } from "next/server";

// Stripe webhooks must not use body parsing — raw body required for signature verification.
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  // TODO (Milestone 7): Read raw body (req.text())
  // TODO (Milestone 7): Verify stripe-signature header with STRIPE_WEBHOOK_SECRET
  // TODO (Milestone 7): Handle checkout.session.completed event
  // TODO (Milestone 7): Update payments table in Supabase (use service role client)
  // TODO (Milestone 7): Trigger report generation after payment confirmed
  // SECURITY: Always verify signature. Never process unverified webhook events.
  const _body = await req.text();
  return NextResponse.json({ ok: true, message: "Placeholder endpoint." });
}
