"use client";

import { useState, useMemo } from "react";

/**
 * Two-way A1C ↔ estimated average glucose (eAG) converter.
 *
 * Formula (ADAG study): eAG (mg/dL) = 28.7 × A1C − 46.7.
 * Inverse:              A1C (%)     = (eAG mg/dL + 46.7) ÷ 28.7.
 * mmol/L = mg/dL ÷ 18.
 *
 * Embedded in `/blog/a1c-to-blood-sugar-chart` and `/tools/a1c-calculator`.
 * The reverse direction exists because roughly half of the SERP demand types a
 * glucose value, not an A1C ("blood glucose to a1c chart", "glucose to a1c
 * conversion chart", "is 230 a1c") — GSC 2026-08, ~50 impressions/wk at pos 46-85
 * that the one-way version could not answer.
 */

type Mode = "a1c" | "glucose";
type GlucoseUnit = "mgdl" | "mmol";

export default function A1CConverter() {
  const [mode, setMode] = useState<Mode>("a1c");
  const [a1c, setA1c] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [unit, setUnit] = useState<GlucoseUnit>("mgdl");

  const result = useMemo(() => {
    if (mode === "a1c") {
      const v = parseFloat(a1c);
      if (!Number.isFinite(v) || v <= 0 || v > 20) return null;
      const mgdl = 28.7 * v - 46.7;
      return {
        kind: "glucose" as const,
        mgdl: Math.round(mgdl),
        mmol: Math.round((mgdl / 18) * 10) / 10,
        band: getBand(v),
      };
    }
    const raw = parseFloat(glucose);
    if (!Number.isFinite(raw) || raw <= 0) return null;
    const mgdl = unit === "mmol" ? raw * 18 : raw;
    if (mgdl < 20 || mgdl > 600) return null;
    const value = (mgdl + 46.7) / 28.7;
    return {
      kind: "a1c" as const,
      a1c: Math.round(value * 10) / 10,
      mgdl: Math.round(mgdl),
      mmol: Math.round((mgdl / 18) * 10) / 10,
      band: getBand(value),
    };
  }, [mode, a1c, glucose, unit]);

  return (
    <section
      aria-labelledby="a1c-converter-title"
      style={{
        background: "var(--color-canvas-alt, #ffffff)",
        border: "1px solid var(--color-grid)",
        borderRadius: "16px",
        padding: "1.75rem 1.5rem",
        margin: "2rem 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10.5px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-green-deep)",
          fontWeight: 500,
          marginBottom: "0.5rem",
        }}
      >
        Free interactive tool
      </div>

      <h2
        id="a1c-converter-title"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.75rem",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          marginBottom: "1.25rem",
          fontWeight: 400,
        }}
      >
        A1C ↔ Blood Glucose Converter
      </h2>

      <div
        role="group"
        aria-label="Conversion direction"
        style={{
          display: "inline-flex",
          padding: "3px",
          borderRadius: "10px",
          background: "color-mix(in srgb, var(--color-grid) 32%, var(--color-canvas))",
          marginBottom: "1.25rem",
        }}
      >
        <ModeButton
          active={mode === "a1c"}
          onClick={() => setMode("a1c")}
          label="A1C → glucose"
        />
        <ModeButton
          active={mode === "glucose"}
          onClick={() => setMode("glucose")}
          label="Glucose → A1C"
        />
      </div>

      {mode === "a1c" ? (
        <div style={{ maxWidth: "260px", marginBottom: "1.25rem" }}>
          <label htmlFor="a1c-converter-input" style={{ display: "block" }}>
            <FieldLabel>
              Hemoglobin A1C <span style={{ color: "var(--color-ink-tertiary)" }}>(%)</span>
            </FieldLabel>
            <input
              id="a1c-converter-input"
              type="number"
              inputMode="decimal"
              min={0}
              max={20}
              step="0.1"
              placeholder="e.g. 5.7"
              value={a1c}
              onChange={(e) => setA1c(e.target.value)}
              style={inputStyle}
            />
          </label>
        </div>
      ) : (
        <div style={{ maxWidth: "340px", marginBottom: "1.25rem" }}>
          <label htmlFor="glucose-converter-input" style={{ display: "block" }}>
            <FieldLabel>Average blood glucose</FieldLabel>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                id="glucose-converter-input"
                type="number"
                inputMode="decimal"
                min={0}
                step={unit === "mmol" ? "0.1" : "1"}
                placeholder={unit === "mmol" ? "e.g. 7.8" : "e.g. 154"}
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
              <select
                aria-label="Glucose unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as GlucoseUnit)}
                style={{
                  ...inputStyle,
                  width: "auto",
                  paddingRight: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <option value="mgdl">mg/dL</option>
                <option value="mmol">mmol/L</option>
              </select>
            </div>
          </label>
        </div>
      )}

      <div
        aria-live="polite"
        style={{
          padding: "1.25rem",
          borderRadius: "10px",
          background: result
            ? result.band.bg
            : "color-mix(in srgb, var(--color-grid) 30%, var(--color-canvas))",
          border: result ? `1px solid ${result.band.border}` : "1px solid transparent",
          transition: "background 220ms ease, border-color 220ms ease",
        }}
      >
        {result ? (
          <>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: result.band.label,
                fontWeight: 600,
                marginBottom: "0.4rem",
              }}
            >
              {result.kind === "glucose"
                ? `Estimated average glucose — ${result.band.name}`
                : `Estimated A1C — ${result.band.name}`}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              {result.kind === "glucose" ? (
                <>
                  <BigNumber value={result.mgdl} unit="mg/dL" />
                  <BigNumber value={result.mmol} unit="mmol/L" secondary />
                </>
              ) : (
                <>
                  <BigNumber value={result.a1c} unit="%" />
                  <BigNumber value={result.mmol} unit="mmol/L" secondary />
                </>
              )}
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                lineHeight: 1.5,
                marginTop: "0.75rem",
                color: "var(--color-ink-secondary)",
              }}
            >
              {result.band.description}
            </p>
          </>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              lineHeight: 1.5,
              color: "var(--color-ink-tertiary)",
              margin: 0,
            }}
          >
            {mode === "a1c"
              ? "Enter your HbA1c percentage to see your estimated average glucose (eAG) in both mg/dL and mmol/L."
              : "Enter an average glucose value to see the A1C it corresponds to. Works with a meter average or a CGM mean glucose."}
          </p>
        )}
      </div>

      <div
        style={{
          marginTop: "1.25rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
        }}
      >
        <ReferenceRow label="Normal" range="< 5.7%" tone="ok" />
        <ReferenceRow label="Prediabetes" range="5.7–6.4%" tone="warn" />
        <ReferenceRow label="Diabetes" range="≥ 6.5%" tone="bad" />
        <ReferenceRow label="Rule of thumb" range="+1% ≈ +29 mg/dL" tone="neutral" />
      </div>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8125rem",
          color: "var(--color-ink-tertiary)",
          marginTop: "1rem",
          lineHeight: 1.5,
        }}
      >
        Educational estimate. eAG is a 2–3 month average and can diverge from a
        single meter reading, especially with anemia, kidney disease, or certain
        hemoglobin variants. A single spot glucose reading is not an average —
        converting one high post-meal value will overstate your A1C. Interpret
        results with a clinician.
      </p>

      <div style={{ marginTop: "1.25rem" }}>
        <a
          href="/early-access"
          style={{
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
          }}
        >
          Track this in Merios →
        </a>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 0.85rem",
  fontFamily: "var(--font-mono)",
  fontSize: "1rem",
  color: "var(--color-ink)",
  background: "var(--color-canvas)",
  border: "1px solid var(--color-grid)",
  borderRadius: "8px",
  outline: "none",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </span>
  );
}

function ModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13.5px",
        fontWeight: active ? 500 : 400,
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: active ? "var(--color-canvas-alt, #ffffff)" : "transparent",
        color: active ? "var(--color-ink)" : "var(--color-ink-secondary)",
        boxShadow: active ? "0 1px 2px rgba(14, 20, 18, 0.08)" : "none",
        transition: "background 160ms ease, color 160ms ease",
      }}
    >
      {label}
    </button>
  );
}

function BigNumber({
  value,
  unit,
  secondary,
}: {
  value: number;
  unit: string;
  secondary?: boolean;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: secondary ? "1.75rem" : "2.75rem",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        color: secondary ? "var(--color-ink-secondary)" : "var(--color-ink)",
      }}
    >
      {value}
      <span
        style={{
          fontSize: secondary ? "0.95rem" : "1.1rem",
          marginLeft: secondary ? "0.3rem" : "0.35rem",
        }}
      >
        {unit}
      </span>
    </div>
  );
}

function ReferenceRow({
  label,
  range,
  tone,
}: {
  label: string;
  range: string;
  tone: "ok" | "warn" | "bad" | "neutral";
}) {
  const dot =
    tone === "ok"
      ? "var(--color-pulse)"
      : tone === "warn"
        ? "var(--color-warm, #C4882F)"
        : tone === "bad"
          ? "#D24343"
          : "var(--color-ink-tertiary)";
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
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: dot,
          flexShrink: 0,
          alignSelf: "center",
        }}
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

function getBand(a1c: number) {
  if (a1c < 5.7) {
    return {
      name: "Normal",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 10%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 26%, transparent)",
      description:
        "This falls in the normal range (below 5.7%). Keep an eye on the trend — the top of normal (5.5–5.6%) is where early metabolic drift shows up first.",
    };
  }
  if (a1c < 6.5) {
    return {
      name: "Prediabetes",
      label: "#8E5F1A",
      bg: "color-mix(in srgb, var(--color-warm, #C4882F) 15%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-warm, #C4882F) 30%, transparent)",
      description:
        "This falls in the prediabetes range (5.7–6.4%). It is highly reversible: the Diabetes Prevention Program showed 58% of people avoided progression with lifestyle change alone.",
    };
  }
  return {
    name: "Diabetes range",
    label: "#A12C2C",
    bg: "color-mix(in srgb, #D24343 13%, var(--color-canvas))",
    border: "color-mix(in srgb, #D24343 30%, transparent)",
    description:
      "An A1C of 6.5% or higher is the diagnostic threshold for type 2 diabetes, but a diagnosis needs confirmation on a second test. Discuss next steps with your physician.",
  };
}
