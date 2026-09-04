import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import FreeTestosteroneCalculator from "@/components/calculators/FreeTestosteroneCalculator";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const FAQ_ITEMS = [
  {
    q: "How do you calculate free testosterone?",
    a: "The Vermeulen equation estimates free testosterone from total testosterone, SHBG, and albumin using the law of mass action. Because testosterone binds SHBG tightly and albumin weakly, the three values together determine how much hormone is actually unbound. The calculation is a quadratic, which is why it needs a calculator rather than a simple ratio.",
  },
  {
    q: "What is a normal free testosterone level?",
    a: "Most laboratories report roughly 50 to 210 pg/mL (5 to 21 ng/dL) for adult men, with free testosterone typically representing 1 to 3 percent of total testosterone. Ranges differ meaningfully between labs and assays, and female ranges are entirely different and highly assay-specific, so always compare against the reference interval printed on your own report.",
  },
  {
    q: "Is calculated free testosterone better than the direct test?",
    a: "For most purposes, yes. The direct analog immunoassay for free testosterone is widely regarded as unreliable, and major guidelines prefer either equilibrium dialysis, which is the reference method but expensive, or calculated free testosterone from the Vermeulen equation. Calculated free testosterone agrees closely with equilibrium dialysis in most patients.",
  },
  {
    q: "Why is my total testosterone normal but my free testosterone low?",
    a: "This is the most common reason to run this calculation, and the usual answer is high SHBG. Sex hormone-binding globulin rises with age, thyroid excess, liver disease, estrogen, and some medications. When SHBG is high, more of your total testosterone is bound and unavailable to tissue, so a perfectly normal total can sit alongside a genuinely low free level.",
  },
  {
    q: "What is the free androgen index?",
    a: "FAI is total testosterone in nmol/L divided by SHBG in nmol/L, multiplied by 100. It is a simpler ratio than the Vermeulen calculation and is used most often in women, particularly in assessing PCOS, where it serves as a marker of biochemical hyperandrogenism. This calculator reports it alongside the Vermeulen result.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "Free Testosterone Calculator (Vermeulen Equation)",
  description:
    "Free testosterone calculator using the Vermeulen equation. Enter total testosterone, SHBG and albumin — get free T in pg/mL, ng/dL, nmol/L, plus bioavailable T and FAI.",
  alternates: { canonical: "https://merios.life/tools/free-testosterone-calculator" },
  openGraph: {
    title: "Free Testosterone Calculator — Vermeulen Equation",
    description:
      "Calculate free and bioavailable testosterone from total T, SHBG and albumin. Free androgen index included. No signup.",
    url: "https://merios.life/tools/free-testosterone-calculator",
    type: "website",
  },
};

export default function FreeTestosteroneCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/free-testosterone-calculator#tool",
    name: "Free Testosterone Calculator (Vermeulen)",
    url: "https://merios.life/tools/free-testosterone-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free and bioavailable testosterone calculator using the Vermeulen equation, from total testosterone, SHBG and albumin.",
    isAccessibleForFree: true,
    citation:
      "Vermeulen A, Verdonck L, Kaufman JM. A critical evaluation of simple methods for the estimation of free testosterone in serum. J Clin Endocrinol Metab 1999;84(10):3666-3672.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          {
            name: "Free Testosterone Calculator",
            url: "https://merios.life/tools/free-testosterone-calculator",
          },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Vermeulen 1999 — free & bioavailable T"
        title="Total testosterone normal, but you still feel off? Check the free fraction."
        subline="Only a small percentage of your testosterone is actually available to tissue. This calculator estimates it from total T, SHBG and albumin using the Vermeulen equation."
        align="left"
      />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <FreeTestosteroneCalculator />

          <section className="mt-14 max-w-[720px]" style={{ fontFamily: "var(--font-sans)" }}>
            <h2 style={h2Style}>Why total testosterone can mislead you</h2>
            <p style={pStyle}>
              Most of the testosterone circulating in your blood is not available to your tissues. Roughly two thirds is
              bound tightly to SHBG and effectively locked away; most of the rest is bound loosely to albumin and can
              still be released. Only about 1 to 3 percent circulates completely unbound.
            </p>
            <p style={pStyle}>
              That matters because SHBG varies enormously between people and rises with age, thyroid excess, liver
              disease, and several medications. Two men with an identical total testosterone of 500 ng/dL can have very
              different free levels if one has an SHBG of 20 and the other 60. This is the single most common reason a
              result looks reassuring on paper while symptoms persist — and it is exactly what this calculation is for.
              The distinction is covered in more depth in{" "}
              <Link href="/blog/free-testosterone-vs-total-testosterone" style={linkStyle}>
                free testosterone versus total testosterone
              </Link>
              .
            </p>

            <h2 style={h2Style}>Why calculated, not the direct test</h2>
            <p style={pStyle}>
              Many labs offer a direct free testosterone immunoassay. It is inexpensive and widely regarded as
              unreliable. The reference method, equilibrium dialysis, is accurate but costly and not always available.
              Calculated free testosterone using the Vermeulen equation agrees closely with equilibrium dialysis in most
              patients, which is why it has become the practical standard — and why it is worth running the numbers
              yourself if your report only shows a direct value.
            </p>

            <h2 style={h2Style}>Getting the units right</h2>
            <p style={pStyle}>
              Two unit errors account for most wrong answers from calculators like this one. The first is albumin: US
              reports use g/dL (typically around 4.3) while many other countries use g/L (around 43), and entering one
              for the other silently produces a plausible but wrong result. The second is the output: free testosterone
              in pg/mL is ten times the ng/dL figure, so a value of 110 pg/mL and 11 ng/dL are the same number. The unit
              switches above handle both.
            </p>
            <p style={pStyle}>
              If albumin was not measured on your panel, 4.3 g/dL is the standard assumed value and is prefilled. Using
              the assumption introduces only a small error in most people, but it matters more in liver disease,
              nephrotic syndrome, or significant malnutrition, where albumin genuinely deviates.
            </p>

            <h2 style={h2Style}>Where to go next</h2>
            <p style={pStyle}>
              Testosterone is diurnal and varies between draws, so a morning sample and a repeat before any conclusion
              are both standard practice. For context on how levels shift across a lifetime, see{" "}
              <Link href="/blog/testosterone-levels-by-age" style={linkStyle}>
                testosterone levels by age
              </Link>
              ; for what a specific mid-range number means, see{" "}
              <Link href="/blog/testosterone-400-normal" style={linkStyle}>
                whether a testosterone of 400 is normal
              </Link>
              ; and for the younger cohort,{" "}
              <Link href="/blog/low-testosterone-young-men-under-30" style={linkStyle}>
                low testosterone in men under 30
              </Link>
              .
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
