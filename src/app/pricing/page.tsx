import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold text-ivory mb-6 text-center">Pricing</h1>
      <p className="text-ivory/70 text-lg text-center mb-12">
        Your Executive Summary is always free. Unlock the full report when you&apos;re ready.
      </p>
      {/* TODO (Milestone 7): Add real Stripe pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-white/10 rounded-2xl p-8 bg-white/5">
          <h2 className="text-2xl font-bold text-ivory mb-2">Free</h2>
          <p className="text-gold text-4xl font-bold mb-4">$0</p>
          <ul className="text-ivory/60 space-y-2 text-sm">
            <li>✓ Complete questionnaire</li>
            <li>✓ Executive Summary</li>
            <li>✓ Spiritual health charts</li>
          </ul>
        </div>
        <div className="border border-gold/40 rounded-2xl p-8 bg-gold/5">
          <h2 className="text-2xl font-bold text-ivory mb-2">Full Report</h2>
          <p className="text-gold text-4xl font-bold mb-4">$2.99</p>
          <ul className="text-ivory/60 space-y-2 text-sm">
            <li>✓ Everything in Free</li>
            <li>✓ Full narrative analysis</li>
            <li>✓ Category breakdown</li>
            <li>✓ Prayer &amp; scripture recommendations</li>
            <li>✓ PDF download</li>
            <li>✓ Email delivery</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
