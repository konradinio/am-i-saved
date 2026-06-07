import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conscience History" };

export default function ConscienceHistoryPage() {
  // TODO (Milestone 2): requireUser()
  // TODO (Milestone 12): Fetch conscience session history
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-3xl font-bold text-ivory mb-8">Examination History</h1>
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        History coming in Milestone 12.
      </div>
    </div>
  );
}
