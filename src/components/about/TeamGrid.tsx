import type { CSSProperties } from "react";

import styles from "./about.module.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

// The second slot is presented as an open role rather than a fictive person:
// no clinician has joined. It is replaced by a named advisor only once one
// actually has (never invent one).
const TEAM: TeamMember[] = [
  {
    name: "Philippe Tohme",
    role: "Founder · PharmD",
    initials: "PT",
    bio: "Building Merios after years of watching fragmented health data erode its own value. Obsessed with clarity, privacy, and signal over noise.",
  },
  {
    name: "Clinical Advisory",
    role: "Open Role",
    initials: "CA",
    bio: "This seat is open. We're looking for a practicing clinician to review our scoring models and reference ranges — reach out if this is you.",
  },
];

/**
 * Server component. Open Sky: a filled seat is a white card whose portrait
 * tile is a soft sky plate with Newsreader initials over a thin horizon line;
 * the open seat is drawn as a dashed, empty card (the same language as the
 * "not included" card on /pricing). Reveals are the CSS `data-rv` ones.
 */
export default function TeamGrid() {
  return (
    <section className={styles.section} aria-labelledby="about-team-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Team</p>
          <h2 id="about-team-title" className={styles.h2}>
            Small team. <em>Editorial standards.</em>
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
                <div className={`${styles.member} ${open ? styles.memberOpen : ""}`}>
                  <div
                    aria-hidden
                    className={`${styles.portrait} ${open ? styles.portraitOpen : ""}`}
                  >
                    {open ? null : (
                      <svg
                        className={styles.portraitPulse}
                        viewBox="0 0 168 26"
                        preserveAspectRatio="none"
                        focusable="false"
                      >
                        <path
                          d="M0 13 H150"
                          fill="none"
                          stroke="#6E8FE8"
                          strokeOpacity="0.55"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle cx="150" cy="13" r="3.2" fill="#6E8FE8" />
                      </svg>
                    )}
                    <span className={styles.initials}>{member.initials}</span>
                  </div>

                  <div className={styles.memberText}>
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
