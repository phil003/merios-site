"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Total testosterone unit converter — ng/dL ↔ nmol/L.
 *
 * Exact conversion from the molar mass of testosterone (288.4 g/mol):
 * 1 nmol/L = 28.84 ng/dL, 1 ng/dL = 0.03467 nmol/L — the same constant the
 * free testosterone calculator uses (NGDL_TO_NMOLL = 10 / 288.4).
 *
 * Bands are applied for adult men only: the CDC-harmonized range 264–916 ng/dL
 * (Travison 2017, adopted by the Endocrine Society 2018 guideline) and the AUA
 * 2018 "low testosterone" cut-off of 300 ng/dL. Women's ranges depend heavily
 * on the assay, so for women the tool converts and points to the lab's range.
 */
const NMOL_TO_NGDL = 28.84;

export default function TestosteroneConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<"ngdl" | "nmol">("ngdl");
  const [sex, setSex] = useState<"male" | "female">("male");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v) || v <= 0) return null;
    const ngdl = from === "ngdl" ? v : round(v * NMOL_TO_NGDL, 0);
    const out = from === "ngdl" ? round(v / NMOL_TO_NGDL, 1) : round(v * NMOL_TO_NGDL, 0);
    return { out, unit: from === "ngdl" ? "nmol/L" : "ng/dL", ngdl, band: sex === "male" ? bandMale(ngdl) : bandFemale() };
  }, [value, from, sex]);

  return (
    <Shell labelledBy="testo-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="testo-title">Testosterone Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your result is in"
            options={[{ key: "ngdl", label: "ng/dL" }, { key: "nmol", label: "nmol/L" }]}
            value={from}
            onChange={(v) => setFrom(v as typeof from)}
          />
        </div>
        <div>
          <Toggle
            legend="Ranges for"
            options={[{ key: "male", label: "Men" }, { key: "female", label: "Women" }]}
            value={sex}
            onChange={(v) => setSex(v as typeof sex)}
          />
        </div>

        <Fields cols="1">
          <Field
            label="Total testosterone"
            unit={from === "ngdl" ? "ng/dL" : "nmol/L"}
            placeholder={from === "ngdl" ? "e.g. 450" : "e.g. 15.6"}
            value={value}
            onChange={setValue}
            inputId="testo-value"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Same result in {result.unit}</span>
                {result.band ? <> — <Chip tone={result.band.tone}>{result.band.name}</Chip></> : null}
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.out} <span className={s.unit}>{result.unit}</span>
              </div>
              {sex === "male" && result.band ? (
                <RangeBar min={100} max={1100} value={result.ngdl} tone={result.band.tone} zones={ZONES} />
              ) : null}
              <p className={s.resultText}>
                That is <strong>{round(result.ngdl, 0)} ng/dL</strong> or{" "}
                <strong>{round(result.ngdl / NMOL_TO_NGDL, 1)} nmol/L</strong>. The conversion is exact: 1 nmol/L of
                testosterone is 28.84 ng/dL, set by the molecule&apos;s weight.
              </p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your total testosterone in the unit your lab used. US labs report ng/dL; the UK, Canada, Australia
              and most of Europe report nmol/L, so 450 on one report and 15.6 on another are the same level.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. It converts <strong>total</strong> testosterone. A single result does not
          establish low testosterone: guidelines ask for two early-morning measurements (the Endocrine Society specifies fasting) plus symptoms, and the
          free fraction (which depends on SHBG) can tell a different story — the free testosterone calculator handles
          that. Interpret with the range on your own report and with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale in ng/dL for adult men (presentation only — mirrors bandMale). */
const ZONES: Zone[] = [
  { from: 100, to: 264, tone: "bad" },
  { from: 264, to: 300, tone: "warn" },
  { from: 300, to: 916, tone: "ok" },
  { from: 916, to: 1100, tone: "warn" },
];

function bandMale(ngdl: number): { name: string; tone: Tone; description: string } {
  if (ngdl < 264) return {
    name: "below the harmonized range", tone: "bad",
    description:
      "Below 264 ng/dL (9.2 nmol/L), the lower limit of the CDC-harmonized reference range for healthy young men that the Endocrine Society recommends labs use. A low result is a reason to repeat the test on a morning, fasting sample and to discuss symptoms with your clinician, not a diagnosis on its own.",
  };
  if (ngdl < 300) return {
    name: "borderline", tone: "warn",
    description:
      "Between 264 and 300 ng/dL (9.2 to 10.4 nmol/L): inside the harmonized reference range, but below the 300 ng/dL cut-off the American Urological Association uses to define low testosterone. Morning timing, sleep, illness and weight all move this number, so a repeat test is the usual next step.",
  };
  if (ngdl <= 917) return {
    name: "within the reference range", tone: "ok",
    description:
      "Within the CDC-harmonized range of 264 to 916 ng/dL (9.2 to 31.8 nmol/L) for adult men. If you have symptoms despite a normal total, the free testosterone fraction, which depends on SHBG, is the number worth checking next.",
  };
  return {
    name: "above the reference range", tone: "warn",
    description:
      "Above 916 ng/dL (31.8 nmol/L), the upper end of the harmonized range. This is most often seen with testosterone therapy or anabolic use, and occasionally reflects a high SHBG. Worth reviewing with your clinician, along with hematocrit if you are on therapy.",
  };
}

function bandFemale(): { name: string; tone: Tone; description: string } {
  return {
    name: "use your lab's range", tone: "neutral",
    description:
      "Testosterone in women is roughly ten times lower than in men, and reference ranges vary a lot between assays, so this tool does not apply a band. Compare your number with the range printed on your own report.",
  };
}
