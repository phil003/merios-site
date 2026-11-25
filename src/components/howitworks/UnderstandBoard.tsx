import type { CSSProperties } from "react";
import styles from "./hiw.module.css";

/**
 * UnderstandBoard — Step 02 of /how-it-works (v2 "Open Sky").
 *
 * A white card: the Merios Score's four quarters as the app draws them
 * (Activity, Recovery and Zen rings with example values, Blood dashed until a
 * lab report is read), beside the step's three lines, each with its trend.
 * Server component, no GSAP: the rings and the trend lines draw in through
 * the global reveal (data-rv → .rv-in, CSS transitions); with reduced motion
 * the reveal never arms and everything is drawn from the first paint.
 */

type Tone = "activity" | "recovery" | "zen";

// Example values (the Open Sky mockups' Activity 90, Recovery 76, Zen 81).
const RINGS: ReadonlyArray<{ name: string; value: number; tone: Tone }> = [
  { name: "Activity", value: 90, tone: "activity" },
  { name: "Recovery", value: 76, tone: "recovery" },
  { name: "Zen", value: 81, tone: "zen" },
];

// One illustrative trend per line, in order.
const SPARKS: ReadonlyArray<{ d: string; tone: Tone }> = [
  { d: "M2 30 L14 26 L26 22 L40 20 L54 18 L68 16 L80 14", tone: "recovery" },
  { d: "M2 22 L12 18 L22 24 L32 20 L46 18 L60 16 L80 15", tone: "zen" },
  { d: "M2 28 L12 26 L24 22 L36 18 L48 16 L60 13 L80 10", tone: "activity" },
];

interface UnderstandBoardProps {
  /** The step's three statements, one trend line each. */
  lines: readonly string[];
  /** The closing note under the board. */
  note: string;
}

export default function UnderstandBoard({ lines, note }: UnderstandBoardProps) {
  return (
    <div className={styles.board}>
      <div
        className={styles.rings}
        role="img"
        aria-label="Four rings, example data: Activity 90, Recovery 76, Zen 81, and Blood, which fills in once your lab report is read."
        data-rv=""
      >
        <div className={styles.ringsHead}>
          <span>Merios Score · four quarters</span>
          <span>Example data</span>
        </div>
        <div className={styles.ringGrid}>
          {RINGS.map((ring, i) => (
            <div key={ring.name} className={styles.ring}>
              <svg viewBox="0 0 96 96" focusable="false">
                <circle cx="48" cy="48" r="40" className={styles.ringTrack} />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className={styles.ringArc}
                  data-tone={ring.tone}
                  pathLength={100}
                  strokeDasharray="100 200"
                  strokeDashoffset={100 - ring.value}
                  transform="rotate(-90 48 48)"
                  style={
                    { "--off": 100 - ring.value, transitionDelay: `${i * 80}ms` } as CSSProperties
                  }
                />
                <text x="48" y="56" textAnchor="middle" className={styles.ringValue}>
                  {ring.value}
                </text>
              </svg>
              <p className={styles.ringName}>{ring.name}</p>
            </div>
          ))}
          <div className={styles.ring}>
            <svg viewBox="0 0 96 96" focusable="false">
              <circle cx="48" cy="48" r="40" className={styles.ringPending} />
              <text x="48" y="54" textAnchor="middle" className={styles.ringWith}>
                with labs
              </text>
            </svg>
            <p className={styles.ringName}>Blood</p>
          </div>
        </div>
      </div>

      <ul className={styles.lines}>
        {lines.map((line, i) => {
          const spark = SPARKS[i % SPARKS.length];
          return (
            <li
              key={line}
              className={styles.line}
              data-rv=""
              style={{ "--rv-delay": `${0.08 * (i + 1)}s` } as CSSProperties}
            >
              <svg viewBox="0 0 82 34" className={styles.spark} aria-hidden focusable="false">
                <path
                  d={spark.d}
                  className={styles.sparkLine}
                  data-tone={spark.tone}
                  pathLength={100}
                  strokeDasharray="100 200"
                  strokeDashoffset={0}
                />
              </svg>
              <span className={styles.lineText}>{line}</span>
            </li>
          );
        })}
      </ul>

      <p className={styles.note}>{note}</p>
    </div>
  );
}
