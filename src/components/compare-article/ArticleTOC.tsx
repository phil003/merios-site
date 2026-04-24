"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { duration, easing } from "@/lib/motion";

interface TocItem {
  id: string;
  label: string;
}

/**
 * Sticky table of contents for the compare article.
 *
 * On mount, scans the article body (`[data-article-body]`) for `h2[id]`
 * elements and renders them as anchor links. Uses IntersectionObserver with
 * `rootMargin: "-40% 0px -55% 0px"` to flag the currently-read section.
 * Active state underline uses Motion `layoutId` (disabled under
 * prefers-reduced-motion).
 *
 * Desktop only (hidden below lg) — mobile users get the full article without
 * a TOC, which keeps the layout pragmatic.
 */
export default function ArticleTOC() {
  const prefersReducedMotion = useReducedMotion();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.querySelector<HTMLElement>("[data-article-body]");
    if (!body) return;

    const headings = Array.from(
      body.querySelectorAll<HTMLHeadingElement>("h2[id]"),
    );

    const nextItems: TocItem[] = headings.map((h) => ({
      id: h.id,
      label: (h.textContent ?? "").trim(),
    }));

    setItems(nextItems);
    if (nextItems.length > 0) setActiveId(nextItems[0].id);

    if (nextItems.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        // Pick the first (topmost in reading order) heading whose midband
        // is within the viewport crop.
        let nextActive: string | null = null;
        for (const item of nextItems) {
          if ((ratios.get(item.id) ?? 0) > 0) {
            nextActive = item.id;
            break;
          }
        }
        if (nextActive) setActiveId(nextActive);
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.01, 0.5, 1],
      },
    );

    for (const h of headings) observer.observe(h);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

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
        {items.map((item, i) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className="group relative inline-flex items-baseline gap-3 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="compare-toc-underline"
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
