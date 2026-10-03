import {
  getCoverSpec,
  TONE_HEX,
  type ChartSpec,
  type CoverTone,
  type GaugeSpec,
} from "@/lib/covers";

/**
 * Generative article cover — inline SVG, two directions (see lib/covers.ts),
 * dressed in the site v3 art direction:
 *  - chart covers: a pop surface (lime / lilac / sky / peach by topic family)
 *    with the motif set big in Bricolage, ink on colour, and the trend curve
 *    ending on the brand's dot — the "From the Journal" covers of the mockup;
 *  - gauge covers: a night graphite panel, the value as a chrome Newsreader
 *    numeral inside an arc gauge, and the clinical range bar underneath.
 *
 * Pure presentational: works as a server component and inside client trees
 * (BlogFilterGrid). Fonts inherit from the page through the CSS variables.
 * Fills its container: pass sizing via className, the SVG covers it
 * (preserveAspectRatio slice).
 *
 * Content contract: every text node (category, motif + suffix, gauge value,
 * min / label · unit / max) is kept exactly as before — only the dress changes.
 */

const INK = "#10231A";
const LIME = "#D6F050";
const AMBER = "#D19A2C"; // borderline / outside the optimal band, lifted for night
const ON_NIGHT_2 = "rgba(244,246,247,0.68)";
const ON_NIGHT_3 = "rgba(244,246,247,0.5)";

/* Curves live in a y 20–120 band; covers place that band under the motif. */
const CURVES: Record<ChartSpec["curve"], string> = {
  rise: "M0,118 C70,114 110,96 160,88 S260,64 310,44 S380,20 400,16",
  fall: "M0,24 C60,32 120,64 180,76 S300,96 400,112",
  dotted: "M0,96 C80,92 140,76 200,70 S320,50 400,28",
  wave: "M0,78 C40,58 70,96 110,80 S180,48 220,68 S300,96 340,68 S380,48 400,56",
};

/** The point each curve "lands" on (curve space), where the brand dot sits. */
function curveDot(curve: ChartSpec["curve"]): [number, number] | null {
  if (curve === "dotted") return null;
  if (curve === "fall") return [180, 76];
  if (curve === "wave") return [310, 68];
  return [310, 44];
}

type Variant = "wide" | "tall";

interface ArticleCoverProps {
  post: { slug: string; title?: string; tag: string };
  className?: string;
  /**
   * "wide" (default): 400×267 viewBox — render it in an aspect-[3/2] box for
   * a pixel-exact fit. "tall": 400×440 with a crop-tolerant safe area
   * (content within y 45–395) for portrait-ish panels (FeaturedCard desktop),
   * rendered with slice.
   */
  variant?: Variant;
}

export default function ArticleCover({
  post,
  className = "",
  variant = "wide",
}: ArticleCoverProps) {
  const spec = getCoverSpec(post);
  const uid = coverUid(post.slug, variant);
  return spec.kind === "gauge" ? (
    <GaugeCover spec={spec} className={className} variant={variant} uid={uid} />
  ) : (
    <ChartCover spec={spec} className={className} variant={variant} uid={uid} />
  );
}

/** Stable, page-unique gradient ids (slug + variant), no hook needed. */
function coverUid(slug: string, variant: string): string {
  return `cv-${slug.replace(/[^a-z0-9-]/gi, "")}-${variant}`;
}

/* ─── Geometry per variant ─── */

const GEO = {
  wide: {
    w: 400,
    h: 267,
    chip: { x: 24, y: 30 },
    word: { y: 146, max: 74 },
    curve: { y: 142, s: 0.86 },
    gauge: { y: 126, r: 62, stroke: 7, num: [44, 36] as const },
    band: { y: 196, label: 228 },
  },
  tall: {
    w: 400,
    h: 440,
    chip: { x: 50, y: 70 }, // inside the crop-safe frame of portrait panels
    word: { y: 236, max: 92 },
    curve: { y: 250, s: 1 },
    gauge: { y: 214, r: 76, stroke: 8, num: [54, 44] as const },
    band: { y: 318, label: 352 },
  },
} as const;

/* ─── Category chip: dot + mono caps (same text as before) ─── */

function CategoryChip({
  cat,
  x,
  y,
  night,
}: {
  cat: string;
  x: number;
  y: number;
  night: boolean;
}) {
  return (
    <>
      {night ? (
        <circle cx={x} cy={y} r="7" fill={LIME} opacity="0.22" />
      ) : null}
      <circle cx={x} cy={y} r="3.5" fill={night ? LIME : INK} />
      <text
        x={x + 13}
        y={y + 3.8}
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}
        fontSize="10.5"
        fontWeight="500"
        fill={night ? ON_NIGHT_2 : "rgba(16,35,26,0.74)"}
      >
        {cat.toUpperCase()}
      </text>
    </>
  );
}

/* ─── Chart cover — pop surface, ink motif ─── */

