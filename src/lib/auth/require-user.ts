import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Denomination } from "@/types";

export type AuthUser = {
  id: string;
  email: string;
  nickname: string | null;
  denomination: Denomination | null;
  ageRange: string | null;
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
  return mapUser(user);
}

// Soft check — returns null instead of redirecting. Use for conditional UI.
export async function getOptionalUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return mapUser(user);
}

function mapUser(user: { id: string; email?: string; user_metadata?: Record<string, unknown>; created_at: string }): AuthUser {
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? "",
    nickname: (meta.nickname as string | undefined) ?? null,
    denomination: (meta.denomination as Denomination | undefined) ?? null,
    ageRange: (meta.age_range as string | undefined) ?? null,
    createdAt: user.created_at,
  };
}
