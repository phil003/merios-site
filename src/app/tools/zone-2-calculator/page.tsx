import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CtaScreen from "@/components/calculators/tool-page/CtaScreen";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolFaq from "@/components/calculators/tool-page/ToolFaq";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import Zone2Calculator from "@/components/calculators/Zone2Calculator";
import {
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
import t from "../tools.module.css";

const FAQ_ITEMS = [
  {
    q: "How do I calculate my zone 2 heart rate?",
    a: "Estimate your maximum heart rate, then take 60–70% of it. This calculator uses the Tanaka formula, 208 − (0.7 × age), for the maximum. For a 40-year-old that is 208 − 28 = 180 bpm, so zone 2 is about 108–126 bpm. Other common methods are heart-rate reserve (Karvonen), which also uses your resting heart rate, and Maffetone's 180 − age rule of thumb. A lactate or ventilatory-threshold test is the precise way.",
  },
  {
    q: "What is zone 2 heart rate for a 40-year-old?",
    a: "With the Tanaka estimate used here, a 40-year-old has a max heart rate of about 180 bpm and a zone 2 band of roughly 108–126 bpm (60–70%). With the heart-rate-reserve method and a resting heart rate of 60 bpm, the same person gets about 132–144 bpm. With Maffetone's 180 − age, the ceiling is about 140 bpm. The methods disagree because they measure different things, so use the talk test to settle where you land.",
  },
  {
    q: "Is 180 minus age zone 2?",
    a: "Sometimes, roughly. Maffetone's MAF method (180 − age) is a popular rule of thumb for an easy aerobic ceiling, and for a 40-year-old it gives 140 bpm, a little above the top of the 60–70% of max band (126 bpm). It is a heuristic, not a measurement, and it is adjusted up or down for health and training history. Treat it as a starting point and check it against the talk test.",
  },
  {
    q: "How accurate is Apple Watch for zone 2?",
    a: "Apple's Workout app can show heart rate zones during a workout. By default they are calculated from your health data (your date of birth must be in the Health app), and you can edit the zone limits manually in the Workout settings. How closely the watch's zone 2 matches yours depends on how well its zone limits fit you and on how well the sensor reads your pulse. Chest straps tend to track fast changes better than wrist sensors. Check the limits against the talk test, and use a lab test if you need precision.",
  },
  {
    q: "What does Zone 2 feel like?",
    a: "Zone 2 is the highest effort at which you can still hold a full conversation in complete sentences. If you're gasping between words you've drifted into Zone 3; if you can sing comfortably you're likely in Zone 1. The talk test is a reliable cross-check when you don't have a heart-rate monitor.",
  },
  {
    q: "Is the age formula accurate for me?",
    a: "The Tanaka estimate (208 − 0.7 × age) is more accurate across ages than the old 220 − age rule, but it is still a population average. Individual max HR can differ by 10 bpm or more, so your real zone 2 may sit above or below the calculated band. For a precise personal zone, use a lactate test (1.5–2.0 mmol/L) or a ventilatory threshold test, and treat the calculator as a starting band. Beta-blockers and some other medicines lower heart rate, so if you take them or have a heart condition, ask your clinician before using heart-rate targets.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "Zone 2 Heart Rate Calculator (by Age, Free)",
  description:
    "Calculate your zone 2 heart rate from your age: 60–70% of an estimated max HR. A 40-year-old lands near 108–126 bpm. Free, with other methods compared.",
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

      <ToolHero
        slug="zone-2-calculator"
        eyebrow="Zone 2 — Tanaka max HR"
        title="Zone 2 Heart Rate"
        em="Calculator"
        subline="Find the heart-rate band that builds your aerobic engine. Enter your age and get your Zone 2 training range in beats per minute — the low-intensity zone that raises VO2 max with the least fatigue."
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <Zone2Calculator />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>
                How to calculate your zone 2 heart rate
              </h2>
              <p>
                This calculator uses the percent-of-max method. It estimates your max
                heart rate with the Tanaka formula, 208 − (0.7 × age), then takes
                60–70% of it. For a 40-year-old: 208 − 28 = 180 bpm max, and
                60% × 180 = 108, 70% × 180 = 126, so zone 2 is about 108–126 bpm.
                The older 220 − age rule also gives 180 at age 40 but drifts for
                younger and older people.
              </p>
              <p>
                Two other methods you will see. Heart-rate reserve (Karvonen): resting
                HR + 60–70% of (max − resting). With a resting HR of 60 and a max of
                180, the reserve is 120, so zone 2 is 60 + 72 = 132 to 60 + 84 = 144
                bpm. It sits higher because it accounts for your resting heart rate.
                Maffetone&apos;s MAF rule, 180 − age, gives 140 bpm for a 40-year-old.
                It is a popular heuristic for an easy aerobic ceiling, not a measured
                threshold.
              </p>
              <p>
                None of these is precise. Age-based formulas can be off by 10 bpm or
                more for an individual. The precise way is a lab test of your lactate
                or ventilatory threshold. Beta-blockers blunt heart rate, so if you
                take them or have a heart condition, check with your clinician first.
                This is general wellness information, not medical advice.
              </p>

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
              <ToolFaq items={FAQ_ITEMS} />

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
                <p className={t.ctaQuote}>
                  Your Zone 2 pace at the same heart rate <em>is the clearest sign your engine is growing.</em>
                </p>
                <p className={t.ctaText}>
                  Merios is for people who want to track recovery, heart rate and
                  their blood tests over time in one place.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=zone-2-calculator" className="btn btn-lime">
                  Get the app
                </Link>
              </div>
              <CtaScreen screen="today" />
            </div>
          </section>

          <ToolRelated slug="zone-2-calculator" />
        </div>
      </main>
      <Footer />
    </>
  );
}
