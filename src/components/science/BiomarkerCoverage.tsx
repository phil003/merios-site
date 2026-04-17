"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Reveal from "@/components/ui/Reveal";
import { BLOOD_SYSTEMS } from "@/content/biomarkers";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function BiomarkerCoverage() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          full: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduced = context.conditions?.reduced;

          gsap.set(".bc-card", { opacity: 0, y: 28 });

          if (reduced) {
            gsap.set(".bc-card", { opacity: 1, y: 0 });
            return;
          }

          ScrollTrigger.batch(".bc-card", {
            start: "top 85%",
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.95,
                ease: "expo.out",
                stagger: 0.08,
                overwrite: true,
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
      id="coverage"
      ref={container}
      aria-labelledby="science-coverage-heading"
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
              03 · The Blood pillar
            </span>
          </span>

          <h2
            id="science-coverage-heading"
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
            Eleven blood systems,
            <br />
            one composite signal.
          </h2>

          <p
            className="mt-6 max-w-[620px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
            }}
          >
            Within the Blood pillar, Merios reads eleven biomarker systems
            the way a clinician reads a panel — as a network, not a list.
          </p>
        </Reveal>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {BLOOD_SYSTEMS.map((system, i) => (
            <li key={system.slug}>
              <SystemCard index={i} label={system.label} description={system.description} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SystemCard({
  index,
  label,
  description,
}: {
  index: number;
  label: string;
  description: string;
}) {
  return (
    <article
      className="bc-card group relative flex h-full flex-col rounded-2xl p-7 transition-transform duration-500 motion-reduce:transition-none hover:-translate-y-0.5 md:p-8"
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
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--color-pulse)" }}
        />
      </div>

      <h3
        className="mt-10"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
          fontWeight: 400,
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
          color: "var(--color-ink)",
        }}
      >
        {label}
      </h3>

      <p
        className="mt-3"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14.5,
          lineHeight: 1.55,
          color: "var(--color-ink-secondary)",
        }}
      >
        {description}
      </p>

      <svg
        className="mt-auto pt-8"
        viewBox="0 0 124 24"
        width="100%"
        height="24"
        aria-hidden
        style={{ overflow: "visible" }}
      >
        <path
          d={sparkPath(index)}
          fill="none"
          stroke="var(--color-pulse)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    </article>
  );
}

// Small deterministic sparkline generator so each card has its own rhythm
// without shipping a dataset. Keeps the visual language consistent with
// Pillars (home) and Journal thumb accents.
function sparkPath(seed: number): string {
  const phase = seed * 0.9;
  const amp = 6 + (seed % 3) * 1.2;
  const points: string[] = [];
  for (let x = 2; x <= 122; x += 12) {
    const t = (x - 2) / 120;
    const y = 12 + Math.sin(phase + t * Math.PI * 2) * amp - t * 4;
    points.push(`${x} ${y.toFixed(2)}`);
  }
  return `M${points[0]} ${points
    .slice(1)
    .map((p) => `L${p}`)
    .join(" ")}`;
}
