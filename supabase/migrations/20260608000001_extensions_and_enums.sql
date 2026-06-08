-- ============================================================
-- Migration 001: Extensions, ENUMs, and shared trigger function
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENUM types ─────────────────────────────────────────────

CREATE TYPE assessment_status AS ENUM (
  'in_progress',
  'submitted',
  'summary_ready',
  'paid',
  'full_report_ready'
);

CREATE TYPE report_type AS ENUM (
  'executive_summary',
  'full_report'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'succeeded',
  'failed',
  'refunded'
);

CREATE TYPE payment_product AS ENUM (
  'full_report',
  'gift_assessment',
  'coaching_session',
  'sponsored_coaching'
);

CREATE TYPE action_plan_status AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE denomination AS ENUM (
  'catholic',
  'protestant',
  'orthodox',
  'non_denominational',
  'non_christian',
  'unsure'
);

CREATE TYPE age_range AS ENUM (
  'under_18',
  '18_24',
  '25_34',
  '35_44',
  '45_54',
  '55_64',
  '65_plus'
);

CREATE TYPE conscience_path AS ENUM (
  'adult_catholic',
  'youth_catholic',
  'general_christian'
);

CREATE TYPE gift_code_status AS ENUM (
  'available',
  'redeemed',
  'expired'
);

CREATE TYPE session_status AS ENUM (
  'in_progress',
  'completed'
);

CREATE TYPE question_type AS ENUM (
  'single_choice',
  'multiple_choice',
  'likert',
  'free_text'
);

-- ─── Shared updated_at trigger function ─────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
