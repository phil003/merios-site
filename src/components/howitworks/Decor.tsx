import type { CSSProperties } from "react";
import styles from "./hiw.module.css";

/**
 * Drawn visuals for /how-it-works (v2 "Open Sky", mockup HowItWorks.dc.html).
 * Server components, zero JS. The plates are aria-hidden illustrations of the
 * card copy beside them; every plate that shows a value says "Example data".
 */

// ─── Masthead: the sunrise arc carrying the three steps ────────────────────
// The curve is drawn in a 1312 × 190 box stretched to the container
// (preserveAspectRatio="none", non-scaling stroke), so the stations are HTML,
// placed in % on points of the curve itself: x = 300, 656 (the crest), 1012.
const ARC_PATH = "M0 180 C 300 170, 520 60, 656 52 S 1010 120, 1312 176";
const STATIONS = [
  { step: 1, label: "01 · Connect", x: 22.866, y: 72.657 },
  { step: 2, label: "02 · Understand", x: 50, y: 27.368 },
  { step: 3, label: "03 · Act", x: 77.134, y: 58.467 },
] as const;

export function HeroArc() {
  return (
    <div
      className={styles.arc}
      role="img"
      aria-label="Three steps along a rising arc: Connect, Understand, Act."
    >
      <svg
        className={styles.arcSvg}
        viewBox="0 0 1312 190"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        <path d="M0 180 H1312" className={styles.arcBase} vectorEffect="non-scaling-stroke" />
        <path d={ARC_PATH} className={styles.arcLine} vectorEffect="non-scaling-stroke" />
      </svg>
      {STATIONS.map((station, i) => (
        <span
          key={station.step}
          className={styles.station}
          data-step={station.step}
          style={
            {
              left: `${station.x}%`,
              top: `${station.y}%`,
              "--station-d": `${0.5 + i * 0.1}s`,
            } as CSSProperties
          }
        >
          <span className={styles.stationLabel}>{station.label}</span>
        </span>
      ))}
    </div>
  );
}

// ─── Step 01 · Connect: one plate per import path ──────────────────────────

export type ConnectPlateVariant = "apple-health" | "ocr" | "manual";

const STREAMS = [
  { name: "Activity", tone: "activity", d: "M0 14 L12 10 L24 12 L36 6 L48 9 L60 5 L72 8 L84 4 L100 6" },
  { name: "Sleep", tone: "zen", d: "M0 10 L12 12 L24 8 L36 10 L48 7 L60 9 L72 6 L84 8 L100 7" },
  { name: "Resting HR", tone: "ink", d: "M0 8 L12 9 L24 8 L36 10 L48 9 L60 11 L72 10 L84 12 L100 12" },
  { name: "HRV", tone: "recovery", d: "M0 12 L12 9 L24 13 L36 8 L48 11 L60 7 L72 10 L84 6 L100 8" },
] as const;

const OCR_ROWS = [
  { marker: "Ferritin", value: "30 ng/mL" },
  { marker: "Hemoglobin", value: "14.1 g/dL" },
  { marker: "LDL cholesterol", value: "112 mg/dL" },
] as const;

