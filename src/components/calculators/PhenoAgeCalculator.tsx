"use client";

import { useState, useMemo } from "react";

/**
 * PhenoAge biological-age calculator (Levine et al., 2018).
 *
 * Input: 9 blood biomarkers + chronological age (US units, since US lab
 * reports ship in US units by default — we convert internally to SI for the
 * formula).
 *
 * Formula (Levine ME, Aging (Albany NY) 2018):
 *   xb = -19.9067
 *      + 0.0804 * age
 *      + (-0.0336) * albumin (g/L)
 *      + 0.0095 * creatinine (µmol/L)
 *      + 0.1953 * glucose (mmol/L)
 *      + 0.0954 * ln(CRP, mg/L)
 *      + (-0.0120) * lymphocyte%
 *      + 0.0268 * MCV (fL)
 *      + 0.3306 * RDW (%)
 *      + 0.0019 * ALP (U/L)
 *      + 0.0554 * WBC (1000 cells/µL)
 *
 *   M = 1 - exp(-exp(xb) * (exp(0.0076927 * 120) - 1) / 0.0076927)
 *   PhenoAge = 141.50 + ln(-0.00553 * ln(1 - M)) / 0.09165
 *
 * Result is years; subtract chronological age to get pace-of-aging delta.
 *
 * Embedded in /blog/biological-age-calculator-blood-test and
 * /blog/biological-age-complete-guide. Strongest backlink-magnet content
 * we ship: calculators with peer-reviewed formulas earn .edu and clinical
 * citations naturally.
 */
export default function PhenoAgeCalculator() {
  const [age, setAge] = useState<string>("");
  const [albumin, setAlbumin] = useState<string>("");
  const [creatinine, setCreatinine] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [crp, setCrp] = useState<string>("");
  const [lympho, setLympho] = useState<string>("");
  const [mcv, setMcv] = useState<string>("");
  const [rdw, setRdw] = useState<string>("");
  const [alp, setAlp] = useState<string>("");
  const [wbc, setWbc] = useState<string>("");

  const result = useMemo(() => {
    const a = num(age);
    const alb = num(albumin);
    const cr = num(creatinine);
    const glu = num(glucose);
    const cr_p = num(crp);
    const ly = num(lympho);
    const m = num(mcv);
    const rd = num(rdw);
    const al = num(alp);
    const wb = num(wbc);

    if (
      a === null ||
      alb === null ||
      cr === null ||
      glu === null ||
      cr_p === null ||
      ly === null ||
      m === null ||
      rd === null ||
      al === null ||
      wb === null
    ) {
      return null;
    }

    // US → SI conversions
    const albuminSi = alb * 10; // g/dL × 10 = g/L
    const creatinineSi = cr * 88.4; // mg/dL × 88.4 = µmol/L
    const glucoseSi = glu * 0.0555; // mg/dL × 0.0555 = mmol/L
    const crpSi = Math.max(cr_p, 0.01); // mg/L direct (clamp to avoid ln(0))

    const xb =
      -19.9067 +
      0.0804 * a +
      -0.0336 * albuminSi +
      0.0095 * creatinineSi +
      0.1953 * glucoseSi +
      0.0954 * Math.log(crpSi) +
      -0.012 * ly +
      0.0268 * m +
      0.3306 * rd +
      0.0019 * al +
      0.0554 * wb;

    const mortalityScore =
      1 -
      Math.exp(
        (-Math.exp(xb) * (Math.exp(0.0076927 * 120) - 1)) / 0.0076927,
      );

    const safeM = Math.min(Math.max(mortalityScore, 1e-6), 1 - 1e-6);
    const phenoAge =
      141.5 + Math.log(-0.00553 * Math.log(1 - safeM)) / 0.09165;

    const delta = phenoAge - a;

    return {
      phenoAge: Math.round(phenoAge * 10) / 10,
      delta: Math.round(delta * 10) / 10,
      band: getBand(delta),
    };
  }, [age, albumin, creatinine, glucose, crp, lympho, mcv, rdw, alp, wbc]);

  return (
    <section
      aria-labelledby="phenoage-calculator-title"
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
        Free interactive tool — Levine 2018 method
      </div>

      <h2
        id="phenoage-calculator-title"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.75rem",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          marginBottom: "0.5rem",
          fontWeight: 400,
        }}
      >
        PhenoAge Biological Age Calculator
      </h2>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          lineHeight: 1.55,
          color: "var(--color-ink-secondary)",
          marginBottom: "1.5rem",
        }}
      >
        Enter the 9 blood biomarkers from your most recent lab panel (US units)
        plus your chronological age. The formula is the peer-reviewed PhenoAge
        method from Levine et al., <em>Aging</em> (Albany NY), 2018.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <Field label="Chronological age" unit="years" placeholder="e.g. 35" value={age} onChange={setAge} id="phenoage-age" />
        <Field label="Albumin" unit="g/dL" placeholder="e.g. 4.5" value={albumin} onChange={setAlbumin} id="phenoage-alb" />
        <Field label="Creatinine" unit="mg/dL" placeholder="e.g. 0.9" value={creatinine} onChange={setCreatinine} id="phenoage-cr" />
        <Field label="Glucose (fasting)" unit="mg/dL" placeholder="e.g. 90" value={glucose} onChange={setGlucose} id="phenoage-glu" />
        <Field label="hs-CRP" unit="mg/L" placeholder="e.g. 0.8" value={crp} onChange={setCrp} id="phenoage-crp" />
        <Field label="Lymphocytes" unit="%" placeholder="e.g. 30" value={lympho} onChange={setLympho} id="phenoage-ly" />
        <Field label="MCV" unit="fL" placeholder="e.g. 90" value={mcv} onChange={setMcv} id="phenoage-mcv" />
        <Field label="RDW" unit="%" placeholder="e.g. 13" value={rdw} onChange={setRdw} id="phenoage-rdw" />
        <Field label="Alkaline phosphatase" unit="U/L" placeholder="e.g. 70" value={alp} onChange={setAlp} id="phenoage-alp" />
        <Field label="WBC" unit="K/µL" placeholder="e.g. 5.5" value={wbc} onChange={setWbc} id="phenoage-wbc" />
      </div>

      <div
        aria-live="polite"
        style={{
          padding: "1.5rem",
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
              Your PhenoAge — {result.band.name}
            </div>

            <div style={{ display: "flex", gap: "2rem", alignItems: "baseline", flexWrap: "wrap" }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "3rem",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                }}>
                  {result.phenoAge}
                  <span style={{ fontSize: "1rem", color: "var(--color-ink-tertiary)", marginLeft: "0.4rem" }}>yrs</span>
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  marginTop: "0.3rem",
                }}>
                  Biological age
                </div>
              </div>

              <div>
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: result.band.label,
                  fontWeight: 500,
                }}>
                  {result.delta > 0 ? "+" : ""}{result.delta}
                  <span style={{ fontSize: "0.875rem", marginLeft: "0.3rem", color: "var(--color-ink-tertiary)" }}>yrs</span>
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  marginTop: "0.3rem",
                }}>
                  vs chronological
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              lineHeight: 1.55,
              marginTop: "1rem",
              color: "var(--color-ink-secondary)",
            }}>
              {result.band.description}
            </p>
          </>
        ) : (
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            lineHeight: 1.5,
            color: "var(--color-ink-tertiary)",
            margin: 0,
          }}>
            Fill in all 10 fields above to compute your PhenoAge biological age. All values come from a standard
            comprehensive blood panel (CBC + CMP + lipids + hs-CRP).
          </p>
        )}
      </div>

      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.8125rem",
        color: "var(--color-ink-tertiary)",
        marginTop: "1rem",
        lineHeight: 1.5,
      }}>
        Educational tool, not a medical diagnosis. PhenoAge is validated against
        all-cause mortality in NHANES + UK Biobank cohorts. Most actionable
        markers to lower it: hs-CRP, fasting glucose, albumin (protein status),
        lymphocyte% (immune health). Improvement of 0.5–2 years over 6 months
        is realistic with consistent lifestyle change.
      </p>

      <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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
        <a
          href="/blog/biological-age-vs-chronological-age"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12.5px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            border: "1px solid var(--color-green-deep)",
            color: "var(--color-green-deep)",
            padding: "12px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          What does this mean? →
        </a>
      </div>
    </section>
  );
}

