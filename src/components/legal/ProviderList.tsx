"use client";

import { useState, type ReactNode } from "react";
import styles from "./security.module.css";

export interface Provider {
  name: string;
  /** Short role label shown on the card (restates the body). */
  scope: string;
  /** True when the shipped text ties the provider to health data. */
  health: boolean;
  tag: string;
  tone: "health" | "consent" | "none";
  /** The provider's shipped sentence, unchanged. */
  body: ReactNode;
}

type Filter = "all" | "health" | "none";

const CHIPS: { id: Filter; label: string }[] = [
  { id: "all", label: "All providers" },
  { id: "health", label: "Health data" },
  { id: "none", label: "No health data" },
];

function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/**
 * /security §6 — the provider list with its filter (mockup: "Who sees
 * what"). Every card is in the server HTML; the filter only toggles the
 * `hidden` attribute, so all eight entries stay in the page for crawlers.
 * In the two-column grid, an odd count's last visible card is marked
 * `data-wide` and takes the whole row, so no card sits beside an empty slot.
 */
export default function ProviderList({ providers }: { providers: Provider[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const matches = (p: Provider) =>
    filter === "all" || (filter === "health" ? p.health : !p.health);
  const shown = providers.filter(matches);
  const wideName =
    shown.length % 2 === 1 ? shown[shown.length - 1]?.name : undefined;
  const summary =
    filter === "all"
      ? "Showing every provider."
      : `Showing ${joinNames(shown.map((p) => p.name))}.`;

  return (
    <>
      <div role="group" aria-label="Filter the providers" className={styles.chips}>
        {CHIPS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={styles.chip}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className={styles.chipSummary}>
        {summary}
      </p>

      <ul className={styles.providers}>
        {providers.map((p) => (
          <li
            key={p.name}
            hidden={!matches(p)}
            data-wide={p.name === wideName ? "true" : undefined}
            className={styles.provider}
          >
            <div aria-hidden className={styles.providerTop}>
              <span className={styles.providerScope}>{p.scope}</span>
              <span className={styles.providerTag} data-tone={p.tone}>
                {p.tag}
              </span>
            </div>
            <p className={styles.providerText}>{p.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
