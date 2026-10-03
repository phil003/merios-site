"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import type { Heading } from "./toc";
import styles from "./article.module.css";

interface ArticleTOCProps {
  headings: Heading[];
}

/**
 * Sticky table of contents for /blog/[slug] (desktop only, ≥ lg).
 *
 * - Renders server-extracted headings as anchor links.
 * - IntersectionObserver with rootMargin "-40% 0px -55% 0px" sets the active id.
 * - A hairline track runs down the list; the active row gets ink text and a
 *   lime "you are here" dot on the track (CSS transition, reduced-motion safe).
 * - Click uses Lenis (when available) for a smooth programmatic scroll with an
 *   offset equal to the sticky top, falling back to `scrollIntoView` when
 *   Lenis is not mounted (SSR / prefers-reduced-motion).
 */
export default function ArticleTOC({ headings }: ArticleTOCProps) {
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
      className={`hidden lg:sticky lg:top-28 lg:block ${styles.toc}`}
      style={{ maxHeight: "calc(100vh - 8rem)", overflow: "auto" }}
    >
      <p className={styles.tocLabel}>Contents</p>
      <ol className={styles.tocList}>
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                data-level={item.level}
                className={styles.tocLink}
              >
                <span aria-hidden className={styles.tocDot} />
                <span className="block">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
