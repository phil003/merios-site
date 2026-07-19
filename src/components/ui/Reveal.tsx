import type { CSSProperties, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  /** Kept for API compatibility with the previous Motion implementation. */
  once?: boolean;
  staggerChildren?: number;
  amount?: number;
  className?: string;
}

/**
 * Reveal v2 — scroll-triggered fade-up without framer-motion.
 *
 * Renders a plain server-compatible wrapper carrying `data-rv`. The actual
 * animation is driven by globals.css (`html[data-anim] [data-rv]`) plus the
 * tiny inline IntersectionObserver bootstrapped from the root layout — no
 * JavaScript bundle involvement at all.
 *
 * Behaviour contract (why this exists — see perf-seo/core-fixes branch):
 * - HTML is visible by default: crawler-safe, no-JS-safe, and the element
 *   can paint the moment the observer fires (~DOMContentLoaded), instead of
 *   waiting 10-20s for framework hydration on throttled mobile. This was the
 *   root cause of LCP 20s+ on every /blog/[slug] page.
 * - Reduced motion: the bootstrap never sets html[data-anim], so content is
 *   simply visible with no transform.
 *
 * `once`, `staggerChildren` and `amount` are accepted so existing call sites
 * compile unchanged; reveals are always once-only, and staggering is done
 * with `delay` (mapped to a CSS transition-delay).
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  once: _once,
  staggerChildren: _staggerChildren,
  amount: _amount,
  className,
}: RevealProps) {
  const style =
    delay > 0
      ? ({ "--rv-delay": `${delay}s` } as CSSProperties)
      : undefined;

  return (
    <div data-rv={direction === "up" ? "" : direction} className={className} style={style}>
      {children}
    </div>
  );
}
