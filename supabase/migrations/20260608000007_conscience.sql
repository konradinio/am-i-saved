-- ============================================================
-- Migration 007: conscience_sessions, conscience_responses,
--                conscience_action_plans
-- ============================================================

-- ─── conscience_sessions ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.conscience_sessions (
  id                 UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_type          conscience_path NOT NULL,
  status             session_status NOT NULL DEFAULT 'in_progress',
  reflection_summary TEXT,
  completed_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX conscience_sessions_user_id_idx ON public.conscience_sessions (user_id);

CREATE TRIGGER conscience_sessions_updated_at
  BEFORE UPDATE ON public.conscience_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.conscience_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conscience_sessions_select_own"
  ON public.conscience_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "conscience_sessions_insert_own"
  ON public.conscience_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "conscience_sessions_update_own"
  ON public.conscience_sessions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── conscience_responses ────────────────────────────────────
-- Responses are immutable — no UPDATE or DELETE policy.

CREATE TABLE IF NOT EXISTS public.conscience_responses (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.conscience_sessions(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id    TEXT NOT NULL,
  response   JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX conscience_responses_session_id_idx ON public.conscience_responses (session_id);
CREATE INDEX conscience_responses_user_id_idx    ON public.conscience_responses (user_id);

ALTER TABLE public.conscience_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conscience_responses_select_own"
  ON public.conscience_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "conscience_responses_insert_own"
  ON public.conscience_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ─── conscience_action_plans ─────────────────────────────────

CREATE TABLE IF NOT EXISTS public.conscience_action_plans (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id  UUID NOT NULL REFERENCES public.conscience_sessions(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  measure     TEXT,
  due_date    DATE,
  status      action_plan_status NOT NULL DEFAULT 'pending',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  reminder_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX conscience_action_plans_session_id_idx ON public.conscience_action_plans (session_id);
CREATE INDEX conscience_action_plans_user_id_idx    ON public.conscience_action_plans (user_id);

CREATE TRIGGER conscience_action_plans_updated_at
  BEFORE UPDATE ON public.conscience_action_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.conscience_action_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conscience_action_plans_all_own"
  ON public.conscience_action_plans FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
