import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import { CITATIONS, type Citation } from "./data";
import styles from "./science.module.css";

export { CITATIONS };
export type { Citation };

/**
 * Science — Citations (v2 "Open Sky").
 *
 * Numbered reference list on glass rows. Superscripts elsewhere on the page
 * link to #ref-N; the row reached that way (:target) turns white with a
 * zenith edge. Server component: row reveals use the shared data-rv
 * mechanism with a capped 60ms incremental --rv-delay. Data lives in
 * ./data.ts so the server page can build its JSON-LD from it.
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
          Literature informing <em>the model.</em>
        </h2>

        <p className={styles.lead}>
          An editorial selection — not an exhaustive bibliography. Numbers
          match the superscripts used throughout this page.
        </p>
      </Reveal>

      <ol className={styles.refs}>
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
