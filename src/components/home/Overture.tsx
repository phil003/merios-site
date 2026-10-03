"use client";

import { useEffect, useRef } from "react";
import {
  DAYS,
  DRAW_DAY,
  MONTHS,
  YEAR_START,
  clamp,
  ecg,
  ecgSamples,
  lerp,
  range,
  smooth,
  smoothSeries,
} from "./pulse";

/* The logo's pulse line becomes the year: one heartbeat in the hero, then a
   flat year with one coral blood-test day, then 364 daily ticks, then the
   daily trend read together with three reports. Scroll-driven, no library:
   one rAF-throttled handler writes SVG attributes. */

const REPORTS: [number, string, string][] = [
  [DRAW_DAY, "21 L", "FEB"],
  [224, "32", "MAY"],
  [334, "44", "SEP"],
];
const AVG = smoothSeries(DAYS, 11);
const hn = (v: number) => 0.1 + 0.9 * clamp((v - 0.35) / 0.6);
const MONTH_TICKS: { d: number; m: string }[] = [];
for (let day = 1; day < 350; day++) {
  const dt = new Date(YEAR_START + day * 86400000);
  if (dt.getUTCDate() === 1) MONTH_TICKS.push({ d: day, m: MONTHS[dt.getUTCMonth()] });
}
const CAP_WINDOWS: [number, number, number, number][] = [
  [-1, 0, 0.27, 0.33],
  [0.33, 0.39, 0.6, 0.66],
  [0.66, 0.72, 2, 3],
];

const CAPS = [
  {
    label: "Your blood",
    title: "One test. One day, in detail.",
    body: "Around forty markers, each against your lab's own range.",
  },
  {
    label: "Your days",
    title: "364 more, already counted.",
    body: "Apple Health has been keeping score all year. Merios reads it as three rings.",
  },
  {
    label: "Read together",
    title: "Finally, one place that reads both.",
    body: "What moves with what, across your blood and your days. A pattern, never a cause.",
    chrome: true,
  },
];

