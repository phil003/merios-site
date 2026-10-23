"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Vitamin D unit converter — 25-hydroxyvitamin D, ng/mL ↔ nmol/L.
 *
 * Unlike Lp(a), this conversion is exact: it follows from the molar mass of
 * 25(OH)D (≈ 400.6 g/mol), so 1 ng/mL = 2.496 nmol/L. US labs report ng/mL;
 * the UK, Canada, Australia and most of Europe report nmol/L.
 *
 * Bands follow the Institute of Medicine (2011) cut-points as tabulated by the
 * NIH Office of Dietary Supplements, plus the 2011 Endocrine Society
 * "sufficient" line (30 ng/mL) that the Society withdrew in 2024 — the same
 * framing as /blog/vitamin-d-30-low.
 */
const FACTOR = 2.496;

export default function VitaminDConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<"ng" | "nmol">("ng");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v) || v <= 0) return null;
    const ng = from === "ng" ? v : v / FACTOR;
    const out = from === "ng" ? round(v * FACTOR, 0) : round(v / FACTOR, 1);
    return { out, unit: from === "ng" ? "nmol/L" : "ng/mL", ng, band: bandFromNg(ng) };
  }, [value, from]);

  return (
    <Shell labelledBy="vitd-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="vitd-title">Vitamin D Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your result is in"
            options={[{ key: "ng", label: "ng/mL" }, { key: "nmol", label: "nmol/L" }]}
            value={from}
            onChange={(v) => setFrom(v as typeof from)}
          />
        </div>

        <Fields cols="1">
          <Field
            label="25-OH vitamin D"
            unit={from === "ng" ? "ng/mL" : "nmol/L"}
            placeholder={from === "ng" ? "e.g. 30" : "e.g. 75"}
            value={value}
            onChange={setValue}
            inputId="vitd-value"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Same result in {result.unit}</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.out} <span className={s.unit}>{result.unit}</span>
              </div>
              <RangeBar min={0} max={100} value={result.ng} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>
                That is <strong>{round(result.ng, 1)} ng/mL</strong> or <strong>{round(result.ng * FACTOR, 0)} nmol/L</strong>.
                This conversion is exact: 1 ng/mL of 25-hydroxyvitamin D is 2.496 nmol/L, a fixed factor set by the
                molecule&apos;s weight.
              </p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your 25-hydroxyvitamin D result in the unit your lab used. US labs report ng/mL; labs in the UK,
              Canada, Australia and most of Europe report nmol/L, so the same level reads 30 on one report and 75 on
              another.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. It converts <strong>25-hydroxyvitamin D</strong>, the test that measures
          your vitamin D status. It does not apply to 1,25-dihydroxyvitamin D (reported in pg/mL or pmol/L), which is a
          different test, or to supplement doses in IU. Cut-offs differ between guidelines; read your result against the
          range printed on your own report and discuss any supplementation plan with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale in ng/mL (presentation only — mirrors bandFromNg). */
const ZONES: Zone[] = [
  { from: 0, to: 12, tone: "bad" },
  { from: 12, to: 20, tone: "warn" },
  { from: 20, to: 50, tone: "ok" },
  { from: 50, to: 100, tone: "warn" },
];

function bandFromNg(ng: number): { name: string; tone: Tone; description: string } {
  if (ng < 12) return {
    name: "deficient range", tone: "bad",
    description:
      "Below 12 ng/mL (30 nmol/L) is the level the Institute of Medicine associates with vitamin D deficiency, the range where rickets and osteomalacia can occur. This is a result to discuss with your clinician rather than to correct on your own.",
  };
  if (ng < 20) return {
    name: "inadequate for some people", tone: "warn",
    description:
      "Between 12 and 20 ng/mL (30 to 50 nmol/L) is generally considered inadequate for bone and overall health in some people. UK guidance uses 25 nmol/L (10 ng/mL) as its deficiency line, so the same number can be read differently depending on where your lab is. The Endocrine Society's 2011 guideline called anything below 20 ng/mL deficient.",
  };
  if (ng < 30) return {
    name: "adequate by the IOM definition", tone: "ok",
    description:
      "20 ng/mL (50 nmol/L) and above is adequate for bone health in nearly everyone, by the Institute of Medicine definition. Between 20 and 30 ng/mL is what the Endocrine Society called 'insufficient' in 2011, a cut-off the Society withdrew in its 2024 guideline.",
  };
  if (ng <= 50.2) return {
    name: "sufficient by every definition", tone: "ok",
    description:
      "30 to 50 ng/mL (75 to 125 nmol/L) is sufficient under both the Institute of Medicine and the older Endocrine Society definitions. Trials have not shown that pushing higher than this improves outcomes in people who are not deficient.",
  };
  if (ng <= 100.2) return {
    name: "above 50 ng/mL", tone: "warn",
    description:
      "Above 50 ng/mL (125 nmol/L) is the level the Institute of Medicine links to potential adverse effects, though many lab reference ranges run up to 100 ng/mL. If you take high-dose vitamin D, this is worth reviewing with your clinician.",
  };
  return {
    name: "above most lab ranges", tone: "bad",
    description:
      "Above 100 ng/mL (250 nmol/L) is beyond the upper end of most lab reference ranges. Toxicity is typically reported above 150 ng/mL (374 nmol/L) and almost always comes from high-dose supplements. Discuss this result with your clinician.",
  };
}
