"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./hiw.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * UnderstandPinned — the middle sub-section of /how-it-works.
 *
 * Pattern:
 *   - gsap.matchMedia with three branches:
 *       desktopFull  → ScrollTrigger pin + scrub 0.8, pins the inner child
 *                      (not the wrapper section). pinSpacing: true. Breakpoint
 *                      `(min-width: 768px)` so tablets get the scrub too.
 *                      v3: the pin is anchored on the night stage itself
 *                      ("center center") so the stage holds mid-viewport
 *                      instead of below the fold.
 *       mobileFull   → below 768px: stacked flow, one-shot onEnter reveal
 *                      (no pin, everything sits as regular sections).
 *       reduced      → everything visible, zero animation, no pin.
 *
 * Parallax:
 *   - Three depth layers with speeds -0.3 / 0 / +0.3 — inside parallax
 *     budget (<= 0.4). Applied via the same scrubbed timeline so motion is
 *     fully scroll-linked.
 *     layer A (background rings)     → y * -0.3  (moves opposite)
 *     layer B (score text)           → y *  0    (anchor)
 *     layer C (sparklines + copy)    → y * +0.3  (moves with)
 *
 * Sub-animations folded into the scrubbed timeline:
 *   - Score counter animates 0 → 76
 *   - Four pillar arcs (Blood · Activity · Recovery · Zen) sweep in around it
 *   - Three sparklines draw in via strokeDashoffset 0
 *   - Three copy lines fade + slide up, staggered
 *
 * The static HTML ships the arcs fully drawn (no-JS / reduced-motion safe);
 * only the animated branches arm the hidden starting state.
 */

const SPARKLINES = [
  // cholesterol-ish gentle trend down
  "M2 30 L14 26 L26 22 L40 20 L54 18 L68 16 L80 14",
  // glucose wobble flattening
  "M2 22 L12 18 L22 24 L32 20 L46 18 L60 16 L80 15",
  // hrv climb
  "M2 28 L12 26 L24 22 L36 18 L48 16 L60 13 L80 10",
];

const COPY_LINES = [
  "150+ biomarkers become one clear figure.",
  "Trends replace single-point anxiety.",
  "Every system graded, every outlier flagged.",
];

// Parallax travel in px at the end of the scrub.
const PARALLAX_TRAVEL = 90;

// Four concentric pillar arcs around the score (outer → inner). Purely
// illustrative sweeps — no labels, no values — whose mean echoes the 76.
const RING_CENTER = 180;
const RING_STROKE = 13;
const ARCS = [
  { r: 166, sweep: 0.82, color: "var(--hiw-blood)" },
  { r: 145, sweep: 0.7, color: "var(--hiw-activity)" },
  { r: 124, sweep: 0.78, color: "var(--hiw-recovery)" },
  { r: 103, sweep: 0.74, color: "var(--hiw-zen)" },
].map((a) => {
  const c = 2 * Math.PI * a.r;
  // dash = c, gap = 2c: the empty state (offset c + 2) leaves no zero-length
  // dash behind, so round caps never paint a dot at 12 o'clock.
  return {
    ...a,
    dash: `${c.toFixed(2)} ${(c * 2).toFixed(2)}`,
    empty: c + 2,
    off: c * (1 - a.sweep),
  };
});

