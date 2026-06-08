import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Denomination, AgeRange } from "@/types";

export type AuthUser = {
  id: string;
  email: string;
  nickname: string | null;
  denomination: Denomination | null;
  ageRange: AgeRange | null;
  isAnonymous: boolean;
  createdAt: string;
};

// Call at the top of any protected Server Component or Server Action.
// Redirects to /login if no valid session exists.
export async function requireUser(): Promise<AuthUser> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");
  return buildAuthUser(supabase, user);
}

// Soft check — returns null instead of redirecting. Use for conditional UI.
export async function getOptionalUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return buildAuthUser(supabase, user);
}

async function buildAuthUser(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: { id: string; email?: string; user_metadata?: Record<string, unknown>; created_at: string; is_anonymous?: boolean }
): Promise<AuthUser> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname, denomination, age_range")
    .eq("user_id", user.id)
    .single();

  const meta = user.user_metadata ?? {};

  // Profile is the source of truth; fall back to user_metadata for users
  // who registered before M3 and whose profile hasn't been backfilled yet.
  return {
    id: user.id,
    email: user.email ?? "",
    nickname:
      profile?.nickname ??
      (meta.nickname as string | undefined) ??
      null,
    denomination:
      ((profile?.denomination ?? meta.denomination) as Denomination | null) ??
      null,
    ageRange:
      ((profile?.age_range ?? meta.age_range) as AgeRange | null) ??
      null,
    isAnonymous: user.is_anonymous ?? false,
    createdAt: user.created_at,
  };
}
