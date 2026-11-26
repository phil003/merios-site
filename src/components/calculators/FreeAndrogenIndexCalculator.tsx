"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Controls, Fields, Field, Toggle, CalcOutput,
  ResultPanel, ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta,
  round, styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Free androgen index (FAI) calculator.
 *
 *   FAI = 100 × total testosterone (nmol/L) ÷ SHBG (nmol/L)
 *
 * Units: testosterone molar mass 288.4 g/mol, so
 *   1 ng/dL = 10 / 288.4 = 0.03467 nmol/L   (nmol/L = ng/dL ÷ 28.84)
 *   1 ng/mL = 100 ng/dL = 3.467 nmol/L
 * SHBG is reported in nmol/L by essentially every lab, so it has no unit switch.
 *
 * The sex toggle changes only the interpretation, never the maths. FAI is a
 * reasonable proxy for free testosterone in women, where testosterone is far
 * below SHBG binding capacity. In men the two are of the same order, the
 * relation is non-linear, and FAI agrees poorly with free testosterone
 * (Vermeulen, Verdonck, Kaufman, J Clin Endocrinol Metab 1999;84(10):3666-72),
 * so for men the result is shown without a band and the reader is pointed to
 * the Vermeulen calculator.
 *
 * Female bands: no guideline sets a universal FAI cutoff (the 2023
 * International PCOS Guideline, Teede et al., asks for ranges from the lab's
 * own healthy reference population). The 4.5 and 5 marks below are the upper
 * limits commonly printed by laboratories, shown as "commonly cited", not as
 * a diagnostic threshold.
 */

const NGDL_TO_NMOLL = 10 / 288.4; // ≈ 0.03467
type TUnit = "ngdl" | "nmoll" | "ngml";

export default function FreeAndrogenIndexCalculator() {
  const [totalT, setTotalT] = useState("");
  const [shbg, setShbg] = useState("");
  const [tUnit, setTUnit] = useState<TUnit>("ngdl");
  const [sex, setSex] = useState<"female" | "male">("female");

  const result = useMemo(() => {
    const tRaw = parseFloat(totalT);
    const sRaw = parseFloat(shbg);
    if (![tRaw, sRaw].every((v) => Number.isFinite(v) && v > 0)) return null;
    const tNmol =
      tUnit === "ngdl" ? tRaw * NGDL_TO_NMOLL : tUnit === "ngml" ? tRaw * 100 * NGDL_TO_NMOLL : tRaw;
    const fai = (100 * tNmol) / sRaw;
    if (!Number.isFinite(fai)) return null;
    return {
      fai: round(fai, 1),
      tNmol: round(tNmol, 2),
      shbg: round(sRaw, 1),
      converted: tUnit !== "nmoll",
      band: sex === "female" ? femaleBand(round(fai, 1)) : MALE_NOTE,
    };
  }, [totalT, shbg, tUnit, sex]);

  const unitLabel = tUnit === "ngdl" ? "ng/dL" : tUnit === "ngml" ? "ng/mL" : "nmol/L";
  const tPlaceholder = tUnit === "ngdl" ? "e.g. 50" : tUnit === "ngml" ? "e.g. 0.5" : "e.g. 1.7";

  return (
    <Shell labelledBy="fai-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="fai-calculator-title">Free androgen index from total testosterone and SHBG</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <Controls>
          <Toggle
            legend="Total testosterone units"
            options={[
              { key: "ngdl", label: "ng/dL (US)" },
              { key: "nmoll", label: "nmol/L" },
              { key: "ngml", label: "ng/mL" },
            ]}
            value={tUnit}
            onChange={(v) => {
              setTUnit(v as TUnit);
              setTotalT("");
            }}
          />
          <Toggle
            legend="Interpret for"
            options={[
              { key: "female", label: "Female" },
              { key: "male", label: "Male" },
            ]}
            value={sex}
            onChange={(v) => setSex(v as "female" | "male")}
          />
        </Controls>

        <Fields>
          <Field
            label="Total testosterone"
            unit={unitLabel}
            placeholder={tPlaceholder}
            value={totalT}
            onChange={setTotalT}
            inputId="fai-total"
            step={tUnit === "ngdl" ? "1" : "0.01"}
          />
          <Field label="SHBG" unit="nmol/L" placeholder="e.g. 40" value={shbg} onChange={setShbg} inputId="fai-shbg" />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Free androgen index</span> <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.fai}</div>
              <div className={s.monoLine}>
                100 × {result.tNmol} nmol/L ÷ {result.shbg} nmol/L = {result.fai}
                {result.converted ? ` · total T ${totalT} ${unitLabel} = ${result.tNmol} nmol/L` : ""}
              </div>
              {sex === "female" && (
                <RangeBar
                  min={0}
                  max={15}
                  value={result.fai}
                  tone={result.band.tone}
                  zones={FEMALE_ZONES}
                  marks={[
                    { at: 0, label: "0" },
                    { at: 5, label: "5" },
                    { at: 15, label: "15" },
                  ]}
                />
              )}
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter total testosterone and SHBG from the same blood draw. US reports usually print testosterone in
              ng/dL and SHBG in nmol/L; the conversion is done for you.
            </Empty>
          )}
        </ResultPanel>

        {sex === "female" ? (
          <Refs>
            <RefRow label="Within commonly cited female limits" range="under 4.5" tone="ok" />
            <RefRow label="Around the commonly cited upper limit" range="4.5–5" tone="warn" />
            <RefRow label="Above commonly cited female limits" range="above 5" tone="bad" />
          </Refs>
        ) : (
          <Refs>
            <RefRow label="Men: use calculated free testosterone instead" range="FAI not banded" tone="neutral" />
          </Refs>
        )}
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. FAI reference intervals depend on the laboratory and on the testosterone
          assay (mass spectrometry or immunoassay), so the interval printed on your own report takes precedence over the
          commonly cited limits shown here. A high FAI is one possible sign of biochemical hyperandrogenism, which is
          only one part of how polycystic ovary syndrome is assessed. Hormonal contraception, pregnancy and thyroid
          disease all change SHBG and therefore the index.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale for women (presentation only — mirrors femaleBand). */
