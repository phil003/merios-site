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
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

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
  title: "Zone 2 Heart Rate Calculator (by Age, Free)",
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

      <main className={t.main}>
        <div className={t.wrap}>
          <Zone2Calculator />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>
                Zone 2 heart rate by age
              </h2>
              <p>
                These bands come from the Tanaka max-HR estimate at 60–70%. Use them
                as a starting range and confirm with the talk test — Zone 2 is the
                hardest effort at which you can still speak in full sentences.
              </p>
              <div className={t.bands} data-rv="">
                {[
                  { age: "25", max: "191 bpm", z2: "114–133 bpm", lo: 114, hi: 133 },
                  { age: "30", max: "187 bpm", z2: "112–131 bpm", lo: 112, hi: 131 },
                  { age: "40", max: "180 bpm", z2: "108–126 bpm", lo: 108, hi: 126 },
                  { age: "50", max: "173 bpm", z2: "104–121 bpm", lo: 104, hi: 121 },
                  { age: "60", max: "166 bpm", z2: "100–116 bpm", lo: 100, hi: 116 },
                ].map((r) => (
                  <div key={r.age} className={t.bandRow}>
                    <span aria-hidden className={t.bandDot} data-tone="lime" />
                    <div className={t.bandBody}>
                      <div className={t.bandHead}>
                        Age {r.age} — Zone 2 {r.z2}
                      </div>
                      <div className={t.bandNote}>
                        Estimated max HR {r.max}
                      </div>
                    </div>
                    {/* the band on a 90–140 bpm axis: it slides down with age (decorative) */}
                    <span aria-hidden className={t.bandScale}>
                      <span
                        data-tone="ok"
                        style={{ left: `${((r.lo - 90) / 50) * 100}%`, width: `${((r.hi - r.lo) / 50) * 100}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>

              <h2>
                Why Zone 2 is the base every other zone sits on
              </h2>
              <p>
                At Zone 2 intensity your body draws most of its fuel from fat and
                trains the slow-twitch machinery — mitochondria and capillaries —
                that determines how much aerobic work you can sustain. Because it is
                low-stress, you can accumulate hours of it each week without the
                recovery cost of intervals, which is exactly why endurance coaches
                build 70–80% of total training volume here. Raise the floor with
                Zone 2 and every harder effort above it improves too.
              </p>
            </div>

            <div className={t.faq} data-rv="">
              <h2 className={t.faqTitle}>Frequently asked questions</h2>
              <dl className={t.faqList}>
                {FAQ_ITEMS.map(({ q, a }) => (
                  <div key={q} className={t.faqItem}>
                    <dt className={t.faqQ}>
                      {q}
                    </dt>
                    <dd className={t.faqA}>
                      {a}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className={t.reference}>
                Reference: Tanaka H, Monahan KD, Seals DR. <em>Age-predicted maximal
                heart rate revisited.</em> J Am Coll Cardiol 2001;37(1):153-156.
              </p>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={`chrome-text ${t.ctaQuote}`}>
                  Your Zone 2 pace at the same heart rate is the clearest sign your engine is growing.
                </p>
                <p className={t.ctaText}>
                  Merios overlays your resting heart rate and VO2 max trend with your
                  blood markers — so aerobic progress shows up next to the labs it
                  actually moves.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/zone-2-cardio-heart-rate" className="btn btn-ghost-night">
                  Read the Zone 2 guide →
                </Link>
              </div>
              <CtaPulse />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
