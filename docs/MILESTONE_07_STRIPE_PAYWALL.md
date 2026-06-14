# Milestone 7 — Stripe Paywall
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 6

---

## Objective

Implement the full payment funnel: email collection → Stripe Checkout → anonymous-to-email account conversion → payment record → Full Report generation trigger. The user never creates a traditional account — email is the only thing collected, and it is collected at the moment of highest purchase intent.

---

## Funnel Flow

```
Summary page → "Unlock Full Report" CTA
  → Email collection form (email only, no password)
  → Stripe Checkout (pre-filled with collected email)
  → Stripe webhook fires:
      1. Verify stripe-signature header
      2. Convert anonymous account: updateUserById(userId, { email })
      3. Insert payment record in Supabase
      4. Trigger Full Report generation
  → Redirect to /assessment/[id]/full-report (loading state → report renders)
```

---

## Scope

- Email collection form (email only) shown when user clicks "Unlock Full Report"
- Stripe Checkout session creation with `customer_email` and `metadata: { user_id }`
- Apple Pay, Google Pay, Cards, Stripe Link
- Webhook handler with stripe-signature verification
- Webhook converts anonymous account to email-linked account via Supabase Admin API
- Payment record persisted to Supabase (by webhook only — never by client)
- Full report generation triggered from webhook
- `success_url` redirects to full-report page (with loading state)
- `cancel_url` returns to summary page (CTA still visible)

---

## Email Collection UX

Shown as an inline form or modal after the user clicks "Unlock Full Report":

- Field: Email address (validated with Zod `emailSchema`)
- Helper text: *"We'll send your PDF and a link to access your account. No password needed."*
- Preview: *"Your report will be sent to: [email]"* (confirm before proceeding)
- Submit → creates Stripe Checkout session server-side → redirects to Stripe

**No countdown timer anywhere in this flow.** The CTA is confident and direct.

---

## Stripe Checkout Session

Created server-side in `POST /api/stripe/create-checkout-session`:

```ts
{
  payment_method_types: ["card"],  // Apple Pay, Google Pay enabled via Stripe Dashboard
  line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
  customer_email: emailFromForm,
  metadata: { user_id: anonymousUserId, assessment_id: assessmentId },
  success_url: `${APP_URL}/assessment/${assessmentId}/full-report?checkout_session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${APP_URL}/assessment/${assessmentId}/summary`,
}
```

---

## Webhook Handler (`POST /api/stripe/webhook`)

Handles `checkout.session.completed` event:

1. Read raw body via `req.text()` (required for signature verification — no body parsing before this)
2. Verify `stripe-signature` header with `STRIPE_WEBHOOK_SECRET`
3. Get `user_id` from `session.metadata.user_id`
4. Get `customer_email` from `session.customer_email`
5. Call `supabase.auth.admin.updateUserById(userId, { email: customerEmail })` — converts anonymous account; `is_anonymous` becomes `false`; no password set; magic link is the only sign-in method
6. Insert row into `payments` table (service role client)
7. Call `generateFullReport()` or queue report generation
8. Return `200 OK` to Stripe

**Idempotency:** Check `payments` table for existing `stripe_payment_intent_id` before inserting. If already processed, return `200 OK` without side effects.

---

## Deliverables

- [ ] Email collection form component (`EmailCaptureForm`)
- [ ] `POST /api/stripe/create-checkout-session` — real implementation
- [ ] `POST /api/stripe/webhook` — real implementation with signature verification
- [ ] Anonymous → email conversion in webhook via `supabase.auth.admin.updateUserById`
- [ ] Payment record inserted in `payments` table (service role)
- [ ] Full report generation triggered from webhook
- [ ] Payment success redirect to `/assessment/[id]/full-report`
- [ ] Payment cancel returns to `/assessment/[id]/summary` (CTA still visible)
- [ ] Idempotency check on webhook (prevent double-processing)
- [ ] Remove `/assessment/[id]/upgrade` placeholder page (now replaced by email form)

---

## Security Requirements

- NEVER trust client-reported payment status
- ALWAYS verify `stripe-signature` header before processing any webhook event
- Use raw request body (`req.text()`) for signature verification — no JSON parsing before `stripe.webhooks.constructEvent()`
- `SUPABASE_SERVICE_ROLE_KEY` required in webhook handler for `updateUserById` and payment table insert
- Service role key NEVER exposed to client
- `user_id` in Stripe metadata is set server-side at checkout creation — not user-controllable

---

## Required Environment Variables

- `STRIPE_SECRET_KEY` — server-side only
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — client-safe
- `STRIPE_WEBHOOK_SECRET` — server-side only
- `SUPABASE_SERVICE_ROLE_KEY` — server-side only (already needed for AI report generation)
- `NEXT_PUBLIC_APP_URL` — for success/cancel redirect URLs

---

## Dependencies

- Milestones 5 and 6 complete (summary page with upsell CTA)
- Stripe keys configured
- `SUPABASE_SERVICE_ROLE_KEY` set in `.env.local`
- `NEXT_PUBLIC_APP_URL` set in `.env.local`

---

## Success Criteria

- [ ] User can enter email and proceed to Stripe Checkout from summary page
- [ ] Stripe Checkout pre-filled with user's email
- [ ] Webhook verifies signature before processing
- [ ] Anonymous account converted to email-linked account after payment
- [ ] Payment record in `payments` table
- [ ] Full report generation triggered from webhook
- [ ] User redirected to full-report page after payment
- [ ] Summary page CTA still visible if payment cancelled
- [ ] Duplicate webhook events handled idempotently
