import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import styles from "./science.module.css";

/**
 * Science — Thesis (v2 "Open Sky").
 *
 * The composite-score argument: a pull quote on a zenith rule, then two glass
 * cards. Each card opens on a drawn plate that shows its subject (mockup
 * Science.dc.html): an in-range LDL next to an above-range Apo-B, then many
 * markers read into one signal. Both plates are illustrations, labelled as
 * such and hidden from assistive tech (the card text says it all).
 * Server component; reveals use the shared data-rv mechanism. Superscripts
 * reference citations rendered in <Citations />.
 */

function RangePlate() {
  return (
    <div aria-hidden className={styles.plate} data-tone="sky">
      <div className={styles.plateHead}>
        <span>Same person, same draw</span>
        <span>Illustration</span>
      </div>
      <div className={styles.rangeRow}>
        <div className={styles.rangeTop}>
          <span>LDL cholesterol</span>
          <span className={styles.rangeChip}>in range</span>
        </div>
        <div className={styles.rangeTrack}>
          <span className={styles.rangeBand} />
          <span className={styles.rangeMark} style={{ left: "44%" }} />
        </div>
      </div>
      <div className={styles.rangeRow}>
        <div className={styles.rangeTop}>
          <span>Apo-B</span>
          <span className={styles.rangeChip} data-tone="peach">
            above the range
          </span>
        </div>
        <div className={styles.rangeTrack}>
          <span className={styles.rangeBand} />
          <span className={styles.rangeMark} style={{ left: "80%" }} />
        </div>
      </div>
    </div>
  );
}

// Markers named on this page (the thesis and the eleven systems).
const SIGNAL_MARKERS = [
  "Apo-B",
  "LDL",
  "HbA1c",
  "Fasting insulin",
  "hs-CRP",
  "Ferritin",
  "TSH",
  "Creatinine",
  "ALT",
];

function SignalPlate() {
  return (
    <div aria-hidden className={styles.plate} data-tone="peach">
      <div className={styles.plateHead}>
        <span>Many markers, one signal</span>
        <span>Illustration</span>
      </div>
      <svg className={styles.signalSvg} viewBox="0 0 340 132" focusable="false">
        <g stroke="rgb(24 33 63 / 0.22)" strokeWidth="1.2" fill="none">
          {SIGNAL_MARKERS.map((m, i) => {
            const y = 14 + i * 14;
            return <path key={`t-${m}`} d={`M14 ${y} C 120 ${y}, 170 66, 262 66`} />;
          })}
        </g>
        <g fill="#6E8FE8">
          {SIGNAL_MARKERS.map((m, i) => (
            <circle key={`d-${m}`} cx="14" cy={14 + i * 14} r="3.5" />
          ))}
        </g>
        <g className={styles.signalLabels} fill="#434B69">
          {SIGNAL_MARKERS.map((m, i) => (
            <text key={`l-${m}`} x="24" y={17 + i * 14}>
              {m}
            </text>
          ))}
        </g>
        <circle cx="292" cy="66" r="32" fill="#FFFFFF" stroke="#18213F" strokeWidth="2" />
        <path
          d="M270 66 H279 L283 71 L288 54 L295 80 L299 66 H314"
          fill="none"
          stroke="#18213F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
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
          A biomarker in isolation is <em>almost always misleading.</em>
        </h2>
      </Reveal>

      <figure data-rv="" className={styles.quote}>
        <blockquote className={styles.quoteText}>
          <span aria-hidden style={{ marginRight: "0.05em" }}>
            &ldquo;
          </span>
          The signal lives in the system — in convergence, trajectory, and
          time. A single composite is how clinicians already think; it is
          how consumer health finally should.
          <span aria-hidden style={{ marginLeft: "0.03em" }}>
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
          <RangePlate />
          <h3>Why single markers fail.</h3>
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
          <SignalPlate />
          <h3>Why a composite works.</h3>
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
