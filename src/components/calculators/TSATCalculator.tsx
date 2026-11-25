"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Transferrin saturation (TSAT) calculator.
 *
 *   TSAT (%) = serum iron / TIBC × 100        (both µg/dL)
 *   TIBC     = serum iron + UIBC              (µg/dL)
 *   TIBC     = transferrin (g/L) × 125        (µg/dL)
 *              (1 mg/dL of transferrin binds ~1.25 µg/dL of iron, and
 *               1 g/L = 100 mg/dL, so the g/L factor is 125 — not 25.2,
 *               which is a figure that circulates online and produces
 *               physiologically impossible saturations above 100%.)
 *
 * Units: serum iron / TIBC / UIBC may be entered in µg/dL (US) or µmol/L (SI). Iron and TIBC share the
 * factor 1 µg/dL = 0.1791 µmol/L (molar mass of iron 55.845 g/mol), so µmol/L × 5.585 = µg/dL. The ratio is
 * unit-independent when iron and TIBC use the same unit; the conversion only matters for the transferrin path.
 *
 * Bands (all sources fetched 2026-11-23):
 *  - Adult reference: men 20–50%, women 15–45% — MedlinePlus
 *    https://medlineplus.gov/ency/article/003489.htm and https://medlineplus.gov/ency/article/003488.htm
 *  - Above 45%: ACG Clinical Guideline: Hereditary Hemochromatosis (Kowdley et al., Am J Gastroenterol 2019;
 *    114:1202–1218): TS > 45% identifies 97.9–100% of C282Y homozygotes; HFE testing when TS ≥ 45% and ferritin
 *    elevated. https://www.thebloodproject.com/wp-content/uploads/2021/10/HH_ACG.pdf
 *  - Below 20%: used as iron-deficiency criterion with ferritin 100–299 ng/mL in heart failure (JACC 2022;79:341–351,
 *    https://pubmed.ncbi.nlm.nih.gov/35086656/).
 * The earlier "25–35% comfortable band" and "20–25% borderline" were unsourced and were removed.
 *
 * Source for formula: StatPearls, "Iron-Binding Capacity", NCBI Bookshelf NBK559119.
 *
 * Real US panels report iron alongside *one* of TIBC, UIBC or transferrin
 * depending on the lab, so all three input paths are supported. Competing
 * calculators generally handle only the TIBC path, which is the reason a
 * reader with a UIBC-style report cannot use them.
 */
export default function TSATCalculator() {
  const [iron, setIron] = useState("");
  const [second, setSecond] = useState("");
  const [mode, setMode] = useState<"tibc" | "uibc" | "transferrin">("tibc");
  const [unit, setUnit] = useState<"ugdl" | "umol">("ugdl");

  const result = useMemo(() => {
    const k = unit === "umol" ? 5.585 : 1; // µmol/L → µg/dL
    const fe = parseFloat(iron) * k;
    const raw = parseFloat(second);
    if (!Number.isFinite(fe) || !Number.isFinite(raw) || fe <= 0 || raw <= 0) return null;
    let tibc: number; // µg/dL
    if (mode === "tibc") tibc = raw * k;
    else if (mode === "uibc") tibc = fe + raw * k;
    else tibc = raw * 125; // transferrin g/L → TIBC µg/dL (1.25 µg per mg/dL)
    if (tibc <= 0) return null;
    const tsat = (fe / tibc) * 100;
    const shown = unit === "umol" ? round(tibc * 0.1791, 1) : round(tibc, 0);
    return { tsat: round(tsat, 1), tibc: shown, band: band(tsat) };
  }, [iron, second, mode, unit]);

  const secondLabel =
    mode === "tibc" ? "TIBC" : mode === "uibc" ? "UIBC" : "Transferrin";
  const ironUnit = unit === "umol" ? "µmol/L" : "µg/dL";
  const secondUnit = mode === "transferrin" ? "g/L" : ironUnit;
  const um = unit === "umol";
  const secondPlaceholder =
    mode === "tibc" ? (um ? "e.g. 57" : "e.g. 320") : mode === "uibc" ? (um ? "e.g. 41" : "e.g. 230") : "e.g. 2.6";

  return (
    <Shell labelledBy="tsat-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="tsat-title">Transferrin saturation from serum iron and TIBC</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="What your lab reported alongside iron"
            options={[
              { key: "tibc", label: "TIBC" },
              { key: "uibc", label: "UIBC" },
              { key: "transferrin", label: "Transferrin" },
            ]}
            value={mode}
            onChange={(v) => { setMode(v as typeof mode); setSecond(""); }}
          />
        </div>

        <div>
          <Toggle
            legend="Units on your report"
            options={[
              { key: "ugdl", label: "µg/dL (US)" },
              { key: "umol", label: "µmol/L (SI)" },
            ]}
            value={unit}
            onChange={(v) => { setUnit(v as typeof unit); setIron(""); setSecond(""); }}
          />
        </div>

        <Fields>
          <Field label="Serum iron" unit={ironUnit} placeholder={um ? "e.g. 16" : "e.g. 90"} value={iron} onChange={setIron} inputId="tsat-iron" />
          <Field label={secondLabel} unit={secondUnit} placeholder={secondPlaceholder} value={second} onChange={setSecond} inputId="tsat-second" />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Transferrin saturation</span> <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.tsat}<span className={s.unitTight}>%</span></div>
              {mode !== "tibc" && (
                <div className={s.monoLine}>
                  Derived TIBC: {result.tibc} {unit === "umol" ? "µmol/L" : "µg/dL"}
                </div>
              )}
              <RangeBar min={0} max={70} value={result.tsat} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter serum iron plus whichever second value your panel reports. Labs differ: some print TIBC, some
              UIBC, some transferrin. Switch the toggle to match your report rather than converting by hand.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Adult men, reference range" range="20–50%" tone="ok" />
          <RefRow label="Adult women, reference range" range="15–45%" tone="ok" />
          <RefRow label="Below range — iron deficiency context" range="under 20% (men) · 15% (women)" tone="bad" />
          <RefRow label="Hemochromatosis work-up threshold" range="above 45%" tone="warn" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. TSAT is interpreted alongside ferritin, not instead of it — ferritin rises
          with inflammation and can look normal while iron stores are genuinely low, which is exactly when TSAT is most
          useful. A persistently high TSAT, particularly above 45%, is the threshold the ACG hereditary hemochromatosis
          guideline uses to prompt further testing. MedlinePlus lists 20 to 50 percent for adult men and 15 to 45
          percent for adult women. Reference intervals vary between laboratories; compare against the range printed
          on your report.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale (presentation only — mirrors the bands in band()). */
const ZONES: Zone[] = [
  { from: 0, to: 15, tone: "bad" },
  { from: 15, to: 20, tone: "warn" },
  { from: 20, to: 45, tone: "ok" },
  { from: 45, to: 70, tone: "warn" },
];

function band(t: number): { name: string; tone: Tone; description: string } {
  if (t < 15) return {
    name: "Low", tone: "bad",
    description:
      "Below the adult reference range for both men and women (MedlinePlus). A low saturation is associated with iron deficiency and can appear before hemoglobin falls. Worth reading together with ferritin and a full blood count.",
  };
  if (t < 20) return {
    name: "Below the male range", tone: "warn",
    description:
      "Under the 20% lower limit MedlinePlus lists for men and inside the 15 to 45% range it lists for women. On its own this is not diagnostic; it may suggest low iron supply when it comes with low-normal ferritin or symptoms.",
  };
  if (t <= 45) return {
    name: "Within typical range", tone: "ok",
    description:
      "Inside the adult reference ranges (men 20 to 50%, women 15 to 45%). TSAT reflects how much of your iron-carrying capacity is in use, which is why it can show something ferritin alone hides.",
  };
  if (t <= 50) return {
    name: "Upper end", tone: "warn",
    description:
      "Above 45%, the level the ACG hereditary hemochromatosis guideline uses to prompt further testing, though still inside the 20 to 50% range MedlinePlus lists for men. A repeat fasting sample is the usual next step, since iron supplements or a non-fasting draw can raise it.",
  };
  return {
    name: "High", tone: "warn",
    description:
      "Above the adult reference ranges. A TSAT above 45% that persists on a repeat fasting sample is associated with iron overload, including hereditary hemochromatosis, and is worth discussing with a clinician. Recent iron supplements or a non-fasting draw can also raise it.",
  };
}
