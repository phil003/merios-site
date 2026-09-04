"use client";

import { useState, useMemo } from "react";

/**
 * TyG (Triglyceride–Glucose) index calculator.
 *
 * Formula: TyG = ln[ (triglycerides mg/dL × fasting glucose mg/dL) / 2 ]
 *
 * The division by 2 happens INSIDE the logarithm. This is the single most
 * common implementation error in the wild — there is a published correction
 * literature about it (Eur J Pediatr 2020) — so the parenthesisation here is
 * deliberate and must not be "simplified".
 *
 * Why this tool exists: HOMA-IR needs fasting insulin, which most people do
 * not have on a standard panel. TyG needs two values that appear on virtually
 * every routine lipid + metabolic panel.
 */
export default function TyGIndexCalculator() {
  const [trig, setTrig] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [unit, setUnit] = useState<"mgdl" | "mmoll">("mgdl");

  const result = useMemo(() => {
    let t = parseFloat(trig);
    let g = parseFloat(glucose);
    if (!Number.isFinite(t) || !Number.isFinite(g) || t <= 0 || g <= 0) return null;
    if (unit === "mmoll") {
      // Convert to mg/dL first — the /2 constant is unit-dependent.
      t = t * 88.57;
      g = g * 18.02;
    }
    const tyg = Math.log((t * g) / 2);
    return { tyg: Math.round(tyg * 100) / 100, band: getBand(tyg), tMg: Math.round(t), gMg: Math.round(g) };
  }, [trig, glucose, unit]);

  return (
    <section
      aria-labelledby="tyg-calculator-title"
      style={{
        background: "var(--color-canvas-alt, #ffffff)",
        border: "1px solid var(--color-grid)",
        borderRadius: "16px",
        padding: "1.75rem 1.5rem",
        margin: "2rem 0",
      }}
    >
      <div style={eyebrowStyle}>Free interactive tool</div>

      <h2 id="tyg-calculator-title" style={titleStyle}>
        TyG Index Calculator
      </h2>

      <div role="group" aria-label="Units" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.1rem" }}>
        <UnitButton active={unit === "mgdl"} onClick={() => setUnit("mgdl")} label="mg/dL (US)" />
        <UnitButton active={unit === "mmoll"} onClick={() => setUnit("mmoll")} label="mmol/L" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        <Field
          label="Triglycerides"
          unit={unit === "mgdl" ? "mg/dL" : "mmol/L"}
          placeholder={unit === "mgdl" ? "e.g. 110" : "e.g. 1.2"}
          value={trig}
          onChange={setTrig}
          inputId="tyg-trig"
        />
        <Field
          label="Fasting glucose"
          unit={unit === "mgdl" ? "mg/dL" : "mmol/L"}
          placeholder={unit === "mgdl" ? "e.g. 92" : "e.g. 5.1"}
          value={glucose}
          onChange={setGlucose}
          inputId="tyg-glucose"
        />
      </div>

      <div
        aria-live="polite"
        style={{
          padding: "1.25rem",
          borderRadius: "10px",
          background: result ? result.band.bg : "color-mix(in srgb, var(--color-grid) 30%, var(--color-canvas))",
          border: result ? `1px solid ${result.band.border}` : "1px solid transparent",
          transition: "background 220ms ease, border-color 220ms ease",
        }}
      >
        {result ? (
          <>
            <div style={{ ...resultLabelStyle, color: result.band.label }}>
              Your TyG index — {result.band.name}
            </div>
            <div style={bigNumberStyle}>{result.tyg}</div>
            <p style={resultTextStyle}>{result.band.description}</p>
            {unit === "mmoll" && (
              <p style={{ ...resultTextStyle, fontSize: "0.8125rem", marginTop: "0.5rem" }}>
                Converted to {result.tMg} mg/dL triglycerides and {result.gMg} mg/dL glucose before computing —
                the formula&rsquo;s constant is defined in US units.
              </p>
            )}
          </>
        ) : (
          <p style={emptyStyle}>
            Enter triglycerides and fasting glucose from the same fasting blood draw. Both appear on a
            standard lipid and metabolic panel, so you almost certainly already have them.
          </p>
        )}
      </div>

      <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <ReferenceRow label="Low" range="under 8.0" tone="ok" />
        <ReferenceRow label="Average" range="8.0–8.5" tone="ok" />
        <ReferenceRow label="Elevated" range="8.5–9.0" tone="warn" />
        <ReferenceRow label="High" range="above 9.0" tone="bad" />
      </div>

      <p style={footnoteStyle}>
        Educational tool, not a diagnosis. TyG cutoffs are population-derived and vary between studies and
        ethnic groups — there is no single agreed threshold. Read your number as a position on a gradient and
        as a trend over time, not as a pass/fail line. Both inputs must come from the same fasting draw.
      </p>

      <div style={{ marginTop: "1.25rem" }}>
        <a href="/early-access" style={ctaStyle}>
          Track this in Merios →
        </a>
      </div>
    </section>
  );
}

