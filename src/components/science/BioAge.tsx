"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import styles from "./science.module.css";

/**
 * Science — Biological age (v2 "Open Sky").
 *
 * One white card labelled "Example data": the three example values
 * (chronological, biological, delta = biological minus chronological) on
 * inner plates, an age ruler that
 * places them, and the way out to the PhenoAge calculator. The static HTML
 * renders the final values (crawler-safe, no-JS-safe); once hydrated, an
 * IntersectionObserver + rAF loop counts them up from 0 the first time the
 * tiles enter the viewport. prefers-reduced-motion keeps the final values.
 */

const TARGETS = {
  chronological: 38,
  biological: 33.4,
  delta: -4.6,
} as const;

// The ruler runs from 25 to 45 years.
const RULER_MIN = 25;
const RULER_MAX = 45;
const RULER_TICKS = [25, 30, 35, 40, 45];
const at = (age: number) =>
  `${(((age - RULER_MIN) / (RULER_MAX - RULER_MIN)) * 100).toFixed(2)}%`;

const COUNTER_DURATION_MS = 1100;

/** ease-out cubic — close match for the canonical smooth ease. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Numbers keep a true minus sign (U+2212) in display. */
function fmt(value: number, decimals: number): string {
  return value.toFixed(decimals).replace("-", "−");
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
        if (el) el.textContent = fmt(target * progress, decimals);
      }
    };

    // Arm the count-up: reset to 0 while the tiles are still offscreen.
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
          The number you can <em>actually move.</em>
        </h2>

        <p className={styles.lead}>
          Merios estimates biological age from the nine blood markers of the
          published Levine PhenoAge model
          <sup aria-describedby="ref-4 ref-5">
            <a
              href="#ref-4"
              aria-label="Reference 4"
              className={styles.ref}
            >
              4
            </a>
            ,
            <a
              href="#ref-5"
              aria-label="Reference 5"
              className={styles.ref}
            >
              5
            </a>
          </sup>
          . The delta — biological minus chronological — is the number to
          follow from one test to the next.
        </p>
      </Reveal>

      <Reveal amount={0.15} delay={0.15}>
        <div className={styles.ageCard}>
          <p className={styles.ageHead}>
            <span>Biological age</span>
            <span>Example data</span>
          </p>

          <div ref={statsRef} className={styles.ageTiles}>
            <div className={styles.ageTile}>
              <p className={styles.ageKey}>Chronological</p>
              <p
                className={styles.ageValue}
                role="img"
                aria-label={`${TARGETS.chronological} years`}
              >
                <span aria-hidden ref={chronologicalRef}>
                  {fmt(TARGETS.chronological, 0)}
                </span>
              </p>
              <p className={styles.ageNote}>Years, calendar</p>
            </div>

            <div className={styles.ageTile} data-tone="bio">
              <p className={styles.ageKey}>Biological</p>
              <p
                className={styles.ageValue}
                role="img"
                aria-label={`${TARGETS.biological} years, estimated`}
              >
                <span aria-hidden ref={biologicalRef}>
                  {fmt(TARGETS.biological, 1)}
                </span>
              </p>
              <p className={styles.ageNote}>Years, estimated</p>
            </div>

            <div className={styles.ageTile}>
              <p className={styles.ageKey}>Delta</p>
              <p
                className={styles.ageValue}
                role="img"
                aria-label={`${TARGETS.delta} years delta`}
              >
                <span aria-hidden ref={deltaRef}>
                  {fmt(TARGETS.delta, 1)}
                </span>
              </p>
              <p className={styles.ageNote}>
                Years, biological minus chronological
              </p>
            </div>
          </div>

          <div
            className={styles.ruler}
            role="img"
            aria-label={`Example data. Age ruler from ${RULER_MIN} to ${RULER_MAX}: biological age ${TARGETS.biological} sits ${Math.abs(TARGETS.delta)} years below chronological age ${TARGETS.chronological}.`}
            style={
              {
                "--bio": at(TARGETS.biological),
                "--chrono": at(TARGETS.chronological),
              } as CSSProperties
            }
          >
            <span className={styles.rulerTop}>
              <span className={styles.rulerBio}>
                Biological {fmt(TARGETS.biological, 1)}
              </span>
              <span className={styles.rulerChrono}>
                Chronological {fmt(TARGETS.chronological, 0)}
              </span>
            </span>
            <span className={styles.rulerTrack}>
              {RULER_TICKS.map((t) => (
                <span key={t} className={styles.rulerMinor} style={{ left: at(t) }} />
              ))}
              <span className={styles.rulerSpan} />
              <span className={styles.rulerDot} />
              <span className={styles.rulerTick} />
            </span>
            <span className={styles.rulerDeltaRow}>
              <span className={styles.rulerDelta}>{fmt(TARGETS.delta, 1)}</span>
            </span>
            <span className={styles.rulerScale}>
              {RULER_TICKS.map((t) => (
                <span key={t} style={{ left: at(t) }}>
                  {t}
                </span>
              ))}
            </span>
          </div>

          <div className={styles.ageFoot}>
            <Link href="/tools/phenoage-calculator" className="btn btn-ink">
              Try the PhenoAge calculator
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
