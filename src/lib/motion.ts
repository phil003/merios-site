import type { Easing, Transition, Variants } from "motion/react";

export const easing = {
  expo: [0.16, 1, 0.3, 1],
  smooth: [0.22, 1, 0.36, 1],
  sharp: [0.76, 0, 0.24, 1],
} as const satisfies Record<string, Easing>;

export const duration = {
  quick: 0.3,
  normal: 0.6,
  slow: 1.1,
} as const;

export const defaultTransition: Transition = {
  duration: duration.normal,
  ease: easing.expo,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.expo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.expo },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});
