"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import styles from "./hiw.module.css";

/**
 * StickyLateralNav — desktop-only sticky table-of-contents for
 * /how-it-works. Desktop ≥ 1200 px only (v3: below that the step cards need
 * the full width); hidden on mobile/tablet where the sections stack naturally.
 *
 * Active-step detection:
 *   - IntersectionObserver watches each [data-hiw-section] element.
 *   - A section is eligible for "active" once it intersects the viewport
 *     band 0% → 45% from the top (rootMargin "0px 0px -55% 0px"). This
 *     mirrors a "top 45%" heuristic without triggering React re-renders
 *     per scroll tick (only re-renders when the active id changes).
 *
 * Active-state visual (motion-free, v3):
 *   - The active link (aria-current="location") becomes a white pill and
 *     its step number turns into an ink chip with a lime numeral — a plain
 *     CSS transition in hiw.module.css, no React-driven inline styles.
 *
 * Click behaviour:
 *   - If a Lenis instance is available, scroll with
 *     `lenis.scrollTo(target, { duration: 1.2 })`.
 *   - Fallback: `window.scrollTo({ top: targetY, behavior: "smooth" })`,
 *     downgraded to instant under prefers-reduced-motion (checked with
 *     matchMedia at click time).
 *   - After scrolling, programmatic focus is moved to the target section
 *     (the section has `tabIndex={-1}` so it is focusable without entering
 *     the tab order).
 */

const LINKS = [
  { id: "connect", label: "Connect" },
  { id: "understand", label: "Understand" },
  { id: "act", label: "Act" },
] as const;

type LinkId = (typeof LINKS)[number]["id"];

const SCROLL_OFFSET = 96;

export default function StickyLateralNav() {
  const lenis = useLenis();
  const [activeId, setActiveId] = useState<LinkId>(LINKS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = LINKS.map((l) =>
      document.querySelector<HTMLElement>(`[data-hiw-section="${l.id}"]`),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // A section becomes "active" when its top edge crosses the 45% band.
    // rootMargin bottom is -55% so sections only qualify once their top
    // is in the upper 45% of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the top-most currently-intersecting section.
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

        if (intersecting[0]) {
          const id = intersecting[0].dataset.hiwSection as LinkId | undefined;
          if (id) setActiveId(id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick =
    (id: LinkId) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const focusTarget = () => target.focus({ preventScroll: true });

      if (lenis) {
        lenis.scrollTo(target, {
          offset: -SCROLL_OFFSET,
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          onComplete: focusTarget,
        });
      } else {
        // Reduced-motion / SSR / pre-mount: native smooth scroll + focus.
        const targetY =
          target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({
          top: targetY,
          behavior: prefersReduced ? "auto" : "smooth",
        });
        // Delay focus slightly so smooth scroll isn't cancelled.
        window.setTimeout(focusTarget, prefersReduced ? 0 : 400);
      }
    };

  return (
    <nav
      aria-label="How Merios works — sections"
      className={styles.lateral}
    >
      <p className={styles.navTitle}>On this page</p>
      <ol className={styles.navList}>
        {LINKS.map((link, i) => {
          const isActive = link.id === activeId;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                data-anchor={link.id}
                onClick={handleClick(link.id)}
                aria-current={isActive ? "location" : undefined}
                className={`hiw-nav-link ${styles.navLink}`}
              >
                <span aria-hidden className={styles.navNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hiw-nav-label">{link.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
