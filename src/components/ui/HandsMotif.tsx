// Abstract SVG illustration: two hands reaching toward each other across the waterline.
// Inspired by Matthew 14:28-31 — Peter and Jesus at the surface of the water.
// Upper hand = gold (sky/earth), Lower hand = teal (ocean/depth).
// The gap between fingertips is the tension of reaching, almost touching.
export function HandsMotif({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center${className ? ` ${className}` : ""}`}
      style={{
        animationName: "float-gentle",
        animationDuration: "4s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 220 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "180px", height: "270px" }}
      >
        <defs>
          <linearGradient id="hm-arm-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8a535" />
            <stop offset="100%" stopColor="#c9973a" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="hm-finger-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4b86a" />
            <stop offset="100%" stopColor="#c9973a" />
          </linearGradient>
          <linearGradient id="hm-arm-teal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4db8c8" />
            <stop offset="100%" stopColor="#0d4a58" />
          </linearGradient>
          <linearGradient id="hm-finger-teal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e8b9e" />
            <stop offset="100%" stopColor="#1a6b7a" />
          </linearGradient>
          <linearGradient id="hm-ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8d8e4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a8d8e4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Light rays emanating downward from the handclasp center */}
        <polygon points="110,155 55,300 85,300" fill="url(#hm-ray)" />
        <polygon points="110,155 88,300 118,300" fill="url(#hm-ray)" />
        <polygon points="110,155 130,300 160,300" fill="url(#hm-ray)" />

        {/* ── UPPER HAND — gold, reaching down ── */}
        {/* Arm */}
        <rect x="88" y="0" width="44" height="90" rx="22" fill="url(#hm-arm-gold)" />
        {/* Palm */}
        <ellipse cx="110" cy="97" rx="33" ry="20" fill="url(#hm-arm-gold)" />
        {/* Fingers pointing downward */}
        <rect x="75" y="93" width="16" height="48" rx="8" fill="url(#hm-finger-gold)" />
        <rect x="95" y="96" width="16" height="54" rx="8" fill="url(#hm-finger-gold)" />
        <rect x="115" y="96" width="16" height="52" rx="8" fill="url(#hm-finger-gold)" />
        <rect x="135" y="94" width="14" height="38" rx="7" fill="url(#hm-finger-gold)" />

        {/* Water surface ripples */}
        <ellipse cx="110" cy="154" rx="36" ry="5.5" fill="none" stroke="#a8d8e4" strokeWidth="1.5" opacity="0.45" />
        <ellipse cx="110" cy="158" rx="50" ry="7" fill="none" stroke="#a8d8e4" strokeWidth="1" opacity="0.25" />

        {/* Water drops */}
        <ellipse cx="64" cy="152" rx="3" ry="5.5" fill="#a8d8e4" opacity="0.65" transform="rotate(-25 64 152)" />
        <ellipse cx="158" cy="147" rx="2.5" ry="4.5" fill="#a8d8e4" opacity="0.55" transform="rotate(20 158 147)" />
        <ellipse cx="54" cy="166" rx="2" ry="3" fill="#dff0f5" opacity="0.45" transform="rotate(-10 54 166)" />
        <ellipse cx="169" cy="163" rx="2.5" ry="3.5" fill="#dff0f5" opacity="0.45" transform="rotate(30 169 163)" />

        {/* ── LOWER HAND — teal, reaching up ── */}
        {/* Arm */}
        <rect x="88" y="212" width="44" height="88" rx="22" fill="url(#hm-arm-teal)" />
        {/* Palm */}
        <ellipse cx="110" cy="215" rx="33" ry="20" fill="url(#hm-arm-teal)" />
        {/* Fingers pointing upward (tips face up) */}
        <rect x="75" y="169" width="16" height="48" rx="8" fill="url(#hm-finger-teal)" />
        <rect x="95" y="160" width="16" height="55" rx="8" fill="url(#hm-finger-teal)" />
        <rect x="115" y="162" width="16" height="53" rx="8" fill="url(#hm-finger-teal)" />
        <rect x="135" y="170" width="14" height="38" rx="7" fill="url(#hm-finger-teal)" />
      </svg>
    </div>
  );
}
