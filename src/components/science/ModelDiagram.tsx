"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Reveal from "@/components/ui/Reveal";
import styles from "./science.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Science — Model diagram.
 *
 * Four pillars converge into a single composite score. Nodes reveal
 * sequentially with a 120ms stagger; SVG connecting lines draw in via
 * `stroke-dashoffset` over 800ms. The whole timeline is attached to a
 * ScrollTrigger starting at "top 70%" and gated by prefers-reduced-motion.
 *
 * v3: the chapter sits on a night plate — white traces, the composite as the
 * lime signal — so the figure reads like the app's own data views.
 */

const PILLARS = [
  { n: "01", label: "Metabolic" },
  { n: "02", label: "Cardiovascular" },
  { n: "03", label: "Hormonal" },
  { n: "04", label: "Inflammation" },
];

export default function ScienceModelDiagram() {
  const container = useRef<HTMLElement>(null);
  const panRef = useRef<HTMLDivElement>(null);

  // Small screens pan the figure (CSS): open it centred on the composite
  // node, and make the region keyboard-reachable only while it scrolls.
  useEffect(() => {
    const el = panRef.current;
    if (!el) return;
    let centred = false;
    const update = () => {
      const scrollable = el.scrollWidth > el.clientWidth + 1;
      if (scrollable) {
        el.tabIndex = 0;
        if (!centred) {
          el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
          centred = true;
        }
      } else {
        el.removeAttribute("tabindex");
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
      className={styles.chapter}
    >
      <div className={`night ${styles.plate}`}>
        <Reveal amount={0.2}>
          <span className={`label ${styles.plateEyebrow}`}>
            <span aria-hidden className="label-dot" />
            <span>03 · The model</span>
          </span>

          <h2
            id="science-model-heading"
            className={`${styles.title} ${styles.plateTitle}`}
          >
            Four pillars, one score.
          </h2>

          <p className={`${styles.lead} ${styles.plateLead}`}>
            Every marker is weighted inside a pillar; pillars aggregate into a
            single composite on a 0–100 scale. The pillars are designed to be
            independently auditable so clinicians can see exactly where the
            score comes from.
          </p>
        </Reveal>

        <Reveal amount={0.15} delay={0.1}>
          <figure className={styles.modelFigure}>
            {/* Pans on small screens (see the effect above). */}
            <div ref={panRef} className={styles.modelScroll}>
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

                <defs>
                  <radialGradient id="model-core-glow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#D6F050" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#D6F050" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Connecting lines pillars → center node (paths, for dash anim) */}
                {PILLARS.map((_, i) => {
                  const x1 = 80 + i * 200;
                  return (
                    <path
                      key={`line-${i}`}
                      className="model-line"
                      d={`M${x1} 130 L 400 230`}
                      stroke="rgb(255 255 255 / 0.26)"
                      strokeWidth="1.3"
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
                        r="34"
                        fill="rgb(255 255 255 / 0.03)"
                      />
                      <circle
                        cx={cx}
                        cy={110}
                        r="26"
                        fill="#12171B"
                        stroke="rgb(255 255 255 / 0.42)"
                        strokeWidth="1.3"
                      />
                      <text
                        x={cx}
                        y={115}
                        textAnchor="middle"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          fill: "rgb(244 246 247 / 0.78)",
                          fontWeight: 500,
                        }}
                      >
                        {p.n}
                      </text>
                      <text
                        x={cx}
                        y={66}
                        textAnchor="middle"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 17,
                          fill: "#F4F6F7",
                          fontWeight: 650,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                })}

                {/* Composite node */}
                <g className="model-composite">
                  <circle cx="400" cy="230" r="118" fill="url(#model-core-glow)" />
                  <circle
                    cx="400"
                    cy="230"
                    r="62"
                    fill="var(--color-lime)"
                  />
                  <circle
                    cx="400"
                    cy="230"
                    r="76"
                    fill="none"
                    stroke="rgb(255 255 255 / 0.4)"
                    strokeWidth="1.2"
                    strokeDasharray="2 5"
                  />
                  <text
                    x="400"
                    y="214"
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      fill: "#10231A",
                      fontWeight: 600,
                    }}
                  >
                    MERIOS
                  </text>
                  <text
                    x="400"
                    y="254"
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 40,
                      fill: "#10231A",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    82
                  </text>
                </g>

                {/* Branch: biological age */}
                <g className="model-branch">
                  <line
                    x1="400"
                    y1="306"
                    x2="400"
                    y2="330"
                    stroke="rgb(255 255 255 / 0.3)"
                    strokeWidth="1.2"
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
                      fill: "rgb(244 246 247 / 0.78)",
                      fontWeight: 500,
                    }}
                  >
                    + Biological age delta
                  </text>
                </g>
              </svg>
            </div>

            <figcaption className={styles.figCaption}>
              Fig. 1 · Composite aggregation — illustrative
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
