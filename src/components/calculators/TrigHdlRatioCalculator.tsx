"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, styles as s,
  type Tone, type Zone,
} from "./_shared";

/**
 * Triglyceride / HDL ratio calculator.
 *
 * Formula: ratio = triglycerides / HDL, both in mg/dL. The published cut-offs
 * (2.0, 3.0) are for mg/dL values; a ratio of two mmol/L values reads about
 * 2.3 times lower (88.57 ÷ 38.67), so mmol/L inputs are converted first:
 * triglycerides × 88.57, HDL × 38.67.
 * One of the strongest single-number predictors of insulin resistance and
 * cardiovascular risk — often more revealing than total cholesterol or LDL alone.
 *
 * Embedded in `/blog/triglyceride-hdl-ratio-calculator` to capture growing
 * "triglyceride hdl ratio calculator" SERP intent (currently mid-rank,
 * impressions building).
 */
const TG_FACTOR = 88.57; // mg/dL per mmol/L, triglycerides
const HDL_FACTOR = 38.67; // mg/dL per mmol/L, cholesterol

export default function TrigHdlRatioCalculator() {
  const [trig, setTrig] = useState<string>("");
  const [hdl, setHdl] = useState<string>("");
  const [unit, setUnit] = useState<"mgdl" | "mmoll">("mgdl");

  const result = useMemo(() => {
    const t = parseFloat(trig);
    const h = parseFloat(hdl);
    if (!Number.isFinite(t) || !Number.isFinite(h) || t <= 0 || h <= 0) {
      return null;
    }
    const tgMg = unit === "mgdl" ? t : t * TG_FACTOR;
    const hdlMg = unit === "mgdl" ? h : h * HDL_FACTOR;
    // Rounded once: the band reads the ratio as shown (3.00 is never "below 3.0").
    const ratio = Math.round((tgMg / hdlMg) * 100) / 100;
    return {
      ratio,
      tgMg: Math.round(tgMg),
      hdlMg: Math.round(hdlMg),
      band: getBand(ratio),
    };
  }, [trig, hdl, unit]);

  return (
    <Shell labelledBy="trig-hdl-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="trig-hdl-calculator-title">Triglyceride / HDL Ratio Calculator</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Units on your report"
            options={[
              { key: "mgdl", label: "mg/dL" },
              { key: "mmoll", label: "mmol/L" },
            ]}
            value={unit}
            onChange={(v) => setUnit(v === "mmoll" ? "mmoll" : "mgdl")}
          />
        </div>

        <Fields>
          <Field
            label="Triglycerides"
            unit={unit === "mgdl" ? "mg/dL" : "mmol/L"}
            placeholder={unit === "mgdl" ? "e.g. 90" : "e.g. 1.0"}
            value={trig}
            onChange={setTrig}
            inputId="trig-hdl-trig"
          />
          <Field
            label="HDL cholesterol"
            unit={unit === "mgdl" ? "mg/dL" : "mmol/L"}
            placeholder={unit === "mgdl" ? "e.g. 55" : "e.g. 1.4"}
            value={hdl}
            onChange={setHdl}
            inputId="trig-hdl-hdl"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Your TG/HDL ratio</span> <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.ratio.toFixed(2)}</div>
              {unit === "mmoll" && (
                <div className={s.monoLine}>
                  In mg/dL: triglycerides {result.tgMg} ÷ HDL {result.hdlMg}
                </div>
              )}
              <RangeBar min={0} max={5} value={result.ratio} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your triglycerides and HDL from your most recent lipid panel, in the unit printed on your
              report, to see your TG/HDL ratio.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Optimal" range="< 1.0" tone="ok" />
          <RefRow label="Good" range="1.0–2.0" tone="ok" />
          <RefRow label="Borderline" range="2.0–3.0" tone="warn" />
          <RefRow label="Insulin resistant" range="> 3.0" tone="bad" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. Both values must come from a fasting lipid panel. The ratio and its
          bands are in mg/dL: with mmol/L selected, triglycerides are multiplied by 88.57 and HDL by 38.67 before
          dividing, because a ratio of two mmol/L values reads about 2.3 times lower.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale (presentation only — mirrors the bands in getBand). */
const ZONES: Zone[] = [
  { from: 0, to: 1, tone: "ok" },
  { from: 1, to: 2, tone: "ok" },
  { from: 2, to: 3, tone: "warn" },
  { from: 3, to: 5, tone: "bad" },
];

function getBand(ratio: number): { name: string; tone: Tone; description: string } {
  if (ratio < 1.0) {
    return {
      name: "Excellent",
      tone: "ok",
      description:
        "Optimal metabolic health. Strong insulin sensitivity, low cardiovascular risk profile from this marker.",
    };
  }
  if (ratio < 2.0) {
    return {
      name: "Good",
      tone: "ok",
      description:
        "Healthy range. Many longevity-focused clinicians target < 1.0 — small wins in fiber, omega-3, and zone-2 cardio can move you closer to optimal.",
    };
  }
  if (ratio < 3.0) {
    return {
      name: "Borderline insulin resistance",
      tone: "warn",
      description:
        "Borderline: above the range usually read as healthy, though one panel cannot show a trend. Triglycerides move with recent meals, alcohol and weight, so talk it through with your clinician and retest fasting, on the same lab.",
    };
  }
  return {
    name: "Insulin resistance signal",
    tone: "bad",
    description:
      "A ratio in this range is associated with insulin resistance and with small, dense LDL particles, which carry more cardiovascular risk. Discuss it with your physician, and confirm it with a repeat fasting lipid panel on the same lab.",
  };
}
