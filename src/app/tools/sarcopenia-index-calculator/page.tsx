import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import SarcopeniaIndexCalculator from "@/components/calculators/SarcopeniaIndexCalculator";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const FAQ_ITEMS = [
  { q: "What is the sarcopenia index?", a: "It is serum creatinine divided by cystatin C, multiplied by 100. The reasoning is that creatinine is produced by muscle while cystatin C is produced by all nucleated cells regardless of muscle mass, so the ratio between them carries a muscle signal that neither marker shows on its own." },
  { q: "What is a normal sarcopenia index?", a: "There is no agreed cutoff, and that is the honest answer. Published thresholds vary substantially by population — values near 77 and near 67 have both been proposed in different cohorts. In UK Biobank the mean ran around 99 in men and 85 in women. Because of that spread, the index is far more useful as a personal trend across repeat panels than as a pass or fail line." },
  { q: "How accurate is the creatinine to cystatin C ratio for muscle mass?", a: "Moderately. In 458,702 UK Biobank participants it discriminated sarcopenia with an area under the curve of roughly 0.72, which is acceptable rather than excellent. It also correlates better with grip strength than with measured muscle mass, and its performance degrades when kidney function is impaired. It is a cheap proxy, not a replacement for DXA or a grip dynamometer." },
  { q: "Is it useful if I am taking a GLP-1 medication?", a: "It is plausibly useful and explicitly unvalidated in that group. Muscle loss is a genuine concern on GLP-1 medications, and this ratio is one of the few blood-based signals that touches it. But no study has validated the index specifically in GLP-1 users, so treat any change as a prompt to measure body composition properly rather than as an answer." },
  { q: "Does Merios store these numbers?", a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server." }
];

export const metadata: Metadata = {
  title: "Sarcopenia Index Calculator (Creatinine / Cystatin C)",
  description:
    "Free sarcopenia index calculator. Divide creatinine by cystatin C for a cheap blood-based muscle-mass proxy — with an honest account of what it can and cannot tell you.",
  alternates: { canonical: "https://merios.life/tools/sarcopenia-index-calculator" },
  openGraph: {
    title: "Sarcopenia Index Calculator (Creatinine / Cystatin C)",
    description: "Free sarcopenia index calculator. Divide creatinine by cystatin C for a cheap blood-based muscle-mass proxy — with an honest account of what it can and cannot tell you.",
    url: "https://merios.life/tools/sarcopenia-index-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/sarcopenia-index-calculator#tool",
    name: "Sarcopenia Index Calculator (Creatinine / Cystatin C)",
    url: "https://merios.life/tools/sarcopenia-index-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: "Free sarcopenia index calculator. Divide creatinine by cystatin C for a cheap blood-based muscle-mass proxy — with an honest account of what it can and cannot tell you.",
    isAccessibleForFree: true,
    citation: "UK Biobank validation, Clin Nutr ESPEN 2024 (n=458,702).",
    inLanguage: "en",
  };
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "Sarcopenia Index Calculator (Creatinine / Cystatin C)", url: "https://merios.life/tools/sarcopenia-index-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero eyebrow="Creatinine / cystatin C" title="Two markers you probably already have, hiding a muscle signal." subline="Free sarcopenia index calculator. Divide creatinine by cystatin C for a cheap blood-based muscle-mass proxy — with an honest account of what it can and cannot tell you." align="left" />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <SarcopeniaIndexCalculator />
          <section className="mt-14 max-w-[720px]" style={{ fontFamily: "var(--font-sans)" }}>
            <h2 style={h2Style}>Why these two markers together</h2>
            <p style={pStyle}>
              Creatinine is a waste product of muscle metabolism, so how much you produce depends on how much muscle
              you carry.{" "}
              <Link href="/blog/cystatin-c-kidney-function" style={linkStyle}>Cystatin C</Link> is produced at a
              near-constant rate by every nucleated cell and is not affected by muscle mass. Both are filtered by the
              kidneys and both are used to estimate kidney function — which means their ratio strips out the kidney
              signal and leaves something closer to a muscle signal.
            </p>
            <p style={pStyle}>
              That same asymmetry is why{" "}
              <Link href="/blog/creatinine-1-2-normal" style={linkStyle}>creatinine alone</Link> can mislead. Losing
              muscle produces less creatinine, so a creatinine-based eGFR drifts upward and kidney function looks like
              it is improving when the real story is lost muscle. The trap is covered in detail in{" "}
              <Link href="/blog/glp-1-muscle-loss-peptides" style={linkStyle}>GLP-1 muscle loss and what your labs really show</Link>.
            </p>
            <h2 style={h2Style}>What to do with the number</h2>
            <p style={pStyle}>
              Treat it as a baseline, not a verdict. The value of a cheap marker like this is the trend across repeat
              panels, and it is most informative when paired with something you can actually measure at home — grip
              strength, or your working weights in the gym. The wider case for why this matters is in{" "}
              <Link href="/blog/muscle-mass-and-longevity" style={linkStyle}>muscle mass and longevity</Link>, and it
              belongs alongside the rest of a{" "}
              <Link href="/blog/longevity-blood-panel" style={linkStyle}>longevity panel</Link>.
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
