"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { easing, duration } from "@/lib/motion";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

// Only one public founder exists in the current copy. The second slot is a
// placeholder editorial card until the team page is populated post-launch.
const TEAM: TeamMember[] = [
  {
    name: "Philippe Xiddo",
    role: "Founder & Engineer",
    initials: "PX",
    bio: "Building Merios after years of watching fragmented health data erode its own value. Obsessed with clarity, privacy, and signal over noise.",
  },
  {
    name: "[Team member — placeholder]",
    role: "Clinical Advisor",
    initials: "—",
    bio: "A clinical voice shaping our scoring models, reference ranges, and medical review pipeline. Roster expands before public launch.",
  },
];

export default function TeamGrid() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0, duration: duration.quick },
        },
      }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.09, delayChildren: 0.05 },
        },
      };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.slow, ease: easing.expo },
        },
      };

  return (
    <section
      className="px-6 md:px-10"
      style={{
        borderTop: "1px solid var(--color-grid)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        background: "var(--color-canvas)",
      }}
      aria-labelledby="about-team-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 md:mb-20">
          <div
            className="mb-5 flex items-center gap-2.5"
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
              Team
            </span>
          </div>

          <h2
            id="about-team-title"
            className="max-w-[24ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
            }}
          >
            Small team. Editorial standards.
          </h2>
        </div>

        <motion.ul
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
          variants={containerVariants}
        >
          {TEAM.map((member) => (
            <motion.li
              key={member.name}
              variants={itemVariants}
              className="flex flex-col gap-6 md:flex-row md:gap-8"
            >
              <div
                aria-hidden
                className="relative aspect-square w-full max-w-[200px] flex-shrink-0 overflow-hidden rounded-2xl md:w-[180px]"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--color-green-deep) 8%, var(--color-canvas-alt)), var(--color-canvas-alt))",
                  border: "1px solid var(--color-grid)",
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.04em",
                    color:
                      "color-mix(in srgb, var(--color-green-deep) 60%, transparent)",
                  }}
                >
                  {member.initials}
                </span>
              </div>

              <div className="flex flex-col justify-center">
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2vw, 1.875rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  {member.name}
                </h3>

                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                  }}
                >
                  {member.role}
                </p>

                <p
                  className="mt-4 max-w-[44ch]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: "var(--color-ink-secondary)",
                  }}
                >
                  {member.bio}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
