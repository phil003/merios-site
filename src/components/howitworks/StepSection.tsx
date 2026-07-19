"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

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
 * Motion-free (Reveal v2 conventions):
 *   - The eyebrow / headline / lead fade-up is driven by `data-rv`
 *     attributes with incremental `--rv-delay` (globals.css +
 *     the inline IntersectionObserver bootstrap in layout.tsx). The header
 *     is visible by default in static HTML — crawler/no-JS/LCP safe.
 *   - Optional step number counter animates 0 → `stepNumber` with a vanilla
 *     IntersectionObserver + requestAnimationFrame loop (expo-out easing).
 *     The static HTML carries the FINAL value; the count-up only arms once
 *     the observer fires, and prefers-reduced-motion users keep the final
 *     value with no tween.
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

/** Matches the previous Motion timing: duration.slow (1.1s), expo-out ease. */
const COUNTER_DURATION_MS = 1100;

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
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (stepNumber === undefined) return;
    const el = counterRef.current;
    if (!el) return;

    const finalText = String(stepNumber).padStart(2, "0");

    // Reduced motion: keep the statically-rendered final value, no tween.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = finalText;
      return;
    }

    let raf = 0;

    // Same rootMargin/threshold as the Reveal v2 bootstrap so the count-up
    // starts in sync with the eyebrow row's own fade-up reveal.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        let start: number | null = null;
        const tick = (now: number) => {
          if (start === null) start = now;
          const t = Math.min((now - start) / COUNTER_DURATION_MS, 1);
          // Expo-out, visually equivalent to cubic-bezier(0.16, 1, 0.3, 1).
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          el.textContent = String(Math.round(eased * stepNumber)).padStart(
            2,
            "0",
          );
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            el.textContent = finalText;
          }
        };

        el.textContent = "00";
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stepNumber]);

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
      <div className="max-w-[720px]">
        <div
          data-rv
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
            {stepNumber !== undefined ? (
              <>
                Step{" "}
                <span ref={counterRef} className="tabular-nums">
                  {String(stepNumber).padStart(2, "0")}
                </span>{" "}
                — {eyebrow}
              </>
            ) : (
              eyebrow
            )}
          </span>
        </div>

        <h2
          id={headlineId}
          data-rv
          className="mt-6"
          style={
            {
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
              "--rv-delay": "0.08s",
            } as CSSProperties
          }
        >
          {headline}
        </h2>

        <p
          data-rv
          className="mt-6 max-w-[560px]"
          style={
            {
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
              "--rv-delay": "0.16s",
            } as CSSProperties
          }
        >
          {lead}
        </p>
      </div>

      <div className="mt-14 md:mt-20">{children}</div>
    </section>
  );
}
