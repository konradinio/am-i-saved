import type { Metadata } from "next";

export const metadata: Metadata = { title: "Book a Coaching Session" };

export default function CoachingBookPage() {
  // TODO (Milestone 2): requireUser()
  // TODO (Milestone 13): Coach selection, calendar integration (Calendly abstraction layer)
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <h1 className="text-3xl font-bold text-ivory mb-8">Book a Coaching Session</h1>
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Coaching booking coming in Milestone 13.
      </div>
    </div>
  );
}
