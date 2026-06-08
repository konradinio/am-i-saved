// Placeholder — Stripe webhook handler.
// TODO (Milestone 7): Implement real webhook signature verification and event handling.
import { NextResponse } from "next/server";

export async function POST() {
  // TODO (Milestone 7): Read raw body via req.text() — App Router does not use bodyParser config
  // TODO (Milestone 7): Verify stripe-signature header with STRIPE_WEBHOOK_SECRET
  // TODO (Milestone 7): Handle checkout.session.completed event
  // TODO (Milestone 7): Update payments table in Supabase (use service role client)
  // TODO (Milestone 7): Trigger report generation after payment confirmed
  // SECURITY: Always verify signature. Never process unverified webhook events.
  return NextResponse.json({ ok: true, message: "Placeholder endpoint." });
}
