import type { CSSProperties } from "react";

import styles from "./about.module.css";

interface Milestone {
  date: string;
  title: string;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    date: "2025",
    title: "Idea born",
    description:
      "The vision crystallizes. A single platform to connect every health signal and turn the noise into a composite score.",
  },
  {
    date: "Q1 2026",
    title: "Development begins",
    description:
      "Engineering kicks off. Biomarker analysis engine, privacy-first architecture, and the four-pillar scoring model take shape.",
  },
  {
    date: "Q2 2026",
    title: "Beta",
    description:
      "A limited beta cohort tries the app. We gather signal, iterate on the score, and tune the experience.",
  },
  {
    date: "Q3 2026",
    title: "Public launch",
    description:
      "Merios launches on the US App Store for iPhone. A decade of health data, read in a single place.",
  },
  {
    date: "Nov 2026",
    title: "Worldwide",
    description:
      "On November 25, Merios opens on the App Store in 174 countries and regions.",
  },
];

// ─── The rising arc (desktop) ────────────────────────────────────────────────
// viewBox 1200 × 210, split into one column per milestone (five of 240 units)
// that line up with the grid columns of the list below it. The curve rises
// slowly, then faster towards today; each milestone sits on it at the left
// edge of its column.
const VB_W = 1200;
const VB_H = 210;
const BASE_Y = 192;
const RISE = 156;
const arcY = (x: number): number => BASE_Y - RISE * Math.pow(x / VB_W, 1.6);
const ARC_D = Array.from({ length: 61 }, (_, i) => {
  const x = i * 20;
  return `${i === 0 ? "M" : "L"}${x} ${arcY(x).toFixed(1)}`;
}).join(" ");
const COLUMN = VB_W / MILESTONES.length;
const NODES = MILESTONES.map((_, i) => {
  const x = i * COLUMN + 10;
  return { x, y: Number(arcY(x).toFixed(1)) };
});

/**
 * Server component. Open Sky: the story is the page's one ink block. On wide
 * screens the five milestones sit on a rising arc that draws itself once the
 * block scrolls into view (CSS only, via the `data-rv` reveal bootstrap);
 * below 900px they become a dated vertical rail. The arc is decorative
 * (aria-hidden): the ordered list carries the content. Reduced motion is
 * honoured globally (html[data-anim] is never set, so the arc is drawn).
 */
export default function StoryTimeline() {
  const last = NODES.length - 1;
  return (
    <section className={styles.section} aria-labelledby="about-story-title">
      <div className={styles.container}>
        <div className={`night ${styles.ink}`} data-nav="dark">
          <p className={`${styles.eyebrow} ${styles.inkEyebrow}`}>Story</p>

          <h2 id="about-story-title" className={`${styles.h2} ${styles.inkTitle}`}>
            Five <em>quiet milestones.</em>
          </h2>

          <div className={styles.arcWrap} data-rv="" aria-hidden>
            <svg
              className={styles.arcSvg}
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              focusable="false"
            >
              <path className={styles.arcBase} d={`M0 ${VB_H - 0.5} H${VB_W}`} />
              {NODES.map((n) => (
                <path
                  key={`drop-${n.x}`}
                  className={styles.arcDrop}
                  d={`M${n.x} ${(n.y + 14).toFixed(1)} V${VB_H}`}
                />
              ))}
              <path className={styles.arc} d={ARC_D} pathLength={100} />
              {NODES.map((n, i) =>
                i === last ? (
                  <g key={`node-${n.x}`}>
                    <circle className={styles.nodeHalo} cx={n.x} cy={n.y} r={22} />
                    <circle className={styles.nodeNow} cx={n.x} cy={n.y} r={10} />
                  </g>
                ) : (
                  <circle
                    key={`node-${n.x}`}
                    className={styles.node}
                    cx={n.x}
                    cy={n.y}
                    r={8}
                  />
                ),
              )}
            </svg>
          </div>

          <ol className={styles.timeline}>
            {MILESTONES.map((m, i) => (
              <li
                key={m.date}
                data-rv=""
                className={styles.milestone}
                style={
                  {
                    "--rv-delay": `${(0.05 + i * 0.08).toFixed(2)}s`,
                  } as CSSProperties
                }
              >
                <div className={styles.date}>{m.date}</div>
                <h3 className={styles.milestoneTitle}>{m.title}</h3>
                <p className={styles.milestoneCopy}>{m.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
