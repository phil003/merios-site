import Reveal from "@/components/ui/Reveal";

/**
 * Science — Citations.
 *
 * Numbered reference list. Superscripts elsewhere on the page link to #ref-N.
 * Placeholder entries styled as "Author et al. Title. Journal (Year)."
 * Phase 4: replace placeholders with the real bibliography curated by the
 * clinical team and match DOIs.
 */

export type Citation = {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi?: string;
};

export const CITATIONS: Citation[] = [
  {
    id: "ref-1",
    authors: "Rose G.",
    title: "Sick individuals and sick populations.",
    journal: "International Journal of Epidemiology",
    year: 1985,
  },
  {
    id: "ref-2",
    authors: "Sniderman A. D. et al.",
    title:
      "Apolipoprotein B particles and cardiovascular disease: a narrative review.",
    journal: "JAMA Cardiology",
    year: 2019,
  },
  {
    id: "ref-3",
    authors: "Levine M. E. et al.",
    title:
      "An epigenetic biomarker of aging for lifespan and healthspan (PhenoAge).",
    journal: "Aging",
    year: 2018,
  },
  {
    id: "ref-4",
    authors: "Lauer M. S., D'Agostino R. B.",
    title:
      "The randomized registry trial — the next disruptive technology in clinical research?",
    journal: "New England Journal of Medicine",
    year: 2013,
  },
  {
    id: "ref-5",
    authors: "Taddei S. et al.",
    title:
      "Inflammation, oxidative stress, and endothelial dysfunction in cardiometabolic disease.",
    journal: "The Lancet",
    year: 2019,
  },
  {
    id: "ref-6",
    authors: "Després J.-P.",
    title:
      "Body fat distribution and risk of cardiovascular disease: an update.",
    journal: "Circulation",
    year: 2012,
  },
  {
    id: "ref-7",
    authors: "Horvath S.",
    title: "DNA methylation age of human tissues and cell types.",
    journal: "Genome Biology",
    year: 2013,
  },
  {
    id: "ref-8",
    authors: "Ridker P. M. et al.",
    title:
      "Antiinflammatory therapy with canakinumab for atherosclerotic disease (CANTOS).",
    journal: "New England Journal of Medicine",
    year: 2017,
  },
];

export default function ScienceCitations() {
  return (
    <section
      id="references"
      aria-labelledby="science-references-heading"
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
              06 · References
            </span>
          </span>

          <h2
            id="science-references-heading"
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
            Literature informing the model.
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
            An editorial selection — not an exhaustive bibliography. Numbers
            match the superscripts used throughout this page.
          </p>
        </Reveal>

        <Reveal amount={0.15} delay={0.1}>
          <ol
            className="mt-14 flex flex-col"
            style={{ counterReset: "ref-counter" }}
          >
            {CITATIONS.map((c, i) => (
              <li
                key={c.id}
                id={c.id}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-t py-6 md:gap-x-10 md:py-7"
                style={{
                  borderColor: "var(--color-grid)",
                  ...(i === CITATIONS.length - 1
                    ? { borderBottom: "1px solid var(--color-grid)" }
                    : {}),
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                    minWidth: 28,
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1rem, 1.25vw, 1.1875rem)",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    letterSpacing: "-0.005em",
                    color: "var(--color-ink)",
                  }}
                >
                  {c.authors}{" "}
                  <span
                    style={{
                      color: "var(--color-ink-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    {c.title}
                  </span>{" "}
                  <span style={{ color: "var(--color-ink-secondary)" }}>
                    {c.journal} ({c.year}).
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
