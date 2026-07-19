import { getCoverSpec, type ChartSpec, type CoverAccent, type GaugeSpec } from "@/lib/covers";

/**
 * Generative article cover — inline SVG, two directions (see lib/covers.ts).
 * Pure presentational: works as a server component and inside client trees
 * (BlogFilterGrid). Fonts inherit from the page (Fraunces / Inter Tight /
 * JetBrains Mono via CSS variables). Fills its container: pass sizing via
 * className, the SVG covers it (preserveAspectRatio slice).
 */

const ACCENT: Record<CoverAccent, { main: string; dot: string }> = {
  pulse: { main: "#9FBF00", dot: "#9FBF00" },
  warm: { main: "#C4882F", dot: "#C4882F" },
  sage: { main: "#4A8B62", dot: "#8FB89F" },
  deep: { main: "#1E3D2A", dot: "#9FBF00" },
};

/* Curves live in a y 20–120 band so the big motif text (bottom-right, with a
   canvas halo) never collides with them — the collision + grey fill under
   fall/wave curves was the first iteration's main ugliness. */
const CURVES: Record<ChartSpec["curve"], string> = {
  rise: "M0,118 C70,114 110,96 160,88 S260,64 310,44 S380,20 400,16",
  fall: "M0,24 C60,32 120,64 180,76 S300,96 400,112",
  dotted: "M0,96 C80,92 140,76 200,70 S320,50 400,28",
  wave: "M0,78 C40,58 70,96 110,80 S180,48 220,68 S300,96 340,68 S380,48 400,56",
};

interface ArticleCoverProps {
  post: { slug: string; title?: string; tag: string };
  className?: string;
  /**
   * "wide" (default): 400×267 viewBox — render it in an aspect-[3/2] box for
   * a pixel-exact fit. "tall": 400×440 with a crop-tolerant safe area
   * (content within y 45–395) for portrait-ish panels (FeaturedCard desktop),
   * rendered with slice.
   */
  variant?: "wide" | "tall";
}

export default function ArticleCover({
  post,
  className = "",
  variant = "wide",
}: ArticleCoverProps) {
  const spec = getCoverSpec(post);
  if (variant === "tall") {
    return spec.kind === "gauge" ? (
      <GaugeCoverTall spec={spec} className={className} />
    ) : (
      <ChartCoverTall spec={spec} className={className} />
    );
  }
  return spec.kind === "gauge" ? (
    <GaugeCover spec={spec} className={className} />
  ) : (
    <ChartCover spec={spec} className={className} />
  );
}

function CategoryChip({
  cat,
  dot,
  dark,
  y = 27,
  x = 24,
}: {
  cat: string;
  dot: string;
  dark: boolean;
  y?: number;
  x?: number;
}) {
  return (
    <>
      <circle cx={x} cy={y} r="3" fill={dot} />
      <text
        x={x + 12}
        y={y + 4}
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.22em" }}
        fontSize="10.5"
        fontWeight="500"
        fill={dark ? "rgba(247,245,239,0.8)" : "#60655d"}
      >
        {cat.toUpperCase()}
      </text>
    </>
  );
}

/* ─── Direction A — « data editorial » (light) ─── */

function ChartCover({ spec, className }: { spec: ChartSpec; className: string }) {
  const acc = ACCENT[spec.accent];
  const stroke = spec.accent === "pulse" || spec.accent === "deep" ? "#1E3D2A" : acc.main;
  const bigSize = spec.big.length <= 3 ? 84 : spec.big.length <= 5 ? 64 : 46;
  const path = CURVES[spec.curve];
  return (
    <svg
      viewBox="0 0 400 267"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <rect width="400" height="267" fill="#F7F5EF" />
      {/* fine grid */}
      <g stroke="#E8E3D6" strokeWidth="1" opacity="0.75">
        {[44, 88, 132, 176, 220, 264, 308, 352, 396].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="267" />
        ))}
        {[44, 88, 132, 176, 220, 264].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
        ))}
      </g>
      <g transform="translate(0, 46)">
        {spec.curve === "dotted" ? (
          <path
            d={path}
            fill="none"
            stroke={stroke}
            strokeWidth="2.5"
            strokeDasharray="1 7"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path d={path} fill="none" stroke={stroke} strokeWidth="2.5" />
            <circle
              cx={spec.curve === "fall" ? 180 : 310}
              cy={spec.curve === "fall" ? 76 : spec.curve === "wave" ? 68 : 44}
              r="5"
              fill={acc.dot}
            />
          </>
        )}
      </g>
      <text
        x="374"
        y="238"
        textAnchor="end"
        style={{
          fontFamily: "var(--font-serif)",
          letterSpacing: "-0.03em",
          paintOrder: "stroke",
        }}
        fontSize={bigSize}
        fontWeight="300"
        fill="#0E1412"
        stroke="#F7F5EF"
        strokeWidth="12"
        strokeLinejoin="round"
      >
        {spec.big}
        {spec.suffix ? (
          <tspan
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            fontSize={Math.round(bigSize * 0.46)}
            fill="#1E3D2A"
            dx="4"
          >
            {spec.suffix}
          </tspan>
        ) : null}
      </text>
      <CategoryChip cat={spec.cat} dot={acc.dot} dark={false} />
    </svg>
  );
}

