-- ============================================================
-- Migration 002: profiles table
-- ============================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id    UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname   TEXT CHECK (char_length(nickname) <= 100),
  denomination denomination,
  age_range  age_range,
  assessment_done                    BOOLEAN NOT NULL DEFAULT false,
  ai_life_spiritual_coaching_done    BOOLEAN NOT NULL DEFAULT false,
  human_life_spiritual_coaching_done BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Auto-create profile on user signup ─────────────────────
-- Covers both anonymous sign-ins and permanent registrations.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── Backfill: create profiles for any existing auth.users ──
-- Idempotent (ON CONFLICT DO NOTHING). Safe to re-run.

INSERT INTO public.profiles (user_id, nickname, denomination, age_range)
SELECT
  id,
  NULLIF(raw_user_meta_data->>'nickname', ''),
  CASE
    WHEN raw_user_meta_data->>'denomination' IN (
      'catholic','protestant','orthodox',
      'non_denominational','non_christian','unsure'
    ) THEN (raw_user_meta_data->>'denomination')::denomination
    ELSE NULL
  END,
  CASE
    WHEN raw_user_meta_data->>'age_range' IN (
      'under_18','18_24','25_34','35_44','45_54','55_64','65_plus'
    ) THEN (raw_user_meta_data->>'age_range')::age_range
    ELSE NULL
  END
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- ─── Row Level Security ──────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile (includes anonymous users)
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- INSERT is handled by the trigger only — no client INSERT policy.
-- DELETE is not permitted.
