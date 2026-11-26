"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import type { Heading } from "./toc";
import { useTocScroll } from "./useTocScroll";
import styles from "./article.module.css";

interface ArticleTOCProps {
  headings: Heading[];
}

/**
 * Table of contents for /blog/[slug], in the sticky aside (desktop only; the
 * aside is shown from 1080px, see article.module.css).
 *
 * - Renders server-extracted headings as anchor links on a hairline rail;
 *   the active row turns ink with an ink rail segment (Open Sky mockup).
 * - IntersectionObserver with rootMargin "-40% 0px -55% 0px" sets the active id.
 * - Click uses Lenis (when available) for a smooth programmatic scroll with an
 *   offset that clears the floating nav, falling back to `scrollIntoView`
 *   when Lenis is not mounted (SSR / prefers-reduced-motion).
 * - A list taller than the screen allows scrolls inside its box, under a
 *   fixed "Contents" label, with a fade on the end that hides rows; the row
 *   being read is kept in view (useTocScroll).
 */
export default function ArticleTOC({ headings }: ArticleTOCProps) {
  const lenis = useLenis();
  const listRef = useRef<HTMLOListElement>(null);
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );
  const fade = useTocScroll(listRef, activeId, headings.length);

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
        offset: -104,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav aria-label="On this page" className={styles.toc}>
      <p className={styles.tocLabel}>Contents</p>
      <ol ref={listRef} className={styles.tocList} data-fade={fade}>
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                data-level={item.level}
                className={styles.tocLink}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
