"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Iron unit converter — serum iron and TIBC (µg/dL ↔ µmol/L ↔ mg/dL) and
 * serum ferritin (ng/mL = µg/L ↔ pmol/L).
 *
 * Iron: molar mass 55.845 g/mol, so 1 µg/dL = 10 µg/L ÷ 55.845 = 0.1791 µmol/L
 * (inverse 5.585). Labcorp's SI conversion table rounds the factor to 0.179 for
 * both iron and TIBC (TIBC is expressed as the iron it can bind).
 * Ferritin: 1 ng/mL = 1 µg/L (Labcorp); 1 ng/mL = 2.247 pmol/L (GlobalRPh SI
 * table, based on a ferritin molecular weight of about 445 kDa).
 *
 * Bands are the adult values MedlinePlus lists (iron and TIBC: article 003489;
 * ferritin: article 003490). Labs differ; they are not diagnostic cut-offs.
 */
const FE = 10 / 55.845; // µmol/L per µg/dL ≈ 0.1791
const FERRITIN_PMOL = 2.247; // pmol/L per ng/mL

type Marker = "iron" | "tibc" | "ferritin";
type Unit = "ug" | "umol" | "mg" | "ng" | "ugl" | "pmol";
type Sex = "f" | "m";

const UNIT_LABEL: Record<Unit, string> = {
  ug: "µg/dL", umol: "µmol/L", mg: "mg/dL", ng: "ng/mL", ugl: "µg/L", pmol: "pmol/L",
};

const MARKER_LABEL: Record<Marker, string> = {
  iron: "Serum iron", tibc: "TIBC", ferritin: "Ferritin",
};

// MedlinePlus adult values, in µg/dL (iron, TIBC) or ng/mL (ferritin).
const RANGE: Record<Marker, Record<Sex, { lo: number; hi: number }>> = {
  iron: { f: { lo: 37, hi: 145 }, m: { lo: 59, hi: 158 } },
  tibc: { f: { lo: 149, hi: 492 }, m: { lo: 171, hi: 505 } },
  ferritin: { f: { lo: 13, hi: 150 }, m: { lo: 30, hi: 400 } },
};

const BAR_MAX: Record<Marker, number> = { iron: 250, tibc: 650, ferritin: 600 };

const SEX_LABEL: Record<Sex, string> = { f: "women", m: "men" };

