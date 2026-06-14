# Milestone 6 — Professional Charts
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 5

---

## Objective

Display professional spiritual health charts on the assessment summary page, co-located with the Executive Summary. Charts are part of the free tier — they are visible before the paywall and serve as a conversion accelerant.

---

## Scope

- Spiritual Health Radar Chart (8 dimensions) — on summary page
- Strengths vs Growth Areas bar chart — on summary page
- Chart snapshots saved to `chart_snapshots` table for PDF export
- Mobile responsive
- Charts export-ready for PDF (Milestone 9)

---

## Chart Types

| Chart | Type | Dimensions | Placement |
|---|---|---|---|
| Spiritual Health Radar | RadarChart | Faith, Prayer, Charity, Forgiveness, Humility, Scripture, Community, Repentance | Summary page (free tier) |
| Strengths vs Growth | BarChart | Category scores | Summary page (free tier) |
| Historical Progress | LineChart | Multiple assessment scores over time | **Deferred to post-launch** |

**Why charts are on the summary page (free tier):** Showing the radar chart before the paywall increases conversion. The user has spent 10–20 minutes on the assessment; seeing their spiritual health visually scored creates genuine desire for the deeper narrative in the Full Report.

---

## Deferred: Historical Progress Chart

The `HistoricalProgressChart` (multi-assessment score comparison) requires the user to have a permanent account and at least two completed assessments. It is deferred from MVP scope to post-launch, after the account system is mature.

---

## Deliverables

- [ ] `SpiritualRadarChart` — real data integration (replaces mock data from M1)
- [ ] `StrengthsBarChart` component
- [ ] Chart snapshot saved to `chart_snapshots` table (for PDF embedding in M9)
- [ ] Charts integrated on `/assessment/[id]/summary` page (M5 dependency)
- [ ] Chart export to static image for PDF generation (canvas snapshot)

---

## Dependencies

- Milestone 5 complete (assessment scores available, summary page exists)
- Milestone 3 complete (`chart_snapshots` table)

---

## Success Criteria

- [ ] Radar chart renders with real assessment data on the summary page
- [ ] Bar chart shows category breakdown on the summary page
- [ ] Charts are mobile responsive
- [ ] Chart snapshots saved to `chart_snapshots` for PDF export
