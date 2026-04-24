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
 * Editorial FAQ accordion for the /blog/[slug] article.
 *
 * Uses native <details>/<summary> for keyboard + a11y. A Motion-controlled
 * indicator rotates between "+" (closed) and "×" (open).
 */
export default function ArticleFAQ({ items }: ArticleFAQProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="article-faq-heading"
      className="mx-auto mt-16 max-w-[820px] px-6 md:px-10"
    >
      <h2
        id="article-faq-heading"
        className="mb-8"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-display-m)",
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
        }}
      >
        Frequently asked questions
      </h2>
      <ul className="flex flex-col">
        {items.map((item, idx) => (
          <FaqRow
            key={`${idx}-${item.q}`}
            item={item}
            isFirst={idx === 0}
          />
        ))}
      </ul>
    </section>
  );
}

function FaqRow({ item, isFirst }: { item: FaqItem; isFirst: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <li
      style={{
        borderTop: isFirst ? "1px solid var(--color-grid)" : undefined,
        borderBottom: "1px solid var(--color-grid)",
      }}
    >
      <details
        className="group"
        onToggle={(event) => {
          setOpen((event.currentTarget as HTMLDetailsElement).open);
        }}
      >
        <summary
          className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
            color: "var(--color-ink)",
          }}
        >
          <span>{item.q}</span>
          <motion.span
            aria-hidden
            className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center"
            animate={{ rotate: open ? 45 : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: duration.quick * 0.8, ease: easing.smooth }
            }
            style={{
              color: "var(--color-green-deep)",
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            +
          </motion.span>
        </summary>
        <div
          className="pb-6 pr-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            lineHeight: 1.7,
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
