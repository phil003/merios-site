"use client";

import { useEffect, useRef } from "react";

/**
 * Numbers — "At a glance" metric strip with count-up numerals.
 *
 * Motion-free: the static HTML renders the FINAL values (crawler / no-JS /
 * LCP safe). On mount — unless prefers-reduced-motion — the counters are
 * zeroed and a vanilla IntersectionObserver (40% of the section visible,
 * once) starts a single requestAnimationFrame loop that counts every metric
 * up over 1.6s with an expo-out ease, matching the previous Motion
 * `animate()` timing ([0.16, 1, 0.3, 1]).
 */

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

const COUNT_DURATION_MS = 1600;

function formatValue(value: number, decimals: number): string {
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}

export default function Numbers() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    // Reduced motion: keep the statically-rendered final values, no tween.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spans = Array.from(
      section.querySelectorAll<HTMLElement>("[data-count-to]"),
    );
    if (spans.length === 0) return;

    type Target = {
      el: HTMLElement;
      to: number;
      decimals: number;
      suffix: string;
    };
    const targets: Target[] = spans.map((el) => ({
      el,
      to: Number(el.dataset.countTo ?? "0"),
      decimals: Number(el.dataset.countDecimals ?? "0"),
      suffix: el.dataset.countSuffix ?? "",
    }));

    // Arm the count-up only once JS runs (mirrors the previous behaviour of
    // showing zeros until the section scrolls into view).
    for (const t of targets) {
      t.el.textContent = formatValue(0, t.decimals) + t.suffix;
    }

    let raf = 0;

    const run = () => {
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const p = Math.min((now - start) / COUNT_DURATION_MS, 1);
        // Expo-out, visually equivalent to cubic-bezier(0.16, 1, 0.3, 1).
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        for (const t of targets) {
          t.el.textContent = formatValue(t.to * eased, t.decimals) + t.suffix;
        }
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

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
            const decimals = m.decimals ?? 0;
            const suffix = m.suffix ?? "";
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
                    <span
                      className="tabular-nums"
                      data-count-to={m.value}
                      data-count-decimals={decimals}
                      data-count-suffix={suffix}
                    >
                      {formatValue(m.value, decimals)}
                      {suffix}
                    </span>
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
