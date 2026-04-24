import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import {
  OrganizationSchema,
  BreadcrumbSchema,
} from "@/components/StructuredData";
import MissionSection from "@/components/about/MissionSection";
import StoryTimeline from "@/components/about/StoryTimeline";
import ValuesGrid from "@/components/about/ValuesGrid";
import TeamGrid from "@/components/about/TeamGrid";
import FinalCTA from "@/components/about/FinalCTA";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About Merios — Health Analytics Built for You",
  description:
    "Learn about Merios, the health analytics app that combines blood test analysis, Apple Health data, and daily check-ins into one actionable health score. Our mission: make health data understandable.",
  alternates: {
    canonical: "https://merios.life/about",
  },
  openGraph: {
    title: "About Merios — Health Analytics Built for You",
    description:
      "Learn about Merios, the health analytics app that combines blood test analysis, Apple Health data, and daily check-ins into one actionable health score.",
    url: "https://merios.life/about",
    type: "website",
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  // AboutPage JSON-LD — rendered inline alongside Organization + Breadcrumb
  // schemas so every surface Google parses on /about is self-describing.
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://merios.life/about#aboutpage",
    url: "https://merios.life/about",
    name: "About Merios — Health Analytics Built for You",
    description:
      "Learn about Merios, the health analytics app that combines blood test analysis, Apple Health data, and daily check-ins into one actionable health score. Our mission: make health data understandable.",
    inLanguage: "en",
    isPartOf: { "@id": "https://merios.life/#website" },
    about: {
      "@type": "Organization",
      name: "Merios",
      url: "https://merios.life",
    },
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "About", url: "https://merios.life/about" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <main
        className="relative"
        style={{
          background: "var(--color-canvas)",
          color: "var(--color-ink)",
        }}
      >
        <PageHero
          eyebrow="About"
          title="A quiet instrument for a noisy decade of health data."
          subline="Merios unifies blood work, movement, sleep, and stress into one composite score you actually own. Calm authority, clinical precision, zero marketing noise."
          align="left"
        />

        <MissionSection />
        <StoryTimeline />
        <ValuesGrid />
        <TeamGrid />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
