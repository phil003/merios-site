import type { CSSProperties } from "react";

import styles from "./science.module.css";

/**
 * Science — Hero / Intro.
 *
 * v3: a night masthead. The headline rises line by line through a mask with
 * pure CSS keyframes that start at parse time — the H1 is in the static HTML
 * and never waits for JavaScript (the previous GSAP SplitText pass hid it
 * again after hydration). Eyebrow, subline and stats use the shared `.he`
 * entrance. On the right, the eleven blood systems drawn as one network,
 * fed by the logo's pulse (decorative, aria-hidden). Server component.
 */

const STATS = [
  { k: "Markers", v: "150+" },
  { k: "Pillars", v: "4" },
  { k: "Advisors", v: "MD · PhD" },
  { k: "Updated", v: "Apr 2026" },
];

// ─── Decorative network: 11 systems on an orbit, one composite core ───────
const C = 260;
const ORBIT = 186;
const NODES = Array.from({ length: 11 }, (_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / 11;
  return {
    i,
    x: C + ORBIT * Math.cos(a),
    y: C + ORBIT * Math.sin(a),
  };
});
const POP = ["#C9B8FF", "#A9D4FF", "#FFB39A"];

function SystemNetwork() {
  return (
    <div className={styles.network} aria-hidden>
      <svg viewBox="0 0 520 520" focusable="false">
        <defs>
          <radialGradient id="sci-core-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#D6F050" stopOpacity="0.28" />
            <stop offset="1" stopColor="#D6F050" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sci-pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <circle cx={C} cy={C} r="150" fill="url(#sci-core-glow)" />
        <circle cx={C} cy={C} r={ORBIT + 40} fill="none" stroke="#FFFFFF" strokeOpacity="0.06" />
        <circle cx={C} cy={C} r={ORBIT} fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeDasharray="2 6" />
        <circle cx={C} cy={C} r="96" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" />

        {/* chords: a network, not a list */}
        {NODES.map((n) => {
          const m = NODES[(n.i + 3) % 11];
          return (
            <line
              key={`chord-${n.i}`}
              x1={n.x.toFixed(1)}
              y1={n.y.toFixed(1)}
              x2={m.x.toFixed(1)}
              y2={m.y.toFixed(1)}
              stroke="#FFFFFF"
              strokeOpacity="0.07"
            />
          );
        })}
        {/* spokes into the composite */}
        {NODES.map((n) => (
          <line
            key={`spoke-${n.i}`}
            x1={n.x.toFixed(1)}
            y1={n.y.toFixed(1)}
            x2={C}
            y2={C}
            stroke="#FFFFFF"
            strokeOpacity="0.14"
          />
        ))}
        {NODES.map((n) => {
          const pop = n.i % 4 === 1 ? POP[(n.i >> 2) % POP.length] : null;
          return (
            <g key={`node-${n.i}`}>
              <circle cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r="13" fill="#FFFFFF" fillOpacity="0.04" />
              <circle
                cx={n.x.toFixed(1)}
                cy={n.y.toFixed(1)}
                r="6.5"
                fill={pop ?? "#0D1114"}
                stroke={pop ? "none" : "#FFFFFF"}
                strokeOpacity="0.75"
                strokeWidth="1.6"
              />
            </g>
          );
        })}

        {/* the logo's pulse, arriving at the core */}
        <g className={styles.networkPulse}>
          <path
            d="M-60 260 H150 L162 274 L178 214 L198 306 L210 260 H246"
            fill="none"
            stroke="url(#sci-pulse-fade)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <circle className={styles.networkCore} cx={C} cy={C} r="22" fill="none" stroke="#D6F050" strokeWidth="1.5" />
        <circle cx={C} cy={C} r="11" fill="#D6F050" style={{ filter: "drop-shadow(0 0 12px rgb(214 240 80 / 0.9))" }} />
      </svg>
    </div>
  );
}

export default function ScienceHero() {
  return (
    <section
      id="intro"
      aria-labelledby="science-hero-heading"
      className="v3-hero night"
      data-nav="dark"
    >
      <div className="v3-hero__inner">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className="he label v3-hero__eyebrow">
              <span aria-hidden className="label-dot" />
              <span>The science · Long read</span>
            </div>

            <h1
              id="science-hero-heading"
              className={`science-hero-headline display ${styles.heroTitle}`}
            >
              <span className={styles.heroLine}>
                <span
                  className={styles.heroLineInner}
                  style={{ "--line-d": "0.05s" } as CSSProperties}
                >
                  Blood, read as
                </span>
              </span>
              <span className={styles.heroLine}>
                <span
                  className={`${styles.heroLineInner} chrome-text`}
                  style={{ "--line-d": "0.14s" } as CSSProperties}
                >
                  a system.
                </span>
              </span>
            </h1>

            <p
              className={`science-hero-subline he ${styles.heroSub}`}
              style={{ "--he-d": "0.24s" } as CSSProperties}
            >
              Merios turns {/* Phase 4: confirm with product team */}150+
              peer-reviewed biomarkers into a single composite score and a
              biological-age estimate, grounded in the preventive-medicine
              literature. This page is the full argument — the model, the
              markers, the references, and the advisors who reviewed it.
            </p>

            <dl
              className={`he ${styles.stats}`}
              style={{ "--he-d": "0.34s" } as CSSProperties}
            >
              {STATS.map((item) => (
                <div key={item.k} className={styles.stat}>
                  <dt className={styles.statKey}>{item.k}</dt>
                  <dd className={styles.statValue}>{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <SystemNetwork />
        </div>
      </div>

      {/* The logo's heartbeat as the masthead's horizon (shared geometry) */}
      <svg
        className="v3-hero__pulse"
        aria-hidden
        focusable="false"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sci-hero-pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
          fill="none"
          stroke="url(#sci-hero-pulse-fade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="v3-hero__dot" aria-hidden />
    </section>
  );
}
