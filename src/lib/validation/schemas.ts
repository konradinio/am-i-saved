// Zod validation schemas — shared between API routes and Server Actions.
// TODO (Milestone 2): Add auth schemas (login, register).
// TODO (Milestone 4): Add questionnaire/assessment schemas.
// TODO (Milestone 7): Add payment schemas.
import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────────

// TODO (Milestone 2): loginSchema, registerSchema, otpSchema

// ─── Assessment ──────────────────────────────────────────────

// TODO (Milestone 4): startAssessmentSchema, submitResponseSchema

// ─── Payment ─────────────────────────────────────────────────

// TODO (Milestone 7): createCheckoutSessionSchema

// ─── Gift Codes ──────────────────────────────────────────────

// TODO (Milestone 11): purchaseGiftCodeSchema, redeemGiftCodeSchema

// ─── Coaching ────────────────────────────────────────────────

// TODO (Milestone 13): bookCoachingSchema

// ─── Shared Utilities ────────────────────────────────────────

export const uuidSchema = z.string().uuid("Must be a valid UUID.");

export const emailSchema = z.string().email("Must be a valid email address.");

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
