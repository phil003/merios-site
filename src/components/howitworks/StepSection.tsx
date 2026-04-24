"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { duration, easing } from "@/lib/motion";

/**
 * StepSection — shared wrapper for the three deep sub-sections on
 * /how-it-works (Connect / Understand / Act).
 *
 * Responsibilities:
 *   - Provides the anchor `id` + `tabIndex={-1}` so StickyLateralNav can
 *     focus the section after an anchor click (accessible keyboard jump).
 *   - Exposes a `data-hiw-section` hook the sticky-nav observer uses to
 *     discover sections without leaning on fragile selectors.
 *   - Renders the canonical eyebrow → headline → lead header, then the
 *     section-specific `children`.
 *
 * Phase 4 polish:
 *   - Fade-up on enter uses Motion's `useInView` + variants directly
 *     (was wrapped in <Reveal>). This removes a layout wrapper node and
 *     keeps the animation self-contained.
 *   - Optional step number counter animates 0 → `stepNumber` on enter
 *     using Motion's `animate()`. Pass `stepNumber` to enable it; when
 *     absent, the static eyebrow renders as before.
 *   - All motion is gated by `useReducedMotion()` — when reduced, children
 *     render immediately visible with no y-offset, no counter tween.
 */

export interface StepSectionProps {
  id: "connect" | "understand" | "act";
  eyebrow: string;
  /** If provided, a small numeric counter animates 0 → stepNumber on enter. */
  stepNumber?: number;
  headline: ReactNode;
  lead: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function StepSection({
  id,
  eyebrow,
  stepNumber,
  headline,
  lead,
  children,
  className,
}: StepSectionProps) {
  const headlineId = `hiw-${id}-headline`;
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -80px 0px",
  });

  // Step number counter (0 → stepNumber) driven by Motion's `animate()`.
  const counterRef = useRef<HTMLSpanElement>(null);
  const [counterReady, setCounterReady] = useState(false);

  useEffect(() => {
    if (stepNumber === undefined) return;
    if (!inView) return;
    const el = counterRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = String(stepNumber).padStart(2, "0");
      setCounterReady(true);
      return;
    }

    const controls = animate(0, stepNumber, {
      duration: duration.slow,
      ease: easing.expo,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v)).padStart(2, "0");
      },
      onComplete: () => {
        el.textContent = String(stepNumber).padStart(2, "0");
      },
    });
    setCounterReady(true);
    return () => controls.stop();
  }, [inView, prefersReducedMotion, stepNumber]);

  const headerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: duration.quick, staggerChildren: 0.05 },
        },
      }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: duration.slow,
            ease: easing.expo,
            staggerChildren: 0.08,
          },
        },
      };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: duration.quick } },
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
      id={id}
      tabIndex={-1}
      aria-labelledby={headlineId}
      data-hiw-section={id}
      className={[
        "relative scroll-mt-28 py-24 md:py-32 focus:outline-none",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.div
        ref={sectionRef}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <div className="max-w-[720px]">
          <motion.div
            className="inline-flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-mono)" }}
            variants={itemVariants}
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
              {stepNumber !== undefined ? (
                <>
                  Step{" "}
                  <span
                    ref={counterRef}
                    className="tabular-nums"
                    // Keep a zero placeholder until the counter begins to
                    // avoid layout shift when it mounts.
                    aria-hidden={!counterReady}
                  >
                    00
                  </span>{" "}
                  — {eyebrow}
                </>
              ) : (
                eyebrow
              )}
            </span>
          </motion.div>

          <motion.h2
            id={headlineId}
            className="mt-6"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
            }}
            variants={itemVariants}
          >
            {headline}
          </motion.h2>

          <motion.p
            className="mt-6 max-w-[560px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
            }}
            variants={itemVariants}
          >
            {lead}
          </motion.p>
        </div>
      </motion.div>

      <div className="mt-14 md:mt-20">{children}</div>
    </section>
  );
}
