import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import { ADVISORS, type Advisor } from "./data";
import styles from "./science.module.css";

export { ADVISORS };
export type { Advisor };

/**
 * Science — Advisory board.
 *
 * Server component: card reveals use the shared data-rv mechanism with a
 * 60ms incremental --rv-delay; the hover lift is a pure CSS transition
 * (disabled under prefers-reduced-motion). Data lives in ./data.ts so it can
 * be imported by the server page for JSON-LD generation.
 *
 * v3: white cards; initials on a lilac pop tile; the card lays itself out in
 * two columns once it is wide enough (container query), so one card or many
 * both read well.
 */

export default function ScienceAdvisoryBoard() {
  return (
    <section
      id="advisors"
      aria-labelledby="science-advisors-heading"
      className={styles.chapter}
    >
      <Reveal amount={0.2}>
        <span className={`label ${styles.eyebrow}`}>
          <span aria-hidden className="label-dot label-dot--ink" />
          <span>05 · Reviewed by</span>
        </span>

        <h2 id="science-advisors-heading" className={styles.title}>
          Reviewed by clinicians.
        </h2>

        <p className={styles.lead}>
          The methodology, thresholds and literature base of Merios will be
          reviewed by practising clinicians and researchers ahead of public
          launch. No single-person decisions; every scoring rule survives a
          three-reviewer sign-off.
        </p>
      </Reveal>

      <ul className={styles.advisors} role="list">
        {ADVISORS.map((a, i) => (
          <li
            key={a.name}
            data-rv=""
            style={
              i > 0
                ? ({ "--rv-delay": `${i * 0.06}s` } as CSSProperties)
                : undefined
            }
          >
            {/* Hover lift lives on this inner div so it never fights the
                data-rv transform/transition on the <li>. */}
            <div className={styles.advisor}>
              <div className={styles.advisorInner}>
                <div className={styles.advisorWho}>
                  {/* Portrait placeholder — initials on a pop tile */}
                  <div aria-hidden className={styles.advisorTile}>
                    {a.initials}
                  </div>

                  <h3 className={styles.advisorName}>
                    {a.name},{" "}
                    <span className={styles.advisorCreds}>
                      {a.credentials}
                    </span>
                  </h3>

                  <p className={styles.advisorSpecialty}>{a.specialty}</p>
                </div>

                <div>
                  <p className={styles.advisorBio}>{a.bio}</p>

                  <p className={styles.advisorAffil}>{a.affiliation}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
