"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { signIn, signInWithMagicLink, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

type Props = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo }: Props) {
  const [mode, setMode] = useState<"password" | "magic">("password");

  const [passwordState, passwordAction, passwordPending] = useActionState(
    signIn,
    initialState
  );
  const [magicState, magicAction, magicPending] = useActionState(
    signInWithMagicLink,
    initialState
  );

  const state = mode === "password" ? passwordState : magicState;
  const action = mode === "password" ? passwordAction : magicAction;
  const pending = mode === "password" ? passwordPending : magicPending;

  return (
    <div className="border border-white/10 rounded-2xl p-8 bg-white/5">
      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden mb-8 border border-white/10">
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "password"
              ? "bg-gold text-navy"
              : "text-ivory/60 hover:text-ivory"
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setMode("magic")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "magic"
              ? "bg-gold text-navy"
              : "text-ivory/60 hover:text-ivory"
          }`}
        >
          Magic Link
        </button>
      </div>

      <form action={action} className="space-y-5">
        {redirectTo && (
          <input type="hidden" name="redirect" value={redirectTo} />
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ivory/80 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
            placeholder="you@example.com"
          />
        </div>

        {mode === "password" && (
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ivory/80 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
              placeholder="••••••••"
            />
          </div>
        )}

        {state.error && (
          <p className="text-red-400 text-sm" role="alert">
            {state.error}
          </p>
        )}
        {state.success && (
          <p className="text-emerald-400 text-sm" role="status">
            {state.success}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-xl bg-gold text-navy font-semibold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {pending
            ? "Please wait…"
            : mode === "password"
            ? "Sign In"
            : "Send Magic Link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ivory/50">
        No account yet?{" "}
        <Link href="/register" className="text-gold hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
