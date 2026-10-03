"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Arrow } from "./icons";

/* The lab report translator: a real-looking report, each line clickable,
   read back in plain English on the lilac sticker. Example data. */

type Row = {
  id: string;
  name: string;
  res: string;
  flag: "" | "H" | "L";
  unit: string;
  ref: string;
  lo: number;
  hi: number;
  v: number;
  d0: number;
  d1: number;
  log?: boolean;
  openLo?: boolean;
  openHi?: boolean;
  plain: string;
  why: string;
};
type Item = { sec: string } | Row;

const LAB: Item[] = [
  { sec: "IRON STATUS / VITAMINS" },
  { id: "iron", name: "Iron, total", res: "71", flag: "", unit: "ug/dL", ref: "38–169", lo: 38, hi: 169, v: 71, d0: 0, d1: 250,
    plain: "Iron in your blood today, in range.", why: "It moves with your last meals, so it says less about your reserves than ferritin does." },
  { id: "ferritin", name: "Ferritin", res: "21", flag: "L", unit: "ng/mL", ref: "30–400", lo: 30, hi: 400, v: 21, d0: 5, d1: 700, log: true,
    plain: "Iron stores on the low side.", why: "Ferritin reflects the iron your body keeps in reserve. Low stores are often linked to feeling tired." },
  { id: "vitd", name: "Vitamin D, 25-OH", res: "22.4", flag: "L", unit: "ng/mL", ref: "30–100", lo: 30, hi: 100, v: 22.4, d0: 0, d1: 120,
    plain: "Vitamin D, under the lab’s range.", why: "Your skin makes it from sunlight, which is why it often tracks the time you spend outdoors." },
  { id: "b12", name: "Vitamin B12", res: "388", flag: "", unit: "pg/mL", ref: "232–1245", lo: 232, hi: 1245, v: 388, d0: 0, d1: 1500,
    plain: "Vitamin B12, comfortably in range.", why: "B12 helps your body make red blood cells and keeps nerves working." },
  { sec: "LIPIDS" },
  { id: "apob", name: "Apolipoprotein B", res: "96", flag: "H", unit: "mg/dL", ref: "<90", lo: 0, hi: 90, v: 96, d0: 0, d1: 150, openLo: true,
    plain: "Cholesterol carriers, just above the range.", why: "ApoB counts the particles that carry cholesterol, not just the cholesterol inside them." },
  { id: "hdl", name: "HDL cholesterol", res: "58", flag: "", unit: "mg/dL", ref: ">39", lo: 39, hi: 120, v: 58, d0: 0, d1: 120, openHi: true,
    plain: "Protective cholesterol, in range.", why: "HDL helps carry cholesterol away from your arteries, back to the liver." },
  { sec: "CBC" },
  { id: "mchc", name: "MCHC", res: "33.6", flag: "", unit: "g/dL", ref: "31.5–35.7", lo: 31.5, hi: 35.7, v: 33.6, d0: 29, d1: 38,
    plain: "How packed your red cells are with hemoglobin.", why: "In range. It is one line of a standard blood count." },
  { sec: "METABOLIC / THYROID" },
  { id: "glucose", name: "Glucose, fasting", res: "94", flag: "", unit: "mg/dL", ref: "70–99", lo: 70, hi: 99, v: 94, d0: 50, d1: 140,
    plain: "Fasting blood sugar, in range.", why: "Measured after a night without food, so it reflects your baseline rather than your last meal." },
  { id: "tsh", name: "TSH", res: "2.41", flag: "", unit: "mIU/L", ref: "0.45–4.50", lo: 0.45, hi: 4.5, v: 2.41, d0: 0, d1: 6,
    plain: "Your thyroid’s control signal, in range.", why: "TSH is the message your brain sends to your thyroid. In range means that conversation looks typical." },
  { id: "egfr", name: "eGFR", res: "104", flag: "", unit: "mL/min/1.73m²", ref: ">59", lo: 59, hi: 140, v: 104, d0: 0, d1: 140, openHi: true,
    plain: "How well your kidneys filter, in range.", why: "An estimate of filtering, calculated from creatinine, age and sex." },
];
const ROWS = LAB.filter((r): r is Row => "id" in r);
const AUTOPLAY = ["ferritin", "vitd", "apob", "mchc", "tsh", "hdl", "egfr", "iron"];
const TICKER = ["MCHC", "eGFR", "ApoB", "HbA1c", "TSH", "hs-CRP", "Lp(a)", "RDW", "ALT", "AST", "Ferritin", "25-OH D", "HDL-C", "LDL-C", "MCV", "GGT", "TIBC", "Free T4", "BUN", "Albumin"];
const SCRAMBLE = "ABCDEFGHKLMNPRSTUVXZ0123456789·";

