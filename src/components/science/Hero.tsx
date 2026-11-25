import type { CSSProperties } from "react";

import { BLOOD_SYSTEMS } from "@/content/biomarkers";
import styles from "./science.module.css";

/**
 * Science — Hero / Intro (v2 "Open Sky").
 *
 * A dawn masthead (the glass nav floats over it). The headline rises line by
 * line through a mask with pure CSS keyframes that start at parse time — the
 * H1 is in the static HTML and never waits for JavaScript. Stats sit on glass
 * tiles. On the right, the eleven blood systems on a sunrise arc around the
 * Blood sun (mockup Science.dc.html). Server component.
 */

const STATS = [
  { k: "Markers", v: "160+" },
  { k: "Pillars", v: "4" },
  { k: "Clinicians", v: "Not yet" },
  { k: "Updated", v: "Nov 2026" },
];

// ─── The sunrise arc: 11 systems on a half circle around the Blood sun ────
const CX = 300;
const CY = 360;
const R = 200;
// Label anchors, tuned per node in the mockup so no name touches the arc.
const LABELS: Array<{ x: number; y: number; anchor: "start" | "middle" | "end" }> = [
  { x: 84, y: 364, anchor: "end" },
  { x: 93, y: 300, anchor: "end" },
  { x: 122, y: 242, anchor: "end" },
  { x: 168, y: 193, anchor: "end" },
  { x: 228, y: 158, anchor: "end" },
  { x: 300, y: 140, anchor: "middle" },
  { x: 372, y: 158, anchor: "start" },
  { x: 432, y: 193, anchor: "start" },
  { x: 478, y: 242, anchor: "start" },
  { x: 507, y: 300, anchor: "start" },
  { x: 516, y: 364, anchor: "start" },
];
const NODES = BLOOD_SYSTEMS.map((s, i) => {
  const a = Math.PI - (i * Math.PI) / (BLOOD_SYSTEMS.length - 1);
  return {
    key: s.slug,
    // "Heart & Cardiovascular" → "Heart": the arc carries the short name.
    short: s.label.split(" & ")[0],
    x: CX + R * Math.cos(a),
    y: CY - R * Math.sin(a),
    label: LABELS[i] ?? { x: CX, y: CY, anchor: "middle" as const },
  };
});

function SunriseArc() {
  return (
    <svg
      className={styles.arc}
      viewBox="0 0 620 440"
      role="img"
      aria-label="Illustration: the eleven blood systems of the Blood pillar, from Heart & Cardiovascular to Autoimmune & Systemic, on a rising arc around one sun, Blood."
      focusable="false"
    >
      <defs>
        <radialGradient id="sci-sun" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#FFC8A6" />
          <stop offset="0.7" stopColor="#FFA472" />
          <stop offset="1" stopColor="#FF9A66" />
        </radialGradient>
        <radialGradient id="sci-sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FCD6C2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FCD6C2" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M60 360 A 240 240 0 0 1 540 360" fill="none" stroke="rgb(24 33 63 / 0.08)" />
      <path
        d="M100 360 A 200 200 0 0 1 500 360"
        fill="none"
        stroke="#A8C2F4"
        strokeWidth="1.5"
        strokeDasharray="2 6"
      />
      <g stroke="rgb(24 33 63 / 0.14)" strokeWidth="1.2">
        {NODES.map((n) => (
          <line key={`ray-${n.key}`} x1={n.x.toFixed(1)} y1={n.y.toFixed(1)} x2={CX} y2={CY} />
        ))}
      </g>
      <g fill="#FFFFFF" stroke="#6E8FE8" strokeWidth="2.2">
        {NODES.map((n) => (
          <circle key={`node-${n.key}`} cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r="7" />
        ))}
      </g>
      <g className={styles.arcLabels} fill="#18213F">
        {NODES.map((n) => (
          <text key={`label-${n.key}`} x={n.label.x} y={n.label.y} textAnchor={n.label.anchor}>
            {n.short}
          </text>
        ))}
      </g>

      <line x1="30" y1="418" x2="590" y2="418" stroke="rgb(24 33 63 / 0.16)" />
      <circle cx={CX} cy={CY} r="96" fill="url(#sci-sun-glow)" />
      <g className={styles.sun}>
        <circle cx={CX} cy={CY} r="54" fill="url(#sci-sun)" />
        <text x={CX} y="357" textAnchor="middle" className={styles.sunName} fill="#18213F">
          Blood
        </text>
        <text x={CX} y="376" textAnchor="middle" className={styles.sunSub} fill="#18213F">
          11 systems
        </text>
      </g>
    </svg>
  );
}

export default function ScienceHero() {
  return (
    <section id="intro" aria-labelledby="science-hero-heading" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={`he label ${styles.heroEyebrow}`}>
              <span aria-hidden className="label-dot label-dot--ink" />
              <span>The science · Long read</span>
            </p>

            <h1
              id="science-hero-heading"
              className={`science-hero-headline ${styles.heroTitle}`}
            >
              <span className={styles.heroLine}>
                <span
                  className={styles.heroLineInner}
                  style={{ "--line-d": "0.05s" } as CSSProperties}
                >
                  Blood, read as
                </span>
              </span>{" "}
              <span className={styles.heroLine}>
                <span
                  className={styles.heroLineInner}
                  style={{ "--line-d": "0.14s" } as CSSProperties}
                >
                  <em>a system.</em>
                </span>
              </span>
            </h1>

            <p
              className={`science-hero-subline he ${styles.heroSub}`}
              style={{ "--he-d": "0.24s" } as CSSProperties}
            >
              Merios turns 160+ blood biomarkers into a single composite score
              and a biological-age estimate, grounded in the preventive-medicine
              literature. This page is the full argument — the model, the
              markers and the references. No clinician has reviewed it yet.
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

          <div className={styles.heroArt}>
            <SunriseArc />
          </div>
        </div>
      </div>
    </section>
  );
}
