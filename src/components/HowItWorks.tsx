"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Step = {
  number: string;
  title: string;
  copy: string;
  icon: (color: string) => React.ReactNode;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Connect",
    copy: "Stream Apple Health and scan every lab you've ever done. The import is silent and takes minutes.",
    icon: (c) => (
      <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden>
        <circle cx="22" cy="22" r="3.5" fill={c} />
        <path
          d="M6 10 L17 20"
          fill="none"
          stroke={c}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M38 10 L27 20"
          fill="none"
          stroke={c}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M6 34 L17 24"
          fill="none"
          stroke={c}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M38 34 L27 24"
          fill="none"
          stroke={c}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Understand",
    copy: "Every marker becomes a trend, a range, a signal. One score, one page — no decoding required.",
    icon: (c) => (
      <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden>
        <path
          d="M4 32 Q12 28 18 24 T32 14 T40 8"
          fill="none"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="8" r="3" fill={c} />
        <circle cx="40" cy="8" r="7" fill={c} opacity="0.18" />
        <line
          x1="4"
          y1="38"
          x2="40"
          y2="38"
          stroke={c}
          strokeWidth="0.75"
          opacity="0.35"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Act",
    copy: "Know the next change worth making. Protocols are personal and ranked by leverage, not noise.",
    icon: (c) => (
      <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden>
        <circle
          cx="22"
          cy="22"
          r="16"
          fill="none"
          stroke={c}
          strokeWidth="1"
          opacity="0.35"
        />
        <circle
          cx="22"
          cy="22"
          r="9"
          fill="none"
          stroke={c}
          strokeWidth="1.1"
          opacity="0.6"
        />
        <circle cx="22" cy="22" r="3" fill={c} />
        <path
          d="M22 22 L36 8"
          fill="none"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M32 8 L36 8 L36 12"
          fill="none"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktopFull:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobileFull:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const c = context.conditions ?? {};

          const connectorH = container.current?.querySelector<SVGPathElement>(
            ".hiw-connector-h",
          );
          const connectorV = container.current?.querySelector<SVGPathElement>(
            ".hiw-connector-v",
          );

          [connectorH, connectorV].forEach((path) => {
            if (!path) return;
            const len = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: len,
              strokeDashoffset: len,
            });
          });

          if (c.reduced) {
            gsap.set(".hiw-step", { opacity: 1, y: 0 });
            if (connectorH)
              gsap.set(connectorH, { strokeDashoffset: 0 });
            if (connectorV)
              gsap.set(connectorV, { strokeDashoffset: 0 });
            return;
          }

          gsap.set(".hiw-step", { opacity: 0, y: 32 });

          ScrollTrigger.batch(".hiw-step", {
            start: "top 80%",
            onEnter: (targets) => {
              gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.95,
                ease: "expo.out",
                stagger: 0.12,
                overwrite: true,
              });
            },
            once: true,
          });

          if (c.desktopFull && connectorH) {
            gsap.to(connectorH, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            });
          }

          if (c.mobileFull && connectorV) {
            gsap.to(connectorV, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "bottom 70%",
                scrub: 0.6,
              },
            });
          }
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      id="how-it-works"
      ref={container}
      className="relative py-24 md:py-32"
      style={{ background: "var(--color-canvas)" }}
      aria-label="How Merios works"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <div
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
              The flow
            </span>
          </div>

          <h2
            className="mt-6"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
            }}
          >
            Three steps, once.
          </h2>

          <p
            className="mt-6 max-w-[520px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
            }}
          >
            Set it up in an afternoon. After that, Merios is passive — it
            watches the data that already exists and surfaces the handful of
            moves that actually change outcomes.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="relative mt-16 hidden md:block">
          {/* horizontal connector */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0"
            style={{ top: 78, height: 2, overflow: "visible" }}
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            width="100%"
            height="2"
          >
            <path
              d="M 0 1 L 1000 1"
              fill="none"
              stroke="var(--color-green-deep)"
              strokeWidth="1"
              strokeLinecap="round"
              className="hiw-connector-h"
              opacity="0.35"
            />
          </svg>

          <div className="relative grid grid-cols-3 gap-10">
            {STEPS.map((s) => (
              <div key={s.number} className="hiw-step relative">
                {/* numeral disc */}
                <div
                  className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full"
                  style={{
                    background: "var(--color-canvas)",
                    border: "1px solid var(--color-grid)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      color: "var(--color-green-deep)",
                    }}
                  >
                    {s.number}
                  </span>
                </div>

                <h3
                  className="mt-8"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.2vw, 1.875rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  {s.title}
                </h3>

                <p
                  className="mt-3 max-w-[360px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--color-ink-secondary)",
                  }}
                >
                  {s.copy}
                </p>

                <div className="mt-8 opacity-70">
                  {s.icon("var(--color-green-deep)")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile rail */}
        <div className="relative mt-14 md:hidden">
          <svg
            aria-hidden
            className="pointer-events-none absolute"
            style={{ top: 0, bottom: 0, left: 35, width: 2 }}
            viewBox="0 0 2 1000"
            preserveAspectRatio="none"
            width="2"
            height="100%"
          >
            <path
              d="M 1 0 L 1 1000"
              fill="none"
              stroke="var(--color-green-deep)"
              strokeWidth="1"
              strokeLinecap="round"
              className="hiw-connector-v"
              opacity="0.3"
            />
          </svg>

          <ol className="flex flex-col gap-12 pl-[92px]">
            {STEPS.map((s) => (
              <li key={s.number} className="hiw-step relative">
                <div
                  className="absolute -left-[92px] top-0 flex h-[72px] w-[72px] items-center justify-center rounded-full"
                  style={{
                    background: "var(--color-canvas)",
                    border: "1px solid var(--color-grid)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      color: "var(--color-green-deep)",
                    }}
                  >
                    {s.number}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    paddingTop: 6,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  className="mt-2.5"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "var(--color-ink-secondary)",
                  }}
                >
                  {s.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
