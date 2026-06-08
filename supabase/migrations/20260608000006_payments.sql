-- ============================================================
-- Migration 006: payments, gift_codes, coaching_sponsorships
-- ============================================================

-- ─── payments ────────────────────────────────────────────────
-- Inserted and updated by Stripe webhook handler only (service role).
-- ON DELETE RESTRICT prevents deleting a user who has payment records.

CREATE TABLE IF NOT EXISTS public.payments (
  id                       UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                  UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  stripe_session_id        TEXT UNIQUE,
  product                  payment_product NOT NULL,
  amount_cents             INTEGER NOT NULL,
  currency                 TEXT NOT NULL DEFAULT 'usd',
  status                   payment_status NOT NULL DEFAULT 'pending',
  metadata                 JSONB NOT NULL DEFAULT '{}',
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX payments_user_id_idx ON public.payments (user_id);

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "payments_select_own"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT / UPDATE: service role only (webhook handler).

-- ─── gift_codes ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.gift_codes (
  id                    UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code                  TEXT NOT NULL UNIQUE,
  purchased_by_user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  redeemed_by_user_id   UUID REFERENCES auth.users(id),
  product               payment_product NOT NULL,
  status                gift_code_status NOT NULL DEFAULT 'available',
  payment_id            UUID NOT NULL REFERENCES public.payments(id) ON DELETE RESTRICT,
  expires_at            TIMESTAMPTZ,
  redeemed_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX gift_codes_purchased_by_user_id_idx ON public.gift_codes (purchased_by_user_id);

ALTER TABLE public.gift_codes ENABLE ROW LEVEL SECURITY;

-- Purchaser sees codes they bought; recipient sees codes redeemed by them.
CREATE POLICY "gift_codes_select_own"
  ON public.gift_codes FOR SELECT
  USING (
    auth.uid() = purchased_by_user_id
    OR auth.uid() = redeemed_by_user_id
  );

-- INSERT / UPDATE: service role only.

-- ─── coaching_sponsorships ───────────────────────────────────
-- Sponsor purchases sessions for a recipient (identified later by code).
-- Full human coaching tables (life_spiritual_coaches, etc.) are deferred to M13.

CREATE TABLE IF NOT EXISTS public.coaching_sponsorships (
  id                UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sponsor_user_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  recipient_user_id UUID REFERENCES auth.users(id),
  code              TEXT NOT NULL UNIQUE,
  sessions_total    INTEGER NOT NULL DEFAULT 1,
  sessions_used     INTEGER NOT NULL DEFAULT 0,
  payment_id        UUID NOT NULL REFERENCES public.payments(id) ON DELETE RESTRICT,
  expires_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX coaching_sponsorships_sponsor_user_id_idx ON public.coaching_sponsorships (sponsor_user_id);

ALTER TABLE public.coaching_sponsorships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "coaching_sponsorships_select_own"
  ON public.coaching_sponsorships FOR SELECT
  USING (
    auth.uid() = sponsor_user_id
    OR auth.uid() = recipient_user_id
  );

-- INSERT / UPDATE: service role only.
