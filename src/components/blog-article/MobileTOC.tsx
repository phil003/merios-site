"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useLenis } from "@/components/providers/LenisProvider";
import { duration, easing } from "@/lib/motion";
import type { Heading } from "./toc";

interface MobileTOCProps {
  headings: Heading[];
}

/**
 * Collapsible "Contents" accordion for mobile (<lg). Closed by default.
 * Uses native <details> for keyboard + a11y, overlaid with a Motion-controlled
 * plus/minus icon that animates 240ms on toggle.
 */
export default function MobileTOC({ headings }: MobileTOCProps) {
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, {
        offset: -96,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
    setOpen(false);
  };

  return (
    <details
      className="lg:hidden"
      onToggle={(e) =>
        setOpen((e.currentTarget as HTMLDetailsElement).open)
      }
      style={{
        borderTop: "1px solid var(--color-grid)",
        borderBottom: "1px solid var(--color-grid)",
        background:
          "color-mix(in srgb, var(--color-canvas-alt) 60%, transparent)",
      }}
    >
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
          fontWeight: 500,
        }}
      >
        <span>Contents</span>
        <motion.span
          aria-hidden
          className="inline-flex h-5 w-5 items-center justify-center"
          animate={{ rotate: open ? 45 : 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: duration.quick * 0.8, ease: easing.smooth }
          }
          style={{
            color: "var(--color-green-deep)",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </summary>
      <ol className="flex flex-col gap-1 pb-5 pl-6 pr-6">
        {headings.map((h, i) => {
          const indent = h.level === 3 ? 16 : 0;
          return (
            <li key={h.id} style={{ marginLeft: indent }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className="block rounded-sm py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: h.level === 3 ? 13 : 14,
                  color: "var(--color-ink-secondary)",
                  letterSpacing: "-0.005em",
                  lineHeight: 1.4,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    color: "var(--color-ink-tertiary)",
                    marginRight: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </details>
  );
}
