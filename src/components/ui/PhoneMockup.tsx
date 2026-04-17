interface PhoneMockupProps {
  className?: string;
}

export default function PhoneMockup({ className = "" }: PhoneMockupProps) {
  return (
    <svg
      viewBox="0 0 360 740"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Merios health score app preview"
    >
      <defs>
        <linearGradient id="phone-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E1412" stopOpacity="0" />
          <stop offset="100%" stopColor="#0E1412" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="score-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9FBF00" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#9FBF00" stopOpacity="0" />
        </linearGradient>
        <clipPath id="phone-screen">
          <rect x="10" y="10" width="340" height="720" rx="44" />
        </clipPath>
      </defs>

      {/* Soft drop shadow */}
      <ellipse cx="180" cy="735" rx="140" ry="8" fill="url(#phone-shadow)" />

      {/* Phone body */}
      <rect
        x="0"
        y="0"
        width="360"
        height="740"
        rx="52"
        fill="#0E1412"
      />
      {/* Inner bezel highlight */}
      <rect
        x="4"
        y="4"
        width="352"
        height="732"
        rx="48"
        fill="none"
        stroke="#2A2F2D"
        strokeWidth="1"
      />

      {/* Screen */}
      <g clipPath="url(#phone-screen)">
        <rect x="10" y="10" width="340" height="720" fill="#F7F5EF" />

        {/* Subtle top glow */}
        <rect x="10" y="10" width="340" height="200" fill="url(#score-glow)" />

        {/* Dynamic Island */}
        <rect x="132" y="28" width="96" height="30" rx="15" fill="#0E1412" />

        {/* Status bar */}
        <text
          x="34"
          y="46"
          fontSize="13"
          fontFamily="var(--font-inter-tight), -apple-system, sans-serif"
          fontWeight="600"
          fill="#0E1412"
        >
          9:41
        </text>
        {/* Cellular + battery dots (simplified) */}
        <g transform="translate(280, 36)">
          <rect x="0" y="4" width="3" height="6" rx="0.5" fill="#0E1412" />
          <rect x="5" y="2" width="3" height="8" rx="0.5" fill="#0E1412" />
          <rect x="10" y="0" width="3" height="10" rx="0.5" fill="#0E1412" />
          <rect x="18" y="1" width="18" height="10" rx="2" fill="none" stroke="#0E1412" strokeWidth="1" />
          <rect x="20" y="3" width="13" height="6" rx="1" fill="#0E1412" />
          <rect x="38" y="4" width="1.5" height="4" rx="0.5" fill="#0E1412" />
        </g>

        {/* Eyebrow */}
        <text
          x="180"
          y="112"
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
          letterSpacing="2"
          fill="#8B8F89"
        >
          YOUR HEALTH SCORE
        </text>

        {/* Huge score numeral */}
        <text
          x="180"
          y="250"
          textAnchor="middle"
          fontSize="148"
          fontFamily="var(--font-fraunces), Georgia, serif"
          fontWeight="300"
          fill="#0E1412"
          letterSpacing="-6"
        >
          76
        </text>

        {/* Delta badge */}
        <g transform="translate(180, 282)">
          <rect x="-32" y="-12" width="64" height="22" rx="11" fill="#1E3D2A" />
          <polygon points="-18,-2 -14,-8 -10,-2" fill="#9FBF00" />
          <text
            x="4"
            y="3"
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
            fontWeight="500"
            fill="#F7F5EF"
            letterSpacing="0.5"
          >
            +4.2
          </text>
        </g>

        {/* Divider */}
        <line x1="34" y1="330" x2="326" y2="330" stroke="#E8E3D6" strokeWidth="1" />

        {/* Sparkline label */}
        <text
          x="34"
          y="356"
          fontSize="10"
          fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
          fill="#8B8F89"
          letterSpacing="1.5"
        >
          12-MONTH TREND
        </text>

        {/* Sparkline */}
        <path
          d="M34 430 Q70 418, 100 412 T160 392 T220 378 T280 355 T326 340"
          fill="none"
          stroke="#1E3D2A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="326" cy="340" r="4" fill="#9FBF00" />
        <circle cx="326" cy="340" r="9" fill="#9FBF00" opacity="0.18" />

        {/* Pillars grid */}
        {[
          { i: "01", label: "METABOLIC", value: 82, bar: 82 },
          { i: "02", label: "CARDIOVASCULAR", value: 71, bar: 71 },
          { i: "03", label: "HORMONAL", value: 79, bar: 79 },
          { i: "04", label: "INFLAMMATION", value: 68, bar: 68 },
        ].map((p, idx) => {
          const y = 480 + idx * 52;
          return (
            <g key={p.i} transform={`translate(34, ${y})`}>
              <rect width="292" height="44" rx="8" fill="#FFFFFF" stroke="#E8E3D6" strokeWidth="1" />
              <text
                x="16"
                y="18"
                fontSize="9"
                fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
                fill="#8B8F89"
                letterSpacing="1.5"
              >
                {p.i}
              </text>
              <text
                x="36"
                y="18"
                fontSize="9"
                fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
                fill="#0E1412"
                letterSpacing="1.5"
                fontWeight="600"
              >
                {p.label}
              </text>
              <text
                x="16"
                y="34"
                fontSize="16"
                fontFamily="var(--font-fraunces), Georgia, serif"
                fontWeight="400"
                fill="#0E1412"
              >
                {p.value}
              </text>
              {/* Progress bar */}
              <rect x="160" y="28" width="116" height="4" rx="2" fill="#E8E3D6" />
              <rect x="160" y="28" width={(p.bar / 100) * 116} height="4" rx="2" fill="#1E3D2A" />
            </g>
          );
        })}

        {/* Bottom CTA button */}
        <g transform="translate(34, 692)">
          <rect width="292" height="0" rx="24" fill="#1E3D2A" opacity="0" />
        </g>
      </g>
    </svg>
  );
}
