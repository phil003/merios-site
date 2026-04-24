"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const BIOMARKERS = [
  "HDL",
  "LDL",
  "Ferritin",
  "Vitamin D",
  "TSH",
  "Cortisol",
  "CRP",
  "HbA1c",
  "Testosterone",
  "eGFR",
  "ALT",
  "AST",
  "Magnesium",
  "B12",
  "Folate",
  "Homocysteine",
  "ApoB",
  "Lp(a)",
  "Insulin",
  "Omega-3 Index",
  "Estradiol",
  "DHEA-S",
  "Free T4",
  "Platelets",
  "Albumin",
  "Uric Acid",
  "Creatinine",
  "Hemoglobin",
  "+130 more",
];

export default function Statement() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!track.current) return;

        const tween = gsap.to(track.current, {
          xPercent: -50,
          duration: 55,
          ease: "none",
          repeat: -1,
        });

        const el = track.current;
        const pause = () => tween.timeScale(0.1);
        const resume = () => tween.timeScale(1);
        el.addEventListener("mouseenter", pause);
        el.addEventListener("mouseleave", resume);

        return () => {
          el.removeEventListener("mouseenter", pause);
          el.removeEventListener("mouseleave", resume);
        };
      });
    },
    { scope: container },
  );

  const items = [...BIOMARKERS, ...BIOMARKERS];

  return (
    <section
      ref={container}
      aria-label="Biomarkers tracked by Merios"
      className="relative overflow-hidden border-y py-14 md:py-16"
      style={{
        borderColor: "var(--color-grid)",
        background: "var(--color-canvas-alt)",
      }}
    >
      <div className="mx-auto mb-8 max-w-[1280px] px-6 md:px-10">
        <div
          className="inline-flex items-center gap-2.5"
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
              color: "var(--color-green-deep)",
              letterSpacing: "0.22em",
              fontWeight: 500,
            }}
          >
            Tracked by Merios
          </span>
        </div>
      </div>

      <div className="relative">
        {/* edge fades so the marquee doesn't hit the viewport edges hard */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
          style={{
            background:
              "linear-gradient(to right, var(--color-canvas-alt), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
          style={{
            background:
              "linear-gradient(to left, var(--color-canvas-alt), transparent)",
          }}
        />

        <div
          ref={track}
          className="flex items-center"
          style={{ willChange: "transform", width: "max-content" }}
        >
          {items.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="flex shrink-0 items-center gap-5 px-5"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: "var(--color-ink)",
                  whiteSpace: "nowrap",
                }}
              >
                {b}
              </span>
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full"
                style={{ background: "var(--color-pulse)" }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
