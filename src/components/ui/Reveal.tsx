"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easing, duration } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  once?: boolean;
  staggerChildren?: number;
  amount?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  once = true,
  staggerChildren,
  amount = 0.2,
  className,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = OFFSETS[direction];

  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: duration.quick, delay, staggerChildren },
        },
      }
    : {
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: duration.slow,
            ease: easing.expo,
            delay,
            staggerChildren,
          },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -80px 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
