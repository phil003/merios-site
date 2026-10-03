"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, styles as s,
  type Tone, type Zone,
} from "./_shared";

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
    <Shell labelledBy="homa-ir-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="homa-ir-calculator-title">HOMA-IR Calculator</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <Fields>
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
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Your HOMA-IR</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.score}</div>
              <RangeBar min={0} max={4} value={result.score} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your fasting glucose and fasting insulin from your most recent
              blood panel to see your HOMA-IR.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Optimal" range="< 1.0" tone="ok" />
          <RefRow label="Normal" range="1.0–1.9" tone="ok" />
          <RefRow label="Borderline" range="2.0–2.5" tone="warn" />
          <RefRow label="Insulin resistant" range="> 2.5" tone="bad" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a medical diagnosis. HOMA-IR uses fasting values —
          if your insulin or glucose were drawn non-fasted, results will be
          inflated. Discuss with your physician before adjusting medication.
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
  { from: 2, to: 2.5, tone: "warn" },
  { from: 2.5, to: 4, tone: "bad" },
];

function getBand(score: number): { name: string; tone: Tone; description: string } {
  if (score < 1.0) {
    return {
      name: "Optimal insulin sensitivity",
      tone: "ok",
      description:
        "Excellent insulin sensitivity. Your cells respond efficiently to insulin — keep what you're doing.",
    };
  }
  if (score < 2.0) {
    return {
      name: "Normal range",
      tone: "ok",
      description:
        "Within normal range. Many longevity-focused clinicians target < 1.0 — small lifestyle changes (resistance training, less refined carbs) can move you closer to optimal.",
    };
  }
  if (score < 2.5) {
    return {
      name: "Borderline insulin resistance",
      tone: "warn",
      description:
        "Yellow flag. You're not insulin resistant yet, but you're trending. A 12-week intervention (sleep, strength training, lower refined carbs) usually moves this back below 1.5. Recheck in 90 days.",
    };
  }
  return {
    name: "Insulin resistance",
    tone: "bad",
    description:
      "Significant insulin resistance — a major driver of metabolic syndrome and type 2 diabetes risk. Discuss with your physician. Lifestyle changes (resistance training, lower refined carbs, fiber, sleep) can meaningfully improve this within 12–24 weeks.",
  };
}
