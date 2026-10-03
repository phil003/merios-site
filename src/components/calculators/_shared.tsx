"use client";

/**
 * Shared UI primitives for the calculator components (site v3).
 *
 * Presentation only: every calculator keeps its own maths, validation, units,
 * thresholds, labels and copy. These pieces render the v3 "instrument card":
 * a white lab card (mono labels, units never uppercased, generous inputs), and
 * the lilac "Merios says" result sticker with a status chip and the range bar
 * from the homepage translator. Styles live in calculators.module.css and are
 * scoped so they also hold inside .editorial-prose (calculators embedded in
 * blog articles).
 */

import type { CSSProperties, ReactNode } from "react";
import s from "./calculators.module.css";

/** Status family: in range = forest, borderline = warm, outside = soft-alert. */
export type Tone = "ok" | "warn" | "bad" | "neutral";

/** Class names, for the few calculators that keep a bespoke control group. */
export const styles = s;

export function Shell({
  labelledBy,
  layout = "split",
  children,
}: {
  labelledBy: string;
  layout?: "split" | "stack";
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={labelledBy} className={s.calc} data-layout={layout}>
      <div className={s.layout}>{children}</div>
    </section>
  );
}

export function CalcHead({ children }: { children: ReactNode }) {
  return (
    <div className={s.head}>
      {children}
      <span aria-hidden className={`pulse-rule ${s.pulse}`} />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className={`label ${s.eyebrow}`}>
      <span aria-hidden className={`label-dot ${s.eyebrowDot}`} />
      <span>{children}</span>
    </div>
  );
}

export function CalcTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className={s.title}>
      {children}
    </h2>
  );
}

export function CalcInputs({ children }: { children: ReactNode }) {
  return <div className={s.inputs}>{children}</div>;
}

export function Controls({ children }: { children: ReactNode }) {
  return <div className={s.controls}>{children}</div>;
}

export function Fields({
  cols = "2",
  style,
  children,
}: {
  cols?: "1" | "2" | "3" | "pair" | "panel";
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={s.fields} data-cols={cols} style={style}>
      {children}
    </div>
  );
}

export function Field({
  label,
  unit,
  placeholder,
  value,
  onChange,
  inputId,
  step = "0.1",
  min = 0,
  max,
  inputMode = "decimal",
  literalUnit = false,
  style,
}: {
  label: string;
  unit?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  inputId: string;
  step?: string;
  min?: number;
  max?: number;
  inputMode?: "decimal" | "numeric";
  /** render "(unit)" as one text node, for labels that were a single literal */
  literalUnit?: boolean;
  style?: CSSProperties;
}) {
  return (
    <label htmlFor={inputId} className={s.field} style={style}>
      <span className={s.fieldLabel}>
        {unit === undefined ? (
          label
        ) : (
          <>
            {label} <span className={s.fieldUnit}>{literalUnit ? `(${unit})` : <>({unit})</>}</span>
          </>
        )}
      </span>
      <input
        id={inputId}
        type="number"
        inputMode={inputMode}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={s.input}
      />
    </label>
  );
}

export function Toggle({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className={s.fieldset}>
      <legend className={s.legend}>{legend}</legend>
      <div className={s.seg}>
        {options.map((o) => {
          const active = o.key === value;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.key)}
              className={s.segBtn}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CalcOutput({ children }: { children: ReactNode }) {
  return <div className={s.output}>{children}</div>;
}

export function ResultPanel({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <div aria-live="polite" className={s.result} data-active={active ? "true" : "false"}>
      {children}
    </div>
  );
}

/** Wraps a live result so it settles in once, when it first appears. */
export function ResultBody({ children }: { children: ReactNode }) {
  return <div className={s.resultBody}>{children}</div>;
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className={s.emptyWrap}>
      <span aria-hidden className={s.emptyMark}>
        <svg width="20" height="10" viewBox="0 0 40 20" focusable="false">
          <path
            d="M1 10 H14 L17 13 L21 2 L26 18 L29 10 H34"
            fill="none"
            stroke="#10231A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36.5" cy="10" r="2.6" fill="#D6F050" stroke="#10231A" strokeWidth="1.2" />
        </svg>
      </span>
      <p className={s.empty}>{children}</p>
    </div>
  );
}

export function ResultLabel({ children }: { children: ReactNode }) {
  return <div className={s.resultLabel}>{children}</div>;
}

export function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={s.chip} data-tone={tone}>
      {children}
    </span>
  );
}

export type Zone = { from: number; to: number; tone: Tone };

/**
 * The translator's range bar: the in-range band (forest), borderline zones
 * (warm) and outside zones, with a dot at the value. Decorative — the value
 * and its band are always spelled out in text next to it.
 */
export function RangeBar({
  min,
  max,
  value,
  zones,
  tone,
}: {
  min: number;
  max: number;
  value: number;
  zones: Zone[];
  tone: Tone;
}) {
  const pct = (x: number) => Math.min(Math.max((x - min) / (max - min), 0), 1) * 100;
  const ticks = zones.slice(1).map((z) => z.from).filter((x) => x > min && x < max);
  return (
    <div aria-hidden className={s.range} data-tone={tone}>
      <div className={s.rangeTrack}>
        <div className={s.rangeZones}>
          {zones.map((z) => (
            <span
              key={`${z.from}-${z.to}`}
              className={s.rangeZone}
              data-tone={z.tone}
              style={{ left: `${pct(z.from)}%`, width: `${pct(z.to) - pct(z.from)}%` }}
            />
          ))}
        </div>
        {ticks.map((t) => (
          <span key={t} className={s.rangeTick} style={{ left: `${pct(t)}%` }} />
        ))}
        <span className={s.rangeDot} style={{ left: `${pct(value)}%` }} />
      </div>
    </div>
  );
}

export function Refs({ children }: { children: ReactNode }) {
  return <div className={s.refs}>{children}</div>;
}

export function RefRow({ label, range, tone }: { label: string; range: string; tone: Tone }) {
  return (
    <div className={s.refRow} data-tone={tone}>
      <span aria-hidden className={s.refDot} />
      <span className={s.refLabel}>{label}</span>
      <span className={s.refRange}>{range}</span>
    </div>
  );
}

export function CalcFoot({ children }: { children: ReactNode }) {
  return <div className={s.foot}>{children}</div>;
}

export function Footnote({ children }: { children: ReactNode }) {
  return <p className={s.footnote}>{children}</p>;
}

export const ctaInkClass = `btn btn-ink ${s.cta} ${s.ctaInk}`;
export const ctaGhostClass = `btn btn-ghost ${s.cta} ${s.ctaGhost}`;

export function Cta() {
  return (
    <div className={s.ctaRow}>
      <a href="/early-access" className={ctaInkClass}>
        Track this in Merios <span className={`btn-arrow ${s.arrow}`}>→</span>
      </a>
    </div>
  );
}

export function round(v: number, d: number) {
  const f = Math.pow(10, d);
  return Math.round(v * f) / f;
}
