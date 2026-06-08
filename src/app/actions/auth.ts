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

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        nickname: parsed.data.nickname ?? null,
        denomination: parsed.data.denomination ?? null,
        age_range: parsed.data.ageRange ?? null,
      },
    },
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
