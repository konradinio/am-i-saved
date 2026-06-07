# Milestone 2 — Authentication
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 1

---

## Objective

Implement secure user authentication using Supabase Auth — Magic Links and Email OTP.

---

## Scope

- Login page with Magic Link + OTP form
- Register page
- Account management page
- `requireUser()` real implementation (server-side session check)
- Session middleware for route protection
- Auth callback route (`/auth/callback`)
- User profile auto-creation on first login (Supabase trigger or Server Action)
- Redirect flows (login → previous page, logout → homepage)

---

## Deliverables

- [ ] Supabase Auth configured (Magic Links + OTP enabled in dashboard)
- [ ] `/login` page — real form with Magic Link / OTP toggle
- [ ] `/register` page — real form
- [ ] `/account` page — protected, shows user profile
- [ ] `/auth/callback` route — handles Supabase auth redirect
- [ ] `requireUser()` — real session verification via Supabase
- [ ] Middleware (`middleware.ts`) — refreshes session on every request
- [ ] Server Action: `signOut()`
- [ ] User profile created in `profiles` table on first auth

---

## Out of Scope

- OAuth (Google, GitHub) — future
- 2FA — future
- Password auth — not planned (Magic Link only)

---

## Dependencies

- Milestone 1 complete
- Supabase project created and configured
- `NEXT_PUBLIC_SUPABASE_URL` set
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` set

---

## Success Criteria

- [ ] User can request a magic link by email
- [ ] User can verify OTP code
- [ ] Authenticated session persists across page reloads
- [ ] `/account` redirects to `/login` when unauthenticated
- [ ] `requireUser()` returns real user data
- [ ] Sign out clears session
- [ ] Profile created in Supabase on first login
