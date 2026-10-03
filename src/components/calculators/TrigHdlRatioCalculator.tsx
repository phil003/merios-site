"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, styles as s,
  type Tone, type Zone,
} from "./_shared";

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
    <Shell labelledBy="trig-hdl-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="trig-hdl-calculator-title">Triglyceride / HDL Ratio Calculator</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <Fields>
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
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Your TG/HDL ratio</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.ratio}</div>
              <RangeBar min={0} max={5} value={result.ratio} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your triglycerides and HDL from your most recent lipid panel
              to see your TG/HDL ratio (US units, mg/dL).
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
          Educational tool. Both values must come from a fasting lipid panel. If
          you're outside the US (mmol/L), multiply triglycerides by 88.57 and HDL
          by 38.67 to convert to mg/dL before entering.
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
        "Yellow flag. You're trending toward insulin resistance. A 12-week intervention (lower refined carbs, more fiber, omega-3, zone-2 cardio) typically pulls this back below 2.0.",
    };
  }
  return {
    name: "Insulin resistance signal",
    tone: "bad",
    description:
      "Strong signal of insulin resistance and elevated cardiovascular risk from small dense LDL particles. Discuss with your physician. Lifestyle changes (reduce refined carbs, fiber, omega-3, resistance training) usually move this meaningfully within 12 weeks.",
  };
}
