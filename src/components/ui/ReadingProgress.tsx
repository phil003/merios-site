"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";

/**
 * Reading-progress bar. Sticky top of the viewport, scales with scroll.
 * Hidden under prefers-reduced-motion.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 right-0 z-40 h-[2px] origin-left"
      style={{
        background: "var(--color-green-deep)",
        scaleX: scrollYProgress,
        opacity: prefersReducedMotion ? 0 : 1,
      }}
    />
  );
}
