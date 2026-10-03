import type { CSSProperties } from "react";

import styles from "./about.module.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

// The second slot is presented as an open role rather than a fictive person.
// Roster expands ahead of public launch; the advisory card gets replaced with
// a named advisor once the engagement is announced.
const TEAM: TeamMember[] = [
  {
    name: "Philippe Xiddo",
    role: "Founder & Engineer",
    initials: "PX",
    bio: "Building Merios after years of watching fragmented health data erode its own value. Obsessed with clarity, privacy, and signal over noise.",
  },
  {
    name: "Clinical Advisory",
    role: "Open Role — 2026",
    initials: "CA",
    bio: "A clinical voice shapes our scoring models, reference ranges, and medical review pipeline. We're engaging clinicians before launch — reach out if this is you.",
  },
];

/**
 * Server component — the previous motion/react whileInView stagger is now
 * expressed as per-member `data-rv` reveals with incremental `--rv-delay`
 * (globals.css Reveal v2 + the inline IntersectionObserver in layout.tsx).
 * Content is visible by default in the static HTML; reduced motion is handled
 * globally (html[data-anim] is never set).
 *
 * v3: white cards. A filled seat gets a night tile with chrome initials over
 * the logo's pulse; an open seat is drawn as a dashed, empty tile.
 */
export default function TeamGrid() {
  return (
    <section className={styles.section} aria-labelledby="about-team-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={`label ${styles.eyebrow}`}>
            <span aria-hidden className="label-dot label-dot--ink" />
            <span>Team</span>
          </div>

          <h2 id="about-team-title" className={styles.title}>
            Small team. Editorial standards.
          </h2>
        </div>

        <ul className={styles.team}>
          {TEAM.map((member, i) => {
            const open = /open role/i.test(member.role);
            return (
              <li
                key={member.name}
                data-rv=""
                style={
                  {
                    "--rv-delay": `${(0.05 + i * 0.09).toFixed(2)}s`,
                  } as CSSProperties
                }
              >
                <div className={styles.member}>
                  <div
                    aria-hidden
                    className={`${styles.portrait} ${open ? styles.portraitOpen : `night ${styles.portraitNight}`}`}
                  >
                    {open ? null : (
                      <svg
                        className={styles.portraitPulse}
                        viewBox="0 0 168 26"
                        preserveAspectRatio="none"
                        focusable="false"
                      >
                        <path
                          d="M0 13 H96 L102 18 L109 3 L118 24 L123 13 H150"
                          fill="none"
                          stroke="rgb(255 255 255 / 0.32)"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle cx="150" cy="13" r="3.2" fill="#D6F050" />
                      </svg>
                    )}
                    <span className={`${styles.initials} ${open ? "" : "chrome-text"}`}>
                      {member.initials}
                    </span>
                  </div>

                  <div>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    <p className={styles.memberBio}>{member.bio}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