/* ─── Direction C — « rapport de labo » (gauge + range band) ─── */

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/** Arc from 180° (left) sweeping clockwise by `frac` of the half circle. */
function arcPath(cx: number, cy: number, r: number, frac: number): string {
  const start = polar(cx, cy, r, 180);
  const end = polar(cx, cy, r, 180 + 180 * Math.min(Math.max(frac, 0.02), 1));
  return `M${start[0].toFixed(1)},${start[1].toFixed(1)} A${r},${r} 0 0,1 ${end[0].toFixed(1)},${end[1].toFixed(1)}`;
}

function GaugeCover({ spec, className }: { spec: GaugeSpec; className: string }) {
  const acc = ACCENT[spec.accent];
  const span = spec.max - spec.min;
  const frac = (spec.value - spec.min) / span;
  const inOptimal = spec.value >= spec.optimal[0] && spec.value <= spec.optimal[1];
  const arcColor = inOptimal ? "#9FBF00" : "#C4882F";
  const o0 = ((spec.optimal[0] - spec.min) / span) * 100;
  const o1 = ((spec.optimal[1] - spec.min) / span) * 100;
  const markerPct = Math.min(Math.max(frac * 100, 1.5), 98.5);
  const display = spec.display ?? String(spec.value);
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  // range band: warm below optimal, pulse inside, warm above (grid if unused)
  const bandX = 26;
  const bandW = 348;
  return (
    <svg
      viewBox="0 0 400 267"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <rect width="400" height="267" fill="#1E3D2A" />
      <rect width="400" height="267" fill="url(#cover-shade)" />
      <defs>
        <radialGradient id="cover-shade" cx="0.85" cy="-0.1" r="1.4">
          <stop offset="0%" stopColor="#0E1412" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#0E1412" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* gauge */}
      <g transform="translate(200, 118)">
        <path d={arcPath(0, 0, 62, 1)} fill="none" stroke="rgba(247,245,239,0.16)" strokeWidth="7" strokeLinecap="round" />
        <path d={arcPath(0, 0, 62, frac)} fill="none" stroke={arcColor} strokeWidth="7" strokeLinecap="round" />
        <text
          x="0"
          y="-8"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
          fontSize={display.length <= 3 ? 40 : 32}
          fontWeight="300"
          fill="#F7F5EF"
        >
          {display}
        </text>
      </g>
      {/* canvas band */}
      <rect x="0" y="179" width="400" height="88" fill="#F7F5EF" />
      <g>
        <rect x={bandX} y="207" width={bandW} height="6" rx="3" fill="#C4882F" opacity="0.9" />
        <rect
          x={bandX + (o0 / 100) * bandW}
          y="207"
          width={((o1 - o0) / 100) * bandW}
          height="6"
          fill="#9FBF00"
        />
        <rect
          x={bandX + (markerPct / 100) * bandW - 1.25}
          y="202"
          width="2.5"
          height="16"
          rx="1.25"
          fill="#0E1412"
        />
      </g>
      <g
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        fontSize="10.5"
        fill="#60655d"
      >
        <text x={bandX} y="242">
          {fmt(spec.min)}
        </text>
        <text x="200" y="242" textAnchor="middle">
          {`${spec.label.toUpperCase()} · ${spec.unit.toUpperCase()}`}
        </text>
        <text x={bandX + bandW} y="242" textAnchor="end">
          {fmt(spec.max)}
        </text>
      </g>
      <CategoryChip cat={spec.cat} dot={acc.dot} dark />
    </svg>
  );
}

/* ─── Tall variants (400×440, crop-safe y ∈ [45, 395]) ─── */

