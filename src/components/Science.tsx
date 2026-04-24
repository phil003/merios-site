import Reveal from "./ui/Reveal";

const REFERENCES = [
  "The Lancet",
  "Nature Medicine",
  "NEJM",
  "JAMA",
  "Cell Metabolism",
];

export default function Science() {
  return (
    <section
      id="science"
      className="relative py-24 md:py-32"
      style={{ background: "var(--color-canvas)" }}
      aria-label="The science behind Merios"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal amount={0.25}>
          <div
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
              The science
            </span>
          </div>

          <figure className="mt-10">
            <blockquote
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem, 3.6vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.18,
                letterSpacing: "-0.018em",
                color: "var(--color-ink)",
                maxWidth: "920px",
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
              Biomarkers in isolation are almost always misleading. The signal
              lives in the system — in convergence, trajectory, and time. A
              single composite is how clinicians already think; it is how
              consumer health finally should.
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
              className="mt-10 flex flex-col gap-1"
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

        <Reveal amount={0.2} delay={0.15}>
          <div
            className="mt-20 flex flex-col gap-5 pt-10"
            style={{ borderTop: "1px solid var(--color-grid)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-ink-tertiary)",
              }}
            >
              Literature informing the model
            </span>
            <ul className="flex flex-wrap gap-x-10 gap-y-3">
              {REFERENCES.map((r) => (
                <li
                  key={r}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "var(--color-ink-secondary)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
