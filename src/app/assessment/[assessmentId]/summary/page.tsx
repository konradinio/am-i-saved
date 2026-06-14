import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Executive Summary" };

const DISCLAIMER =
  "Am I Saved? is a spiritual reflection aid. It does not judge your soul, determine salvation, replace sacramental confession, replace spiritual direction, or substitute for professional counseling. Only God knows the human heart.";

type Props = {
  params: Promise<{ assessmentId: string }>;
};

export default async function AssessmentSummaryPage({ params }: Props) {
  const { assessmentId } = await params;

  // TODO (Milestone 5): Fetch AIReport (executive_summary type) from Supabase
  // TODO (Milestone 6): Render SpiritualRadarChart with real data
  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <div
        className="px-4 pt-16 pb-12"
        style={{ background: "linear-gradient(180deg, #0d2a3a 0%, #0f1f3c 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-ivory/30 mb-6">Assessment {assessmentId}</p>

          <h1
            className="text-4xl md:text-5xl text-ivory mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Your Executive Summary
          </h1>

          <p className="text-ivory/55 leading-relaxed max-w-xl">
            An overview of your spiritual health across eight dimensions, along with
            AI-generated reflections on your strengths and areas for growth.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {/* Disclaimer */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            borderColor: "rgba(201,151,58,0.25)",
            backgroundColor: "rgba(201,151,58,0.04)",
          }}
        >
          <p className="text-ivory/55 text-sm leading-relaxed">{DISCLAIMER}</p>
        </div>

        {/* Charts placeholder */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-ivory font-semibold mb-2">Spiritual Health Charts</h2>
          <p className="text-ivory/40 text-sm mb-6">
            Radar chart and category breakdown coming in Milestone 6.
          </p>
          <div className="h-48 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
            <p className="text-ivory/20 text-sm">Chart area</p>
          </div>
        </div>

        {/* AI summary placeholder */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-ivory font-semibold mb-2">AI-Generated Summary</h2>
          <p className="text-ivory/40 text-sm">
            Executive summary narrative coming in Milestone 5.
          </p>
        </div>

        {/* Upsell CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #3D1E08 0%, #1a3060 100%)" }}
        >
          <h3
            className="text-2xl text-ivory mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Ready for deeper insight?
          </h3>
          <p className="text-ivory/60 mb-6 text-sm leading-relaxed max-w-sm mx-auto">
            Unlock your Full Spiritual Report — a category-by-category analysis with scripture,
            prayers, and a personal action plan.
          </p>
          <Link href={`/assessment/${assessmentId}/upgrade`}>
            <Button
              size="lg"
              className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 rounded-xl"
            >
              Unlock Full Report &middot; $2.99
            </Button>
          </Link>
          <p className="text-ivory/25 text-xs mt-4">
            Includes PDF download &middot; Delivered instantly
          </p>
        </div>
      </div>
    </div>
  );
}
