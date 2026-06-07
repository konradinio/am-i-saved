import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold text-ivory mb-6">Terms of Service</h1>
      <p className="text-ivory/60 text-sm mb-8">Last updated: June 2026</p>
      <div className="space-y-6 text-ivory/70 leading-relaxed">
        <p>
          Am I Saved? is a spiritual reflection tool, not a theological authority.
          It does not determine salvation, replace clergy, or substitute for professional counseling.
        </p>
        {/* TODO (Legal): Add full terms of service content before launch */}
        <p className="text-ivory/40 italic">Full terms of service to be added before public launch.</p>
      </div>
    </div>
  );
}
