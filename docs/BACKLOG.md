# Backlog
## Am I Saved?

**Version:** 1.0.0 | **Updated:** 2026-06-06

---

## P0 — Critical Path (Must Ship Before Launch)

| Item | Milestone | Notes |
|---|---|---|
| Authentication (Magic Link + OTP) | M2 | Required for all protected features |
| Database schema + RLS | M3 | Security requirement |
| Questionnaire engine | M4 | Core product |
| AI Executive Summary | M5 | Core product (free tier) |
| Professional Charts | M6 | Part of free tier |
| Stripe paywall | M7 | Revenue |
| Full AI Report | M8 | Core product (paid tier) |
| PDF generation | M9 | Paid tier deliverable |
| Email delivery | M10 | Paid tier deliverable |

---

## P1 — High Value (Ship Soon After Launch)

| Item | Milestone | Notes |
|---|---|---|
| Gift Codes | M11 | Gifting = viral growth |
| Examination of Conscience | M12 | High-demand Catholic feature |
| Assessment history dashboard | M4+ | User retention |

---

## P2 — Growth (Post-Launch)

| Item | Milestone | Notes |
|---|---|---|
| Spiritual Coaching | M13 | Revenue diversification |
| Coaching Sponsorship | M14 | Charitable growth |
| Multi-Language | Future | Spanish, Polish, Portuguese |
| Mobile App | Future | React Native |

---

## P3 — Future Vision

| Item | Notes |
|---|---|
| AI Journal | Ongoing spiritual journaling |
| Prayer Tracking | Log and track prayer habits |
| Habit Tracking | Spiritual disciplines |
| Community | Anonymous accountability groups |
| Parish Integration | Bulk access codes |

---

## Known Technical Debt (Milestone 1)

| Item | Priority | Notes |
|---|---|---|
| Tailwind utility classes for `text-gold`, `text-navy` etc. — may need CSS variable cleanup | Medium | Resolve in M1 polish or M2 |
| `requireUser()` is a redirect stub — not real auth | High | Fix in M2 |
| Stripe API version hardcoded in `server.ts` | Low | Update when upgrading Stripe SDK |
| No rate limiting implemented | High | Add in M2 or M3 |
| No error boundary components | Medium | Add in M2 |
| No loading state components | Medium | Add in M2 |
| No 404 page | Low | Add before launch |
| No robots.txt or sitemap | Low | Add before launch |
