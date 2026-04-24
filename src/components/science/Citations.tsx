"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import Reveal from "@/components/ui/Reveal";
import { duration, easing } from "@/lib/motion";
import { CITATIONS, type Citation } from "./data";

export { CITATIONS };
export type { Citation };

/**
 * Science — Citations.
 *
 * Numbered reference list. Superscripts elsewhere on the page link to #ref-N.
 * Data lives in ./data.ts so it can be imported by the server page for
 * JSON-LD generation without hitting the "use client" boundary.
 */

export default function ScienceCitations() {
  const prefersReducedMotion = useReducedMotion();

  const groupVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.06 },
    },
  };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: duration.quick },
        },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.normal, ease: easing.expo },
        },
      };

  return (
    <section
      id="references"
      aria-labelledby="science-references-heading"
      className="relative border-t py-24 md:py-32"
      style={{
        background: "var(--color-canvas)",
        borderColor: "var(--color-grid)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal amount={0.2}>
          <span
            className="inline-flex items-center gap-2.5"
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
              06 · References
            </span>
          </span>

          <h2
            id="science-references-heading"
            className="mt-6 max-w-[22ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
            }}
          >
            Literature informing the model.
          </h2>

          <p
            className="mt-6 max-w-[620px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
            }}
          >
            An editorial selection — not an exhaustive bibliography. Numbers
            match the superscripts used throughout this page.
          </p>
        </Reveal>

        <motion.ol
          className="mt-14 flex flex-col"
          style={{ counterReset: "ref-counter" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -80px 0px" }}
          variants={groupVariants}
        >
          {CITATIONS.map((c, i) => (
            <motion.li
              key={c.id}
              id={c.id}
              variants={itemVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { backgroundColor: "rgba(14,20,18,0.02)", y: -2 }
              }
              transition={{ duration: duration.quick, ease: easing.expo }}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-t px-2 py-6 md:gap-x-10 md:px-3 md:py-7"
              style={{
                borderColor: "var(--color-grid)",
                ...(i === CITATIONS.length - 1
                  ? { borderBottom: "1px solid var(--color-grid)" }
                  : {}),
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                  minWidth: 28,
                }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1rem, 1.25vw, 1.1875rem)",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  letterSpacing: "-0.005em",
                  color: "var(--color-ink)",
                }}
              >
                {c.authors}{" "}
                <span
                  style={{
                    color: "var(--color-ink-secondary)",
                    fontStyle: "italic",
                  }}
                >
                  {c.title}
                </span>{" "}
                <span style={{ color: "var(--color-ink-secondary)" }}>
                  {c.journal} ({c.year}).
                </span>
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
