"use client";

/**
 * Shared UI primitives for the calculator components.
 *
 * The first five calculators each inlined their own copies of these. Rather
 * than paste a sixth, seventh and eighth copy, the common pieces live here.
 * Visual output is identical to the inlined versions — this is a de-duplication,
 * not a redesign.
 */

import type { CSSProperties, ReactNode } from "react";

export const eyebrowStyle: CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.2em",
  textTransform: "uppercase", color: "var(--color-green-deep)", fontWeight: 500, marginBottom: "0.5rem",
};
export const titleStyle: CSSProperties = {
  fontFamily: "var(--font-serif)", fontSize: "1.75rem", lineHeight: 1.15, letterSpacing: "-0.02em",
  color: "var(--color-ink)", marginBottom: "1.25rem", fontWeight: 400,
};
export const resultLabelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.18em",
  textTransform: "uppercase", fontWeight: 600, marginBottom: "0.4rem",
};
export const bigNumberStyle: CSSProperties = {
  fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: 1,
  letterSpacing: "-0.03em", color: "var(--color-ink)",
};
export const resultTextStyle: CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.5,
  marginTop: "0.75rem", color: "var(--color-ink-secondary)",
};
export const emptyStyle: CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.5,
  color: "var(--color-ink-tertiary)", margin: 0,
};
export const footnoteStyle: CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--color-ink-tertiary)",
  marginTop: "1rem", lineHeight: 1.5,
};
export const ctaStyle: CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "12.5px", letterSpacing: "0.16em",
  textTransform: "uppercase", background: "var(--color-green-deep)", color: "var(--color-canvas)",
  padding: "12px 18px", borderRadius: "8px", textDecoration: "none", display: "inline-block",
};

export function Shell({ labelledBy, children }: { labelledBy: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={labelledBy}
      style={{
        background: "var(--color-canvas-alt, #ffffff)",
        border: "1px solid var(--color-grid)",
        borderRadius: "16px",
        padding: "1.75rem 1.5rem",
        margin: "2rem 0",
      }}
    >
      {children}
    </section>
  );
}

export function ResultPanel({
  active, bg, border, children,
}: { active: boolean; bg?: string; border?: string; children: ReactNode }) {
  return (
    <div
      aria-live="polite"
      style={{
        padding: "1.25rem",
        borderRadius: "10px",
        background: active && bg ? bg : "color-mix(in srgb, var(--color-grid) 30%, var(--color-canvas))",
        border: active && border ? `1px solid ${border}` : "1px solid transparent",
        transition: "background 220ms ease, border-color 220ms ease",
      }}
    >
      {children}
    </div>
  );
}

export function Field({
  label, unit, placeholder, value, onChange, inputId, step = "0.1",
}: {
  label: string; unit: string; placeholder: string; value: string;
  onChange: (v: string) => void; inputId: string; step?: string;
}) {
  return (
    <label htmlFor={inputId} style={{ display: "block" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.18em",
          textTransform: "uppercase", color: "var(--color-ink-tertiary)", fontWeight: 500,
          display: "block", marginBottom: "0.4rem",
        }}
      >
        {label} <span style={{ color: "var(--color-ink-tertiary)" }}>({unit})</span>
      </span>
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", padding: "0.75rem 0.85rem", fontFamily: "var(--font-mono)",
          fontSize: "1rem", color: "var(--color-ink)", background: "var(--color-canvas)",
          border: "1px solid var(--color-grid)", borderRadius: "8px", outline: "none",
        }}
      />
    </label>
  );
}

export function RefRow({ label, range, tone }: { label: string; range: string; tone: "ok" | "warn" | "bad" }) {
  const dot = tone === "ok" ? "var(--color-pulse)" : tone === "warn" ? "var(--color-warm, #C4882F)" : "#D24343";
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem" }}>
      <span aria-hidden style={{ width: "8px", height: "8px", borderRadius: "50%", background: dot, flexShrink: 0, alignSelf: "center" }} />
      <span style={{ color: "var(--color-ink)" }}>{label}</span>
      <span style={{ color: "var(--color-ink-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", marginLeft: "auto" }}>
        {range}
      </span>
    </div>
  );
}

export function Toggle({
  legend, options, value, onChange,
}: {
  legend: string; options: { key: string; label: string }[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend
        style={{
          fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em",
          textTransform: "uppercase", color: "var(--color-ink-tertiary)", marginBottom: "0.4rem", padding: 0,
        }}
      >
        {legend}
      </legend>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {options.map((o) => {
          const active = o.key === value;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.key)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "6px 11px", borderRadius: "7px", cursor: "pointer",
                border: `1px solid ${active ? "var(--color-green-deep)" : "var(--color-grid)"}`,
                background: active ? "var(--color-green-deep)" : "transparent",
                color: active ? "var(--color-canvas)" : "var(--color-ink-secondary)",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Cta() {
  return (
    <div style={{ marginTop: "1.25rem" }}>
      <a href="/early-access" style={ctaStyle}>Track this in Merios →</a>
    </div>
  );
}

export function round(v: number, d: number) {
  const f = Math.pow(10, d);
  return Math.round(v * f) / f;
}
