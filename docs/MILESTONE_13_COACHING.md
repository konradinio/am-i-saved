# Milestone 13 — Spiritual Life Coaching
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 7

---

## Objective

Allow users to book one-on-one spiritual coaching sessions with trained coaches.

---

## Scope

- Coach profiles
- Session purchase via Stripe
- Scheduling via abstraction layer (not hardcoded to any provider)
- Coaching session history
- Session confirmation emails

---

## Calendar Integration Abstraction

The coaching scheduling provider is abstracted behind an interface. Supported providers:
- Calendly
- Google Calendar
- Zoom
- Google Meet

Do NOT hardcode any provider. Use an abstraction layer with a pluggable provider.

---

## Deliverables

- [ ] Coach profile UI
- [ ] Session purchase via Stripe
- [ ] Scheduling abstraction layer
- [ ] `/coaching/book` real implementation
- [ ] `/coaching/calendar` session history
- [ ] Coaching confirmation email via Resend
- [ ] `coaching_bookings` table integration

---

## Dependencies

- Milestone 7 complete (Stripe for session purchase)
- Milestone 10 complete (email confirmation)

---

## Success Criteria

- [ ] User can view coach profiles
- [ ] User can purchase a session
- [ ] Booking is stored in Supabase
- [ ] Confirmation email sent
- [ ] Scheduling link provided to user
