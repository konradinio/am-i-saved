import type { Metadata } from "next";

export const metadata: Metadata = { title: "Executive Summary" };

const DISCLAIMER =
  "Am I Saved? is a spiritual reflection aid. It does not judge your soul, determine salvation, replace sacramental confession, replace spiritual direction, or substitute for professional counseling. Only God knows the human heart.";

type Props = {
  params: Promise<{ assessmentId: string }>;
};

export default async function AssessmentSummaryPage({ params }: Props) {
  const { assessmentId } = await params;

  // TODO (Milestone 2): requireUser()
  // TODO (Milestone 5): Fetch AIReport (executive_summary type) from Supabase
  // TODO (Milestone 6): Render SpiritualRadarChart with real data
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <p className="text-ivory/40 text-sm mb-4">Assessment: {assessmentId}</p>
      <h1 className="text-3xl font-bold text-ivory mb-4">Your Executive Summary</h1>

      <div className="border border-gold/20 rounded-2xl p-6 bg-gold/5 mb-8">
        <p className="text-ivory/60 text-sm">{DISCLAIMER}</p>
      </div>

      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        AI Executive Summary coming in Milestone 5. Charts coming in Milestone 6.
      </div>
    </div>
  );
}
