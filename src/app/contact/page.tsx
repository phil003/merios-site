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

        {/* ─── Form + info grid ──────────────────────────────────────────── */}
        <section
          className="px-6 pb-24 md:px-10 md:pb-32"
          style={{
            borderTop: "1px solid var(--color-grid)",
            paddingTop: "var(--spacing-section, 6rem)",
          }}
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-5 md:gap-14 lg:gap-20">
              {/* Form — 60% (3/5 cols) */}
              <div className="md:col-span-3">
                <div
                  className="mb-10 flex items-center gap-2.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-pulse)" }}
                  />
                  <span
                    className="text-[10.5px] uppercase"
                    style={{
                      color: "var(--color-green-deep)",
                      letterSpacing: "0.22em",
                      fontWeight: 500,
                    }}
                  >
                    Send a message
                  </span>
                </div>
                <Suspense
                  fallback={
                    <div
                      style={{
                        minHeight: "28rem",
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

              {/* Info — 40% (2/5 cols) */}
              <div
                className="md:col-span-2 md:pl-6 lg:pl-10"
                style={{
                  borderLeft: "1px solid transparent",
                }}
              >
                <div
                  className="mb-10 flex items-center gap-2.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-pulse)" }}
                  />
                  <span
                    className="text-[10.5px] uppercase"
                    style={{
                      color: "var(--color-green-deep)",
                      letterSpacing: "0.22em",
                      fontWeight: 500,
                    }}
                  >
                    Direct channels
                  </span>
                </div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ nudge ─────────────────────────────────────────────────── */}
        <section
          className="px-6 pb-32 md:px-10"
          style={{
            borderTop: "1px solid var(--color-grid)",
            paddingTop: "var(--spacing-section, 6rem)",
          }}
        >
          <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p
              className="max-w-[48ch]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                fontWeight: 400,
              }}
            >
              Most answers are already on our FAQ page.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2"
              style={{
                color: "var(--color-ink)",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                letterSpacing: "-0.005em",
                borderBottom: "1px solid var(--color-ink)",
                paddingBottom: 2,
              }}
            >
              Browse the FAQ
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
