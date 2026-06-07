# Milestone 11 — Gift Codes
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 10

---

## Objective

Allow users to purchase spiritual assessments as gifts for others.

---

## Scope

- Gift purchase flow via Stripe
- Unique cryptographically secure code generation
- Code redemption flow
- Gift recipient assessment access
- Gift email delivery

---

## Flow

1. Purchaser buys gift on `/gift` via Stripe
2. Webhook confirms payment
3. Unique code generated and stored in `gift_codes` table
4. Gift redemption email sent to purchaser (to forward to recipient)
5. Recipient visits `/gift/redeem` and enters code
6. Recipient's account unlocked for full assessment + report access
7. Recipient completes assessment and receives report

---

## Deliverables

- [ ] Gift purchase page with Stripe Checkout
- [ ] Gift code generation (server-side, cryptographically random)
- [ ] Gift redemption form with Zod validation
- [ ] `gift_codes` table integration
- [ ] Gift email delivery via Resend

---

## Dependencies

- Milestone 10 complete
- Stripe product for gift assessment created

---

## Success Criteria

- [ ] User can purchase a gift code
- [ ] Code is unique and not guessable
- [ ] Recipient can redeem code
- [ ] Redeemed code grants full report access
- [ ] Code cannot be redeemed twice
