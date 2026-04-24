"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { duration, easing } from "@/lib/motion";

interface FaqItem {
  q: string;
  a: string;
}

interface ArticleFAQProps {
  items: FaqItem[];
}

/**
 * Editorial FAQ accordion for the compare article.
 *
 * Uses native <details>/<summary> for semantics + keyboard + a11y,
 * layered with a Motion-controlled chevron that rotates on open.
 * Chevron duration is 240ms; reduced motion collapses the animation to 0.
 */
export default function ArticleFAQ({ items }: ArticleFAQProps) {
  return (
    <section className="mt-24">
      <h2
        className="mb-10"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.875rem, 3vw, 2.5rem)",
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
        }}
      >
        Frequently asked questions
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <FaqRow key={`${idx}-${item.q}`} item={item} />
        ))}
      </ul>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <li>
      <details
        className="group"
        style={{
          borderLeft: "2px solid var(--color-green-deep)",
          background:
            "color-mix(in srgb, var(--color-ink) 2%, transparent)",
        }}
        onToggle={(event) => {
          setOpen((event.currentTarget as HTMLDetailsElement).open);
        }}
      >
        <summary
          className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.0625rem, 1.35vw, 1.25rem)",
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: "var(--color-ink)",
          }}
        >
          <span>{item.q}</span>
          <motion.span
            aria-hidden
            className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center"
            animate={{ rotate: open ? 180 : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: duration.quick * 0.8, ease: easing.smooth }
            }
            style={{ color: "var(--color-green-deep)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 5l4 4 4-4" />
            </svg>
          </motion.span>
        </summary>
        <div
          className="px-5 pb-5"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15.5,
            lineHeight: 1.65,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.003em",
          }}
        >
          {item.a}
        </div>
      </details>
    </li>
  );
}
