"use client";

import { useEffect, useRef } from "react";
import { DAYS, DRAW_DAY, MONTHS, YEAR_START, clamp, lerp, range, smooth } from "./pulse";

/* The year in 365 dots: one coral blood-draw day, then the days Apple Health
   already counted fill in, then they gather into three dotted rings. */

const RINGS = [
  { c: [242, 182, 73], v: 0.9 },
  { c: [92, 194, 140], v: 0.42 },
  { c: [143, 178, 210], v: 0.5 },
];

export default function Year() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nRef = useRef<HTMLElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cv = canvasRef.current;
    if (!section || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const heads = Array.from(section.querySelectorAll<HTMLElement>(".hv3-year__head"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-plex-mono").trim() || "ui-monospace";
    const start = new Date(YEAR_START);
    const offset = (start.getUTCDay() + 6) % 7; // Monday-first rows
    const counts = [0, 0, 0];
    const idxIn: number[] = [];
    for (let k = 0; k < 365; k++) {
      idxIn.push(counts[k % 3]);
      counts[k % 3]++;
    }
    let W = 0;
    let H = 0;
    let dpr = 1;
    let last = -1;
    let raf = 0;
    let halo = 0;

    function draw(p: number) {
      if (!W || !H || !ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const wide = W > 860;
      const cols = wide ? 53 : 21;
      const rows = wide ? 7 : 18;
      const topPad = wide ? 26 : 6;
      const leftPad = wide ? 26 : 0;
      const cell = Math.min((W - leftPad) / cols, (H - topPad - 8) / rows);
      const gw = cell * cols;
      const gh = cell * rows;
      const ox = leftPad + (W - leftPad - gw) / 2;
      const oy = topPad + (H - topPad - gh) * (wide ? 0.34 : 0.5);
      const rad = cell * 0.31;
      const fill = range(p, 0.1, 0.58);
      const nFilled = Math.round(fill * 365);
      const g = range(p, 0.74, 0.97);
      const rr = Math.min(H * 0.36, W * (wide ? 0.105 : 0.13));
      const centers = wide
        ? [[W * 0.27, H * 0.5], [W * 0.5, H * 0.5], [W * 0.73, H * 0.5]]
        : [[W * 0.19, H * 0.5], [W * 0.5, H * 0.5], [W * 0.81, H * 0.5]];

      // calendar structure (wide layout only)
      if (wide && g < 0.5) {
        ctx.globalAlpha = 1 - g * 2;
        ctx.fillStyle = "rgba(244,246,247,0.42)";
        ctx.font = `500 10px ${mono}`;
        let lastM = -1;
        for (let d = 0; d < 365; d++) {
          const dt = new Date(start.getTime() + d * 86400000);
          const mth = dt.getUTCMonth();
          if (mth !== lastM && dt.getUTCDate() <= 7) {
            ctx.fillText(MONTHS[mth], ox + Math.floor((d + offset) / 7) * cell, oy - 10);
            lastM = mth;
          }
        }
        ["M", "W", "F"].forEach((t, j) => ctx.fillText(t, ox - 18, oy + (j * 2 + 0.5) * cell + 4));
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < 365; i++) {
        const ringN = i % 3;
        const c = i + offset;
        const gx = ox + (wide ? Math.floor(c / 7) : c % 21) * cell + cell / 2;
        const gy = oy + (wide ? c % 7 : Math.floor(c / 21)) * cell + cell / 2;
        const ring = RINGS[ringN];
        const ci = centers[ringN];
        const frac = idxIn[i] / counts[ringN];
        const ang = -Math.PI / 2 + frac * Math.PI * 2;
        const tx = ci[0] + Math.cos(ang) * rr;
        const ty = ci[1] + Math.sin(ang) * rr;
        const gi = smooth(clamp(g * 1.5 - (i / 365) * 0.5));
        const x = lerp(gx, tx, gi);
        const y = lerp(gy, ty, gi);
        const isDraw = i === DRAW_DAY;
        const filled = isDraw || i < nFilled;
        const r = rad * (isDraw ? 1.25 : 1);
        ctx.beginPath();
        ctx.arc(x, y, r * lerp(1, 0.5, gi), 0, Math.PI * 2);
        if (isDraw && gi < 0.5) {
          ctx.fillStyle = "rgb(255,90,60)";
          ctx.shadowColor = "rgba(255,90,60,0.9)";
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (filled) {
          const a = 0.28 + DAYS[i] * 0.72;
          const cr = lerp(214, ring.c[0], gi);
          const cg = lerp(240, ring.c[1], gi);
          const cb = lerp(80, ring.c[2], gi);
          const alpha = lerp(a, frac <= ring.v ? 1 : 0.16, gi);
          ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha.toFixed(3)})`;
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.07)";
          ctx.fill();
        }
      }

      // the draw day: a halo
      if (g < 0.4) {
        const cD = DRAW_DAY + offset;
        const dx = ox + (wide ? Math.floor(cD / 7) : cD % 21) * cell + cell / 2;
        const dy = oy + (wide ? cD % 7 : Math.floor(cD / 21)) * cell + cell / 2;
        ctx.globalAlpha = 1 - g * 2.5;
        ctx.strokeStyle = "rgba(255,90,60,0.55)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(dx, dy, rad * 2.4 + (reduce ? 0 : Math.sin(halo / 400) * 0.6), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // counter + headline swap
      const n = Math.max(1, nFilled);
      const nEl = nRef.current;
      const dEl = dateRef.current;
      if (nEl && dEl) {
        if (fill <= 0) {
          nEl.textContent = "1";
          dEl.textContent = "FEB 12, 2026 · DAY OF THE DRAW";
        } else if (g > 0.05) {
          nEl.textContent = "3";
          dEl.textContent = "RINGS · EVERY MORNING";
        } else {
          const dd = new Date(start.getTime() + (n - 1) * 86400000);
          nEl.textContent = String(n);
          dEl.textContent = `${MONTHS[dd.getUTCMonth()]} ${dd.getUTCDate()}, ${dd.getUTCFullYear()} · DAY ${n} OF 365`;
        }
      }
      if (heads.length === 3) {
        const s1 = range(p, 0.3, 0.4);
        const s2 = range(p, 0.74, 0.84);
        const vis = [1 - s1, Math.min(s1, 1 - s2), s2];
        const off = [-s1 * 24, (1 - s1) * 24 - s2 * 24, (1 - s2) * 24];
        heads.forEach((h, i) => {
          h.style.opacity = vis[i].toFixed(3);
          h.style.visibility = vis[i] < 0.01 ? "hidden" : "visible";
          if (!reduce) h.style.transform = `translate3d(0,${off[i].toFixed(1)}px,0)`;
        });
      }
    }

    const progress = () => {
      const r = section.getBoundingClientRect();
      return { p: clamp(-r.top / Math.max(1, r.height - window.innerHeight)), on: r.bottom > 0 && r.top < window.innerHeight };
    };
    const frame = (now: number) => {
      raf = 0;
      const { p, on } = progress();
      if (!on || p === last) return;
      last = p;
      halo = now;
      draw(p);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = Math.max(2, Math.round(W * dpr));
      cv.height = Math.max(2, Math.round(H * dpr));
      last = -1;
      draw(progress().p);
      schedule();
    };
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) schedule();
    });
    io.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="year"
      className="hv3-year"
      data-stage="night"
      data-nav="dark"
      aria-labelledby="year-title-a"
    >
      <div className="hv3-year__sticky hv3-wrap">
        <div className="hv3-year__heads">
          <div className="hv3-year__head">
            <span className="label">
              <span aria-hidden className="label-dot" style={{ background: "var(--color-coral)", boxShadow: "0 0 12px rgb(255 90 60 / 0.8)" }} />
              Feb 12 · the blood draw
            </span>
            <h2 className="display" id="year-title-a">
              Your blood test sees 1 day.
            </h2>
          </div>
          <div className="hv3-year__head">
            <span className="label">
              <span aria-hidden className="label-dot" />
              52 weeks · 7 days · Apple Health
            </span>
            <h2 className="display">
              Your iPhone saw the other <span className="chrome-text">364.</span>
            </h2>
          </div>
          <div className="hv3-year__head">
            <span className="label">
              <span aria-hidden className="label-dot" />
              Activity · Recovery · Zen
            </span>
            <h2 className="display">
              Merios reads them as <span className="chrome-text">three rings.</span>
            </h2>
          </div>
        </div>
        <div className="hv3-year__canvaswrap">
          <canvas
            ref={canvasRef}
            className="hv3-year__canvas"
            role="img"
            aria-label="A year drawn as 365 dots, one per day. One dot, February 12, is the day of the blood test; the other 364 come from Apple Health."
          />
        </div>
        <div className="hv3-year__foot">
          <div className="hv3-year__count">
            <b ref={nRef}>1</b>
            <span ref={dateRef}>FEB 12, 2026 · DAY OF THE DRAW</span>
          </div>
          <p className="hv3-year__copy">
            Steps, sleep, heart rate and HRV have been counting all year. On day
            one, Merios imports your last 365 days. Read only, automatically.
          </p>
          <div className="hv3-year__legend" aria-hidden>
            <span>
              <i style={{ background: "var(--color-lime)" }} />
              ONE DOT, ONE DAY
            </span>
            <span>
              <i style={{ background: "rgb(214 240 80 / 0.38)" }} />
              BRIGHTER, HIGHER SCORE
            </span>
            <span>
              <i style={{ background: "var(--color-coral)" }} />
              BLOOD DRAW
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
