import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
      {/* ─── Cinematic Hero — the rescue, as art direction ──── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "92vh", backgroundColor: "#071523" }}
      >
        {/* The artwork itself — full-bleed, slow Ken Burns drift */}
        <div className="absolute inset-0 hero-kenburns">
          <Image
            src="/hero/jesus-rescues-peter.png"
            alt="Jesus reaching down from the storm to grasp the hand of Peter as he sinks beneath the waves, the sunrise breaking over the sea — Matthew 14"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "62% center" }}
          />
        </div>

        {/* Top scrim — keeps the nav legible over the bright sky */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,21,35,0.55) 0%, rgba(7,21,35,0.15) 55%, transparent 100%)",
          }}
        />

        {/* Bottom scrim — anchors the headline and dissolves into the page */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 42%, rgba(7,21,35,0.45) 66%, rgba(7,21,35,0.88) 86%, #071523 100%)",
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 55% 45%, transparent 55%, rgba(7,21,35,0.4) 100%)",
          }}
        />

        {/* Hero copy — anchored to the waterline at the bottom */}
        <div className="relative z-10 flex min-h-[92vh] flex-col items-center justify-end text-center px-4 pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto">
            <p
              className="hero-rise hero-rise-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-5"
              style={{ color: "#f0c674", textShadow: "0 2px 12px rgba(7,21,35,0.7)" }}
            >
              Christian Spiritual Reflection
            </p>

            <h1
              className="hero-rise hero-rise-2 text-6xl md:text-8xl lg:text-9xl text-ivory leading-none mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                textShadow: "0 4px 30px rgba(7,21,35,0.8), 0 1px 4px rgba(7,21,35,0.6)",
              }}
            >
              Am I Saved?
            </h1>

            <p
              className="hero-rise hero-rise-3 text-xl md:text-2xl text-ivory/90 leading-relaxed mb-3"
              style={{ textShadow: "0 2px 16px rgba(7,21,35,0.8)" }}
            >
              Discover where you are on your journey toward salvation.
            </p>

            <p
              className="hero-rise hero-rise-3 text-base text-ivory/65 leading-relaxed max-w-xl mx-auto mb-10"
              style={{ textShadow: "0 2px 12px rgba(7,21,35,0.7)" }}
            >
              A guided self-reflection grounded in scripture and Christian tradition.
              No account required. No judgment rendered. Only honest clarity.
            </p>

            <div className="hero-rise hero-rise-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-9">
              <Link href="/assessment/start">
                <Button
                  size="lg"
                  className="bg-gold text-navy hover:bg-gold/90 font-semibold text-base px-10 py-6 rounded-xl shadow-2xl"
                >
                  Begin Reflection
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/35 text-ivory hover:bg-white/10 text-base px-8 py-6 rounded-xl backdrop-blur-sm"
                >
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Scripture — the moment on screen, named */}
            <p
              className="hero-rise hero-rise-5 text-sm md:text-base italic mb-8"
              style={{ color: "rgba(240,221,180,0.85)", textShadow: "0 2px 14px rgba(7,21,35,0.8)" }}
            >
              &ldquo;Lord, save me.&rdquo;
              <span className="not-italic text-xs ml-2" style={{ color: "rgba(240,221,180,0.55)" }}>
                Matthew 14:30
              </span>
            </p>

            {/* Trust indicators */}
            <div className="hero-rise hero-rise-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ivory/55">
              {["No account required", "No email needed to start", "Free executive summary"].map(
                (label) => (
                  <span key={label} className="flex items-center gap-2">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "rgba(240,198,116,0.8)" }}
                    />
                    {label}
                  </span>
                )
              )}
            </div>
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
