"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, styles as s,
  type Tone, type Zone,
} from "./_shared";

/**
 * A1C → estimated average glucose (eAG) converter.
 *
 * Formula (ADAG study): eAG (mg/dL) = 28.7 × A1C − 46.7.
 * mmol/L = mg/dL ÷ 18.
 *
 * Runs both directions. A1C -> eAG serves "a1c to average glucose chart" and
 * its variants; eAG -> A1C serves "blood glucose to a1c chart", "glucose to a1c
 * conversion chart" and "average bg to a1c" - roughly 120 impressions a month
 * that had no tool on the site at all.
 */
export default function A1CConverter() {
  const [mode, setMode] = useState<"a1c" | "glucose">("a1c");
  const [a1c, setA1c] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [gUnit, setGUnit] = useState<"mgdl" | "mmol">("mgdl");

  const result = useMemo(() => {
    if (mode === "a1c") {
      const v = parseFloat(a1c);
      if (!Number.isFinite(v) || v <= 0 || v > 20) return null;
      const mgdl = 28.7 * v - 46.7;
      return {
        kind: "glucose" as const,
        a1c: Math.round(v * 10) / 10,
        mgdl: Math.round(mgdl),
        mmol: Math.round((mgdl / 18) * 10) / 10,
        band: getBand(v),
      };
    }
    const g = parseFloat(glucose);
    if (!Number.isFinite(g) || g <= 0) return null;
    const mgdl = gUnit === "mmol" ? g * 18 : g;
    // Outside this window the ADAG regression is extrapolation, not conversion.
    if (mgdl < 40 || mgdl > 600) return null;
    const v = (mgdl + 46.7) / 28.7;
    return {
      kind: "a1c" as const,
      a1c: Math.round(v * 10) / 10,
      mgdl: Math.round(mgdl),
      mmol: Math.round((mgdl / 18) * 10) / 10,
      band: getBand(v),
    };
  }, [mode, a1c, glucose, gUnit]);

  return (
    <Shell labelledBy="a1c-converter-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="a1c-converter-title">A1C to Blood Sugar Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div role="group" aria-label="Conversion direction" className={s.seg} style={{ justifySelf: "start" }}>
          {(["a1c", "glucose"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={s.segBtn}
            >
              {m === "a1c" ? "A1C to glucose" : "Glucose to A1C"}
            </button>
          ))}
        </div>

        {mode === "a1c" ? (
          <Fields cols="1">
            <Field
              label="Hemoglobin A1C"
              unit="%"
              placeholder="e.g. 5.7"
              value={a1c}
              onChange={setA1c}
              inputId="a1c-converter-input"
              max={20}
              literalUnit
            />
          </Fields>
        ) : (
          <Fields cols="pair">
            <Field
              label="Average glucose"
              placeholder={gUnit === "mmol" ? "e.g. 6.5" : "e.g. 117"}
              value={glucose}
              onChange={setGlucose}
              inputId="a1c-glucose-input"
              step="1"
              style={{ flex: "1 1 140px", maxWidth: "260px" }}
            />
            <label htmlFor="a1c-glucose-unit" className={s.field} style={{ flex: "0 0 132px" }}>
              <span className={s.fieldLabel}>Unit</span>
              <select
                id="a1c-glucose-unit"
                value={gUnit}
                onChange={(e) => setGUnit(e.target.value as "mgdl" | "mmol")}
                className={s.select}
              >
                <option value="mgdl">mg/dL</option>
                <option value="mmol">mmol/L</option>
              </select>
            </label>
          </Fields>
        )}
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>{result.kind === "glucose" ? "Estimated average glucose" : "Estimated A1C"}</span> —{" "}
                <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.numbers}>
                <div className={s.bigNumber}>
                  {result.kind === "glucose" ? result.mgdl : result.a1c}
                  <span className={result.kind === "glucose" ? s.unit : s.unitTight}>
                    {result.kind === "glucose" ? "mg/dL" : "%"}
                  </span>
                </div>
                <div className={s.midNumber}>
                  {result.kind === "glucose" ? result.mmol : result.mgdl}
                  <span className={s.unit}>
                    {result.kind === "glucose" ? "mmol/L" : "mg/dL average"}
                  </span>
                </div>
              </div>
              <RangeBar min={4} max={10} value={result.a1c} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              {mode === "a1c"
                ? "Enter your HbA1c percentage to see your estimated average glucose (eAG) in both mg/dL and mmol/L."
                : "Enter an average glucose reading to see the HbA1c it corresponds to."}
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Normal" range="< 5.7%" tone="ok" />
          <RefRow label="Prediabetes" range="5.7–6.4%" tone="warn" />
          <RefRow label="Diabetes" range="≥ 6.5%" tone="bad" />
          <RefRow label="Rule of thumb" range="+1% ≈ +29 mg/dL" tone="neutral" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational estimate. eAG is a 2–3 month average and can diverge from a
          single meter reading, especially with anemia, kidney disease, or certain
          hemoglobin variants. Interpret results with a clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale in A1C % (presentation only — mirrors the bands in getBand). */
const ZONES: Zone[] = [
  { from: 4, to: 5.7, tone: "ok" },
  { from: 5.7, to: 6.5, tone: "warn" },
  { from: 6.5, to: 10, tone: "bad" },
];

function getBand(a1c: number): { name: string; tone: Tone; description: string } {
  if (a1c < 5.7) {
    return {
      name: "Normal",
      tone: "ok",
      description:
        "Your A1C is in the normal range (below 5.7%). Keep an eye on the trend — the top of normal (5.5–5.6%) is where early metabolic drift shows up first.",
    };
  }
  if (a1c < 6.5) {
    return {
      name: "Prediabetes",
      tone: "warn",
      description:
        "This falls in the prediabetes range (5.7–6.4%). It is highly reversible: the Diabetes Prevention Program showed 58% of people avoided progression with lifestyle change alone.",
    };
  }
  return {
    name: "Diabetes range",
    tone: "bad",
    description:
      "An A1C of 6.5% or higher is the diagnostic threshold for type 2 diabetes, but a diagnosis needs confirmation on a second test. Discuss next steps with your physician.",
  };
}
