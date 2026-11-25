"use client";

import { useState, type MouseEvent } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import styles from "./legalLayout.module.css";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Legal pages — table of contents (Open Sky).
 *
 * Two renderings of the same list: a glass accordion above the article below
 * 1024px, and a sticky numbered rail in the left column from 1024px (the
 * mockups' "On this page" steps). Both are grid items of LegalPageLayout's
 * body grid. Anchor clicks scroll with Lenis when it runs, natively otherwise.
 */
export default function LegalToc({ items }: { items: TocItem[] }) {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  function go(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -96,
        duration: 1.0,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    if (history.replaceState) history.replaceState(null, "", `#${id}`);
  }

  return (
    <>
      {/* Below 1024px: accordion */}
      <div className={styles.tocMobile}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="legal-mobile-toc"
          className={styles.tocToggle}
        >
          <span>Table of contents</span>
          <span aria-hidden className={styles.tocChevron}>
            ▾
          </span>
        </button>
        <ul id="legal-mobile-toc" className={styles.tocMobileList} hidden={!open}>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(e) => go(e, item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* From 1024px: sticky numbered rail */}
      <aside className={styles.tocAside} aria-label="Table of contents">
        <p className={styles.tocTitle}>Contents</p>
        <ol className={styles.tocList}>
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className={styles.tocLink}
              >
                <span aria-hidden className={styles.tocNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </>
  );
}
