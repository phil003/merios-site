"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * StepSection — shared wrapper for the three deep sub-sections on
 * /how-it-works (Connect / Understand / Act).
 *
 * Responsibilities:
 *   - Provides the anchor `id` + `tabIndex={-1}` so StickyLateralNav can
 *     focus the section after an anchor click (accessible keyboard jump).
 *   - Exposes a `data-hiw-section` hook the sticky-nav ScrollTrigger uses
 *     to discover sections without leaning on fragile selectors.
 *   - Renders the canonical eyebrow → headline → lead header, then the
 *     section-specific `children`.
 *   - Wraps content in <Reveal> for the reduce-motion-safe fade-up.
 *
 * Phase 4: tighten spacing tokens and add section-level dividers.
 */

export interface StepSectionProps {
  id: "connect" | "understand" | "act";
  eyebrow: string;
  headline: ReactNode;
  lead: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function StepSection({
  id,
  eyebrow,
  headline,
  lead,
  children,
  className,
}: StepSectionProps) {
  const headlineId = `hiw-${id}-headline`;

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
      <Reveal>
        <div className="max-w-[720px]">
          <div
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
              {eyebrow}
            </span>
          </div>

          <h2
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
          >
            {headline}
          </h2>

          <p
            className="mt-6 max-w-[560px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
            }}
          >
            {lead}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 md:mt-20">{children}</div>
    </section>
  );
}
