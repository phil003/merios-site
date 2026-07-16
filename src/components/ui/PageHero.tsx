import type { CSSProperties } from "react";

// PageHero is the entrance hero used across the secondary routes (/about,
// /contact, /compare, /blog, /blog/category/[slug], /tools/*, and the
// LegalPageLayout used by /privacy /terms /security).
//
// v3 (perf): the char-by-char reveal is now pure CSS (.ph-word / .ph-char in
// globals.css) rendered from a SERVER component. The previous Motion variant
// shipped the whole motion/react runtime on every secondary route and — far
// worse — served the H1 with `opacity: 0` inline in the static HTML, so the
// LCP element stayed invisible until hydration finished (10-20s on throttled
// mobile). CSS keyframes start at parse time: same cinematic entrance,
// LCP-safe, zero bundle JS. Reduced motion is honored via the global
// prefers-reduced-motion rules (animations collapse to 0.01ms).

type Align = "left" | "center";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subline?: string;
  align?: Align;
}

const CHAR_STAGGER_S = 0.015;
const CHAR_STAGGER_CAP_S = 0.6; // long titles: don't stretch the cascade forever

export default function PageHero({
  eyebrow,
  title,
  subline,
  align = "left",
}: PageHeroProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  // Split into words so wrapping stays word-level (inline-block chars would
  // otherwise allow mid-word line breaks). Each word is an overflow-hidden
  // mask; each char rises from below with a small cascading delay.
  const words = title.split(" ");
  let charIndex = 0;

  return (
    <section
      className="relative pt-32 pb-16 md:pt-40 md:pb-20"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className={`max-w-[880px] ${alignClass}`}>
          {eyebrow ? (
            <div
              className={`he inline-flex items-center gap-2.5 ${
                align === "center" ? "justify-center" : ""
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-pulse)" }}
              />
              <span
                className="text-[10.5px] uppercase"
                style={{
                  color: "var(--color-green-deep)",
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                }}
              >
                {eyebrow}
              </span>
            </div>
          ) : null}

          <h1
            className="page-hero-title mt-8"
            aria-label={title}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-l)",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
            }}
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
              className="he page-hero-subline mt-8 max-w-[640px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.0625rem, 1.2vw, 1.1875rem)",
                lineHeight: 1.6,
                color: "var(--color-ink-secondary)",
                letterSpacing: "-0.005em",
                "--he-d": "0.2s",
                ...(align === "center"
                  ? { marginLeft: "auto", marginRight: "auto" }
                  : null),
              } as CSSProperties}
            >
              {subline}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
