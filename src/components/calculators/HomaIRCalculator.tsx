"use client";

import { useState, useMemo } from "react";

/**
 * HOMA-IR (Homeostatic Model Assessment for Insulin Resistance) calculator.
 *
 * Formula (US units):
 *   HOMA-IR = (fasting insulin [µIU/mL] × fasting glucose [mg/dL]) / 405
 *
 * Embedded in `/blog/homa-ir-calculator` to convert "homa ir calculator" SERP
 * intent (currently pos 68 with growing impressions) into a sticky page that:
 *   - increases dwell time (positive ranking signal)
 *   - earns natural backlinks (free interactive calculators are link magnets)
 *   - drives /early-access conversions via a contextual CTA on the result
 */
export default function HomaIRCalculator() {
  const [glucose, setGlucose] = useState<string>("");
  const [insulin, setInsulin] = useState<string>("");

  const result = useMemo(() => {
    const g = parseFloat(glucose);
    const i = parseFloat(insulin);
    if (!Number.isFinite(g) || !Number.isFinite(i) || g <= 0 || i <= 0) {
      return null;
    }
    const score = (g * i) / 405;
    return {
      score: Math.round(score * 100) / 100,
      band: getBand(score),
    };
  }, [glucose, insulin]);

  return (
    <section
      aria-labelledby="homa-ir-calculator-title"
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
        id="homa-ir-calculator-title"
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
        HOMA-IR Calculator
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
          label="Fasting glucose"
          unit="mg/dL"
          placeholder="e.g. 90"
          value={glucose}
          onChange={setGlucose}
          inputId="homa-ir-glucose"
        />
        <Field
          label="Fasting insulin"
          unit="µIU/mL"
          placeholder="e.g. 5"
          value={insulin}
          onChange={setInsulin}
          inputId="homa-ir-insulin"
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
              Your HOMA-IR — {result.band.name}
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
              {result.score}
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
            Enter your fasting glucose and fasting insulin from your most recent
            blood panel to see your HOMA-IR.
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
        <ReferenceRow label="Normal" range="1.0–1.9" tone="ok" />
        <ReferenceRow label="Borderline" range="2.0–2.5" tone="warn" />
        <ReferenceRow label="Insulin resistant" range="> 2.5" tone="bad" />
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
        Educational tool, not a medical diagnosis. HOMA-IR uses fasting values —
        if your insulin or glucose were drawn non-fasted, results will be
        inflated. Discuss with your physician before adjusting medication.
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
    <label
      htmlFor={inputId}
      style={{
        display: "block",
      }}
    >
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

function getBand(score: number) {
  if (score < 1.0) {
    return {
      name: "Optimal insulin sensitivity",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 12%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 30%, transparent)",
      description:
        "Excellent insulin sensitivity. Your cells respond efficiently to insulin — keep what you're doing.",
    };
  }
  if (score < 2.0) {
    return {
      name: "Normal range",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 8%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 22%, transparent)",
      description:
        "Within normal range. Many longevity-focused clinicians target < 1.0 — small lifestyle changes (resistance training, less refined carbs) can move you closer to optimal.",
    };
  }
  if (score < 2.5) {
    return {
      name: "Borderline insulin resistance",
      label: "#8E5F1A",
      bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
      description:
        "Yellow flag. You're not insulin resistant yet, but you're trending. A 12-week intervention (sleep, strength training, lower refined carbs) usually moves this back below 1.5. Recheck in 90 days.",
    };
  }
  return {
    name: "Insulin resistance",
    label: "#A12C2C",
    bg: "color-mix(in srgb, #D24343 14%, var(--color-canvas))",
    border: "color-mix(in srgb, #D24343 32%, transparent)",
    description:
      "Significant insulin resistance — a major driver of metabolic syndrome and type 2 diabetes risk. Discuss with your physician. Lifestyle changes (resistance training, lower refined carbs, fiber, sleep) can meaningfully improve this within 12–24 weeks.",
  };
}
