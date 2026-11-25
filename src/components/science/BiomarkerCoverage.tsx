"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Reveal from "@/components/ui/Reveal";
import { BLOOD_SYSTEMS } from "@/content/biomarkers";
import styles from "./science.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Science — Coverage: the eleven blood systems (v2 "Open Sky").
 *
 * Glass cards with a Newsreader index, the system's markers and a zenith
 * sparkline, plus a decorative twelfth tile (eleven traces read into one
 * signal). Cards rise in a ScrollTrigger batch; reduced motion skips it.
 */
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
          <span>02 · The Blood pillar</span>
        </span>

        <h2 id="science-coverage-heading" className={styles.title}>
          Eleven blood systems,
          <br />
          <em>one composite signal.</em>
        </h2>

        <p className={styles.lead}>
          Within the Blood pillar, Merios reads eleven biomarker systems
          the way a clinician reads a panel — as a network, not a list.
        </p>
      </Reveal>

      <ul role="list" className={styles.systems}>
        {BLOOD_SYSTEMS.map((system, i) => (
          <li key={system.slug} className={`bc-card ${styles.system}`}>
            <SystemCard
              index={i}
              label={system.label}
              description={system.description}
            />
          </li>
        ))}
        {/* Decorative 12th tile: the eleven traces read into one signal. */}
        <li aria-hidden className={`bc-card ${styles.signalTile}`}>
          <SignalArt />
          <span className={styles.signalTileLabel}>Eleven traces, one signal</span>
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
    <>
      <div className={styles.systemTop}>
        <span className={styles.systemIndex}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden className={styles.systemDot} />
      </div>

      <h3 className={styles.systemTitle}>{label}</h3>

      <p className={styles.systemMarkers}>{description}</p>

      <svg
        className={styles.systemSpark}
        viewBox="0 0 124 24"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        <path
          d={sparkPath(index)}
          fill="none"
          stroke="#6E8FE8"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}

/** Eleven white traces converging on one ink point (decorative). */
function SignalArt() {
  const traces = Array.from({ length: 11 }, (_, i) => {
    const y0 = 24 + i * 18;
    return `M-10 ${y0} C 120 ${y0}, 150 ${92 + i * 4}, 228 112`;
  });
  return (
    <svg viewBox="0 0 300 224" preserveAspectRatio="xMidYMid slice" focusable="false">
      <g fill="none" stroke="#FFFFFF" strokeWidth="1.4">
        {traces.map((d, i) => (
          <path key={d} d={d} strokeOpacity={0.5 + (i % 3) * 0.15} />
        ))}
      </g>
      <path
        d="M228 112 H244 L250 120 L257 92 L266 132 L272 112 H320"
        fill="none"
        stroke="#18213F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="228" cy="112" r="7" fill="#18213F" />
    </svg>
  );
}

// Small deterministic sparkline generator so each card has its own rhythm
// without shipping a dataset.
function sparkY(seed: number, x: number): number {
  const phase = seed * 0.9;
  const amp = 6 + (seed % 3) * 1.2;
  const t = (x - 2) / 120;
  return 12 + Math.sin(phase + t * Math.PI * 2) * amp - t * 4;
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
