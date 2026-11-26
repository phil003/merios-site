import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import { ADVISORS, type Advisor } from "./data";
import styles from "./science.module.css";

export { ADVISORS };
export type { Advisor };

/**
 * Science — Clinical review (v2 "Open Sky").
 *
 * "Not done yet", said plainly: a glass card with empty seats (dashed,
 * decorative) and the open engagement from ./data.ts. Never a name, a face
 * or a credential until a review is actually done. Server component; card
 * reveals use the shared data-rv mechanism.
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
          <span>05 · Clinical review</span>
        </span>

        <h2 id="science-advisors-heading" className={styles.title}>
          Clinical review: <em>not done yet.</em>
        </h2>

        <p className={styles.lead}>
          As of November 2026, no practicing clinician has reviewed the
          methodology, thresholds or literature base of Merios. Merios is a
          preventive health platform, not a medical device.
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
            <div className={styles.advisor}>
              <div aria-hidden className={styles.seats}>
                <span className={styles.seat}>Open seat</span>
                <span className={styles.seat}>Open seat</span>
                <span className={styles.seat}>Open seat</span>
              </div>

              <div className={styles.advisorBody}>
                <h3 className={styles.advisorName}>
                  {a.name},{" "}
                  <span className={styles.advisorCreds}>{a.credentials}</span>
                </h3>
                <p className={styles.advisorSpecialty}>{a.specialty}</p>
                <p className={styles.advisorBio}>{a.bio}</p>
                {a.affiliation ? (
                  <p className={styles.advisorAffil}>{a.affiliation}</p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
