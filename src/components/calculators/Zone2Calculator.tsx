"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, CalcFoot, Footnote, Cta, styles as s,
} from "./_shared";

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
    <Shell labelledBy="zone2-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="zone2-calculator-title">Zone 2 Heart Rate Calculator</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <Fields cols="1">
          <Field
            label="Your age"
            unit="years"
            placeholder="e.g. 40"
            value={age}
            onChange={setAge}
            inputId="zone2-age-input"
            inputMode="numeric"
            min={10}
            max={100}
            step="1"
            literalUnit
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>Your estimated zone 2 range</ResultLabel>
              <div className={s.bigNumber}>
                {result.low}–{result.high}
                <span className={s.unit}>bpm</span>
              </div>
              {/* the five heart-rate zones, zone 2 lit (decorative) */}
              <div aria-hidden className={s.zones}>
                {[38, 52, 66, 82, 100].map((h, i) => (
                  <span key={h} className={s.zone} data-on={i === 1 ? "true" : "false"} style={{ height: `${h}%` }} />
                ))}
              </div>
              <p className={s.resultText}>
                Based on an estimated max heart rate of ~{result.maxHr} bpm (208 −
                0.7 × age), zone 2 is 60–70% of max. Cross-check with the talk
                test: zone 2 is the hardest effort at which you can still speak in
                full sentences.
              </p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your age to estimate your zone 2 heart-rate band in beats per
              minute.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Age-based formulas carry ±10–15 bpm of individual variation. For a
          precise zone, use a lactate test (1.5–2.0 mmol/L) or a lab VO2 max
          assessment.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}
