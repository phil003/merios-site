import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactGuide, {
  type ContactGuideItem,
} from "@/components/contact/ContactGuide";

// ─── Metadata (SEO preserved verbatim) ───────────────────────────────────────
export const metadata: Metadata = {
  // Already names the brand: absolute, so the layout template does not
  // append a second "| Merios".
  title: { absolute: "Contact Merios — Get in Touch" },
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

// ─── "Before you write" copy ─────────────────────────────────────────────────
// Every fact here is restated from pages that already say it: the iOS
// requirement (/pricing), the in-app export and deletion paths and the
// privacy contact (/privacy), the deletion-request route and the
// vulnerability address (/security), the FAQ topics (/faq).
const CONTACT_GUIDE: ContactGuideItem[] = [
  {
    id: "bug-report",
    title: "Reporting a bug",
    body: (
      <>
        <p>
          Choose <strong>Support</strong> as the inquiry type, then tell us:
        </p>
        <ul>
          <li>
            your iPhone model and iOS version (Merios requires iOS 15.1 or
            later);
          </li>
          <li>
            what you did, step by step, what you expected, and what happened
            instead;
          </li>
          <li>
            if a lab report was read wrongly: the lab&rsquo;s name and the
            marker concerned.
          </li>
        </ul>
        <p>
          The form takes text only. If a screenshot would help, email it to{" "}
          <a href="mailto:hello@merios.life">hello@merios.life</a>.
        </p>
      </>
    ),
  },
  {
    id: "your-data",
    title: "Exporting or deleting your data",
    body: (
      <>
        <p>
          Both take a few taps in the app:{" "}
          <strong className="cg-path">Settings › Export my data</strong> gives
          you a complete copy in JSON, and{" "}
          <strong className="cg-path">Settings › Delete my account</strong>{" "}
          erases your account and all its data.
        </p>
        <p>
          To have other personal data we hold deleted (a newsletter or
          waitlist sign-up, or a message sent here), use this form with the
          type <strong>General</strong>; the{" "}
          <Link href="/security#data-retention-and-deletion">Security page</Link>{" "}
          explains how deletion works. For any other privacy request, write to{" "}
          <a href="mailto:privacy@merios.life">privacy@merios.life</a> — your
          rights are set out in the{" "}
          <Link href="/privacy#your-rights">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security reports and quick answers",
    body: (
      <>
        <p>
          Found a vulnerability? Send it to{" "}
          <a href="mailto:security@merios.life">security@merios.life</a> with
          the affected endpoint, the steps to reproduce it and its impact. Our{" "}
          <Link href="/security#responsible-disclosure">
            responsible-disclosure policy
          </Link>{" "}
          explains what we ask of researchers.
        </p>
        <p>
          How the score is built, what we measure, how we handle your data and
          how to start are all answered in the <Link href="/faq">FAQ</Link>.
        </p>
      </>
    ),
  },
];

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
              {/* Server-rendered: the form reads its pre-fill from the URL
                  after mount, so it no longer needs a Suspense boundary. */}
              <ContactForm />
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

        {/* ─── Before you write — bug reports, data requests, security ─── */}
        <ContactGuide
          eyebrow="Before you write"
          title="Get the right answer the first time."
          items={CONTACT_GUIDE}
        />

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
