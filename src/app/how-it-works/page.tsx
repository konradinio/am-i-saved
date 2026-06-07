import type { Metadata } from "next";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold text-ivory mb-6">How It Works</h1>
      <p className="text-ivory/70 text-lg leading-relaxed mb-4">
        Complete a spiritual self-assessment, receive an AI-generated summary, and unlock your full report.
      </p>
      <p className="text-ivory/60 leading-relaxed">
        {/* TODO: Add step-by-step flow illustration */}
        Step 1: Start your reflection. Step 2: Complete the questionnaire. Step 3: Receive your Executive Summary. Step 4: Unlock your Full Report.
      </p>
    </div>
  );
}
