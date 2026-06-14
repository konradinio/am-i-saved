# Milestone 4 — Questionnaire Engine
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 3

---

## Objective

Build a reusable, multi-page questionnaire engine with denomination-specific paths. No authentication required — the assessment begins immediately with an anonymous Supabase session.

---

## Scope

- Anonymous session creation at assessment start (no login, no registration)
- Denomination path selection (Catholic, Protestant, Orthodox, Non-Denominational, Non-Christian, Unsure)
- Multi-page questionnaire with step routing
- Question types: single choice, multiple choice, Likert scale, free text
- Auto-save on each answer (Server Action + Supabase)
- Progress indicator
- Save and resume within the same browser session (anonymous cookie persists)
- Conditional logic (future questions based on previous answers)
- Assessment completion and submission
- Privacy nudge displayed before free-text answer fields

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

## Anonymous Session Strategy

`startAnonymousSession()` (implemented in M3 `src/app/actions/auth.ts`) is called at the start of the assessment flow. It is a no-op if a session already exists.

- Creates a real Supabase `auth.users` entry with `is_anonymous = true`
- All assessment data (`assessments`, `assessment_responses`) is saved under this `user_id`
- RLS policies work identically for anonymous and permanent users
- No NULL `user_id` — no special handling needed

**Cross-device resume:** Progress is saved to the anonymous user's Supabase account and persists as long as the browser session cookie is alive. If the user clears cookies, switches browsers, or uses a different device, progress cannot be recovered until M7 when an email is collected. Do not promise multi-device save in M4.

**Communication to user:** Display a browser-native nudge at assessment start: "Your progress is saved in this browser. Switching devices before completing your assessment may cause you to lose progress."

---

## Deliverables

- [ ] `startAnonymousSession()` called at assessment start (already implemented — just wire it up)
- [ ] Denomination selection UI at assessment start
- [ ] Questionnaire engine component
- [ ] Progress bar component
- [ ] All question type renderers
- [ ] Privacy nudge before free-text answer fields
- [ ] Auto-save Server Action
- [ ] Assessment completion Server Action
- [ ] JSON questionnaire definitions in `data/questionnaire/`
- [ ] Score calculation per category
- [ ] Anonymous session persistence notice at start

---

## Dependencies

- Milestone 3 complete (database schema for `assessments` and `assessment_responses`)
- Anonymous sign-ins enabled in Supabase Dashboard → Authentication → Providers → Anonymous
- **Does NOT depend on Milestone 2 (user registration) — no auth required to start**

---

## Success Criteria

- [ ] User can start an assessment immediately with no login or registration
- [ ] Anonymous session is created silently at assessment start
- [ ] Progress auto-saves on each answer
- [ ] User can leave and resume from last step within the same browser session
- [ ] Assessment can be completed and submitted
- [ ] Category scores calculated on submission
- [ ] Privacy nudge visible before free-text questions
