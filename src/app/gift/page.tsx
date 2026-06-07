import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gift Access" };

export default function GiftPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
      <h1 className="text-4xl font-bold text-ivory mb-4">Give the Gift of Reflection</h1>
      <p className="text-ivory/70 mb-10">
        Purchase a spiritual assessment for someone you love. A unique code delivers full access to their inbox.
      </p>
      {/* TODO (Milestone 11): Add Stripe gift purchase flow */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50">
        Gift code purchase coming in Milestone 11.
      </div>
    </div>
  );
}
