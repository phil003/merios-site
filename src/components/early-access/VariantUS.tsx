"use client";

import type { CSSProperties, ReactNode } from "react";
import NewsletterForm from "./NewsletterForm";

// Merios on the US App Store (ascAppId 6760352598).
const APP_STORE_URL = "https://apps.apple.com/us/app/merios/id6760352598";

// Official Apple Media Services badge. 250x83 @1x renders at ~125x42 CSS px on
// retina. The black variant carries its own hairline, so it reads on the
// night stage too.
const APP_STORE_BADGE =
  "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83";

// Headline words rise out of a mask (the PageHero .ph-word / .ph-char CSS
// keyframes). CSS-only and started at parse time — the H1 is never held at
// opacity 0 waiting for JavaScript, and its text stays exactly
// "Your score, in your pocket." in the server HTML.
function Rise({ d, children }: { d: number; children: ReactNode }) {
  return (
    <span className="ph-word">
      <span className="ph-char" style={{ "--ph-d": `${d}s` } as CSSProperties}>
        {children}
      </span>
    </span>
  );
}

export default function VariantUS() {
  return (
    <main className="ea-us">
      {/* ─── Hero: night stage, centered ─── */}
      <section
        className="night relative overflow-hidden"
        data-nav="dark"
        aria-label="Download Merios on the US App Store"
        style={{
          paddingTop: "clamp(140px, 16vw, 200px)",
          paddingBottom: "clamp(128px, 13vw, 184px)",
        }}
      >
        {/* Ambient light — slow 8s CSS loop, opacity capped low. The static
            fallback shows under reduced-motion; the animated layer is hidden
            there (motion-reduce / motion-safe variants). */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-[60%] w-[80%] -translate-x-1/2 motion-safe:hidden"
          style={{
            background:
              "radial-gradient(closest-side at 50% 42%, rgb(214 240 80 / 0.07), transparent)",
          }}
        />
        <div
          aria-hidden
          className="ea-us-drift pointer-events-none absolute top-0 left-1/2 h-[80%] w-[110%] motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(closest-side at 50% 40%, rgb(214 240 80 / 0.1), transparent), radial-gradient(40% 45% at 70% 44%, rgb(201 184 255 / 0.08), transparent 70%)",
            willChange: "transform, opacity",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-[820px] px-[var(--spacing-container)] text-center">
          {/* Eyebrow */}
          <div className="he label" style={{ color: "var(--color-on-night-2)" }}>
            <span aria-hidden className="label-dot animate-pulse-dot" />
            <span>Available on iOS</span>
          </div>

          {/* Display headline */}
          <h1
            className="display mt-7"
            style={{
              fontSize: "var(--text-display-l)",
              color: "var(--color-on-night)",
            }}
          >
            <Rise d={0.06}>Your</Rise> <Rise d={0.12}>score,</Rise>
            <br />
            <Rise d={0.2}>in</Rise> <Rise d={0.26}>your</Rise>{" "}
            <Rise d={0.32}>pocket.</Rise>
          </h1>

          {/* Lead */}
          <p
            className="he mx-auto mt-7 max-w-[540px]"
            style={
              {
                "--he-d": "0.3s",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body-l)",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                color: "var(--color-on-night-2)",
                textWrap: "pretty",
              } as CSSProperties
            }
          >
            Merios is live on the US App Store. Upload a blood test, connect
            Apple Health, and read your body with clinical precision —
            right from your iPhone.
          </p>

          {/* CTA: App Store badge with 2 concentric lime pulse rings */}
          <div
            className="he relative mx-auto mt-12 inline-block"
            style={{ "--he-d": "0.42s" } as CSSProperties}
          >
            {/* Pulse ring #1 — inner, expands + fades over 3s (CSS keyframes,
                hidden under reduced-motion) */}
            <span
              aria-hidden
              className="ea-us-ring pointer-events-none absolute inset-0 rounded-2xl motion-reduce:hidden"
              style={{
                boxShadow: "0 0 0 2px var(--color-lime)",
              }}
            />
            {/* Pulse ring #2 — outer, offset by 1.5s (half of the loop) */}
            <span
              aria-hidden
              className="ea-us-ring pointer-events-none absolute inset-0 rounded-2xl motion-reduce:hidden"
              style={{
                boxShadow: "0 0 0 2px var(--color-lime)",
                animationDelay: "1.5s",
              }}
            />

            {/* App Store badge — CSS tilt + lift on hover/focus/press */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ea-us-badge relative inline-block rounded-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-0.5 motion-safe:hover:rotate-[4deg] motion-safe:focus-visible:-translate-y-0.5 motion-safe:focus-visible:rotate-[4deg] motion-safe:active:-translate-y-px motion-safe:active:rotate-[2deg]"
              aria-label="Download Merios on the App Store"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={APP_STORE_BADGE}
                alt="Download on the App Store"
                width={165}
                height={55}
                style={{ display: "block" }}
              />
            </a>
          </div>

          {/* Caption under CTA */}
          <p
            className="he mt-7"
            style={
              {
                "--he-d": "0.5s",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--color-on-night-2)",
              } as CSSProperties
            }
          >
            iPhone · iOS 15.1+ · Free to start
          </p>
        </div>

        {/* The logo's heartbeat as the stage's horizon */}
        <svg
          className="v3-hero__pulse"
          aria-hidden
          focusable="false"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ea-us-pulse-fade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
            fill="none"
            stroke="url(#ea-us-pulse-fade)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="v3-hero__dot" aria-hidden />
      </section>

      {/* ─── Newsletter: "Stay informed as the US rollout expands" ─── */}
      <section
        className="relative px-[var(--spacing-container)]"
        style={{
          background: "var(--color-canvas)",
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(72px, 9vw, 128px)",
        }}
        aria-label="Stay informed as Merios rolls out across the US"
      >
        <div
          className="mx-auto grid max-w-[1320px] grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12"
          style={{
            background: "var(--color-canvas-alt)",
            border: "1px solid var(--color-grid)",
            borderRadius: "clamp(24px, 2.8vw, 34px)",
            padding: "clamp(26px, 4.4vw, 64px)",
          }}
        >
          <div className="lg:col-span-7">
            <div
              className="label"
              style={{ color: "var(--color-ink-tertiary)" }}
            >
              <span aria-hidden className="label-dot label-dot--ink" />
              <span>Rollout updates</span>
            </div>

            <h2
              className="mt-6 max-w-[15ch]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display-m)",
                fontWeight: 740,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                fontVariationSettings: '"opsz" 96',
                color: "var(--color-ink)",
                textWrap: "balance",
              }}
            >
              Stay informed as the US rollout expands.
            </h2>

            <p
              className="mt-6 max-w-[460px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body-l)",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                color: "var(--color-ink-secondary)",
                textWrap: "pretty",
              }}
            >
              New lab integrations, new biomarkers, new coverage — once a month,
              in your inbox.
            </p>
          </div>

          <div className="lg:col-span-5">
            <NewsletterForm
              source="early-access-us"
              tone="light"
              idleMessage="One email a month. Signal over noise."
              submitLabel="Subscribe"
            />
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                lineHeight: 1.5,
                color: "var(--color-ink-tertiary)",
              }}
            >
              No spam. Unsubscribe in 1 click.
            </p>
          </div>
        </div>
      </section>

      <style>{styles}</style>
    </main>
  );
}