const SYMBOL_SUFFIX = /^[?+%!]$/;

function motifSize(spec: ChartSpec, max: number, budget: number): number {
  const symbol = spec.suffix ? SYMBOL_SUFFIX.test(spec.suffix) : false;
  const units =
    spec.big.length +
    (spec.suffix ? (symbol ? spec.suffix.length : spec.suffix.length * 0.5 + 0.3) : 0);
  return Math.round(Math.min(max, Math.max(36, budget / (units * 0.55))));
}

function SurfaceDefs({ uid, tone }: { uid: string; tone: CoverTone }) {
  return (
    <defs>
      <radialGradient id={`${uid}-sheen`} cx="0.16" cy="0" r="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity={tone === "lime" ? 0.5 : 0.42} />
        <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${uid}-shade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.55" stopColor={INK} stopOpacity="0" />
        <stop offset="1" stopColor={INK} stopOpacity="0.07" />
      </linearGradient>
    </defs>
  );
}

function PopSurface({
  uid,
  tone,
  w,
  h,
}: {
  uid: string;
  tone: CoverTone;
  w: number;
  h: number;
}) {
  return (
    <>
      <SurfaceDefs uid={uid} tone={tone} />
      <rect width={w} height={h} fill={TONE_HEX[tone]} />
      <rect width={w} height={h} fill={`url(#${uid}-sheen)`} />
      <rect width={w} height={h} fill={`url(#${uid}-shade)`} />
    </>
  );
}

function TrendCurve({
  curve,
  tone,
  y,
  s,
}: {
  curve: ChartSpec["curve"];
  tone: CoverTone;
  y: number;
  s: number;
}) {
  const dot = curveDot(curve);
  return (
    <>
      <g transform={`translate(0, ${y}) scale(1, ${s})`}>
        <path
          d={CURVES[curve]}
          fill="none"
          stroke={INK}
          strokeOpacity={curve === "dotted" ? 0.42 : 0.3}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray={curve === "dotted" ? "1 7" : undefined}
          vectorEffect="non-scaling-stroke"
        />
      </g>
      {dot ? (
        <circle
          cx={dot[0]}
          cy={y + dot[1] * s}
          r="5.5"
          fill={tone === "lime" ? INK : LIME}
          stroke={INK}
          strokeOpacity={tone === "lime" ? 0 : 0.7}
          strokeWidth="1.5"
        />
      ) : null}
    </>
  );
}

