"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Mark } from "@/components/ui/Logo";
import { clamp, lerp, range, smooth } from "./pulse";

/* Before / after (five PDFs become one list of reports), then the scan tour:
   four steps, one sticky phone with the real app screens. */

const PDFS = [
  { name: "LabResults_Feb.pdf", left: 4, top: 8, rot: -7 },
  { name: "scan0043.pdf", left: 46, top: 2, rot: 5 },
  { name: "report (2).pdf", left: 10, top: 44, rot: 4 },
  { name: "Bloodwork_FINAL.pdf", left: 44, top: 56, rot: -5 },
  { name: "Results_2025.pdf", left: 18, top: 82, rot: -2 },
];

type Chip = { tone: "white" | "lime" | "sky" | "peach" | "lilac"; label: string; value: string; small?: string; unit?: boolean };
type Step = {
  key: "scan" | "report" | "marker" | "bioage";
  tier: "plus" | "free";
  title: string;
  body: string;
  facts: [string, string][];
  img: string;
  alt: string;
  chips: [Chip, Chip];
};

const STEPS: Step[] = [
  {
    key: "scan",
    tier: "plus",
    title: "Scan any lab report.",
    body: "A photo or a PDF, from any lab. Every marker is read, placed in its range and tracked. Most reports read in under a minute, and nothing is saved until you check it.",
    facts: [["35", "markers read"], ["34", "matched"], ["<1", "minute"]],
    img: "/images/v3/screen-scan.webp",
    alt: "Merios review screen after a scan: 35 markers read, 34 matched.",
    chips: [
      { tone: "white", label: "Ferritin", value: "21", small: "L" },
      { tone: "lime", label: "Markers read", value: "35" },
    ],
  },
  {
    key: "report",
    tier: "free",
    title: "Every marker, in its range.",
    body: "Your lab's own range, explained in plain words. Your value and its range stay free, on every report.",
    facts: [["162", "markers known"], ["$0", "value + range"]],
    img: "/images/v3/screen-report.webp",
    alt: "Merios report screen with lipids and electrolytes, each shown inside its range.",
    chips: [
      { tone: "white", label: "Chloride", value: "103", small: "mmol/L", unit: true },
      { tone: "sky", label: "In your range", value: "✓" },
    ],
  },
  {
    key: "marker",
    tier: "plus",
    title: "See what moved since last time.",
    body: "Each marker is followed report to report, so one result never stands alone. Improved or worse, said plainly.",
    facts: [["21 → 44", "ferritin, 3 reports"]],
    img: "/images/v3/screen-marker.webp",
    alt: "Merios marker screen for total bilirubin with its history across five reports.",
    chips: [
      { tone: "peach", label: "Since September", value: "+6", small: "µmol/L", unit: true },
      { tone: "white", label: "Reports", value: "5" },
    ],
  },
  {
    key: "bioage",
    tier: "plus",
    title: "Your systems, and your biological age.",
    body: "Markers grouped into the systems they belong to, sorted by what changed. A biological age from PhenoAge, a published model that reads 9 standard markers. A way of reading your report, not a prediction.",
    facts: [["9", "markers · PhenoAge"], ["2018", "Levine et al."]],
    img: "/images/v3/screen-bioage.webp",
    alt: "Merios blood screen showing a biological age of 31.0 years and three systems.",
    chips: [
      { tone: "lilac", label: "Biological age", value: "31.0", small: "yrs", unit: true },
      { tone: "lime", label: "Vs calendar age", value: "−0.5" },
    ],
  },
];

const REPORT_ROWS: [string, string][] = [
  ["SEP 1, 2026", "41 markers"],
  ["MAY 15, 2026", "38 markers"],
  ["FEB 12, 2026", "41 markers"],
];

function PopChip({ chip, rot }: { chip: Chip; rot: number }) {
  return (
    <div className={`hv3-pop hv3-pop--${chip.tone}`} style={{ rotate: `${rot}deg` }}>
      <span className="label">{chip.label}</span>
      <b>
        {chip.value}
        {chip.small ? <small className={chip.unit ? "unit" : undefined}>{chip.small}</small> : null}
      </b>
    </div>
  );
}

