import type { Metadata } from "next";

export const metadata: Metadata = { title: "Redeem Gift Code" };

export default function GiftRedeemPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center">
      <h1 className="text-3xl font-bold text-ivory mb-4">Redeem Your Gift</h1>
      <p className="text-ivory/70 mb-10">Enter your gift code below to unlock your spiritual assessment.</p>
      {/* TODO (Milestone 11): Gift code redemption form with Zod validation */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50">
        Gift code redemption coming in Milestone 11.
      </div>
    </div>
  );
}
