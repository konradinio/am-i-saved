-- ============================================================
-- Migration 005: assessment_action_plans
-- ============================================================

-- Assessment action plans are derived from ai_reports (full report tier).
-- Users own and fully manage their own plans.

CREATE TABLE IF NOT EXISTS public.assessment_action_plans (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id   UUID NOT NULL REFERENCES public.ai_reports(id) ON DELETE CASCADE,
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

CREATE INDEX assessment_action_plans_report_id_idx ON public.assessment_action_plans (report_id);
CREATE INDEX assessment_action_plans_user_id_idx   ON public.assessment_action_plans (user_id);

CREATE TRIGGER assessment_action_plans_updated_at
  BEFORE UPDATE ON public.assessment_action_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.assessment_action_plans ENABLE ROW LEVEL SECURITY;

-- Single policy covers SELECT, INSERT, UPDATE, DELETE.
CREATE POLICY "assessment_action_plans_all_own"
  ON public.assessment_action_plans FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
