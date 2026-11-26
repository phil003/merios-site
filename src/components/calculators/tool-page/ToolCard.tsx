import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import { withSubs } from "../subscript";
import { toolHref, type Tool } from "./registry";
import css from "./toolPage.module.css";

export function topicKey(topic: string): string {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * A plate formula wraps only after "=" or "→" ("eAG =" / "28.7 × A1C − 46.7"),
 * never inside an expression: each piece is a no-wrap span.
 */
function plateSegments(plate: string): string[] {
  const segments: string[] = [];
  let current: string[] = [];
  for (const word of plate.split(" ")) {
    current.push(word);
    if (word === "=" || word === "→") {
      segments.push(current.join(" "));
      current = [];
    }
  }
  if (current.length) segments.push(current.join(" "));
  return segments;
}

/** Approximate width of a string in Newsreader 400, in em (within ±5%). */
function emWidth(text: string): number {
  let w = 0;
  for (const c of text) {
    if (c === " ") w += 0.24;
    else if (/[il.,:;'()[\]\/jtfr!|]/.test(c)) w += 0.3;
    else if (/[mwMW]/.test(c)) w += 0.8;
    else if (/[A-Z]/.test(c)) w += 0.66;
    else if (/[0-9]/.test(c)) w += 0.5;
    else if (/[×÷−+=·]/.test(c)) w += 0.56;
    else if (/[↔→]/.test(c)) w += 0.95;
    else w += 0.49;
  }
  return w;
}

/**
 * The plate formula's size, in % of the plate's width: the longest piece fits
 * on one line (8% margin), capped at the full size in CSS. A long formula is
 * set smaller instead of breaking mid-expression.
 */
function plateFit(segments: string[]): number {
  const widest = Math.max(...segments.map(emWidth));
  return Math.round((100 / (widest * 1.08)) * 100) / 100;
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
            <PlateFormula plate={tool.plate} plateSub={tool.plateSub} />
          )}
        </span>
      </span>
      <span className={css.meta}>
        {tool.eyebrow} · {tool.inputs}
      </span>
      <Heading className={css.cardTitle}>{tool.title}</Heading>
      <span className={css.cardDesc}>{withSubs(tool.description)}</span>
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

function PlateFormula({ plate, plateSub }: { plate: string; plateSub: string }) {
  const segments = plateSegments(plate);
  return (
    <>
      <span className={css.plateFormula} style={{ "--fit": plateFit(segments) } as CSSProperties}>
        {segments.map((segment, i) => (
          <Fragment key={`${i}-${segment}`}>
            {i > 0 ? " " : null}
            <span className={css.plateSegment}>{withSubs(segment)}</span>
          </Fragment>
        ))}
      </span>
      <span className={css.plateSub}>{plateSub}</span>
    </>
  );
}

/**
 * PhenoAge example: age 34 against PhenoAge 32.2, out of 100 years, the same
 * example data as the app screen at the foot of the hub (CtaScreen "bio-age").
 */
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
          strokeDasharray="34 100"
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
          Age 34
        </span>
        <span className={css.ringKey} style={{ "--key": "#6E8FE8" } as CSSProperties}>
          PhenoAge 32.2
        </span>
        <span className={css.ringNote}>Example data, out of 100 years</span>
      </span>
    </span>
  );
}
