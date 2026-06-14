import type { Metadata } from "next";

export const metadata: Metadata = { title: "Assessment Step" };

const answerOptions = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
];

type Props = {
  params: Promise<{ assessmentId: string; stepId: string }>;
};

export default async function AssessmentStepPage({ params }: Props) {
  const { assessmentId, stepId } = await params;

  // TODO (Milestone 4): requireUser(), fetch question for this step, render questionnaire engine
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #0f1f3c 0%, #0d2a3a 50%, #071523 100%)",
      }}
    >
      {/* Wave progress bar */}
      <div className="w-full h-1 bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: "30%",
            background: "linear-gradient(90deg, #1a6b7a, #2e8b9e)",
          }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs text-ivory/30">
              Assessment {assessmentId.slice(0, 8)}&hellip;
            </p>
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(168,216,228,0.6)" }}
            >
              Step {stepId}
            </p>
          </div>

          {/* Question card */}
          <div
            className="rounded-2xl p-8 md:p-10 border"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-ivory mb-8">
              Question Placeholder
            </h1>

            <div className="space-y-3">
              {answerOptions.map((option) => (
                <div
                  key={option}
                  className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors hover:border-white/20 hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 shrink-0"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  />
                  <span className="text-ivory/75 text-sm">{option}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-ivory/25 mt-6 text-center">
              Questionnaire engine coming in Milestone 4.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button className="text-sm text-ivory/40 hover:text-ivory/70 transition-colors">
              &larr; Previous
            </button>
            <button className="text-sm text-ivory/40 hover:text-ivory/70 transition-colors">
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
