"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Uric acid unit converter — serum urate, mg/dL ↔ µmol/L (and mmol/L).
 *
 * The conversion follows from the molar mass of uric acid (168.11 g/mol):
 * 1 mg/dL = 10 mg/L ÷ 168.11 g/mol = 59.48 µmol/L = 0.05948 mmol/L.
 * Many labs and quick references round the factor to 59.5 or 60, which is why
 * 6 mg/dL is often quoted as 360 µmol/L.
 *
 * Bands are reference points, not sex-specific lab ranges: the 6 mg/dL
 * treat-to-target line used by the 2020 ACR and 2016 EULAR gout guidelines,
 * the ≈ 6.8 mg/dL urate saturation point, and the upper end of commonly
 * printed adult ranges (MedlinePlus lists 3.0–7.1 mg/dL for women and
 * 4.0–8.6 mg/dL for men). Same framing as /blog/uric-acid-levels-high.
 */
const FACTOR = 59.48; // µmol/L per mg/dL

type Unit = "mg" | "umol" | "mmol";

const UNIT_LABEL: Record<Unit, string> = { mg: "mg/dL", umol: "µmol/L", mmol: "mmol/L" };

export default function UricAcidConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<Unit>("mg");

  const result = useMemo(() => {
    const v = parseFloat(value.replace(",", "."));
    if (!Number.isFinite(v) || v <= 0) return null;
    const mg = from === "mg" ? v : from === "umol" ? v / FACTOR : (v * 1000) / FACTOR;
    const umol = mg * FACTOR;
    const mmol = umol / 1000;
    const out = from === "mg" ? round(umol, 1) : round(mg, 2);
    return { out, unit: from === "mg" ? "µmol/L" : "mg/dL", mg, umol, mmol, band: bandFromMg(mg) };
  }, [value, from]);

  return (
    <Shell labelledBy="ua-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="ua-title">Uric Acid Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your result is in"
            options={[
              { key: "mg", label: "mg/dL" },
              { key: "umol", label: "µmol/L" },
              { key: "mmol", label: "mmol/L" },
            ]}
            value={from}
            onChange={(v) => setFrom(v as Unit)}
          />
        </div>

        <Fields cols="1">
          <Field
            label="Uric acid (serum urate)"
            unit={UNIT_LABEL[from]}
            placeholder={from === "mg" ? "e.g. 6" : from === "umol" ? "e.g. 360" : "e.g. 0.36"}
            value={value}
            onChange={setValue}
            inputId="ua-value"
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
              <RangeBar min={0} max={12} value={result.mg} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>
                That is <strong>{round(result.mg, 2)} mg/dL</strong>, <strong>{round(result.umol, 0)} µmol/L</strong>{" "}
                or <strong>{round(result.mmol, 3)} mmol/L</strong>. The factor comes from the weight of the uric acid
                molecule: 1 mg/dL is 59.48 µmol/L. Some labs round it to 59.5 or 60, so your report may differ from
                this result by a point or two.
              </p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your uric acid result in the unit your lab used. US labs report mg/dL; labs in the UK, Europe,
              Australia and much of Asia report µmol/L (sometimes mmol/L), so the same level reads 6 on one report and
              357 on another.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. It converts <strong>serum or plasma uric acid</strong> (urate). It does not
          apply to 24-hour urine uric acid, which is reported as a daily amount. Reference ranges vary by lab, sex and
          assay; read your result against the range printed on your own report and discuss it with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale in mg/dL (presentation only — mirrors bandFromMg). */
const ZONES: Zone[] = [
  { from: 0, to: 2, tone: "warn" },
  { from: 2, to: 6, tone: "ok" },
  { from: 6, to: 9, tone: "warn" },
  { from: 9, to: 12, tone: "bad" },
];

function bandFromMg(mg: number): { name: string; tone: Tone; description: string } {
  if (mg < 2) return {
    name: "below most lab ranges", tone: "warn",
    description:
      "Below about 2 mg/dL (120 µmol/L) is uncommon and sits under the lower limit of most lab ranges. It can reflect medication, diet or how the kidneys handle urate, and it is usually interpreted alongside the rest of the panel. Worth raising with your clinician if it is new or unexplained.",
  };
  if (mg < 6) return {
    name: "below 6 mg/dL", tone: "ok",
    description:
      "Below 6 mg/dL (about 357 µmol/L) is within the usual adult range at most labs. It is also under the level that gout guidelines from the American College of Rheumatology (2020) and EULAR (2016) aim for in people treated for gout; EULAR aims for below 5 mg/dL (about 300 µmol/L) in severe gout.",
  };
  if (mg < 6.8) return {
    name: "between 6 and 6.8 mg/dL", tone: "warn",
    description:
      "6 to 6.8 mg/dL (about 357 to 404 µmol/L) is still inside many labs' reference range, especially for men, but it is above the 6 mg/dL target used in gout care and close to the point where urate stops staying dissolved in body fluids.",
  };
  if (mg < 9) return {
    name: "above the saturation point", tone: "warn",
    description:
      "Above about 6.8 mg/dL (about 405 µmol/L), urate exceeds its solubility in body fluids and crystals can form, which is the most common definition of hyperuricemia. Many people at this level never develop gout, and some lab ranges for men run up to around 8.6 mg/dL, so read it against your own report and discuss it with your clinician.",
  };
  return {
    name: "above most lab ranges", tone: "bad",
    description:
      "9 mg/dL (about 535 µmol/L) and above is beyond the upper limit of most adult reference ranges. Higher levels are associated with a greater chance of gout and kidney stones over time. This is a result to review with your clinician rather than to act on alone.",
  };
}
