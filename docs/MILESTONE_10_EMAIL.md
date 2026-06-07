# Milestone 10 — Email Delivery
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 9

---

## Objective

Deliver PDF reports and system notifications via email using Resend.

---

## Scope

- Full Report email with secure PDF download link
- Gift code redemption email
- Coaching confirmation email
- Never embed sensitive content in email body

---

## Deliverables

- [ ] `sendReportEmail()` in `lib/email/resend.ts`
- [ ] `sendGiftRedemptionEmail()` in `lib/email/resend.ts`
- [ ] `sendCoachingConfirmation()` in `lib/email/resend.ts`
- [ ] `POST /api/email/send-report` real implementation
- [ ] Email templates with branding (React Email or HTML)

---

## Security Requirements

- NEVER embed PDF content or report content in email body
- Always use a signed, time-limited Supabase Storage URL
- Signed URLs expire after 24–48 hours

---

## Dependencies

- Milestone 9 complete (PDF with signed URL)
- `RESEND_API_KEY` and `EMAIL_FROM` set

---

## Success Criteria

- [ ] User receives email after Full Report is ready
- [ ] Email contains secure download link (not report content)
- [ ] Gift code email sent on purchase
- [ ] Coaching confirmation sent on booking