/* ── shared bits ─────────────────────────────────────────────────────────── */

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10.5px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--color-green-deep)",
  fontWeight: 500,
  marginBottom: "0.5rem",
};
const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.75rem",
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  color: "var(--color-ink)",
  marginBottom: "1.25rem",
  fontWeight: 400,
};
const resultLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10.5px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 600,
  marginBottom: "0.4rem",
};
const bigNumberStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "2.75rem",
  lineHeight: 1,
  letterSpacing: "-0.03em",
  color: "var(--color-ink)",
};
const resultTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.9375rem",
  lineHeight: 1.5,
  marginTop: "0.75rem",
  color: "var(--color-ink-secondary)",
};
const emptyStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.9375rem",
  lineHeight: 1.5,
  color: "var(--color-ink-tertiary)",
  margin: 0,
};
const footnoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.8125rem",
  color: "var(--color-ink-tertiary)",
  marginTop: "1rem",
  lineHeight: 1.5,
};
const ctaStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12.5px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  background: "var(--color-green-deep)",
  color: "var(--color-canvas)",
  padding: "12px 18px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
};

function UnitButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "7px 12px",
        borderRadius: "7px",
        cursor: "pointer",
        border: `1px solid ${active ? "var(--color-green-deep)" : "var(--color-grid)"}`,
        background: active ? "var(--color-green-deep)" : "transparent",
        color: active ? "var(--color-canvas)" : "var(--color-ink-secondary)",
      }}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  unit,
  placeholder,
  value,
  onChange,
  inputId,
}: {
  label: string;
  unit: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  inputId: string;
}) {
  return (
    <label htmlFor={inputId} style={{ display: "block" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10.5px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
          fontWeight: 500,
          display: "block",
          marginBottom: "0.4rem",
        }}
      >
        {label} <span style={{ color: "var(--color-ink-tertiary)" }}>({unit})</span>
      </span>
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        min={0}
        step="0.1"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem 0.85rem",
          fontFamily: "var(--font-mono)",
          fontSize: "1rem",
          color: "var(--color-ink)",
          background: "var(--color-canvas)",
          border: "1px solid var(--color-grid)",
          borderRadius: "8px",
          outline: "none",
        }}
      />
    </label>
  );
}

function ReferenceRow({ label, range, tone }: { label: string; range: string; tone: "ok" | "warn" | "bad" }) {
  const dot = tone === "ok" ? "var(--color-pulse)" : tone === "warn" ? "var(--color-warm, #C4882F)" : "#D24343";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.5rem",
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
      }}
    >
      <span
        aria-hidden
        style={{ width: "8px", height: "8px", borderRadius: "50%", background: dot, flexShrink: 0, alignSelf: "center" }}
      />
      <span style={{ color: "var(--color-ink)" }}>{label}</span>
      <span
        style={{
          color: "var(--color-ink-tertiary)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8125rem",
          marginLeft: "auto",
        }}
      >
        {range}
      </span>
    </div>
  );
}

function getBand(tyg: number) {
  if (tyg < 8.0) {
    return {
      name: "Low",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 12%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 30%, transparent)",
      description:
        "Below the range where insulin resistance is typically flagged. Both inputs are in good territory, which usually tracks with preserved insulin sensitivity.",
    };
  }
  if (tyg < 8.5) {
    return {
      name: "Average",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 8%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 22%, transparent)",
      description:
        "Typical for a general adult population. Not a red flag on its own — but many studies place metabolic-syndrome cutoffs near 8.5, so this is the band where the trend matters more than the single value.",
    };
  }
  if (tyg < 9.0) {
    return {
      name: "Elevated",
      label: "#8E5F1A",
      bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
      description:
        "Above the threshold most commonly cited for metabolic syndrome. Worth confirming with fasting insulin and HOMA-IR, and worth repeating after 12 weeks of change rather than acting on one reading.",
    };
  }
  return {
    name: "High",
    label: "#A12C2C",
    bg: "color-mix(in srgb, #D24343 14%, var(--color-canvas))",
    border: "color-mix(in srgb, #D24343 32%, transparent)",
    description:
      "Well above common cutoffs, driven by elevated triglycerides, elevated fasting glucose, or both. This warrants a conversation with your physician and a fuller metabolic workup rather than self-management.",
  };
}
