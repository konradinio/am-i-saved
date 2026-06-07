import type { Metadata } from "next";

export const metadata: Metadata = { title: "Full Spiritual Report" };

const DISCLAIMER =
  "Am I Saved? is a spiritual reflection aid. It does not judge your soul, determine salvation, replace sacramental confession, replace spiritual direction, or substitute for professional counseling. Only God knows the human heart.";

type Props = {
  params: Promise<{ assessmentId: string }>;
};

export default async function FullReportPage({ params }: Props) {
  const { assessmentId } = await params;

  // TODO (Milestone 2): requireUser()
  // TODO (Milestone 7): Verify payment before showing report (server-side check only)
  // TODO (Milestone 8): Fetch and render full AIReport from Supabase
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <p className="text-ivory/40 text-sm mb-4">Assessment: {assessmentId}</p>
      <h1 className="text-3xl font-bold text-ivory mb-4">Full Spiritual Report</h1>

      <div className="border border-gold/20 rounded-2xl p-6 bg-gold/5 mb-8">
        <p className="text-ivory/60 text-sm">{DISCLAIMER}</p>
      </div>

      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Full report generation coming in Milestone 8. PDF in Milestone 9.
      </div>
    </div>
  );
}
