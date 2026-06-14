// Animated CSS-only wave divider — sky to ocean transition
// Two SVG layers at different speeds for natural depth illusion
export function WaveDivider({ className }: { className?: string }) {
  const wave1 =
    "M 0,40 C 90,10 270,10 360,40 C 450,70 630,70 720,40 C 810,10 990,10 1080,40 C 1170,70 1350,70 1440,40 L 1440,80 L 0,80 Z";
  const wave2 =
    "M 0,50 C 60,25 180,25 240,50 C 300,75 420,75 480,50 C 540,25 660,25 720,50 C 780,75 900,75 960,50 C 1020,25 1140,25 1200,50 C 1260,75 1380,75 1440,50 L 1440,80 L 0,80 Z";

  return (
    <div
      className={`relative overflow-hidden${className ? ` ${className}` : ""}`}
      style={{ height: "80px" }}
      aria-hidden="true"
    >
      {/* Layer 1 — slower, primary wave */}
      <div
        className="absolute top-0 left-0 h-full flex"
        style={{
          width: "200%",
          animationName: "wave-move",
          animationDuration: "12s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "50%", height: "100%" }}
        >
          <path d={wave1} fill="#1a6b7a" fillOpacity={0.65} />
        </svg>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "50%", height: "100%" }}
        >
          <path d={wave1} fill="#1a6b7a" fillOpacity={0.65} />
        </svg>
      </div>

      {/* Layer 2 — faster, opposite direction, depth accent */}
      <div
        className="absolute top-0 left-0 h-full flex"
        style={{
          width: "200%",
          animationName: "wave-move",
          animationDuration: "8s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: "reverse",
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "50%", height: "100%" }}
        >
          <path d={wave2} fill="#2e8b9e" fillOpacity={0.45} />
        </svg>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "50%", height: "100%" }}
        >
          <path d={wave2} fill="#2e8b9e" fillOpacity={0.45} />
        </svg>
      </div>
    </div>
  );
}
