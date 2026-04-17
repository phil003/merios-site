"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Pillar = {
  number: string;
  title: string;
  copy: string;
  value: number;
  spark: string;
  endY: number;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Metabolic",
    copy: "Your energy, your long-term risk.",
    value: 82,
    spark: "M2 26 Q24 20 46 18 T92 12 T122 6",
    endY: 6,
  },
  {
    number: "02",
    title: "Cardiovascular",
    copy: "The machinery that keeps you alive.",
    value: 71,
    spark: "M2 22 Q24 26 46 20 T92 14 T122 10",
    endY: 10,
  },
  {
    number: "03",
    title: "Hormonal",
    copy: "Vitality, sleep, resilience.",
    value: 79,
    spark: "M2 24 Q24 18 46 22 T92 10 T122 4",
    endY: 4,
  },
  {
    number: "04",
    title: "Inflammation",
    copy: "The signal most missed, the leverage most found.",
    value: 68,
    spark: "M2 18 Q24 22 46 14 T92 20 T122 12",
    endY: 12,
  },
];

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
              Four pillars
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
            Health is a system of systems. We track four — each feeding the
            single Merios Score that tells you where to intervene next.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <article
              key={p.number}
              className="pillar-card group relative flex flex-col rounded-2xl p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 md:p-8"
              style={{
                background: "var(--color-canvas-alt)",
                border: "1px solid var(--color-grid)",
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
                  {p.number}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 32,
                    fontWeight: 300,
                    color: "var(--color-ink)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {p.value}
                </span>
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
                {p.title}
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
                {p.copy}
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
                  d={p.spark}
                  fill="none"
                  stroke="var(--color-pulse)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pillar-spark"
                />
                <circle
                  cx="122"
                  cy={p.endY}
                  r="3"
                  fill="var(--color-pulse)"
                />
                <circle
                  cx="122"
                  cy={p.endY}
                  r="7"
                  fill="var(--color-pulse)"
                  opacity="0.18"
                />
              </svg>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
