import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <h1 className="text-3xl font-bold text-ivory mb-2 text-center">Sign In</h1>
      <p className="text-ivory/60 text-center mb-10">Continue your spiritual reflection journey.</p>
      {/* TODO (Milestone 2): Implement Supabase Auth — Magic Link + OTP */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Authentication coming in Milestone 2.
      </div>
    </div>
  );
}