function ChartCoverTall({ spec, className }: { spec: ChartSpec; className: string }) {
  const acc = ACCENT[spec.accent];
  const stroke = spec.accent === "pulse" || spec.accent === "deep" ? "#1E3D2A" : acc.main;
  const bigSize = spec.big.length <= 3 ? 96 : spec.big.length <= 5 ? 72 : 52;
  const path = CURVES[spec.curve];
  return (
    <svg
      viewBox="0 0 400 440"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <rect width="400" height="440" fill="#F7F5EF" />
      <g stroke="#E8E3D6" strokeWidth="1" opacity="0.75">
        {[44, 88, 132, 176, 220, 264, 308, 352, 396].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="440" />
        ))}
        {[44, 88, 132, 176, 220, 264, 308, 352, 396, 440].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
        ))}
      </g>
      <g transform="translate(0, 120)">
        {spec.curve === "dotted" ? (
          <path
            d={path}
            fill="none"
            stroke={stroke}
            strokeWidth="2.5"
            strokeDasharray="1 7"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path d={path} fill="none" stroke={stroke} strokeWidth="2.5" />
            <circle
              cx={spec.curve === "fall" ? 180 : 310}
              cy={spec.curve === "fall" ? 76 : spec.curve === "wave" ? 68 : 44}
              r="5"
              fill={acc.dot}
            />
          </>
        )}
      </g>
      <text
        x="358"
        y="372"
        textAnchor="end"
        style={{
          fontFamily: "var(--font-serif)",
          letterSpacing: "-0.03em",
          paintOrder: "stroke",
        }}
        fontSize={bigSize}
        fontWeight="300"
        fill="#0E1412"
        stroke="#F7F5EF"
        strokeWidth="14"
        strokeLinejoin="round"
      >
        {spec.big}
        {spec.suffix ? (
          <tspan
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            fontSize={Math.round(bigSize * 0.46)}
            fill="#1E3D2A"
            dx="4"
          >
            {spec.suffix}
          </tspan>
        ) : null}
      </text>
      <CategoryChip cat={spec.cat} dot={acc.dot} dark={false} y={60} x={34} />
    </svg>
  );
}

function GaugeCoverTall({ spec, className }: { spec: GaugeSpec; className: string }) {
  const acc = ACCENT[spec.accent];
  const span = spec.max - spec.min;
  const frac = (spec.value - spec.min) / span;
  const inOptimal = spec.value >= spec.optimal[0] && spec.value <= spec.optimal[1];
  const arcColor = inOptimal ? "#9FBF00" : "#C4882F";
  const o0 = ((spec.optimal[0] - spec.min) / span) * 100;
  const o1 = ((spec.optimal[1] - spec.min) / span) * 100;
  const markerPct = Math.min(Math.max(frac * 100, 1.5), 98.5);
  const display = spec.display ?? String(spec.value);
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  const bandX = 26;
  const bandW = 348;
  return (
    <svg
      viewBox="0 0 400 440"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <rect width="400" height="440" fill="#1E3D2A" />
      <rect width="400" height="440" fill="url(#cover-shade-tall)" />
      <defs>
        <radialGradient id="cover-shade-tall" cx="0.85" cy="-0.1" r="1.4">
          <stop offset="0%" stopColor="#0E1412" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#0E1412" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(200, 210)">
        <path d={arcPath(0, 0, 74, 1)} fill="none" stroke="rgba(247,245,239,0.16)" strokeWidth="8" strokeLinecap="round" />
        <path d={arcPath(0, 0, 74, frac)} fill="none" stroke={arcColor} strokeWidth="8" strokeLinecap="round" />
        <text
          x="0"
          y="-10"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
          fontSize={display.length <= 3 ? 46 : 36}
          fontWeight="300"
          fill="#F7F5EF"
        >
          {display}
        </text>
      </g>
      <rect x="0" y="300" width="400" height="140" fill="#F7F5EF" />
      <g>
        <rect x={bandX} y="330" width={bandW} height="6" rx="3" fill="#C4882F" opacity="0.9" />
        <rect
          x={bandX + (o0 / 100) * bandW}
          y="330"
          width={((o1 - o0) / 100) * bandW}
          height="6"
          fill="#9FBF00"
        />
        <rect
          x={bandX + (markerPct / 100) * bandW - 1.25}
          y="325"
          width="2.5"
          height="16"
          rx="1.25"
          fill="#0E1412"
        />
      </g>
      <g
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        fontSize="10.5"
        fill="#60655d"
      >
        <text x={bandX} y="365">
          {fmt(spec.min)}
        </text>
        <text x="200" y="365" textAnchor="middle">
          {`${spec.label.toUpperCase()} · ${spec.unit.toUpperCase()}`}
        </text>
        <text x={bandX + bandW} y="365" textAnchor="end">
          {fmt(spec.max)}
        </text>
      </g>
      <CategoryChip cat={spec.cat} dot={acc.dot} dark y={60} x={34} />
    </svg>
  );
}