function num(s: string): number | null {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function Field({
  label,
  unit,
  placeholder,
  value,
  onChange,
  id,
}: {
  label: string;
  unit: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <label htmlFor={id} style={{ display: "block" }}>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10.5px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--color-ink-tertiary)",
        fontWeight: 500,
        display: "block",
        marginBottom: "0.4rem",
      }}>
        {label} <span style={{ color: "var(--color-ink-tertiary)" }}>({unit})</span>
      </span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step="0.01"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.7rem 0.8rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.9375rem",
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

function getBand(delta: number) {
  if (delta <= -3) {
    return {
      name: "Aging slower",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 14%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 32%, transparent)",
      description:
        "Excellent. Your biological age is meaningfully younger than your chronological age — your lifestyle, sleep, training, and metabolic health are paying off. Keep what you're doing and re-test in 6 months to confirm the trajectory.",
    };
  }
  if (delta < 1) {
    return {
      name: "Aging in step",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 7%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 18%, transparent)",
      description:
        "On par with your chronological age. Targeted improvements (better sleep, lower hs-CRP, fasting glucose < 90) typically pull this 1–3 years younger over 6 months.",
    };
  }
  if (delta < 4) {
    return {
      name: "Aging faster",
      label: "#8E5F1A",
      bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
      description:
        "Your biology is ahead of your birthday by a few years. Highest-leverage interventions: lower hs-CRP (sleep + omega-3 + remove ultra-processed foods), tighten fasting glucose, ensure protein intake supports albumin > 4.4 g/dL.",
    };
  }
  return {
    name: "Aging significantly faster",
    label: "#A12C2C",
    bg: "color-mix(in srgb, #D24343 14%, var(--color-canvas))",
    border: "color-mix(in srgb, #D24343 32%, transparent)",
    description:
      "Your biology is meaningfully ahead of your chronological age. This is reversible — most intervention studies show 2–6 years of biological-age reduction within 8–12 months when the worst markers are systematically improved. Discuss this with your physician.",
  };
}
