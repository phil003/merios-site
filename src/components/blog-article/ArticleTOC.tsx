"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useLenis } from "@/components/providers/LenisProvider";
import { duration, easing } from "@/lib/motion";
import type { Heading } from "./toc";

interface ArticleTOCProps {
  headings: Heading[];
}

/**
 * Sticky table of contents for /blog/[slug] (desktop only, ≥ lg).
 *
 * - Renders server-extracted headings as anchor links.
 * - IntersectionObserver with rootMargin "-40% 0px -55% 0px" sets the active id.
 * - Active row has a left-border + ink text; an animated marker (Motion
 *   `layoutId="blog-toc-marker"`) slides between rows. Reduced motion collapses
 *   the transition to 0.
 * - Click uses Lenis (when available) for a smooth programmatic scroll with an
 *   offset equal to the sticky top, falling back to `scrollIntoView` when
 *   Lenis is not mounted (SSR / prefers-reduced-motion).
 */
export default function ArticleTOC({ headings }: ArticleTOCProps) {
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (headings.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        // Pick the first heading (document order) currently inside the crop.
        let next: string | null = null;
        for (const h of headings) {
          if ((ratios.get(h.id) ?? 0) > 0) {
            next = h.id;
            break;
          }
        }
        if (next) setActiveId(next);
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.01, 0.5, 1],
      },
    );

    // Observe the DOM nodes whose ids match the extracted headings.
    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    for (const el of nodes) observer.observe(el);

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    if (lenis) {
      lenis.scrollTo(el, {
        offset: -96,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Update the URL hash without a browser jump.
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="On this page"
      className="hidden lg:sticky lg:top-28 lg:block"
      style={{ maxHeight: "calc(100vh - 7rem)", overflow: "auto" }}
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
        Contents
      </p>
      <ol className="relative flex flex-col">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          const indent = item.level === 3 ? 16 : 0;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                className="group relative block rounded-sm py-1.5 pl-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: item.level === 3 ? 12.5 : 13.5,
                  color: isActive
                    ? "var(--color-ink)"
                    : "var(--color-ink-tertiary)",
                  letterSpacing: "-0.005em",
                  borderLeft: "2px solid",
                  borderColor: isActive
                    ? "transparent"
                    : "var(--color-grid)",
                  marginLeft: indent,
                  lineHeight: 1.4,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="blog-toc-marker"
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: "var(--color-green-deep)" }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: duration.quick * 0.8,
                            ease: easing.expo,
                          }
                    }
                  />
                )}
                <span className="block">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <style>{`
        nav[aria-label="On this page"] a:hover {
          color: var(--color-ink) !important;
        }
      `}</style>
    </nav>
  );
}
