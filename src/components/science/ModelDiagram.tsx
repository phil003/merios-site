"use client";

import { useState, type CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import styles from "./science.module.css";

/**
 * Science — Model diagram (v2 "Open Sky").
 *
 * The page's one ink block. Four pillar buttons sit above the figure; the
 * chosen pillar's path into the composite lights up in its colour and the
 * line under the figure says what it is. Only facts this page states are
 * shown: the pillars' names, the composite on a 0–100 scale (82, as in the
 * shipped figure, illustrative) and the eleven systems inside Blood.
 * Selection is plain React state; path changes are CSS transitions, off
 * under reduced motion.
 */

// The four pillars as the app and the home page name them. Metabolic,
// cardiovascular, hormonal and inflammation markers are blood systems inside
// the Blood pillar, never pillars of their own.
const PILLARS = [
  { n: "01", label: "Activity", color: "var(--color-activity)" },
  { n: "02", label: "Recovery", color: "var(--color-recovery)" },
  { n: "03", label: "Zen", color: "var(--color-zen)" },
  { n: "04", label: "Blood", color: "var(--color-sky)" },
] as const;

// Path from each button (12.5% / 37.5% / 62.5% / 87.5% of the width) into
// the composite at the centre.
const PATHS = [
  "M100 0 C 100 90, 400 70, 400 120",
  "M300 0 C 300 70, 400 70, 400 120",
  "M500 0 C 500 70, 400 70, 400 120",
  "M700 0 C 700 90, 400 70, 400 120",
];

export default function ScienceModelDiagram() {
  const [sel, setSel] = useState(3);
  const pillar = PILLARS[sel] ?? PILLARS[3];

  return (
    <section
      id="model"
      aria-labelledby="science-model-heading"
      className={styles.chapter}
    >
      <div className={`night ${styles.plateInk}`} data-nav="dark">
        <Reveal amount={0.2}>
          <span className={`label ${styles.plateEyebrow}`}>
            <span aria-hidden className="label-dot" />
            <span>03 · The model</span>
          </span>

          <h2
            id="science-model-heading"
            className={`${styles.title} ${styles.plateTitle}`}
          >
            Four pillars, <em>one score.</em>
          </h2>

          <p className={`${styles.lead} ${styles.plateLead}`}>
            Every marker is weighted inside a pillar; pillars aggregate into a
            single composite on a 0–100 scale. The pillars are designed to be
            independently auditable so clinicians can see exactly where the
            score comes from.
          </p>
        </Reveal>

        <Reveal amount={0.15} delay={0.1}>
          <figure className={styles.modelFigure}>
            <div role="group" aria-label="Choose a pillar" className={styles.pillarRow}>
              {PILLARS.map((p, i) => (
                <button
                  key={p.n}
                  type="button"
                  aria-pressed={i === sel}
                  onClick={() => setSel(i)}
                  className={styles.pillarBtn}
                  style={{ "--pillar": p.color } as CSSProperties}
                >
                  <span aria-hidden className={styles.pillarNode}>
                    {p.n}
                  </span>
                  <span className={styles.pillarName}>{p.label}</span>
                </button>
              ))}
            </div>

            <svg
              className={styles.modelSvg}
              viewBox="0 0 800 250"
              role="img"
              aria-labelledby="model-diagram-title model-diagram-desc"
            >
              <title id="model-diagram-title">
                Four health pillars converging into a single composite score.
              </title>
              <desc id="model-diagram-desc">
                Diagram showing four pillars labelled Activity, Recovery,
                Zen and Blood converging into a central composite node
                labelled Composite Score, with a biological age estimate
                branching out below.
              </desc>

              {PATHS.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  className={styles.modelPath}
                  data-on={i === sel ? "true" : "false"}
                  style={{ "--pillar": PILLARS[i].color } as CSSProperties}
                />
              ))}
              <circle
                cx="400"
                cy="160"
                r="70"
                fill="none"
                stroke="rgb(255 255 255 / 0.22)"
                strokeWidth="1.2"
                strokeDasharray="2 5"
              />
              <circle cx="400" cy="160" r="54" fill="#A8C2F4" />
              <text x="400" y="140" textAnchor="middle" className={styles.modelBrand}>
                MERIOS
              </text>
              <text x="400" y="178" textAnchor="middle" className={styles.modelScore}>
                82
              </text>
              <line
                x1="400"
                y1="232"
                x2="400"
                y2="248"
                stroke="rgb(255 255 255 / 0.35)"
                strokeWidth="1.2"
              />
            </svg>
            <p aria-hidden className={styles.modelBranch}>
              + Biological age delta
            </p>

            <div aria-live="polite" className={styles.modelNote}>
              {pillar.label === "Blood" ? (
                <p>
                  <strong>Blood.</strong> Eleven biomarker systems, 160+
                  markers, read as a network, not a list.{" "}
                  <a href="#coverage">See the eleven systems</a>
                </p>
              ) : (
                <p>
                  <strong>{pillar.label}.</strong> One of the four pillars
                  that aggregate into the composite, on a 0–100 scale.
                </p>
              )}
              <p className={styles.modelNoteSide}>Pillar {pillar.n} of 4</p>
            </div>

            <figcaption className={styles.figCaption}>
              Fig. 1 · Composite aggregation — illustrative
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
