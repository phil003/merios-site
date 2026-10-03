import type { CSSProperties, ReactNode } from "react";

import styles from "./about.module.css";

interface Value {
  eyebrow: string;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    eyebrow: "01",
    title: "Rigor",
    description:
      "Every insight is grounded in peer-reviewed research. Algorithms are transparent, validated, and continuously audited.",
  },
  {
    eyebrow: "02",
    title: "Clarity",
    description:
      "Complexity is our problem, not yours. One composite score, four pillars, and language a human can act on.",
  },
  {
    eyebrow: "03",
    title: "Privacy",
    description:
      "Your data is yours. Encrypted at rest and in transit, never sold, never monetized. Full export, full control.",
  },
];

// Presentation only: one pop surface + one line-art glyph per principle.
const COVERS = [styles.coverLilac, styles.coverSky, styles.coverPeach];

const INK = "#10231A";

function RigorGlyph() {
  // a measured target: crosshair inside a ring, ticks at the quarters
  return (
    <svg className={styles.coverGlyph} viewBox="0 0 64 64" aria-hidden focusable="false">
      <circle cx="32" cy="32" r="22" fill="none" stroke={INK} strokeWidth="1.8" />
      <circle cx="32" cy="32" r="11" fill="none" stroke={INK} strokeWidth="1.8" strokeDasharray="2.5 3" />
      <path d="M32 4 V16 M32 48 V60 M4 32 H16 M48 32 H60" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="32" cy="32" r="3.4" fill={INK} />
    </svg>
  );
}

function ClarityGlyph() {
  // noise resolving into one calm line and its dot
  return (
    <svg className={styles.coverGlyph} viewBox="0 0 64 64" aria-hidden focusable="false">
      <path
        d="M4 24 L9 16 L13 30 L18 12 L22 27 L26 20 L30 24 H58"
        fill="none"
        stroke={INK}
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 44 H58" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="44" r="4.2" fill={INK} />
    </svg>
  );
}

function PrivacyGlyph() {
  // a closed lock whose shackle is the drop's curve
  return (
    <svg className={styles.coverGlyph} viewBox="0 0 64 64" aria-hidden focusable="false">
      <path d="M21 28 V20 A11 11 0 0 1 43 20 V28" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
      <rect x="13" y="28" width="38" height="28" rx="8" fill="none" stroke={INK} strokeWidth="1.9" />
      <path d="M32 38 V45" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="32" cy="37" r="3" fill={INK} />
    </svg>
  );
}

const GLYPHS: ReactNode[] = [
  <RigorGlyph key="rigor" />,
  <ClarityGlyph key="clarity" />,
  <PrivacyGlyph key="privacy" />,
];

/**
 * Server component — the previous motion/react whileInView stagger is now
 * expressed as per-card `data-rv` reveals with incremental `--rv-delay`
 * (globals.css Reveal v2 + the inline IntersectionObserver in layout.tsx).
 * Cards are visible by default in the static HTML; reduced motion is handled
 * globally (html[data-anim] is never set).
 *
 * v3: each principle on a pop cover (lilac · sky · peach) with ink type and a
 * line-art glyph; the hover lift lives in about.module.css.
 */
export default function ValuesGrid() {
  return (
    <section className={styles.section} aria-labelledby="about-values-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={`label ${styles.eyebrow}`}>
            <span aria-hidden className="label-dot label-dot--ink" />
            <span>Principles</span>
          </div>

          <h2 id="about-values-title" className={styles.title}>
            Three principles we refuse to compromise on.
          </h2>
        </div>

        <ul className={styles.values}>
          {VALUES.map((v, i) => (
            <li
              key={v.title}
              data-rv=""
              style={
                {
                  "--rv-delay": `${(0.05 + i * 0.09).toFixed(2)}s`,
                } as CSSProperties
              }
            >
              <div className={styles.value}>
                <div className={`${styles.cover} ${COVERS[i % COVERS.length]}`}>
                  <span aria-hidden className={styles.valueIndex}>
                    <span className={styles.valueIndexRule} />
                    {v.eyebrow}
                  </span>
                  {GLYPHS[i % GLYPHS.length]}

                  <h3 className={styles.valueTitle}>{v.title}</h3>
                </div>

                <p className={styles.valueCopy}>{v.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
