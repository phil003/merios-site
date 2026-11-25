"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * DHEA unit converter — DHEA-S (µg/dL ↔ µmol/L ↔ µg/mL) and unconjugated
 * DHEA (ng/mL ↔ ng/dL ↔ nmol/L). Two different tests; never converts one
 * into the other.
 *
 * DHEA-S: molar mass 368.5 g/mol (PubChem CID 12594, C19H28O5S), so
 * 1 µg/dL = 10 µg/L ÷ 368.5 = 0.02714 µmol/L (inverse 36.85). Mayo Clinic
 * Laboratories' SI table rounds it to 0.027; Labcorp's SI table lists 0.026
 * (inverse 38). 1 µg/dL = 0.01 µg/mL = 10 ng/mL.
 * DHEA: molar mass 288.4 g/mol (PubChem CID 5881, C19H28O2), so
 * 1 ng/mL = 3.467 nmol/L (Mayo SI table: 3.467); 1 ng/dL = 0.03467 nmol/L
 * (Labcorp: 0.0347).
 *
 * Bands: Mayo Clinic Laboratories adult reference values, test DHES1
 * (DHEA-S, mcg/dL, by age and sex) and test DHEA_ (DHEA, ng/mL, upper limits
 * by age, no lower limit, not sex-specific; Mayo's first adult band is 19–30).
 * https://www.mayocliniclabs.com/test-catalog/overview/113595
 * https://www.mayocliniclabs.com/test-catalog/overview/81405
 * Labs differ; these are not diagnostic cut-offs.
 */
const DHEAS_UMOL = 10 / 368.5; // µmol/L per µg/dL ≈ 0.02714
const DHEA_NMOL = 1000 / 288.4; // nmol/L per ng/mL ≈ 3.467

type Test = "dheas" | "dhea";
type Unit = "ugdl" | "umol" | "ugml" | "ngml" | "ngdl" | "nmol";
type Sex = "f" | "m";
type Age = "18" | "31" | "41" | "51" | "61" | "71";

const UNIT_LABEL: Record<Unit, string> = {
  ugdl: "µg/dL", umol: "µmol/L", ugml: "µg/mL", ngml: "ng/mL", ngdl: "ng/dL", nmol: "nmol/L",
};

const AGE_LABEL: Record<Age, string> = {
  "18": "18–30", "31": "31–40", "41": "41–50", "51": "51–60", "61": "61–70", "71": "71+",
};

// Mayo Clinic Laboratories DHES1, adults, µg/dL (mcg/dL).
const DHEAS_RANGE: Record<Sex, Record<Age, { lo: number; hi: number }>> = {
  m: {
    "18": { lo: 105, hi: 728 }, "31": { lo: 57, hi: 522 }, "41": { lo: 34, hi: 395 },
    "51": { lo: 20, hi: 299 }, "61": { lo: 12, hi: 227 }, "71": { lo: 6.6, hi: 162 },
  },
  f: {
    "18": { lo: 83, hi: 377 }, "31": { lo: 45, hi: 295 }, "41": { lo: 27, hi: 240 },
    "51": { lo: 16, hi: 195 }, "61": { lo: 9.7, hi: 159 }, "71": { lo: 5.3, hi: 124 },
  },
};

// Mayo Clinic Laboratories DHEA_, adults, upper limit in ng/mL (19–30 <13 … ≥61 <5.0).
const DHEA_UPPER: Record<Age, { hi: number; label: string }> = {
  "18": { hi: 13, label: "19–30" }, "31": { hi: 10, label: "31–40" }, "41": { hi: 8, label: "41–50" },
  "51": { hi: 6, label: "51–60" }, "61": { hi: 5, label: "61 and older" }, "71": { hi: 5, label: "61 and older" },
};

const SEX_LABEL: Record<Sex, string> = { f: "women", m: "men" };

export default function DheaConverter() {
  const [test, setTest] = useState<Test>("dheas");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<Unit>("ugdl");
  const [sex, setSex] = useState<Sex>("f");
  const [age, setAge] = useState<Age>("31");

  const isS = test === "dheas";

  function changeTest(next: Test) {
    if (next === test) return;
    setTest(next);
    setFrom(next === "dheas" ? "ugdl" : "ngml");
    setValue("");
  }

  const result = useMemo(() => {
    const v = parseFloat(value.replace(",", "."));
    if (!Number.isFinite(v) || v <= 0) return null;
    if (isS) {
      const ug = from === "ugdl" ? v : from === "umol" ? v / DHEAS_UMOL : v * 100;
      const umol = ug * DHEAS_UMOL;
      const ugml = ug / 100;
      return {
        base: ug,
        out: from === "umol" ? round(ug, 0) : round(umol, 2),
        unit: from === "umol" ? "µg/dL" : "µmol/L",
        text: `That is ${round(ug, 1)} µg/dL (the same as mcg/dL), ${round(umol, 2)} µmol/L, ${round(ugml, 3)} µg/mL or ${round(ug * 10, 0)} ng/mL. Multiply µg/dL by 0.02714 for µmol/L, or µmol/L by 36.85 for µg/dL.`,
        check: checkS(from, v, ug),
        band: bandS(ug, sex, age),
      };
    }
    const ng = from === "ngml" ? v : from === "ngdl" ? v / 100 : v / DHEA_NMOL;
    const nmol = ng * DHEA_NMOL;
    return {
      base: ng,
      out: from === "nmol" ? round(ng, 2) : round(nmol, 1),
      unit: from === "nmol" ? "ng/mL" : "nmol/L",
      text: `That is ${round(ng, 2)} ng/mL, ${round(ng * 100, 0)} ng/dL or ${round(nmol, 1)} nmol/L. Multiply ng/mL by 3.467 for nmol/L, or ng/dL by 0.03467.`,
      check: checkD(ng),
      band: bandD(ng, age),
    };
  }, [value, from, sex, age, isS]);

  const barMax = isS ? 800 : 20;
  const zones: Zone[] = isS
    ? [
        { from: 0, to: DHEAS_RANGE[sex][age].lo, tone: "warn" },
        { from: DHEAS_RANGE[sex][age].lo, to: DHEAS_RANGE[sex][age].hi, tone: "ok" },
        { from: DHEAS_RANGE[sex][age].hi, to: barMax, tone: "warn" },
      ]
    : [
        { from: 0, to: DHEA_UPPER[age].hi, tone: "ok" },
        { from: DHEA_UPPER[age].hi, to: barMax, tone: "warn" },
      ];

  const unitOptions = isS
    ? [
        { key: "ugdl", label: "µg/dL (mcg/dL)" },
        { key: "umol", label: "µmol/L" },
        { key: "ugml", label: "µg/mL" },
      ]
    : [
        { key: "ngml", label: "ng/mL" },
        { key: "ngdl", label: "ng/dL" },
        { key: "nmol", label: "nmol/L" },
      ];

  const placeholder = isS
    ? from === "ugdl" ? "e.g. 200" : from === "umol" ? "e.g. 5.4" : "e.g. 2.0"
    : from === "ngml" ? "e.g. 4" : from === "ngdl" ? "e.g. 400" : "e.g. 14";

  return (
    <Shell labelledBy="dhea-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="dhea-title">DHEA Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Test on your report"
            options={[
              { key: "dheas", label: "DHEA-S (DHEA sulfate)" },
              { key: "dhea", label: "DHEA" },
            ]}
            value={test}
            onChange={(v) => changeTest(v as Test)}
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
            label={isS ? "DHEA-S" : "DHEA"}
            unit={UNIT_LABEL[from]}
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            inputId="dhea-value"
            step={from === "ugdl" || from === "ngdl" ? "1" : "0.01"}
          />
        </Fields>

        <div>
          <Toggle
            legend="Age"
            options={(Object.keys(AGE_LABEL) as Age[]).map((k) => ({ key: k, label: AGE_LABEL[k] }))}
            value={age}
            onChange={(v) => setAge(v as Age)}
          />
        </div>

        {isS && (
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
        )}
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Same result in {result.unit}</span> <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.out} <span className={s.unit}>{result.unit}</span>
              </div>
              <RangeBar min={0} max={barMax} value={result.base} tone={result.band.tone} zones={zones} />
              <p className={s.resultText}>{result.text}</p>
              {result.check && <p className={s.resultText}><strong>Unit check:</strong> {result.check}</p>}
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              First pick the test printed on your report. Most panels measure DHEA-S (DHEA sulfate), reported in
              µg/dL in the US and µmol/L in the UK, Europe, Canada and Australia. Plain DHEA is a separate test,
              usually in ng/mL or ng/dL, with numbers hundreds of times smaller. The two never convert into each
              other.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. It converts units of the same test; it cannot turn DHEA into DHEA-S or
          the reverse. Ranges shown are the adult reference values published by Mayo Clinic Laboratories; your
          lab&apos;s range may differ, and some labs use a factor of 0.026 instead of 0.027 for DHEA-S. Results are
          rounded. Discuss any result outside your lab&apos;s range with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Flags entries that look like the wrong test or unit (values far outside any adult range). */
function checkS(from: Unit, v: number, ug: number): string | null {
  if (from === "umol" && v > 30) {
    return `${v} µmol/L would be ${round(ug, 0)} µg/dL, far above any adult DHEA-S range. If your report says µg/dL or mcg/dL, switch the unit above.`;
  }
  if (from === "ugdl" && v < 5) {
    return `${v} µg/dL is lower than any adult DHEA-S range Mayo lists. Check whether your report is in µmol/L, or whether the test is plain DHEA in ng/mL, which uses much smaller numbers.`;
  }
  return null;
}

function checkD(ng: number): string | null {
  if (ng > 50) {
    return `${round(ng, 1)} ng/mL is far above the adult DHEA range Mayo lists. Numbers in the hundreds are typical of DHEA-S in µg/dL, a different test; check the test name on your report and switch to DHEA-S above if needed.`;
  }
  return null;
}

function bandS(ug: number, sex: Sex, age: Age): { name: string; tone: Tone; description: string } {
  const r = DHEAS_RANGE[sex][age];
  const who = `${SEX_LABEL[sex]} aged ${AGE_LABEL[age]}`;
  const span = `${r.lo}–${r.hi} µg/dL (${round(r.lo * DHEAS_UMOL, 2)}–${round(r.hi * DHEAS_UMOL, 2)} µmol/L)`;
  if (ug < r.lo) return {
    name: `below the range for ${who}`, tone: "warn",
    description: `Below ${span}, the range Mayo Clinic Laboratories lists for ${who}. Lower DHEA-S is common with age and with glucocorticoid medicines; low values are also associated with adrenal or pituitary conditions, which clinicians assess with other tests.`,
  };
  if (ug <= r.hi) return {
    name: `within the range for ${who}`, tone: "ok",
    description: `Within ${span}, the range Mayo Clinic Laboratories lists for ${who}. DHEA-S ranges are wide and fall with each decade, so the age band matters more than for most markers.`,
  };
  return {
    name: `above the range for ${who}`, tone: "warn",
    description: `Above ${span}, the range Mayo Clinic Laboratories lists for ${who}. A DHEA or DHEA-S supplement can raise it; higher values are also associated with polycystic ovary syndrome, congenital adrenal hyperplasia and adrenal tumors. Worth discussing with your clinician.`,
  };
}

function bandD(ng: number, age: Age): { name: string; tone: Tone; description: string } {
  const u = DHEA_UPPER[age];
  const lim = `${u.hi} ng/mL (${round(u.hi * DHEA_NMOL, 1)} nmol/L)`;
  if (ng < u.hi) return {
    name: `below the upper limit for ages ${u.label}`, tone: "ok",
    description: `Below ${lim}, the upper limit Mayo Clinic Laboratories lists for adults aged ${u.label}. Mayo gives only an upper limit for DHEA, not a lower one, and the same values for women and men.`,
  };
  return {
    name: `above the upper limit for ages ${u.label}`, tone: "warn",
    description: `At or above ${lim}, the upper limit Mayo Clinic Laboratories lists for adults aged ${u.label}. A DHEA supplement is a common reason; persistently high values are worth discussing with your clinician, often alongside a DHEA-S test.`,
  };
}
