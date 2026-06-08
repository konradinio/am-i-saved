"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp, type AuthActionState } from "@/app/actions/auth";
import { denominationValues, ageRangeValues } from "@/lib/validation/schemas";

const initialState: AuthActionState = {};

const DENOMINATION_LABELS: Record<string, string> = {
  catholic: "Catholic",
  protestant: "Protestant",
  orthodox: "Orthodox",
  non_denominational: "Non-Denominational",
  non_christian: "Non-Christian / Exploring",
  unsure: "Not Sure",
};

const AGE_RANGE_LABELS: Record<string, string> = {
  under_18: "Under 18",
  "18_24": "18–24",
  "25_34": "25–34",
  "35_44": "35–44",
  "45_54": "45–54",
  "55_64": "55–64",
  "65_plus": "65+",
};

export function RegisterForm() {
  const [state, action, pending] = useActionState(signUp, initialState);

  if (state.success) {
    return (
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-center">
        <p className="text-emerald-400 text-base">{state.success}</p>
        <p className="text-ivory/50 text-sm mt-4">
          <Link href="/login" className="text-gold hover:underline">
            Return to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="border border-white/10 rounded-2xl p-8 bg-white/5">
      <form action={action} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ivory/80 mb-1"
          >
            Email <span className="text-gold">*</span>
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

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-ivory/80 mb-1"
          >
            Password <span className="text-gold">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
            placeholder="Min. 8 characters"
          />
        </div>

        <div>
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-ivory/80 mb-1"
          >
            Nickname{" "}
            <span className="text-ivory/40 font-normal">(optional)</span>
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            maxLength={50}
            autoComplete="off"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
            placeholder="e.g. Pilgrim, Seeker…"
          />
          <p className="text-xs text-ivory/30 mt-1">
            Your real name is never required.
          </p>
        </div>

        <div>
          <label
            htmlFor="ageRange"
            className="block text-sm font-medium text-ivory/80 mb-1"
          >
            Age Range{" "}
            <span className="text-ivory/40 font-normal">(optional)</span>
          </label>
          <select
            id="ageRange"
            name="ageRange"
            className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-ivory focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
          >
            <option value="">Select…</option>
            {ageRangeValues.map((v) => (
              <option key={v} value={v}>
                {AGE_RANGE_LABELS[v]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="denomination"
            className="block text-sm font-medium text-ivory/80 mb-1"
          >
            Tradition / Denomination{" "}
            <span className="text-ivory/40 font-normal">(optional)</span>
          </label>
          <select
            id="denomination"
            name="denomination"
            className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-ivory focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
          >
            <option value="">Select…</option>
            {denominationValues.map((v) => (
              <option key={v} value={v}>
                {DENOMINATION_LABELS[v]}
              </option>
            ))}
          </select>
        </div>

        {state.error && (
          <p className="text-red-400 text-sm" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-xl bg-gold text-navy font-semibold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ivory/50">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
