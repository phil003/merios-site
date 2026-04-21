"use client";

/**
 * SvgPictogram — shared 44×44 line-art primitive used across /how-it-works.
 *
 * All variants share:
 *   - viewBox="0 0 44 44"
 *   - stroke="currentColor" (colour is controlled by parent `style={{ color }}`)
 *   - stroke-width 1.25
 *   - round joins/caps for soft editorial feel
 *
 * Phase 4 polish:
 *   - Subtle reveal on enter (fade + slight scale) driven by Motion's
 *     `useInView`. Kept minimal — no over-animation. Fully gated by
 *     `useReducedMotion()`: when reduced, the SVG is immediately visible
 *     with no transform.
 *
 * Add new variants by extending the discriminated union below.
 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/motion";

export type PictogramVariant =
  | "apple-health"
  | "ocr"
  | "manual"
  | "score"
  | "trend"
  | "alert"
  | "protocol"
  | "leverage"
  | "followup";

type Props = {
  variant: PictogramVariant;
  title?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

const STROKE_WIDTH = 1.25;

function Paths({ variant }: { variant: PictogramVariant }) {
  switch (variant) {
    case "apple-health":
      // Heart outline — Apple Health echo.
      return (
        <path
          d="M22 34 C12 27 6 22 6 16 A7 7 0 0 1 22 14 A7 7 0 0 1 38 16 C38 22 32 27 22 34 Z"
          fill="none"
        />
      );
    case "ocr":
      // Document with scan line + frame corners.
      return (
        <g fill="none">
          <path d="M12 8 H28 L34 14 V36 H12 Z" />
          <path d="M28 8 V14 H34" />
          <path d="M16 20 H28" />
          <path d="M16 25 H26" />
          <path d="M16 30 H24" />
          <path d="M8 22 H38" opacity="0.45" />
        </g>
      );
    case "manual":
      // Pencil writing on a line.
      return (
        <g fill="none">
          <path d="M8 34 H36" />
          <path d="M14 28 L28 14 L32 18 L18 32 Z" />
          <path d="M26 16 L30 20" />
        </g>
      );
    case "score":
      // Concentric rings (single score).
      return (
        <g fill="none">
          <circle cx="22" cy="22" r="15" opacity="0.35" />
          <circle cx="22" cy="22" r="10" opacity="0.65" />
          <circle cx="22" cy="22" r="5" />
        </g>
      );
    case "trend":
      // Up-trend sparkline with end-node.
      return (
        <g fill="none">
          <path d="M6 30 L14 24 L20 27 L28 15 L36 11" />
          <circle cx="36" cy="11" r="2" fill="currentColor" />
          <path d="M6 36 H38" opacity="0.35" />
        </g>
      );
    case "alert":
      // Triangle with exclamation.
      return (
        <g fill="none">
          <path d="M22 8 L38 34 H6 Z" />
          <path d="M22 17 V25" />
          <path d="M22 29 V30" />
        </g>
      );
    case "protocol":
      // Ordered-list clipboard.
      return (
        <g fill="none">
          <path d="M12 10 H32 V36 H12 Z" />
          <path d="M18 8 H26 V12 H18 Z" />
          <path d="M16 18 H28" />
          <path d="M16 23 H28" />
          <path d="M16 28 H24" />
        </g>
      );
    case "leverage":
      // Lever / fulcrum — the "highest-leverage move" mark.
      return (
        <g fill="none">
          <path d="M6 32 L38 14" />
          <path d="M16 36 L28 24" opacity="0.55" />
          <path d="M18 32 L22 36 L26 32 Z" />
          <circle cx="38" cy="14" r="2" fill="currentColor" />
        </g>
      );
    case "followup":
      // Circular arrow — retest / follow-up.
      return (
        <g fill="none">
          <path d="M34 22 A12 12 0 1 1 28 11.5" />
          <path d="M28 6 V12 H34" />
        </g>
      );
  }
}

export default function SvgPictogram({
  variant,
  title,
  width = 44,
  height = 44,
  className,
}: Props) {
  const labelled = Boolean(title);
  const ref = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const initial = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.92 };
  const animate = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : inView
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.92 };

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 44 44"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? "img" : "presentation"}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? title : undefined}
      initial={initial}
      animate={animate}
      transition={{ duration: duration.normal, ease: easing.expo }}
      style={{ transformOrigin: "50% 50%" }}
      className={className}
    >
      {labelled ? <title>{title}</title> : null}
      <Paths variant={variant} />
    </motion.svg>
  );
}
