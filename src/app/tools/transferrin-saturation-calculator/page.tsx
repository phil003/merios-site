import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import TSATCalculator from "@/components/calculators/TSATCalculator";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const FAQ_ITEMS = [
  { q: "How do you calculate transferrin saturation?", a: "TSAT is serum iron divided by total iron-binding capacity, multiplied by 100, with both values in micrograms per deciliter. If your panel reports UIBC instead of TIBC, add UIBC to serum iron to get TIBC first. If it reports transferrin in g/L, multiply by 125 to get TIBC in micrograms per deciliter." },
  { q: "What is a normal transferrin saturation?", a: "Most laboratories report roughly 25 to 35 percent for adults. Below 20 percent is the classic iron-deficiency pattern, and above 45 percent on a repeat fasting sample is the usual threshold for investigating iron overload including hemochromatosis. Reference intervals differ between labs, so compare against the range on your own report." },
  { q: "Why is my ferritin normal but my transferrin saturation low?", a: "This is the single most useful thing TSAT reveals. Ferritin is an acute-phase reactant, so inflammation, infection, obesity and liver disease all raise it — which can make ferritin look reassuring while iron stores are genuinely depleted. TSAT is far less affected by inflammation, so a low TSAT alongside a normal ferritin often means the ferritin is masking a real deficiency." },
  { q: "What is the difference between TIBC and UIBC?", a: "TIBC is the total capacity of transferrin to carry iron. UIBC is the portion of that capacity not currently occupied. They are related simply: TIBC equals serum iron plus UIBC. Labs report one or the other depending on their assay, which is why this calculator accepts both." },
  { q: "Does Merios store these numbers?", a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server." }
];

export const metadata: Metadata = {
  title: "Transferrin Saturation (TSAT) Calculator",
  description:
    "Free transferrin saturation calculator. Enter serum iron with TIBC, UIBC or transferrin — whichever your lab reported — and get your TSAT percentage.",
  alternates: { canonical: "https://merios.life/tools/transferrin-saturation-calculator" },
  openGraph: {
    title: "Transferrin Saturation (TSAT) Calculator",
    description: "Free transferrin saturation calculator. Enter serum iron with TIBC, UIBC or transferrin — whichever your lab reported — and get your TSAT percentage.",
    url: "https://merios.life/tools/transferrin-saturation-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/transferrin-saturation-calculator#tool",
    name: "Transferrin Saturation (TSAT) Calculator",
    url: "https://merios.life/tools/transferrin-saturation-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: "Free transferrin saturation calculator. Enter serum iron with TIBC, UIBC or transferrin — whichever your lab reported — and get your TSAT percentage.",
    isAccessibleForFree: true,
    citation: "StatPearls. Iron-Binding Capacity. NCBI Bookshelf NBK559119.",
    inLanguage: "en",
  };
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "Transferrin Saturation (TSAT) Calculator", url: "https://merios.life/tools/transferrin-saturation-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero eyebrow="TSAT — iron status" title="Ferritin looked fine. Your iron may still not be." subline="Free transferrin saturation calculator. Enter serum iron with TIBC, UIBC or transferrin — whichever your lab reported — and get your TSAT percentage." align="left" />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <TSATCalculator />
          <section className="mt-14 max-w-[720px]" style={{ fontFamily: "var(--font-sans)" }}>
            <h2 style={h2Style}>Why TSAT catches what ferritin misses</h2>
            <p style={pStyle}>
              Ferritin is the marker most people know, and it is a good one — but it has a well-documented blind spot.
              Ferritin is an acute-phase reactant, meaning it rises with inflammation, infection, obesity and liver
              disease regardless of how much iron you actually have. That is how someone can be told their{" "}
              <Link href="/blog/ferritin-30-low-normal" style={linkStyle}>ferritin is normal</Link> while being
              genuinely iron deficient.
            </p>
            <p style={pStyle}>
              Transferrin saturation is not distorted the same way. It measures how much of your iron-carrying
              capacity is actually in use, so a low TSAT alongside a normal-looking ferritin is one of the most
              informative patterns on a panel — and it is exactly the case covered in{" "}
              <Link href="/blog/ferritin-vs-iron-saturation" style={linkStyle}>ferritin versus iron saturation</Link>.
            </p>
            <h2 style={h2Style}>Reading it alongside the rest of your panel</h2>
            <p style={pStyle}>
              TSAT is rarely interpreted alone. Low TSAT with{" "}
              <Link href="/blog/low-ferritin-normal-hemoglobin" style={linkStyle}>normal hemoglobin</Link> suggests
              depletion that has not yet become anemia. Low TSAT with a low{" "}
              <Link href="/blog/mcv-mch-blood-test-meaning" style={linkStyle}>MCV and MCH</Link> points toward
              established iron-deficiency anemia. If you have been supplementing without improvement, the reasons are
              covered in{" "}
              <Link href="/blog/iron-supplements-not-working" style={linkStyle}>why iron supplements stop working</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.4vw, 2rem)", fontWeight: 300,
  letterSpacing: "-0.02em", color: "var(--color-ink)", marginBottom: "0.75rem", marginTop: "3rem",
};
const pStyle: React.CSSProperties = {
  fontSize: 16, lineHeight: 1.7, color: "var(--color-ink-secondary)", marginBottom: "1.1rem",
};
const linkStyle: React.CSSProperties = { color: "var(--color-green-deep)", textUnderlineOffset: "3px" };
