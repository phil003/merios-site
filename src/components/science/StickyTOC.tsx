"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { duration, easing } from "@/lib/motion";

/**
 * Science — sticky table of contents.
 *
 * Desktop only (hidden below lg). Uses IntersectionObserver to detect the
 * active section and renders an animated underline via a shared Motion
 * `layoutId` across items. Respects prefers-reduced-motion.
 */

const TOC = [
  { href: "#intro", label: "Intro" },
  { href: "#thesis", label: "Thesis" },
  { href: "#coverage", label: "Coverage" },
  { href: "#model", label: "The model" },
  { href: "#bioage", label: "Biological age" },
  { href: "#advisors", label: "Reviewed by" },
  { href: "#references", label: "References" },
];

export default function ScienceStickyTOC() {
  const prefersReducedMotion = useReducedMotion();
  const [activeHref, setActiveHref] = useState<string>(TOC[0].href);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ids = TOC.map((t) => t.href.replace(/^#/, ""));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    if (nodes.length === 0) return;

    // Track intersection ratios and pick the section whose middle band sits
    // inside the viewport. The rootMargin crops the top 40% and bottom 55%,
    // so a section only counts as "active" when its top edge has crossed
    // 40% from the top AND its bottom edge hasn't yet crossed 45% from top.
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

        // Pick the topmost intersecting section (matches reading order).
        let nextActiveId: string | null = null;
        for (const id of ids) {
          const ratio = visibility.get(id) ?? 0;
          if (ratio > 0) {
            nextActiveId = id;
            break;
          }
        }

        if (nextActiveId) {
          setActiveHref(`#${nextActiveId}`);
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.01, 0.5, 1],
      },
    );

    for (const node of nodes) observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="hidden lg:sticky lg:top-28 lg:block"
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        On this page
      </p>
      <ol
        className="flex flex-col gap-3 border-l pl-4"
        style={{ borderColor: "var(--color-grid)" }}
      >
        {TOC.map((t, i) => {
          const isActive = activeHref === t.href;
          return (
            <li key={t.href} className="relative">
              <a
                href={t.href}
                aria-current={isActive ? "location" : undefined}
                className="relative inline-flex items-baseline gap-3 transition-colors"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  color: isActive
                    ? "var(--color-ink)"
                    : "var(--color-ink-secondary)",
                  letterSpacing: "-0.005em",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    color: isActive
                      ? "var(--color-green-deep)"
                      : "var(--color-ink-tertiary)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative inline-block">
                  {t.label}
                  {isActive && (
                    <motion.span
                      layoutId="science-toc-underline"
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ background: "var(--color-green-deep)" }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: duration.normal,
                              ease: easing.expo,
                            }
                      }
                    />
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
