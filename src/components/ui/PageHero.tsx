"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type Align = "left" | "center";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subline?: string;
  align?: Align;
}

export default function PageHero({
  eyebrow,
  title,
  subline,
  align = "left",
}: PageHeroProps) {
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
            ".page-hero-title",
          );
          const subEl = root.querySelector<HTMLElement>(".page-hero-subline");
          if (!headline) return;

          if (reduced) {
            const targets = [headline, subEl].filter(
              (el): el is HTMLElement => el !== null,
            );
            gsap.set(targets, { opacity: 1, y: 0 });
            return;
          }

          if (subEl) gsap.set(subEl, { opacity: 0, y: 16 });

          SplitText.create(headline, {
            type: "chars, lines",
            autoSplit: true,
            mask: "lines",
            linesClass: "page-hero-line",
            charsClass: "page-hero-char",
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
                { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.015 },
                0,
              );
              if (subEl) {
                tl.to(subEl, { opacity: 1, y: 0, duration: 0.9 }, 0.2);
              }
              return tl;
            },
          });
        },
      );
    },
    { scope: container },
  );

  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section
      ref={container}
      className="relative pt-32 pb-16 md:pt-40 md:pb-20"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className={`max-w-[880px] ${alignClass}`}>
          {eyebrow ? (
            <div
              className={`inline-flex items-center gap-2.5 ${
                align === "center" ? "justify-center" : ""
              }`}
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
                {eyebrow}
              </span>
            </div>
          ) : null}

          <h1
            className="page-hero-title mt-8"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-l)",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
            }}
          >
            {title}
          </h1>

          {subline ? (
            <p
              className="page-hero-subline mt-8 max-w-[640px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.0625rem, 1.2vw, 1.1875rem)",
                lineHeight: 1.6,
                color: "var(--color-ink-secondary)",
                letterSpacing: "-0.005em",
                ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : null),
              }}
            >
              {subline}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
