import type { Metadata } from "next";

export const metadata: Metadata = { title: "Assessment Step" };

type Props = {
  params: Promise<{ assessmentId: string; stepId: string }>;
};

export default async function AssessmentStepPage({ params }: Props) {
  const { assessmentId, stepId } = await params;

  // TODO (Milestone 4): requireUser(), fetch question for this step, render questionnaire engine
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <p className="text-ivory/40 text-sm mb-4">
        Assessment: {assessmentId} / Step: {stepId}
      </p>
      <h1 className="text-3xl font-bold text-ivory mb-8">Question Placeholder</h1>
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Questionnaire engine coming in Milestone 4.
      </div>
    </div>
  );
}
