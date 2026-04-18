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
// Inline styles are co-located with the component via a <style jsx> block so
// the grid-template-rows hack stays scoped to the accordion instance.

import { useMemo, useState } from "react";
import type { FaqEntry, FaqGroupKey, FaqGroupMeta } from "@/content/faq";

export interface FaqGroup {
  meta: FaqGroupMeta;
  entries: FaqEntry[];
}

interface FaqAccordionProps {
  groups: FaqGroup[];
  /**
   * Render optional filter pills above the groups. Phase 3.2 scaffolds the
   * filter; Phase 4 will polish spacing, motion, and empty-state copy.
   */
  showFilter?: boolean;
}

type FilterKey = "all" | FaqGroupKey;

export default function FaqAccordion({
  groups,
  showFilter = true,
}: FaqAccordionProps) {
  const [active, setActive] = useState<FilterKey>("all");

  const visibleGroups = useMemo(() => {
    if (active === "all") return groups;
    return groups.filter((g) => g.meta.key === active);
  }, [active, groups]);

  const filterItems: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    ...groups.map((g) => ({ key: g.meta.key, label: g.meta.title })),
  ];

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

      <div className="flex flex-col gap-20 md:gap-28">
        {visibleGroups.map((group) => (
          <section
            key={group.meta.key}
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
          </section>
        ))}
      </div>

      {/* Scoped styles — keeps the grid-row expand hack + visibility gate in
          one place. Using a plain <style> tag (not styled-jsx) so this file
          stays framework-agnostic within the app router. */}
      <style>{styles}</style>
    </div>
  );
}

// ─── Single item ─────────────────────────────────────────────────────────────
function FaqItem({ entry }: { entry: FaqEntry }) {
  return (
    <li className="faq-item-row">
      <details className="faq-item">
        <summary className="faq-summary">
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

.faq-item-row {
  border-top: 1px solid var(--color-grid);
  list-style: none;
}
.faq-item-row:last-child {
  border-bottom: 1px solid var(--color-grid);
}

.faq-item {
  width: 100%;
}

.faq-summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.5rem 0;
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
  transition: transform var(--duration-quick) var(--ease-expo),
    color var(--duration-quick) var(--ease-expo);
}
.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
  color: var(--color-green-deep);
}

/* The grid-row 0fr → 1fr expand trick.
   Collapsed: grid-template-rows: 0fr + visibility hidden (after delay).
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
  .faq-item .faq-content,
  .faq-item[open] .faq-content,
  .faq-chevron {
    transition-duration: 0.01ms !important;
  }
}
`;
