import type { Metadata } from "next";

export const metadata: Metadata = { title: "Redeem Sponsored Coaching" };

export default function SponsorRedeemPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center">
      <h1 className="text-3xl font-bold text-ivory mb-4">Redeem Sponsored Coaching</h1>
      <p className="text-ivory/70 mb-10">
        Enter your sponsorship code to unlock a coaching session gifted to you.
      </p>
      {/* TODO (Milestone 14): Sponsorship code redemption form */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50">
        Sponsorship redemption coming in Milestone 14.
      </div>
    </div>
  );
}
