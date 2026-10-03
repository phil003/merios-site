"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Reveal from "@/components/ui/Reveal";
import { BLOOD_SYSTEMS } from "@/content/biomarkers";
import styles from "./science.module.css";

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

          if (reduced) {
            gsap.set(".bc-card", { opacity: 1, y: 0 });
            return;
          }

          gsap.set(".bc-card", { opacity: 0, y: 24 });

          ScrollTrigger.batch(".bc-card", {
            start: "top 85%",
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                // Canonical expo out — matches easing.expo [0.16, 1, 0.3, 1].
                ease: "expo.out",
                stagger: 0.06,
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
      className={styles.chapter}
    >
      <Reveal amount={0.2}>
        <span className={`label ${styles.eyebrow}`}>
          <span aria-hidden className="label-dot label-dot--ink" />
          <span>03 · The Blood pillar</span>
        </span>

        <h2 id="science-coverage-heading" className={styles.title}>
          Eleven blood systems,
          <br />
          one composite signal.
        </h2>

        <p className={styles.lead}>
          Within the Blood pillar, Merios reads eleven biomarker systems
          the way a clinician reads a panel — as a network, not a list.
        </p>
      </Reveal>

      <ul role="list" className={styles.systems}>
        {BLOOD_SYSTEMS.map((system, i) => (
          <li key={system.slug}>
            <SystemCard
              index={i}
              label={system.label}
              description={system.description}
            />
          </li>
        ))}
        {/* Decorative 12th tile: the eleven traces read into one signal. */}
        <li aria-hidden className={`bc-card night ${styles.signalTile}`}>
          <SignalArt />
        </li>
      </ul>
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
    <article className={`bc-card ${styles.system}`}>
      <div className={styles.systemTop}>
        <span className={styles.systemIndex}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className={`animate-pulse-dot ${styles.systemDot}`}
        />
      </div>

      <h3 className={styles.systemTitle}>{label}</h3>

      <p className={styles.systemMarkers}>{description}</p>

      <div className={styles.systemSpark} aria-hidden>
        <svg viewBox="0 0 124 24" preserveAspectRatio="none" focusable="false">
          <path
            d={sparkPath(index)}
            fill="none"
            stroke="var(--color-green-deep)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className={styles.systemSparkDot}
          style={{ top: `${(26 + (sparkEnd(index) / 24) * 34).toFixed(1)}px` }}
        />
      </div>
    </article>
  );
}

/** Eleven faint traces converging on one lime point (decorative). */
function SignalArt() {
  const traces = Array.from({ length: 11 }, (_, i) => {
    const y0 = 20 + i * 16;
    return `M-10 ${y0} C 120 ${y0}, 150 ${100 + (i - 5) * 4}, 236 100`;
  });
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" focusable="false">
      {traces.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.1 + (i % 3) * 0.06}
          strokeWidth="1.4"
        />
      ))}
      <path d="M236 100 H252 L257 106 L263 82 L271 118 L276 100 H320" fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="236" cy="100" r="7" fill="#D6F050" style={{ filter: "drop-shadow(0 0 10px rgb(214 240 80 / 0.9))" }} />
    </svg>
  );
}

// Small deterministic sparkline generator so each card has its own rhythm
// without shipping a dataset. Keeps the visual language consistent with
// Pillars (home) and Journal thumb accents.
function sparkY(seed: number, x: number): number {
  const phase = seed * 0.9;
  const amp = 6 + (seed % 3) * 1.2;
  const t = (x - 2) / 120;
  return 12 + Math.sin(phase + t * Math.PI * 2) * amp - t * 4;
}

function sparkEnd(seed: number): number {
  return sparkY(seed, 122);
}

function sparkPath(seed: number): string {
  const points: string[] = [];
  for (let x = 2; x <= 122; x += 12) {
    points.push(`${x} ${sparkY(seed, x).toFixed(2)}`);
  }
  return `M${points[0]} ${points
    .slice(1)
    .map((p) => `L${p}`)
    .join(" ")}`;
}
