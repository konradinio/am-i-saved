import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "How It Works" };

const steps = [
  {
    number: "01",
    title: "Begin Your Reflection",
    description:
      "Start the questionnaire immediately — no account, no email, no friction. You can save your progress later if you choose.",
    detail: "15–20 minutes · Completely private · Free to start",
    variant: "teal" as const,
  },
  {
    number: "02",
    title: "Complete the Questionnaire",
    description:
      "Answer questions about your faith, prayer life, charity, forgiveness, humility, scripture engagement, and relationship with God. Questions adapt to your Christian tradition.",
    detail: "Covers 8 spiritual dimensions · Denomination-sensitive · Grounded in scripture",
    variant: "teal" as const,
  },
  {
    number: "03",
    title: "Receive Your Executive Summary",
    description:
      "Instantly see your spiritual health charts and a free AI-generated narrative of your strengths and areas for growth.",
    detail: "Free · Immediate · No payment required",
    variant: "teal" as const,
  },
  {
    number: "04",
    title: "Unlock Your Full Report",
    description:
      "Get a deep, category-by-category analysis with personalized scripture recommendations, prayers, and a practical action plan — plus a PDF download. Only if you want it.",
    detail: "$2.99 · Delivered on-screen instantly · PDF included",
    variant: "gold" as const,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="px-4 pt-20 pb-16 text-center" style={{ backgroundColor: "#071523" }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#e8a535" }}
          >
            The Process
          </p>
          <h1
            className="text-5xl md:text-6xl text-ivory leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
          >
            How It Works
          </h1>
          <p className="text-ivory/60 text-lg leading-relaxed">
            Four steps from honest self-examination to deep spiritual insight.
            The first three are free. The fourth is optional.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-20 bg-navy">
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex gap-6 md:gap-10">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-6 md:left-8 top-16 bottom-0 w-px"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                />
              )}

              {/* Step number badge */}
              <div className="shrink-0 relative z-10">
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm md:text-base font-bold text-ivory"
                  style={
                    step.variant === "teal"
                      ? { background: "linear-gradient(135deg, #1a6b7a, #2e8b9e)" }
                      : { background: "linear-gradient(135deg, #b86e22, #e8a535)" }
                  }
                >
                  {step.number}
                </div>
              </div>

              {/* Step content */}
              <div className="flex-1 pb-12 md:pb-16">
                <h2 className="text-xl md:text-2xl font-bold text-ivory mb-3">{step.title}</h2>
                <p className="text-ivory/65 leading-relaxed mb-4">{step.description}</p>
                <p className="text-xs text-ivory/35 font-medium tracking-wide">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spiritual safety note */}
      <section className="px-4 py-8" style={{ backgroundColor: "#071523" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-2xl px-6 py-5 border text-center"
            style={{
              borderColor: "rgba(201,151,58,0.2)",
              backgroundColor: "rgba(201,151,58,0.04)",
            }}
          >
            <p className="text-ivory/50 text-sm leading-relaxed">
              Am I Saved? does not determine salvation, replace spiritual direction, or substitute
              for professional counseling. Only God knows the human heart.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center" style={{ backgroundColor: "#071523" }}>
        <div className="max-w-md mx-auto">
          <p className="text-ivory/50 mb-6 text-sm">
            Ready to begin? The questionnaire starts immediately.
          </p>
          <Link href="/assessment/start">
            <Button
              size="lg"
              className="bg-gold text-navy hover:bg-gold/90 font-semibold px-10 py-6 rounded-xl text-base"
            >
              Begin Reflection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
