import type { Metadata } from "next";

export const metadata: Metadata = { title: "Assessment History" };

export default function AssessmentHistoryPage() {
  // TODO (Milestone 2): requireUser() — protect this route
  // TODO (Milestone 4): Fetch assessment history from Supabase
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-3xl font-bold text-ivory mb-8">My Assessments</h1>
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Your assessment history will appear here after Milestone 4.
      </div>
    </div>
  );
}