function ChartCover({
  spec,
  className,
  variant,
  uid,
}: {
  spec: ChartSpec;
  className: string;
  variant: Variant;
  uid: string;
}) {
  const g = GEO[variant];
  const size = motifSize(spec, g.word.max, variant === "tall" ? 330 : 318);
  const symbol = spec.suffix ? SYMBOL_SUFFIX.test(spec.suffix) : false;
  return (
    <svg
      viewBox={`0 0 ${g.w} ${g.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <PopSurface uid={uid} tone={spec.tone} w={g.w} h={g.h} />
      <TrendCurve curve={spec.curve} tone={spec.tone} y={g.curve.y} s={g.curve.s} />
      <text
        x={g.w / 2}
        y={g.word.y}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.05em",
          fontVariationSettings: '"opsz" 96',
        }}
        fontSize={size}
        fontWeight="800"
        fill={INK}
      >
        {spec.big}
        {spec.suffix ? (
          symbol ? (
            <tspan>{spec.suffix}</tspan>
          ) : (
            <tspan
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
              fontWeight="500"
              fontSize={Math.round(size * 0.46)}
              dx="5"
            >
              {spec.suffix}
            </tspan>
          )
        ) : null}
      </text>
      <CategoryChip cat={spec.cat} x={g.chip.x} y={g.chip.y} night={false} />
    </svg>
  );
}

/* ─── Gauge cover — night graphite, chrome numeral ─── */

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/** Arc from 180° (left) sweeping clockwise by `frac` of the half circle. */
function arcPath(cx: number, cy: number, r: number, frac: number): string {
  const start = polar(cx, cy, r, 180);
  const end = polar(cx, cy, r, 180 + 180 * clampFrac(frac));
  return `M${start[0].toFixed(1)},${start[1].toFixed(1)} A${r},${r} 0 0,1 ${end[0].toFixed(1)},${end[1].toFixed(1)}`;
}

function clampFrac(frac: number): number {
  return Math.min(Math.max(frac, 0.02), 1);
}

function NightDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <radialGradient id={`${uid}-night`} cx="0.72" cy="0.18" r="1.05">
        <stop offset="0" stopColor="#1A2227" />
        <stop offset="0.48" stopColor="#0D1114" />
        <stop offset="1" stopColor="#07090B" />
      </radialGradient>
      <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.32" stopColor="#EEF1F4" />
        <stop offset="0.52" stopColor="#A8AFB9" />
        <stop offset="0.68" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#CDD2D9" />
      </linearGradient>
    </defs>
  );
}

function NightSurface({ uid, w, h }: { uid: string; w: number; h: number }) {
  return (
    <>
      <NightDefs uid={uid} />
      <rect width={w} height={h} fill={`url(#${uid}-night)`} />
      {/* steel rim light along the top edge */}
      <rect width={w} height="1" fill="#FFFFFF" opacity="0.08" />
    </>
  );
}

function GaugeArc({
  spec,
  cy,
  r,
  stroke,
}: {
  spec: GaugeSpec;
  cy: number;
  r: number;
  stroke: number;
}) {
  const frac = (spec.value - spec.min) / (spec.max - spec.min);
  const inOptimal = spec.value >= spec.optimal[0] && spec.value <= spec.optimal[1];
  const color = inOptimal ? LIME : AMBER;
  const [ex, ey] = polar(200, cy, r, 180 + 180 * clampFrac(frac));
  return (
    <>
      <path
        d={arcPath(200, cy, r, 1)}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.13"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <path
        d={arcPath(200, cy, r, frac)}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <circle cx={ex} cy={ey} r={stroke * 1.55} fill={color} opacity="0.22" />
      <circle cx={ex} cy={ey} r={stroke * 0.62} fill="#FFFFFF" />
    </>
  );
}

function GaugeCover({
  spec,
  className,
  variant,
  uid,
}: {
  spec: GaugeSpec;
  className: string;
  variant: Variant;
  uid: string;
}) {
  const g = GEO[variant];
  const span = spec.max - spec.min;
  const frac = (spec.value - spec.min) / span;
  const o0 = ((spec.optimal[0] - spec.min) / span) * 100;
  const o1 = ((spec.optimal[1] - spec.min) / span) * 100;
  const markerPct = Math.min(Math.max(frac * 100, 1.5), 98.5);
  const display = spec.display ?? String(spec.value);
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  const bandX = 26;
  const bandW = 348;
  const numSize = display.length <= 3 ? g.gauge.num[0] : g.gauge.num[1];
  return (
    <svg
      viewBox={`0 0 ${g.w} ${g.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <NightSurface uid={uid} w={g.w} h={g.h} />
      <GaugeArc spec={spec} cy={g.gauge.y} r={g.gauge.r} stroke={g.gauge.stroke} />
      <text
        x="200"
        y={g.gauge.y - 8}
        textAnchor="middle"
        style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
        fontSize={numSize}
        fontWeight="500"
        fill={`url(#${uid}-chrome)`}
      >
        {display}
      </text>

      {/* clinical range: amber outside the optimal band, lime inside */}
      <g>
        <rect x={bandX} y={g.band.y} width={bandW} height="5" rx="2.5" fill={AMBER} opacity="0.5" />
        <rect
          x={bandX + (o0 / 100) * bandW}
          y={g.band.y}
          width={((o1 - o0) / 100) * bandW}
          height="5"
          rx="2.5"
          fill={LIME}
        />
        <rect
          x={bandX + (markerPct / 100) * bandW - 1.5}
          y={g.band.y - 6}
          width="3"
          height="17"
          rx="1.5"
          fill="#FFFFFF"
        />
      </g>
      <g
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}
        fontSize="10.5"
        fontWeight="500"
        fill={ON_NIGHT_3}
      >
        <text x={bandX} y={g.band.label}>
          {fmt(spec.min)}
        </text>
        <text x="200" y={g.band.label} textAnchor="middle" fill={ON_NIGHT_2}>
          {`${spec.label.toUpperCase()} · ${spec.unit.toUpperCase()}`}
        </text>
        <text x={bandX + bandW} y={g.band.label} textAnchor="end">
          {fmt(spec.max)}
        </text>
      </g>
      <CategoryChip cat={spec.cat} x={g.chip.x} y={g.chip.y} night />
    </svg>
  );
}

/**
 * Text-free companion of the cover — the same surface, curve and dot (or the
 * night gauge arc) without any words, for panels that must not add text to a
 * page (related articles carry their emoji on top of it). Decorative only.
 */
export function CoverBackdrop({
  post,
  className = "",
}: {
  post: { slug: string; tag: string };
  className?: string;
}) {
  const spec = getCoverSpec(post);
  const uid = coverUid(post.slug, "backdrop");
  const g = GEO.wide;
  return (
    <svg
      viewBox={`0 0 ${g.w} ${g.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      {spec.kind === "gauge" ? (
        <>
          <NightSurface uid={uid} w={g.w} h={g.h} />
          <GaugeArc spec={spec} cy={170} r={84} stroke={8} />
        </>
      ) : (
        <>
          <PopSurface uid={uid} tone={spec.tone} w={g.w} h={g.h} />
          <TrendCurve curve={spec.curve} tone={spec.tone} y={150} s={0.8} />
        </>
      )}
    </svg>
  );
}
