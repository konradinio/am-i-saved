import type { Metadata } from "next";

export const metadata: Metadata = { title: "Start Reflection" };

const denominations = [
  { id: "catholic", label: "Catholic" },
  { id: "protestant", label: "Protestant" },
  { id: "orthodox", label: "Eastern Orthodox" },
  { id: "nondenominational", label: "Non-Denominational" },
  { id: "other-christian", label: "Other Christian" },
  { id: "unsure", label: "I'm Not Sure" },
];

export default function AssessmentStartPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #0f1f3c 0%, #0d2a3a 50%, #071523 100%)",
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(168,216,228,0.65)" }}
          >
            Step 1 of 2
          </p>

          <h1
            className="text-4xl md:text-5xl text-ivory mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Begin Your Reflection
          </h1>

          <p className="text-ivory/55 mb-2 leading-relaxed">
            This assessment covers your faith, prayer life, charity, forgiveness, and relationship
            with God.
          </p>
          <p className="text-ivory/30 text-sm mb-12">
            Am I Saved? does not determine salvation. Only God knows the human heart.
          </p>

          {/* Denomination selection */}
          <div
            className="rounded-2xl p-6 md:p-8 border mb-8"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          >
            <h2 className="text-ivory/70 text-sm font-semibold uppercase tracking-widest mb-6">
              Select Your Tradition
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {denominations.map((d) => (
                <div
                  key={d.id}
                  className="rounded-xl p-4 border cursor-pointer text-center transition-colors hover:border-white/20 hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <p className="text-sm font-medium text-ivory/80">{d.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder notice */}
          <div
            className="rounded-xl p-4 text-sm text-center border"
            style={{
              borderColor: "rgba(26,107,122,0.3)",
              backgroundColor: "rgba(26,107,122,0.08)",
              color: "rgba(168,216,228,0.6)",
            }}
          >
            Questionnaire engine coming in Milestone 4.
          </div>
        </div>
      </div>
    </div>
  );
}
