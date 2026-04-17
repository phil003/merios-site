"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PhoneMockup from "./ui/PhoneMockup";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LINES = ["A single number.", "Every marker.", "Total clarity."];

export default function AppPreview() {
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

          if (c.reduced) {
            gsap.set(
              [".appp-line", ".appp-lead", ".appp-eyebrow", ".appp-mockup-inner"],
              { opacity: 1, y: 0, scale: 1, rotate: 0 },
            );
            return;
          }

          if (c.desktopFull) {
            gsap.set([".appp-line", ".appp-lead", ".appp-eyebrow"], {
              opacity: 0,
              y: 28,
            });
            gsap.set(".appp-mockup-inner", { scale: 0.94, rotate: -2 });

            const tl = gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=800",
                pin: true,
                scrub: 0.8,
                pinSpacing: true,
                invalidateOnRefresh: true,
              },
            });

            tl.to(".appp-eyebrow", { opacity: 1, y: 0, duration: 0.35 }, 0)
              .to(".appp-line-1", { opacity: 1, y: 0, duration: 0.5 }, 0.05)
              .to(".appp-line-2", { opacity: 1, y: 0, duration: 0.5 }, 0.3)
              .to(".appp-line-3", { opacity: 1, y: 0, duration: 0.5 }, 0.55)
              .to(".appp-lead", { opacity: 1, y: 0, duration: 0.5 }, 0.7)
              .to(
                ".appp-mockup-inner",
                { scale: 1.02, rotate: 0, ease: "power1.inOut" },
                0,
              )
              .to(".appp-mockup-inner", { scale: 1, duration: 0.3 }, 0.85);
          } else if (c.mobileFull) {
            gsap.set([".appp-line", ".appp-lead", ".appp-eyebrow"], {
              opacity: 0,
              y: 20,
            });
            gsap.set(".appp-mockup-inner", { opacity: 0, scale: 0.95 });

            ScrollTrigger.create({
              trigger: container.current,
              start: "top 75%",
              onEnter: () => {
                gsap.to(".appp-eyebrow", {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "expo.out",
                });
                gsap.to(".appp-line", {
                  opacity: 1,
                  y: 0,
                  stagger: 0.12,
                  duration: 0.8,
                  ease: "expo.out",
                  delay: 0.2,
                });
                gsap.to(".appp-lead", {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "expo.out",
                  delay: 0.6,
                });
                gsap.to(".appp-mockup-inner", {
                  opacity: 1,
                  scale: 1,
                  duration: 1.1,
                  ease: "expo.out",
                  delay: 0.3,
                });
              },
              once: true,
            });
          }
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-[640px] items-center overflow-hidden py-16 md:min-h-screen md:py-0"
      style={{ background: "var(--color-ink)" }}
      aria-label="The Merios Score"
    >
      {/* ambient radial accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[70%] w-[60%]"
        style={{
          background:
            "radial-gradient(55% 60% at 80% 20%, rgba(159,191,0,0.09), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[70%] w-[60%]"
        style={{
          background:
            "radial-gradient(55% 60% at 20% 80%, rgba(30,61,42,0.45), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-10 lg:gap-24 lg:px-14">
        {/* LEFT — editorial */}
        <div>
          <div
            className="appp-eyebrow inline-flex items-center gap-2.5"
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
              The Merios Score
            </span>
          </div>

          <div className="mt-7 md:mt-8">
            {LINES.map((line, i) => (
              <div
                key={line}
                className={`appp-line appp-line-${i + 1}`}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-display-m)",
                  fontWeight: 300,
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  color: "var(--color-canvas)",
                }}
              >
                {line}
              </div>
            ))}
          </div>

          <p
            className="appp-lead mt-9 max-w-[480px] md:mt-10"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.1vw, 1.0625rem)",
              lineHeight: 1.6,
              color: "rgba(247,245,239,0.72)",
            }}
          >
            The Merios Score reduces 150+ biomarkers to one figure — updated every
            time you add data. Interpret trends, not isolated values.
          </p>
        </div>

        {/* RIGHT — mockup */}
        <div className="relative flex items-center justify-center">
          <div
            className="appp-mockup-inner relative w-full max-w-[320px] md:max-w-[360px]"
            style={{ willChange: "transform" }}
          >
            <PhoneMockup className="h-auto w-full drop-shadow-[0_50px_100px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
