// ============================================================
// Am I Saved? — Core TypeScript Types
// Placeholder definitions for all major domain entities.
// Full schemas will be implemented in Milestone 3 (Database).
// ============================================================

// ─── User & Auth ────────────────────────────────────────────

export type UserProfile = {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  denomination: Denomination | null;
  createdAt: string;
  updatedAt: string;
};

export type Denomination =
  | "catholic"
  | "protestant"
  | "orthodox"
  | "non_denominational"
  | "non_christian"
  | "unsure";

// ─── Assessment ─────────────────────────────────────────────

export type AssessmentStatus =
  | "in_progress"
  | "submitted"
  | "summary_ready"
  | "paid"
  | "full_report_ready";

export type Assessment = {
  id: string;
  userId: string;
  denomination: Denomination | null;
  status: AssessmentStatus;
  currentStepId: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type QuestionType =
  | "single_choice"
  | "multiple_choice"
  | "likert"
  | "free_text";

export type AssessmentResponse = {
  id: string;
  assessmentId: string;
  questionId: string;
  questionType: QuestionType;
  answer: string | string[] | number;
  createdAt: string;
};

// ─── AI Reports ─────────────────────────────────────────────

export type ReportType = "executive_summary" | "full_report";

export type AIReport = {
  id: string;
  assessmentId: string;
  userId: string;
  reportType: ReportType;
  // Content is stored as structured JSON from OpenAI
  content: ExecutiveSummaryContent | FullReportContent | null;
  promptVersion: string;
  generatedAt: string | null;
  createdAt: string;
};

export type ExecutiveSummaryContent = {
  disclaimer: string;
  summary: string;
  spiritualStrengths: string[];
  areasOfGrowth: string[];
  reflectionQuestions: string[];
  suggestedNextSteps: string[];
};

export type FullReportContent = {
  disclaimer: string;
  narrativeAnalysis: string;
  categoryBreakdown: CategoryReport[];
  reflectionRecommendations: string[];
  prayerRecommendations: string[];
  scriptureRecommendations: string[];
  coachingRecommendations: string[];
  confessionPreparationNotes: string[];
  personalActionPlan: string[];
};

export type CategoryReport = {
  category: string;
  score: number;
  narrative: string;
  reflections: string[];
};

// ─── Payments ───────────────────────────────────────────────

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export type PaymentProduct =
  | "full_report"
  | "gift_assessment"
  | "coaching_session"
  | "sponsored_coaching";

export type Payment = {
  id: string;
  userId: string;
  stripePaymentIntentId: string;
  stripeSessionId: string | null;
  product: PaymentProduct;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

// ─── Gift Codes ─────────────────────────────────────────────

export type GiftCodeStatus = "available" | "redeemed" | "expired";

export type GiftCode = {
  id: string;
  code: string;
  purchasedByUserId: string;
  redeemedByUserId: string | null;
  product: PaymentProduct;
  status: GiftCodeStatus;
  paymentId: string;
  expiresAt: string | null;
  redeemedAt: string | null;
  createdAt: string;
};

// ─── Examination of Conscience ──────────────────────────────

export type ConsciencePathType = "adult_catholic" | "youth_catholic" | "general_christian";

export type ConscienceSessionStatus = "in_progress" | "completed";

export type ConscienceSession = {
  id: string;
  userId: string;
  pathType: ConsciencePathType;
  status: ConscienceSessionStatus;
  reflectionSummary: string | null;
  prayerSuggestions: string[];
  confessionNotes: string | null;
  completedAt: string | null;
  createdAt: string;
};

// ─── Coaching ───────────────────────────────────────────────

export type CoachingBookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type CoachingBooking = {
  id: string;
  userId: string;
  coachId: string;
  sponsorshipId: string | null;
  giftCodeId: string | null;
  status: CoachingBookingStatus;
  scheduledAt: string | null;
  meetingUrl: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CoachingSponsorship = {
  id: string;
  sponsorUserId: string;
  recipientUserId: string | null;
  code: string;
  sessionsTotal: number;
  sessionsUsed: number;
  paymentId: string;
  expiresAt: string | null;
  createdAt: string;
};

// ─── Charts ─────────────────────────────────────────────────

export type SpiritualCategory =
  | "Faith"
  | "Prayer"
  | "Charity"
  | "Forgiveness"
  | "Humility"
  | "Scripture"
  | "Community"
  | "Repentance";

export type ChartDataPoint = {
  category: SpiritualCategory;
  score: number;
  fullMark: number;
};

export type ChartSnapshot = {
  id: string;
  assessmentId: string;
  userId: string;
  data: ChartDataPoint[];
  imageUrl: string | null;
  createdAt: string;
};

// ─── API Response Shapes ─────────────────────────────────────

export type ApiSuccessResponse<T = void> = {
  ok: true;
  data?: T;
  message?: string;
};

export type ApiErrorResponse = {
  ok: false;
  error: string;
  code?: string;
};

export type ApiResponse<T = void> = ApiSuccessResponse<T> | ApiErrorResponse;
