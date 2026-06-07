import type { Metadata } from "next";

export const metadata: Metadata = { title: "Start Reflection" };

export default function AssessmentStartPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
      <h1 className="text-4xl font-bold text-ivory mb-4">Begin Your Reflection</h1>
      <p className="text-ivory/70 mb-4">
        This assessment takes 15–20 minutes and covers your faith, prayer, charity, forgiveness, and more.
      </p>
      <p className="text-ivory/50 text-sm mb-10">
        Am I Saved? does not determine salvation. Only God knows the human heart.
      </p>
      {/* TODO (Milestone 4): Implement denomination selection and questionnaire start */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50">
        Questionnaire engine coming in Milestone 4.
      </div>
    </div>
  );
}
