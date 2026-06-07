# Milestone 12 — Examination of Conscience
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 4

---

## Objective

A dedicated Examination of Conscience module separate from the Spiritual Assessment.

---

## Paths

1. **Adult Catholic** — Based on Ten Commandments, Seven Deadly Sins, Duties of State in Life
2. **Youth Catholic** — Age-appropriate version of above
3. **General Christian Reflection** — Non-denominational reflection path

---

## Outputs

- Reflection Summary
- Prayer Suggestions
- Confession Preparation Notes

---

## Mandatory Disclaimer

This module must always display:
> "This is not sacramental confession. It is a personal reflection aid only."

---

## Deliverables

- [ ] Path selection UI on `/conscience`
- [ ] Conscience question engine (reuses questionnaire engine from M4)
- [ ] Conscience question JSON data files
- [ ] Outputs: Reflection Summary, Prayer Suggestions, Confession Notes
- [ ] Conscience session stored in `conscience_sessions` table
- [ ] Session history on `/conscience/history`
- [ ] Disclaimer displayed prominently throughout

---

## Dependencies

- Milestone 4 complete (questionnaire engine reused)
- Milestone 3 complete (`conscience_sessions` table)

---

## Success Criteria

- [ ] User can select path and complete examination
- [ ] All three paths function correctly
- [ ] Disclaimer visible on all conscience pages
- [ ] Session saved to Supabase
- [ ] History page shows past examinations
