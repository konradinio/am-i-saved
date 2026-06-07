import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold text-ivory mb-6">Privacy Policy</h1>
      <p className="text-ivory/60 text-sm mb-8">Last updated: June 2026</p>
      <div className="space-y-6 text-ivory/70 leading-relaxed">
        <p>Your spiritual data is treated with the utmost care and confidentiality.</p>
        {/* TODO (Legal): Add full privacy policy content before launch */}
        <p className="text-ivory/40 italic">Full privacy policy content to be added before public launch.</p>
      </div>
    </div>
  );
}
