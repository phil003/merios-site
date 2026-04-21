"use client";

// FaqAccordion — native <details>/<summary> driven accordion with a CSS-only
// expand animation using the grid-template-rows 0fr → 1fr trick.
//
// Why this approach:
// - Zero JS for expand/collapse (native <details>) — keyboard + a11y for free.
// - Animates *height* smoothly without measuring DOM nodes.
// - The visibility toggle + delayed transition keeps collapsed content out of
//   the accessibility tree + tab order when closed.
//
// Phase 4 polish:
// - Chevron rotates 180deg on open (240ms cubic-bezier(0.32, 0.72, 0, 1)).
// - Green-deep 2px accent line on the left that scaleY 0 → 1 on open.
// - Subtle bg-ink/[0.02] tint on open.
// - Filter chips animate re-appearing items with Motion's AnimatePresence +
//   layout prop and a 40ms stagger.
// - Empty state with a Clear filter reset.
// - All motion respects useReducedMotion().

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FaqEntry, FaqGroupKey, FaqGroupMeta } from "@/content/faq";
import { easing } from "@/lib/motion";

export interface FaqGroup {
  meta: FaqGroupMeta;
  entries: FaqEntry[];
}

interface FaqAccordionProps {
  groups: FaqGroup[];
  /**
   * Render optional filter pills above the groups. Phase 4 wires these to
   * actually filter the visible list.
   */
  showFilter?: boolean;
}

type FilterKey = "all" | FaqGroupKey;

export default function FaqAccordion({
  groups,
  showFilter = true,
}: FaqAccordionProps) {
  const [active, setActive] = useState<FilterKey>("all");
  const prefersReducedMotion = useReducedMotion();

  const visibleGroups = useMemo(() => {
    if (active === "all") return groups;
    return groups.filter((g) => g.meta.key === active);
  }, [active, groups]);

  const filterItems: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    ...groups.map((g) => ({ key: g.meta.key, label: g.meta.title })),
  ];

  const isEmpty = visibleGroups.length === 0;

  // Stagger is 40ms between re-appearing items. Gated by reduced motion.
  const staggerChildren = prefersReducedMotion ? 0 : 0.04;

  return (
    <div className="faq-accordion">
      {showFilter && (
        <div
          role="tablist"
          aria-label="Filter FAQ by topic"
          className="mb-12 flex flex-wrap gap-2 md:mb-16"
        >
          {filterItems.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-pressed={isActive}
                onClick={() => setActive(item.key)}
                className="faq-pill"
                data-active={isActive}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {isEmpty ? (
        <EmptyState onClear={() => setActive("all")} />
      ) : (
        <motion.div
          key={active}
          className="flex flex-col gap-20 md:gap-28"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren, delayChildren: 0 },
            },
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleGroups.map((group) => (
              <motion.section
                key={group.meta.key}
                layout={prefersReducedMotion ? false : "position"}
                variants={{
                  hidden: prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0.01 : 0.6,
                      ease: easing.expo,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  transition: {
                    duration: prefersReducedMotion ? 0.01 : 0.2,
                    ease: easing.smooth,
                  },
                }}
                aria-labelledby={`faq-group-${group.meta.key}`}
              >
                <header className="mb-8 md:mb-10">
                  <div
                    className="mb-3 flex items-center gap-2.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-pulse)" }}
                    />
                    <span
                      className="text-[10.5px] uppercase"
                      style={{
                        color: "var(--color-green-deep)",
                        letterSpacing: "0.22em",
                        fontWeight: 500,
                      }}
                    >
                      {group.meta.eyebrow}
                    </span>
                  </div>
                  <h2
                    id={`faq-group-${group.meta.key}`}
                    className="text-3xl md:text-5xl"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--color-ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                      fontWeight: 400,
                    }}
                  >
                    {group.meta.title}
                  </h2>
                </header>

                <ul className="flex flex-col">
                  {group.entries.map((entry) => (
                    <FaqItem key={entry.id} entry={entry} />
                  ))}
                </ul>
              </motion.section>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Scoped styles — keeps the grid-row expand hack + visibility gate in
          one place. Using a plain <style> tag (not styled-jsx) so this file
          stays framework-agnostic within the app router. */}
      <style>{styles}</style>
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-start gap-5 py-10"
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.375rem, 2vw, 1.75rem)",
          lineHeight: 1.25,
          letterSpacing: "-0.015em",
          color: "var(--color-ink)",
          fontWeight: 400,
          maxWidth: "34ch",
        }}
      >
        Nothing here — yet.
      </p>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1.0625rem",
          lineHeight: 1.6,
          color: "var(--color-ink-secondary)",
          maxWidth: "52ch",
        }}
      >
        No questions match this filter. Try a different topic, or view all
        questions.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="faq-clear-btn"
      >
        Clear filter
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

