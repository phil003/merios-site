"use client";

import Image from "next/image";
import { useState } from "react";

/* Scan (Home2 "02"): the four reads as an accordion, and one phone that shows
   the open step's real app screen (v2 screens, example data). Every step's
   text stays in the HTML; closed panels are only hidden. */

type Step = {
  key: "scan" | "report" | "marker" | "bioage";
  tier: "plus" | "free";
  title: string;
  body: string;
  facts: [string, string][];
  img: string;
  alt: string;
};

const STEPS: Step[] = [
  {
    key: "scan",
    tier: "plus",
    title: "Scan any lab report.",
    body: "A photo or a PDF, from any lab. Every marker is read, placed in its range and tracked. Most reports read in under a minute, and nothing is saved until you check it.",
    facts: [["42", "values read"], ["2", "to check"], ["<1", "minute"]],
    img: "/images/v2/screens/scan-check.jpg",
    alt: "Merios check screen after a scan: 42 values read, 2 to check before saving.",
  },
  {
    key: "report",
    tier: "free",
    title: "Every marker, in its range.",
    body: "Your lab's own range, explained in plain words. Your value and its range stay free, on every report.",
    facts: [["162", "markers known"], ["$0", "value + range"]],
    img: "/images/v2/screens/blood-panel.jpg",
    alt: "Merios panel screen: 42 markers, 38 inside the lab’s ranges, grouped by system.",
  },
  {
    key: "marker",
    tier: "plus",
    title: "See what moved since last time.",
    body: "Each marker is followed report to report, so one result never stands alone. Improved or worse, said plainly.",
    facts: [["21 → 44", "ferritin, 3 reports"]],
    img: "/images/v2/screens/compare.jpg",
    alt: "Merios screen comparing LDL cholesterol across two panels, from 112 to 104 mg/dL.",
  },
  {
    key: "bioage",
    tier: "plus",
    title: "Your systems, and your biological age.",
    body: "Markers grouped into the systems they belong to, sorted by what changed. A biological age from PhenoAge, a published model that reads 9 standard markers. A way of reading your report, not a prediction.",
    facts: [["9", "markers · PhenoAge"], ["2018", "Levine et al."]],
    img: "/images/v2/screens/bio-age.jpg",
    alt: "Merios phenotypic age screen: 32.2 years, read from 9 markers of one draw.",
  },
];

export default function Scan() {
  const [step, setStep] = useState(0);

  return (
    <section id="scan" className="hv2-sec hv2-scan" aria-labelledby="scan-title">
      <div className="hv2-wrap hv2-scan__grid">
        <div className="hv2-scan__copy">
          <div className="hv2-before">
            <p className="hv2-label">Before Merios</p>
            <h2 className="hv2-before__h">5 PDFs. 3 portals. 2 forgotten passwords.</h2>
            <p>Every lab sends its own file, in its own format, behind its own login.</p>
          </div>

          <p className="hv2-eyebrow">02 · With Merios</p>
          <h2 className="hv2-h2" id="scan-title">
            Every report. <em>One place.</em>
          </h2>
          <p className="hv2-lead">
            One app reads all of them, then keeps every report on a single timeline.
          </p>

          <ol className="hv2-steps">
            {STEPS.map((s, i) => {
              const on = i === step;
              return (
                <li key={s.key} className={`hv2-step${on ? " is-on" : ""}`}>
                  <h3 className="hv2-step__h">
                    <button
                      type="button"
                      id={`hv2-step-${s.key}`}
                      className="hv2-step__btn"
                      aria-expanded={on}
                      aria-controls={`hv2-step-panel-${s.key}`}
                      onClick={() => setStep(i)}
                    >
                      <span className="hv2-step__n" aria-hidden="true">{`0${i + 1}`}</span>
                      <span className="hv2-step__t">{s.title}</span>
                      <span className={`hv2-tag hv2-tag--${s.tier}`}>
                        {s.tier === "plus" ? "Merios Plus" : "Free"}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`hv2-step-panel-${s.key}`}
                    role="region"
                    aria-labelledby={`hv2-step-${s.key}`}
                    className="hv2-step__panel"
                    hidden={!on}
                  >
                    <p>{s.body}</p>
                    <div className="hv2-step__facts">
                      {s.facts.map(([n, l]) => (
                        <span key={l} className="hv2-step__fact">
                          <b>{n}</b>
                          <span>{l}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="hv2-scan__stage">
          <span className="hv2-ripple hv2-ripple--1" aria-hidden="true" />
          <span className="hv2-ripple hv2-ripple--2" aria-hidden="true" />
          <span className="hv2-ripple hv2-ripple--3" aria-hidden="true" />
          <div className="hv2-phone">
            <div className="hv2-phone__screen">
              {STEPS.map((s, i) => (
                <Image
                  key={s.key}
                  src={s.img}
                  alt={i === step ? s.alt : ""}
                  aria-hidden={i === step ? undefined : true}
                  width={780}
                  height={1688}
                  sizes="(max-width: 760px) 72vw, 290px"
                  className={i === step ? "is-on" : undefined}
                />
              ))}
            </div>
          </div>
          <p className="hv2-scan__note">Example data</p>
        </div>
      </div>
    </section>
  );
}
