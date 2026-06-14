# Roadmap
## Am I Saved?

**Version:** 1.1.0 | **Updated:** 2026-06-13

---

## Phase 1 — Foundation (Milestone 1) ✅

**Goal:** Production-ready project skeleton. No business logic.

- Next.js 16 project with TypeScript, Tailwind CSS v4, shadcn/ui
- Complete folder structure
- Homepage with hero, feature cards, spiritual safety disclaimer
- All placeholder pages and API routes
- Service layer stubs (Supabase, Stripe, OpenAI, Resend, PDF)
- TypeScript domain types
- Documentation framework
- Git repository initialized

---

## Phase 2 — Authentication (Milestone 2)

**Goal:** Users can create accounts and log in securely.

- Supabase Auth — Magic Links + OTP
- Login and registration pages
- Session management with @supabase/ssr
- `requireUser()` guard protecting all protected routes
- Account management page
- Auth middleware for route protection

---

## Phase 3 — Database (Milestone 3)

**Goal:** All data models exist in Supabase with Row Level Security.

- Database schema for all tables
- SQL migration files
- Row Level Security policies on all tables
- User profile creation on auth signup
- Supabase Storage bucket for PDFs

---

## Phase 4 — Questionnaire Engine (Milestone 4)

**Goal:** Users can complete a multi-page spiritual assessment immediately — no login or registration required.

- Anonymous session created silently at assessment start (`startAnonymousSession()`)
- Denomination path selection (Catholic, Protestant, Orthodox, General)
- All question types: single choice, multiple choice, Likert, free text
- Privacy nudge before free-text answer fields
- Auto-save on each answer
- Progress indicator
- Same-browser save and resume (anonymous session cookie)
- Assessment completion flow

---

## Phase 5 — AI Executive Summary + Upsell Gateway (Milestone 5)

**Goal:** Users receive a free AI-generated spiritual summary. The summary page is the gateway to the paid report.

- OpenAI integration (server-side only)
- Executive Summary generation with structured prompt
- Spiritual safety guardrails enforced in every prompt
- Prompt versioning
- Result persisted to Supabase
- Summary displayed on assessment summary page, including charts (Phase 6)
- Upsell CTA after summary: *"Unlock Full Report — $2.99"* — no countdown timer

---

## Phase 6 — Professional Charts (Milestone 6)

**Goal:** Visual spiritual health analytics displayed on the summary page as part of the free tier.

- Spiritual Health Radar Chart (8 dimensions) — on summary page
- Strengths vs Growth Areas bar chart — on summary page
- Mobile responsive charts
- Charts export-ready for PDF
- Historical progress tracking deferred to post-launch

---

## Phase 7 — Stripe Paywall (Milestone 7)

**Goal:** Users can purchase the Full Spiritual Report. Email is collected here — no password, no registration form.

- Email collection form (email only) shown before Stripe Checkout
- Stripe Checkout with `customer_email` and `metadata: { user_id }` (anonymous user)
- Apple Pay, Google Pay, Cards, Stripe Link
- Webhook handler with stripe-signature verification
- Webhook converts anonymous account to email-linked account (Supabase Admin API)
- Payment record persisted in Supabase by webhook (never by client)
- Full report generation triggered from webhook
- Redirect to full report page (loading state while generating)

---

## Phase 8 — Full AI Report (Milestone 8)

**Goal:** Paid users see a comprehensive spiritual narrative on-screen immediately after payment — no "check your email" required.

- Full report generation triggered from M7 webhook (server-side only)
- Category-by-category breakdown
- Scripture, prayer, and coaching recommendations
- Personal action plan
- Confession preparation notes
- Report persisted to Supabase
- Full report page with loading state (polls until ready, ~15–30 seconds)
- Report renders on-screen automatically when ready
- PDF download button appears on same page when PDF is available (Phase 9)

---

## Phase 9 — PDF Generation (Milestone 9)

**Goal:** Full reports are available for download directly on the report page.

- React-PDF generation in API route (server-side only), triggered after report text is ready
- PDF includes: Logo, Date, User Nickname, Charts, Analysis, Disclaimer
- Upload to Supabase Storage
- "Download PDF" button on full report page — activates when PDF is uploaded
- Signed URLs generated on-demand per click (48-hour expiry)

---

## Phase 10 — Email Delivery (Milestone 10)

**Goal:** One combined email gives users their PDF download link and magic link account access — no password ever set.

- Single Resend email containing: View Report magic link + Download PDF signed URL + Access My Account magic link
- Magic link generated server-side via Supabase Admin API (`generateLink`)
- Magic link is the only sign-in method for converted users (no password)
- Gift code redemption emails (stub in M10, implemented in M11)
- "We also emailed you a copy" confirmation on full report page

---

## Phase 11 — Gift Codes (Milestone 11)

**Goal:** Users can purchase assessments as gifts.

- Gift code purchase via Stripe
- Unique code generation
- Redemption flow
- Recipient assessment access
- Gift email delivery

---

## Phase 12 — Examination of Conscience (Milestone 12)

**Goal:** Dedicated conscience examination module.

- Adult Catholic path (Ten Commandments, Seven Deadly Sins, State of Life)
- Youth Catholic path (age-appropriate)
- General Christian Reflection path
- Outputs: Reflection Summary, Prayer Suggestions, Confession Preparation Notes
- Disclaimer: This is not sacramental confession

---

## Phase 13 — Spiritual Coaching (Milestone 13)

**Goal:** Users can book one-on-one spiritual coaching sessions.

- Coach profiles
- Session purchase via Stripe
- Scheduling via abstraction layer (Calendly, Google Calendar)
- Coaching history dashboard
- Session confirmation emails

---

## Phase 14 — Coaching Sponsorship (Milestone 14)

**Goal:** Users can fund coaching for others.

- Sponsorship purchase via Stripe
- Sponsorship code generation
- Recipient redemption flow
- Anonymous sponsorship option

---

## Phase 15 — Production Launch

**Goal:** Platform is publicly available and production-hardened.

- Full security audit
- Performance optimization
- SEO and accessibility
- Legal review (privacy policy, terms)
- Vercel production deployment
- Domain and DNS configuration
- Monitoring and alerting

---

## Future Phases

- Multi-language support
- Mobile app (React Native)
- AI spiritual journal
- Prayer and habit tracking
- Community features
- Parish bulk access codes
