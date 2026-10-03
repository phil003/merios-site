import type { CSSProperties } from "react";
import { AppleGlyph, Arrow } from "./icons";

const d = (s: number) => ({ "--rd-d": `${s}s` }) as CSSProperties;
const he = (s: number) => ({ "--he-d": `${s}s` }) as CSSProperties;

/**
 * Night hero. Server-rendered so the H1 paints at parse time: the words
 * resolve from motion blur with CSS only (.rd-word), never waiting for JS.
 * The pulse line drawn beside it lives in <Overture /> (fixed visual).
 */
export default function Hero() {
  return (
    <section
      id="hv3-hero"
      className="hv3-hero"
      data-stage="night"
      data-nav="dark"
      aria-labelledby="hv3-hero-title"
    >
      <div className="hv3-wrap hv3-hero__inner">
        <div className="hv3-hero__copy">
          <span className="label he" style={he(0.45)}>
            <span aria-hidden className="label-dot" />
            Blood tests · Apple Health · Plain English
          </span>
          <h1 className="hv3-hero__title" id="hv3-hero-title">
            <span className="line">
              <span className="rd-word" style={d(0.1)}>Your</span>{" "}
              <span className="rd-word" style={d(0.185)}>health,</span>
            </span>{" "}
            <span className="line">
              <span className="rd-word chrome-text" style={d(0.27)}>finally</span>{" "}
              <span className="rd-word chrome-text" style={d(0.355)}>readable.</span>
            </span>
          </h1>
          <p className="lead hv3-hero__sub he" style={he(0.55)}>
            Merios reads your lab reports and the 365 days already on your
            iPhone, then tells you what they mean. In plain English.
          </p>
          <div className="hv3-hero__ctas he" style={he(0.65)}>
            <a className="btn btn-lime" href="/early-access">
              <AppleGlyph />
              Download on the App Store
            </a>
            <a className="btn btn-ghost-night" href="#translate">
              See how it reads <Arrow className="btn-arrow" />
            </a>
          </div>
          <div className="hv3-hero__meta he" style={he(0.75)}>
            <span>Free on iPhone</span>
            <span>Merios Plus for your blood</span>
            <span>Example data</span>
          </div>
        </div>
      </div>
      <div className="hv3-scroll label" aria-hidden>
        Scroll
        <i />
      </div>
    </section>
  );
}
