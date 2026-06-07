# Milestone 14 — Coaching Sponsorship
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 13

---

## Objective

Allow sponsors to fund spiritual coaching sessions for others who cannot afford them.

---

## Scope

- Sponsorship purchase via Stripe
- Unique sponsorship code generation
- Recipient redemption flow
- Optional anonymous sponsorship

---

## Flow

1. Sponsor purchases coaching on `/sponsor` via Stripe
2. Webhook confirms payment
3. Unique sponsorship code generated and stored in `coaching_sponsorships`
4. Sponsor receives code to share (or donate anonymously through platform)
5. Recipient visits `/sponsor/redeem` and enters code
6. Recipient's account unlocked for coaching session booking
7. Recipient books coaching session

---

## Deliverables

- [ ] Sponsorship purchase page with Stripe Checkout
- [ ] Sponsorship code generation (server-side, cryptographically random)
- [ ] Redemption form with Zod validation
- [ ] `coaching_sponsorships` table integration
- [ ] Anonymous sponsorship option
- [ ] Confirmation emails for both sponsor and recipient

---

## Dependencies

- Milestone 13 complete (coaching module)
- Stripe product for sponsored coaching created

---

## Success Criteria

- [ ] Sponsor can purchase a sponsorship
- [ ] Code is unique and not guessable
- [ ] Recipient can redeem code for coaching session
- [ ] Code cannot be redeemed twice
- [ ] Anonymous option works correctly
