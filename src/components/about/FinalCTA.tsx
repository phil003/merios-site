"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import styles from "./about.module.css";

// The logo's pulse, drawn large: a calm line, one beat, and the lime dot it
// arrives on — with a comet that keeps making the trip (CSS only).
const PULSE = "M0 150 H230 L254 176 L282 54 L318 252 L340 150 H440";

function ArrivalPulse() {
  return (
    <div className={styles.ctaPulse} aria-hidden>
      <svg viewBox="0 0 500 300" focusable="false">
        <defs>
          <linearGradient
            id="about-cta-pulse"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="440"
            y2="0"
          >
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="about-cta-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#D6F050" stopOpacity="0.22" />
            <stop offset="1" stopColor="#D6F050" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="440" cy="150" r="70" fill="url(#about-cta-glow)" />
        <path
          d={PULSE}
          fill="none"
          stroke="url(#about-cta-pulse)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={PULSE} className={styles.ctaComet} pathLength={1000} />
        <circle cx="440" cy="150" r="10" className={styles.ctaDot} />
      </svg>
    </div>
  );
}

export default function FinalCTA() {
  return (
    <section
      className={`night ${styles.cta}`}
      data-nav="dark"
      aria-labelledby="about-cta-title"
    >
      <div className={styles.container}>
        <div className={styles.ctaGrid}>
          <div>
            <Reveal>
              <div className={`label ${styles.ctaEyebrow}`}>
                <span aria-hidden className="label-dot animate-pulse-dot" />
                <span>Early access</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 id="about-cta-title" className={styles.ctaTitle}>
                Join the early
                <br />
                <span className="chrome-text">access.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className={styles.ctaCopy}>
                One composite score. Four pillars. A decade of health intelligence
                that stays yours. Be among the first to see it clearly.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className={styles.ctaAction}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                  <span aria-hidden className="btn-arrow">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          <ArrivalPulse />
        </div>
      </div>
    </section>
  );
}
