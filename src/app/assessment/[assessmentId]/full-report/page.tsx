import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Full Spiritual Report" };

const DISCLAIMER =
  "Am I Saved? is a spiritual reflection aid. It does not judge your soul, determine salvation, replace sacramental confession, replace spiritual direction, or substitute for professional counseling. Only God knows the human heart.";

const reportSections = [
  "Overview & Spiritual Score",
  "Faith & Belief",
  "Prayer & Contemplation",
  "Charity & Service",
  "Scripture Recommendations",
  "Personal Action Plan",
];

type Props = {
  params: Promise<{ assessmentId: string }>;
};

export default async function FullReportPage({ params }: Props) {
  const { assessmentId } = await params;

  // TODO (Milestone 7): Verify payment before showing report (server-side check only)
  // TODO (Milestone 8): Fetch and render full AIReport from Supabase
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#071523" }}>
      {/* Header */}
      <div
        className="px-4 pt-16 pb-12 border-b"
        style={{
          background: "linear-gradient(180deg, #0f1f3c 0%, #071523 100%)",
          borderColor: "rgba(201,151,58,0.15)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-ivory/30 mb-6">Assessment {assessmentId}</p>

          <h1
            className="text-4xl md:text-5xl text-ivory mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Full Spiritual Report
          </h1>

          <p className="text-ivory/55 leading-relaxed max-w-xl">
            A complete category-by-category analysis of your spiritual life, with personalized
            scripture, prayers, and an action plan.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {/* Disclaimer */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            borderColor: "rgba(201,151,58,0.2)",
            backgroundColor: "rgba(201,151,58,0.04)",
          }}
        >
          <p className="text-ivory/55 text-sm leading-relaxed">{DISCLAIMER}</p>
        </div>

        {/* Loading state placeholder */}
        <div
          className="rounded-2xl border p-10 text-center"
          style={{
            borderColor: "rgba(26,107,122,0.25)",
            backgroundColor: "rgba(26,107,122,0.05)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 border-2"
            style={{
              borderColor: "rgba(168,216,228,0.3)",
              borderTopColor: "transparent",
            }}
          />
          <h3 className="text-ivory font-semibold mb-2">Generating Your Report</h3>
          <p className="text-ivory/45 text-sm">
            Your personalized spiritual report is being prepared.
            This typically takes 15–30 seconds.
          </p>
          <p className="text-xs mt-4" style={{ color: "rgba(168,216,228,0.4)" }}>
            Report generation coming in Milestone 8.
          </p>
        </div>

        {/* Report section placeholders */}
        <div className="space-y-4">
          {reportSections.map((section) => (
            <div
              key={section}
              className="rounded-xl p-6 border flex items-center gap-4"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                className="w-1 h-8 rounded-full shrink-0"
                style={{ backgroundColor: "rgba(201,151,58,0.4)" }}
              />
              <div>
                <h3 className="text-ivory/70 font-medium text-sm">{section}</h3>
                <p className="text-ivory/25 text-xs">Coming in Milestone 8</p>
              </div>
            </div>
          ))}
        </div>

        {/* PDF download */}
        <div
          className="rounded-2xl p-6 border text-center"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          <p className="text-ivory/40 text-sm mb-4">
            PDF download available once your report is generated.
          </p>
          <Button
            disabled
            variant="outline"
            className="border-white/15 text-ivory/30 cursor-not-allowed"
          >
            Download PDF
          </Button>
          <p className="text-xs text-ivory/20 mt-3">PDF generation coming in Milestone 9.</p>
        </div>

        {/* Back to summary */}
        <div className="text-center pb-8">
          <Link
            href={`/assessment/${assessmentId}/summary`}
            className="text-sm text-ivory/40 hover:text-ivory/70 transition-colors"
          >
            &larr; Back to Executive Summary
          </Link>
        </div>
      </div>
    </div>
  );
}
