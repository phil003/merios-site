"use client";

/**
 * Shared UI primitives for the calculator components (site v2, Open Sky).
 *
 * Presentation only: every calculator keeps its own maths, validation, units,
 * thresholds, labels and copy. These pieces render the Open Sky calculator
 * card (ToolPhenoAge mockup): a white card, inputs as soft tiles with the
 * number in Newsreader, "Use example" / "Clear" next to the title, and the
 * result on a dawn panel with a band chip and the range bar (blue in range,
 * peach and apricot outside it, never red). Styles live in
 * calculators.module.css and are scoped so they also hold inside
 * .editorial-prose (calculators embedded in blog articles).
 *
 * "Use example" fills every input with the value its placeholder already
 * shows ("e.g. 90"), so no calculator needs its own example data. "Example
 * data" is shown on the result only while those exact values are in place.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import s from "./calculators.module.css";

/** Status family: in range = blue, borderline = peach, outside = apricot. */
export type Tone = "ok" | "warn" | "bad" | "neutral";

/** Class names, for the few calculators that keep a bespoke control group. */
export const styles = s;

/* ─── Example store: one per calculator card ─────────────────────────────── */

type Entry = { value: string; example: string | null; set: (v: string) => void };

class ExampleStore {
  private entries = new Map<string, Entry>();
  private armed = false;
  private version = 0;
  private listeners = new Set<() => void>();

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };
  getSnapshot = () => this.version;
  getServerSnapshot = () => 0;

  private emit() {
    this.version += 1;
    this.listeners.forEach((fn) => fn());
  }
  upsert(id: string, entry: Entry) {
    const prev = this.entries.get(id);
    this.entries.set(id, entry);
    if (!prev || prev.value !== entry.value || prev.example !== entry.example) this.emit();
  }
  remove(id: string) {
    if (this.entries.delete(id)) this.emit();
  }
  fill() {
    this.armed = true;
    this.entries.forEach((e) => {
      if (e.example !== null) e.set(e.example);
    });
    this.emit();
  }
  clear() {
    this.armed = false;
    this.entries.forEach((e) => e.set(""));
    this.emit();
  }
  disarm() {
    if (!this.armed) return;
    this.armed = false;
    this.emit();
  }
  isExample() {
    if (!this.armed) return false;
    let any = false;
    for (const e of this.entries.values()) {
      if (e.example === null) continue;
      any = true;
      if (e.value !== e.example) return false;
    }
    return any;
  }
}

const ExampleContext = createContext<ExampleStore | null>(null);

/** "e.g. 4.5" → "4.5"; a placeholder that is not a number gives no example. */
function exampleOf(placeholder: string): string | null {
  const v = placeholder.replace(/^\s*e\.g\.\s*/i, "").trim();
  return /^-?\d+(\.\d+)?$/.test(v) ? v : null;
}

/* ─── Card ───────────────────────────────────────────────────────────────── */

export function Shell({
  labelledBy,
  layout = "split",
  children,
}: {
  labelledBy: string;
  layout?: "split" | "stack";
  children: ReactNode;
}) {
  const [store] = useState(() => new ExampleStore());
  return (
    <ExampleContext.Provider value={store}>
      <section aria-labelledby={labelledBy} className={s.calc} data-layout={layout}>
        <div className={s.layout}>{children}</div>
      </section>
    </ExampleContext.Provider>
  );
}

export function CalcHead({ children }: { children: ReactNode }) {
  return (
    <div className={s.head}>
      <div className={s.headText}>{children}</div>
      <ExampleActions />
    </div>
  );
}

