# Milestone 1 — Foundation
## Am I Saved?

**Status:** Complete | **Completed:** 2026-06-06

---

## Objective

Establish a clean, professional, production-ready project foundation. No business logic. Skeleton only.

---

## Scope

- Next.js 16 project with TypeScript, Tailwind CSS v4, shadcn/ui
- Complete folder structure
- Homepage with hero, CTAs, feature cards, spiritual safety disclaimer
- Root layout with Header, Footer, Navigation
- All placeholder pages and API routes
- Service layer stubs with TODO markers
- TypeScript domain types
- SpiritualRadarChart with Recharts mock data
- .env.example and .gitignore
- README.md and full documentation framework
- Git repository with 2 structured commits

---

## Deliverables

- [x] Next.js 16.2.7 scaffolded
- [x] Tailwind CSS v4 + shadcn/ui (button, card, badge, separator)
- [x] Design tokens (Deep Navy, Warm Gold, Soft Ivory)
- [x] Root layout with Header, Footer, Navigation
- [x] Homepage (hero, disclaimer, feature cards, CTA)
- [x] 20 placeholder pages
- [x] 6 placeholder API routes
- [x] 8 service stub files
- [x] TypeScript types (10 entities)
- [x] SpiritualRadarChart (Recharts, mock data)
- [x] .env.example
- [x] .gitignore
- [x] README.md
- [x] 24 documentation files
- [x] Git initialized, 2 commits

---

## Out of Scope

- Real authentication
- Real database
- Questionnaire logic
- AI calls
- Stripe payments
- PDF generation
- Email sending
- Gift codes
- Coaching booking
- Sponsorship

---

## Dependencies

None — this is the first milestone.

---

## Success Criteria

- [x] `npm run dev` starts without errors
- [x] Homepage renders correctly
- [x] All placeholder pages accessible
- [x] API routes return `{ ok: true, message: "Placeholder endpoint." }`
- [x] No TypeScript errors on service stubs
- [x] Git repository initialized with 2 commits
- [x] Documentation complete and accurate

---

## Implementation Notes

- Next.js 16.2.7 installed (latest at time of milestone)
- Tailwind CSS v4 uses new `@theme` directive — no `tailwind.config.js` needed
- shadcn/ui 4.10.0 initialized
- React-PDF must only be used in API routes due to browser API dependencies
- Recharts requires `"use client"` directive on all chart components
- `requireUser()` is a redirect stub — not real auth

---

## Known Limitations

- No real authentication
- No data persistence
- `requireUser()` always redirects to /login
- Stripe client has hardcoded API version — update when upgrading SDK

---

## Future Considerations

- Add error boundary component in M2
- Add loading skeleton components in M2
- Add 404 page before production launch
- Add robots.txt and sitemap before launch
- Add rate limiting in M2 or M3
