import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <h1 className="text-3xl font-bold text-ivory mb-8">My Account</h1>
      {/* TODO (Milestone 2): Protect with requireUser(). Show profile, assessment history link. */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Account management coming in Milestone 2.
      </div>
    </div>
  );
}
