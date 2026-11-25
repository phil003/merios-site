"use client";

import { useEffect, useState } from "react";

import styles from "./science.module.css";

/**
 * Science — sticky table of contents (v2 "Open Sky").
 *
 * Desktop only (hidden below lg). The mockups' "On this page" steps: a
 * hairline rail, Newsreader numerals, the active section (detected with an
 * IntersectionObserver, aria-current="location") in ink on an ink rail.
 */

const TOC = [
  { href: "#intro", label: "Intro" },
  { href: "#thesis", label: "Thesis" },
  { href: "#coverage", label: "Coverage" },
  { href: "#model", label: "The model" },
  { href: "#bioage", label: "Biological age" },
  { href: "#advisors", label: "Clinical review" },
  { href: "#references", label: "References" },
];

export default function ScienceStickyTOC() {
  const [activeHref, setActiveHref] = useState<string>(TOC[0].href);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ids = TOC.map((t) => t.href.replace(/^#/, ""));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    if (nodes.length === 0) return;

    // A section counts as active while it crosses the band between 40% and
    // 45% from the top of the viewport; the topmost one wins.
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

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
    <nav aria-label="On this page" className={styles.toc}>
      <p className={styles.tocTitle}>On this page</p>
      <ol className={styles.tocList}>
        {TOC.map((t, i) => {
          const isActive = activeHref === t.href;
          return (
            <li key={t.href}>
              <a
                href={t.href}
                aria-current={isActive ? "location" : undefined}
                className={styles.tocLink}
              >
                <span aria-hidden className={styles.tocNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{t.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