function ExampleActions() {
  const store = useContext(ExampleContext);
  if (!store) return null;
  return (
    <div className={s.actions}>
      <button type="button" className={s.actionBtn} onClick={() => store.fill()}>
        Use example
      </button>
      <button type="button" className={s.actionBtn} onClick={() => store.clear()}>
        Clear
      </button>
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
  hint,
  placeholder,
  value,
  onChange,
  inputId,
  step = "0.1",
  min = 0,
  max,
  inputMode = "decimal",
  style,
}: {
  label: string;
  unit?: string;
  /** a short tag at the tile's top right (PhenoAge: the marker's system) */
  hint?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  inputId: string;
  step?: string;
  min?: number;
  max?: number;
  inputMode?: "decimal" | "numeric";
  /** kept for compatibility: the unit now always sits after the input */
  literalUnit?: boolean;
  style?: CSSProperties;
}) {
  const store = useContext(ExampleContext);
  const example = exampleOf(placeholder);

  useEffect(() => {
    store?.upsert(inputId, { value, example, set: onChange });
  }, [store, inputId, value, example, onChange]);
  useEffect(() => () => store?.remove(inputId), [store, inputId]);

  return (
    <label htmlFor={inputId} className={s.field} style={style}>
      <span className={s.fieldLabel}>
        <span>{label}</span>
        {hint ? (
          <span aria-hidden className={s.fieldHint}>
            {hint}
          </span>
        ) : null}
      </span>
      <span className={s.fieldRow}>
        <input
          id={inputId}
          type="number"
          inputMode={inputMode}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            store?.disarm();
            onChange(e.target.value);
          }}
          className={s.input}
        />
        {unit !== undefined ? <span className={s.fieldUnit}>{unit}</span> : null}
      </span>
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

/* ─── Result ─────────────────────────────────────────────────────────────── */

export function CalcOutput({ children }: { children: ReactNode }) {
  return <div className={s.output}>{children}</div>;
}

export function ResultPanel({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <div aria-live="polite" className={s.result} data-active={active ? "true" : "false"}>
      {children}
      {active ? <ExampleTag /> : null}
    </div>
  );
}

const noSubscribe = () => () => {};
const noSnapshot = () => 0;

/** "Example data", while the result comes from the example values. */
function ExampleTag() {
  const store = useContext(ExampleContext);
  useSyncExternalStore(
    store?.subscribe ?? noSubscribe,
    store?.getSnapshot ?? noSnapshot,
    store?.getServerSnapshot ?? noSnapshot,
  );
  if (!store || !store.isExample()) return null;
  return (
    <p className={s.exampleTag}>
      <span aria-hidden className={s.exampleDot} />
      Example data
    </p>
  );
}

/** Wraps a live result so it settles in once, when it first appears. */
export function ResultBody({ children }: { children: ReactNode }) {
  return <div className={s.resultBody}>{children}</div>;
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className={s.emptyWrap}>
      <p aria-hidden className={s.emptyNum}>
        ––.–
      </p>
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
 * The range bar: every zone of the scale side by side (in range in blue,
 * borderline in peach, outside in apricot), with an ink mark at the value.
 * Decorative: the value and its band are always spelled out in text next to
 * it. `marks` adds numbers under the bar where a calculator wants them.
 */
export function RangeBar({
  min,
  max,
  value,
  zones,
  tone,
  marks,
}: {
  min: number;
  max: number;
  value: number;
  zones: Zone[];
  tone: Tone;
  marks?: { at: number; label: string }[];
}) {
  const pct = (x: number) => Math.min(Math.max((x - min) / (max - min), 0), 1) * 100;
  let okIndex = 0;
  return (
    <div aria-hidden className={s.range} data-tone={tone}>
      <div className={s.rangeTrack}>
        <div className={s.rangeZones}>
          {zones.map((z) => {
            const alt = z.tone === "ok" ? okIndex++ % 2 === 1 : false;
            return (
              <span
                key={`${z.from}-${z.to}`}
                className={s.rangeZone}
                data-tone={z.tone}
                data-alt={alt ? "true" : undefined}
                style={{ left: `${pct(z.from)}%`, width: `${pct(z.to) - pct(z.from)}%` }}
              />
            );
          })}
        </div>
        <span className={s.rangeMark} style={{ left: `${pct(value)}%` }} />
      </div>
      {marks ? (
        <div className={s.rangeMarks}>
          {marks.map((m) => {
            const p = pct(m.at);
            const edge = p <= 0 ? "start" : p >= 100 ? "end" : undefined;
            return (
              <span key={m.at} data-edge={edge} style={edge ? undefined : { left: `${p}%` }}>
                {m.label}
              </span>
            );
          })}
        </div>
      ) : null}
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
