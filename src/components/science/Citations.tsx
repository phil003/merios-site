import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import { CITATIONS, type Citation } from "./data";
import styles from "./science.module.css";

export { CITATIONS };
export type { Citation };

/**
 * Science — Citations.
 *
 * Numbered reference list. Superscripts elsewhere on the page link to #ref-N.
 * Server component: row reveals use the shared data-rv mechanism with a 60ms
 * incremental --rv-delay (capped so deep rows never lag their own viewport
 * entry); the hover tint/lift is a pure CSS transition. Data lives in
 * ./data.ts so it can be imported by the server page for JSON-LD generation.
 *
 * v3: numbers as ink chips with lime numerals (the editorial list counter),
 * Newsreader for the reference itself; a reference reached from a superscript
 * (:target) is lit with a lime edge.
 */

export default function ScienceCitations() {
  return (
    <section
      id="references"
      aria-labelledby="science-references-heading"
      className={styles.chapter}
    >
      <Reveal amount={0.2}>
        <span className={`label ${styles.eyebrow}`}>
          <span aria-hidden className="label-dot label-dot--ink" />
          <span>06 · References</span>
        </span>

        <h2 id="science-references-heading" className={styles.title}>
          Literature informing the model.
        </h2>

        <p className={styles.lead}>
          An editorial selection — not an exhaustive bibliography. Numbers
          match the superscripts used throughout this page.
        </p>
      </Reveal>

      <ol className={styles.refs} style={{ counterReset: "ref-counter" }}>
        {CITATIONS.map((c, i) => (
          <li
            key={c.id}
            id={c.id}
            data-rv=""
            className={styles.refItem}
            style={
              i > 0
                ? ({
                    "--rv-delay": `${Math.min(i * 0.06, 0.3)}s`,
                  } as CSSProperties)
                : undefined
            }
          >
            {/* Hover tint lives on this inner div so it never fights the
                data-rv transform/transition on the <li>. */}
            <div className={styles.refRow}>
              <span className={styles.refNum} aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={styles.refText}>
                {c.authors}{" "}
                <span className={styles.refTitle}>{c.title}</span>{" "}
                <span className={styles.refJournal}>
                  {c.journal} ({c.year}).
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
