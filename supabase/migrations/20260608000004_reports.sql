-- ============================================================
-- Migration 004: ai_reports, report_files, chart_snapshots
-- ============================================================

-- ─── ai_reports ─────────────────────────────────────────────
-- Inserted and updated by server-side service role only.
-- Users can SELECT their own reports.

CREATE TABLE IF NOT EXISTS public.ai_reports (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_type   report_type NOT NULL,
  content       JSONB,
  prompt_version TEXT NOT NULL,
  generated_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (assessment_id, report_type)
);

CREATE INDEX ai_reports_assessment_id_idx ON public.ai_reports (assessment_id);
CREATE INDEX ai_reports_user_id_idx       ON public.ai_reports (user_id);

ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_reports_select_own"
  ON public.ai_reports FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT / UPDATE: service role only (no client policy).

-- ─── report_files ────────────────────────────────────────────
-- References to PDFs stored in Supabase Storage bucket "reports".
-- ON DELETE RESTRICT prevents orphaned storage objects.

CREATE TABLE IF NOT EXISTS public.report_files (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE RESTRICT,
  user_id       UUID NOT NULL REFERENCES auth.users(id)    ON DELETE RESTRICT,
  report_type   report_type NOT NULL,
  storage_path  TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (assessment_id, report_type)
);

CREATE INDEX report_files_assessment_id_idx ON public.report_files (assessment_id);
CREATE INDEX report_files_user_id_idx       ON public.report_files (user_id);

ALTER TABLE public.report_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "report_files_select_own"
  ON public.report_files FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: service role only.

-- ─── chart_snapshots ─────────────────────────────────────────
-- One snapshot per assessment (radar chart data + optional image).

CREATE TABLE IF NOT EXISTS public.chart_snapshots (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data          JSONB NOT NULL,
  image_url     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (assessment_id)
);

CREATE INDEX chart_snapshots_user_id_idx ON public.chart_snapshots (user_id);

ALTER TABLE public.chart_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chart_snapshots_select_own"
  ON public.chart_snapshots FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "chart_snapshots_insert_own"
  ON public.chart_snapshots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "chart_snapshots_update_own"
  ON public.chart_snapshots FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
