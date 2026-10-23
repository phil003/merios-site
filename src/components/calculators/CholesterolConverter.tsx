"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Cholesterol unit converter — mg/dL ↔ mmol/L for the standard lipid panel,
 * mg/dL ↔ g/L for ApoB.
 *
 * The factors are exact, but they are NOT the same for every lipid, which is
 * the mistake this tool exists to prevent:
 *  - total, LDL, HDL and non-HDL cholesterol: 1 mmol/L = 38.67 mg/dL
 *    (molar mass of cholesterol, 386.7 g/mol)
 *  - triglycerides: 1 mmol/L = 88.57 mg/dL (a typical triglyceride, ~885.7 g/mol)
 *  - ApoB: 1 g/L = 100 mg/dL (a mass-to-mass change, no molar mass involved)
 *
 * Bands are the US ones the lipid articles on this site use: NCEP ATP III for
 * the panel, the 2018 AHA/ACC risk-enhancer cut-off (130 mg/dL) for ApoB.
 */

type Key = "tc" | "ldl" | "hdl" | "nonhdl" | "tg" | "apob";

type Band = { upTo: number; name: string; tone: Tone; description: string };

type Analyte = {
  label: string;
  inText: string;
  short: string;
  siUnit: string;
  factor: number; // mg/dL per SI unit
  siDecimals: number;
  example: { mg: string; si: string };
  bar: { max: number; zones: Zone[] };
  bands: Band[]; // in mg/dL, ascending; last band upTo = Infinity
};

