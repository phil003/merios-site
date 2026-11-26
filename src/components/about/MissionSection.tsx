import Reveal from "@/components/ui/Reveal";
import { Mark } from "@/components/ui/Logo";
import styles from "./about.module.css";

/**
 * Open Sky: the four pillars as the four quarters of one ring around the
 * Merios mark, on a white card beside the mission. Decorative and text-free;
 * the copy carries the meaning. Server component: the reveals are the CSS
 * `data-rv` ones (globals.css + the inline observer in layout.tsx).
 */
const RING_R = 104;
const RING_GAP_DEG = 14;
// One colour per quarter, clockwise from the top (sky, apricot, zenith, violet).
const QUARTERS = ["#A8C2F4", "#FFA472", "#6E8FE8", "#9A8BEA"];

function arc(q: number): string {
  const start = ((-90 + q * 90 + RING_GAP_DEG / 2) * Math.PI) / 180;
  const end = ((-90 + (q + 1) * 90 - RING_GAP_DEG / 2) * Math.PI) / 180;
  const p = (a: number) =>
    `${(150 + RING_R * Math.cos(a)).toFixed(2)} ${(150 + RING_R * Math.sin(a)).toFixed(2)}`;
  return `M${p(start)} A${RING_R} ${RING_R} 0 0 1 ${p(end)}`;
}

function CompositeEmblem() {
  return (
    <div className={styles.emblem} aria-hidden>
      <svg className={styles.emblemRing} viewBox="0 0 300 300" focusable="false">
        <defs>
          <radialGradient id="about-emblem-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#C9C0F6" stopOpacity="0.42" />
            <stop offset="1" stopColor="#C9C0F6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="96" fill="url(#about-emblem-glow)" />
        <circle
          cx="150"
          cy="150"
          r="132"
          fill="none"
          stroke="#18213F"
          strokeOpacity="0.12"
          strokeDasharray="2 6"
        />
        <circle cx="150" cy="150" r={RING_R} fill="none" stroke="#EEF0FB" strokeWidth="16" />
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
      <Mark className={styles.emblemMark} color="#18213F" cut="#FFFFFF" />
    </div>
  );
}

export default function MissionSection() {
  return (
    <section className={styles.section} aria-labelledby="about-mission-title">
      <div className={styles.container}>
        <div className={styles.mission}>
          <div className={styles.missionCopy}>
            <Reveal>
              <p className={styles.eyebrow}>Mission</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 id="about-mission-title" className={styles.h2}>
                Health data deserves a single, <em>honest signal.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className={styles.missionBody}>
                Merios exists to resolve the fragmentation of modern health data.
                Blood work in one app. Wearables in another. Stress and sleep
                scattered across services that never speak to each other. The
                result is noise where there should be clarity.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className={styles.missionBody}>
                We unify four pillars &mdash; Blood, Activity, Recovery and Zen
                &mdash; into one composite score. Grounded in peer-reviewed
                research. Built for the decade, not the quarter.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className={styles.emblemSlot}>
            <CompositeEmblem />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
