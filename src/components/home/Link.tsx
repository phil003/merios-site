import Image from "next/image";
import type { CSSProperties } from "react";

/* "Then your blood joins in": a runner photo with three readings, and an
   example chart where weekly resting heart rate and three ferritin reports
   share one timeline. A pattern, never a cause. */

const RHR = [62.6, 63.1, 62.8, 63.4, 62.9, 62.4, 62.7, 61.9, 61.2, 60.6, 60.1, 59.4, 59.0, 58.6, 58.1, 57.9, 57.4, 57.6, 57.1, 56.8, 57.0, 56.6, 56.4, 56.7, 56.3, 56.5];
const FER: [number, number, string][] = [
  [1, 21, "21 L"],
  [12, 32, "32"],
  [24, 44, "44"],
];

function Chart({ narrow }: { narrow: boolean }) {
  const W = narrow ? 380 : 640;
  const H = narrow ? 250 : 260;
  const L = narrow ? 40 : 46;
  const R = narrow ? 46 : 54;
  const T = 16;
  const B = 30;
  const pw = W - L - R;
  const ph = H - T - B;
  const weeks = 26;
  const x = (w: number) => L + (w / (weeks - 1)) * pw;
  const yR = (v: number) => T + (1 - (v - 54) / (66 - 54)) * ph;
  const yF = (v: number) => T + (1 - v / 60) * ph;
  const pts = RHR.map((v, i) => `${x(i).toFixed(1)},${yR(v).toFixed(1)}`);
  const fillId = narrow ? "hv3-corr-fill-n" : "hv3-corr-fill";

  return (
    <svg
      className={narrow ? "hv3-corr__svg hv3-corr__svg--narrow" : "hv3-corr__svg hv3-corr__svg--wide"}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Example chart: weekly resting heart rate falls from about 63 to 56 beats per minute over 26 weeks, while ferritin rises across three reports from 21 to 32 to 44 nanograms per millilitre."
    >
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect className="hv3-corr__band" x={x(0).toFixed(1)} y={T} width={(x(8) - x(0)).toFixed(1)} height={ph} rx="6" />
      <g className="hv3-corr__grid">
        {[56, 60, 64].map((v) => (
          <line key={v} x1={L} x2={W - R} y1={yR(v).toFixed(1)} y2={yR(v).toFixed(1)} />
        ))}
      </g>
      <g className="hv3-corr__axis">
        {([[64, "64 bpm"], [60, "60"], [56, "56"]] as [number, string][]).map(([v, t]) => (
          <text key={t} x={L - 8} y={(yR(v) + 3.5).toFixed(1)} textAnchor="end">
            {t}
          </text>
        ))}
        {([[40, "40"], [20, "20 ng/mL"]] as [number, string][]).map(([v, t]) => (
          <text key={t} x={W - R + 8} y={(yF(v) + 3.5).toFixed(1)} textAnchor="start" style={{ fill: "rgb(214 240 80 / 0.7)" }}>
            {t}
          </text>
        ))}
        {([[0, "WEEK 1"], [12, "WEEK 13"], [25, "WEEK 26"]] as [number, string][]).map(([w, t], i) => (
          <text key={t} x={x(w).toFixed(1)} y={H - 8} textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}>
            {t}
          </text>
        ))}
      </g>
      <path
        className="hv3-corr__area"
        fill={`url(#${fillId})`}
        d={`M${x(0).toFixed(1)},${T + ph} L${pts.join(" L")} L${x(weeks - 1).toFixed(1)},${T + ph} Z`}
      />
      <path className="hv3-corr__line" pathLength={1} d={`M${pts.join(" L")}`} />
      <g className="hv3-corr__fer">
        <path d={`M${FER.map(([w, v]) => `${x(w).toFixed(1)},${yF(v).toFixed(1)}`).join(" L")}`} />
        {FER.map(([w, v, t], i) => (
          <g key={t}>
            <circle cx={x(w).toFixed(1)} cy={yF(v).toFixed(1)} r="6.5" className={i === 0 ? "is-first" : undefined} />
            <text
              x={(x(w) + (i === 2 ? -10 : 10)).toFixed(1)}
              y={(yF(v) - 11).toFixed(1)}
              textAnchor={i === 2 ? "end" : "start"}
              className={i === 0 ? "is-first" : undefined}
            >
              {t}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function LinkSection() {
  return (
    <section id="link" className="hv3-link" data-stage="night" data-nav="dark" aria-labelledby="link-title">
      <div className="hv3-wrap hv3-link__grid">
        <div data-rv="">
          <div className="hv3-photo">
            <Image
              src="/images/v3/photo-runner.webp"
              alt=""
              fill
              sizes="(max-width: 1080px) 92vw, 42vw"
            />
            <svg className="hv3-photo__arc" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden focusable="false">
              <path d="M118 196 C 190 120, 260 150, 286 252" />
            </svg>
            <div className="hv3-photo__chips" aria-hidden>
              <div className="glass hv3-mini" style={{ left: "7%", top: "24%" }}>
                <span className="label">Asleep</span>
                <div className="hv3-mini__value">6h03</div>
              </div>
              <div className="glass hv3-mini" style={{ left: "9%", top: "42%" }}>
                <span className="label">Resting HR</span>
                <div className="hv3-mini__value">
                  63<small>bpm</small>
                </div>
              </div>
              <div className="glass hv3-mini" style={{ right: "7%", top: "52%" }}>
                <span className="label" style={{ color: "var(--color-lime)" }}>
                  Ferritin
                </span>
                <div className="hv3-mini__value">
                  21<small style={{ color: "var(--color-peach)" }}>L</small>
                </div>
              </div>
            </div>
            <span className="hv3-photo__note">A PATTERN, NEVER A CAUSE</span>
          </div>
        </div>

        <div className="hv3-link__copy">
          <div data-rv="" style={{ display: "grid", gap: 26 }}>
            <span className="label">
              <span aria-hidden className="label-dot" />
              Merios Plus · links
            </span>
            <h2 className="display hv3-h2" id="link-title">
              <span className="chrome-text">Then your blood joins in.</span>
            </h2>
            <p className="lead">
              Merios lines up your reports with your nights and your heart
              rate, and shows you what moved together. It describes the
              pattern. It never claims a cause.
            </p>
          </div>
          <div className="glass hv3-corr" data-rv="" style={{ "--rv-delay": "0.1s" } as CSSProperties}>
            <div className="hv3-corr__head">
              <span className="label">Example · 26 weeks</span>
              <div className="hv3-corr__key" aria-hidden>
                <span>
                  <i style={{ background: "var(--color-on-night)" }} />
                  RESTING HR, WEEKLY
                </span>
                <span>
                  <i style={{ background: "var(--color-lime)" }} />
                  FERRITIN, 3 REPORTS
                </span>
              </div>
            </div>
            <Chart narrow={false} />
            <Chart narrow />
            <div className="hv3-corr__read">
              <p>The weeks with lower ferritin were also the weeks with a higher resting heart rate.</p>
              <span className="hv3-hand">a pattern, never a cause</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
