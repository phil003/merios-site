import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import { ADVISORS, type Advisor } from "./data";

export { ADVISORS };
export type { Advisor };

/**
 * Science — Advisory board.
 *
 * Server component: card reveals use the shared data-rv mechanism with a
 * 60ms incremental --rv-delay; the hover lift is a pure CSS transition
 * (disabled under prefers-reduced-motion). Data lives in ./data.ts so it can
 * be imported by the server page for JSON-LD generation.
 */

export default function ScienceAdvisoryBoard() {
  return (
    <section
      id="advisors"
      aria-labelledby="science-advisors-heading"
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
              05 · Reviewed by
            </span>
          </span>

          <h2
            id="science-advisors-heading"
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
            Reviewed by clinicians.
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
            The methodology, thresholds and literature base of Merios will be
            reviewed by practising clinicians and researchers ahead of public
            launch. No single-person decisions; every scoring rule survives a
            three-reviewer sign-off.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3" role="list">
          {ADVISORS.map((a, i) => (
            <li
              key={a.name}
              data-rv=""
              style={
                i > 0
                  ? ({ "--rv-delay": `${i * 0.06}s` } as CSSProperties)
                  : undefined
              }
            >
              {/* Hover lift lives on this inner div so it never fights the
                  data-rv transform/transition on the <li>. */}
              <div
                className="flex h-full flex-col rounded-2xl bg-[var(--color-canvas)] p-7 hover:-translate-y-[3px] hover:bg-[rgba(14,20,18,0.02)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:bg-[var(--color-canvas)] md:p-8"
                style={{
                  border: "1px solid var(--color-grid)",
                  transition:
                    "background-color 300ms var(--ease-expo), transform 300ms var(--ease-expo)",
                }}
              >
                {/* Portrait placeholder — initials in a mono circle */}
                <div
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: "var(--color-canvas-alt)",
                    border: "1px solid var(--color-grid)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    letterSpacing: "0.04em",
                    color: "var(--color-ink)",
                    fontWeight: 500,
                  }}
                >
                  {a.initials}
                </div>

                <h3
                  className="mt-8"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "var(--color-ink)",
                    lineHeight: 1.15,
                  }}
                >
                  {a.name},{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      letterSpacing: "0.06em",
                      color: "var(--color-ink-tertiary)",
                      fontWeight: 500,
                    }}
                  >
                    {a.credentials}
                  </span>
                </h3>

                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--color-ink-secondary)",
                    letterSpacing: "0.005em",
                  }}
                >
                  {a.specialty}
                </p>

                <p
                  className="mt-6"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "var(--color-ink-secondary)",
                  }}
                >
                  {a.bio}
                </p>

                <p
                  className="mt-auto pt-6"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                  }}
                >
                  {a.affiliation}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
