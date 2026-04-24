"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { easing, duration } from "@/lib/motion";

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

export default function StoryTimeline() {
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
          transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
      };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 28 },
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
      aria-labelledby="about-story-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr] md:gap-20">
          <div>
            <div
              className="flex items-center gap-2.5"
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
                Story
              </span>
            </div>

            <h2
              id="about-story-title"
              className="mt-6"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-headline)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
              }}
            >
              Four quiet milestones.
            </h2>
          </div>

          <motion.ol
            className="relative max-w-[680px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
            variants={containerVariants}
          >
            <span
              aria-hidden
              className="absolute left-0 top-2 bottom-2 w-px"
              style={{ background: "var(--color-grid)" }}
            />

            {MILESTONES.map((m) => (
              <motion.li
                key={m.date}
                variants={itemVariants}
                className="relative grid grid-cols-[120px_1fr] gap-6 pb-12 pl-8 last:pb-0 md:grid-cols-[140px_1fr] md:gap-10"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[7px] inline-block h-1.5 w-1.5 -translate-x-[3px] rounded-full"
                  style={{
                    background: "var(--color-green-deep)",
                    boxShadow:
                      "0 0 0 4px color-mix(in srgb, var(--color-canvas) 100%, transparent)",
                  }}
                />

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                    paddingTop: 2,
                  }}
                >
                  {m.date}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-title)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: "-0.015em",
                      color: "var(--color-ink)",
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[52ch]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    {m.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
