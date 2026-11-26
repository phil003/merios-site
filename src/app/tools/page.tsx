import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/StructuredData";
import CtaScreen from "@/components/calculators/tool-page/CtaScreen";
import ToolsGrid from "@/components/calculators/tool-page/ToolsGrid";
import { TOOLS, toolHref } from "@/components/calculators/tool-page/registry";
import t from "./tools.module.css";

/**
 * /tools — Free Health Calculator Hub.
 *
 * SEO play: backlink-magnet hub for free, formula-based calculators.
 * Each tool earns natural links from wellness blogs, .edu pages, and clinical
 * reference sites. Tools live at clean /tools/[slug] URLs (vs. embedded in blog
 * posts) so they can rank as standalone resources for "X calculator" queries.
 *
 * v2 Open Sky (Tools.dc.html): dawn masthead with topic chips, every tool on
 * a card whose plate shows its formula, PhenoAge as the wide card, "How they
 * are built", and a final with the app's biological age screen. The tool
 * list (copy, order, topics) lives in components/calculators/tool-page/registry.
 */

export const metadata: Metadata = {
  // Absolute: "— Merios" plus the template's "| Merios" named the brand twice
  // (71 characters). Without either it is 53; the brand stays in the social
  // title below and in the site name Google shows above the result.
  title: { absolute: "Free Health Calculators | PhenoAge, HOMA-IR, Trig/HDL" },
  description:
    "Free health calculators based on peer-reviewed formulas: PhenoAge biological age (Levine 2018), HOMA-IR insulin resistance, Trig/HDL ratio. No signup.",
  alternates: { canonical: "https://merios.life/tools" },
  openGraph: {
    title: "Free Health Calculators — Merios",
    description:
      "PhenoAge biological age, HOMA-IR insulin resistance, Trig/HDL ratio. Peer-reviewed formulas. Free, no signup.",
    url: "https://merios.life/tools",
    type: "website",
  },
};

const HOW = [
  {
    n: "01",
    title: "Exactly as published",
    text: "Each calculator implements its formula the way the paper prints it, and names the paper on the page.",
  },
  {
    n: "02",
    title: "Your numbers stay with you",
    text: "The math runs in your browser. No account, no email gate, and nothing is sent to a server.",
  },
  {
    n: "03",
    title: "Read in plain English",
    text: "Every result sits on its range, with what the number can and cannot tell you.",
  },
];

export default function ToolsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://merios.life/tools#collection",
    url: "https://merios.life/tools",
    name: "Free Health Calculators — Merios",
    description:
      "Free interactive health calculators based on peer-reviewed formulas.",
    inLanguage: "en",
    isPartOf: { "@id": "https://merios.life/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: TOOLS.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://merios.life${toolHref(tool)}`,
        name: tool.title,
      })),
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main>
        <div className={t.hubTop}>
          <section className={t.hubHero} aria-labelledby="tools-title">
            <div className={t.hubInner}>
              <p className={`label ${t.hubEyebrow}`}>
                <span aria-hidden className="label-dot" />
                Free Tools
              </p>
              <h1 id="tools-title" className={t.hubTitle}>
                Health calculators, <em>backed by published research.</em>
              </h1>
              <p className={t.hubLead}>
                Peer-reviewed formulas turned into clean, free, interactive calculators. No signup. No email gate. Just type your numbers.
              </p>
              <ul className={t.hubStats}>
                <li>
                  <span className={t.hubStatNum}>{TOOLS.length}</span>calculators and converters
                </li>
                <li>Formulas exactly as published</li>
                <li>Runs in your browser</li>
              </ul>
            </div>
          </section>

          <ToolsGrid />
        </div>

        <section className={t.how} aria-labelledby="how-title">
          <div className={t.hubInner}>
            <p className={t.eyebrow}>How they are built</p>
            <h2 id="how-title" className={t.h2}>
              The paper’s formula. <em>Nothing added.</em>
            </h2>
            <ul className={t.howGrid}>
              {HOW.map((h) => (
                <li key={h.n} className={t.howCard}>
                  <p aria-hidden className={t.howNum}>
                    {h.n}
                  </p>
                  <p className={t.howTitle}>{h.title}</p>
                  <p className={t.howText}>{h.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={t.hubCta} aria-labelledby="tools-cta-title">
          <div className={t.hubInner}>
            <div className={t.hubCtaCard}>
              <div className={t.hubCtaCopy}>
                <p className={`label ${t.hubEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <h2 id="tools-cta-title" className={t.hubCtaTitle}>
                  One PhenoAge is a number. <em>Twelve are a trend.</em>
                </h2>
                <p className={t.hubCtaText}>
                  Merios reads your blood tests, recalculates your PhenoAge with each upload and tracks the curve, so you can see if a change is actually moving the needle.
                </p>
                <Link href="/early-access?from=tools" className={`btn btn-ink ${t.hubCtaBtn}`}>
                  Get the app
                </Link>
              </div>
              <div className={t.hubCtaScreen}>
                <CtaScreen screen="bio-age" />
              </div>
            </div>
          </div>
        </section>

        <div className={t.disclaimer}>
          <div className={t.hubInner}>
            <p>
              These tools are educational, not diagnostic. Calculators implement
              the formulas exactly as published. They do not replace a clinical
              evaluation. If a result concerns you, talk to a physician.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
