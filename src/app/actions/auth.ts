"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  loginSchema,
  magicLinkSchema,
  registerSchema,
} from "@/lib/validation/schemas";

export type AuthActionState = {
  error?: string;
  success?: string;
};

export async function signIn(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "Invalid email or password." };
  }

  const redirectPath = (formData.get("redirect") as string | null) ?? "/account";
  redirect(redirectPath.startsWith("/") ? redirectPath : "/account");
}

export async function signUp(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    nickname: formData.get("nickname") || undefined,
    denomination: formData.get("denomination") || undefined,
    ageRange: formData.get("ageRange") || undefined,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const metadata = {
    nickname: parsed.data.nickname ?? null,
    denomination: parsed.data.denomination ?? null,
    age_range: parsed.data.ageRange ?? null,
  };

  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (currentUser?.is_anonymous) {
    // Convert anonymous session to permanent account.
    // user_id stays the same — no data migration needed.
    const { error } = await supabase.auth.updateUser({
      email: parsed.data.email,
      password: parsed.data.password,
      data: metadata,
    });
    if (error) return { error: error.message };

    // Sync profile table with registration data.
    await supabase
      .from("profiles")
      .update({
        nickname: metadata.nickname,
        denomination: metadata.denomination as
          | "catholic"
          | "protestant"
          | "orthodox"
          | "non_denominational"
          | "non_christian"
          | "unsure"
          | null,
        age_range: metadata.age_range as
          | "under_18"
          | "18_24"
          | "25_34"
          | "35_44"
          | "45_54"
          | "55_64"
          | "65_plus"
          | null,
      })
      .eq("user_id", currentUser.id);

    redirect("/account");
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: metadata },
  });

  if (error) {
    return { error: error.message };
  }

  // Session is set immediately when email confirmation is disabled in Supabase.
  if (data.session) {
    redirect("/account");
  }

  return {
    success:
      "Account created! Check your email to confirm your address, then sign in.",
  };
}

// Creates an anonymous Supabase session.
// Called before the assessment flow begins (M4).
// No-op if the user already has a session.
export async function startAnonymousSession(): Promise<AuthActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return {};

  const { error } = await supabase.auth.signInAnonymously();
  if (error) return { error: error.message };
  return {};
}

export async function signInWithMagicLink(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = { email: formData.get("email") };

  const parsed = magicLinkSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const redirectPath = (formData.get("redirect") as string | null) ?? "/account";
  const safePath = redirectPath.startsWith("/") ? redirectPath : "/account";
  const callbackUrl = `${appUrl}/auth/callback?next=${encodeURIComponent(safePath)}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: { emailRedirectTo: callbackUrl },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Magic link sent! Check your email to sign in." };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
