/* "Then your blood joins in" (Home2 "04"): weekly resting heart rate drawn as
   a landscape, three ferritin reports as glass orbs on the same timeline.
   A pattern, never a cause. Example data. Two drawings of the same chart, one
   for wide screens and one with larger type for phones. */

const RHR = [62.6, 63.1, 62.8, 63.4, 62.9, 62.4, 62.7, 61.9, 61.2, 60.6, 60.1, 59.4, 59.0, 58.6, 58.1, 57.9, 57.4, 57.6, 57.1, 56.8, 57.0, 56.6, 56.4, 56.7, 56.3, 56.5];
const FER: [number, number][] = [
  [1, 21],
  [12, 32],
  [24, 44],
];
const LABEL =
  "Example chart: weekly resting heart rate falls from about 63 to 56 beats per minute over 26 weeks, while ferritin rises across three reports from 21 to 32 to 44 nanograms per millilitre.";

type Geo = {
  id: string;
  W: number;
  H: number;
  x0: number;
  x1: number;
  base: number;
  rTop: number;
  rScale: number;
  fScale: number;
  orb: number;
  num: number;
  small: number;
  grid: number[];
};

const WIDE: Geo = { id: "w", W: 1200, H: 340, x0: 40, x1: 1160, base: 300, rTop: 80, rScale: 22, fScale: 5, orb: 17, num: 26, small: 16, grid: [96, 183, 270] };
const NARROW: Geo = { id: "n", W: 640, H: 420, x0: 24, x1: 616, base: 360, rTop: 100, rScale: 30, fScale: 6.6, orb: 15, num: 30, small: 22, grid: [112, 236, 330] };

const f1 = (n: number) => n.toFixed(1);

function Chart({ g }: { g: Geo }) {
  const x = (w: number) => g.x0 + (w / (RHR.length - 1)) * (g.x1 - g.x0);
  const yR = (v: number) => g.rTop + (64 - v) * g.rScale;
  const yF = (v: number) => g.base - g.fScale * v;
  const pts = RHR.map((v, i) => `${f1(x(i))},${f1(yR(v))}`);
  const land = `M${g.x0},${g.base} L${pts.join(" L")} L${g.x1},${g.base} Z`;
  const ids = { land: `hv2-lk-land-${g.id}`, glass: `hv2-lk-glass-${g.id}`, sun: `hv2-lk-sun-${g.id}` };
  const [first, mid, last] = FER.map(([w, v]) => ({ cx: x(w), cy: yF(v), v }));
  const serif = "var(--font-serif)";
  const sans = "var(--font-sans)";

  return (
    <svg
      className={`hv2-chart hv2-chart--${g.id === "w" ? "wide" : "narrow"}`}
      viewBox={`0 0 ${g.W} ${g.H}`}
      role="img"
      aria-label={LABEL}
    >
      <defs>
        <linearGradient id={ids.land} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9C0F6" stopOpacity="0.85" />
          <stop offset="1" stopColor="#EEF0FB" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={ids.glass} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#E4DFFB" />
          <stop offset="1" stopColor="#B9C8F5" />
        </radialGradient>
        <radialGradient id={ids.sun} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#FFF4EA" />
          <stop offset="0.5" stopColor="#FFC49E" />
          <stop offset="1" stopColor="#FFA472" />
        </radialGradient>
      </defs>
      {g.grid.map((y) => (
        <line key={y} x1={g.x0} y1={y} x2={g.x1} y2={y} stroke="#18213F" strokeOpacity="0.07" />
      ))}
      <path d={land} fill={`url(#${ids.land})`} />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#6E8FE8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 5px rgb(110 143 232 / 0.5))" }}
      />

      {/* ferritin: the low first report is the sun, the next two are glass */}
      <circle cx={f1(first.cx)} cy={f1(first.cy)} r={g.orb} fill={`url(#${ids.sun})`} stroke="#FFFFFF" strokeWidth="3" style={{ filter: "drop-shadow(0 0 10px rgb(255 164 114 / 0.75))" }} />
      <circle cx={f1(mid.cx)} cy={f1(mid.cy)} r={g.orb} fill={`url(#${ids.glass})`} stroke="#FFFFFF" strokeWidth="3" style={{ filter: "drop-shadow(0 6px 10px rgb(36 48 110 / 0.25))" }} />
      <circle cx={f1(last.cx)} cy={f1(last.cy)} r={g.orb} fill={`url(#${ids.glass})`} stroke="#FFFFFF" strokeWidth="3" style={{ filter: "drop-shadow(0 6px 10px rgb(36 48 110 / 0.25))" }} />
      <text x={f1(first.cx + g.orb + 9)} y={f1(first.cy + g.num * 0.32)} fontFamily={serif} fontSize={g.num} fill="#18213F">
        21
        <tspan dx="6" fontFamily={sans} fontSize={g.small} fontWeight="700" fill="#A65A2C">
          L
        </tspan>
      </text>
      <text x={f1(mid.cx)} y={f1(mid.cy - g.orb - 12)} textAnchor="middle" fontFamily={serif} fontSize={g.num} fill="#18213F">
        32
      </text>
      <text x={f1(last.cx - g.orb - 10)} y={f1(last.cy + g.num * 0.32)} textAnchor="end" fontFamily={serif} fontSize={g.num} fill="#18213F">
        44{" "}
        <tspan fontFamily={sans} fontSize={g.small} fontWeight="600" fill="#434B69">
          ng/mL
        </tspan>
      </text>

      {/* resting heart rate, first and last week */}
      <text x={g.x0 + 4} y={f1(yR(RHR[0]) - g.num * 1.15)} fontFamily={serif} fontSize={g.num * 0.78} fill="#18213F">
        63 bpm
      </text>
      <text x={g.x1} y={f1(yR(RHR[RHR.length - 1]) - g.num * 0.75)} textAnchor="end" fontFamily={serif} fontSize={g.num * 0.78} fill="#18213F">
        56 bpm
      </text>
      <text x={g.x0} y={g.H - 10} fontFamily={sans} fontSize={g.small - 1} fontWeight="600" fill="#434B69">
        Week 1
      </text>
      <text x={g.x1} y={g.H - 10} textAnchor="end" fontFamily={sans} fontSize={g.small - 1} fontWeight="600" fill="#434B69">
        Week 26
      </text>
    </svg>
  );
}

export default function LinkSection() {
  return (
    <section id="link" className="hv2-sec hv2-link" aria-labelledby="link-title">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">04 · Merios Plus · links</p>
        <div className="hv2-headrow">
          <h2 className="hv2-h2" id="link-title">
            Then your blood <em>joins in.</em>
          </h2>
          <p className="hv2-lead">
            Merios lines up your reports with your nights and your heart rate,
            and shows you what moved together. It describes the pattern. It
            never claims a cause.
          </p>
        </div>

        <div className="hv2-link__card" data-rv="">
          <p className="hv2-link__read">
            The weeks with lower ferritin were also the weeks with a higher resting heart rate.
          </p>
          <div className="hv2-link__key" aria-hidden="true">
            <span>
              <i className="hv2-key-line" />
              Resting HR, weekly
            </span>
            <span>
              <i className="hv2-key-orb" />
              Ferritin, 3 reports
            </span>
            <span className="hv2-link__span">Example · 26 weeks</span>
          </div>
          <Chart g={WIDE} />
          <Chart g={NARROW} />
          <p className="hv2-fine hv2-link__fine">Example data · a pattern, never a cause.</p>
        </div>
      </div>
    </section>
  );
}
