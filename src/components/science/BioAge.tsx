"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

import Reveal from "@/components/ui/Reveal";

/**
 * Science — Biological age.
 *
 * Longitudinal dimension. A delta (chronological vs biological) and a
 * percentile band. Scaffold values are animated via Motion's `animate` +
 * `useMotionValue`, triggered once the card cluster enters the viewport.
 * Reduced motion short-circuits to the final value.
 */

const TARGETS = {
  chronological: 38,
  biological: 33.4,
  delta: -4.6,
} as const;

const COUNTER_DURATION = 1.6;

function useCounter(
  target: number,
  options: { active: boolean; decimals?: number },
) {
  const { active, decimals = 0 } = options;
  const prefersReducedMotion = useReducedMotion();
  // Start at 0 so the count-up reads as an honest animation; when reduced
  // motion is requested we snap straight to the target.
  const mv = useMotionValue(prefersReducedMotion ? target : 0);
  const [display, setDisplay] = useState<string>(
    (prefersReducedMotion ? target : 0).toFixed(decimals),
  );

  useEffect(() => {
    const unsub = mv.on("change", (v) => {
      setDisplay(v.toFixed(decimals));
    });
    return () => unsub();
  }, [mv, decimals]);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion) {
      mv.set(target);
      setDisplay(target.toFixed(decimals));
      return;
    }
    const controls = animate(mv, target, {
      duration: COUNTER_DURATION,
      // ease-out cubic — matches the task spec ("duration 1.6s, ease-out").
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, decimals, mv, prefersReducedMotion, target]);

  return display;
}

export default function ScienceBioAge() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, {
    once: true,
    amount: 0.4,
    margin: "0px 0px -100px 0px",
  });

  const chronological = useCounter(TARGETS.chronological, {
    active: inView,
    decimals: 0,
  });
  const biological = useCounter(TARGETS.biological, {
    active: inView,
    decimals: 1,
  });
  const delta = useCounter(TARGETS.delta, {
    active: inView,
    decimals: 1,
  });

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
                aria-label={`${TARGETS.chronological} years`}
              >
                <span aria-hidden>{chronological}</span>
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
                aria-label={`${TARGETS.biological} years, estimated`}
              >
                <span aria-hidden>{biological}</span>
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "rgba(247,245,239,0.7)",
                }}
              >
                Years, estimated — placeholder
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
                aria-label={`${TARGETS.delta} years delta`}
              >
                <span aria-hidden>{delta}</span>
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--color-ink-tertiary)",
                }}
              >
                Top 18% in cohort (placeholder band)
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
                Placeholder data
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