const ANALYTES: Record<Key, Analyte> = {
  tc: {
    label: "Total cholesterol", inText: "total cholesterol", short: "Total", siUnit: "mmol/L", factor: 38.67, siDecimals: 2,
    example: { mg: "e.g. 200", si: "e.g. 5.2" },
    bar: { max: 320, zones: [{ from: 0, to: 200, tone: "ok" }, { from: 200, to: 240, tone: "warn" }, { from: 240, to: 320, tone: "bad" }] },
    bands: [
      { upTo: 199.99, name: "desirable", tone: "ok", description: "Below 200 mg/dL (5.17 mmol/L) is the 'desirable' band in the US NCEP guidelines. Total cholesterol mixes protective HDL with the atherogenic fractions, so LDL, non-HDL or ApoB say more about risk." },
      { upTo: 239.99, name: "borderline high", tone: "warn", description: "200 to 239 mg/dL (5.17 to 6.18 mmol/L) is 'borderline high'. A high HDL can push total cholesterol up on its own, so look at LDL and non-HDL before drawing conclusions." },
      { upTo: Infinity, name: "high", tone: "bad", description: "240 mg/dL (6.21 mmol/L) and above is 'high' in the US guidelines. What it means for you depends on the LDL, HDL and triglycerides behind it and on your overall risk; worth a conversation with your clinician." },
    ],
  },
  ldl: {
    label: "LDL cholesterol", inText: "LDL cholesterol", short: "LDL", siUnit: "mmol/L", factor: 38.67, siDecimals: 2,
    example: { mg: "e.g. 130", si: "e.g. 3.4" },
    bar: { max: 220, zones: [{ from: 0, to: 100, tone: "ok" }, { from: 100, to: 130, tone: "ok" }, { from: 130, to: 160, tone: "warn" }, { from: 160, to: 220, tone: "bad" }] },
    bands: [
      { upTo: 99.99, name: "optimal", tone: "ok", description: "Below 100 mg/dL (2.59 mmol/L) is 'optimal' for most adults in the US guidelines. People at high cardiovascular risk are usually given lower targets, typically below 70 mg/dL (1.8 mmol/L) or lower." },
      { upTo: 129.99, name: "near optimal", tone: "ok", description: "100 to 129 mg/dL (2.59 to 3.34 mmol/L) is 'near optimal'. Whether that is fine for you depends on your overall risk, which is what your clinician weighs." },
      { upTo: 159.99, name: "borderline high", tone: "warn", description: "130 to 159 mg/dL (3.36 to 4.11 mmol/L) is 'borderline high'. This is the range where diet, weight and exercise changes are usually tried first, and where ApoB can help settle whether the number matters for you." },
      { upTo: 189.99, name: "high", tone: "bad", description: "160 to 189 mg/dL (4.14 to 4.89 mmol/L) is 'high'. Worth discussing with your clinician in the context of your other risk factors." },
      { upTo: Infinity, name: "very high", tone: "bad", description: "190 mg/dL (4.91 mmol/L) and above is 'very high', the level at which US guidelines generally recommend treatment regardless of other risk factors and at which inherited familial hypercholesterolemia is considered. Discuss with your clinician." },
    ],
  },
  hdl: {
    label: "HDL cholesterol", inText: "HDL cholesterol", short: "HDL", siUnit: "mmol/L", factor: 38.67, siDecimals: 2,
    example: { mg: "e.g. 55", si: "e.g. 1.4" },
    bar: { max: 100, zones: [{ from: 0, to: 40, tone: "warn" }, { from: 40, to: 60, tone: "ok" }, { from: 60, to: 100, tone: "ok" }] },
    bands: [
      { upTo: 39.99, name: "low", tone: "warn", description: "Below 40 mg/dL (1.03 mmol/L) is 'low' and counts as a risk factor in the US guidelines; many labs flag below 50 mg/dL (1.29 mmol/L) for women. Low HDL often travels with high triglycerides and insulin resistance." },
      { upTo: 59.99, name: "typical", tone: "ok", description: "40 to 59 mg/dL (1.03 to 1.53 mmol/L) is in the typical range. Raising HDL with drugs has not been shown to reduce heart attacks, so it is read as a marker rather than a target." },
      { upTo: Infinity, name: "high", tone: "ok", description: "60 mg/dL (1.55 mmol/L) and above is counted as protective in the US guidelines, although very high HDL has not been shown to add further benefit." },
    ],
  },
  nonhdl: {
    label: "Non-HDL cholesterol", inText: "non-HDL cholesterol", short: "Non-HDL", siUnit: "mmol/L", factor: 38.67, siDecimals: 2,
    example: { mg: "e.g. 150", si: "e.g. 3.9" },
    bar: { max: 250, zones: [{ from: 0, to: 130, tone: "ok" }, { from: 130, to: 160, tone: "ok" }, { from: 160, to: 190, tone: "warn" }, { from: 190, to: 250, tone: "bad" }] },
    bands: [
      { upTo: 129.99, name: "optimal", tone: "ok", description: "Below 130 mg/dL (3.36 mmol/L), which is 30 mg/dL above the optimal LDL line of 100 mg/dL. Non-HDL is total cholesterol minus HDL: it counts the cholesterol in every atherogenic particle, not just LDL." },
      { upTo: 159.99, name: "near optimal", tone: "ok", description: "130 to 159 mg/dL (3.36 to 4.11 mmol/L), the non-HDL equivalent of a near-optimal LDL." },
      { upTo: 189.99, name: "borderline high", tone: "warn", description: "160 to 189 mg/dL (4.14 to 4.89 mmol/L), the non-HDL equivalent of a borderline-high LDL. Useful when triglycerides are high, because LDL alone then understates risk." },
      { upTo: Infinity, name: "high", tone: "bad", description: "190 mg/dL (4.91 mmol/L) and above. Worth discussing with your clinician alongside LDL, triglycerides and your overall risk." },
    ],
  },
  tg: {
    label: "Triglycerides", inText: "triglycerides", short: "Triglycerides", siUnit: "mmol/L", factor: 88.57, siDecimals: 2,
    example: { mg: "e.g. 150", si: "e.g. 1.7" },
    bar: { max: 600, zones: [{ from: 0, to: 150, tone: "ok" }, { from: 150, to: 200, tone: "warn" }, { from: 200, to: 500, tone: "bad" }, { from: 500, to: 600, tone: "bad" }] },
    bands: [
      { upTo: 149.99, name: "normal", tone: "ok", description: "Below 150 mg/dL (1.69 mmol/L) is 'normal'. Triglycerides swing with your last meal and with alcohol, so a fasting sample reads lower than a non-fasting one." },
      { upTo: 199.99, name: "borderline high", tone: "warn", description: "150 to 199 mg/dL (1.69 to 2.25 mmol/L) is 'borderline high'. Refined carbohydrates, alcohol, weight and insulin resistance are the usual drivers." },
      { upTo: 499.99, name: "high", tone: "bad", description: "200 to 499 mg/dL (2.26 to 5.63 mmol/L) is 'high'. Worth discussing with your clinician, together with glucose and HbA1c." },
      { upTo: Infinity, name: "very high", tone: "bad", description: "500 mg/dL (5.65 mmol/L) and above is 'very high' and raises the risk of pancreatitis. Discuss this result with your clinician promptly." },
    ],
  },
  apob: {
    label: "ApoB", inText: "ApoB", short: "ApoB", siUnit: "g/L", factor: 100, siDecimals: 2,
    example: { mg: "e.g. 90", si: "e.g. 0.9" },
    bar: { max: 180, zones: [{ from: 0, to: 90, tone: "ok" }, { from: 90, to: 130, tone: "warn" }, { from: 130, to: 180, tone: "bad" }] },
    bands: [
      { upTo: 89.99, name: "below 90 mg/dL", tone: "ok", description: "Below 90 mg/dL (0.9 g/L). Targets depend on risk: the National Lipid Association uses 90, 70 and 60 mg/dL for borderline, high and very high risk, and European guidelines 100, 80 and 65 mg/dL for moderate, high and very high risk." },
      { upTo: 129.99, name: "intermediate", tone: "warn", description: "90 to 129 mg/dL (0.9 to 1.29 g/L): above the targets used for people at high risk, below the US risk-enhancer line. How much it matters depends on the rest of your risk profile." },
      { upTo: Infinity, name: "risk-enhancing", tone: "bad", description: "130 mg/dL (1.3 g/L) and above is a risk-enhancing factor in the 2018 AHA/ACC cholesterol guideline. Worth discussing with your clinician." },
    ],
  },
};

