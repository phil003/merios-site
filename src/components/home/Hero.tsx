import Image from "next/image";
import type { CSSProperties } from "react";
import AmbientVideo from "./AmbientVideo";
import { AppleGlyph, Arrow } from "./icons";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Dawn hero (Home2 v24): the coast-run film over its own first frame, a haze
 * veil on the copy side, a glass eyebrow and the ink CTA. The still is the
 * one preloaded image and the whole view under reduced motion. The film plays
 * once and holds before its loop crossfade, which would double the runner.
 * Under 960px the copy sits above the photo (no text over the runner).
 * Server-rendered: the H1 paints at parse time.
 */
export default function Hero() {
  return (
    <section className="hv2-hero" aria-labelledby="hv2-hero-title">
      <div className="hv2-hero__media">
        <Image
          src="/videos/v2/loop_coast_run_poster.jpg"
          alt="A woman runs along a cliff-top path above the sea at sunrise."
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="hv2-hero__img"
        />
        <AmbientVideo
          src="/videos/v2/loop_coast_run.mp4"
          className="hv2-hero__video"
          stopAt={5.6}
          preload="auto"
        />
      </div>
      <div className="hv2-hero__veil" aria-hidden="true" />

      <div className="hv2-wrap hv2-hero__inner">
        <div className="hv2-hero__copy">
          <p className="hv2-pill hv2-up">The preventive health platform</p>
          <h1 id="hv2-hero-title" className="hv2-hero__title hv2-up" style={d(0.06)}>
            Your health, <em>finally readable.</em>
          </h1>
          <p className="hv2-hero__sub hv2-up" style={d(0.12)}>
            Your blood tests and your Apple Health data, read together and
            explained in plain English. Simple. Clear. Precise.
          </p>
          <div className="hv2-hero__ctas hv2-up" style={d(0.18)}>
            <a className="btn btn-ink hv2-btn-lg" href="/early-access">
              <AppleGlyph />
              Download on the App Store
            </a>
            <a className="btn hv2-btn-glass hv2-btn-lg" href="#translate">
              See how it reads <Arrow className="btn-arrow" width={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
