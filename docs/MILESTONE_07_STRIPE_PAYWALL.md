# Milestone 7 — Stripe Paywall
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 6

---

## Objective

Implement the Stripe payment flow for unlocking the Full Spiritual Report.

---

## Scope

- Stripe Checkout session creation (server-side)
- Apple Pay, Google Pay, Cards, Stripe Link
- Webhook handler with signature verification
- Payment record persisted to Supabase
- Full report unlocked based on database payment record only (never client claim)

---

## Deliverables

- [ ] `POST /api/stripe/create-checkout-session` real implementation
- [ ] `POST /api/stripe/webhook` real implementation with signature verification
- [ ] Upgrade page with real Stripe Checkout redirect
- [ ] Payment success/cancel pages
- [ ] Payment record in `payments` table
- [ ] Full report access gated by server-side payment check
- [ ] Gift code purchase Stripe product
- [ ] Idempotency keys on all payment operations

---

## Security Requirements

- NEVER trust client-reported payment status
- ALWAYS verify payment via Supabase `payments` table (set by webhook handler only)
- ALWAYS verify `stripe-signature` header
- Use raw request body for webhook signature verification

---

## Dependencies

- Milestone 5+ complete (has something to unlock)
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` set

---

## Success Criteria

- [ ] User can initiate Stripe Checkout from upgrade page
- [ ] Webhook updates payment status in Supabase
- [ ] Full report page only accessible after verified payment
- [ ] Failed/cancelled payments handled gracefully
