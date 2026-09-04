import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import TyGIndexCalculator from "@/components/calculators/TyGIndexCalculator";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const FAQ_ITEMS = [
  {
    q: "What is the TyG index formula?",
    a: "TyG = ln[(triglycerides mg/dL × fasting glucose mg/dL) / 2]. The division by 2 happens inside the natural logarithm — writing it as ln(TG × glucose) / 2 gives a different and incorrect number, and that error is common enough that it has its own published correction literature.",
  },
  {
    q: "What is a normal TyG index?",
    a: "There is no single agreed cutoff. Values under 8.0 are generally considered low, 8.0 to 8.5 typical for a general adult population, and thresholds near 8.5 are the ones most often cited for metabolic syndrome. Cutoffs vary by population and ethnicity, so the trend in your own number over time is more informative than any fixed line.",
  },
  {
    q: "Is the TyG index better than HOMA-IR?",
    a: "It is not strictly better, but it is far more available. HOMA-IR requires fasting insulin, which is rarely on a standard panel and often has to be ordered separately. TyG uses triglycerides and fasting glucose, which appear on almost every routine lipid and metabolic panel — so most people can compute it from lab work they already have.",
  },
  {
    q: "Can I calculate the TyG index in mmol/L?",
    a: "Yes, but the values must be converted to mg/dL first, because the constant in the formula is defined in US units. Multiply triglycerides in mmol/L by 88.57 and glucose in mmol/L by 18.02. The calculator on this page does that conversion for you when you switch units.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "TyG Index Calculator (Triglyceride-Glucose Index)",
  description:
    "Free TyG index calculator. Enter triglycerides and fasting glucose — get your triglyceride-glucose index, an insulin resistance marker that needs no fasting insulin.",
  alternates: { canonical: "https://merios.life/tools/tyg-index-calculator" },
  openGraph: {
    title: "TyG Index Calculator — Insulin Resistance Without Fasting Insulin",
    description:
      "Compute the triglyceride-glucose index from two values already on your standard panel. Free, no signup, mg/dL and mmol/L.",
    url: "https://merios.life/tools/tyg-index-calculator",
    type: "website",
  },
};

export default function TyGCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/tyg-index-calculator#tool",
    name: "TyG Index Calculator",
    url: "https://merios.life/tools/tyg-index-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free triglyceride-glucose (TyG) index calculator for insulin resistance, using triglycerides and fasting glucose.",
    isAccessibleForFree: true,
    citation:
      "Simental-Mendia LE, Rodriguez-Moran M, Guerrero-Romero F. The product of fasting glucose and triglycerides as surrogate for identifying insulin resistance in apparently healthy subjects. Metab Syndr Relat Disord 2008;6(4):299-304.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "TyG Index Calculator", url: "https://merios.life/tools/tyg-index-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="TyG index — insulin resistance"
        title="Check your insulin resistance without a fasting insulin test."
        subline="The triglyceride-glucose index uses two numbers that are already on your standard panel — no separate insulin draw required."
        align="left"
      />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <TyGIndexCalculator />

          <section className="mt-14 max-w-[720px]" style={{ fontFamily: "var(--font-sans)" }}>
            <h2 style={h2Style}>Why this exists</h2>
            <p style={pStyle}>
              The standard way to estimate insulin resistance is{" "}
              <Link href="/blog/homa-ir-insulin-resistance" style={linkStyle}>
                HOMA-IR
              </Link>
              , and it is a good measure — but it needs a fasting insulin result, which is rarely included on a routine
              panel and usually has to be requested specifically. Most people never have it.
            </p>
            <p style={pStyle}>
              The TyG index was developed to fill exactly that gap. It uses triglycerides and fasting glucose, two values
              that appear together on virtually every standard lipid and metabolic panel. If you have had blood work in
              the last year, you almost certainly already have both numbers — which means you can compute this today
              rather than after another draw.
            </p>

            <h2 style={h2Style}>How to read your number</h2>
            <p style={pStyle}>
              TyG is a continuous marker, not a diagnosis. Reported cutoffs differ between studies and populations, and
              the value that matters most is your own trend across repeat panels. A number that climbs year over year is
              a more meaningful signal than a single reading sitting slightly above a published threshold.
            </p>
            <p style={pStyle}>
              Because both inputs move with diet and metabolic health, TyG responds to the same levers that move{" "}
              <Link href="/blog/how-to-lower-triglycerides" style={linkStyle}>
                triglycerides
              </Link>{" "}
              and{" "}
              <Link href="/blog/fasting-glucose-100-borderline" style={linkStyle}>
                fasting glucose
              </Link>
              . If you want the fuller picture, pair it with{" "}
              <Link href="/tools/homa-ir-calculator" style={linkStyle}>
                HOMA-IR
              </Link>{" "}
              when you do have insulin, and with the{" "}
              <Link href="/tools/triglyceride-hdl-ratio" style={linkStyle}>
                triglyceride to HDL ratio
              </Link>
              .
            </p>

            <h2 style={h2Style}>The formula, written correctly</h2>
            <p style={pStyle}>
              TyG = ln[(triglycerides × fasting glucose) / 2], with both values in mg/dL. The division by two sits inside
              the logarithm. This is worth stating plainly because it is the most common implementation error in
              circulating calculators, and it produces a number that looks plausible while being wrong.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
  fontWeight: 300,
  letterSpacing: "-0.02em",
  color: "var(--color-ink)",
  marginBottom: "0.75rem",
  marginTop: "3rem",
};
const pStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: "var(--color-ink-secondary)",
  marginBottom: "1.1rem",
};
const linkStyle: React.CSSProperties = { color: "var(--color-green-deep)", textUnderlineOffset: "3px" };