const pos = (r: Row, x: number) => {
  const t = r.log
    ? (Math.log(x) - Math.log(r.d0)) / (Math.log(r.d1) - Math.log(r.d0))
    : (x - r.d0) / (r.d1 - r.d0);
  return Math.min(1, Math.max(0, t)) * 100;
};

function readout(r: Row) {
  const inRange = r.openLo ? r.v < r.hi : r.openHi ? r.v > r.lo : r.v >= r.lo && r.v <= r.hi;
  const lab = r.openLo
    ? `Lab range under ${r.hi} ${r.unit}`
    : r.openHi
      ? `Lab range over ${r.lo} ${r.unit}`
      : `Lab range ${r.ref} ${r.unit}`;
  const bandL = r.openLo ? 0 : pos(r, r.lo);
  const bandR = r.openHi ? 100 : pos(r, r.hi);
  return { inRange, lab, bandL, bandW: bandR - bandL, dot: pos(r, r.v) };
}

export default function Translator() {
  const [active, setActive] = useState("ferritin");
  const [live, setLive] = useState(false);
  const plainRef = useRef<HTMLParagraphElement>(null);
  const whyRef = useRef<HTMLParagraphElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tookOver = useRef(false);
  const firstRender = useRef(true);

  const row = ROWS.find((r) => r.id === active)!;
  const ro = readout(row);

  // the plain-English line scrambles into place; the why fades up
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const plain = plainRef.current;
    const why = whyRef.current;
    const sticker = stickerRef.current;
    if (!plain || !why || !sticker) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      plain.textContent = row.plain;
      why.textContent = row.why;
      return;
    }
    sticker.classList.add("is-bump");
    const bump = requestAnimationFrame(() => requestAnimationFrame(() => sticker.classList.remove("is-bump")));
    why.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 500, delay: 250, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "backwards" },
    );
    why.textContent = row.why;
    const target = row.plain;
    const start = performance.now();
    const dur = 750;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const shown = Math.floor(Math.max(0, t - 0.12) / 0.88 * target.length);
      let s = target.slice(0, shown);
      for (let i = shown; i < target.length; i++) {
        s += target[i] === " " ? " " : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
      }
      plain.textContent = t >= 1 ? target : s;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(bump);
    };
  }, [row]);

  const takeOver = useCallback(() => {
    if (!tookOver.current) {
      tookOver.current = true;
      setLive(true);
    }
  }, []);

  // autoplay while the report is on screen, until someone takes over
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = false;
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
      },
      { rootMargin: "-30% 0px -20% 0px" },
    );
    io.observe(section);
    const timer = window.setInterval(() => {
      if (!inView || document.hidden || tookOver.current) return;
      setActive((cur) => AUTOPLAY[(Math.max(0, AUTOPLAY.indexOf(cur)) + 1) % AUTOPLAY.length]);
    }, 3600);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const hoverTimer = useRef(0);
  const choose = (id: string) => {
    takeOver();
    setActive(id);
  };

  return (
    <section
      ref={sectionRef}
      id="translate"
      className="hv3-translate"
      data-stage="lime"
      aria-labelledby="translate-title"
    >
      <div className="hv3-ticker" aria-hidden>
        <div className="hv3-ticker__track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={`${t}-${i}`}>{t}</span>
          ))}
        </div>
      </div>

      <div className="hv3-wrap hv3-translate__grid">
        <div className="hv3-translate__copy" data-rv="">
          <span className="hv3-pill">
            Lab report <Arrow width={16} /> plain English
          </span>
          <h2 className="hv3-h2" id="translate-title">
            Your lab report wasn&rsquo;t written for you.
          </h2>
          <p className="lead">
            It was written for your doctor, then it landed in your inbox.
            Merios reads every line and says what it means, against your
            lab&rsquo;s own range.
          </p>
          <div className="hv3-flags" aria-hidden>
            <span className="hv3-flag">
              <i className="is-h">H</i>means high
            </span>
            <span className="hv3-flag">
              <i className="is-l">L</i>means low
            </span>
            <span className="hv3-flag">Not every line is a flag</span>
          </div>
          <div className="hv3-hint" aria-hidden>
            <span className="hv3-hand">tap any line</span>
            <svg width="74" height="40" viewBox="0 0 74 40" focusable="false">
              <path d="M3 8 C 22 2, 44 6, 66 28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M52 27 L67 29 L64 15" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="hv3-desk">
          <div data-rv="" style={{ "--rv-delay": "0.1s" } as CSSProperties}>
            <div className="hv3-paper">
              <div className="hv3-paper__head">
                <b>HALCYON DIAGNOSTICS</b>
                <span>LABORATORY REPORT — FINAL</span>
              </div>
              <div className="hv3-paper__meta">
                <span>PATIENT: MORGAN, ALEX J.</span>
                <span>COLLECTED: 02/12/2026</span>
                <span>FASTING: YES</span>
              </div>
              <div className="hv3-paper__cols" aria-hidden>
                <span>TEST</span>
                <span>RESULT</span>
                <span>FLAG</span>
                <span>UNITS</span>
                <span>REFERENCE</span>
              </div>
              <div
                role="group"
                aria-label="Example lab report. Choose a line to read it in plain English."
                onKeyDown={(e) => {
                  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                  const buttons = Array.from(
                    e.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
                  );
                  const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
                  if (i < 0) return;
                  e.preventDefault();
                  const next = buttons[(i + (e.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length];
                  next.focus();
                  choose(next.dataset.id!);
                }}
              >
                {LAB.map((r) =>
                  "sec" in r ? (
                    <div key={r.sec} className="hv3-paper__sec" aria-hidden>
                      {r.sec}
                    </div>
                  ) : (
                    <button
                      key={r.id}
                      type="button"
                      data-id={r.id}
                      className={`hv3-row${r.flag ? " is-flagged" : ""}${active === r.id ? " is-active" : ""}`}
                      aria-pressed={active === r.id}
                      aria-label={`${r.name}, ${r.res} ${r.unit}${r.flag ? `, flagged ${r.flag === "H" ? "high" : "low"}` : ""}. Read it in plain English.`}
                      onClick={() => choose(r.id)}
                      onMouseEnter={() => {
                        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                        window.clearTimeout(hoverTimer.current);
                        hoverTimer.current = window.setTimeout(() => choose(r.id), 140);
                      }}
                      onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                    >
                      <span className="hv3-row__hl" aria-hidden />
                      <span className="hv3-row__grid" aria-hidden>
                        <span>{r.name}</span>
                        <span className="hv3-row__res">{r.res}</span>
                        <span className="hv3-row__flag">{r.flag}</span>
                        <span>{r.unit}</span>
                        <span>{r.ref}</span>
                      </span>
                    </button>
                  ),
                )}
              </div>
              <div className="hv3-paper__foot">
                Results flagged H (high) or L (low) fall outside the reference
                interval. <mark>This report is intended for the ordering provider.</mark>
                <span className="hv3-paper__note hv3-hand" aria-hidden>
                  see? not for you
                </span>
              </div>
            </div>
          </div>

          <div data-rv="" style={{ "--rv-delay": "0.25s" } as CSSProperties}>
            <div
              ref={stickerRef}
              className="hv3-sticker"
              aria-live={live ? "polite" : undefined}
            >
              <span className="label">
                <span aria-hidden className="label-dot label-dot--ink" />
                Merios says
              </span>
              <div className="hv3-sticker__raw">
                {`${row.name.toUpperCase()} · ${row.res} ${row.unit}${row.flag ? `  ·  FLAG ${row.flag}` : ""}`}
              </div>
              <p ref={plainRef} className="hv3-sticker__plain">
                {ROWS[1].plain}
              </p>
              <p ref={whyRef} className="hv3-sticker__why">
                {ROWS[1].why}
              </p>
              <div className="hv3-range" aria-hidden>
                <div className="hv3-range__track">
                  <div className="hv3-range__band" style={{ left: `${ro.bandL}%`, width: `${ro.bandW}%` }} />
                  <div className={`hv3-range__dot${ro.inRange ? "" : " is-out"}`} style={{ left: `${ro.dot}%` }} />
                </div>
                <div className="hv3-range__legend">
                  <span>{ro.lab}</span>
                  <span className={`hv3-status${ro.inRange ? "" : " is-out"}`}>
                    {ro.inRange ? "In your range" : "Outside your range"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hv3-wrap">
        <p className="hv3-fine hv3-translate__fine">
          Example data · general information, not a diagnosis.
        </p>
      </div>
    </section>
  );
}
