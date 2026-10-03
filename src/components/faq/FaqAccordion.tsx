"use client";

// FaqAccordion — native <details>/<summary> accordion, v3 art direction.
//
// - Zero JS for expand/collapse (native <details>): keyboard, find-in-page and
//   a11y for free. Questions and answers are in the server HTML.
// - Open/close animates the details' own content box (::details-content +
//   interpolate-size, block-size 0 ↔ auto). Browsers without support simply
//   snap open/closed; the answer still fades in via a keyframe on [open].
// - White cards on fog, display question text, an ink disc carrying a lime
//   "+" that turns into "−" when open.
// - Filter pills re-render the group list keyed by the active filter; groups
//   re-enter with a CSS keyframe stagger (40ms/group). The animation only
//   plays after the first filter interaction so the initial HTML is fully
//   visible by default. Exits are immediate.
// - Reduced motion honoured by the global prefers-reduced-motion rule in
//   globals.css plus the scoped rule below.
// Every selector is scoped under .faq-accordion so nothing leaks to other
// routes.

import { useMemo, useState } from "react";
import type { FaqEntry, FaqGroupKey, FaqGroupMeta } from "@/content/faq";

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
  // Group entrance animations only play after the first filter interaction so
  // the server-rendered content stays visible by default on initial load.
  const [hasInteracted, setHasInteracted] = useState(false);

  const visibleGroups = useMemo(() => {
    if (active === "all") return groups;
    return groups.filter((g) => g.meta.key === active);
  }, [active, groups]);

  const filterItems: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    ...groups.map((g) => ({ key: g.meta.key, label: g.meta.title })),
  ];

  const isEmpty = visibleGroups.length === 0;

  const handleFilter = (key: FilterKey): void => {
    setActive(key);
    setHasInteracted(true);
  };

  return (
    <div className="faq-accordion">
      {showFilter && (
        <div
          role="tablist"
          aria-label="Filter FAQ by topic"
          className="faq-filter"
        >
          {filterItems.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilter(item.key)}
                className="faq-pill"
                data-active={isActive}
              >
                <span aria-hidden className="faq-pill-dot" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {isEmpty ? (
        <EmptyState onClear={() => handleFilter("all")} />
      ) : (
        <div key={active} className="faq-groups">
          {visibleGroups.map((group, index) => (
            <section
              key={group.meta.key}
              className={hasInteracted ? "faq-group faq-group-in" : "faq-group"}
              style={
                hasInteracted
                  ? { animationDelay: `${(index * 0.04).toFixed(2)}s` }
                  : undefined
              }
              aria-labelledby={`faq-group-${group.meta.key}`}
            >
              <header className="faq-group-head">
                <div className="label faq-eyebrow">
                  <span aria-hidden className="label-dot label-dot--ink" />
                  <span>{group.meta.eyebrow}</span>
                </div>
                <h2
                  id={`faq-group-${group.meta.key}`}
                  className="faq-group-title"
                >
                  {group.meta.title}
                </h2>
              </header>

              <ul className="faq-list">
                {group.entries.map((entry) => (
                  <FaqItem key={entry.id} entry={entry} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* Scoped styles — one place for the accordion's look and motion. A
          plain <style> tag (not styled-jsx) keeps this file framework-agnostic
          within the app router. */}
      <style>{styles}</style>
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div role="status" aria-live="polite" className="faq-empty">
      <p className="faq-empty-title">Nothing here — yet.</p>
      <p className="faq-empty-body">
        No questions match this filter. Try a different topic, or view all
        questions.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="btn btn-ghost faq-clear-btn"
      >
        Clear filter
        <span aria-hidden className="btn-arrow">→</span>
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
          <span className="faq-question">{entry.q}</span>
          <span aria-hidden className="faq-icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 7H12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                className="faq-icon-v"
                d="M7 1.5V12.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
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
.faq-accordion {
  /* lets block-size transition between 0 and auto where supported */
  interpolate-size: allow-keywords;
}

/* ── Filter pills ── */
.faq-accordion .faq-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: clamp(52px, 7vw, 96px);
}
.faq-accordion .faq-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 40px;
  padding: 0 16px 0 14px;
  border-radius: 999px;
  border: 1px solid var(--color-grid);
  background: #FFFFFF;
  color: var(--color-ink-secondary);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    color var(--duration-quick) var(--ease-expo),
    background-color var(--duration-quick) var(--ease-expo),
    border-color var(--duration-quick) var(--ease-expo),
    transform var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-pill-dot {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 999px;
  background: var(--color-grid);
  transition: background-color var(--duration-quick) var(--ease-expo), box-shadow var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-pill:hover {
  color: var(--color-ink);
  border-color: color-mix(in srgb, var(--color-ink) 38%, var(--color-grid));
}
.faq-accordion .faq-pill:hover .faq-pill-dot {
  background: color-mix(in srgb, var(--color-ink) 45%, var(--color-grid));
}
.faq-accordion .faq-pill[data-active="true"] {
  color: #FFFFFF;
  background: var(--color-ink);
  border-color: var(--color-ink);
}
.faq-accordion .faq-pill[data-active="true"] .faq-pill-dot {
  background: var(--color-lime);
  box-shadow: 0 0 10px rgb(214 240 80 / 0.75);
}
.faq-accordion .faq-pill:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}

/* ── Groups: sticky title column + question cards ── */
.faq-accordion .faq-groups {
  display: flex;
  flex-direction: column;
  gap: clamp(64px, 8vw, 112px);
}
.faq-accordion .faq-group {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 26px;
}
.faq-accordion .faq-group-head {
  display: grid;
  gap: 16px;
  align-content: start;
}
.faq-accordion .faq-eyebrow {
  color: var(--color-ink-tertiary);
}
.faq-accordion .faq-group-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 1.35rem + 2vw, 3.1rem);
  font-weight: 740;
  line-height: 0.98;
  letter-spacing: -0.04em;
  font-variation-settings: "opsz" 96;
  color: var(--color-ink);
  text-wrap: balance;
}
@media (min-width: 1024px) {
  .faq-accordion .faq-group {
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    gap: 48px;
  }
  .faq-accordion .faq-group-head {
    position: sticky;
    top: 116px;
    align-self: start;
    padding-top: 10px;
  }
}

/* Group re-entrance after a filter change — applied only post-interaction;
   the delay is set inline per group (40ms/group, under the 100ms cap). */
@keyframes faqGroupIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.faq-accordion .faq-group-in {
  animation: faqGroupIn 600ms var(--ease-expo) both;
}

/* ── Question cards ── */
.faq-accordion .faq-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
}
.faq-accordion .faq-item-row {
  list-style: none;
}
.faq-accordion .faq-item {
  position: relative;
  background: #FFFFFF;
  border: 1px solid var(--color-grid);
  border-radius: 22px;
  transition:
    border-color 400ms var(--ease-expo),
    box-shadow 400ms var(--ease-expo);
}
.faq-accordion .faq-item:hover {
  border-color: color-mix(in srgb, var(--color-ink) 22%, var(--color-grid));
}
.faq-accordion .faq-item[open] {
  border-color: color-mix(in srgb, var(--color-ink) 18%, var(--color-grid));
  box-shadow: 0 26px 50px -30px rgb(16 35 26 / 0.34);
}

.faq-accordion .faq-summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 20px 20px 26px;
  border-radius: 21px;
  cursor: pointer;
  user-select: none;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(1.0625rem, 0.98rem + 0.36vw, 1.3rem);
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: -0.022em;
  text-wrap: pretty;
}
.faq-accordion .faq-summary::-webkit-details-marker {
  display: none;
}
.faq-accordion .faq-summary::marker {
  content: "";
}
.faq-accordion .faq-summary:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}
.faq-accordion .faq-question {
  flex: 1 1 auto;
  min-width: 0;
}

/* Lime "+" in an ink disc; turns into "−" when open, inverts on hover */
.faq-accordion .faq-icon {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--color-ink);
  color: var(--color-lime);
  transition:
    transform 500ms var(--ease-expo),
    background-color var(--duration-quick) var(--ease-expo),
    color var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-icon-v {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 500ms var(--ease-expo);
}
.faq-accordion .faq-summary:hover .faq-icon {
  background: var(--color-lime);
  color: var(--color-ink);
}
.faq-accordion .faq-item[open] .faq-icon {
  transform: rotate(180deg);
}
.faq-accordion .faq-item[open] .faq-icon-v {
  transform: scaleY(0);
}

/* Open / close: the details content box animates 0 ↔ auto */
.faq-accordion .faq-item::details-content {
  block-size: 0;
  overflow-y: clip;
  transition:
    block-size 460ms var(--ease-expo),
    content-visibility 460ms allow-discrete;
}
.faq-accordion .faq-item[open]::details-content {
  block-size: auto;
}

.faq-accordion .faq-content > div {
  margin: 0 26px;
  padding: 18px 0 24px;
  border-top: 1px solid var(--color-grid);
}
@keyframes faqAnswerIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: none; }
}
.faq-accordion .faq-answer {
  margin: 0;
  max-width: 64ch;
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.65;
  letter-spacing: -0.005em;
  color: var(--color-ink-secondary);
  text-wrap: pretty;
}
.faq-accordion .faq-item[open] .faq-answer {
  animation: faqAnswerIn 520ms var(--ease-expo) both;
}

/* ── Empty state ── */
.faq-accordion .faq-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  padding: clamp(28px, 4vw, 44px);
  border-radius: 24px;
  background: #FFFFFF;
  border: 1px solid var(--color-grid);
}
.faq-accordion .faq-empty-title {
  margin: 0;
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 1.1rem + 1vw, 1.9rem);
  font-weight: 740;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: var(--color-ink);
}
.faq-accordion .faq-empty-body {
  margin: 0;
  max-width: 52ch;
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--color-ink-secondary);
}
.faq-accordion .faq-clear-btn {
  cursor: pointer;
}

@media (max-width: 640px) {
  .faq-accordion .faq-summary {
    gap: 14px;
    padding: 17px 14px 17px 18px;
  }
  .faq-accordion .faq-icon {
    width: 32px;
    height: 32px;
  }
  .faq-accordion .faq-content > div {
    margin: 0 18px;
    padding: 16px 0 20px;
  }
  .faq-accordion .faq-answer {
    font-size: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-accordion .faq-item,
  .faq-accordion .faq-item::details-content,
  .faq-accordion .faq-icon,
  .faq-accordion .faq-icon-v,
  .faq-accordion .faq-pill {
    transition-duration: 0.01ms !important;
  }
  .faq-accordion .faq-group-in,
  .faq-accordion .faq-item[open] .faq-answer {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
  }
}
`;
