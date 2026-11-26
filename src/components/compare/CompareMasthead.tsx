import type { CSSProperties } from "react";
import styles from "./compare.module.css";

/**
 * The /compare masthead: the site's page hero (the same global classes as
 * src/components/ui/PageHero.tsx — dawn stage, char-by-char rise, the
 * horizon line), with what PageHero cannot do yet: the headline's last
 * words set in the Newsreader italic of Open Sky ("Merios vs *the rest.*").
 *
 * Server component, zero JS: the H1 is in the static HTML and paints at
 * parse time (CSS .ph-char keyframes), reduced motion honoured globally.
 */

interface CompareMastheadProps {
  eyebrow: string;
  /** The headline's roman words. */
  title: string;
  /** Its last words, in italic. */
  italic: string;
  subline?: string;
}

const CHAR_STAGGER_S = 0.014;
const CHAR_STAGGER_CAP_S = 0.55;

export default function CompareMasthead({
  eyebrow,
  title,
  italic,
  subline,
}: CompareMastheadProps) {
  const full = `${title} ${italic}`;
  const words = [
    ...title.split(" ").map((w) => ({ w, em: false })),
    ...italic.split(" ").map((w) => ({ w, em: true })),
  ];
  let charIndex = 0;

  return (
    <section className="v3-hero night" data-nav="dark">
      <div className="v3-hero__inner">
        <div className="v3-hero__copy">
          <div className="he label v3-hero__eyebrow">
            <span aria-hidden className="label-dot" />
            <span>{eyebrow}</span>
          </div>

          <h1
            className="page-hero-title display"
            aria-label={full}
            style={{ fontSize: "var(--text-display-l)" }}
          >
            {words.map(({ w, em }, wi) => (
              <span key={`${w}-${wi}`} aria-hidden>
                <span
                  className={em ? `ph-word chrome-text ${styles.italicWord}` : "ph-word"}
                >
                  {w.split("").map((char, ci) => {
                    const delay = Math.min(
                      charIndex++ * CHAR_STAGGER_S,
                      CHAR_STAGGER_CAP_S,
                    );
                    return (
                      <span
                        key={`${char}-${ci}`}
                        className="ph-char"
                        style={{ "--ph-d": `${delay}s` } as CSSProperties}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          {subline ? (
            <p
              className="he page-hero-subline"
              style={{ "--he-d": "0.2s" } as CSSProperties}
            >
              {subline}
            </p>
          ) : null}
        </div>
      </div>

      {/* A plain horizon ending on the sun (the heartbeat was retired with the drop mark, DA 21/11) */}
      <svg
        className="v3-hero__pulse"
        aria-hidden
        focusable="false"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="compare-hero-pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1300"
          fill="none"
          stroke="url(#compare-hero-pulse-fade)"
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
