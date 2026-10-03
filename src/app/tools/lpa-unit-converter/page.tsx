import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import LpaConverter from "@/components/calculators/LpaConverter";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const FAQ_ITEMS = [
  { q: "How do you convert Lp(a) from nmol/L to mg/dL?", a: "There is no exact conversion, and any calculator giving you a single number is overstating its precision. The two units measure different things: mg/dL is the mass of the particle and nmol/L is the number of particles, and apo(a) particle size varies between individuals. Commonly used approximations divide nmol/L by somewhere between 2.15 and 2.5, which is why this tool returns a range." },
  { q: "What Lp(a) level is considered high?", a: "The thresholds most often cited are roughly 125 nmol/L or 50 mg/dL, with an intermediate zone below that. Guidelines differ, and because the unit conversion is imprecise the two thresholds do not map onto each other perfectly. Interpret against the reference range printed on your own report." },
  { q: "Why did my Lp(a) change between two tests?", a: "Most often it did not. Lp(a) is largely genetically determined and stable across adult life, so a different number between two labs is more likely to reflect a change in units or assay method than a real biological change. This is the main practical reason to stay with one lab and one unit when tracking it." },
  { q: "Should I retest my Lp(a)?", a: "Usually not. Because the level is inherited and stable, most guidance treats Lp(a) as a once-in-a-lifetime measurement rather than something to monitor. The exception is a clinician-directed retest, for example to confirm an unexpectedly high first result or on a different assay." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." }
];

export const metadata: Metadata = {
  title: "Lp(a) Unit Converter (nmol/L to mg/dL)",
  description:
    "Convert Lp(a) between nmol/L and mg/dL. Returns a range rather than a false single number, because no exact conversion between these units exists.",
  alternates: { canonical: "https://merios.life/tools/lpa-unit-converter" },
  openGraph: {
    title: "Lp(a) Unit Converter (nmol/L to mg/dL)",
    description: "Convert Lp(a) between nmol/L and mg/dL. Returns a range rather than a false single number, because no exact conversion between these units exists.",
    url: "https://merios.life/tools/lpa-unit-converter",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/lpa-unit-converter#tool",
    name: "Lp(a) Unit Converter (nmol/L to mg/dL)",
    url: "https://merios.life/tools/lpa-unit-converter",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: "Convert Lp(a) between nmol/L and mg/dL. Returns a range rather than a false single number, because no exact conversion between these units exists.",
    isAccessibleForFree: true,
    citation: "Lp(a) mass and particle concentration are not interconvertible exactly; apo(a) isoform size varies between individuals.",
    inLanguage: "en",
  };
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "Lp(a) Unit Converter (nmol/L to mg/dL)", url: "https://merios.life/tools/lpa-unit-converter" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero eyebrow="Lp(a) — nmol/L ↔ mg/dL" title="Two labs, two numbers, one lipoprotein." subline="Convert Lp(a) between nmol/L and mg/dL. Returns a range rather than a false single number, because no exact conversion between these units exists." align="left" />

      <main className={t.main}>
        <div className={t.wrap}>
          <LpaConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>Why there is no exact conversion</h2>
              <p>
                This is the part every other converter skips. Milligrams per deciliter measures the total mass of Lp(a)
                in your blood. Nanomoles per litre counts how many Lp(a) particles are there. Converting between them
                requires knowing the mass of one particle — and that is not a constant, because the apo(a) protein comes
                in different sizes from person to person, determined genetically.
              </p>
              <p>
                So a conversion factor is a population average applied to an individual. It gets you in the right
                neighbourhood, which is genuinely useful when you are staring at a number in an unfamiliar unit, but it
                is not a translation. Presenting one decimal place of false precision would be worse than showing the
                range honestly.
              </p>
              <h2>What actually matters about Lp(a)</h2>
              <p>
                Lp(a) is an independent, largely inherited cardiovascular risk factor — the fuller picture is in{" "}
                <Link href="/blog/lp-a-lipoprotein-a-high">what a high Lp(a) means</Link>. Because you
                cannot change it much through lifestyle, an elevated result is best read as a reason to be more
                deliberate about the risks you can change:{" "}
                <Link href="/blog/apob-heart-disease-risk">ApoB</Link>, blood pressure, and the rest
                of the{" "}
                <Link href="/blog/how-to-lower-cholesterol-without-medication">modifiable lipid picture</Link>.
                It is also worth knowing that an elevated Lp(a) is a reason for first-degree relatives to be tested.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
