// PDF generation service — server-side only (API route only).
// React-PDF uses browser APIs; it must run inside an API route, never a Server Component.
// TODO (Milestone 9): Implement generateReportPdf() using @react-pdf/renderer.
// TODO (Milestone 9): Implement uploadPdfToStorage() using Supabase Storage.
// TODO (Milestone 9): Implement getSecureDownloadUrl() with expiring signed URLs.

export type GeneratePdfInput = {
  assessmentId: string;
  userId: string;
  userName: string;
};

export type GeneratePdfResult = {
  pdfBuffer: Buffer;
  storageUrl: string;
};

// TODO (Milestone 9): generateReportPdf(input: GeneratePdfInput): Promise<GeneratePdfResult>
// PDF must include: Logo, Date, User Name, Charts, Executive Summary,
// Full Analysis, Reflection Questions, Action Plan, Disclaimer.
