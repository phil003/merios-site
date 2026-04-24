"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { PILLARS } from "@/content/biomarkers";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Deterministic sparkline per pillar — keeps the visual language consistent
// with /science system cards and Journal thumbs. Each seed yields a distinct
// rhythm so the four cards read as variation, not repetition.
function sparkPath(seed: number): { d: string; endY: number } {
  const phase = seed * 1.1;
  const amp = 5 + (seed % 3) * 1.3;
  const points: { x: number; y: number }[] = [];
  for (let x = 2; x <= 122; x += 10) {
    const t = (x - 2) / 120;
    const y = 14 + Math.sin(phase + t * Math.PI * 2) * amp - t * 6;
    points.push({ x, y: Number(y.toFixed(2)) });
  }
  const d = `M${points[0].x} ${points[0].y} ${points
    .slice(1)
    .map((p) => `L${p.x} ${p.y}`)
    .join(" ")}`;
  return { d, endY: points[points.length - 1].y };
}

export default function Pillars() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const reduced = context.conditions?.reduced;

          gsap.set(".pillar-card", { opacity: 0, y: 28 });

          const paths =
            gsap.utils.toArray<SVGPathElement>(".pillar-spark") ?? [];
          paths.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          });

          if (reduced) {
            gsap.set(".pillar-card", { opacity: 1, y: 0 });
            gsap.set(paths, { strokeDashoffset: 0 });
            return;
          }

          ScrollTrigger.batch(".pillar-card", {
            start: "top 85%",
            onEnter: (targets) => {
              gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.08,
                overwrite: true,
              });
              targets.forEach((card, i) => {
                const path = card.querySelector(".pillar-spark");
                if (path) {
                  gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 1.1,
                    ease: "expo.out",
                    delay: 0.2 + i * 0.08,
                  });
                }
              });
            },
            once: true,
          });
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative py-24 md:py-32"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="max-w-[680px]">
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
              Four pillars, one signal
            </span>
          </div>

          <h2
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
            What Merios measures.
          </h2>

          <p
            className="mt-6 max-w-[520px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
            }}
          >
            Health is a system of systems. Four pillars feed the single
            Merios Score — so you always know where to intervene next.
          </p>
        </div>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-4"
        >
          {PILLARS.map((pillar, i) => {
            const spark = sparkPath(i);
            return (
              <li key={pillar.slug}>
                <article
                  className="pillar-card group relative flex h-full flex-col rounded-2xl p-7 transition-transform duration-500 motion-reduce:transition-none hover:-translate-y-1 md:p-8"
                  style={{
                    background: "var(--color-canvas-alt)",
                    border: "1px solid var(--color-grid)",
                    transitionTimingFunction: "var(--ease-expo)",
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        color: "var(--color-ink-tertiary)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-pulse)" }}
                    />
                  </div>

                  <h3
                    className="mt-12"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 26,
                      fontWeight: 400,
                      lineHeight: 1.1,
                      letterSpacing: "-0.015em",
                      color: "var(--color-ink)",
                    }}
                  >
                    {pillar.label}
                  </h3>

                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    {pillar.tagline}
                  </p>

                  <svg
                    className="mt-auto pt-10"
                    viewBox="0 0 124 32"
                    width="100%"
                    height="32"
                    aria-hidden
                    style={{ overflow: "visible" }}
                  >
                    <path
                      d={spark.d}
                      fill="none"
                      stroke="var(--color-pulse)"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pillar-spark"
                    />
                    <circle cx="122" cy={spark.endY} r="3" fill="var(--color-pulse)" />
                    <circle
                      cx="122"
                      cy={spark.endY}
                      r="7"
                      fill="var(--color-pulse)"
                      opacity="0.18"
                    />
                  </svg>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
