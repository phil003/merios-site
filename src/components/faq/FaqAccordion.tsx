"use client";

// FaqAccordion — native <details>/<summary> accordion, Open Sky (v2).
//
// - Zero JS for expand/collapse (native <details>): keyboard, find-in-page and
//   a11y for free. Questions and answers are in the server HTML.
// - Open/close animates the details' own content box (::details-content +
//   interpolate-size, block-size 0 ↔ auto). Browsers without support simply
//   snap open/closed; the answer still fades in via a keyframe on [open].
// - The topic filter is a glass segmented control (the chosen topic is a
//   white pill). Each group is one glass panel of question rows split by
//   hairlines, as on /pricing: a haze disc carries a "+" that turns into "−"
//   (on ink) when the row is open.
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

/* ── Filter: a glass segmented control ── */
.faq-accordion .faq-filter {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  max-width: 100%;
  margin-bottom: clamp(48px, 6vw, 88px);
  padding: 4px;
  border-radius: 26px;
  background: rgb(255 255 255 / 0.55);
  border: 1.5px solid rgb(255 255 255 / 0.85);
}
.faq-accordion .faq-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 44px;
  padding: 0 18px 0 16px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-ink-secondary);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  line-height: 1;
  cursor: pointer;
  transition:
    color var(--duration-quick) var(--ease-expo),
    background-color var(--duration-quick) var(--ease-expo),
    box-shadow var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-pill-dot {
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 999px;
  background: rgb(24 33 63 / 0.18);
  transition: background-color var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-pill:hover {
  color: var(--color-ink);
  background: rgb(255 255 255 / 0.6);
}
.faq-accordion .faq-pill[data-active="true"] {
  color: var(--color-ink);
  background: #FFFFFF;
  box-shadow: 0 8px 20px -12px rgb(36 48 110 / 0.5);
}
.faq-accordion .faq-pill[data-active="true"] .faq-pill-dot {
  background: var(--color-zenith);
}
.faq-accordion .faq-pill:focus-visible {
  outline: 2px solid var(--color-link);
  outline-offset: 2px;
}

/* ── Groups: sticky title column + one glass panel of questions ── */
.faq-accordion .faq-groups {
  display: flex;
  flex-direction: column;
  gap: clamp(56px, 7vw, 104px);
}
.faq-accordion .faq-group {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
}
.faq-accordion .faq-group-head {
  display: grid;
  gap: 16px;
  align-content: start;
}
.faq-accordion .faq-eyebrow {
  color: var(--color-ink-secondary);
}
.faq-accordion .faq-group-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(30px, 3.4vw, 46px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-ink);
  text-wrap: balance;
}
@media (min-width: 1024px) {
  .faq-accordion .faq-group {
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    gap: 56px;
  }
  .faq-accordion .faq-group-head {
    position: sticky;
    top: 112px;
    align-self: start;
    padding-top: 14px;
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

/* ── Question rows in a glass panel ── */
.faq-accordion .faq-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: 24px;
  background: rgb(255 255 255 / 0.55);
  border: 1.5px solid rgb(255 255 255 / 0.85);
}
.faq-accordion .faq-item-row {
  list-style: none;
}
.faq-accordion .faq-item-row + .faq-item-row {
  border-top: 1px solid rgb(24 33 63 / 0.08);
}
.faq-accordion .faq-item {
  border-radius: 22px;
  transition: background-color 400ms var(--ease-expo);
}
.faq-accordion .faq-item[open] {
  background: rgb(255 255 255 / 0.72);
}

.faq-accordion .faq-summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding: 16px 18px 16px 22px;
  border-radius: 22px;
  cursor: pointer;
  user-select: none;
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}
.faq-accordion .faq-summary::-webkit-details-marker {
  display: none;
}
.faq-accordion .faq-summary::marker {
  content: "";
}
.faq-accordion .faq-summary:focus-visible {
  outline: 2px solid var(--color-link);
  outline-offset: 2px;
}
.faq-accordion .faq-question {
  flex: 1 1 auto;
  min-width: 0;
}

/* "+" in a haze disc; turns into "−" on an ink disc when open */
.faq-accordion .faq-icon {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: var(--color-haze);
  color: var(--color-ink);
  transition:
    transform 500ms var(--ease-expo),
    background-color var(--duration-quick) var(--ease-expo),
    color var(--duration-quick) var(--ease-expo),
    box-shadow var(--duration-quick) var(--ease-expo);
}
.faq-accordion .faq-icon-v {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 500ms var(--ease-expo);
}
.faq-accordion .faq-summary:hover .faq-icon {
  background: #FFFFFF;
  box-shadow: 0 6px 14px -8px rgb(36 48 110 / 0.5);
}
.faq-accordion .faq-item[open] .faq-icon {
  transform: rotate(180deg);
  background: var(--color-ink);
  color: #FFFFFF;
  box-shadow: none;
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
  padding: 0 22px 22px;
}
@keyframes faqAnswerIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: none; }
}
.faq-accordion .faq-answer {
  margin: 0;
  max-width: 64ch;
  font-family: var(--font-sans);
  font-size: 1rem;
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
  border-radius: 28px;
  background: rgb(255 255 255 / 0.55);
  border: 1.5px solid rgb(255 255 255 / 0.85);
}
.faq-accordion .faq-empty-title {
  margin: 0;
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 1.1rem + 1vw, 1.9rem);
  font-weight: 600;
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
.faq-accordion .faq-clear-btn:focus-visible {
  outline: 2px solid var(--color-link);
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .faq-accordion .faq-pill {
    padding: 0 14px 0 12px;
  }
  .faq-accordion .faq-summary {
    gap: 14px;
    padding: 15px 14px 15px 18px;
    font-size: 1rem;
  }
  .faq-accordion .faq-content > div {
    padding: 0 18px 20px;
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
