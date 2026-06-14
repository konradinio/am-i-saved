# Milestone 9 — PDF Generation
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 8

---

## Objective

Generate a professional branded PDF of the Full Spiritual Report in the background after the report content is confirmed ready, and make it available for download directly on the full report page.

---

## Generation Flow

```
M8 webhook sets ai_reports.generated_at
  → PDF generation triggered (server-side, async)
  → PDF uploaded to Supabase Storage (reports/{user_id}/{assessment_id}.pdf)
  → row inserted into report_files table

Full report page polls report_files for the assessment_id
  → "Download PDF" button activates when report_files row exists
  → Signed URL generated on-demand when user clicks the button
```

The PDF is generated **after** the full report text is displayed on screen. The user sees their report immediately; the download button appears within seconds to minutes of the report rendering.

---

## Scope

- React-PDF generation in API route (server-side only)
- PDF includes all required sections and branding
- Upload to Supabase Storage (`reports` bucket)
- `report_files` row created after upload (storage_path stored — not the URL)
- Signed time-limited download URL generated on-demand when user clicks Download
- Download button on full report page (polls `report_files` until available)

---

## PDF Contents

1. Am I Saved? Logo
2. Report Date
3. User Nickname (from `profiles.nickname`) — omit if null; never use legal name
4. Spiritual Health Radar Chart (image export from Milestone 6)
5. Strengths Bar Chart
6. Executive Summary
7. Full Narrative Analysis
8. Category-by-Category Breakdown
9. Reflection Questions
10. Action Plan
11. Spiritual Safety Disclaimer (always last — permanent requirement)

---

## Technical Notes

- React-PDF MUST run in an API route only — never in a Server Component or Client Component
- Chart images exported via canvas snapshot before PDF generation (same technique as M6 chart_snapshots)
- Signed URLs generated fresh on each download request (not stored in `report_files`)
- `report_files.storage_path` stores the path only: `reports/{user_id}/{assessment_id}.pdf`
- Signed URL expiry: **48 hours** (longer than 24h original spec — gives user time to download after receiving the email)
- PDF access is RLS-gated: users can only SELECT their own `report_files` rows

---

## Deliverables

- [ ] `generateReportPdf()` implementation in `lib/pdf/generate-report-pdf.ts`
- [ ] `POST /api/pdf/generate` real implementation
- [ ] PDF triggered after `ai_reports.generated_at` is set (from M8 webhook flow)
- [ ] PDF uploaded to Supabase Storage under `reports/{user_id}/{assessment_id}.pdf`
- [ ] `report_files` row inserted after upload
- [ ] "Download PDF" button on full report page — polls `report_files`, activates when row exists
- [ ] Signed URL generated on-demand on button click (not stored)
- [ ] Chart export to static image for PDF embedding

---

## Dependencies

- Milestone 8 complete (full report content in `ai_reports`)
- Milestone 6 complete (chart images for PDF embedding)
- Supabase Storage bucket `reports` created (Milestone 3 prerequisite)

---

## Success Criteria

- [ ] PDF generated with all required sections
- [ ] PDF uploaded to Supabase Storage
- [ ] "Download PDF" button appears on full report page when PDF is ready
- [ ] Signed download URL generated on-demand per click (not stored)
- [ ] PDF accessible only to the authenticated report owner (RLS verified)
- [ ] Signed URLs expire after 48 hours
