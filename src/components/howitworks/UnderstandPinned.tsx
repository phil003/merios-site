"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * UnderstandPinned — the middle sub-section of /how-it-works.
 *
 * Pattern:
 *   - gsap.matchMedia with three branches:
 *       desktopFull  → ScrollTrigger pin + scrub 0.8, pins the inner child
 *                      (not the wrapper section). pinSpacing: true. Breakpoint
 *                      `(min-width: 768px)` so tablets get the scrub too.
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
 *   - Three sparklines draw in via strokeDashoffset 0
 *   - Three copy lines fade + slide up, staggered
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

          if (c.reduced) {
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

          // Shared starting state.
          gsap.set(".hiw-understand-line", { opacity: 0, y: 18 });
          gsap.set(".hiw-understand-ring", {
            opacity: 0,
            scale: 0.94,
            transformOrigin: "50% 50%",
          });
          gsap.set(".hiw-understand-score", { opacity: 0 });
          const scoreProxy = { value: 0 };

          if (c.desktopFull && pinTarget.current) {
            const tl = gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: root,
                start: "top top",
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
      className="relative scroll-mt-28 py-24 md:py-32 focus:outline-none"
    >
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
            Step 02 — Understand
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
          One score. Every marker. Clear trends.
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
          Merios compresses 150+ biomarkers into a single number — then expands
          them back into the trend view your body actually needs.
        </p>
      </div>

      {/* Pinned stage — the inner ref is what ScrollTrigger pins. */}
      <div
        ref={pinTarget}
        className="mt-14 grid grid-cols-1 items-center gap-12 md:mt-20 md:grid-cols-[1fr_1.1fr] md:gap-16"
      >
        {/* LEFT — score visual (parallax layer A: background rings) */}
        <div className="relative flex items-center justify-center">
          <div className="relative h-[280px] w-[280px] md:h-[360px] md:w-[360px]">
            {/* Parallax A — background rings, speed -0.3 */}
            <div className="hiw-parallax-a absolute inset-0 will-change-transform">
              <svg
                viewBox="0 0 360 360"
                className="hiw-understand-ring absolute inset-0 h-full w-full"
                aria-hidden
              >
                <circle
                  cx="180"
                  cy="180"
                  r="150"
                  fill="none"
                  stroke="var(--color-grid)"
                  strokeWidth="1"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="120"
                  fill="none"
                  stroke="var(--color-grid)"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="150"
                  fill="none"
                  stroke="var(--color-green-deep)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="720 1000"
                  transform="rotate(-90 180 180)"
                  opacity="0.85"
                />
              </svg>
            </div>
            {/* Parallax B — anchor layer, speed 0 (score text) */}
            <div className="hiw-parallax-b hiw-understand-score absolute inset-0 flex flex-col items-center justify-center">
              <span
                ref={scoreRef}
                className="tabular-nums"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(5rem, 11vw, 8rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--color-ink)",
                }}
              >
                0
              </span>
              <span
                className="mt-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                }}
              >
                Merios Score
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — copy + sparklines (parallax layer C, speed +0.3) */}
        <div className="hiw-parallax-c will-change-transform">
          <ul className="flex flex-col gap-7">
            {COPY_LINES.map((line, i) => (
              <li
                key={line}
                className="hiw-understand-line flex items-center gap-5"
              >
                <svg
                  viewBox="0 0 82 36"
                  className="h-8 w-[120px] flex-shrink-0"
                  aria-hidden
                >
                  <path
                    d={SPARKLINES[i] ?? SPARKLINES[0]}
                    fill="none"
                    stroke="var(--color-pulse)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hiw-understand-spark"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                    lineHeight: 1.35,
                    fontWeight: 400,
                    letterSpacing: "-0.015em",
                    color: "var(--color-ink)",
                  }}
                >
                  {line}
                </span>
              </li>
            ))}
          </ul>
          <p
            className="hiw-understand-line mt-10 max-w-[460px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
            }}
          >
            The score is a signal, not a verdict — each subsystem stays legible
            on its own page, so you always know where the number comes from.
          </p>
        </div>
      </div>
    </section>
  );
}
