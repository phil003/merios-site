import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import styles from "./science.module.css";

/**
 * Science — Thesis.
 *
 * The composite-score argument: a pull quote plus a two-column editorial
 * expansion. Server component: scroll reveals are driven by the shared
 * data-rv mechanism (globals.css + inline IntersectionObserver), with a
 * 100ms stagger expressed as an incremental --rv-delay. Superscripts
 * reference citations rendered in <Citations />.
 *
 * v3: display headings, the quote in Newsreader italic on a lime rule, the
 * two arguments as white cards each with a small (decorative) glyph — one
 * marker alone, then many markers read into one signal.
 */

function IsolatedGlyph() {
  return (
    <svg className={styles.thesisMark} viewBox="0 0 34 34" aria-hidden focusable="false">
      <circle cx="17" cy="17" r="14.5" fill="none" stroke="#10231A" strokeOpacity="0.35" strokeDasharray="2 3.2" />
      <circle cx="17" cy="17" r="4.5" fill="#10231A" />
    </svg>
  );
}

function CompositeGlyph() {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    return [17 + 12.5 * Math.cos(a), 17 + 12.5 * Math.sin(a)] as const;
  });
  return (
    <svg className={styles.thesisMark} viewBox="0 0 34 34" aria-hidden focusable="false">
      {pts.map(([x, y]) => (
        <line key={`l-${x}-${y}`} x1={x} y1={y} x2="17" y2="17" stroke="#10231A" strokeOpacity="0.4" strokeWidth="1.2" />
      ))}
      {pts.map(([x, y]) => (
        <circle key={`c-${x}-${y}`} cx={x} cy={y} r="2.6" fill="#10231A" />
      ))}
      <circle cx="17" cy="17" r="5" fill="#D6F050" stroke="#10231A" strokeWidth="1.4" />
    </svg>
  );
}

export default function ScienceThesis() {
  return (
    <section
      id="thesis"
      aria-labelledby="science-thesis-heading"
      className={styles.chapter}
    >
      <Reveal amount={0.2}>
        <span className={`label ${styles.eyebrow}`}>
          <span aria-hidden className="label-dot label-dot--ink" />
          <span>01 · Thesis</span>
        </span>

        <h2 id="science-thesis-heading" className={styles.title}>
          A biomarker in isolation is almost always misleading.
        </h2>
      </Reveal>

      <figure data-rv="" className={styles.quote}>
        <blockquote className={styles.quoteText}>
          <span
            aria-hidden
            className={styles.quoteMark}
            style={{ marginRight: "0.12em" }}
          >
            &ldquo;
          </span>
          The signal lives in the system — in convergence, trajectory, and
          time. A single composite is how clinicians already think; it is
          how consumer health finally should.
          <span
            aria-hidden
            className={styles.quoteMark}
            style={{ marginLeft: "0.05em" }}
          >
            &rdquo;
          </span>
        </blockquote>
        <figcaption className={styles.quoteCaption}>
          Merios — Scientific thesis
        </figcaption>
      </figure>

      <div
        data-rv=""
        style={{ "--rv-delay": "0.1s" } as CSSProperties}
        className={styles.thesisCols}
      >
        <div className={styles.thesisCard}>
          <IsolatedGlyph />
          <h3>
            Why single markers fail.
          </h3>
          <p>
            A normal LDL with a high Apo-B is not normal. An in-range HbA1c
            with elevated fasting insulin is not in range. Reference
            intervals are defined against a population that is itself
            largely metabolically unwell
            <sup aria-describedby="ref-1">
              <a
                href="#ref-1"
                aria-label="Reference 1"
                className={styles.ref}
              >
                1
              </a>
            </sup>
            — so normal flags are a low bar, not a goal.
          </p>
        </div>

        <div className={styles.thesisCard}>
          <CompositeGlyph />
          <h3>
            Why a composite works.
          </h3>
          <p>
            Composite indices reduce noise, capture system-level risk, and
            track meaningful change over time. They are the statistical
            spine of landmark work on biological age and cardiometabolic
            risk stratification
            <sup aria-describedby="ref-2">
              <a
                href="#ref-2"
                aria-label="Reference 2"
                className={styles.ref}
              >
                2
              </a>
            </sup>
            . Merios is built on that foundation.
          </p>
        </div>
      </div>
    </section>
  );
}
