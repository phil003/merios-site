import type { CSSProperties } from "react";
import Link from "next/link";
import { toolHref, type Tool } from "./registry";
import css from "./toolPage.module.css";

export function topicKey(topic: string): string {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * A tool card: a plate that shows the tool's formula (never a photo), then
 * eyebrow · inputs, the title, the description and "Open". The hub keeps
 * its titles as h2 (as shipped); related cards use h3.
 */
export default function ToolCard({
  tool,
  heading = "h2",
  wide = false,
  size = "regular",
}: {
  tool: Tool;
  heading?: "h2" | "h3";
  wide?: boolean;
  size?: "regular" | "small";
}) {
  const Heading = heading;
  return (
    <Link href={toolHref(tool)} className={css.card}>
      <span className={css.plate} data-topic={topicKey(tool.topic)} data-size={size}>
        <span className={css.plateTopic}>{tool.topic}</span>
        <span className={css.plateBody}>
          {wide ? (
            <AgeRings />
          ) : (
            <>
              <span className={css.plateFormula}>{tool.plate}</span>
              <span className={css.plateSub}>{tool.plateSub}</span>
            </>
          )}
        </span>
      </span>
      <span className={css.meta}>
        {tool.eyebrow} · {tool.inputs}
      </span>
      <Heading className={css.cardTitle}>{tool.title}</Heading>
      <span className={css.cardDesc}>{tool.description}</span>
      <span className={css.open}>
        Open
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

/** PhenoAge example: age 35 against PhenoAge 32.2, out of 100 years. */
function AgeRings() {
  return (
    <span className={css.rings}>
      <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden focusable="false">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgb(24 33 63 / 0.08)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="#18213F"
          strokeWidth="8"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="35 100"
          transform="rotate(-90 60 60)"
          opacity="0.75"
        />
        <circle cx="60" cy="60" r="38" fill="none" stroke="rgb(24 33 63 / 0.08)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r="38"
          fill="none"
          stroke="#6E8FE8"
          strokeWidth="8"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="32.2 100"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="66" textAnchor="middle" fontSize="24" fill="#18213F" style={{ fontFamily: "var(--font-serif)" }}>
          32.2
        </text>
      </svg>
      <span className={css.ringLegend}>
        <span className={css.ringKey} style={{ "--key-o": "0.75" } as CSSProperties}>
          Age 35
        </span>
        <span className={css.ringKey} style={{ "--key": "#6E8FE8" } as CSSProperties}>
          PhenoAge 32.2
        </span>
        <span className={css.ringNote}>Example data, out of 100 years</span>
      </span>
    </span>
  );
}
