"use client";

import { useEffect, useRef } from "react";

import Reveal from "@/components/ui/Reveal";
import styles from "./science.module.css";

/**
 * Science — Biological age.
 *
 * Longitudinal dimension. A delta (chronological vs biological) and a
 * percentile band. The static HTML renders the final values (crawler-safe,
 * no-JS-safe); once hydrated, a vanilla IntersectionObserver + rAF loop
 * counts them up from 0 the first time the card cluster enters the viewport.
 * prefers-reduced-motion short-circuits to the final value (no animation).
 *
 * v3: stats as white cards with the biological age as the lime pop card;
 * the trajectory drawn in the "link" chart language on night glass.
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
      className={styles.chapter}
    >
      <Reveal amount={0.2}>
        <span className={`label ${styles.eyebrow}`}>
          <span aria-hidden className="label-dot label-dot--ink" />
          <span>04 · Biological age</span>
        </span>

        <h2 id="science-bioage-heading" className={styles.title}>
          The number you can actually move.
        </h2>

        <p className={styles.lead}>
          Merios estimates biological age from a validated subset of the
          panel, inspired by the Levine PhenoAge framework
          <sup aria-describedby="ref-3">
            <a
              href="#ref-3"
              aria-label="Reference 3"
              className={styles.ref}
            >
              3
            </a>
          </sup>
          . The delta — chronological minus biological — is a tractable
          target: most markers respond to intervention within 90 days.
        </p>
      </Reveal>

      <Reveal amount={0.15} delay={0.15}>
        <div ref={statsRef} className={styles.statsRow}>
          {/* Card 1 — chronological */}
          <div className={styles.ageCard}>
            <p className={styles.ageKey}>Chronological</p>
            <p
              className={styles.ageValue}
              role="img"
              aria-label={`${TARGETS.chronological} years`}
            >
              <span aria-hidden ref={chronologicalRef}>
                {TARGETS.chronological.toFixed(0)}
              </span>
            </p>
            <p className={styles.ageNote}>Years, calendar</p>
          </div>

          {/* Card 2 — biological (the pop highlight) */}
          <div className={`${styles.ageCard} ${styles.ageCardLime}`}>
            <AgeGlyph />
            <p className={styles.ageKey}>Biological</p>
            <p
              className={styles.ageValue}
              role="img"
              aria-label={`${TARGETS.biological} years, estimated`}
            >
              <span aria-hidden ref={biologicalRef}>
                {TARGETS.biological.toFixed(1)}
              </span>
            </p>
            <p className={styles.ageNote}>Years, estimated — illustrative</p>
          </div>

          {/* Card 3 — delta + percentile */}
          <div className={styles.ageCard}>
            <p className={styles.ageKey}>Delta · percentile</p>
            <p
              className={styles.ageValue}
              role="img"
              aria-label={`${TARGETS.delta} years delta`}
            >
              <span aria-hidden ref={deltaRef}>
                {TARGETS.delta.toFixed(1)}
              </span>
            </p>
            <p className={styles.ageNote}>
              Top 18% in cohort — illustrative band
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal amount={0.15} delay={0.2}>
        <figure
          className={`night ${styles.trajectory}`}
          aria-label="Illustrative trajectory of a Merios score over eighteen months"
        >
          <figcaption className={styles.trajHead}>
            <span className={styles.trajKey}>Trajectory · 18 months</span>
            <span className={styles.trajTag}>Illustrative</span>
          </figcaption>

          <svg
            viewBox="0 0 800 180"
            width="100%"
            role="img"
            aria-label="Illustrative upward trajectory of composite score over eighteen months"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="bioage-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.16" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid */}
            {[40, 85].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="800"
                y2={y}
                stroke="#FFFFFF"
                strokeOpacity="0.07"
              />
            ))}
            {/* Monthly ticks along the baseline (decorative) */}
            {Array.from({ length: 19 }, (_, m) => (
              <line
                key={`tick-${m}`}
                x1={(m * 800) / 18}
                y1="136"
                x2={(m * 800) / 18}
                y2={m % 6 === 0 ? 146 : 141}
                stroke="#FFFFFF"
                strokeOpacity={m % 6 === 0 ? 0.4 : 0.18}
              />
            ))}
            {/* Baseline */}
            <line
              x1="0"
              y1="130"
              x2="800"
              y2="130"
              stroke="#FFFFFF"
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            {/* Area under the line */}
            <path
              d="M0 120 Q 200 100 400 80 T 800 40 L 800 130 L 0 130 Z"
              fill="url(#bioage-area)"
            />
            {/* Band */}
            <path
              d="M0 110 Q 200 100 400 80 T 800 40 L 800 60 Q 600 80 400 90 T 0 120 Z"
              fill="var(--color-pulse)"
              opacity="0.2"
            />
            {/* Line */}
            <path
              d="M0 120 Q 200 100 400 80 T 800 40"
              fill="none"
              stroke="#F4F6F7"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle
              cx="800"
              cy="40"
              r="7"
              fill="var(--color-pulse)"
              stroke="#0E1316"
              strokeWidth="3"
            />
            <circle cx="0" cy="120" r="4.5" fill="#F4F6F7" fillOpacity="0.55" />
          </svg>
        </figure>
      </Reveal>
    </section>
  );
}

/** A small drop-and-pulse glyph for the biological-age card (decorative). */
function AgeGlyph() {
  return (
    <svg className={styles.ageGlyph} viewBox="0 0 54 54" aria-hidden focusable="false">
      <circle cx="27" cy="27" r="25.5" fill="none" stroke="#10231A" strokeOpacity="0.28" />
      <path
        d="M9 29 H18 L21 33 L25 17 L30 39 L33 29 H45"
        fill="none"
        stroke="#10231A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="45" cy="29" r="3.2" fill="#10231A" />
    </svg>
  );
}
