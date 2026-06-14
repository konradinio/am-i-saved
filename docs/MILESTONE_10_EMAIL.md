# Milestone 10 — Email Delivery
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 9

---

## Objective

Send a single combined email after the PDF is ready that serves two purposes: (1) delivers the PDF download link, and (2) provides a magic link for future account access — so the user can return to their report on any device without ever setting a password.

---

## Email Flow

```
M9 PDF upload complete → report_files row exists → signed URL generated
  → supabase.auth.admin.generateLink({ type: 'magiclink', email, redirectTo: '/account' })
  → Resend sends combined email:
      - View Full Report (magic link → /assessment/[id]/full-report)
      - Download PDF (signed Supabase Storage URL, 48-hour expiry)
      - Access My Account (magic link → /account)
  → Full report page shows "We also emailed you a copy" message
```

---

## Scope

- Single combined Resend email sent after PDF is ready
- Email contains: View Report magic link + Download PDF signed URL + Access My Account magic link
- Magic link generated server-side via Supabase Admin API (`generateLink`)
- Magic link redirected through `/auth/callback` (existing route — unchanged)
- Gift code redemption email (unchanged from original scope)
- Coaching confirmation email (Milestone 13 scope — stub only in M10)
- Full report page shows email confirmation once email is sent

---

## Why a Single Combined Email

Sending two separate emails (one from Supabase for magic link, one from Resend for PDF) is confusing for users. A single Resend email gives full control over branding, timing, and content. The magic link token is generated server-side via `supabase.auth.admin.generateLink()` and embedded directly in the Resend email body.

---

## Email Template (Report Delivery)

**Subject:** *Your Am I Saved? Report is Ready*

**Body structure:**
- Spiritual safety note: *"This report reflects your honest answers. It is a guide for reflection, not a judgment of your soul."*
- Three action buttons:
  1. **View Full Report** → magic link → `/assessment/[id]/full-report`
  2. **Download Your PDF** → signed Supabase Storage URL (48-hour expiry)
  3. **Access My Account** → magic link → `/account`
- Footer: spiritual safety disclaimer (condensed)

**Never embed report content or PDF content in the email body.**
The email body contains only secure links.

---

## Magic Link Generation

```ts
// Server-side only — service role required
const { data } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: userEmail,
  options: {
    redirectTo: `${APP_URL}/assessment/${assessmentId}/full-report`,
  },
});
const magicLinkUrl = data.properties.action_link;
```

The `action_link` is a Supabase-hosted URL that exchanges the token and then redirects to the `redirectTo` path via `/auth/callback`. The existing `auth/callback/route.ts` handles this automatically.

---

## Deliverables

- [ ] `sendReportEmail()` in `lib/email/resend.ts` — combined magic link + PDF link
- [ ] Magic link generation via `supabase.auth.admin.generateLink()` in email handler
- [ ] `POST /api/email/send-report` real implementation — triggered after PDF upload
- [ ] Email template with branding (React Email or HTML)
- [ ] "We also emailed you a copy" indicator on full report page (set after email is sent)
- [ ] `sendGiftRedemptionEmail()` stub in `lib/email/resend.ts` (implementation in M11)
- [ ] `sendCoachingConfirmation()` stub in `lib/email/resend.ts` (implementation in M13)

---

## Security Requirements

- NEVER embed PDF content or report content in email body
- NEVER embed the full report narrative in the email body
- Always use a signed, time-limited Supabase Storage URL for PDF link (48-hour expiry)
- Magic link generated server-side only — `supabase.auth.admin.generateLink()` requires service role key
- Resend API key is server-side only — never exposed to client

---

## Error Handling

- If Resend fails (rate limit, network error): log the error, retry once, then mark `sendReportEmail` as failed in application logs
- The user's report is still visible on-screen — email failure is not a blocking condition
- The "We also emailed you a copy" message should NOT appear if email delivery failed
- Consider: allow user to request a new magic link from `/login` by entering their email

---

## Required Environment Variables

- `RESEND_API_KEY` — server-side only
- `EMAIL_FROM` — verified sender address (e.g., `reports@am-i-saved.com`)
- `SUPABASE_SERVICE_ROLE_KEY` — for `generateLink()` (already required since M7)
- `NEXT_PUBLIC_APP_URL` — for redirect URLs in magic links

---

## Dependencies

- Milestone 9 complete (PDF uploaded, signed URL available)
- `RESEND_API_KEY` and `EMAIL_FROM` set
- `SUPABASE_SERVICE_ROLE_KEY` set (already required since M7)
- Resend sender domain verified

---

## Success Criteria

- [ ] User receives email after PDF is ready
- [ ] Email contains View Report magic link (works on click)
- [ ] Email contains PDF download link (48-hour signed URL)
- [ ] Email contains Access My Account link (same magic link or fresh link)
- [ ] Magic link exchange handled by existing `/auth/callback` route
- [ ] No report content in email body — links only
- [ ] "We also emailed you a copy" appears on report page after successful send
- [ ] Email failure is logged but does not block report access
