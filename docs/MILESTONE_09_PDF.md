# Milestone 9 — PDF Generation
## Am I Saved?

**Status:** Pending | **Depends on:** Milestone 8

---

## Objective

Generate professional PDF reports using React-PDF and store them in Supabase Storage.

---

## Scope

- React-PDF generation in API route (server-side only)
- PDF includes all required sections and branding
- Upload to Supabase Storage (`reports` bucket)
- Signed time-limited download URL returned

---

## PDF Contents

1. Am I Saved? Logo
2. Report Date
3. User Name
4. Spiritual Health Radar Chart (image export from Milestone 6)
5. Strengths Bar Chart
6. Executive Summary
7. Full Narrative Analysis
8. Category-by-Category Breakdown
9. Reflection Questions
10. Action Plan
11. Spiritual Safety Disclaimer

---

## Deliverables

- [ ] `generateReportPdf()` implementation in `lib/pdf/generate-report-pdf.ts`
- [ ] `POST /api/pdf/generate` real implementation
- [ ] PDF uploaded to Supabase Storage
- [ ] Signed URL stored in `report_files` table
- [ ] Chart export to static image for PDF embedding

---

## Technical Notes

- React-PDF MUST run in an API route only — never in a Server Component
- Chart images exported via canvas snapshot before PDF generation
- Signed URLs expire after 24 hours for security

---

## Dependencies

- Milestone 8 complete (full report content)
- Milestone 6 complete (chart images)
- Supabase Storage bucket `reports` created (Milestone 3)

---

## Success Criteria

- [ ] PDF generated with all required sections
- [ ] PDF uploaded to Supabase Storage
- [ ] Signed download URL returned
- [ ] PDF accessible only to the authenticated report owner
