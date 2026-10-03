import type { CSSProperties } from "react";

// PageHero is the entrance hero used across the secondary routes (/about,
// /contact, /compare, /blog, /blog/category/[slug], /tools/*, and the
// LegalPageLayout used by /privacy /terms /security).
//
// v4 (site v3 art direction): a night masthead — graphite stage, chrome-lit
// display type in Bricolage, the logo's heartbeat running along its lower
// edge. Still a server component with the pure-CSS char reveal (.ph-word /
// .ph-char), so the H1 is in the static HTML and paints at parse time: LCP
// safe, zero bundle JS, reduced motion honoured by the global rules.

type Align = "left" | "center";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subline?: string;
  align?: Align;
}

const CHAR_STAGGER_S = 0.014;
const CHAR_STAGGER_CAP_S = 0.55; // long titles: don't stretch the cascade forever

function titleSize(title: string): string {
  if (title.length > 62) return "clamp(2.1rem, 1.05rem + 2.7vw, 3.9rem)";
  if (title.length > 38) return "clamp(2.3rem, 1.15rem + 3.3vw, 4.7rem)";
  return "var(--text-display-l)";
}

export default function PageHero({
  eyebrow,
  title,
  subline,
  align = "left",
}: PageHeroProps) {
  const centered = align === "center";

  // Split into words so wrapping stays word-level (inline-block chars would
  // otherwise allow mid-word line breaks). Each word is an overflow-hidden
  // mask; each char rises from below with a small cascading delay.
  const words = title.split(" ");
  let charIndex = 0;

  return (
    <section className="v3-hero night" data-nav="dark">
      <div className="v3-hero__inner">
        <div className={`v3-hero__copy${centered ? " is-centered" : ""}`}>
          {eyebrow ? (
            <div className="he label v3-hero__eyebrow">
              <span aria-hidden className="label-dot" />
              <span>{eyebrow}</span>
            </div>
          ) : null}

          <h1
            className="page-hero-title display"
            aria-label={title}
            style={{ fontSize: titleSize(title) }}
          >
            {words.map((word, wi) => (
              <span key={`${word}-${wi}`} aria-hidden>
                <span className="ph-word">
                  {word.split("").map((char, ci) => {
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

      {/* The logo's heartbeat as the masthead's horizon */}
      <svg
        className="v3-hero__pulse"
        aria-hidden
        focusable="false"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="v3-hero-pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
          fill="none"
          stroke="url(#v3-hero-pulse-fade)"
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
