import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold text-ivory mb-6">About Am I Saved?</h1>
      <p className="text-ivory/70 text-lg leading-relaxed mb-4">
        Am I Saved? is a Christian spiritual reflection and self-assessment platform.
      </p>
      <p className="text-ivory/60 leading-relaxed">
        {/* TODO (Milestone 1 content): Fill in full about copy */}
        This page will describe the mission, values, and team behind Am I Saved?
      </p>
    </div>
  );
}
