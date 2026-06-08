-- ============================================================
-- Migration 003: assessments and assessment_responses tables
-- ============================================================

CREATE TABLE IF NOT EXISTS public.assessments (
  id                          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  denomination_path           denomination,
  status                      assessment_status NOT NULL DEFAULT 'in_progress',
  executive_summary_viewed_at TIMESTAMPTZ,
  completed_at                TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX assessments_user_id_idx ON public.assessments (user_id);

CREATE TRIGGER assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "assessments_select_own"
  ON public.assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "assessments_insert_own"
  ON public.assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "assessments_update_own"
  ON public.assessments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── assessment_responses ────────────────────────────────────
-- user_id is denormalized here for direct RLS without a join.
-- Responses are immutable — no UPDATE or DELETE policy.

CREATE TABLE IF NOT EXISTS public.assessment_responses (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id   TEXT NOT NULL,
  question_type question_type NOT NULL,
  answer        JSONB NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX assessment_responses_assessment_id_idx ON public.assessment_responses (assessment_id);
CREATE INDEX assessment_responses_user_id_idx       ON public.assessment_responses (user_id);

ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "assessment_responses_select_own"
  ON public.assessment_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "assessment_responses_insert_own"
  ON public.assessment_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);
