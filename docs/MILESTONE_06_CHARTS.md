# Milestone 6 — Professional Charts
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 5

---

## Objective

Display professional spiritual health charts on the assessment summary page.

---

## Scope

- Spiritual Health Radar Chart (8 dimensions)
- Strengths vs Growth Areas bar chart
- Spiritual Growth Dashboard (category scores)
- Historical Progress chart (multi-assessment comparison)
- Mobile responsive
- Charts exportable for PDF

---

## Chart Types

| Chart | Type | Dimensions |
|---|---|---|
| Spiritual Health Radar | RadarChart | Faith, Prayer, Charity, Forgiveness, Humility, Scripture, Community, Repentance |
| Strengths vs Growth | BarChart | Category scores |
| Growth Dashboard | Composed | Category summary cards |
| Historical Progress | LineChart | Multiple assessment scores over time |

---

## Deliverables

- [ ] `SpiritualRadarChart` — real data integration
- [ ] `StrengthsBarChart` component
- [ ] `GrowthDashboard` component
- [ ] `HistoricalProgressChart` component
- [ ] Chart snapshot saved to `chart_snapshots` table
- [ ] Chart data export for PDF generation (Milestone 9)

---

## Dependencies

- Milestone 5 complete (assessment scores available)
- Milestone 3 complete (`chart_snapshots` table)

---

## Success Criteria

- [ ] Radar chart renders with real assessment data
- [ ] Bar chart shows category breakdown
- [ ] Charts are mobile responsive
- [ ] Chart snapshots saved for PDF export
