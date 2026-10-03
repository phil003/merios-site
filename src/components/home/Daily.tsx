import Image from "next/image";
import type { CSSProperties } from "react";

/* Daily: the three free rings, the Merios Score, and the Today screen. */

const C = 2 * Math.PI * 50;

const RINGS = [
  {
    name: "Activity",
    value: 90,
    band: "EXCELLENT",
    color: "var(--color-activity)",
    body: "How much you moved today, cardio, strength and everything in between.",
    detail: "11,030 steps · goal 10,564",
  },
  {
    name: "Recovery",
    value: 42,
    band: "LOW",
    color: "var(--color-recovery)",
    body: "How ready your body is today, based on last night.",
    detail: "6h03 asleep · HRV · resting HR",
  },
  {
    name: "Zen",
    value: 50,
    band: "LOW",
    color: "var(--color-zen)",
    body: "How calm your nervous system stayed today.",
    detail: "settled · computed tonight",
  },
];

export default function Daily() {
  return (
    <section id="daily" className="hv3-daily" data-stage="lilac" aria-labelledby="daily-title">
      <div className="hv3-wrap">
        <div className="hv3-daily__top" data-rv="">
          <div style={{ display: "grid", gap: 22 }}>
            <span className="hv3-stamp">FREE, FOR GOOD</span>
            <h2 className="hv3-h2" id="daily-title">
              Your day, in three rings.
            </h2>
          </div>
          <p className="lead">
            One score from your Apple Health data, every morning. Higher is
            always better, and a low number is information, not a warning. It
            never turns red.
          </p>
        </div>

        <div className="hv3-daily__body">
          <div>
            <div className="hv3-rings" data-rv="">
              {RINGS.map((r) => (
                <article key={r.name} className="hv3-ringcard">
                  <div className="hv3-ring">
                    <svg viewBox="0 0 120 120" aria-hidden focusable="false">
                      <circle className="hv3-ring__track" cx="60" cy="60" r="50" strokeWidth="12" />
                      <circle
                        className="hv3-ring__arc"
                        cx="60"
                        cy="60"
                        r="50"
                        strokeWidth="12"
                        style={{ stroke: r.color, "--off": (C * (1 - r.value / 100)).toFixed(2) } as CSSProperties}
                      />
                    </svg>
                    <span className="hv3-ring__val">{r.value}</span>
                  </div>
                  <div>
                    <h3>{r.name}</h3>
                    <span className="hv3-band" style={{ color: r.color }}>
                      {r.band}
                    </span>
                  </div>
                  <p>{r.body}</p>
                  <span className="hv3-detail">{r.detail}</span>
                </article>
              ))}
            </div>
            <div className="hv3-score" data-rv="" style={{ "--rv-delay": "0.1s" } as CSSProperties}>
              <div className="hv3-score__n">
                58<small>MODERATE</small>
              </div>
              <div>
                <p>
                  <b>The Merios Score is four quarters:</b> Activity, Recovery
                  and Zen, and the fourth is your blood. One photo of a lab
                  report fills it in.
                </p>
                <div className="hv3-quarters" aria-hidden>
                  <i style={{ background: "#F2B649" }} />
                  <i style={{ background: "#5CC28C" }} />
                  <i style={{ background: "#8FB2D2" }} />
                  <i style={{ background: "var(--color-lime)" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="hv3-daily__phone">
            <div data-rv="">
              <div className="hv3-phone">
                <div className="hv3-phone__bezel">
                  <div className="hv3-phone__screen">
                    <Image
                      src="/images/v3/screen-today.webp"
                      alt="Merios Today screen: Merios Score 58, Activity 90, Recovery 42, Zen 50."
                      width={828}
                      height={1801}
                      sizes="330px"
                    />
                    <div className="hv3-phone__glare" />
                  </div>
                </div>
              </div>
            </div>
            <div className="hv3-chipwrap hv3-float" style={{ left: "2%", top: "16%" }} aria-hidden>
              <div className="hv3-pop hv3-pop--lime" style={{ rotate: "-6deg" }}>
                <span className="label">Steps</span>
                <b>11,030</b>
              </div>
            </div>
            <div className="hv3-chipwrap hv3-float" style={{ right: 0, top: "30%" }} aria-hidden>
              <div className="hv3-pop hv3-pop--peach" style={{ rotate: "5deg" }}>
                <span className="label">Resting HR</span>
                <b>
                  57<small>bpm</small>
                </b>
              </div>
            </div>
            <div className="hv3-chipwrap hv3-float" style={{ left: "6%", bottom: "12%" }} aria-hidden>
              <div className="hv3-pop hv3-pop--sky" style={{ rotate: "-3deg" }}>
                <span className="label">Asleep</span>
                <b>6h03</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
