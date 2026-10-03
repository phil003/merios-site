import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

// ─── Metadata (SEO preserved verbatim) ───────────────────────────────────────
export const metadata: Metadata = {
  title: "Contact Merios — Get in Touch",
  description:
    "Have questions about Merios? Contact our team for support with blood test analysis, biomarker tracking, health score questions, or partnership inquiries.",
  alternates: {
    canonical: "https://merios.life/contact",
  },
  openGraph: {
    title: "Contact Merios — Get in Touch",
    description:
      "Have questions about Merios? Contact our team for support with blood test analysis, biomarker tracking, and health score questions.",
    url: "https://merios.life/contact",
    type: "website",
  },
};

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Merios",
  url: "https://merios.life/contact",
  description:
    "Have questions about Merios? Contact our team for support with blood test analysis, biomarker tracking, health score questions, or partnership inquiries.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "Merios",
    url: "https://merios.life",
  },
  mainEntity: {
    "@type": "Organization",
    name: "Merios",
    url: "https://merios.life",
    email: "hello@merios.life",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@merios.life",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "press",
        email: "press@merios.life",
      },
      {
        "@type": "ContactPoint",
        contactType: "partnerships",
        email: "partners@merios.life",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://merios.life",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://merios.life/contact",
    },
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main
        className="relative"
        style={{
          background: "var(--color-canvas)",
          color: "var(--color-ink)",
        }}
      >
        <PageHero
          eyebrow="Contact"
          title="Let's talk."
          subline="Questions, feedback, press, partnerships. A human reads every message — we typically reply within 24 hours."
          align="left"
        />

        {/* ─── Form + info: two white cards on fog ──────────────────────── */}
        <section
          className="px-[var(--spacing-container)]"
          style={{
            paddingTop: "clamp(56px, 7vw, 104px)",
            paddingBottom: "clamp(20px, 3vw, 40px)",
          }}
        >
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            {/* Form card */}
            <div
              className="lg:col-span-7"
              style={{
                background: "var(--color-canvas-alt)",
                border: "1px solid var(--color-grid)",
                borderRadius: "clamp(22px, 2.4vw, 30px)",
                padding: "clamp(22px, 3.4vw, 48px)",
              }}
            >
              <div
                className="label mb-9"
                style={{ color: "var(--color-ink-tertiary)" }}
              >
                <span aria-hidden className="label-dot label-dot--ink" />
                <span>Send a message</span>
              </div>
              <Suspense
                fallback={
                  <div
                    className="min-h-[47rem] sm:min-h-[35.5rem]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "var(--color-ink-tertiary)",
                    }}
                  >
                    Loading form…
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Direct channels card */}
            <div
              className="lg:col-span-5"
              style={{
                background: "var(--color-canvas-alt)",
                border: "1px solid var(--color-grid)",
                borderRadius: "clamp(22px, 2.4vw, 30px)",
                padding: "clamp(22px, 3.4vw, 48px)",
              }}
            >
              <div
                className="label mb-9"
                style={{ color: "var(--color-ink-tertiary)" }}
              >
                <span aria-hidden className="label-dot label-dot--ink" />
                <span>Direct channels</span>
              </div>
              <ContactInfo />
            </div>
          </div>
        </section>

        {/* ─── FAQ nudge — a lilac pop card ──────────────────────────────── */}
        <section
          className="px-[var(--spacing-container)]"
          style={{ paddingBottom: "clamp(72px, 9vw, 128px)" }}
        >
          <div
            className="relative mx-auto flex max-w-[1320px] flex-col items-start gap-7 overflow-hidden md:flex-row md:items-center md:justify-between"
            style={{
              background: "var(--color-lilac)",
              color: "var(--color-ink)",
              borderRadius: "clamp(22px, 2.4vw, 30px)",
              padding: "clamp(28px, 4.4vw, 60px)",
            }}
          >
            <p
              className="relative max-w-[20ch]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 1.15rem + 1.9vw, 2.9rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--color-ink)",
                fontWeight: 740,
                textWrap: "balance",
              }}
            >
              Most answers are already on our FAQ page.
            </p>
            <Link href="/faq" className="btn btn-ink relative flex-none">
              Browse the FAQ
              <span aria-hidden className="btn-arrow">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
