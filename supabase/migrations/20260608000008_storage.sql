-- ============================================================
-- Migration 008: Storage RLS policies for the "reports" bucket
-- ============================================================
-- PREREQUISITE: Create the "reports" bucket in the Supabase
-- Dashboard (Storage → New bucket → Name: "reports" → Private)
-- before running this migration.
--
-- Storage path convention (within bucket):
--   {user_id}/{assessment_id}/{report_type}.pdf
--   e.g., abc-123/def-456/full_report.pdf
--
-- Service role (used by PDF generation API routes) bypasses RLS
-- entirely and does not need a policy.
-- ============================================================

-- Users can download their own report PDFs.
-- Path check: first path component matches the authenticated user's UUID.
CREATE POLICY "storage_reports_select_own"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'reports'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
