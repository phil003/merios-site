"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Reveal from "@/components/ui/Reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Science — Model diagram.
 *
 * Four pillars converge into a single composite score. Nodes reveal
 * sequentially with a 120ms stagger; SVG connecting lines draw in via
 * `stroke-dashoffset` over 800ms. The whole timeline is attached to a
 * ScrollTrigger starting at "top 70%" and gated by prefers-reduced-motion.
 */

const PILLARS = [
  { n: "01", label: "Metabolic" },
  { n: "02", label: "Cardiovascular" },
  { n: "03", label: "Hormonal" },
  { n: "04", label: "Inflammation" },
];

export default function ScienceModelDiagram() {
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
          const scope = container.current;
          if (!scope) return;

          const figure = scope.querySelector<SVGSVGElement>(".model-diagram");
          if (!figure) return;

          const lines = figure.querySelectorAll<SVGPathElement>(".model-line");
          const nodes = figure.querySelectorAll<SVGGElement>(".model-node");
          const composite = figure.querySelector<SVGGElement>(
            ".model-composite",
          );
          const branch = figure.querySelector<SVGGElement>(".model-branch");

          if (reduced) {
            gsap.set([nodes, composite, branch].filter(Boolean), {
              opacity: 1,
            });
            lines.forEach((line) => {
              const length = line.getTotalLength();
              line.style.strokeDasharray = `${length}`;
              line.style.strokeDashoffset = "0";
            });
            return;
          }

          // Prep dashoffset for the connecting lines.
          lines.forEach((line) => {
            const length = line.getTotalLength();
            line.style.strokeDasharray = `${length}`;
            line.style.strokeDashoffset = `${length}`;
          });

          gsap.set(nodes, { opacity: 0, y: 16 });
          gsap.set(composite, { opacity: 0, scale: 0.9, transformOrigin: "400px 230px" });
          gsap.set(branch, { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: figure,
              start: "top 70%",
              once: true,
            },
            defaults: { ease: "expo.out" },
          });

          tl.to(nodes, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          });

          tl.to(
            lines,
            {
              strokeDashoffset: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.04,
            },
            "-=0.2",
          );

          tl.to(
            composite,
            { opacity: 1, scale: 1, duration: 0.8 },
            "-=0.4",
          );

          tl.to(branch, { opacity: 1, duration: 0.5 }, "-=0.2");
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="model"
      aria-labelledby="science-model-heading"
      className="relative border-t py-24 md:py-32"
      style={{
        background: "var(--color-canvas-alt)",
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
              03 · The model
            </span>
          </span>

          <h2
            id="science-model-heading"
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
            Four pillars, one score.
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
            Every marker is weighted inside a pillar; pillars aggregate into a
            single composite on a 0–100 scale. The pillars are designed to be
            independently auditable so clinicians can see exactly where the
            score comes from.
          </p>
        </Reveal>

        <Reveal amount={0.15} delay={0.1}>
          <figure
            className="mt-16 rounded-2xl p-8 md:p-12"
            style={{
              background: "var(--color-canvas)",
              border: "1px solid var(--color-grid)",
            }}
          >
            <svg
              className="model-diagram"
              viewBox="0 0 800 360"
              width="100%"
              role="img"
              aria-labelledby="model-diagram-title model-diagram-desc"
              style={{ display: "block", maxHeight: 440, overflow: "visible" }}
            >
              <title id="model-diagram-title">
                Four health pillars converging into a single composite score.
              </title>
              <desc id="model-diagram-desc">
                Diagram showing four columns labelled Metabolic,
                Cardiovascular, Hormonal and Inflammation converging into a
                central composite node labelled Composite Score, with a
                biological age estimate branching out below.
              </desc>

              {/* Connecting lines pillars → center node (paths, for dash anim) */}
              {PILLARS.map((_, i) => {
                const x1 = 80 + i * 200;
                return (
                  <path
                    key={`line-${i}`}
                    className="model-line"
                    d={`M${x1} 130 L 400 230`}
                    stroke="var(--color-grid)"
                    strokeWidth="1"
                    fill="none"
                  />
                );
              })}

              {/* Pillar nodes */}
              {PILLARS.map((p, i) => {
                const cx = 80 + i * 200;
                return (
                  <g key={p.n} className="model-node">
                    <circle
                      cx={cx}
                      cy={110}
                      r="26"
                      fill="var(--color-canvas-alt)"
                      stroke="var(--color-grid)"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={115}
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        fill: "var(--color-ink-tertiary)",
                        fontWeight: 500,
                      }}
                    >
                      {p.n}
                    </text>
                    <text
                      x={cx}
                      y={70}
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 16,
                        fill: "var(--color-ink)",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}

              {/* Composite node */}
              <g className="model-composite">
                <circle
                  cx="400"
                  cy="230"
                  r="62"
                  fill="var(--color-green-deep)"
                />
                <circle
                  cx="400"
                  cy="230"
                  r="74"
                  fill="none"
                  stroke="var(--color-pulse)"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  strokeDasharray="2 5"
                />
                <text
                  x="400"
                  y="224"
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    fill: "var(--color-pulse)",
                    fontWeight: 500,
                  }}
                >
                  MERIOS
                </text>
                <text
                  x="400"
                  y="250"
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 34,
                    fill: "var(--color-canvas)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                  }}
                >
                  82
                </text>
              </g>

              {/* Branch: biological age */}
              <g className="model-branch">
                <line
                  x1="400"
                  y1="292"
                  x2="400"
                  y2="330"
                  stroke="var(--color-grid)"
                  strokeWidth="1"
                />
                <text
                  x="400"
                  y="350"
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fill: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                  }}
                >
                  + Biological age delta
                </text>
              </g>
            </svg>

            <figcaption
              className="mt-8"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-ink-tertiary)",
                fontWeight: 500,
              }}
            >
              Fig. 1 · Composite aggregation — placeholder illustration
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