export default function UnderstandPinned() {
  const container = useRef<HTMLDivElement>(null);
  const pinTarget = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktopFull:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobileFull:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const c = context.conditions ?? {};

          // Prep sparklines — compute each path's length and set dash.
          const sparkPaths =
            root.querySelectorAll<SVGPathElement>(".hiw-understand-spark");
          sparkPaths.forEach((p) => {
            const len = p.getTotalLength();
            gsap.set(p, {
              strokeDasharray: len,
              strokeDashoffset: len,
            });
          });

          const arcs = root.querySelectorAll<SVGCircleElement>(
            ".hiw-understand-arc",
          );
          const arcFinal = (_: number, el: SVGCircleElement) =>
            Number(el.dataset.off ?? 0);
          const arcEmpty = (_: number, el: SVGCircleElement) =>
            Number(el.dataset.empty ?? 0);

          if (c.reduced) {
            gsap.set(arcs, { strokeDashoffset: arcFinal });
            gsap.set(
              [
                ".hiw-understand-score",
                ".hiw-understand-line",
                ".hiw-understand-ring",
                ".hiw-parallax-a",
                ".hiw-parallax-b",
                ".hiw-parallax-c",
              ],
              { opacity: 1, y: 0 },
            );
            gsap.set(sparkPaths, { strokeDashoffset: 0 });
            if (scoreRef.current) scoreRef.current.textContent = "76";
            return;
          }

          // Shared starting state. v3: the night stage is visible before
          // the pin, so it waits "dimmed" (empty tracks, faint copy) rather
          // than as an empty panel; the scrub fills it in.
          gsap.set(".hiw-understand-line", { opacity: 0.22, y: 18 });
          gsap.set(".hiw-understand-ring", {
            opacity: 1,
            scale: 0.94,
            transformOrigin: "50% 50%",
          });
          gsap.set(".hiw-understand-score", { opacity: 0.35 });
          gsap.set(arcs, { strokeDashoffset: arcEmpty });
          const scoreProxy = { value: 0 };

          if (c.desktopFull && pinTarget.current) {
            const tl = gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: pinTarget.current,
                start: "center center",
                end: "+=800",
                pin: pinTarget.current,
                pinSpacing: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });

            tl.to(
              ".hiw-understand-ring",
              { opacity: 1, scale: 1, duration: 0.35 },
              0,
            )
              .to(
                ".hiw-understand-score",
                { opacity: 1, duration: 0.25 },
                0.05,
              )
              .to(
                scoreProxy,
                {
                  value: 76,
                  duration: 0.7,
                  ease: "none",
                  onUpdate: () => {
                    if (scoreRef.current) {
                      scoreRef.current.textContent = String(
                        Math.round(scoreProxy.value),
                      );
                    }
                  },
                },
                0.05,
              )
              .to(
                arcs,
                {
                  strokeDashoffset: arcFinal,
                  duration: 0.7,
                  stagger: 0.06,
                  ease: "power2.out",
                },
                0.05,
              )
              .to(
                sparkPaths,
                {
                  strokeDashoffset: 0,
                  duration: 0.6,
                  stagger: 0.08,
                  ease: "none",
                },
                0.3,
              )
              .to(
                ".hiw-understand-line",
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: "expo.out",
                },
                0.45,
              )
              // Parallax: three depth layers, speeds -0.3 / 0 / +0.3 driven
              // by the same scrub timeline. The 0-speed layer is a no-op so
              // it's omitted; layer B stays anchored.
              .to(
                ".hiw-parallax-a",
                {
                  y: PARALLAX_TRAVEL * -0.3,
                  ease: "none",
                  duration: 1,
                },
                0,
              )
              .to(
                ".hiw-parallax-c",
                {
                  y: PARALLAX_TRAVEL * 0.3,
                  ease: "none",
                  duration: 1,
                },
                0,
              );
          } else if (c.mobileFull) {
            // Below 768px: no pin, no scrub. Stacked flow, one-shot reveal.
            ScrollTrigger.create({
              trigger: root,
              start: "top 75%",
              once: true,
              onEnter: () => {
                gsap.to(".hiw-understand-ring", {
                  opacity: 1,
                  scale: 1,
                  duration: 0.7,
                  ease: "expo.out",
                });
                gsap.to(".hiw-understand-score", {
                  opacity: 1,
                  duration: 0.6,
                  ease: "expo.out",
                  delay: 0.15,
                });
                gsap.to(scoreProxy, {
                  value: 76,
                  duration: 1.1,
                  ease: "expo.out",
                  delay: 0.15,
                  onUpdate: () => {
                    if (scoreRef.current) {
                      scoreRef.current.textContent = String(
                        Math.round(scoreProxy.value),
                      );
                    }
                  },
                });
                gsap.to(arcs, {
                  strokeDashoffset: arcFinal,
                  duration: 1.1,
                  stagger: 0.06,
                  ease: "expo.out",
                  delay: 0.15,
                });
                gsap.to(sparkPaths, {
                  strokeDashoffset: 0,
                  duration: 1.1,
                  stagger: 0.08,
                  ease: "expo.out",
                  delay: 0.3,
                });
                gsap.to(".hiw-understand-line", {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.08,
                  ease: "expo.out",
                  delay: 0.45,
                });
              },
            });
          }
        },
      );
    },
    { scope: container },
  );

  const headlineId = "hiw-understand-headline";

  return (
    <section
      id="understand"
      tabIndex={-1}
      aria-labelledby={headlineId}
      data-hiw-section="understand"
      ref={container}
      className={`${styles.step} scroll-mt-28 focus:outline-none`}
    >
      <div className={styles.stepHead}>
        <div className={`label ${styles.eyebrow}`}>
          <span aria-hidden className="label-dot label-dot--ink" />
          <span>Step 02 — Understand</span>
        </div>

        <h2 id={headlineId} className={styles.stepTitle}>
          One score. Every marker. Clear trends.
        </h2>

        <p className={styles.stepLead}>
          Merios compresses 150+ biomarkers into a single number — then expands
          them back into the trend view your body actually needs.
        </p>
      </div>

      {/* Pinned stage — the inner ref is what ScrollTrigger pins. A night
          panel so the lime traces read at full strength. */}
      <div ref={pinTarget} className={`night ${styles.stage}`}>
        <span aria-hidden className={styles.stageGlow} />
        <div className={styles.stageGrid}>
          {/* LEFT — score visual (parallax layer A: background rings) */}
          <div className={styles.ringBox}>
            {/* Parallax A — pillar rings, speed -0.3 */}
            <div className="hiw-parallax-a absolute inset-0 will-change-transform">
              <svg
                viewBox="0 0 360 360"
                className={`hiw-understand-ring ${styles.ringSvg}`}
                aria-hidden
              >
                {ARCS.map((a) => (
                  <circle
                    key={`track-${a.r}`}
                    className={styles.ringTrack}
                    cx={RING_CENTER}
                    cy={RING_CENTER}
                    r={a.r}
                    strokeWidth={RING_STROKE}
                  />
                ))}
                {ARCS.map((a) => (
                  <circle
                    key={`arc-${a.r}`}
                    className={`hiw-understand-arc ${styles.ringArc}`}
                    cx={RING_CENTER}
                    cy={RING_CENTER}
                    r={a.r}
                    stroke={a.color}
                    strokeWidth={RING_STROKE}
                    strokeDasharray={a.dash}
                    strokeDashoffset={a.off.toFixed(2)}
                    data-empty={a.empty.toFixed(2)}
                    data-off={a.off.toFixed(2)}
                    transform={`rotate(-90 ${RING_CENTER} ${RING_CENTER})`}
                  />
                ))}
              </svg>
            </div>
            {/* Parallax B — anchor layer, speed 0 (score text) */}
            <div className={`hiw-parallax-b hiw-understand-score ${styles.scoreBox}`}>
              <span ref={scoreRef} className={styles.score}>
                0
              </span>
              <span className={styles.scoreLabel}>Merios Score</span>
            </div>
          </div>

          {/* RIGHT — copy + sparklines (parallax layer C, speed +0.3) */}
          <div className="hiw-parallax-c will-change-transform">
            <ul className={styles.lines}>
              {COPY_LINES.map((line, i) => (
                <li key={line} className={`hiw-understand-line ${styles.line}`}>
                  <svg viewBox="0 0 82 36" className={styles.spark} aria-hidden>
                    <path
                      d={SPARKLINES[i] ?? SPARKLINES[0]}
                      fill="none"
                      stroke="var(--color-lime)"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hiw-understand-spark"
                    />
                  </svg>
                  <span className={styles.lineText}>{line}</span>
                </li>
              ))}
            </ul>
            <p className={`hiw-understand-line ${styles.note}`}>
              The score is a signal, not a verdict — each subsystem stays legible
              on its own page, so you always know where the number comes from.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
