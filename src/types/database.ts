// ============================================================
// Supabase Database type — generated manually from M3 migrations.
// Pass as the generic to createBrowserClient<Database> and
// createServerClient<Database> for fully-typed Supabase queries.
// ============================================================

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          nickname: string | null;
          denomination: Database["public"]["Enums"]["denomination"] | null;
          age_range: Database["public"]["Enums"]["age_range"] | null;
          assessment_done: boolean;
          ai_life_spiritual_coaching_done: boolean;
          human_life_spiritual_coaching_done: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          nickname?: string | null;
          denomination?: Database["public"]["Enums"]["denomination"] | null;
          age_range?: Database["public"]["Enums"]["age_range"] | null;
          assessment_done?: boolean;
          ai_life_spiritual_coaching_done?: boolean;
          human_life_spiritual_coaching_done?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          nickname?: string | null;
          denomination?: Database["public"]["Enums"]["denomination"] | null;
          age_range?: Database["public"]["Enums"]["age_range"] | null;
          assessment_done?: boolean;
          ai_life_spiritual_coaching_done?: boolean;
          human_life_spiritual_coaching_done?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      assessments: {
        Row: {
          id: string;
          user_id: string;
          denomination_path: Database["public"]["Enums"]["denomination"] | null;
          status: Database["public"]["Enums"]["assessment_status"];
          executive_summary_viewed_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          denomination_path?: Database["public"]["Enums"]["denomination"] | null;
          status?: Database["public"]["Enums"]["assessment_status"];
          executive_summary_viewed_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          denomination_path?: Database["public"]["Enums"]["denomination"] | null;
          status?: Database["public"]["Enums"]["assessment_status"];
          executive_summary_viewed_at?: string | null;
          completed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      assessment_responses: {
        Row: {
          id: string;
          assessment_id: string;
          user_id: string;
          question_id: string;
          question_type: Database["public"]["Enums"]["question_type"];
          answer: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          user_id: string;
          question_id: string;
          question_type: Database["public"]["Enums"]["question_type"];
          answer: Json;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      ai_reports: {
        Row: {
          id: string;
          assessment_id: string;
          user_id: string;
          report_type: Database["public"]["Enums"]["report_type"];
          content: Json | null;
          prompt_version: string;
          generated_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          user_id: string;
          report_type: Database["public"]["Enums"]["report_type"];
          content?: Json | null;
          prompt_version: string;
          generated_at?: string | null;
          created_at?: string;
        };
        Update: {
          content?: Json | null;
          prompt_version?: string;
          generated_at?: string | null;
        };
        Relationships: [];
      };
      report_files: {
        Row: {
          id: string;
          assessment_id: string;
          user_id: string;
          report_type: Database["public"]["Enums"]["report_type"];
          storage_path: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          user_id: string;
          report_type: Database["public"]["Enums"]["report_type"];
          storage_path: string;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      chart_snapshots: {
        Row: {
          id: string;
          assessment_id: string;
          user_id: string;
          data: Json;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          user_id: string;
          data: Json;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          data?: Json;
          image_url?: string | null;
        };
        Relationships: [];
      };
      assessment_action_plans: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          title: string;
          description: string | null;
          measure: string | null;
          due_date: string | null;
          status: Database["public"]["Enums"]["action_plan_status"];
          sort_order: number;
          reminder_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          user_id: string;
          title: string;
          description?: string | null;
          measure?: string | null;
          due_date?: string | null;
          status?: Database["public"]["Enums"]["action_plan_status"];
          sort_order?: number;
          reminder_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          measure?: string | null;
          due_date?: string | null;
          status?: Database["public"]["Enums"]["action_plan_status"];
          sort_order?: number;
          reminder_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          stripe_payment_intent_id: string;
          stripe_session_id: string | null;
          product: Database["public"]["Enums"]["payment_product"];
          amount_cents: number;
          currency: string;
          status: Database["public"]["Enums"]["payment_status"];
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_payment_intent_id: string;
          stripe_session_id?: string | null;
          product: Database["public"]["Enums"]["payment_product"];
          amount_cents: number;
          currency?: string;
          status?: Database["public"]["Enums"]["payment_status"];
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          stripe_session_id?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          metadata?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      gift_codes: {
        Row: {
          id: string;
          code: string;
          purchased_by_user_id: string;
          redeemed_by_user_id: string | null;
          product: Database["public"]["Enums"]["payment_product"];
          status: Database["public"]["Enums"]["gift_code_status"];
          payment_id: string;
          expires_at: string | null;
          redeemed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          purchased_by_user_id: string;
          redeemed_by_user_id?: string | null;
          product: Database["public"]["Enums"]["payment_product"];
          status?: Database["public"]["Enums"]["gift_code_status"];
          payment_id: string;
          expires_at?: string | null;
          redeemed_at?: string | null;
          created_at?: string;
        };
        Update: {
          redeemed_by_user_id?: string | null;
          status?: Database["public"]["Enums"]["gift_code_status"];
          redeemed_at?: string | null;
        };
        Relationships: [];
      };
      coaching_sponsorships: {
        Row: {
          id: string;
          sponsor_user_id: string;
          recipient_user_id: string | null;
          code: string;
          sessions_total: number;
          sessions_used: number;
          payment_id: string;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sponsor_user_id: string;
          recipient_user_id?: string | null;
          code: string;
          sessions_total?: number;
          sessions_used?: number;
          payment_id: string;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          recipient_user_id?: string | null;
          sessions_used?: number;
        };
        Relationships: [];
      };
      conscience_sessions: {
        Row: {
          id: string;
          user_id: string;
          path_type: Database["public"]["Enums"]["conscience_path"];
          status: Database["public"]["Enums"]["session_status"];
          reflection_summary: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          path_type: Database["public"]["Enums"]["conscience_path"];
          status?: Database["public"]["Enums"]["session_status"];
          reflection_summary?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: Database["public"]["Enums"]["session_status"];
          reflection_summary?: string | null;
          completed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      conscience_responses: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          item_id: string;
          response: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          item_id: string;
          response: Json;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      conscience_action_plans: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          title: string;
          description: string | null;
          measure: string | null;
          due_date: string | null;
          status: Database["public"]["Enums"]["action_plan_status"];
          sort_order: number;
          reminder_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          title: string;
          description?: string | null;
          measure?: string | null;
          due_date?: string | null;
          status?: Database["public"]["Enums"]["action_plan_status"];
          sort_order?: number;
          reminder_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          measure?: string | null;
          due_date?: string | null;
          status?: Database["public"]["Enums"]["action_plan_status"];
          sort_order?: number;
          reminder_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Enums: {
      assessment_status:
        | "in_progress"
        | "submitted"
        | "summary_ready"
        | "paid"
        | "full_report_ready";
      report_type: "executive_summary" | "full_report";
      payment_status: "pending" | "succeeded" | "failed" | "refunded";
      payment_product:
        | "full_report"
        | "gift_assessment"
        | "coaching_session"
        | "sponsored_coaching";
      action_plan_status: "pending" | "in_progress" | "completed" | "cancelled";
      denomination:
        | "catholic"
        | "protestant"
        | "orthodox"
        | "non_denominational"
        | "non_christian"
        | "unsure";
      age_range:
        | "under_18"
        | "18_24"
        | "25_34"
        | "35_44"
        | "45_54"
        | "55_64"
        | "65_plus";
      conscience_path:
        | "adult_catholic"
        | "youth_catholic"
        | "general_christian";
      gift_code_status: "available" | "redeemed" | "expired";
      session_status: "in_progress" | "completed";
      question_type:
        | "single_choice"
        | "multiple_choice"
        | "likert"
        | "free_text";
    };
  };
};
