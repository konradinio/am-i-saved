import type { Metadata } from "next";

export const metadata: Metadata = { title: "Start Examination" };

export default function ConscienceStartPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <h1 className="text-3xl font-bold text-ivory mb-8">Examination of Conscience</h1>
      {/* TODO (Milestone 12): Render conscience questions by path type */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Examination of Conscience coming in Milestone 12.
      </div>
    </div>
  );
}