const ORDER: Key[] = ["tc", "ldl", "hdl", "nonhdl", "tg", "apob"];

export default function CholesterolConverter() {
  const [key, setKey] = useState<Key>("ldl");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<"mg" | "si">("mg");
  const a = ANALYTES[key];

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v) || v <= 0) return null;
    const mg = from === "mg" ? v : round(v * a.factor, 0);
    const out = from === "mg" ? round(v / a.factor, a.siDecimals) : round(v * a.factor, 0);
    const band = a.bands.find((b) => mg <= b.upTo) ?? a.bands[a.bands.length - 1];
    return { out, unit: from === "mg" ? a.siUnit : "mg/dL", mg, band };
  }, [value, from, a]);

  return (
    <Shell labelledBy="chol-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="chol-title">Cholesterol Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Marker"
            options={ORDER.map((k) => ({ key: k, label: ANALYTES[k].short }))}
            value={key}
            onChange={(v) => setKey(v as Key)}
          />
        </div>
        <div>
          <Toggle
            legend="Your result is in"
            options={[{ key: "mg", label: "mg/dL" }, { key: "si", label: a.siUnit }]}
            value={from}
            onChange={(v) => setFrom(v as typeof from)}
          />
        </div>

        <Fields cols="1">
          <Field
            label={a.label}
            unit={from === "mg" ? "mg/dL" : a.siUnit}
            placeholder={from === "mg" ? a.example.mg : a.example.si}
            value={value}
            onChange={setValue}
            inputId="chol-value"
            step="0.01"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>{a.label} in {result.unit}</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.out} <span className={s.unit}>{result.unit}</span>
              </div>
              <RangeBar min={0} max={a.bar.max} value={result.mg} tone={result.band.tone} zones={a.bar.zones} />
              <p className={s.resultText}>
                Factor used for {a.inText}:{" "}
                <strong>
                  1 {a.siUnit} = {a.factor} mg/dL
                </strong>
                . {key === "tg"
                  ? "Triglycerides use a different factor from cholesterol, because a triglyceride molecule is more than twice as heavy."
                  : key === "apob"
                    ? "ApoB is reported by mass in both systems, so the change is just a shift of the decimal point."
                    : "Total, LDL, HDL and non-HDL cholesterol all share this factor; triglycerides do not."}
              </p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Pick the marker, then enter it in the unit your lab used. US labs report lipids in mg/dL; the UK, Canada,
              Australia and most of Europe use mmol/L, and ApoB is often given in g/L. Each marker has its own factor,
              which is why one converter for &ldquo;cholesterol&rdquo; gets triglycerides wrong.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. Bands are the US adult categories (NCEP ATP III for the lipid panel, the
          2018 AHA/ACC risk-enhancer line for ApoB); your own targets depend on your overall cardiovascular risk, which
          is for your clinician to assess. Non-HDL bands are the LDL bands plus 30 mg/dL. Lp(a) has no exact conversion and is handled by its own converter.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}
