import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import styles from "./science.module.css";

/**
 * Science — Thesis (v2 "Open Sky").
 *
 * The composite-score argument: the thesis in one line on a zenith rule (our
 * own statement, so not a <blockquote> and not attributed like a citation),
 * then two glass cards. Each card opens on a drawn plate that shows its
 * subject (mockup Science.dc.html): an in-range LDL next to an above-range
 * Apo-B, then many markers read into one signal. Both plates are
 * illustrations, labelled as such and hidden from assistive tech (the card
 * text says it all). From 640px both plates have the same height, so the two
 * card headings line up. Server component; reveals use the shared data-rv
 * mechanism. Superscripts reference citations rendered in <Citations />
 * (numbers = the order of first citation, see ./data.ts).
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

// Names right-aligned on the left, a dot each, then the lines run from the
// dots into the signal: no line crosses a name. Drawn at the size it renders
// on a 390px phone (13px labels at about 1:1); the plate never scales it
// below that.
const SIGNAL_ROW = (i: number) => 13 + i * 16;
const SIGNAL_DOT_X = 118;
const SIGNAL_CY = 77;

function SignalPlate() {
  return (
    <div aria-hidden className={styles.plate} data-tone="peach">
      <div className={styles.plateHead}>
        <span>Many markers, one signal</span>
        <span>Illustration</span>
      </div>
      <svg className={styles.signalSvg} viewBox="0 0 300 154" focusable="false">
        <g stroke="rgb(24 33 63 / 0.22)" strokeWidth="1.2" fill="none">
          {SIGNAL_MARKERS.map((m, i) => {
            const y = SIGNAL_ROW(i);
            return (
              <path
                key={`t-${m}`}
                d={`M${SIGNAL_DOT_X} ${y} C 168 ${y}, 200 ${SIGNAL_CY}, 241 ${SIGNAL_CY}`}
              />
            );
          })}
        </g>
        <g fill="#6E8FE8">
          {SIGNAL_MARKERS.map((m, i) => (
            <circle key={`d-${m}`} cx={SIGNAL_DOT_X} cy={SIGNAL_ROW(i)} r="3.5" />
          ))}
        </g>
        <g className={styles.signalLabels} fill="#434B69" textAnchor="end">
          {SIGNAL_MARKERS.map((m, i) => (
            <text key={`l-${m}`} x={SIGNAL_DOT_X - 9} y={SIGNAL_ROW(i) + 4.5}>
              {m}
            </text>
          ))}
        </g>
        <circle cx="268" cy={SIGNAL_CY} r="27" fill="#FFFFFF" stroke="#18213F" strokeWidth="2" />
        <path
          d="M249.5 77 H257 L260.5 81 L264.5 67 L270.5 89 L274 77 H286.5"
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

      <div data-rv="" className={styles.quote}>
        <p className={styles.quoteText}>
          The signal lives in the system — in convergence, trajectory and
          time. A single composite is how clinicians already think, and how
          consumer health should finally think too.
        </p>
        <p className={styles.quoteCaption}>Our thesis</p>
      </div>

      <div
        data-rv=""
        style={{ "--rv-delay": "0.1s" } as CSSProperties}
        className={styles.thesisCols}
      >
        <div className={styles.thesisCard}>
          <RangePlate />
          <h3>Why single markers fail.</h3>
          <p>
            A normal LDL with a high Apo&#8209;B is not normal
            <sup aria-describedby="ref-1">
              <a
                href="#ref-1"
                aria-label="Reference 1"
                className={styles.ref}
              >
                1
              </a>
            </sup>
            . An in&#8209;range HbA1c with elevated fasting insulin is not in
            range. Reference intervals are defined against a population that
            is itself largely metabolically unwell
            <sup aria-describedby="ref-2">
              <a
                href="#ref-2"
                aria-label="Reference 2"
                className={styles.ref}
              >
                2
              </a>
            </sup>{" "}
            — so normal flags are a low bar, not a goal.
          </p>
        </div>

        <div className={styles.thesisCard}>
          <SignalPlate />
          <h3>Why a composite works.</h3>
          <p>
            Composite indices reduce noise, capture system&#8209;level risk, and
            track meaningful change over time. They are the statistical
            spine of landmark work on biological age
            <sup aria-describedby="ref-3 ref-4 ref-5">
              <a
                href="#ref-3"
                aria-label="Reference 3"
                className={styles.ref}
              >
                3
              </a>
              ,
              <a
                href="#ref-4"
                aria-label="Reference 4"
                className={styles.ref}
              >
                4
              </a>
              ,
              <a
                href="#ref-5"
                aria-label="Reference 5"
                className={styles.ref}
              >
                5
              </a>
            </sup>{" "}
            and cardiometabolic risk stratification
            <sup aria-describedby="ref-6">
              <a
                href="#ref-6"
                aria-label="Reference 6"
                className={styles.ref}
              >
                6
              </a>
            </sup>
            . Merios is built on that foundation.
          </p>
        </div>
      </div>
    </section>
  );
}
