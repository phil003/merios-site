// Shared, framework-free maths for the homepage scenes: the logo's heartbeat,
// the example year of daily scores, and small easing helpers. Pure functions,
// so both server components (finale, chart) and client scenes can import them.

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

export const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Example year: Oct 3, 2025 → Oct 2, 2026. The blood draw is day 132 (Feb 12). */
export const YEAR_START = Date.UTC(2025, 9, 3);
export const DRAW_DAY = 132;

/** Example daily scores (0–1), seeded so every render draws the same year. */
export const DAYS: number[] = (() => {
  let seed = 7;
  const out: number[] = [];
  const off = (new Date(YEAR_START).getUTCDay() + 6) % 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 365; i++) {
    const season = Math.sin((i / 365) * Math.PI * 2 + 2.44) * 12;
    const week = [3, 1, 0, -1, 2, 6, 4][(i + off) % 7];
    out.push(clamp((62 + season + week + (rnd() - 0.5) * 16) / 100, 0.25, 0.97));
  }
  return out;
})();

export function smoothSeries(a: number[], win: number): number[] {
  const h = Math.floor(win / 2);
  return a.map((_, i) => {
    let s = 0;
    let n = 0;
    for (let j = i - h; j <= i + h; j++) {
      if (j >= 0 && j < a.length) {
        s += a[j];
        n++;
      }
    }
    return s / n;
  });
}

/** Keypoints of one heartbeat (x in beat widths, y in amplitudes; up is negative). */
const ECGK: [number, number][] = [
  [-1.6, 0], [-0.34, 0], [-0.26, 0.17], [-0.1, -1], [0.1, 0.98], [0.24, 0], [1.6, 0],
];

export function ecg(s: number): number {
  let v = 0;
  if (s > ECGK[0][0] && s < ECGK[ECGK.length - 1][0]) {
    for (let i = 0; i < ECGK.length - 1; i++) {
      if (s >= ECGK[i][0] && s <= ECGK[i + 1][0]) {
        v = lerp(ECGK[i][1], ECGK[i + 1][1], (s - ECGK[i][0]) / (ECGK[i + 1][0] - ECGK[i][0]));
        break;
      }
    }
  }
  // small P and T waves, like a real trace
  return v - 0.09 * Math.exp(-Math.pow((s + 0.62) / 0.09, 2)) - 0.2 * Math.exp(-Math.pow((s - 0.6) / 0.15, 2));
}

/** Uniform samples plus the beat's exact corners, so the spike stays sharp. */
export function ecgSamples(n: number, xs: number, xe: number, cx: number, w: number): number[] {
  const us: number[] = [];
  for (let i = 0; i < n; i++) us.push(i / (n - 1));
  for (const k of ECGK) {
    const x = cx + k[0] * w;
    if (x > xs && x < xe) us.push((x - xs) / (xe - xs));
  }
  return us.sort((a, b) => a - b);
}

/** A single heartbeat path from xs to xe, peaking around cx. */
export function heartbeatPath(xs: number, xe: number, cx: number, yb: number, amp: number, n = 170): string {
  const w = amp * 0.75;
  return ecgSamples(n, xs, xe, cx, w)
    .map((u, i) => {
      const x = lerp(xs, xe, u);
      return `${i ? "L" : "M"}${x.toFixed(1)} ${(yb + ecg((x - cx) / w) * amp).toFixed(1)}`;
    })
    .join("");
}
