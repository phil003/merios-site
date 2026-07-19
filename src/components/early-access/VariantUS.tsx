"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import NewsletterForm from "./NewsletterForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

// Merios on the US App Store (ascAppId 6760352598).
const APP_STORE_URL = "https://apps.apple.com/us/app/merios/id6760352598";

// Official Apple Media Services badge. 250x83 @1x renders at ~125x42 CSS px on
// retina. Use the black variant to sit on cream canvas.
const APP_STORE_BADGE =
  "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83";

export default function VariantUS() {
  const container = useRef<HTMLElement>(null);

  // GSAP: headline char-by-char split + scroll-triggered stagger. Subline
  // fades up with 200ms delay. All gated by prefers-reduced-motion via
  // matchMedia so the scrub never runs when the user opted out.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const isReduced = context.conditions?.reduced;

          if (isReduced) {
            gsap.set([".ea-us-headline", ".ea-us-subline"], { opacity: 1 });
            return;
          }

          gsap.set(".ea-us-subline", { opacity: 0, y: 16 });

          SplitText.create(".ea-us-headline", {
            type: "chars, lines",
            autoSplit: true,
            mask: "lines",
            charsClass: "ea-us-char",
            linesClass: "ea-us-line",
            onSplit(self) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: ".ea-us-headline",
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
                defaults: { ease: "expo.out" },
              });

              tl.from(self.chars, {
                yPercent: 110,
                opacity: 0,
                duration: 0.9,
                stagger: 0.015,
              });
              tl.to(
                ".ea-us-subline",
                { opacity: 1, y: 0, duration: 0.9 },
                0.2,
              );

              return tl;
            },
          });
        },
      );
    },
    { scope: container },
  );

  return (
    <main ref={container}>
      {/* ─── Hero: cream canvas, centered editorial ─── */}
      <section
        className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
        style={{ background: "var(--color-canvas)" }}
        aria-label="Download Merios on the US App Store"
      >
        {/* Ambient animated gradient — slow 8s CSS loop, opacity capped at
            0.15. The static fallback shows under reduced-motion; the animated
            layer is hidden there (motion-reduce / motion-safe variants). */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-[60%] w-[80%] -translate-x-1/2 motion-safe:hidden"
          style={{
            background:
              "radial-gradient(50% 55% at 50% 20%, rgba(159,191,0,0.08), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="ea-us-drift pointer-events-none absolute top-0 left-1/2 h-[80%] w-[110%] motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(48% 52% at 50% 30%, rgba(159,191,0,0.15), transparent 70%), radial-gradient(40% 45% at 70% 40%, rgba(30,61,42,0.10), transparent 70%)",
            willChange: "transform, opacity",
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

          {/* Display headline — GSAP SplitText animates chars on scroll */}
          <h1
            className="ea-us-headline mt-8"
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

          {/* Lead — fades up 200ms after headline */}
          <p
            className="ea-us-subline mx-auto mt-7 max-w-[520px]"
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

          {/* CTA: App Store badge with 2 concentric pulse rings */}
          <div className="relative mx-auto mt-12 inline-block">
            {/* Pulse ring #1 — inner, expands + fades over 3s (CSS keyframes,
                hidden under reduced-motion) */}
            <span
              aria-hidden
              className="ea-us-ring pointer-events-none absolute inset-0 rounded-2xl motion-reduce:hidden"
              style={{
                boxShadow: "0 0 0 2px var(--color-pulse)",
              }}
            />
            {/* Pulse ring #2 — outer, offset by 1.5s (half of the loop) */}
            <span
              aria-hidden
              className="ea-us-ring pointer-events-none absolute inset-0 rounded-2xl motion-reduce:hidden"
              style={{
                boxShadow: "0 0 0 2px var(--color-pulse)",
                animationDelay: "1.5s",
              }}
            />

            {/* App Store badge — CSS tilt + lift on hover/focus/press */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block rounded-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5 motion-safe:hover:rotate-[4deg] motion-safe:focus-visible:-translate-y-0.5 motion-safe:focus-visible:rotate-[4deg] motion-safe:active:-translate-y-px motion-safe:active:rotate-[2deg]"
              style={{
                outlineOffset: 2,
              }}
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
            <p
              className="mt-4 text-xs"
              style={{
                fontFamily: "var(--font-sans)",
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
// CSS keyframes replacing the previous motion/react infinite loops. The drift
// keyframes fold the original rotate / x / opacity tracks into one timeline;
// translateX(-50%) keeps the layer centered (the class-based -translate-x-1/2
// is owned by the animation here). Hidden under reduced-motion via the
// motion-reduce:hidden utility on the elements.
const styles = `
@keyframes eaUsDrift {
  0% { transform: translateX(-50%) rotate(0deg); opacity: 0.85; }
  25% { transform: translateX(-48.5%) rotate(8deg); opacity: 0.95; }
  50% { transform: translateX(-50%) rotate(0deg); opacity: 1; }
  75% { transform: translateX(-51.5%) rotate(-8deg); opacity: 0.95; }
  100% { transform: translateX(-50%) rotate(0deg); opacity: 0.85; }
}
.ea-us-drift {
  animation: eaUsDrift 8s linear infinite;
}
@keyframes eaUsRing {
  0% { transform: scale(1); opacity: 0.55; }
  50% { transform: scale(1.18); opacity: 0.2; }
  100% { transform: scale(1.35); opacity: 0; }
}
.ea-us-ring {
  animation: eaUsRing 3s var(--ease-smooth) infinite backwards;
}
`;
