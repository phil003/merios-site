"use client";

import { useState, useMemo } from "react";

/**
 * Zone 2 heart-rate calculator.
 *
 * Estimates the zone 2 band from age. Uses the tanaka max-HR estimate
 * (208 − 0.7 × age), which is more accurate across ages than 220 − age,
 * and takes 60–70% of it as the zone 2 range.
 *
 * Embedded in `/blog/zone-2-cardio-heart-rate` to target "zone 2 heart rate"
 * SERP intent (striking-distance, high impressions / low CTR in GSC).
 */
export default function Zone2Calculator() {
  const [age, setAge] = useState<string>("");

  const result = useMemo(() => {
    const a = parseFloat(age);
    if (!Number.isFinite(a) || a < 10 || a > 100) return null;
    const maxHr = Math.round(208 - 0.7 * a);
    return {
      maxHr,
      low: Math.round(maxHr * 0.6),
      high: Math.round(maxHr * 0.7),
    };
  }, [age]);

  return (
    <section
      aria-labelledby="zone2-calculator-title"
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
        id="zone2-calculator-title"
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
        Zone 2 Heart Rate Calculator
      </h2>

      <div style={{ maxWidth: "220px", marginBottom: "1.25rem" }}>
        <label htmlFor="zone2-age-input" style={{ display: "block" }}>
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
            Your age <span style={{ color: "var(--color-ink-tertiary)" }}>(years)</span>
          </span>
          <input
            id="zone2-age-input"
            type="number"
            inputMode="numeric"
            min={10}
            max={100}
            step="1"
            placeholder="e.g. 40"
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
      </div>

      <div
        aria-live="polite"
        style={{
          padding: "1.25rem",
          borderRadius: "10px",
          background: result
            ? "color-mix(in srgb, var(--color-pulse) 10%, var(--color-canvas))"
            : "color-mix(in srgb, var(--color-grid) 30%, var(--color-canvas))",
          border: result
            ? "1px solid color-mix(in srgb, var(--color-pulse) 26%, transparent)"
            : "1px solid transparent",
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
                color: "var(--color-green-deep)",
                fontWeight: 600,
                marginBottom: "0.4rem",
              }}
            >
              Your estimated zone 2 range
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
              {result.low}–{result.high}
              <span style={{ fontSize: "1.1rem", marginLeft: "0.4rem" }}>bpm</span>
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
              Based on an estimated max heart rate of ~{result.maxHr} bpm (208 −
              0.7 × age), zone 2 is 60–70% of max. Cross-check with the talk
              test: zone 2 is the hardest effort at which you can still speak in
              full sentences.
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
            Enter your age to estimate your zone 2 heart-rate band in beats per
            minute.
          </p>
        )}
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
        Age-based formulas carry ±10–15 bpm of individual variation. For a
        precise zone, use a lactate test (1.5–2.0 mmol/L) or a lab VO2 max
        assessment.
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
