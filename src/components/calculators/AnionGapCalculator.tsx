"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Controls, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Serum anion gap calculator.
 *
 *   AG             = Na − (Cl + HCO3)              (mEq/L = mmol/L for these ions)
 *   AG with K      = Na + K − (Cl + HCO3)
 *   Albumin-corrected AG (Figge et al., Crit Care Med 1998;26:1807-10):
 *                  = AG + 2.5 × (4.0 − albumin g/dL)
 *                    (0.25 per g/L; Figge's paper uses the lab's "normal
 *                     albumin" — 4.0 g/dL is the commonly used value, some
 *                     sources use 4.4.)
 *
 * Reference intervals are analyzer-dependent (Kraut & Madias, Clin J Am Soc
 * Nephrol 2007;2:162-74): older flame-photometry references were about 8–16
 * mEq/L, modern ion-selective electrode analyzers typically give lower
 * values, commonly cited as about 3–10 or 4–12 mEq/L. The bands below are
 * deliberately broad and only orient the reader; the lab's own range wins.
 * Including potassium adds roughly 4 mEq/L, so the K bands are shifted by 4.
 */
export default function AnionGapCalculator() {
  const [na, setNa] = useState("");
  const [cl, setCl] = useState("");
  const [hco3, setHco3] = useState("");
  const [k, setK] = useState("");
  const [alb, setAlb] = useState("");
  const [withK, setWithK] = useState<"no" | "yes">("no");
  const [albUnit, setAlbUnit] = useState<"gdl" | "gl">("gdl");

  const result = useMemo(() => {
    const sodium = parseFloat(na);
    const chloride = parseFloat(cl);
    const bicarb = parseFloat(hco3);
    if (![sodium, chloride, bicarb].every((v) => Number.isFinite(v) && v > 0)) return null;
    let ag = sodium - (chloride + bicarb);
    if (withK === "yes") {
      const potassium = parseFloat(k);
      if (!Number.isFinite(potassium) || potassium <= 0) return null;
      ag += potassium;
    }
    const albRaw = parseFloat(alb);
    const albGdl = Number.isFinite(albRaw) && albRaw > 0 ? (albUnit === "gl" ? albRaw / 10 : albRaw) : null;
    const corrected = albGdl !== null ? ag + 2.5 * (4.0 - albGdl) : null;
    const shown = corrected ?? ag;
    return {
      ag: round(ag, 1),
      corrected: corrected !== null ? round(corrected, 1) : null,
      albGdl: albGdl !== null ? round(albGdl, 1) : null,
      band: band(shown, withK === "yes"),
    };
  }, [na, cl, hco3, k, alb, withK, albUnit]);

  const shift = withK === "yes" ? 4 : 0;
  const zones = ZONES.map((z) => ({ ...z, from: z.from + shift, to: z.to + shift }));
  const shownValue = result ? (result.corrected ?? result.ag) : 0;

  return (
    <Shell labelledBy="ag-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="ag-title">Anion gap from sodium, chloride and bicarbonate</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <Controls>
          <Toggle
            legend="Formula"
            options={[
              { key: "no", label: "Without potassium" },
              { key: "yes", label: "With potassium" },
            ]}
            value={withK}
            onChange={(v) => setWithK(v as "no" | "yes")}
          />
          <Toggle
            legend="Albumin units (optional)"
            options={[
              { key: "gdl", label: "g/dL" },
              { key: "gl", label: "g/L" },
            ]}
            value={albUnit}
            onChange={(v) => { setAlbUnit(v as "gdl" | "gl"); setAlb(""); }}
          />
        </Controls>

        <Fields cols="3">
          <Field label="Sodium (Na)" unit="mEq/L" placeholder="e.g. 140" value={na} onChange={setNa} inputId="ag-na" />
          <Field label="Chloride (Cl)" unit="mEq/L" placeholder="e.g. 104" value={cl} onChange={setCl} inputId="ag-cl" />
          <Field label="Bicarbonate (CO2)" unit="mEq/L" placeholder="e.g. 24" value={hco3} onChange={setHco3} inputId="ag-hco3" />
        </Fields>
        <Fields cols="2">
          {withK === "yes" && (
            <Field label="Potassium (K)" unit="mEq/L" placeholder="e.g. 4.2" value={k} onChange={setK} inputId="ag-k" />
          )}
          <Field
            label="Albumin, optional"
            unit={albUnit === "gdl" ? "g/dL" : "g/L"}
            placeholder={albUnit === "gdl" ? "e.g. 4.2" : "e.g. 42"}
            value={alb}
            onChange={setAlb}
            inputId="ag-alb"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>{result.corrected !== null ? "Albumin-corrected anion gap" : "Anion gap"}</span> —{" "}
                <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.corrected ?? result.ag}
                <span className={s.unitTight}> mEq/L</span>
              </div>
              {result.corrected !== null && (
                <div className={s.monoLine}>
                  Uncorrected: {result.ag} mEq/L · albumin {result.albGdl} g/dL
                </div>
              )}
              <RangeBar min={0} max={30 + shift} value={shownValue} tone={result.band.tone} zones={zones} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter sodium, chloride and bicarbonate from your basic or comprehensive metabolic panel. Bicarbonate is
              often printed as CO2 or total CO2. Add albumin, if your panel has it, to see the corrected gap.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          {withK === "yes" ? (
            <>
              <RefRow label="Low — most often low albumin or lab error" range="under 7" tone="warn" />
              <RefRow label="Typical with potassium (approximate)" range="7–16" tone="ok" />
              <RefRow label="Above typical modern range" range="16–20" tone="warn" />
              <RefRow label="High" range="above 20" tone="bad" />
            </>
          ) : (
            <>
              <RefRow label="Low — most often low albumin or lab error" range="under 3" tone="warn" />
              <RefRow label="Typical, modern analyzers" range="3–12" tone="ok" />
              <RefRow label="Above modern range, inside older 8–16" range="12–16" tone="warn" />
              <RefRow label="High" range="above 16" tone="bad" />
            </>
          )}
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. The anion gap is a calculated value, and its reference range depends on
          the analyzer: modern ion-selective electrode methods commonly give about 3–10 or 4–12 mEq/L, while older
          references quote 8–16. The bands shown are broad orientation only; compare against the range printed on
          your own report. Albumin correction uses Figge et al. (1998): corrected gap = gap + 2.5 × (4.0 − albumin in
          g/dL). An abnormal anion gap is interpreted by a clinician together with pH, bicarbonate, kidney function
          and the clinical picture.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale without potassium (presentation only — mirrors band()). Shifted +4 with K. */
const ZONES: Zone[] = [
  { from: 0, to: 3, tone: "warn" },
  { from: 3, to: 12, tone: "ok" },
  { from: 12, to: 16, tone: "warn" },
  { from: 16, to: 30, tone: "bad" },
];

function band(v: number, withK: boolean): { name: string; tone: Tone; description: string } {
  const x = withK ? v - 4 : v;
  if (x < 3) return {
    name: "Low", tone: "warn",
    description:
      "Below the usual range. A low anion gap most often reflects low albumin or a laboratory artifact rather than a disease of its own. Rarer causes include high levels of certain antibodies (paraproteins, as in multiple myeloma) and lithium or bromide exposure. A repeat test is the usual first step.",
  };
  if (x <= 12) return {
    name: "Within typical range", tone: "ok",
    description:
      "Within the range most modern analyzers report. A normal gap does not rule out every acid-base problem: low albumin can pull a raised gap back into the normal band, which is why entering albumin matters, and some acidoses (for example from diarrhea) keep the gap normal.",
  };
  if (x <= 16) return {
    name: "Mildly above modern range", tone: "warn",
    description:
      "Above the range most modern analyzers use, but inside the older 8–16 reference that some laboratories still print. Check your own lab's range first. Dehydration and lab variation can produce values here; on its own a mildly raised gap is a weak signal.",
  };
  return {
    name: "High", tone: "bad",
    description:
      "Above the usual range. A clearly raised anion gap is associated with metabolic acidosis from unmeasured acids, such as ketoacidosis, lactic acidosis, advanced kidney failure or certain toxins (for example methanol, ethylene glycol or large amounts of aspirin). It can also reflect lab error. A high value with symptoms, or a high value on a panel your clinician has not seen, deserves a prompt conversation with them.",
  };
}
