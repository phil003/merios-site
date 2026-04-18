import Reveal from "@/components/ui/Reveal";

/**
 * Science — Thesis.
 *
 * The composite-score argument: a pull quote plus a two-column editorial
 * expansion. Superscripts reference citations rendered in <Citations />.
 */
export default function ScienceThesis() {
  return (
    <section
      id="thesis"
      aria-labelledby="science-thesis-heading"
      className="relative border-t py-24 md:py-32"
      style={{
        background: "var(--color-canvas)",
        borderColor: "var(--color-grid)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal amount={0.2}>
          <span
            className="inline-flex items-center gap-2.5"
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
              01 · Thesis
            </span>
          </span>

          <h2
            id="science-thesis-heading"
            className="mt-6 max-w-[22ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
            }}
          >
            A biomarker in isolation is almost always misleading.
          </h2>
        </Reveal>

        <Reveal amount={0.2} delay={0.1}>
          <figure className="mt-16 max-w-[960px]">
            <blockquote
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 2.8vw, 2.25rem)",
                fontWeight: 300,
                lineHeight: 1.22,
                letterSpacing: "-0.015em",
                color: "var(--color-ink)",
              }}
            >
              <span
                aria-hidden
                style={{
                  color: "var(--color-green-deep)",
                  opacity: 0.55,
                  marginRight: "0.12em",
                }}
              >
                &ldquo;
              </span>
              The signal lives in the system — in convergence, trajectory, and
              time. A single composite is how clinicians already think; it is
              how consumer health finally should.
              <span
                aria-hidden
                style={{
                  color: "var(--color-green-deep)",
                  opacity: 0.55,
                  marginLeft: "0.05em",
                }}
              >
                &rdquo;
              </span>
            </blockquote>
            <figcaption
              className="mt-8 flex flex-col gap-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  letterSpacing: "-0.005em",
                }}
              >
                Dr. L. Marchetti, MD&nbsp;PhD
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--color-ink-tertiary)",
                  letterSpacing: "0.01em",
                }}
              >
                Preventive cardiology · Clinical advisor
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal amount={0.15} delay={0.15}>
          <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-x-16">
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-headline)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  color: "var(--color-ink)",
                }}
              >
                Why single markers fail.
              </h3>
              <p
                className="mt-5"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "var(--color-ink-secondary)",
                }}
              >
                A normal LDL with a high Apo-B is not normal. An in-range HbA1c
                with elevated fasting insulin is not in range. Reference
                intervals are defined against a population that is itself
                largely metabolically unwell
                <sup aria-describedby="ref-1">
                  <a
                    href="#ref-1"
                    aria-label="Reference 1"
                    style={{ color: "var(--color-green-deep)" }}
                  >
                    1
                  </a>
                </sup>
                — so normal flags are a low bar, not a goal.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-headline)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  color: "var(--color-ink)",
                }}
              >
                Why a composite works.
              </h3>
              <p
                className="mt-5"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Composite indices reduce noise, capture system-level risk, and
                track meaningful change over time. They are the statistical
                spine of landmark work on biological age and cardiometabolic
                risk stratification
                <sup aria-describedby="ref-2">
                  <a
                    href="#ref-2"
                    aria-label="Reference 2"
                    style={{ color: "var(--color-green-deep)" }}
                  >
                    2
                  </a>
                </sup>
                . Merios is built on that foundation.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
