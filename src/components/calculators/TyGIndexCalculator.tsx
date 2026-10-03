"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, styles as s,
  type Tone, type Zone,
} from "./_shared";

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
    <Shell labelledBy="tyg-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="tyg-calculator-title">TyG Index Calculator</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div role="group" aria-label="Units" className={s.seg} style={{ justifySelf: "start" }}>
          <UnitButton active={unit === "mgdl"} onClick={() => setUnit("mgdl")} label="mg/dL (US)" />
          <UnitButton active={unit === "mmoll"} onClick={() => setUnit("mmoll")} label="mmol/L" />
        </div>

        <Fields>
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
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Your TyG index</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.tyg}</div>
              <RangeBar min={7} max={10} value={result.tyg} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
              {unit === "mmoll" && (
                <p className={s.resultNote}>
                  Converted to {result.tMg} mg/dL triglycerides and {result.gMg}{" "}mg/dL glucose before computing —
                  the formula&rsquo;s constant is defined in US units.
                </p>
              )}
            </ResultBody>
          ) : (
            <Empty>
              Enter triglycerides and fasting glucose from the same fasting blood draw. Both appear on a
              standard lipid and metabolic panel, so you almost certainly already have them.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Low" range="under 8.0" tone="ok" />
          <RefRow label="Average" range="8.0–8.5" tone="ok" />
          <RefRow label="Elevated" range="8.5–9.0" tone="warn" />
          <RefRow label="High" range="above 9.0" tone="bad" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. TyG cutoffs are population-derived and vary between studies and
          ethnic groups — there is no single agreed threshold. Read your number as a position on a gradient and
          as a trend over time, not as a pass/fail line. Both inputs must come from the same fasting draw.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale (presentation only — mirrors the bands in getBand). */
const ZONES: Zone[] = [
  { from: 7, to: 8, tone: "ok" },
  { from: 8, to: 8.5, tone: "ok" },
  { from: 8.5, to: 9, tone: "warn" },
  { from: 9, to: 10, tone: "bad" },
];

function UnitButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={s.segBtn}>
      {label}
    </button>
  );
}

function getBand(tyg: number): { name: string; tone: Tone; description: string } {
  if (tyg < 8.0) {
    return {
      name: "Low",
      tone: "ok",
      description:
        "Below the range where insulin resistance is typically flagged. Both inputs are in good territory, which usually tracks with preserved insulin sensitivity.",
    };
  }
  if (tyg < 8.5) {
    return {
      name: "Average",
      tone: "ok",
      description:
        "Typical for a general adult population. Not a red flag on its own — but many studies place metabolic-syndrome cutoffs near 8.5, so this is the band where the trend matters more than the single value.",
    };
  }
  if (tyg < 9.0) {
    return {
      name: "Elevated",
      tone: "warn",
      description:
        "Above the threshold most commonly cited for metabolic syndrome. Worth confirming with fasting insulin and HOMA-IR, and worth repeating after 12 weeks of change rather than acting on one reading.",
    };
  }
  return {
    name: "High",
    tone: "bad",
    description:
      "Well above common cutoffs, driven by elevated triglycerides, elevated fasting glucose, or both. This warrants a conversation with your physician and a fuller metabolic workup rather than self-management.",
  };
}
