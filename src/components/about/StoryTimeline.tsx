import type { CSSProperties } from "react";

import styles from "./about.module.css";

interface Milestone {
  date: string;
  title: string;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    date: "2025",
    title: "Idea born",
    description:
      "The vision crystallizes. A single platform to connect every health signal and turn the noise into a composite score.",
  },
  {
    date: "Q1 2026",
    title: "Development begins",
    description:
      "Engineering kicks off. Biomarker analysis engine, privacy-first architecture, and the four-pillar scoring model take shape.",
  },
  {
    date: "Q2 2026",
    title: "Beta launch",
    description:
      "Early access opens to a limited cohort. We gather signal, iterate on the score, and tune the experience.",
  },
  {
    date: "Q3 2026",
    title: "Public launch",
    description:
      "Merios opens to everyone. A decade of health intelligence, in a single place you actually own.",
  },
];

/**
 * Server component — the previous motion/react whileInView stagger is now
 * expressed as per-milestone `data-rv` reveals with incremental `--rv-delay`
 * (globals.css Reveal v2 + the inline IntersectionObserver in layout.tsx).
 * Content is visible by default in the static HTML; reduced motion is handled
 * globally (html[data-anim] is never set).
 *
 * v3: a night chapter. The four milestones sit on one line — the logo's
 * heartbeat — calm until the beat that leads to launch, which lands on the
 * lime dot (desktop: horizontal; mobile: a vertical rail).
 */
export default function StoryTimeline() {
  return (
    <section
      className={`night ${styles.story}`}
      data-nav="dark"
      aria-labelledby="about-story-title"
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={`label ${styles.storyEyebrow}`}>
            <span aria-hidden className="label-dot" />
            <span>Story</span>
          </div>

          <h2
            id="about-story-title"
            className={`${styles.title} ${styles.storyTitle}`}
          >
            Four quiet milestones.
          </h2>
        </div>

        <ol className={styles.timeline}>
          {MILESTONES.map((m, i) => {
            const isLast = i === MILESTONES.length - 1;
            const leadsToLaunch = i === MILESTONES.length - 2;
            return (
              <li
                key={m.date}
                data-rv=""
                data-beat={leadsToLaunch ? "true" : undefined}
                className={styles.milestone}
                style={
                  {
                    "--rv-delay": `${(0.05 + i * 0.1).toFixed(2)}s`,
                  } as CSSProperties
                }
              >
                <span
                  aria-hidden
                  className={`${styles.node} ${isLast ? styles.nodeNow : ""}`}
                />
                {leadsToLaunch ? (
                  <svg
                    className={styles.beat}
                    viewBox="0 0 300 66"
                    preserveAspectRatio="none"
                    aria-hidden
                    focusable="false"
                  >
                    <path
                      d="M0 33 H170 L182 41 L198 6 L218 62 L230 33 H300"
                      fill="none"
                      stroke="rgb(255 255 255 / 0.62)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                ) : null}

                <div className={styles.date}>{m.date}</div>

                <div>
                  <h3 className={styles.milestoneTitle}>{m.title}</h3>
                  <p className={styles.milestoneCopy}>{m.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
