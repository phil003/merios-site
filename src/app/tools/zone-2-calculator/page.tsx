import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import Zone2Calculator from "@/components/calculators/Zone2Calculator";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";

const FAQ_ITEMS = [
  {
    q: "How do you calculate your Zone 2 heart rate?",
    a: "Estimate your maximum heart rate with the Tanaka formula — 208 − (0.7 × age) — then take 60–70% of that number. For a 40-year-old, max HR ≈ 180 bpm, so Zone 2 lands at roughly 108–126 bpm. The calculator above does this for any age.",
  },
  {
    q: "What does Zone 2 feel like?",
    a: "Zone 2 is the highest effort at which you can still hold a full conversation in complete sentences. If you're gasping between words you've drifted into Zone 3; if you can sing comfortably you're likely in Zone 1. The talk test is a reliable cross-check when you don't have a heart-rate monitor.",
  },
  {
    q: "Why train in Zone 2 specifically?",
    a: "Zone 2 is the intensity where your body relies most on fat as fuel and where mitochondrial density and capillary networks adapt most efficiently. It builds the aerobic base that raises VO2 max over time — with far less fatigue and injury risk than high-intensity work, so you can accumulate more weekly volume.",
  },
  {
    q: "Is the age formula accurate for me?",
    a: "The Tanaka estimate (208 − 0.7 × age) is more accurate across ages than the old 220 − age rule, but it is still a population average — individual max HR varies by ±10–12 bpm. For a precise personal zone, use a lactate test (1.5–2.0 mmol/L) or a lab VO2 max assessment, and treat the calculator as a starting band.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "Zone 2 Heart Rate Calculator (by Age, Free) | Merios",
  description:
    "Free Zone 2 heart rate calculator. Enter your age — get your Zone 2 training band in bpm using the Tanaka max-HR formula, plus how to verify it with the talk test.",
  alternates: { canonical: "https://merios.life/tools/zone-2-calculator" },
  openGraph: {
    title: "Zone 2 Heart Rate Calculator — by Age",
    description:
      "Get your Zone 2 training band in bpm from your age. Free, no signup. Tanaka max-HR formula.",
    url: "https://merios.life/tools/zone-2-calculator",
    type: "website",
  },
};

export default function Zone2CalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/zone-2-calculator#tool",
    name: "Zone 2 Heart Rate Calculator",
    url: "https://merios.life/tools/zone-2-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free Zone 2 heart-rate calculator by age. Tanaka max-HR formula, 60–70% band.",
    isAccessibleForFree: true,
    citation:
      "Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol 2001;37(1):153-156.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "Zone 2 Calculator", url: "https://merios.life/tools/zone-2-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />

      <PageHero
        eyebrow="Zone 2 — Tanaka max HR"
        title="Find the heart-rate band that builds your aerobic engine."
        subline="Enter your age and get your Zone 2 training range in beats per minute — the low-intensity zone that raises VO2 max with the least fatigue."
        align="left"
      />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <Zone2Calculator />

          <section
            className="mt-14 max-w-[720px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              Zone 2 heart rate by age
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              These bands come from the Tanaka max-HR estimate at 60–70%. Use them
              as a starting range and confirm with the talk test — Zone 2 is the
              hardest effort at which you can still speak in full sentences.
            </p>
            <div
              style={{
                border: "1px solid var(--color-grid)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {[
                { age: "25", max: "191 bpm", z2: "114–133 bpm" },
                { age: "30", max: "187 bpm", z2: "112–131 bpm" },
                { age: "40", max: "180 bpm", z2: "108–126 bpm" },
                { age: "50", max: "173 bpm", z2: "104–121 bpm" },
                { age: "60", max: "166 bpm", z2: "100–116 bpm" },
              ].map((r, i) => (
                <div
                  key={r.age}
                  className="flex gap-4 px-5 py-4"
                  style={{ borderTop: i === 0 ? undefined : "1px solid var(--color-grid)" }}
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: "var(--color-pulse)" }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        color: "var(--color-ink)",
                      }}
                    >
                      Age {r.age} — Zone 2 {r.z2}
                    </div>
                    <div
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: "var(--color-ink-secondary)",
                        marginTop: 2,
                      }}
                    >
                      Estimated max HR {r.max}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2
              className="mt-12"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              Why Zone 2 is the base every other zone sits on
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
              }}
            >
              At Zone 2 intensity your body draws most of its fuel from fat and
              trains the slow-twitch machinery — mitochondria and capillaries —
              that determines how much aerobic work you can sustain. Because it is
              low-stress, you can accumulate hours of it each week without the
              recovery cost of intervals, which is exactly why endurance coaches
              build 70–80% of total training volume here. Raise the floor with
              Zone 2 and every harder effort above it improves too.
            </p>

            <h2
              className="mt-12"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              Frequently asked questions
            </h2>
            <dl>
              {FAQ_ITEMS.map(({ q, a }) => (
                <div
                  key={q}
                  className="border-b py-5"
                  style={{ borderColor: "var(--color-grid)" }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 19,
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: "var(--color-ink)",
                    }}
                  >
                    {q}
                  </dt>
                  <dd
                    className="mt-2"
                    style={{
                      fontSize: 15.5,
                      lineHeight: 1.65,
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    {a}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              className="mt-10"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                lineHeight: 1.7,
                color: "var(--color-ink-tertiary)",
              }}
            >
              Reference: Tanaka H, Monahan KD, Seals DR. <em>Age-predicted maximal
              heart rate revisited.</em> J Am Coll Cardiol 2001;37(1):153-156.
            </p>

            <div
              className="mt-12 rounded-xl p-6 md:p-7"
              style={{
                background: "var(--color-canvas-alt, #ffffff)",
                border: "1px solid var(--color-grid)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-green-deep)",
                  fontWeight: 500,
                }}
              >
                Track this in Merios
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  lineHeight: 1.25,
                }}
              >
                Your Zone 2 pace at the same heart rate is the clearest sign your engine is growing.
              </p>
              <p
                className="mt-3"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Merios overlays your resting heart rate and VO2 max trend with your
                blood markers — so aerobic progress shows up next to the labs it
                actually moves.
              </p>
              <Link
                href="/early-access"
                className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--color-green-deep)",
                  color: "var(--color-canvas)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Get the app
              </Link>
              <Link
                href="/blog/zone-2-cardio-heart-rate"
                className="mt-5 ml-3 inline-flex items-center gap-2 px-3 py-3 text-[14px] font-medium"
                style={{
                  color: "var(--color-ink-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Read the Zone 2 guide →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
