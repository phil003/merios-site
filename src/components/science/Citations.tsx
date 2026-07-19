import type { CSSProperties } from "react";

import Reveal from "@/components/ui/Reveal";
import { CITATIONS, type Citation } from "./data";

export { CITATIONS };
export type { Citation };

/**
 * Science — Citations.
 *
 * Numbered reference list. Superscripts elsewhere on the page link to #ref-N.
 * Server component: row reveals use the shared data-rv mechanism with a 60ms
 * incremental --rv-delay (capped so deep rows never lag their own viewport
 * entry); the hover tint/lift is a pure CSS transition. Data lives in
 * ./data.ts so it can be imported by the server page for JSON-LD generation.
 */

export default function ScienceCitations() {
  return (
    <section
      id="references"
      aria-labelledby="science-references-heading"
      className="relative border-t py-24 md:py-32"
      style={{
        background: "var(--color-canvas)",
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
              06 · References
            </span>
          </span>

          <h2
            id="science-references-heading"
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
            Literature informing the model.
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
            An editorial selection — not an exhaustive bibliography. Numbers
            match the superscripts used throughout this page.
          </p>
        </Reveal>

        <ol
          className="mt-14 flex flex-col"
          style={{ counterReset: "ref-counter" }}
        >
          {CITATIONS.map((c, i) => (
            <li
              key={c.id}
              id={c.id}
              data-rv=""
              className="border-t"
              style={
                {
                  borderColor: "var(--color-grid)",
                  ...(i === CITATIONS.length - 1
                    ? { borderBottom: "1px solid var(--color-grid)" }
                    : {}),
                  ...(i > 0
                    ? { "--rv-delay": `${Math.min(i * 0.06, 0.3)}s` }
                    : {}),
                } as CSSProperties
              }
            >
              {/* Hover tint/lift lives on this inner div so it never fights
                  the data-rv transform/transition on the <li>. */}
              <div
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 px-2 py-6 hover:-translate-y-[2px] hover:bg-[rgba(14,20,18,0.02)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:bg-transparent md:gap-x-10 md:px-3 md:py-7"
                style={{
                  transition:
                    "background-color 300ms var(--ease-expo), transform 300ms var(--ease-expo)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                    minWidth: 28,
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1rem, 1.25vw, 1.1875rem)",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    letterSpacing: "-0.005em",
                    color: "var(--color-ink)",
                  }}
                >
                  {c.authors}{" "}
                  <span
                    style={{
                      color: "var(--color-ink-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    {c.title}
                  </span>{" "}
                  <span style={{ color: "var(--color-ink-secondary)" }}>
                    {c.journal} ({c.year}).
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
