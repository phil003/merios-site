import Reveal from "@/components/ui/Reveal";

/**
 * Science — Advisory board.
 *
 * Three editorial placeholder advisor cards. Names + affiliations are
 * placeholders aligned with the home teaser (Dr. L. Marchetti).
 * Phase 4: confirm real names and headshots with the founders.
 */

export type Advisor = {
  name: string;
  initials: string;
  credentials: string;
  specialty: string;
  affiliation: string;
  bio: string;
};

export const ADVISORS: Advisor[] = [
  {
    name: "Dr. L. Marchetti",
    initials: "LM",
    credentials: "MD PhD",
    specialty: "Preventive cardiology",
    affiliation: "Clinical advisor · Merios",
    bio: "Twenty years in lipidology and early cardiovascular disease. Co-author of work on particle-number risk stratification and Apo-B-first screening.",
  },
  {
    name: "Dr. S. Ardent",
    initials: "SA",
    credentials: "MD PhD",
    specialty: "Endocrinology",
    affiliation: "Scientific advisor · Merios",
    bio: "Clinical endocrinologist with a research focus on insulin resistance, thyroid dynamics and longitudinal hormone reference intervals.",
  },
  {
    name: "Dr. E. Kohl",
    initials: "EK",
    credentials: "MD PhD",
    specialty: "Preventive medicine",
    affiliation: "Scientific advisor · Merios",
    bio: "Preventive medicine physician and biostatistician. Works on composite risk indices and the translation of trial data into consumer-grade scores.",
  },
];

export default function ScienceAdvisoryBoard() {
  return (
    <section
      id="advisors"
      aria-labelledby="science-advisors-heading"
      className="relative border-t py-24 md:py-32"
      style={{
        background: "var(--color-canvas-alt)",
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
              05 · Reviewed by
            </span>
          </span>

          <h2
            id="science-advisors-heading"
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
            A board of MDs and PhDs.
          </h2>

          <p
            className="mt-6 max-w-[620px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
            }}
          >
            The methodology, thresholds and literature base of Merios are
            reviewed by practicing clinicians and researchers. No single-person
            decisions; every scoring rule survives a three-reviewer sign-off.
          </p>
        </Reveal>

        <Reveal amount={0.15} delay={0.1}>
          <ul
            className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
            role="list"
          >
            {ADVISORS.map((a) => (
              <li
                key={a.name}
                className="flex flex-col rounded-2xl p-7 md:p-8"
                style={{
                  background: "var(--color-canvas)",
                  border: "1px solid var(--color-grid)",
                }}
              >
                {/* Portrait placeholder — initials in a mono circle */}
                <div
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: "var(--color-canvas-alt)",
                    border: "1px solid var(--color-grid)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    letterSpacing: "0.04em",
                    color: "var(--color-ink)",
                    fontWeight: 500,
                  }}
                >
                  {a.initials}
                </div>

                <h3
                  className="mt-8"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "var(--color-ink)",
                    lineHeight: 1.15,
                  }}
                >
                  {a.name},{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      letterSpacing: "0.06em",
                      color: "var(--color-ink-tertiary)",
                      fontWeight: 500,
                    }}
                  >
                    {a.credentials}
                  </span>
                </h3>

                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--color-ink-secondary)",
                    letterSpacing: "0.005em",
                  }}
                >
                  {a.specialty}
                </p>

                <p
                  className="mt-6"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "var(--color-ink-secondary)",
                  }}
                >
                  {a.bio}
                </p>

                <p
                  className="mt-auto pt-6"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                  }}
                >
                  {a.affiliation}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
