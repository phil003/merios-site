"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, UnitText, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Albumin unit converter — serum or plasma albumin, g/dL ↔ g/L ↔ mg/dL ↔ µmol/L.
 *
 * Mass units are exact: 1 g/dL = 10 g/L = 1,000 mg/dL = 10,000 mg/L.
 * µmol/L depends on the molar mass used. The mature human serum albumin chain
 * (UniProt P02768, residues 25–609, 585 amino acids) weighs 66,472 Da from its
 * sequence, 66,438 Da once its 17 disulfide bonds are formed; we use 66,438 g/mol:
 * 1 g/L = 15.05 µmol/L, 1 g/dL = 150.5 µmol/L. References that use 66,500
 * (as the free testosterone calculator does) differ by about 0.1%.
 *
 * Bands follow MedlinePlus ("Albumin blood (serum) test"): normal range
 * 3.4 to 5.4 g/dL (34 to 54 g/L); ranges vary by lab.
 */
const MOLAR_MASS = 66438; // g/mol
const UMOL_PER_GL = 1e6 / MOLAR_MASS; // ≈ 15.05 µmol/L per g/L

type Unit = "gdl" | "gl" | "mgdl" | "umol";

const UNIT_LABEL: Record<Unit, string> = { gdl: "g/dL", gl: "g/L", mgdl: "mg/dL", umol: "µmol/L" };
const PLACEHOLDER: Record<Unit, string> = { gdl: "e.g. 4.2", gl: "e.g. 42", mgdl: "e.g. 4200", umol: "e.g. 632" };

export default function AlbuminConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<Unit>("gdl");

  const result = useMemo(() => {
    const v = parseFloat(value.replace(",", "."));
    if (!Number.isFinite(v) || v <= 0) return null;
    const gl = from === "gdl" ? v * 10 : from === "gl" ? v : from === "mgdl" ? v / 100 : v / UMOL_PER_GL;
    const gdl = gl / 10;
    const mgdl = gdl * 1000;
    const mgl = gl * 1000;
    const umol = gl * UMOL_PER_GL;
    // Headline: the unit people most often need from the one they have.
    const main =
      from === "gdl"
        ? { out: round(gl, 1), unit: "g/L" }
        : { out: round(gdl, 2), unit: "g/dL" };
    return { ...main, gdl, gl, mgdl, mgl, umol, band: bandFromGdl(gdl) };
  }, [value, from]);

  return (
    <Shell labelledBy="alb-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="alb-title">Albumin Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your result is in"
            options={[
              { key: "gdl", label: "g/dL" },
              { key: "gl", label: "g/L" },
              { key: "mgdl", label: "mg/dL" },
              { key: "umol", label: "µmol/L" },
            ]}
            value={from}
            onChange={(v) => setFrom(v as Unit)}
          />
        </div>

        <Fields cols="1">
          <Field
            label="Albumin (serum or plasma)"
            unit={UNIT_LABEL[from]}
            placeholder={PLACEHOLDER[from]}
            value={value}
            onChange={setValue}
            inputId="alb-value"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Same result in <UnitText>{result.unit}</UnitText></span> <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.out} <span className={s.unit}>{result.unit}</span>
              </div>
              <RangeBar min={1} max={7} value={result.gdl} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>
                That is <strong>{round(result.gdl, 2)}&nbsp;g/dL</strong>, <strong>{round(result.gl, 1)}&nbsp;g/L</strong>,{" "}
                <strong>{Math.round(result.mgdl).toLocaleString("en-US")}&nbsp;mg/dL</strong>{" "}
                ({Math.round(result.mgl).toLocaleString("en-US")}&nbsp;mg/L) or about{" "}
                <strong>{Math.round(result.umol).toLocaleString("en-US")}&nbsp;µmol/L</strong>. The mass units are exact;
                µmol/L assumes a molar mass of 66,438&nbsp;g/mol, so a lab using 66,500 or 69,000 will print a slightly
                different number.
              </p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your albumin result in the unit your lab used. US labs report g/dL (around 4); labs in the UK,
              Europe and Australia report g/L (around 40), so the same level reads 4.2 on one report and 42 on another.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. It converts <strong>blood (serum or plasma) albumin</strong>. Urine albumin
          and the urine albumin-to-creatinine ratio (UACR) are a different test, reported in mg/L or mg/g, and are not
          converted here. Reference ranges vary by lab; read your result against the range printed on your own report
          and discuss it with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale in g/dL (presentation only — mirrors bandFromGdl). */
const ZONES: Zone[] = [
  { from: 1, to: 2.5, tone: "bad" },
  { from: 2.5, to: 3.4, tone: "warn" },
  { from: 3.4, to: 5.4, tone: "ok" },
  { from: 5.4, to: 7, tone: "warn" },
];

function bandFromGdl(gdl: number): { name: string; tone: Tone; description: string } {
  if (gdl < 2.5) return {
    name: "well below the usual range", tone: "bad",
    description:
      "Below about 2.5 g/dL (25 g/L) is well under the 3.4 g/dL lower limit MedlinePlus lists. Low albumin is associated with liver disease, kidney disease (including protein loss in the urine), inflammation, and poor nutrient intake or absorption. It is a result to review with your clinician rather than to act on alone.",
  };
  if (gdl < 3.4) return {
    name: "below the usual range", tone: "warn",
    description:
      "Below 3.4 g/dL (34 g/L) sits under the lower limit MedlinePlus lists, although some labs start their range at 3.5 g/dL. A mildly low albumin is associated with inflammation or acute illness, liver or kidney disease and low protein intake, and it is usually read together with the rest of the panel.",
  };
  if (gdl <= 5.4) return {
    name: "within the usual range", tone: "ok",
    description:
      "3.4 to 5.4 g/dL (34 to 54 g/L) is the normal range MedlinePlus lists; many labs print a tighter 3.5 to 5.0 g/dL. Check the range on your own report, since methods and populations differ between labs.",
  };
  return {
    name: "above the usual range", tone: "warn",
    description:
      "Above 5.4 g/dL (54 g/L) is uncommon. A high albumin most often reflects dehydration, and it can also follow a high-protein diet or a tourniquet left on too long during the blood draw. It is usually rechecked rather than read on its own.",
  };
}