const FEMALE_ZONES: Zone[] = [
  { from: 0, to: 4.5, tone: "ok" },
  { from: 4.5, to: 5, tone: "warn" },
  { from: 5, to: 15, tone: "bad" },
];

const MALE_NOTE: { name: string; tone: Tone; description: string } = {
  name: "Not interpreted for men",
  tone: "neutral",
  description:
    "In men, FAI is a poor stand-in for free testosterone. Male testosterone concentrations are close to SHBG's binding capacity, so the relation between the ratio and the unbound hormone is not linear, and a low SHBG can make FAI look high while free testosterone is ordinary. Use the free testosterone calculator, which applies the Vermeulen equation, for a number that means something in men.",
};

function femaleBand(fai: number): { name: string; tone: Tone; description: string } {
  if (fai < 4.5)
    return {
      name: "Within commonly cited range",
      tone: "ok",
      description:
        "Below the upper limits most laboratories print for women, which tend to sit around 4.5 to 5. Check the interval on your own report, since ranges are lab- and assay-dependent. If you take an estrogen-containing contraceptive, SHBG is usually raised and the index is pushed down.",
    };
  if (fai <= 5)
    return {
      name: "Near the upper limit",
      tone: "warn",
      description:
        "Around the upper limit many laboratories use for women. Whether this counts as high depends on your lab's own interval. A repeat draw, ideally in the morning and, if you have periods, early in the cycle, gives a fairer read.",
    };
  return {
    name: "Above commonly cited range",
    tone: "bad",
    description:
      "Above the upper limits commonly printed for women. A high FAI suggests more testosterone is unbound relative to SHBG, often because SHBG is low (associated with insulin resistance, higher body weight or an underactive thyroid) or because testosterone is raised. It is one of the markers used when PCOS is being assessed, not a diagnosis; worth reviewing with a clinician alongside symptoms and cycle history.",
  };
}
