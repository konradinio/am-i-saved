import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sponsor Coaching" };

export default function SponsorPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
      <h1 className="text-4xl font-bold text-ivory mb-4">Sponsor a Coaching Session</h1>
      <p className="text-ivory/70 mb-10">
        Fund a spiritual coaching session for someone who cannot afford it. An anonymous act of charity.
      </p>
      {/* TODO (Milestone 14): Stripe sponsorship purchase flow */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50">
        Sponsorship coming in Milestone 14.
      </div>
    </div>
  );
}
