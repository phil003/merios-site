import type { CSSProperties } from "react";
import { AppleGlyph, Arrow, Check } from "./icons";

/* Free and Plus. Facts as of the App Store listing (Oct 2026): the daily side
   is free for good; Merios Plus is $44/year after a 7-day free trial on the
   annual plan, with monthly and weekly plans also available. */

const FREE = [
  "Your Merios Score and three rings, every morning",
  "365 days imported from Apple Health, read only",
  "Live monitor, journal and cycle",
  "Enter a marker by hand and see it in its range",
];
const PLUS = [
  "Photo and PDF scans, every marker read and tracked report to report",
  "Biological age, recomputed with every new report",
  "Links between your blood work and your daily data",
  "Your monthly report, written from your own numbers",
];

export default function Plans() {
  return (
    <section id="plans" className="hv3-plans" data-stage="fog" aria-labelledby="plans-title">
      <div className="hv3-wrap">
        <div className="hv3-plans__head" data-rv="">
          <span className="label">
            <span aria-hidden className="label-dot label-dot--ink" />
            Free and Plus
          </span>
          <h2 className="hv3-h2" id="plans-title">
            Start free. Add Plus when your blood test lands.
          </h2>
          <p className="lead">
            Your score, your rings and your year stay free for good. Plus adds
            the half your watch cannot see.
          </p>
        </div>
        <div className="hv3-plans__grid">
          <div data-rv="">
            <article className="hv3-plan hv3-plan--free">
              <div className="hv3-plan__top">
                <span className="hv3-plan__name">Merios</span>
                <span className="hv3-pill">Free</span>
              </div>
              <div className="hv3-plan__price">
                <b>$0</b>
                <span>for good</span>
                <em>No card. No trial clock.</em>
              </div>
              <ul>
                {FREE.map((f) => (
                  <li key={f}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="hv3-plan__cta">
                <a className="btn btn-ink" href="/early-access">
                  <AppleGlyph size={15} />
                  Download free
                </a>
              </div>
            </article>
          </div>
          <div data-rv="" style={{ "--rv-delay": "0.1s" } as CSSProperties}>
            <article className="hv3-plan hv3-plan--plus">
              <span className="hv3-plan__orb" aria-hidden />
              <div className="hv3-plan__top">
                <span className="hv3-plan__name chrome-text">Merios Plus</span>
                <span className="hv3-pill" style={{ color: "var(--color-lime)" }}>
                  7 days free
                </span>
              </div>
              <div className="hv3-plan__price">
                <b>$44</b>
                <span>a year</span>
                <em>After a 7-day free trial on the annual plan · monthly and weekly plans also available</em>
              </div>
              <ul>
                {PLUS.map((f) => (
                  <li key={f}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="hv3-plan__cta">
                <a className="btn btn-lime" href="/early-access">
                  Start 7 days free <Arrow className="btn-arrow" />
                </a>
                <span className="hv3-plan__note">
                  Cancel any time in the App Store. Cancelling deletes nothing.
                </span>
              </div>
            </article>
          </div>
        </div>
        <p className="hv3-fine hv3-plans__fine">
          Prices in US dollars. The App Store shows the price for your country.
        </p>
      </div>
    </section>
  );
}
