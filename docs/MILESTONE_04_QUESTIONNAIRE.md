# Milestone 4 — Questionnaire Engine
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 3

---

## Objective

Build a reusable, multi-page questionnaire engine with progress saving and denomination-specific paths.

---

## Scope

- Denomination path selection (Catholic, Protestant, Orthodox, Non-Denominational, Non-Christian, Unsure)
- Multi-page questionnaire with step routing
- Question types: single choice, multiple choice, Likert scale, free text
- Auto-save on each answer (Server Action + Supabase)
- Progress indicator
- Save and resume (continue from last completed step)
- Conditional logic (future questions based on previous answers)
- Assessment completion and submission

---

## Assessment Categories

1. Relationship with God
2. Faith
3. Prayer
4. Scripture
5. Charity
6. Forgiveness
7. Humility
8. Honesty
9. Stewardship
10. Sexual Morality
11. Community
12. Church Participation
13. Sacraments (Catholic path)
14. Repentance
15. Final Reflection

---

## Deliverables

- [ ] Denomination selection UI at assessment start
- [ ] Questionnaire engine component
- [ ] Progress bar component
- [ ] All question type renderers
- [ ] Auto-save Server Action
- [ ] Assessment completion Server Action
- [ ] JSON questionnaire definitions in `data/questionnaire/`
- [ ] Score calculation per category

---

## Dependencies

- Milestone 3 complete (database schema for `assessments` and `assessment_responses`)
- Milestone 2 complete (user must be authenticated)

---

## Success Criteria

- [ ] User can start an assessment after selecting denomination
- [ ] Progress auto-saves on each answer
- [ ] User can leave and resume from last step
- [ ] Assessment can be completed and submitted
- [ ] Category scores calculated on submission
