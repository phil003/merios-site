"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/providers/LenisProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * StickyLateralNav — desktop-only sticky table-of-contents for
 * /how-it-works. Desktop ≥ 1024 px only; hidden on mobile/tablet where the
 * sections stack naturally.
 *
 * Behaviour:
 *   - Anchor click → lenis.scrollTo(target, { offset:-96, duration:1.1, easing: cubic-out })
 *     then moves focus to the target StepSection (requires tabIndex={-1}).
 *   - Active state is driven by ScrollTrigger (onToggle) that toggles the
 *     `.is-active` class + `aria-current="location"` directly via
 *     classList — zero React re-renders per scroll tick.
 *   - Whole active-state effect is gated via gsap.matchMedia to the
 *     desktop + `prefers-reduced-motion: no-preference` branch. Mobile &
 *     reduced users get static nav.
 */

const LINKS = [
  { id: "connect", label: "Connect" },
  { id: "understand", label: "Understand" },
  { id: "act", label: "Act" },
] as const;

const SCROLL_OFFSET = -96;

export default function StickyLateralNav() {
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const sections = LINKS.map((l) =>
          document.querySelector<HTMLElement>(`[data-hiw-section="${l.id}"]`),
        ).filter((el): el is HTMLElement => el !== null);

        const anchors =
          nav.querySelectorAll<HTMLAnchorElement>("[data-anchor]");

        const triggers = sections.map((sectionEl) =>
          ScrollTrigger.create({
            trigger: sectionEl,
            start: "top 40%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (!self.isActive) return;
              const activeId = sectionEl.dataset.hiwSection ?? "";
              anchors.forEach((el) => {
                const matches = el.dataset.anchor === activeId;
                el.classList.toggle("is-active", matches);
                if (matches) {
                  el.setAttribute("aria-current", "location");
                } else {
                  el.removeAttribute("aria-current");
                }
              });
            },
          }),
        );

        return () => {
          triggers.forEach((t) => t.kill());
        };
      },
    );

    return () => mm.revert();
  }, []);

  const handleClick =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(id);
      if (!target) return; // Let the native anchor win — target truly missing.
      event.preventDefault();

      const focusTarget = () => {
        target.focus({ preventScroll: true });
      };

      if (lenis) {
        lenis.scrollTo(target, {
          offset: SCROLL_OFFSET,
          duration: 1.1,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          onComplete: focusTarget,
        });
      } else {
        // Reduced-motion / SSR / pre-mount: native jump + focus.
        target.scrollIntoView({ behavior: "auto", block: "start" });
        focusTarget();
      }
    };

  return (
    <nav
      ref={navRef}
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
        {LINKS.map((link, i) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              data-anchor={link.id}
              onClick={handleClick(link.id)}
              className="hiw-nav-link group flex items-baseline gap-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14.5,
                color: "var(--color-ink-secondary)",
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
              <span className="hiw-nav-label">{link.label}</span>
            </a>
          </li>
        ))}
      </ol>

      <style jsx>{`
        .hiw-nav-link .hiw-nav-label {
          position: relative;
          transition: color var(--duration-quick) var(--ease-expo);
        }
        .hiw-nav-link:hover .hiw-nav-label,
        .hiw-nav-link.is-active .hiw-nav-label {
          color: var(--color-ink);
        }
        .hiw-nav-link.is-active .hiw-nav-label::before {
          content: "";
          position: absolute;
          left: -18px;
          top: 50%;
          width: 10px;
          height: 1px;
          background: var(--color-green-deep);
          transform: translateY(-50%);
        }
      `}</style>
    </nav>
  );
}
