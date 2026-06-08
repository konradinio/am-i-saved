import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────────

export const denominationValues = [
  "catholic",
  "protestant",
  "orthodox",
  "non_denominational",
  "non_christian",
  "unsure",
] as const;

export const ageRangeValues = [
  "under_18",
  "18_24",
  "25_34",
  "35_44",
  "45_54",
  "55_64",
  "65_plus",
] as const;

export const loginSchema = z.object({
  email: z.string().email("Must be a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const magicLinkSchema = z.object({
  email: z.string().email("Must be a valid email address."),
});

export const registerSchema = z.object({
  email: z.string().email("Must be a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  nickname: z.string().max(50, "Nickname must be 50 characters or fewer.").optional(),
  denomination: z.enum(denominationValues).optional(),
  ageRange: z.enum(ageRangeValues).optional(),
});

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
