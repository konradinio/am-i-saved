# Milestone 2 — Authentication Foundation
## Am I Saved?

**Status:** ✅ Complete | **Completed:** 2026-06-08 | **Depends on:** Milestone 1

---

## Objective

Implement Supabase Auth with an anonymous-first philosophy: users can start an
assessment without an account. Account creation is offered only after seeing the
free executive summary and choosing to unlock the full report. Only `/account` is
a protected route. All assessment routes remain publicly accessible.

---

## What Was Built

### Auth Stack

- **Supabase Auth** — Email + password and Magic Link (OTP)
- **`@supabase/ssr`** — Session cookies managed server-side via `createServerClient` and `createBrowserClient`
- **`src/proxy.ts`** — Replaces deprecated `middleware.ts` (Next.js 16 breaking change). Refreshes Supabase session on every request. Protects only `/account`.
- **`/auth/callback`** — Exchanges Supabase OTP `code` for a session cookie

### Server Actions (`src/app/actions/auth.ts`)

| Action | Description |
|---|---|
| `signIn` | Email + password login with Zod validation. Supports `redirect` param. |
| `signUp` | Register with email, password, optional nickname, denomination, age range. Stores extras in `user_metadata`. |
| `signInWithMagicLink` | Sends OTP email via Supabase. Routes through `/auth/callback?next=`. |
| `signOut` | Clears session, redirects to `/`. |

### Auth Components

| Component | Type | Description |
|---|---|---|
| `src/components/auth/LoginForm.tsx` | Client Component | Toggle between password and magic link modes. Uses `useActionState` (React 19). |
| `src/components/auth/RegisterForm.tsx` | Client Component | Email, password, nickname, age range, denomination. Shows success/error inline. |

### Pages

| Route | Status |
|---|---|
| `/login` | Real form, reads `?redirect` and `?error` from searchParams |
| `/register` | Real form |
| `/account` | Protected — shows profile, placeholder activity, spiritual safety disclaimer, sign out |

### Validation Schemas (`src/lib/validation/schemas.ts`)

- `loginSchema` — email + password (min 8 chars)
- `magicLinkSchema` — email only
- `registerSchema` — email, password, optional nickname (max 50), optional denomination, optional age range

### User Profile (`src/lib/auth/require-user.ts`)

`AuthUser` type now includes `nickname`, `denomination`, `ageRange`, `createdAt` from Supabase `user_metadata`. Full `profiles` table will be added in M3.

---

## Next.js 16 Breaking Change: `proxy.ts`

In Next.js v16.0.0, `middleware.ts` was deprecated and renamed to `proxy.ts`.
The exported function must be named `proxy` (not `middleware`).

```ts
// src/proxy.ts  ← correct (Next.js 16)
export async function proxy(request: NextRequest) { ... }

// middleware.ts  ← deprecated, do not create
```

This project uses `src/proxy.ts` exclusively. Do NOT create `src/middleware.ts`.

---

## Anonymous-First Strategy

Assessment routes are public by design:
- `/assessment/start` — public
- `/assessment/[id]/step/[stepId]` — public
- `/assessment/[id]/summary` — public (free executive summary visible without auth)

Authentication is presented as an upgrade prompt (full report paywall, M7).
Only `/account` requires login.

---

## Out of Scope (Deferred)

| Item | Deferred To |
|---|---|
| OAuth (Google, GitHub) | Future |
| 2FA | Future |
| `profiles` database table | M3 |
| Rate limiting on auth endpoints | M3 |
| Screenshot blocking | Not feasible (documented in `security.md`) |

---

## Deliverables Checklist

- [x] `src/proxy.ts` — session refresh, `/account` protection
- [x] `src/app/auth/callback/route.ts` — OTP code exchange
- [x] `src/app/actions/auth.ts` — signIn, signUp, signInWithMagicLink, signOut
- [x] `src/components/auth/LoginForm.tsx` — password + magic link toggle
- [x] `src/components/auth/RegisterForm.tsx` — full registration form
- [x] `/login` page — real form, error display, redirect handling
- [x] `/register` page — real form
- [x] `/account` page — protected, user profile, disclaimer, sign out
- [x] `loginSchema`, `magicLinkSchema`, `registerSchema` in Zod schemas
- [x] Real `requireUser()` via Supabase `auth.getUser()`
- [x] `getOptionalUser()` for soft auth checks
- [x] TypeScript: zero errors
- [x] ESLint: zero warnings
- [x] Build: pass

---

## Success Criteria

- [x] User can register with email + password
- [x] User can sign in with email + password
- [x] User can request a magic link (OTP email)
- [x] Magic link callback exchanges code for session
- [x] `/account` redirects to `/login` when unauthenticated (with `?redirect=` param preserved)
- [x] Authenticated session persists across page reloads (Supabase session cookie)
- [x] `requireUser()` returns real Supabase user data
- [x] Sign out clears session and redirects to homepage
- [x] Assessment routes remain publicly accessible (anonymous flow preserved)
- [x] Open redirect protection (redirect param validated to start with `/`)
