"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "@/components/providers/LenisProvider";
import { duration, easing } from "@/lib/motion";

/**
 * StickyLateralNav — desktop-only sticky table-of-contents for
 * /how-it-works. Desktop ≥ 1024 px only; hidden on mobile/tablet where the
 * sections stack naturally.
 *
 * Active-step detection:
 *   - IntersectionObserver watches each [data-hiw-section] element.
 *   - A section is eligible for "active" once it intersects the viewport
 *     band 0% → 45% from the top (rootMargin "0px 0px -55% 0px"). This
 *     mirrors a "top 45%" heuristic without triggering React re-renders
 *     per scroll tick (only re-renders when the active id changes).
 *
 * Active-state visual:
 *   - Underline indicator is rendered by a single Motion element with a
 *     shared `layoutId`, so it smoothly translates between links.
 *
 * Click behaviour:
 *   - If a Lenis instance is available, scroll with
 *     `lenis.scrollTo(targetY, { duration: 1.2 })`.
 *   - Fallback: `window.scrollTo({ top: targetY, behavior: "smooth" })`.
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
  const prefersReducedMotion = useReducedMotion();
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
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        // Delay focus slightly so smooth scroll isn't cancelled.
        window.setTimeout(focusTarget, prefersReducedMotion ? 0 : 400);
      }
    };

  return (
    <nav
      aria-label="How Merios works — sections"
      className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
    >
      <p
        className="mb-5"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
          fontWeight: 500,
        }}
      >
        On this page
      </p>
      <ol className="flex flex-col gap-3">
        {LINKS.map((link, i) => {
          const isActive = link.id === activeId;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                data-anchor={link.id}
                onClick={handleClick(link.id)}
                aria-current={isActive ? "location" : undefined}
                className="hiw-nav-link group flex items-baseline gap-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14.5,
                  color: isActive
                    ? "var(--color-ink)"
                    : "var(--color-ink-secondary)",
                  transition: `color ${duration.quick}s cubic-bezier(${easing.expo.join(
                    ",",
                  )})`,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--color-ink-tertiary)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hiw-nav-label relative inline-block">
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="hiw-nav-underline"
                      aria-hidden
                      className="absolute left-0 -bottom-0.5 block h-px w-full"
                      style={{ background: "var(--color-green-deep)" }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 380,
                              damping: 34,
                              mass: 0.6,
                            }
                      }
                    />
                  ) : null}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
