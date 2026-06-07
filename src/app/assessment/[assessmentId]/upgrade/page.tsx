import type { Metadata } from "next";

export const metadata: Metadata = { title: "Unlock Full Report" };

type Props = {
  params: Promise<{ assessmentId: string }>;
};

export default async function AssessmentUpgradePage({ params }: Props) {
  const { assessmentId } = await params;

  // TODO (Milestone 7): requireUser(), render Stripe checkout for Full Report product
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
      <p className="text-ivory/40 text-sm mb-4">Assessment: {assessmentId}</p>
      <h1 className="text-3xl font-bold text-ivory mb-4">Unlock Your Full Report</h1>
      <p className="text-ivory/60 mb-10">
        Get your complete category-by-category spiritual analysis, scripture recommendations, and personal action plan.
      </p>
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50">
        Stripe paywall coming in Milestone 7.
      </div>
    </div>
  );
}
