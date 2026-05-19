"use client";

import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

// PageHero is the entrance hero used across 11 secondary routes (/pricing,
// /about, /contact, /compare, /blog, /blog/category/[slug], /tools/*, and
// the LegalPageLayout used by /privacy /terms /security). Previously this
// component pulled in gsap + ScrollTrigger + SplitText (~80 KB gzip) just
// to stagger the headline. Motion is already in the bundle (Reveal uses
// it everywhere), so we re-implement the same char-by-char reveal with
// Motion variants and save the GSAP weight on every secondary route.

type Align = "left" | "center";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subline?: string;
  align?: Align;
}

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.015 } },
};

const charVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: EXPO_OUT },
  },
};

const sublineVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.2, ease: EXPO_OUT },
  },
};

export default function PageHero({
  eyebrow,
  title,
  subline,
  align = "left",
}: PageHeroProps) {
  const reduced = useReducedMotion();

  // Split the title into individual character spans so each can be
  // independently animated. Preserve spaces with non-breaking-space so the
  // text doesn't collapse, and key by index so identical glyphs don't
  // collide.
  const chars = useMemo(
    () =>
      title.split("").map((c, i) => ({
        char: c === " " ? " " : c,
        key: `${c}-${i}`,
      })),
    [title],
  );

  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section
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

          {reduced ? (
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
          ) : (
            <motion.h1
              className="page-hero-title mt-8"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display-l)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--color-ink)",
                overflow: "hidden",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={containerVariants}
              aria-label={title}
            >
              {chars.map(({ char, key }) => (
                <motion.span
                  key={key}
                  variants={charVariants}
                  style={{ display: "inline-block", willChange: "transform" }}
                  aria-hidden
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          )}

          {subline ? (
            reduced ? (
              <p
                className="page-hero-subline mt-8 max-w-[640px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.0625rem, 1.2vw, 1.1875rem)",
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                  letterSpacing: "-0.005em",
                  ...(align === "center"
                    ? { marginLeft: "auto", marginRight: "auto" }
                    : null),
                }}
              >
                {subline}
              </p>
            ) : (
              <motion.p
                className="page-hero-subline mt-8 max-w-[640px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.0625rem, 1.2vw, 1.1875rem)",
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                  letterSpacing: "-0.005em",
                  ...(align === "center"
                    ? { marginLeft: "auto", marginRight: "auto" }
                    : null),
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={sublineVariants}
              >
                {subline}
              </motion.p>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