// ─── Single item ─────────────────────────────────────────────────────────────
function FaqItem({ entry }: { entry: FaqEntry }) {
  return (
    <li className="faq-item-row">
      <details className="faq-item">
        <summary className="faq-summary">
          <span aria-hidden className="faq-accent" />
          <span className="faq-question">{entry.q}</span>
          <span aria-hidden className="faq-chevron">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </summary>
        <div className="faq-content">
          <div>
            <p className="faq-answer">{entry.a}</p>
          </div>
        </div>
      </details>
    </li>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = `
.faq-accordion .faq-pill {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  border: 1px solid var(--color-grid);
  background: transparent;
  color: var(--color-ink-secondary);
  cursor: pointer;
  transition: color var(--duration-quick) var(--ease-expo),
    background-color var(--duration-quick) var(--ease-expo),
    border-color var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-pill:hover {
  color: var(--color-ink);
  border-color: var(--color-ink);
}
.faq-accordion .faq-pill[data-active="true"] {
  color: var(--color-canvas);
  background: var(--color-ink);
  border-color: var(--color-ink);
}
.faq-accordion .faq-pill:focus-visible {
  outline: 2px solid var(--color-green-deep);
  outline-offset: 2px;
}

.faq-accordion .faq-clear-btn {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: var(--color-ink);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-ink);
  padding: 2px 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--duration-quick) var(--ease-expo),
    border-color var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-clear-btn:hover {
  color: var(--color-green-deep);
  border-color: var(--color-green-deep);
}
.faq-accordion .faq-clear-btn:focus-visible {
  outline: 2px solid var(--color-green-deep);
  outline-offset: 4px;
  border-radius: 2px;
}

.faq-item-row {
  border-top: 1px solid var(--color-grid);
  list-style: none;
}
.faq-item-row:last-child {
  border-bottom: 1px solid var(--color-grid);
}

.faq-item {
  width: 100%;
  position: relative;
  transition: background-color var(--duration-quick) var(--ease-expo);
}
.faq-item[open] {
  /* ink at 2% opacity — a subtle tint that survives on the canvas background. */
  background-color: color-mix(in srgb, var(--color-ink) 2%, transparent);
}

.faq-summary {
  list-style: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.5rem 1rem 1.5rem 1.25rem;
  margin: 0 -1rem 0 -1.25rem;
  cursor: pointer;
  user-select: none;
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-size: clamp(1.125rem, 1.6vw, 1.375rem);
  line-height: 1.3;
  letter-spacing: -0.01em;
  font-weight: 400;
  transition: color var(--duration-quick) var(--ease-expo);
}
.faq-summary::-webkit-details-marker {
  display: none;
}
.faq-summary::marker {
  display: none;
}
.faq-summary:hover {
  color: var(--color-green-deep);
}
.faq-summary:focus-visible {
  outline: 2px solid var(--color-green-deep);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Green-deep 2px accent line on the left edge of the row.
   Starts at scaleY(0), grows to scaleY(1) on open. */
.faq-accent {
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 10%;
  width: 2px;
  background: var(--color-green-deep);
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.faq-item[open] .faq-accent {
  transform: scaleY(1);
}

.faq-question {
  flex: 1 1 auto;
}

.faq-chevron {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--color-ink-secondary);
  transition: transform 240ms cubic-bezier(0.32, 0.72, 0, 1),
    color var(--duration-quick) var(--ease-expo);
}
.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
  color: var(--color-green-deep);
}

/* The grid-row 0fr → 1fr expand trick.
   Collapsed: grid-template-rows: 0fr + visibility hidden (after 280ms delay
   so content doesn't flash away before collapse finishes).
   Open: grid-template-rows: 1fr + visibility visible (immediately). */
.faq-item .faq-content {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 280ms var(--ease-expo),
    visibility 0s linear 280ms;
}
.faq-item[open] .faq-content {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows 280ms var(--ease-expo),
    visibility 0s linear 0s;
}
.faq-item .faq-content > div {
  overflow: hidden;
  min-height: 0;
}

.faq-answer {
  font-family: var(--font-sans);
  color: var(--color-ink-secondary);
  font-size: 1.0625rem;
  line-height: 1.65;
  max-width: 62ch;
  padding: 0 0 1.75rem 0;
}

@media (prefers-reduced-motion: reduce) {
  .faq-item,
  .faq-item .faq-content,
  .faq-item[open] .faq-content,
  .faq-chevron,
  .faq-accent {
    transition-duration: 0.01ms !important;
  }
}
`;
