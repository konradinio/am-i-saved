// ============================================================
// Am I Saved? — Core TypeScript Types (M3)
// All types are aligned with the M3 database schema.
// ============================================================

// ─── User & Auth ────────────────────────────────────────────

export type AgeRange =
  | "under_18"
  | "18_24"
  | "25_34"
  | "35_44"
  | "45_54"
  | "55_64"
  | "65_plus";

export type Denomination =
  | "catholic"
  | "protestant"
  | "orthodox"
  | "non_denominational"
  | "non_christian"
  | "unsure";

// Mirrors the profiles table row (camelCase for TypeScript).
export type UserProfile = {
  userId: string;
  nickname: string | null;
  denomination: Denomination | null;
  ageRange: AgeRange | null;
  assessmentDone: boolean;
  aiLifeSpiritualCoachingDone: boolean;
  humanLifeSpiritualCoachingDone: boolean;
  createdAt: string;
  updatedAt: string;
};

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
  denominationPath: Denomination | null;
  status: AssessmentStatus;
  executiveSummaryViewedAt: string | null;
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
  userId: string;
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

// ─── Action Plans ────────────────────────────────────────────

export type ActionPlanStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type AssessmentActionPlan = {
  id: string;
  reportId: string;
  userId: string;
  title: string;
  description: string | null;
  measure: string | null;
  dueDate: string | null;
  status: ActionPlanStatus;
  sortOrder: number;
  reminderAt: string | null;
  createdAt: string;
  updatedAt: string;
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
  metadata: Record<string, unknown>;
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

export type SessionStatus = "in_progress" | "completed";

export type ConscienceSession = {
  id: string;
  userId: string;
  pathType: ConsciencePathType;
  status: SessionStatus;
  reflectionSummary: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ConscienceResponse = {
  id: string;
  sessionId: string;
  userId: string;
  itemId: string;
  response: string | string[] | number | boolean;
  createdAt: string;
};

export type ConscienceActionPlan = {
  id: string;
  sessionId: string;
  userId: string;
  title: string;
  description: string | null;
  measure: string | null;
  dueDate: string | null;
  status: ActionPlanStatus;
  sortOrder: number;
  reminderAt: string | null;
  createdAt: string;
  updatedAt: string;
};

// ─── Coaching ───────────────────────────────────────────────
// Human coaching tables (life_spiritual_coaches, human_coaching_sessions,
// human_coaching_action_plans) are deferred to M13.
// AI coaching tables (ai_coaching_sessions, ai_coaching_action_plans)
// are deferred to M5 when the coaching interaction design is defined.

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