export default function Scan() {
  const filesRef = useRef<HTMLDivElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<Step["key"]>("scan");
  const scanlineRef = useRef<HTMLDivElement>(null);
  const firstScreen = useRef(true);

  // before / after, scrubbed by the sticky section
  useEffect(() => {
    const files = filesRef.current;
    const tour = tourRef.current;
    if (!files || !tour) return;
    const desk = files.querySelector<HTMLElement>(".hv3-deskfiles")!;
    const pdfs = Array.from(desk.querySelectorAll<HTMLElement>(".hv3-pdf"));
    const card = desk.querySelector<HTMLElement>(".hv3-reports")!;
    const bits = Array.from(card.querySelectorAll<HTMLElement>(".hv3-reports__row, .hv3-reports__foot"));
    const heads = Array.from(files.querySelectorAll<HTMLElement>(".hv3-files__head"));
    const sticky = tour.querySelector<HTMLElement>(".hv3-tour__sticky");
    const phone = tour.querySelector<HTMLElement>(".hv3-phone");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1081px)");
    let raf = 0;
    let last = -1;

    const renderFiles = (p: number) => {
      const cx = desk.clientWidth / 2;
      const cy = desk.clientHeight / 2;
      pdfs.forEach((el, i) => {
        const t = smooth(range(p, 0.1 + i * 0.045, 0.46 + i * 0.045));
        const bx = el.offsetLeft + el.offsetWidth / 2;
        const by = el.offsetTop + el.offsetHeight / 2;
        el.style.translate = `${((cx - bx) * t).toFixed(1)}px ${((cy - by + (i - 2) * 7) * t).toFixed(1)}px`;
        el.style.rotate = `${lerp(PDFS[i].rot, (i - 2) * 1.5, t).toFixed(2)}deg`;
        el.style.opacity = (1 - smooth(range(p, 0.5, 0.62))).toFixed(3);
      });
      const c = smooth(range(p, 0.52, 0.68));
      card.style.opacity = c.toFixed(3);
      card.style.visibility = c > 0.01 ? "visible" : "hidden";
      card.style.scale = lerp(0.9, 1, c).toFixed(4);
      bits.forEach((r, i) => {
        const a = smooth(range(p, 0.6 + i * 0.05, 0.72 + i * 0.05));
        r.style.opacity = a.toFixed(3);
        r.style.transform = `translate3d(0,${((1 - a) * 10).toFixed(1)}px,0)`;
      });
      const h = range(p, 0.44, 0.56);
      heads[0].style.opacity = (1 - h).toFixed(3);
      heads[0].style.visibility = h > 0.99 ? "hidden" : "visible";
      heads[0].style.transform = `translate3d(0,${(-h * 18).toFixed(1)}px,0)`;
      heads[1].style.opacity = h.toFixed(3);
      heads[1].style.visibility = h < 0.01 ? "hidden" : "visible";
      heads[1].style.transform = `translate3d(0,${((1 - h) * 18).toFixed(1)}px,0)`;
    };

    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      const fr = files.getBoundingClientRect();
      if (fr.bottom > -vh && fr.top < 2 * vh) {
        const p = clamp(-fr.top / Math.max(1, fr.height - vh));
        if (Math.abs(p - last) > 0.0005) {
          last = p;
          renderFiles(p);
        }
      }
      const tr = tour.getBoundingClientRect();
      if (sticky) {
        // the phone appears once its section starts
        sticky.style.opacity = clamp((0.92 * vh - tr.top) / (0.47 * vh)).toFixed(3);
      }
      if (phone && wide.matches && !reduce && tr.bottom > 0 && tr.top < vh) {
        const t = clamp((vh - tr.top) / (tr.height + vh));
        phone.style.transform = `perspective(1400px) rotateY(${lerp(-14, 12, t).toFixed(2)}deg) rotateX(${lerp(6, -3, t).toFixed(2)}deg)`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      last = -1;
      if (!wide.matches && phone) phone.style.transform = "";
      schedule();
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // which step is in the middle of the viewport
  useEffect(() => {
    const tour = tourRef.current;
    if (!tour) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent((e.target as HTMLElement).dataset.screen as Step["key"]);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    tour.querySelectorAll(".hv3-tstep").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // the scan line sweeps the phone on every screen change
  useEffect(() => {
    if (firstScreen.current) {
      firstScreen.current = false;
      return;
    }
    const line = scanlineRef.current;
    if (!line || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    line.classList.remove("is-running");
    void line.offsetWidth;
    line.classList.add("is-running");
  }, [current]);

  return (
    <section id="scan" className="hv3-scan" data-stage="mist" aria-labelledby="scan-title">
      <div className="hv3-wrap">
        <div ref={filesRef} className="hv3-files">
          <div className="hv3-files__sticky">
            <div className="hv3-files__grid">
              <div className="hv3-files__heads">
                <div className="hv3-files__head" data-h="0">
                  <span className="label">
                    <span aria-hidden className="label-dot label-dot--ink" />
                    Before Merios
                  </span>
                  <h2 className="hv3-h2" id="scan-title">
                    5 PDFs. 3 portals. 2 forgotten passwords.
                  </h2>
                  <p className="lead">
                    Every lab sends its own file, in its own format, behind its own login.
                  </p>
                </div>
                <div className="hv3-files__head" data-h="1">
                  <span className="label">
                    <span aria-hidden className="label-dot label-dot--ink" />
                    With Merios
                  </span>
                  <h2 className="hv3-h2">Every report. One place.</h2>
                  <p className="lead">
                    One app reads all of them, then keeps every report on a single timeline.
                  </p>
                </div>
              </div>
              <div className="hv3-deskfiles" aria-hidden>
                {PDFS.map((f) => (
                  <span
                    key={f.name}
                    className="hv3-pdf"
                    style={{ left: `${f.left}%`, top: `${f.top}%`, rotate: `${f.rot}deg` }}
                  >
                    <b>PDF</b>
                    {f.name}
                  </span>
                ))}
                <div className="hv3-reports">
                  <div className="hv3-reports__top">
                    <span className="label">Your reports</span>
                    <Mark color="#FFFFFF" cut="#10231A" style={{ width: 22, height: 24 }} />
                  </div>
                  {REPORT_ROWS.map(([date, meta]) => (
                    <div key={date} className="hv3-reports__row">
                      <span className="hv3-reports__date">{date}</span>
                      <span className="hv3-reports__meta">{meta}</span>
                      <b>read</b>
                    </div>
                  ))}
                  <div className="hv3-reports__foot">3 reports · 120 values · one timeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={tourRef} className="hv3-tour">
          <div className="hv3-tour__steps">
            {STEPS.map((s, i) => (
              <article key={s.key} className="hv3-tstep" data-screen={s.key}>
                <div data-rv="" className="hv3-tstep__inner">
                  <div className="hv3-tstep__n">
                    <span>{`READ ${i + 1} / 4`}</span>
                    {s.tier === "plus" ? (
                      <span className="hv3-tag-plus">MERIOS PLUS</span>
                    ) : (
                      <span className="hv3-tag-free">FREE</span>
                    )}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="hv3-facts">
                    {s.facts.map(([b, l]) => (
                      <span key={l} className="hv3-fact">
                        <b>{b}</b>
                        <span>{l}</span>
                      </span>
                    ))}
                  </div>
                  <div className="hv3-tstep__img">
                    <Image src={s.img} alt={s.alt} width={828} height={1801} sizes="300px" />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="hv3-tour__stage" aria-hidden>
            <div className="hv3-tour__sticky">
              <div className="hv3-phone">
                <div className="hv3-phone__bezel">
                  <div className="hv3-phone__screen">
                    {STEPS.map((s) => (
                      <Image
                        key={s.key}
                        src={s.img}
                        alt=""
                        width={828}
                        height={1801}
                        sizes="330px"
                        style={{ opacity: current === s.key ? 1 : 0 }}
                      />
                    ))}
                    <div ref={scanlineRef} className="hv3-scanline" />
                    <div className="hv3-phone__glare" />
                  </div>
                </div>
              </div>
              {STEPS.map((s) => (
                <div key={s.key} className={`hv3-chipset${current === s.key ? " is-on" : ""}`}>
                  <div className="hv3-chipwrap hv3-float" style={{ left: "calc(50% - 262px)", top: "22%" } as CSSProperties}>
                    <PopChip chip={s.chips[0]} rot={-5} />
                  </div>
                  <div className="hv3-chipwrap hv3-float" style={{ left: "calc(50% + 116px)", top: "62%" } as CSSProperties}>
                    <PopChip chip={s.chips[1]} rot={4} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
