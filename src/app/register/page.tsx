import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <h1 className="text-3xl font-bold text-ivory mb-2 text-center">Create Account</h1>
      <p className="text-ivory/60 text-center mb-10">Start your spiritual reflection journey.</p>
      {/* TODO (Milestone 2): Implement Supabase Auth registration */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Registration coming in Milestone 2.
      </div>
    </div>
  );
}
