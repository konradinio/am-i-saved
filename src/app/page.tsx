import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { HandsMotif } from "@/components/ui/HandsMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BarChart2, BookOpen, Download, FileText, Shield, Heart } from "lucide-react";

const deliverables = [
  {
    icon: BarChart2,
    title: "Spiritual Health Charts",
    description:
      "Visual radar and bar charts across 8 spiritual dimensions — faith, prayer, charity, forgiveness, and more.",
    badge: "Free",
    badgeVariant: "teal" as const,
  },
  {
    icon: FileText,
    title: "Executive Summary",
    description:
      "A free AI-generated narrative of your spiritual strengths, areas for growth, and personal reflection questions.",
    badge: "Free",
    badgeVariant: "teal" as const,
  },
  {
    icon: BookOpen,
    title: "Full Narrative Report",
    description:
      "Deep category-by-category analysis with personalized scripture, prayers, and a practical action plan.",
    badge: "$2.99",
    badgeVariant: "gold" as const,
  },
  {
    icon: Download,
    title: "PDF Download",
    description:
      "Your complete spiritual report as a beautifully formatted PDF, yours to keep and return to.",
    badge: "$2.99",
    badgeVariant: "gold" as const,
  },
];

const trustPoints = [
  {
    icon: BookOpen,
    heading: "Grounded in Scripture",
    body: "Every question is anchored in biblical teaching — the Sermon on the Mount, the Great Commandment, the Epistles, and the Psalms.",
  },
  {
    icon: Heart,
    heading: "Reflects Core Christian Tradition",
    body: "The assessment draws on shared principles across Catholic, Protestant, Orthodox, and Non-Denominational Christianity.",
  },
  {
    icon: FileText,
    heading: "AI as Mirror, Not Judge",
    body: "The AI generates reflection, not verdicts. It asks the questions God has always asked. The answers are between you and Him.",
  },
  {
    icon: Shield,
    heading: "Your Answers Stay Private",
    body: "Your responses are used only to generate your report. We do not sell data, share results, or build profiles for advertising.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero: Sky Zone + Wave + Ocean Zone ─────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #3D1E08 0%, #1A2540 30%, #0f1f3c 52%, #0d2a3a 70%, #071523 100%)",
        }}
      >
        {/* Sun / sky radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 35% at 50% 2%, rgba(232,165,53,0.22) 0%, transparent 100%)",
          }}
        />

        {/* Sky zone — hero content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 pb-8 md:pt-36 md:pb-12">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: "#e8a535" }}
            >
              Christian Spiritual Reflection
            </p>

            <h1
              className="text-6xl md:text-8xl lg:text-9xl text-ivory leading-none mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}
            >
              Am I Saved?
            </h1>

            <p className="text-xl md:text-2xl text-ivory/75 leading-relaxed mb-4">
              Discover where you are on your journey toward salvation.
            </p>

            <p className="text-base text-ivory/50 leading-relaxed max-w-xl mx-auto mb-10">
              A guided self-reflection grounded in scripture and Christian tradition.
              No account required. No judgment rendered. Only honest clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/assessment/start">
                <Button
                  size="lg"
                  className="bg-gold text-navy hover:bg-gold/90 font-semibold text-base px-10 py-6 rounded-xl shadow-lg"
                >
                  Begin Reflection
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-ivory hover:bg-white/10 text-base px-8 py-6 rounded-xl"
                >
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-ivory/40">
              {["No account required", "No email needed to start", "Free executive summary"].map(
                (label) => (
                  <span key={label} className="flex items-center gap-2">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "rgba(201,151,58,0.6)" }}
                    />
                    {label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Animated wave divider */}
        <WaveDivider />

        {/* Ocean zone — hands motif */}
        <div className="relative flex flex-col items-center px-4 py-16 md:py-20">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 50% 70%, rgba(26,107,122,0.15) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <HandsMotif />
            <p
              className="text-sm italic mt-8 text-center max-w-xs leading-relaxed"
              style={{ color: "rgba(168,216,228,0.65)" }}
            >
              &ldquo;Lord, if it is you, bid me come to you on the water.&rdquo;
              <br />
              <span className="text-xs" style={{ opacity: 0.7 }}>
                Matthew 14:28
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── What You'll Receive ─────────────────────────────── */}
      <section className="px-4 py-20" style={{ backgroundColor: "#071523" }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-4">
                What You&apos;ll Receive
              </h2>
              <p className="text-ivory/50 text-lg max-w-xl mx-auto">
                Your reflection generates four deliverables — two free, two unlockable.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title}>
                  <div className="flex gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors h-full">
                    <div className="shrink-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(26,107,122,0.25)" }}
                      >
                        <Icon className="w-5 h-5" style={{ color: "#a8d8e4" }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-ivory font-semibold">{item.title}</h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={
                            item.badgeVariant === "teal"
                              ? {
                                  backgroundColor: "rgba(26,107,122,0.3)",
                                  color: "#a8d8e4",
                                }
                              : {
                                  backgroundColor: "rgba(201,151,58,0.2)",
                                  color: "#e4b86a",
                                }
                          }
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-ivory/55 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Why Trust This Reflection ───────────────────────── */}
      <section className="px-4 py-20 bg-navy">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-4">
                Why Trust This Reflection?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <ScrollReveal key={point.heading}>
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gold/15">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-ivory font-semibold mb-2">{point.heading}</h3>
                      <p className="text-ivory/55 text-sm leading-relaxed">{point.body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Spiritual Safety Disclaimer ─────────────────────── */}
      <section className="px-4 py-12" style={{ backgroundColor: "#071523" }}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div
              className="rounded-2xl p-8 border"
              style={{
                borderColor: "rgba(201,151,58,0.3)",
                backgroundColor: "rgba(201,151,58,0.05)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#c9973a" }}
              >
                A Note on Spiritual Safety
              </p>
              <p className="text-ivory/70 leading-relaxed text-sm mb-3">
                Am I Saved? is a spiritual reflection aid. It does not judge your soul, determine
                salvation, replace sacramental confession, replace spiritual direction, or
                substitute for professional counseling.
              </p>
              <p className="text-ivory/40 text-sm italic">Only God knows the human heart.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Final CTA ───────────────────────────────────────── */}
      <section
        className="px-4 py-20"
        style={{ background: "linear-gradient(135deg, #3D1E08 0%, #1a3060 100%)" }}
      >
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl text-ivory mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Begin your reflection today.
            </h2>
            <p className="text-ivory/55 mb-8 text-lg">
              15–20 minutes. No account needed. Completely private.
            </p>
            <Link href="/assessment/start">
              <Button
                size="lg"
                className="bg-gold text-navy hover:bg-gold/90 font-semibold px-12 py-6 rounded-xl text-base shadow-lg"
              >
                Begin Reflection
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
