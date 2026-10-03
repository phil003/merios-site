"use client";

import Reveal from "@/components/ui/Reveal";
import { Mark } from "@/components/ui/Logo";
import styles from "./about.module.css";

/**
 * v3: four pillars as the four quarters of one ring (Blood · Movement ·
 * Sleep · Stress, clockwise from the top) around the Merios mark, on a night
 * tile. Decorative and text-free — the copy carries the meaning.
 */
const RING_R = 104;
const RING_GAP_DEG = 14;
const QUARTERS = [
  "var(--color-lime)",
  "var(--ab-activity)",
  "var(--ab-recovery)",
  "var(--ab-zen)",
];

function arc(q: number): string {
  const start = ((-90 + q * 90 + RING_GAP_DEG / 2) * Math.PI) / 180;
  const end = ((-90 + (q + 1) * 90 - RING_GAP_DEG / 2) * Math.PI) / 180;
  const p = (a: number) =>
    `${(150 + RING_R * Math.cos(a)).toFixed(2)} ${(150 + RING_R * Math.sin(a)).toFixed(2)}`;
  return `M${p(start)} A${RING_R} ${RING_R} 0 0 1 ${p(end)}`;
}

function CompositeEmblem() {
  return (
    <div className={`night ${styles.emblem}`} aria-hidden>
      <svg className={styles.emblemRing} viewBox="0 0 300 300" focusable="false">
        <defs>
          <radialGradient id="about-emblem-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#D6F050" stopOpacity="0.16" />
            <stop offset="1" stopColor="#D6F050" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="96" fill="url(#about-emblem-glow)" />
        <circle cx="150" cy="150" r="132" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeDasharray="2 6" />
        <circle cx="150" cy="150" r={RING_R} fill="none" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="16" />
        {QUARTERS.map((color, q) => (
          <path
            key={color}
            d={arc(q)}
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <Mark className={styles.emblemMark} color="#F4F6F7" cut="#12181C" />
    </div>
  );
}

export default function MissionSection() {
  return (
    <section className={styles.section} aria-labelledby="about-mission-title">
      <div className={styles.container}>
        <div className={styles.missionGrid}>
          <div className={styles.missionAside}>
            <Reveal>
              <div className={`label ${styles.eyebrow}`}>
                <span aria-hidden className="label-dot label-dot--ink" />
                <span>Mission</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <CompositeEmblem />
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.05}>
              <h2
                id="about-mission-title"
                className={`${styles.title} ${styles.missionTitle}`}
              >
                Health data deserves a single, honest signal.
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className={styles.missionBody}>
                Merios exists to resolve the fragmentation of modern health data.
                Blood work in one app. Wearables in another. Stress and sleep
                scattered across services that never speak to each other. The
                result is noise where there should be clarity.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className={styles.missionBody}>
                We unify four pillars &mdash; Blood, Movement, Sleep, Stress
                &mdash; into one composite score you actually own. Grounded in
                peer-reviewed research. Built for the decade, not the quarter.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
