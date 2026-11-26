import type { ResolvedSource } from "@/lib/sources";
import styles from "./article.module.css";

/**
 * Numbered source list at the end of an article — the target of every inline
 * <Cite /> superscript. Open Sky: one column of hairline rows (long paper
 * titles read in a few lines, not five or six), the number in Newsreader,
 * the linked title in ink. Papers read like a journal reference (authors,
 * title, journal, year), then their PubMed id and a DOI pill on their own
 * line (a full-size tap target). Web sources (guidelines, fact sheets) show
 * their publisher. Each entry is an anchor (#source-id), so a superscript
 * lands on its reference, highlighted by :target.
 */
export default function ArticleSources({
  sources,
  checkedOn,
}: {
  sources: ResolvedSource[];
  /** ISO date the sources were last checked (the article's dateModified). */
  checkedOn?: string;
}) {
  if (sources.length === 0) return null;
  const checked = checkedOn
    ? new Date(`${checkedOn}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;

  return (
    <section
      id="sources"
      aria-labelledby="sources-title"
      className={styles.sources}
    >
      <h2 id="sources-title" className={styles.blockTitle}>
        Sources
      </h2>
      <p className={styles.sourcesNote}>
        {sources.length} {sources.length === 1 ? "reference" : "references"}
        {checked ? ` · checked ${checked}` : ""}
      </p>
      <ol className={styles.sourcesList}>
        {sources.map((source) => (
          <li
            key={source.id}
            id={`source-${source.id}`}
            className={styles.sourcesItem}
          >
            <span aria-hidden className={styles.sourcesNum}>
              {source.number}
            </span>
            <span className={styles.sourcesText}>
              {source.authors ? <>{source.authors} </> : null}
              <a
                href={source.url}
                className={styles.sourceTitle}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.title}
              </a>
              {source.container || source.year ? (
                <>
                  .{" "}
                  <span className={styles.sourceContainer}>
                    {[source.container, source.year].filter(Boolean).join(", ")}
                  </span>
                  .
                </>
              ) : null}
              {source.kind === "paper" && (source.pmid || source.doi) ? (
                <span className={styles.sourceIds}>
                  {source.pmid ? <span>PMID {source.pmid}</span> : null}
                  {source.doi ? (
                    <a
                      href={`https://doi.org/${source.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceDoi}
                    >
                      DOI
                      <span aria-hidden className={styles.sourceDoiArrow}>
                        ↗
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
