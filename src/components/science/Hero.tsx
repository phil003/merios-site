"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import Reveal from "@/components/ui/Reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Science — Hero / Intro.
 *
 * Editorial long-form premise. The headline is split char-by-char via GSAP
 * SplitText and revealed on ScrollTrigger with a tight per-character stagger.
 * Companions (eyebrow, subline, stats) use <Reveal> for a calm fade-up entry.
 */
export default function ScienceHero() {
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
          const root = container.current;
          if (!root) return;
          const headline = root.querySelector<HTMLElement>(
            ".science-hero-headline",
          );
          const subline = root.querySelector<HTMLElement>(
            ".science-hero-subline",
          );

          if (!headline) return;

          if (reduced) {
            const targets = [headline, subline].filter(
              (el): el is HTMLElement => el !== null,
            );
            gsap.set(targets, { opacity: 1, y: 0 });
            return;
          }

          if (subline) {
            gsap.set(subline, { opacity: 0, y: 16 });
          }

          SplitText.create(headline, {
            type: "chars, lines",
            autoSplit: true,
            mask: "lines",
            linesClass: "science-hero-line",
            charsClass: "science-hero-char",
            onSplit(self) {
              const tl = gsap.timeline({
                defaults: { ease: "expo.out" },
                scrollTrigger: {
                  trigger: headline,
                  start: "top 80%",
                  once: true,
                },
              });

              tl.from(
                self.chars,
                {
                  yPercent: 110,
                  opacity: 0,
                  duration: 0.9,
                  stagger: 0.015,
                },
                0,
              );

              if (subline) {
                tl.to(
                  subline,
                  { opacity: 1, y: 0, duration: 0.9 },
                  0.2,
                );
              }

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
      id="intro"
      aria-labelledby="science-hero-heading"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal amount={0.2}>
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
              The science · Long read
            </span>
          </div>
        </Reveal>

        <h1
          id="science-hero-heading"
          className="science-hero-headline mt-8 max-w-[18ch]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-display-l)",
            fontWeight: 300,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "var(--color-ink)",
          }}
        >
          <span className="block">Blood, read as</span>
          <span className="block">a system.</span>
        </h1>

        <p
          className="science-hero-subline mt-10 max-w-[640px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.125rem, 1.4vw, 1.3125rem)",
            lineHeight: 1.6,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.005em",
          }}
        >
          Merios turns {/* Phase 4: confirm with product team */}150+
          peer-reviewed biomarkers into a single composite score and a
          biological-age estimate, grounded in the preventive-medicine
          literature. This page is the full argument — the model, the
          markers, the references, and the advisors who reviewed it.
        </p>

        <Reveal amount={0.2} delay={0.3}>
          <dl
            className="mt-16 grid max-w-[720px] grid-cols-2 gap-x-10 gap-y-8 border-t pt-10 md:grid-cols-4 md:gap-x-6"
            style={{ borderColor: "var(--color-grid)" }}
          >
            {[
              { k: "Markers", v: "150+" },
              { k: "Pillars", v: "4" },
              { k: "Advisors", v: "MD · PhD" },
              { k: "Updated", v: "Apr 2026" },
            ].map((item) => (
              <div key={item.k} className="flex flex-col gap-1.5">
                <dt
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-tertiary)",
                    fontWeight: 500,
                  }}
                >
                  {item.k}
                </dt>
                <dd
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2vw, 1.875rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    lineHeight: 1.05,
                  }}
                >
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
