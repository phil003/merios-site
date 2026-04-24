"use client";

import Reveal from "@/components/ui/Reveal";

export default function MissionSection() {
  return (
    <section
      className="px-6 md:px-10"
      style={{
        borderTop: "1px solid var(--color-grid)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        background: "var(--color-canvas)",
      }}
      aria-labelledby="about-mission-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr] md:gap-20">
          <Reveal>
            <div
              className="flex items-center gap-2.5"
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
                Mission
              </span>
            </div>
          </Reveal>

          <div className="max-w-[680px]">
            <Reveal delay={0.05}>
              <h2
                id="about-mission-title"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-display-m)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                }}
              >
                Health data deserves a single, honest signal.
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p
                className="mt-8"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-l)",
                  lineHeight: 1.7,
                  color: "var(--color-ink-secondary)",
                  letterSpacing: "-0.005em",
                }}
              >
                Merios exists to resolve the fragmentation of modern health data.
                Blood work in one app. Wearables in another. Stress and sleep
                scattered across services that never speak to each other. The
                result is noise where there should be clarity.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="mt-6"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-l)",
                  lineHeight: 1.7,
                  color: "var(--color-ink-secondary)",
                  letterSpacing: "-0.005em",
                }}
              >
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