export default function IronConverter() {
  const [marker, setMarker] = useState<Marker>("iron");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<Unit>("ug");
  const [sex, setSex] = useState<Sex>("f");

  const isFerritin = marker === "ferritin";

  function changeMarker(m: Marker) {
    setMarker(m);
    const nowFerritin = m === "ferritin";
    const wasFerritin = from === "ng" || from === "ugl" || from === "pmol";
    if (nowFerritin !== wasFerritin) {
      setFrom(nowFerritin ? "ng" : "ug");
      setValue("");
    }
  }

  const result = useMemo(() => {
    const v = parseFloat(value.replace(",", "."));
    if (!Number.isFinite(v) || v <= 0) return null;
    if (isFerritin) {
      const ng = from === "pmol" ? v / FERRITIN_PMOL : v; // ng/mL and µg/L are the same number
      const pmol = ng * FERRITIN_PMOL;
      return {
        base: ng,
        out: from === "pmol" ? round(ng, 1) : round(pmol, 0),
        unit: from === "pmol" ? "ng/mL" : "pmol/L",
        text: `That is ${round(ng, 1)} ng/mL, which is the same number in µg/L (${round(ng, 1)} µg/L), or ${round(pmol, 0)} pmol/L. ng/mL and µg/L are identical units; only pmol/L changes the number.`,
        band: band(marker, ng, sex),
      };
    }
    const ug = from === "ug" ? v : from === "umol" ? v / FE : v * 1000;
    const umol = ug * FE;
    const mg = ug / 1000;
    return {
      base: ug,
      out: from === "umol" ? round(ug, 0) : round(umol, 1),
      unit: from === "umol" ? "µg/dL" : "µmol/L",
      text: `That is ${round(ug, 0)} µg/dL (the same as mcg/dL), ${round(umol, 1)} µmol/L or ${round(mg, 3)} mg/dL. Multiply µg/dL by 0.1791 for µmol/L, or µmol/L by 5.585 for µg/dL.`,
      band: band(marker, ug, sex),
    };
  }, [value, from, sex, marker, isFerritin]);

  const r = RANGE[marker][sex];
  const zones: Zone[] = [
    { from: 0, to: r.lo, tone: "warn" },
    { from: r.lo, to: r.hi, tone: "ok" },
    { from: r.hi, to: BAR_MAX[marker], tone: "warn" },
  ];

  const unitOptions = isFerritin
    ? [
        { key: "ng", label: "ng/mL" },
        { key: "ugl", label: "µg/L" },
        { key: "pmol", label: "pmol/L" },
      ]
    : [
        { key: "ug", label: "µg/dL (mcg/dL)" },
        { key: "umol", label: "µmol/L" },
        { key: "mg", label: "mg/dL" },
      ];

  const placeholder = isFerritin
    ? from === "pmol" ? "e.g. 112" : "e.g. 50"
    : marker === "iron"
      ? from === "ug" ? "e.g. 90" : from === "umol" ? "e.g. 16" : "e.g. 0.09"
      : from === "ug" ? "e.g. 350" : from === "umol" ? "e.g. 63" : "e.g. 0.35";

  return (
    <Shell labelledBy="fe-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="fe-title">Iron Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Marker"
            options={[
              { key: "iron", label: "Serum iron" },
              { key: "tibc", label: "TIBC" },
              { key: "ferritin", label: "Ferritin" },
            ]}
            value={marker}
            onChange={(v) => changeMarker(v as Marker)}
          />
        </div>

        <div>
          <Toggle
            legend="Your result is in"
            options={unitOptions}
            value={from}
            onChange={(v) => setFrom(v as Unit)}
          />
        </div>

        <Fields cols="1">
          <Field
            label={MARKER_LABEL[marker]}
            unit={UNIT_LABEL[from]}
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            inputId="fe-value"
            step={from === "mg" ? "0.001" : from === "umol" ? "0.1" : "1"}
          />
        </Fields>

        <div>
          <Toggle
            legend="Compare with the adult range for"
            options={[
              { key: "f", label: "Women" },
              { key: "m", label: "Men" },
            ]}
            value={sex}
            onChange={(v) => setSex(v as Sex)}
          />
        </div>
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
              <RangeBar min={0} max={BAR_MAX[marker]} value={result.base} tone={result.band.tone} zones={zones} />
              <p className={s.resultText}>{result.text}</p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Pick the marker, then enter it in the unit your lab used. US labs report iron and TIBC in µg/dL
              (mcg/dL); labs in the UK, Europe, Canada and Australia use µmol/L, so the same iron reads 90 on one
              report and 16 on another. Ferritin is a different test and converts on its own scale.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. It converts units of the same test; it cannot turn serum iron into
          ferritin, which is a separate measurement. Ranges shown are the adult values listed by MedlinePlus; your
          lab&apos;s range may differ. Results are rounded (iron to 0.1 µmol/L), so they can differ from a lab printout
          by a decimal. Discuss any result outside your lab&apos;s range with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

function band(marker: Marker, base: number, sex: Sex): { name: string; tone: Tone; description: string } {
  const r = RANGE[marker][sex];
  const who = SEX_LABEL[sex];
  const unit = marker === "ferritin" ? "ng/mL" : "µg/dL";
  const lo = `${r.lo} ${unit}`;
  const hi = `${r.hi} ${unit}`;
  const desc: Record<Marker, { low: string; mid: string; high: string }> = {
    iron: {
      low: "A low serum iron may suggest low iron availability, but serum iron swings through the day, drops with inflammation or infection and rises after a meal or supplement. It is read with ferritin and transferrin saturation, not on its own.",
      mid: "A result in range is reassuring, but serum iron can be normal while stores (ferritin) are low. Iron and TIBC together give transferrin saturation, which says more than iron alone.",
      high: "A high serum iron can follow a recent iron supplement or a non-fasting draw. A persistently high value, especially with high transferrin saturation, is associated with iron overload and is worth repeating fasting and discussing with your clinician.",
    },
    tibc: {
      low: "A low TIBC is associated with inflammation, liver disease or protein loss, and is sometimes seen with iron overload. It is interpreted with serum iron and ferritin.",
      mid: "TIBC reflects how much transferrin is available to carry iron. In range, it is the denominator you need for transferrin saturation.",
      high: "A high TIBC often goes with low iron stores, because the body makes more transferrin when iron is short. Pregnancy and oral contraceptives can also raise it.",
    },
    ferritin: {
      low: "Low ferritin is associated with depleted iron stores, even when hemoglobin is still normal. Talk to your clinician before starting iron.",
      mid: "In range, but many clinicians consider ferritin below about 30 ng/mL to suggest low stores, and ferritin rises with inflammation, so a normal value does not always rule out deficiency.",
      high: "High ferritin can reflect inflammation, infection, liver disease or iron overload. Transferrin saturation helps tell these apart; discuss it with your clinician.",
    },
  };
  if (base < r.lo) return {
    name: `below the range for ${who}`, tone: "warn",
    description: `Below ${lo}, the lower limit MedlinePlus lists for adult ${who}. ${desc[marker].low}`,
  };
  if (base <= r.hi) return {
    name: `within the range for ${who}`, tone: "ok",
    description: `Between ${lo} and ${hi}, the adult range MedlinePlus lists for ${who}. ${desc[marker].mid}`,
  };
  return {
    name: `above the range for ${who}`, tone: "warn",
    description: `Above ${hi}, the upper limit MedlinePlus lists for adult ${who}. ${desc[marker].high}`,
  };
}