// ─── Scoped animation styles ─────────────────────────────────────────────────
// CSS keyframes for the ambient drift (translateX(-50%) keeps the layer
// centered — the class-based -translate-x-1/2 is owned by the animation here)
// and the badge's lime pulse rings. Hidden under reduced-motion via the
// motion-reduce:hidden utility on the elements. Prefixed .ea-us.
const styles = `
@keyframes eaUsDrift {
  0% { transform: translateX(-50%) rotate(0deg); opacity: 0.85; }
  25% { transform: translateX(-48.5%) rotate(8deg); opacity: 0.95; }
  50% { transform: translateX(-50%) rotate(0deg); opacity: 1; }
  75% { transform: translateX(-51.5%) rotate(-8deg); opacity: 0.95; }
  100% { transform: translateX(-50%) rotate(0deg); opacity: 0.85; }
}
.ea-us .ea-us-drift {
  animation: eaUsDrift 8s linear infinite;
}
@keyframes eaUsRing {
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.18); opacity: 0.22; }
  100% { transform: scale(1.35); opacity: 0; }
}
.ea-us .ea-us-ring {
  animation: eaUsRing 3s var(--ease-smooth) infinite backwards;
}
.ea-us .ea-us-badge:focus-visible {
  outline: 2px solid var(--color-lime);
  outline-offset: 4px;
}
`;
