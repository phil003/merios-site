"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

type Metric = {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
};

const METRICS: Metric[] = [
  { value: 150, suffix: "+", label: "Biomarkers tracked" },
  { value: 11, label: "Health systems" },
  { value: 4, label: "Core pillars" },
  { value: 1, label: "Unified score" },
];

function Counter({
  to,
  suffix = "",
  decimals = 0,
  active,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  active: boolean;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString(),
  );
  const [display, setDisplay] = useState(
    decimals > 0 ? (0).toFixed(decimals) : "0",
  );

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!active) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [active, mv, to]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Numbers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  return (
    <section
      id="numbers"
      ref={ref}
      className="relative py-20 md:py-28"
      style={{ background: "var(--color-canvas)" }}
      aria-label="Merios in numbers"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-3 md:mb-16">
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
              At a glance
            </span>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-0"
          style={{
            borderTop: "1px solid var(--color-grid)",
            borderBottom: "1px solid var(--color-grid)",
          }}
        >
          {METRICS.map((m, i) => {
            const classes = [
              "relative py-10 md:px-8 md:py-12",
              i === 1 && "border-l border-[var(--color-grid)]",
              i === 2 &&
                "border-t border-[var(--color-grid)] md:border-t-0 md:border-l",
              i === 3 &&
                "border-t border-l border-[var(--color-grid)] md:border-t-0",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div key={m.label} className={classes}>
              <div className="flex items-baseline gap-1">
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(3rem, 6.5vw, 5.25rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.035em",
                    color: "var(--color-ink)",
                  }}
                >
                  {reduced ? (
                    <span className="tabular-nums">
                      {m.decimals
                        ? m.value.toFixed(m.decimals)
                        : m.value}
                      {m.suffix ?? ""}
                    </span>
                  ) : (
                    <Counter
                      to={m.value}
                      suffix={m.suffix}
                      decimals={m.decimals}
                      active={Boolean(inView)}
                    />
                  )}
                </span>
              </div>
              <p
                className="mt-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                }}
              >
                {m.label}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
