import type { PictogramVariant } from "@/components/howitworks/SvgPictogram";
import styles from "./hiw.module.css";

/**
 * Decorative artwork for /how-it-works (site v3). Server components, zero JS,
 * every piece aria-hidden and text-free — the page copy stays the only content.
 */

// The masthead horizon: the logo's heartbeat (same geometry as PageHero's)
// with the three steps as calm stations along the line, ending on the lime dot.
const STATIONS = [26.4, 43.06, 59.72]; // % of the 1440-wide viewBox: x = 380, 620, 860

export function HeroHorizon() {
  return (
    <div className={`v3-hero__pulse ${styles.horizon}`} aria-hidden>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="hiw-horizon-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
          fill="none"
          stroke="url(#hiw-horizon-fade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {STATIONS.map((x, i) => (
        <span
          key={x}
          className={styles.station}
          data-step={i + 1}
          style={{ left: `${x}%` }}
        />
      ))}
      <span className={styles.horizonDot} />
    </div>
  );
}

// ─── Connect cards: one mini visual per import path ───────────────────────

/** Deterministic 0–1 noise so the server render is stable. */
function noise(i: number): number {
  const v = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
  return v - Math.floor(v);
}

function YearDots() {
  // 52 weeks × 7 days — a year of Apple Health already on the phone.
  const cols = 52;
  const rows = 7;
  const dots: { x: number; y: number; o: number; i: number }[] = [];
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const i = c * rows + r;
      // a slow seasonal swell + daily noise
      const season = 0.5 + 0.5 * Math.sin((c / cols) * Math.PI * 2 - 1.2);
      const o = 0.12 + 0.55 * (0.55 * season + 0.45 * noise(i));
      dots.push({ x: 8 + c * 5.6, y: 9 + r * 7.4, o, i });
    }
  }
  const last = dots[dots.length - 1];
  return (
    <svg viewBox="0 0 300 62" preserveAspectRatio="xMidYMid meet" focusable="false">
      {dots.slice(0, -1).map((d) => (
        <circle
          key={d.i}
          cx={d.x.toFixed(1)}
          cy={d.y.toFixed(1)}
          r="1.8"
          fill="#10231A"
          fillOpacity={d.o.toFixed(2)}
        />
      ))}
      <circle
        cx={last.x.toFixed(1)}
        cy={last.y.toFixed(1)}
        r="3.4"
        fill="#D6F050"
        stroke="#10231A"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function ReportLines() {
  // A lab report being read: rows of values, one line lit by the highlighter.
  const rows = [13, 25, 37, 49];
  return (
    <svg viewBox="0 0 300 62" preserveAspectRatio="xMidYMid meet" focusable="false">
      <rect
        x="10"
        y="18.5"
        width="280"
        height="13"
        rx="5"
        fill="#D6F050"
        transform="rotate(-0.8 150 25)"
      />
      {rows.map((y, i) => {
        const lit = i === 1;
        return (
          <g key={y}>
            <rect x="18" y={y - 2} width={70 + ((i * 23) % 38)} height="4" rx="2" fill="#10231A" fillOpacity={lit ? 0.75 : 0.2} />
            <rect x="176" y={y - 2} width={22 + ((i * 7) % 12)} height="4" rx="2" fill="#10231A" fillOpacity={lit ? 0.9 : 0.34} />
            <rect x="232" y={y - 2} width="48" height="4" rx="2" fill="#10231A" fillOpacity={lit ? 0.5 : 0.16} />
          </g>
        );
      })}
    </svg>
  );
}

function TimelineJoin() {
  // Imported points on one timeline — the hand-entered one joins the same line.
  const points = [24, 48, 63, 97, 121, 139, 168, 196, 219];
  return (
    <svg viewBox="0 0 300 62" preserveAspectRatio="xMidYMid meet" focusable="false">
      <path d="M12 34 H288" stroke="#10231A" strokeOpacity="0.22" strokeWidth="1.5" strokeLinecap="round" />
      {points.map((x, i) => (
        <circle key={x} cx={x} cy="34" r="3" fill="#10231A" fillOpacity={0.28 + (i % 3) * 0.12} />
      ))}
      <path d="M254 34 V16" stroke="#10231A" strokeOpacity="0.45" strokeWidth="1.3" strokeDasharray="2 3" strokeLinecap="round" />
      <circle cx="254" cy="34" r="6" fill="#D6F050" stroke="#10231A" strokeWidth="1.5" />
    </svg>
  );
}

export function ConnectViz({ variant }: { variant: PictogramVariant }) {
  const art =
    variant === "apple-health" ? (
      <YearDots />
    ) : variant === "ocr" ? (
      <ReportLines />
    ) : (
      <TimelineJoin />
    );
  return (
    <div className={styles.viz} aria-hidden>
      <span className={styles.vizFrame}>{art}</span>
    </div>
  );
}

// ─── Closing band: the heartbeat bent into a loop ─────────────────────────
// "The same loop, every quarter": one beat at the top of the ring, quarter
// ticks around it, and a comet that keeps going round (CSS only).

const LOOP_CX = 260;
const LOOP_CY = 260;
const LOOP_R = 188;
// The logo's QRS profile (Logo.tsx PULSE), as [position along the beat 0–1,
// radial offset in px, outward positive].
const BEAT: Array<[number, number]> = [
  [0, 0],
  [0.179, -18],
  [0.418, 50],
  [0.746, -52],
  [1, 0],
];
const BEAT_SPAN = (30 * Math.PI) / 180;

function polar(a: number, r: number): string {
  return `${(LOOP_CX + r * Math.cos(a)).toFixed(2)} ${(LOOP_CY + r * Math.sin(a)).toFixed(2)}`;
}

function loopPath(): { d: string; end: string } {
  const a0 = -Math.PI / 2 - BEAT_SPAN / 2;
  const a1 = a0 + BEAT_SPAN;
  const beat = BEAT.map(([t, off]) => polar(a0 + t * BEAT_SPAN, LOOP_R + off));
  // beat across the top, then the long way round back to where it started
  const d = `M${beat[0]} ${beat
    .slice(1)
    .map((p) => `L${p}`)
    .join(" ")} A${LOOP_R} ${LOOP_R} 0 1 1 ${polar(a0, LOOP_R)}`;
  return { d, end: polar(a1, LOOP_R) };
}

export function LoopEmblem() {
  const { d, end } = loopPath();
  const [ex, ey] = end.split(" ");
  const ticks = [45, 135, 225, 315].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { a, key: deg };
  });
  return (
    <div className={styles.loop} aria-hidden>
      <svg viewBox="0 0 520 520" focusable="false">
        <defs>
          <linearGradient id="hiw-loop-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="hiw-loop-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#D6F050" stopOpacity="0.16" />
            <stop offset="1" stopColor="#D6F050" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={LOOP_CX} cy={LOOP_CY} r="150" fill="url(#hiw-loop-core)" />
        <circle cx={LOOP_CX} cy={LOOP_CY} r={LOOP_R + 34} fill="none" stroke="#FFFFFF" strokeOpacity="0.07" strokeDasharray="2 7" />
        <circle cx={LOOP_CX} cy={LOOP_CY} r={LOOP_R - 34} fill="none" stroke="#FFFFFF" strokeOpacity="0.06" />
        {ticks.map(({ a, key }) => (
          <path
            key={key}
            d={`M${polar(a, LOOP_R + 14)} L${polar(a, LOOP_R + 26)}`}
            stroke="#FFFFFF"
            strokeOpacity="0.5"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        ))}
        <path
          d={d}
          fill="none"
          stroke="url(#hiw-loop-stroke)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={d} className={styles.loopComet} pathLength={1000} />
        <circle cx={ex} cy={ey} r="9" className={styles.loopDot} />
      </svg>
    </div>
  );
}