export function ConnectPlate({ variant }: { variant: ConnectPlateVariant }) {
  if (variant === "apple-health") {
    return (
      <div className={`${styles.plate} ${styles.platePeach} ${styles.streams}`} aria-hidden>
        {STREAMS.map((stream) => (
          <div key={stream.name} className={styles.stream}>
            <span>{stream.name}</span>
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" focusable="false">
              <path
                d={stream.d}
                className={styles.streamLine}
                data-tone={stream.tone}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "ocr") {
    return (
      <div className={`${styles.plate} ${styles.plateSky} ${styles.ocr}`} aria-hidden>
        <div className={styles.plateHead}>
          <span>lab_report.pdf</span>
          <span>Example data</span>
        </div>
        {OCR_ROWS.map((row) => (
          <div key={row.marker} className={styles.ocrRow}>
            <span>{row.marker}</span>
            <span className={styles.ocrRead}>
              <span className={styles.ocrValue}>{row.value}</span>
              <span className={styles.ocrTag}>read</span>
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.plate} ${styles.plateLilac} ${styles.manual}`} aria-hidden>
      <div className={styles.plateHead}>
        <span>Add a marker</span>
        <span>Example data</span>
      </div>
      <div className={styles.fields}>
        <span className={styles.field}>
          Marker<span className={styles.fieldValue}>Vitamin D</span>
        </span>
        <span className={styles.field}>
          Value<span className={`${styles.fieldValue} ${styles.fieldNumber}`}>34</span>
        </span>
        <span className={styles.field}>
          Unit<span className={styles.fieldValue}>ng/mL</span>
        </span>
      </div>
      <span className={styles.addPill}>Add to timeline</span>
    </div>
  );
}

// ─── Step 03 · Act: what changed, the month in words, the next test ───────

export type ActPlateVariant = "trend" | "report" | "next-test";

export function ActPlate({ variant }: { variant: ActPlateVariant }) {
  if (variant === "trend") {
    return (
      <div className={`${styles.plate} ${styles.plateShort} ${styles.plateDawn} ${styles.trend}`} aria-hidden>
        <div className={styles.plateHead}>
          <span>Ferritin, ng/mL</span>
          <span>Example data</span>
        </div>
        <div className={styles.trendRow}>
          <span className={styles.reading} data-when="before">
            <span className={styles.readingValue}>22</span>
            <span className={styles.readingDate}>Mar 12</span>
          </span>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={styles.trendSvg} focusable="false">
            <path d="M4 34 C 40 30, 60 14, 96 6" className={styles.trendLine} vectorEffect="non-scaling-stroke" />
          </svg>
          <span className={styles.reading} data-when="after">
            <span className={styles.readingValue}>41</span>
            <span className={styles.readingDate}>Jun 18</span>
          </span>
        </div>
      </div>
    );
  }

  if (variant === "report") {
    return (
      <div className={`${styles.plate} ${styles.plateShort} ${styles.plateSky} ${styles.report}`} aria-hidden>
        <div className={styles.plateHead}>
          <span>Your month · Plus</span>
          <span>Example</span>
        </div>
        <p className={styles.reportText}>
          You slept a little longer than in October, and your resting heart rate eased.
        </p>
        <span className={styles.skeleton} style={{ width: "92%" }} />
        <span className={styles.skeleton} style={{ width: "70%" }} />
      </div>
    );
  }

  return (
    <div className={`${styles.plate} ${styles.plateShort} ${styles.plateLilac} ${styles.nextTest}`} aria-hidden>
      <span className={styles.nextTile}>
        <span className={styles.nextKicker}>Next</span>
        <span className={styles.nextWord}>test</span>
      </span>
      <span className={styles.nextSteps}>
        <span>1. Take the trend to your doctor</span>
        <span>2. Change what you choose</span>
        <span>3. Let the next test show it</span>
      </span>
    </div>
  );
}

// ─── Closing: the quarterly loop ───────────────────────────────────────────
// 70% of the ring is drawn (pathLength 100, dash 100 / gap 200, offset 30):
// Connect at the top, Understand and Act a third of the way round each.

export function LoopDiagram() {
  return (
    <svg
      className={styles.loopSvg}
      viewBox="0 0 220 220"
      role="img"
      aria-label="A loop through Connect, Understand and Act, repeated every quarter."
      focusable="false"
    >
      <circle cx="110" cy="110" r="80" className={styles.loopTrack} />
      <circle
        cx="110"
        cy="110"
        r="80"
        className={styles.loopArc}
        pathLength={100}
        strokeDasharray="100 200"
        strokeDashoffset={30}
        style={{ "--off": 30 } as CSSProperties}
        transform="rotate(-90 110 110)"
      />
      <circle cx="110" cy="30" r="8" className={styles.loopStation} data-step="1" />
      <circle cx="179" cy="150" r="8" className={styles.loopStation} data-step="2" />
      <circle cx="41" cy="150" r="8" className={styles.loopStation} data-step="3" />
      <text x="110" y="14" textAnchor="middle" className={styles.loopLabel}>
        Connect
      </text>
      <text x="200" y="178" textAnchor="middle" className={styles.loopLabel}>
        Understand
      </text>
      <text x="22" y="178" textAnchor="middle" className={styles.loopLabel}>
        Act
      </text>
      <text x="110" y="106" textAnchor="middle" className={styles.loopQ}>
        Q
      </text>
      <text x="110" y="128" textAnchor="middle" className={styles.loopEvery}>
        every quarter
      </text>
    </svg>
  );
}