export default function Overture() {
  const visRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ovRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const vis = visRef.current;
    const svg = svgRef.current;
    const ov = ovRef.current;
    if (!vis || !svg || !ov) return;

    const q = <T extends Element>(sel: string) => svg.querySelector(sel) as T;
    const E = {
      line: q<SVGPathElement>(".hv3-line"),
      comet: q<SVGPathElement>(".hv3-comet"),
      t: [q<SVGPathElement>(".hv3-ticks--1"), q<SVGPathElement>(".hv3-ticks--2"), q<SVGPathElement>(".hv3-ticks--3")],
      curve: q<SVGPathElement>(".hv3-curve"),
      grad: q<SVGLinearGradientElement>("#hv3-line-grad"),
      dot: q<SVGCircleElement>(".hv3-dot"),
      today: q<SVGTextElement>(".hv3-today"),
      note: q<SVGTextElement>(".hv3-note"),
      draw: q<SVGGElement>(".hv3-draw"),
      months: Array.from(svg.querySelectorAll<SVGTextElement>(".hv3-month")),
      bLines: Array.from(svg.querySelectorAll<SVGLineElement>(".hv3-blood line")),
      bDots: Array.from(svg.querySelectorAll<SVGCircleElement>(".hv3-blood circle")),
      bTxt: Array.from(svg.querySelectorAll<SVGTextElement>(".hv3-blood text")),
    };
    const dLine = E.draw.querySelector("line")!;
    const dDot = E.draw.querySelector("circle")!;
    const dTxt = E.draw.querySelector("text")!;
    const chip = vis.querySelector<HTMLElement>(".hv3-chipfade")!;
    const caps = Array.from(ov.querySelectorAll<HTMLElement>(".hv3-cap"));
    const bars = Array.from(ov.querySelectorAll<HTMLElement>(".hv3-progress b"));
    const hero = document.getElementById("hv3-hero");
    const heroInner = hero?.querySelector<HTMLElement>(".hv3-hero__inner") ?? null;
    const cue = hero?.querySelector<HTMLElement>(".hv3-scroll") ?? null;
    const translate = document.getElementById("translate");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

    let W = 0;
    let H = 0;
    let lastKey = "";
    let raf = 0;
    let beating = false;

    const set = (el: Element, attrs: Record<string, string | number>) => {
      for (const k in attrs) el.setAttribute(k, String(attrs[k]));
    };

    function geo(ph: number) {
      // phones and portrait tablets: the line runs under the copy
      const mob = W < 761 || (W < 1100 && H >= W);
      return {
        mob,
        yb: mob ? lerp(H * 0.8, H * 0.36, smooth(ph)) : H * 0.52,
        xs: mob ? 18 : W * 0.47,
        dotX: mob ? W * 0.88 : W * 0.885,
        cx: mob ? W * 0.55 : W * 0.7,
        amp: mob ? Math.min(H * 0.1, 84) : Math.min(H * 0.24, 210),
        x0: mob ? 18 : W * 0.45,
        x1: mob ? W - 30 : W * 0.94,
        hmax: mob ? Math.min(H * 0.15, 118) : Math.min(H * 0.25, 220),
      };
    }

    function render(p: number, ph: number) {
      if (!W) return;
      const g = geo(ph);
      const q1 = smooth(range(p, 0.03, 0.24));
      const q2 = range(p, 0.36, 0.58);
      const q3 = smooth(range(p, 0.69, 0.88));
      const w = g.amp * 0.75;

      // heartbeat (hero) → a flat year (one day)
      const us = ecgSamples(200, g.xs, g.dotX, g.cx, w);
      let path = "";
      for (let i = 0; i < us.length; i++) {
        const u = us[i];
        const xa = lerp(g.xs, g.dotX, u);
        const ya = g.yb + ecg((xa - g.cx) / w) * g.amp;
        path += `${i ? "L" : "M"}${lerp(xa, lerp(g.x0, g.x1, u), q1).toFixed(1)} ${lerp(ya, g.yb, q1).toFixed(1)}`;
      }
      E.line.setAttribute("d", path);
      E.comet.setAttribute("d", path);
      E.comet.style.visibility = q1 > 0.01 ? "hidden" : "visible";
      set(E.grad, {
        x1: lerp(g.xs, g.x0, q1).toFixed(1),
        x2: lerp(g.xs + (g.mob ? 70 : W * 0.09), g.x0 + 1, q1).toFixed(1),
      });

      // the lime dot: end of the pulse, then "today"
      set(E.dot, { cx: lerp(g.dotX, g.x1, q1).toFixed(1), cy: g.yb.toFixed(1) });
      set(E.today, {
        x: (g.mob ? g.x1 + 10 : g.x1).toFixed(1),
        y: (g.yb + (g.mob ? 46 : 44)).toFixed(1),
        "text-anchor": g.mob ? "end" : "middle",
      });
      E.today.style.opacity = q1.toFixed(3);

      E.months.forEach((m, i) => {
        set(m, {
          x: lerp(g.x0, g.x1, MONTH_TICKS[i].d / 364).toFixed(1),
          y: (g.yb + 24).toFixed(1),
        });
        m.style.opacity = (q1 * (g.mob ? 0 : 0.85)).toFixed(3);
      });

      // the blood test: one coral day, which grows into the deep read
      const xd = lerp(g.x0, g.x1, DRAW_DAY / 364);
      const cH = lerp(16, g.hmax * 1.12, q2);
      const ca = smooth(range(q1, 0.45, 1)) * (1 - q3);
      set(dLine, { x1: xd.toFixed(1), x2: xd.toFixed(1), y1: g.yb.toFixed(1), y2: (g.yb - cH).toFixed(1) });
      set(dDot, { cx: xd.toFixed(1), cy: (g.yb - cH).toFixed(1) });
      set(dTxt, { x: xd.toFixed(1), y: (g.yb - cH - 16).toFixed(1) });
      E.draw.style.opacity = ca.toFixed(3);

      // 364 days grow out of the line (weeks on phones)
      const t = ["", "", ""];
      if (q2 > 0) {
        if (!g.mob) {
          for (let k = 0; k < 365; k++) {
            if (k === DRAW_DAY) continue;
            const gk = smooth(clamp(q2 * 1.4 - (k / 364) * 0.4));
            if (gk <= 0) continue;
            const x = lerp(g.x0, g.x1, k / 364);
            const nv = hn(DAYS[k]);
            const hh = nv * g.hmax * gk;
            const b = nv < 0.38 ? 0 : nv < 0.62 ? 1 : 2;
            t[b] += `M${x.toFixed(1)} ${(g.yb - 4).toFixed(1)}V${(g.yb - 4 - hh).toFixed(1)}`;
          }
        } else {
          for (let wk = 0; wk < 52; wk++) {
            let s = 0;
            for (let j = 0; j < 7; j++) s += DAYS[wk * 7 + j];
            s /= 7;
            const gw = smooth(clamp(q2 * 1.4 - (wk / 51) * 0.4));
            if (gw <= 0) continue;
            const xw = lerp(g.x0 + 3, g.x1 - 3, wk / 51);
            const nw = hn(s);
            const hw = nw * g.hmax * gw;
            const bw = nw < 0.4 ? 0 : nw < 0.6 ? 1 : 2;
            t[bw] += `M${xw.toFixed(1)} ${(g.yb - 5).toFixed(1)}V${(g.yb - 5 - hw).toFixed(1)}`;
          }
        }
      }
      const sw = g.mob ? "3.4" : "1.2";
      E.t.forEach((el, n) => {
        el.setAttribute("d", t[n]);
        el.style.strokeWidth = sw;
        el.style.opacity = (1 - 0.72 * q3).toFixed(3);
      });

      // read together: the daily trend and the blood reports, lined up by date
      if (q3 > 0) {
        let c = "";
        for (let kk = 0; kk < 365; kk += 2) {
          c += `${kk ? "L" : "M"}${lerp(g.x0, g.x1, kk / 364).toFixed(1)} ${(g.yb - 4 - hn(AVG[kk]) * g.hmax).toFixed(1)}`;
        }
        E.curve.setAttribute("d", c);
      }
      E.curve.style.strokeDashoffset = (1 - q3).toFixed(4);
      E.curve.style.opacity = q3 > 0 ? "1" : "0";
      REPORTS.forEach((r, n) => {
        const a = smooth(range(q3, 0.2 + n * 0.18, 0.5 + n * 0.18));
        const xr = lerp(g.x0, g.x1, r[0] / 364);
        const yc = g.yb - 4 - hn(AVG[r[0]]) * g.hmax;
        set(E.bLines[n], { x1: xr.toFixed(1), x2: xr.toFixed(1), y1: (g.yb - 6).toFixed(1), y2: yc.toFixed(1) });
        set(E.bDots[n], { cx: xr.toFixed(1), cy: g.yb.toFixed(1) });
        set(E.bTxt[n], {
          x: (g.mob && n === 2 ? xr + 12 : xr).toFixed(1),
          y: (g.yb + (g.mob ? 26 : 44)).toFixed(1),
          "text-anchor": g.mob && n === 2 ? "end" : "middle",
        });
        for (const el of [E.bLines[n], E.bDots[n], E.bTxt[n]]) el.style.opacity = a.toFixed(3);
      });
      set(E.note, {
        x: (xd + (g.mob ? -6 : 16)).toFixed(1),
        y: (g.yb - g.hmax - (g.mob ? 14 : 18)).toFixed(1),
      });
      E.note.style.opacity = smooth(range(q3, 0.65, 1)).toFixed(3);

      // the translation chip belongs to the heartbeat
      if (!g.mob) {
        chip.style.left = `${(g.cx + w * 0.42).toFixed(0)}px`;
        chip.style.top = `${(g.yb + 46).toFixed(0)}px`;
      }
      chip.style.visibility = q1 > 0.6 ? "hidden" : "visible";
      chip.style.opacity = (1 - smooth(range(q1, 0, 0.5))).toFixed(3);
    }

    function renderCaps(p: number) {
      caps.forEach((c, i) => {
        const w = CAP_WINDOWS[i];
        const a = Math.min(range(p, w[0], w[1]), 1 - range(p, w[2], w[3]));
        c.style.opacity = a.toFixed(3);
        c.style.visibility = a < 0.01 ? "hidden" : "visible";
        if (reduce) return;
        const y = (1 - range(p, w[0], w[1])) * 30 - range(p, w[2], w[3]) * 30;
        c.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
        if (!isSafari) c.style.filter = a > 0.98 ? "none" : `blur(${((1 - a) * 8).toFixed(1)}px)`;
      });
      bars[0].style.transform = `scaleX(${range(p, 0, 0.3).toFixed(3)})`;
      bars[1].style.transform = `scaleX(${range(p, 0.33, 0.63).toFixed(3)})`;
      bars[2].style.transform = `scaleX(${range(p, 0.66, 0.96).toFixed(3)})`;
    }

    function setBeating(on: boolean) {
      if (on === beating) return;
      beating = on;
      vis!.classList.toggle("is-beating", on);
    }

    function frame() {
      raf = 0;
      const vh = window.innerHeight;
      const ovr = ov!.getBoundingClientRect();
      const po = clamp(-ovr.top / Math.max(1, ovr.height - vh));
      let ph = 0;
      if (hero) {
        const hr = hero.getBoundingClientRect();
        ph = clamp(-hr.top / Math.max(1, hr.height));
        const hq = clamp((-hr.top - 0.3 * hr.height) / Math.max(1, hr.height * 0.7 - 0.1 * vh));
        if (heroInner) {
          heroInner.style.opacity = (1 - hq).toFixed(3);
          if (!reduce) heroInner.style.transform = `translate3d(0,${(-60 * hq).toFixed(1)}px,0)`;
        }
        if (cue) cue.style.opacity = (1 - clamp(-hr.top / (0.2 * hr.height))).toFixed(3);
      }
      // the fixed visual hands over to the lab report
      let fade = 0;
      if (translate) fade = clamp((0.98 * vh - translate.getBoundingClientRect().top) / (0.48 * vh));
      vis!.style.opacity = (1 - fade).toFixed(3);
      vis!.style.visibility = fade >= 1 ? "hidden" : "visible";
      setBeating(!reduce && !document.hidden && ovr.bottom > 0.3 * vh && fade < 1);

      renderCaps(po);
      const key = `${W}x${H}:${po.toFixed(4)}:${ph.toFixed(4)}`;
      if (fade < 1 && key !== lastKey) {
        lastKey = key;
        render(po, ph);
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const measure = () => {
      W = vis.clientWidth;
      H = vis.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      lastKey = "";
      schedule();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(vis);
    measure();
    // first geometry is in place: start the intro (line draw, dot, chip)
    frame();
    vis.classList.add("is-ready");

    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={visRef} className="hv3-vis" aria-hidden>
        <svg ref={svgRef} preserveAspectRatio="none" focusable="false">
          <defs>
            <linearGradient id="hv3-line-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <g>
            {MONTH_TICKS.map((m) => (
              <text key={m.d} className="hv3-svgtxt hv3-month" textAnchor="middle" style={{ opacity: 0 }}>
                {m.m}
              </text>
            ))}
          </g>
          <path className="hv3-ticks hv3-ticks--1" />
          <path className="hv3-ticks hv3-ticks--2" />
          <path className="hv3-ticks hv3-ticks--3" />
          <path className="hv3-curve" pathLength={1} style={{ opacity: 0 }} />
          <path className="hv3-line" pathLength={1000} />
          <path className="hv3-comet" pathLength={1000} />
          <g className="hv3-blood">
            {REPORTS.map((r) => (
              <line key={`l${r[0]}`} style={{ opacity: 0 }} />
            ))}
            {REPORTS.map((r, i) => (
              <circle key={`c${r[0]}`} r={6} className={i === 0 ? "is-first" : undefined} style={{ opacity: 0 }} />
            ))}
            {REPORTS.map((r, i) => (
              <text key={`t${r[0]}`} textAnchor="middle" className={i === 0 ? "is-first" : undefined} style={{ opacity: 0 }}>
                {`${r[2]} · ${r[1]}`}
              </text>
            ))}
          </g>
          <g className="hv3-draw" style={{ opacity: 0 }}>
            <line />
            <circle r={6} />
            <text className="hv3-svgtxt" textAnchor="middle">
              FEB 12 · BLOOD TEST
            </text>
          </g>
          <circle className="hv3-dot" r={8} />
          <text className="hv3-svgtxt hv3-today" textAnchor="middle" style={{ opacity: 0 }}>
            TODAY
          </text>
          <text className="hv3-note" style={{ opacity: 0 }}>
            a pattern, never a cause
          </text>
        </svg>
        <div className="hv3-chipfade">
          <div className="glass hv3-chip">
            <span className="label">Your lab</span>
            <div className="hv3-chip__raw">
              FERRITIN&nbsp;&nbsp;21<b>L</b>
            </div>
            <hr />
            <span className="label hv3-chip__says">
              <span className="label-dot" />
              Merios says
            </span>
            <div className="hv3-chip__plain">Iron stores on the low side.</div>
          </div>
        </div>
      </div>

      <section
        ref={ovRef}
        id="overture"
        className="hv3-overture"
        data-stage="night"
        data-nav="dark"
        aria-label="Your blood and your days, read together"
      >
        <div className="hv3-overture__sticky">
          <div className="hv3-caps">
            {CAPS.map((c) => (
              <div key={c.label} className="hv3-cap">
                <span className="label">
                  <span aria-hidden className="label-dot" />
                  {c.label}
                </span>
                <h2 className={`display${c.chrome ? " chrome-text" : ""}`}>{c.title}</h2>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <div className="hv3-progress" aria-hidden>
            <i>
              <b />
            </i>
            <i>
              <b />
            </i>
            <i>
              <b />
            </i>
          </div>
        </div>
      </section>
    </>
  );
}
