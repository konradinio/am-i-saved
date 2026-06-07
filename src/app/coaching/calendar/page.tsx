import type { Metadata } from "next";

export const metadata: Metadata = { title: "Coaching Calendar" };

export default function CoachingCalendarPage() {
  // TODO (Milestone 2): requireUser()
  // TODO (Milestone 13): Display upcoming and past coaching sessions
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-3xl font-bold text-ivory mb-8">My Coaching Sessions</h1>
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Coaching calendar coming in Milestone 13.
      </div>
    </div>
  );
}
