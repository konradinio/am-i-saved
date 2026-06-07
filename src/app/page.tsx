import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Heart,
  FileText,
  Gift,
  Users,
  BarChart2,
} from "lucide-react";

const DISCLAIMER =
  "Am I Saved? is a spiritual reflection aid. It does not judge your soul, determine salvation, replace sacramental confession, replace spiritual direction, or substitute for professional counseling. Only God knows the human heart.";

const features = [
  {
    icon: BookOpen,
    title: "Spiritual Self-Assessment",
    description:
      "A thoughtful questionnaire examining your faith, prayer life, charity, forgiveness, and relationship with God.",
  },
  {
    icon: BarChart2,
    title: "Executive Summary",
    description:
      "A free AI-generated overview of your spiritual strengths, areas of growth, and reflection questions.",
  },
  {
    icon: FileText,
    title: "Full Spiritual Report",
    description:
      "A comprehensive category-by-category report with scripture, prayer recommendations, and a personal action plan.",
  },
  {
    icon: Heart,
    title: "Examination of Conscience",
    description:
      "A guided examination based on the Ten Commandments, Seven Deadly Sins, and your state of life.",
  },
  {
    icon: Gift,
    title: "Gift Access",
    description:
      "Purchase a spiritual assessment as a gift for someone you love. A unique code gives them full access.",
  },
  {
    icon: Users,
    title: "Spiritual Coaching",
    description:
      "Book a one-on-one session with a spiritual life coach for personalized guidance and accountability.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #c9973a33 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold mb-4">
            Christian Spiritual Reflection
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-ivory leading-tight mb-6">
            Am I Saved?
          </h1>

          <p className="text-xl md:text-2xl text-ivory/70 leading-relaxed mb-10">
            Not certainty about heaven, but clarity about your soul.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessment/start">
              <Button
                size="lg"
                className="bg-gold text-navy hover:bg-gold/90 font-semibold text-base px-8 py-6 rounded-xl shadow-lg"
              >
                Start Reflection
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-ivory hover:bg-white/5 text-base px-8 py-6 rounded-xl"
              >
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Spiritual Safety Disclaimer ──────────────────── */}
      <section className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-sm text-ivory/50 leading-relaxed border border-white/10 rounded-xl px-6 py-4 bg-white/5">
            {DISCLAIMER}
          </p>
        </div>
      </section>

      {/* ─── Feature Cards ────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-4">
              Everything you need for honest reflection
            </h2>
            <p className="text-ivory/60 text-lg max-w-xl mx-auto">
              A complete spiritual growth platform designed for Catholics,
              Protestants, Orthodox Christians, and seekers of all backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="bg-white/5 border-white/10 hover:border-gold/30 transition-all duration-300 rounded-2xl"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gold/15">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <CardTitle className="text-ivory text-lg font-semibold">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ivory/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-ivory mb-4">
            Begin your reflection today
          </h2>
          <p className="text-ivory/60 mb-8">
            The assessment takes 15–20 minutes. Your answers are private,
            your summary is free.
          </p>
          <Link href="/assessment/start">
            <Button
              size="lg"
              className="bg-gold text-navy hover:bg-gold/90 font-semibold px-10 py-6 rounded-xl text-base"
            >
              Start Reflection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
