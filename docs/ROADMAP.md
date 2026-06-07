# Roadmap
## Am I Saved?

**Version:** 1.0.0 | **Updated:** 2026-06-06

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

**Goal:** Users can complete a multi-page spiritual assessment.

- Questionnaire engine with progress saving
- Denomination path selection (Catholic, Protestant, Orthodox, General)
- All question types: single choice, multiple choice, Likert, free text
- Auto-save on each answer
- Progress indicator
- Assessment completion flow

---

## Phase 5 — AI Executive Summary (Milestone 5)

**Goal:** Users receive a free AI-generated spiritual summary.

- OpenAI integration (server-side only)
- Executive Summary generation with structured prompt
- Spiritual safety guardrails enforced in every prompt
- Prompt versioning
- Result persisted to Supabase
- Summary displayed on assessment summary page

---

## Phase 6 — Professional Charts (Milestone 6)

**Goal:** Visual spiritual health analytics displayed in browser.

- Spiritual Health Radar Chart (8 dimensions)
- Strengths vs Growth Areas bar chart
- Spiritual Growth Dashboard
- Historical progress tracking (multi-assessment)
- Mobile responsive charts
- Charts export-ready for PDF

---

## Phase 7 — Stripe Paywall (Milestone 7)

**Goal:** Users can purchase the Full Spiritual Report.

- Stripe Checkout integration
- Apple Pay, Google Pay, Cards, Link
- Webhook handler with signature verification
- Payment record persisted in Supabase
- Full report unlocked based on database payment (never client claim)
- Gift code purchase flow

---

## Phase 8 — Full AI Report (Milestone 8)

**Goal:** Paid users receive a comprehensive spiritual narrative.

- Full report generation via OpenAI (server-side)
- Category-by-category breakdown
- Scripture, prayer, and coaching recommendations
- Personal action plan
- Confession preparation notes
- Report persisted to Supabase

---

## Phase 9 — PDF Generation (Milestone 9)

**Goal:** Full reports are available as professional PDFs.

- React-PDF generation in API route (server-side only)
- PDF includes: Logo, Date, User Name, Charts, Analysis, Disclaimer
- Upload to Supabase Storage
- Signed time-limited download URLs

---

## Phase 10 — Email Delivery (Milestone 10)

**Goal:** Reports are delivered to user's inbox.

- Resend integration
- Email with secure PDF download link (never raw content in body)
- Gift code redemption emails
- Coaching confirmation emails

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
