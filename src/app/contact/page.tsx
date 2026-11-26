import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactGuide, {
  type ContactGuideItem,
} from "@/components/contact/ContactGuide";
import styles from "@/components/contact/contact.module.css";

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
// vulnerability address (/security). The FAQ topics (/faq) are in the band
// at the foot of the page.
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
          To have other personal data we hold deleted (a newsletter sign-up,
          or a message sent here), use this form with the type{" "}
          <strong>General</strong>; the{" "}
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
    title: "Security reports",
    body: (
      <>
        <p>
          Found a vulnerability? Send it to{" "}
          <a href="mailto:security@merios.life">security@merios.life</a> with
          the affected endpoint, the steps to reproduce it and its impact. Our{" "}
          <Link href="/security#responsible-disclosure">
            responsible‑disclosure policy
          </Link>{" "}
          explains what we ask of researchers.
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

      <main className={styles.page}>
        {/* ─── Open Sky masthead: dawn, eyebrow, H1 ending on the italic
            human word, lead. CSS-only entrance (.he); the H1 paints at
            parse time. ───────────────────────────────────────────────── */}
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.container}>
            <p className={`he ${styles.eyebrow}`}>Contact</p>
            <h1 id="contact-title" className={styles.title}>
              Let’s <em>talk.</em>
            </h1>
            <p
              className={`he ${styles.lead}`}
              style={{ "--he-d": "0.12s" } as CSSProperties}
            >
              Questions, feedback, press, partnerships. Send a message below,
              or write straight to the address that fits.
            </p>
          </div>
        </section>

        {/* ─── Form on a white card, direct channels on the ink block ──── */}
        <section className={styles.formSection}>
          <div className={`${styles.container} ${styles.formGrid}`}>
            {/* Form card */}
            <div className={styles.formCard}>
              <p className={`${styles.eyebrow} ${styles.cardEyebrow}`}>
                Send a message
              </p>
              {/* Server-rendered: the form reads its pre-fill from the URL
                  after mount, so it no longer needs a Suspense boundary. */}
              <ContactForm />
            </div>

            {/* Direct channels — the page's one ink block */}
            <div className={`night ${styles.ink}`} data-nav="dark">
              {/* An h2 in eyebrow dress: the four channels below are h3s. */}
              <h2
                id="contact-channels-title"
                className={`${styles.eyebrow} ${styles.inkEyebrow} ${styles.cardEyebrow}`}
              >
                Direct channels
              </h2>
              <ContactInfo labelledBy="contact-channels-title" />
            </div>
          </div>
        </section>

        {/* ─── Before you write — bug reports, data requests, security ─── */}
        <ContactGuide
          eyebrow="Before you write"
          title={
            <>
              Get the right answer <em>the first time.</em>
            </>
          }
          items={CONTACT_GUIDE}
        />

        {/* ─── FAQ nudge — a dawn band ───────────────────────────────────── */}
        <section className={styles.nudgeSection} aria-label="Quick answers">
          <div className={styles.container}>
            <div className={styles.band}>
              <div className={styles.bandCopy}>
                <p className={styles.eyebrow}>Quick answers</p>
                <p className={styles.bandText}>
                  Most answers are already <em>on our FAQ page.</em>
                </p>
                <p className={styles.bandNote}>
                  How the score is built, what we measure, how we handle your
                  data and how to start.
                </p>
              </div>
              <Link href="/faq" className="btn btn-ink">
                Browse the FAQ
                <span aria-hidden className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
