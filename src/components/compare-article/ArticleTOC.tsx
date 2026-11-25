"use client";

import { useEffect, useState } from "react";
import a from "@/components/blog-article/article.module.css";

interface TocItem {
  id: string;
  label: string;
}

/**
 * Table of contents for the compare article, in the sticky aside (desktop
 * only; the aside is shown from 1080px — same system as the article
 * template).
 *
 * On mount, scans the article body (`[data-article-body]`) for `h2[id]`
 * elements and renders them as anchor links on a hairline rail. Uses
 * IntersectionObserver with `rootMargin: "-40% 0px -55% 0px"` to flag the
 * currently-read section (ink text, ink rail segment).
 */
export default function ArticleTOC() {
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
    <nav aria-label="On this page" className={a.toc}>
      <p className={a.tocLabel}>On this page</p>
      <ol className={a.tocList}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={a.tocLink}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
