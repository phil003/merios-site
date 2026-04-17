"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import GrainOverlay from "./ui/GrainOverlay";
import PhoneMockup from "./ui/PhoneMockup";

gsap.registerPlugin(useGSAP, SplitText);

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const reduced = context.conditions?.reduced;

          const companions = [
            ".hero-eyebrow",
            ".hero-lead",
            ".hero-ctas",
            ".hero-scroll-hint",
          ];

          if (reduced) {
            gsap.set([".hero-headline", ...companions, ".hero-mockup"], {
              opacity: 0,
            });
            gsap.to([".hero-headline", ...companions, ".hero-mockup"], {
              opacity: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: "power1.out",
            });
            return;
          }

          gsap.set(companions, { opacity: 0, y: 16 });
          gsap.set(".hero-mockup", { opacity: 0, scale: 0.96 });

          SplitText.create(".hero-headline", {
            type: "lines",
            autoSplit: true,
            mask: "lines",
            linesClass: "hero-headline-line",
            onSplit(self) {
              const tl = gsap.timeline({
                defaults: { ease: "expo.out" },
              });

              tl.from(
                self.lines,
                {
                  yPercent: 110,
                  duration: 1.1,
                  stagger: 0.12,
                },
                0.3,
              );
              tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.1);
              tl.to(".hero-lead", { opacity: 1, y: 0, duration: 0.9 }, 0.8);
              tl.to(".hero-ctas", { opacity: 1, y: 0, duration: 0.9 }, 1.0);
              tl.to(
                ".hero-mockup",
                { opacity: 1, scale: 1, duration: 1.2 },
                0.6,
              );
              tl.to(
                ".hero-scroll-hint",
                { opacity: 1, y: 0, duration: 0.6 },
                1.2,
              );

              return tl;
            },
          });
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:min-h-[min(100svh,960px)]"
      style={{ background: "var(--color-canvas)" }}
    >
      <GrainOverlay />

      {/* Radial accent top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 h-[70%] w-[60%]"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 30%, rgba(30,61,42,0.055), transparent 65%)",
        }}
      />

      {/* Soft edge vignette bottom-right to ground the mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[60%] w-[55%]"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 80%, rgba(159,191,0,0.05), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.15fr_1fr] md:gap-14 lg:gap-20">
          {/* LEFT — editorial */}
          <div className="relative z-10 max-w-[640px]">
            <div
              className="hero-eyebrow inline-flex items-center gap-2.5"
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
                Health Intelligence Platform
              </span>
            </div>

            <h1
              className="hero-headline mt-6 md:mt-8"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display-xl)",
                fontWeight: 300,
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                color: "var(--color-ink)",
              }}
            >
              See your body<br />with precision.
            </h1>

            <p
              className="hero-lead mt-6 max-w-[520px] md:mt-8"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.25vw, 1.2rem)",
                lineHeight: 1.55,
                color: "var(--color-ink-secondary)",
                fontWeight: 400,
              }}
            >
              Merios reads your blood tests, Apple Health data, and daily signals —
              and delivers a single, rigorous score with the recommendations that
              move it.
            </p>

            <div className="hero-ctas mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-11">
              <a
                href="/early-access"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(30,61,42,0.45)]"
                style={{
                  background: "var(--color-green-deep)",
                  color: "var(--color-canvas)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Join waitlist
              </a>
              <a
                href="/how-it-works"
                className="group inline-flex items-center justify-center gap-2 px-5 py-4 text-[15px] font-medium transition-colors"
                style={{
                  color: "var(--color-ink-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                See how it works
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT — phone mockup */}
          <div className="hero-mockup relative mx-auto w-full max-w-[340px] md:max-w-[380px]">
            <div className="hero-mockup-float">
              <PhoneMockup className="h-auto w-full drop-shadow-[0_40px_60px_rgba(14,20,18,0.18)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll-hint pointer-events-none absolute bottom-8 right-6 hidden flex-col items-center gap-3 md:right-10 md:flex lg:right-14"
        style={{ color: "var(--color-ink-tertiary)" }}
      >
        <span
          className="text-[10px] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.25em",
            fontWeight: 500,
          }}
        >
          Scroll
        </span>
        <div
          className="animate-scroll-pulse h-14 w-px"
          style={{
            background:
              "linear-gradient(to bottom, currentColor, transparent)",
          }}
        />
      </div>
    </section>
  );
}
