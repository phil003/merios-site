"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section
      className="relative px-6 md:px-10"
      style={{
        background: "var(--color-ink)",
        color: "var(--color-canvas)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
      }}
      aria-labelledby="about-cta-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[760px]">
          <Reveal>
            <div
              className="mb-6 inline-flex items-center gap-2.5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span
                aria-hidden
                className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-pulse)" }}
              />
              <span
                className="text-[10.5px] uppercase"
                style={{
                  color: "var(--color-pulse)",
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                }}
              >
                Early access
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="about-cta-title"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display-l)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--color-canvas)",
              }}
            >
              Join the early
              <br />
              access.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="mt-8 max-w-[52ch]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body-l)",
                lineHeight: 1.6,
                color:
                  "color-mix(in srgb, var(--color-canvas) 72%, transparent)",
                letterSpacing: "-0.005em",
              }}
            >
              One composite score. Four pillars. A decade of health intelligence
              that stays yours. Be among the first to see it clearly.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12">
              <Link
                href="/early-access"
                className="about-cta-button group inline-flex items-center gap-3 rounded-full px-8 py-4"
                style={{
                  background: "var(--color-pulse)",
                  color: "var(--color-ink)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.005em",
                  transition:
                    "transform 300ms var(--ease-expo), background 300ms var(--ease-expo)",
                }}
              >
                Join the Early Access
                <span
                  aria-hidden
                  className="about-cta-arrow inline-block"
                  style={{
                    transition: "transform 300ms var(--ease-expo)",
                  }}
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        .about-cta-button:hover {
          background: color-mix(
            in srgb,
            var(--color-pulse) 86%,
            var(--color-canvas)
          );
        }
        .about-cta-button:hover .about-cta-arrow {
          transform: translateX(4px);
        }
        .about-cta-button:focus-visible {
          outline: 2px solid var(--color-pulse);
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .about-cta-button,
          .about-cta-arrow {
            transition: none;
          }
          .about-cta-button:hover .about-cta-arrow {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
