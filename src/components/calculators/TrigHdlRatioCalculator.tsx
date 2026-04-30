"use client";

import { useState, useMemo } from "react";

/**
 * Triglyceride / HDL ratio calculator.
 *
 * Formula: ratio = triglycerides / HDL (both in mg/dL).
 * One of the strongest single-number predictors of insulin resistance and
 * cardiovascular risk — often more revealing than total cholesterol or LDL alone.
 *
 * Embedded in `/blog/triglyceride-hdl-ratio-calculator` to capture growing
 * "triglyceride hdl ratio calculator" SERP intent (currently mid-rank,
 * impressions building).
 */
export default function TrigHdlRatioCalculator() {
  const [trig, setTrig] = useState<string>("");
  const [hdl, setHdl] = useState<string>("");

  const result = useMemo(() => {
    const t = parseFloat(trig);
    const h = parseFloat(hdl);
    if (!Number.isFinite(t) || !Number.isFinite(h) || t <= 0 || h <= 0) {
      return null;
    }
    const ratio = t / h;
    return {
      ratio: Math.round(ratio * 100) / 100,
      band: getBand(ratio),
    };
  }, [trig, hdl]);

  return (
    <section
      aria-labelledby="trig-hdl-calculator-title"
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
        id="trig-hdl-calculator-title"
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
        Triglyceride / HDL Ratio Calculator
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <Field
          label="Triglycerides"
          unit="mg/dL"
          placeholder="e.g. 90"
          value={trig}
          onChange={setTrig}
          inputId="trig-hdl-trig"
        />
        <Field
          label="HDL cholesterol"
          unit="mg/dL"
          placeholder="e.g. 55"
          value={hdl}
          onChange={setHdl}
          inputId="trig-hdl-hdl"
        />
      </div>

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
              Your TG/HDL ratio — {result.band.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.75rem",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--color-ink)",
              }}
            >
              {result.ratio}
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
            Enter your triglycerides and HDL from your most recent lipid panel
            to see your TG/HDL ratio (US units, mg/dL).
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
        <ReferenceRow label="Optimal" range="< 1.0" tone="ok" />
        <ReferenceRow label="Good" range="1.0–2.0" tone="ok" />
        <ReferenceRow label="Borderline" range="2.0–3.0" tone="warn" />
        <ReferenceRow label="Insulin resistant" range="> 3.0" tone="bad" />
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
        Educational tool. Both values must come from a fasting lipid panel. If
        you're outside the US (mmol/L), multiply triglycerides by 88.57 and HDL
        by 38.67 to convert to mg/dL before entering.
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

function ReferenceRow({
  label,
  range,
  tone,
}: {
  label: string;
  range: string;
  tone: "ok" | "warn" | "bad";
}) {
  const dot =
    tone === "ok"
      ? "var(--color-pulse)"
      : tone === "warn"
        ? "var(--color-warm, #C4882F)"
        : "#D24343";
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

function getBand(ratio: number) {
  if (ratio < 1.0) {
    return {
      name: "Excellent",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 12%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 30%, transparent)",
      description:
        "Optimal metabolic health. Strong insulin sensitivity, low cardiovascular risk profile from this marker.",
    };
  }
  if (ratio < 2.0) {
    return {
      name: "Good",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 8%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 22%, transparent)",
      description:
        "Healthy range. Many longevity-focused clinicians target < 1.0 — small wins in fiber, omega-3, and zone-2 cardio can move you closer to optimal.",
    };
  }
  if (ratio < 3.0) {
    return {
      name: "Borderline insulin resistance",
      label: "#8E5F1A",
      bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
      description:
        "Yellow flag. You're trending toward insulin resistance. A 12-week intervention (lower refined carbs, more fiber, omega-3, zone-2 cardio) typically pulls this back below 2.0.",
    };
  }
  return {
    name: "Insulin resistance signal",
    label: "#A12C2C",
    bg: "color-mix(in srgb, #D24343 14%, var(--color-canvas))",
    border: "color-mix(in srgb, #D24343 32%, transparent)",
    description:
      "Strong signal of insulin resistance and elevated cardiovascular risk from small dense LDL particles. Discuss with your physician. Lifestyle changes (reduce refined carbs, fiber, omega-3, resistance training) usually move this meaningfully within 12 weeks.",
  };
}
