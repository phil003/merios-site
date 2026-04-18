"use client";

import { motion, useReducedMotion } from "motion/react";
import NewsletterForm from "./NewsletterForm";

// TODO Sprint-5-post: replace id000000000 with the real App Store ID.
const APP_STORE_URL = "https://apps.apple.com/us/app/merios/id000000000";

// Official Apple Media Services badge. 250x83 @1x renders at ~125x42 CSS px on
// retina. Use the black variant to sit on cream canvas.
const APP_STORE_BADGE =
  "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83";

export default function VariantUS() {
  const reduced = useReducedMotion();

  // Pulse ring — scale [1,1.08,1] + opacity [0.55,0,0.55] over 2.4s, looping.
  // Gated by useReducedMotion to respect a11y.
  const pulseAnimation = reduced
    ? { opacity: 0.35 }
    : {
        scale: [1, 1.08, 1],
        opacity: [0.55, 0, 0.55],
      };

  return (
    <main>
      {/* ─── Hero: cream canvas, centered editorial ─── */}
      <section
        className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
        style={{ background: "var(--color-canvas)" }}
        aria-label="Download Merios on the US App Store"
      >
        {/* Soft ambient pulse radial for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-[60%] w-[80%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 55% at 50% 20%, rgba(159,191,0,0.08), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[720px] px-6 text-center md:px-10">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span
              aria-hidden
              className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-pulse)" }}
            />
            <span
              className="text-[10.5px] uppercase"
              style={{
                color: "var(--color-green-deep)",
                letterSpacing: "0.22em",
                fontWeight: 500,
              }}
            >
              Available on iOS
            </span>
          </div>

          {/* Display headline */}
          <h1
            className="mt-8"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-l)",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
            }}
          >
            Your score,
            <br />
            in your pocket.
          </h1>

          {/* Lead */}
          <p
            className="mx-auto mt-7 max-w-[520px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
            }}
          >
            Merios is live on the US App Store. Upload a blood test, connect
            Apple Health, and read your body with clinical precision —
            right from your iPhone.
          </p>

          {/* CTA: App Store badge with pulse ring */}
          <div className="relative mx-auto mt-12 inline-block">
            {/* Pulse ring — behind the badge, gated by reduced-motion */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "0 0 0 2px var(--color-pulse)",
              }}
              animate={pulseAnimation}
              transition={
                reduced
                  ? { duration: 0.3 }
                  : {
                      duration: 2.4,
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                    }
              }
            />
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block transition-transform motion-reduce:transform-none hover:-translate-y-0.5"
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
            className="mt-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--color-ink-tertiary)",
            }}
          >
            iPhone · iOS 17+ · Free to start
          </p>
        </div>
      </section>

      {/* ─── Newsletter: "Stay informed as the US rollout expands" ─── */}
      <section
        className="relative py-24 md:py-28"
        style={{
          background: "var(--color-canvas-alt)",
          borderTop: "1px solid var(--color-grid)",
        }}
        aria-label="Stay informed as Merios rolls out across the US"
      >
        <div className="mx-auto max-w-[560px] px-6 md:px-10">
          <div
            className="inline-flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span
              className="text-[10.5px] uppercase"
              style={{
                color: "var(--color-ink-tertiary)",
                letterSpacing: "0.22em",
                fontWeight: 500,
              }}
            >
              Rollout updates
            </span>
          </div>

          <h2
            className="mt-5"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
            }}
          >
            Stay informed as the US rollout expands.
          </h2>

          <p
            className="mt-5 max-w-[460px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
            }}
          >
            New lab integrations, new biomarkers, new coverage — once a month,
            in your inbox.
          </p>

          <div className="mt-10">
            <NewsletterForm
              source="early-access-us"
              tone="light"
              idleMessage="One email a month. Signal over noise."
              submitLabel="Subscribe"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
