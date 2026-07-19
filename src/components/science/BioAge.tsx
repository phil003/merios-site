"use client";

import { useEffect, useRef } from "react";

import Reveal from "@/components/ui/Reveal";

/**
 * Science — Biological age.
 *
 * Longitudinal dimension. A delta (chronological vs biological) and a
 * percentile band. The static HTML renders the final values (crawler-safe,
 * no-JS-safe); once hydrated, a vanilla IntersectionObserver + rAF loop
 * counts them up from 0 the first time the card cluster enters the viewport.
 * prefers-reduced-motion short-circuits to the final value (no animation).
 */

const TARGETS = {
  chronological: 38,
  biological: 33.4,
  delta: -4.6,
} as const;

const COUNTER_DURATION_MS = 1600;

/** ease-out cubic — close match for the previous Motion ease [0.22, 1, 0.36, 1]. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function ScienceBioAge() {
  const statsRef = useRef<HTMLDivElement>(null);
  const chronologicalRef = useRef<HTMLSpanElement>(null);
  const biologicalRef = useRef<HTMLSpanElement>(null);
  const deltaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    // Reduced motion: keep the server-rendered final values, no count-up.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const counters: Array<{
      el: HTMLSpanElement | null;
      target: number;
      decimals: number;
    }> = [
      { el: chronologicalRef.current, target: TARGETS.chronological, decimals: 0 },
      { el: biologicalRef.current, target: TARGETS.biological, decimals: 1 },
      { el: deltaRef.current, target: TARGETS.delta, decimals: 1 },
    ];

    const render = (progress: number) => {
      for (const { el, target, decimals } of counters) {
        if (el) el.textContent = (target * progress).toFixed(decimals);
      }
    };

    // Arm the count-up: reset to 0 while the cluster is still offscreen.
    render(0);

    let raf = 0;
    const startCount = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / COUNTER_DURATION_MS, 1);
        render(easeOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            startCount();
            break;
          }
        }
      },
      // Matches the previous useInView config: amount 0.4, bottom margin -100px.
      { threshold: 0.4, rootMargin: "0px 0px -100px 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      // If unmount interrupts the animation, leave the true values behind.
      render(1);
    };
  }, []);

  return (
    <section
      id="bioage"
      aria-labelledby="science-bioage-heading"
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
              04 · Biological age
            </span>
          </span>

          <h2
            id="science-bioage-heading"
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
            The number you can actually move.
          </h2>

          <p
            className="mt-6 max-w-[640px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
            }}
          >
            Merios estimates biological age from a validated subset of the
            panel, inspired by the Levine PhenoAge framework
            <sup aria-describedby="ref-3">
              <a
                href="#ref-3"
                aria-label="Reference 3"
                style={{ color: "var(--color-green-deep)" }}
              >
                3
              </a>
            </sup>
            . The delta — chronological minus biological — is a tractable
            target: most markers respond to intervention within 90 days.
          </p>
        </Reveal>

        <Reveal amount={0.15} delay={0.15}>
          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5"
          >
            {/* Card 1 — chronological */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-canvas-alt)",
                border: "1px solid var(--color-grid)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Chronological
              </p>
              <p
                className="mt-6 tabular-nums"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(3rem, 6vw, 4.25rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                  lineHeight: 1,
                }}
                role="img"
                aria-label={`${TARGETS.chronological} years`}
              >
                <span aria-hidden ref={chronologicalRef}>
                  {TARGETS.chronological.toFixed(0)}
                </span>
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--color-ink-tertiary)",
                }}
              >
                Years, calendar
              </p>
            </div>

            {/* Card 2 — biological */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-green-deep)",
                border: "1px solid var(--color-green-deep)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-pulse)",
                  fontWeight: 500,
                }}
              >
                Biological
              </p>
              <p
                className="mt-6 tabular-nums"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(3rem, 6vw, 4.25rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "var(--color-canvas)",
                  lineHeight: 1,
                }}
                role="img"
                aria-label={`${TARGETS.biological} years, estimated`}
              >
                <span aria-hidden ref={biologicalRef}>
                  {TARGETS.biological.toFixed(1)}
                </span>
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "rgba(247,245,239,0.7)",
                }}
              >
                Years, estimated — illustrative
              </p>
            </div>

            {/* Card 3 — delta + percentile */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-canvas-alt)",
                border: "1px solid var(--color-grid)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Delta · percentile
              </p>
              <p
                className="mt-6 tabular-nums"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(3rem, 6vw, 4.25rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                  lineHeight: 1,
                }}
                role="img"
                aria-label={`${TARGETS.delta} years delta`}
              >
                <span aria-hidden ref={deltaRef}>
                  {TARGETS.delta.toFixed(1)}
                </span>
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--color-ink-tertiary)",
                }}
              >
                Top 18% in cohort — illustrative band
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal amount={0.15} delay={0.2}>
          <figure
            className="mt-14 rounded-2xl p-8 md:p-10"
            style={{
              background: "var(--color-canvas-alt)",
              border: "1px solid var(--color-grid)",
            }}
            aria-label="Illustrative trajectory of a Merios score over eighteen months"
          >
            <figcaption
              className="mb-6 flex items-center justify-between gap-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Trajectory · 18 months
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-green-deep)",
                  fontWeight: 500,
                }}
              >
                Illustrative
              </span>
            </figcaption>

            <svg
              viewBox="0 0 800 180"
              width="100%"
              role="img"
              aria-label="Illustrative upward trajectory of composite score over eighteen months"
              style={{ overflow: "visible" }}
            >
              {/* Baseline */}
              <line
                x1="0"
                y1="130"
                x2="800"
                y2="130"
                stroke="var(--color-grid)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
              {/* Band */}
              <path
                d="M0 110 Q 200 100 400 80 T 800 40 L 800 60 Q 600 80 400 90 T 0 120 Z"
                fill="var(--color-pulse)"
                opacity="0.12"
              />
              {/* Line */}
              <path
                d="M0 120 Q 200 100 400 80 T 800 40"
                fill="none"
                stroke="var(--color-pulse)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="800" cy="40" r="5" fill="var(--color-pulse)" />
              <circle cx="0" cy="120" r="4" fill="var(--color-ink-tertiary)" />
            </svg>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
