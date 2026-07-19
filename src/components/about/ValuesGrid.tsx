import type { CSSProperties } from "react";

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

/**
 * Server component — the previous motion/react whileInView stagger is now
 * expressed as per-card `data-rv` reveals with incremental `--rv-delay`
 * (globals.css Reveal v2 + the inline IntersectionObserver in layout.tsx).
 * Cards are visible by default in the static HTML; reduced motion is handled
 * globally (html[data-anim] is never set).
 */
export default function ValuesGrid() {
  return (
    <section
      className="px-6 md:px-10"
      style={{
        borderTop: "1px solid var(--color-grid)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        background: "var(--color-canvas)",
      }}
      aria-labelledby="about-values-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 md:mb-20">
          <div
            className="mb-5 flex items-center gap-2.5"
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
              Principles
            </span>
          </div>

          <h2
            id="about-values-title"
            className="max-w-[26ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
            }}
          >
            Three principles we refuse to compromise on.
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
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
              <div
                className="about-value-card group relative flex h-full flex-col rounded-2xl p-8 md:p-9"
                style={{
                  background: "var(--color-canvas-alt)",
                  border: "1px solid var(--color-grid)",
                }}
              >
                <span
                  aria-hidden
                  className="mb-8 inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                  }}
                >
                  <span
                    className="inline-block h-px w-6"
                    style={{ background: "var(--color-green-deep)" }}
                  />
                  {v.eyebrow}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2vw, 1.875rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  {v.title}
                </h3>

                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "var(--color-ink-secondary)",
                  }}
                >
                  {v.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .about-value-card {
          transition:
            transform 300ms var(--ease-expo),
            box-shadow 300ms var(--ease-expo),
            border-color 300ms var(--ease-expo);
        }
        .about-value-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(
            in srgb,
            var(--color-green-deep) 25%,
            var(--color-grid)
          );
          box-shadow:
            inset 0 0 0 1px
              color-mix(in srgb, var(--color-green-deep) 20%, transparent),
            0 20px 40px -24px
              color-mix(in srgb, var(--color-ink) 14%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .about-value-card,
          .about-value-card:hover {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
