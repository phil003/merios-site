import { Metadata } from "next";
import Footer from "@/components/Footer";
import LegalPageLayout, { type TocItem } from "@/components/ui/LegalPageLayout";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Security — Merios",
  description:
    "How Merios protects your health data: encryption, infrastructure, retention, and disclosure policy.",
  alternates: {
    canonical: "https://merios.life/security",
  },
  openGraph: {
    title: "Security — Merios",
    description:
      "How Merios protects your health data: encryption, infrastructure, retention, and disclosure policy.",
    url: "https://merios.life/security",
    type: "website",
  },
};

const tocItems: TocItem[] = [
  { id: "our-approach", label: "Our approach" },
  { id: "data-encryption", label: "Data encryption" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "authentication", label: "Authentication" },
  { id: "data-retention-and-deletion", label: "Data retention & deletion" },
  { id: "third-party-services", label: "Third-party services" },
  { id: "breach-notification", label: "Breach notification" },
  { id: "responsible-disclosure", label: "Responsible disclosure" },
  { id: "compliance", label: "Compliance" },
  { id: "contact", label: "Contact" },
];

const securityLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Security at Merios",
  url: "https://merios.life/security",
  description:
    "How Merios protects your health data: encryption, infrastructure, retention, and disclosure policy.",
  publisher: {
    "@type": "Organization",
    name: "Merios",
    url: "https://merios.life",
  },
  dateModified: "2026-04-24",
};

const H2_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
  fontWeight: 350,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: "var(--color-ink)",
};

const MAIL_STYLE: React.CSSProperties = {
  color: "var(--color-green-deep)",
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

export default function SecurityPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Security", url: "https://merios.life/security" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityLd) }}
      />
      <LegalPageLayout
        eyebrow="Security"
        title="Security at Merios"
        subline="How we protect your health data — encryption, infrastructure, retention, and disclosure."
        lastUpdated="April 24, 2026"
        tocItems={tocItems}
      >
        {/* 1. Our approach */}
        <section>
          <h2 id="our-approach" className="mt-16" style={H2_STYLE}>
            1. Our approach
          </h2>
          <p className="mt-4">
            Security at Merios is designed in, not bolted on. Every system that
            touches your health data — from the moment a biomarker is parsed,
            to the long-term store that powers your score — is built around
            three principles: encrypt by default, collect the minimum, and
            never treat health data as a commercial asset.
          </p>
          <p className="mt-4">
            Your health data belongs to you. We act as a custodian, not an
            owner. Everything that follows — our infrastructure choices, our
            retention windows, our disclosure posture — flows from that
            commitment.
          </p>
        </section>

        {/* 2. Data encryption */}
        <section>
          <h2 id="data-encryption" className="mt-20" style={H2_STYLE}>
            2. Data encryption
          </h2>
          <p className="mt-4">
            All personal and health data is protected with industry-standard
            encryption at every layer:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>
              <strong>At rest:</strong> AES-256 encryption applied to the
              managed Postgres database provided by Supabase, including
              automated backups.
            </li>
            <li>
              <strong>In transit:</strong> TLS 1.3 for every client-to-server
              connection across our marketing site, API, and mobile app.
            </li>
            <li>
              <strong>Secrets:</strong> API keys and service credentials are
              stored as encrypted environment variables on Vercel and
              Supabase. They are never checked into source control and never
              exposed to the browser.
            </li>
          </ul>
        </section>

        {/* 3. Infrastructure */}
        <section>
          <h2 id="infrastructure" className="mt-20" style={H2_STYLE}>
            3. Infrastructure
          </h2>
          <p className="mt-4">
            Merios runs on two carefully scoped platforms, each chosen for
            its security posture:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>
              <strong>Marketing site</strong> — Deployed on Vercel with a
              global CDN, automatic HTTPS, and DDoS protection at the edge.
              The marketing site is fully statically generated and does not
              store user health data.
            </li>
            <li>
              <strong>Application database</strong> — EU-hosted managed
              Postgres on Supabase. Row-Level Security (RLS) is enforced on
              every table that stores user-scoped data, including{" "}
              <code>waitlist_signups</code>, <code>newsletter_signups</code>,
              and <code>contact_inquiries</code>. A user can only ever read
              or modify rows that belong to them.
            </li>
            <li>
              <strong>Backups</strong> — Daily automated backups are retained
              for a minimum of 7 days, with point-in-time recovery available
              for incident response.
            </li>
          </ul>
        </section>

        {/* 4. Authentication */}
        <section>
          <h2 id="authentication" className="mt-20" style={H2_STYLE}>
            4. Authentication
          </h2>
          <p className="mt-4">
            Account creation and authenticated sessions ship with the mobile
            app at launch. Until then, the marketing site exposes only
            non-authenticated forms — the waitlist, newsletter, and contact
            endpoints.
          </p>
          <p className="mt-4">
            Every public form is rate-limited and CAPTCHA-protected at the
            middleware level to prevent abuse, credential stuffing, and
            automated scraping. Submissions are scoped to a single,
            purpose-specific table and never commingled with health data.
          </p>
        </section>

        {/* 5. Data retention & deletion */}
        <section>
          <h2
            id="data-retention-and-deletion"
            className="mt-20"
            style={H2_STYLE}
          >
            5. Data retention & deletion
          </h2>
          <p className="mt-4">
            You can request deletion of any personal data we hold about you at
            any time. There is no cost, no justification required, and no
            retention carve-out for marketing purposes.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>
              Submit a deletion request through our{" "}
              <a
                href="/contact?type=general&subject=Data%20deletion%20request"
                style={MAIL_STYLE}
              >
                contact form
              </a>{" "}
              with type <strong>General</strong>.
            </li>
            <li>
              Primary deletion from production systems is completed within 30
              days of your request.
            </li>
            <li>
              Backups containing the deleted data are purged on a rolling
              30-day cycle after the primary deletion, ensuring complete
              removal within roughly 60 days worst case.
            </li>
            <li>
              Data we are legally required to retain (e.g. transactional
              records for tax purposes) is isolated and retained only for the
              minimum statutory period.
            </li>
          </ul>
        </section>

        {/* 6. Third-party services */}
        <section>
          <h2 id="third-party-services" className="mt-20" style={H2_STYLE}>
            6. Third-party services
          </h2>
          <p className="mt-4">
            Every vendor in our stack is listed below. We do not use ad
            networks, analytics resellers, or data brokers.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>
              <strong>Vercel</strong> — Hosts the marketing site (static
              assets, edge middleware). No health data is processed or stored
              here.
            </li>
            <li>
              <strong>Supabase</strong> — EU-hosted application database and
              backend. Stores user-scoped records under Row-Level Security.
            </li>
            <li>
              <strong>OpenAI</strong> — Powers AI-generated health insights
              under a{" "}
              <strong>zero-retention policy</strong>. Prompts and completions
              are not stored by OpenAI and not used for model training. See
              our Privacy Policy for full detail.
            </li>
            <li>
              <strong>RevenueCat</strong> — Subscription billing and receipt
              validation, active once the Merios mobile app ships. PCI-DSS
              compliant, with no access to health data.
            </li>
            <li>
              <strong>Apple HealthKit</strong> — Optional on-device
              integration the user explicitly grants. Data stays on the
              user's device and is synced only to categories the user has
              approved.
            </li>
          </ul>
        </section>

        {/* 7. Breach notification */}
        <section>
          <h2 id="breach-notification" className="mt-20" style={H2_STYLE}>
            7. Breach notification
          </h2>
          <p className="mt-4">
            If we become aware of a personal-data breach that is likely to
            result in a risk to your rights and freedoms, we will notify
            affected users and the relevant supervisory authority within{" "}
            <strong>72 hours</strong> of detection, as required by GDPR
            Article 33.
          </p>
          <p className="mt-4">
            Notifications will describe the nature of the breach, the
            categories of data involved, the likely consequences, and the
            remediation steps we have taken. Notifications are sent to the
            email address on file and, where appropriate, surfaced in-app.
          </p>
        </section>

        {/* 8. Responsible disclosure */}
        <section>
          <h2 id="responsible-disclosure" className="mt-20" style={H2_STYLE}>
            8. Responsible disclosure
          </h2>
          <p className="mt-4">
            We welcome security research. If you believe you have found a
            vulnerability in any Merios property, please report it to{" "}
            <a href="mailto:security@merios.life" style={MAIL_STYLE}>
              security@merios.life
            </a>{" "}
            with as much detail as possible — affected endpoint, reproduction
            steps, and impact.
          </p>
          <p className="mt-4">
            We will not pursue legal action against researchers acting in
            good faith under standard responsible-disclosure practices, which
            means:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>
              Do not access, modify, or delete data beyond what is strictly
              necessary to demonstrate the issue.
            </li>
            <li>
              Do not exfiltrate data beyond a minimal proof-of-concept
              sufficient to show impact.
            </li>
            <li>
              Give us a reasonable period — typically 90 days — to
              investigate and remediate before any public disclosure.
            </li>
            <li>
              Do not run denial-of-service, social-engineering, or physical
              attacks against our staff or infrastructure.
            </li>
          </ul>
          <p className="mt-4">
            We will acknowledge receipt of your report within 3 business days
            and provide a status update within 10.
          </p>
        </section>

        {/* 9. Compliance */}
        <section>
          <h2 id="compliance" className="mt-20" style={H2_STYLE}>
            9. Compliance
          </h2>
          <p className="mt-4">
            <strong>GDPR.</strong> Merios is GDPR-compliant for users in the
            European Union. The data controller is Merios LLC. Our legal
            bases for processing are consent and contract performance — see
            the Privacy Policy for full detail, including your rights of
            access, rectification, erasure, portability, and objection.
          </p>
          <p className="mt-4">
            <strong>HIPAA.</strong> Merios is not currently a HIPAA covered
            entity. We are progressively aligning our operations with
            HIPAA-style controls — encryption at rest and in transit,
            role-based access controls, audit logging, and the minimum
            necessary access principle — so that covered-entity partnerships
            are possible as the app matures.
          </p>
        </section>

        {/* 10. Contact */}
        <section>
          <h2 id="contact" className="mt-20" style={H2_STYLE}>
            10. Contact
          </h2>
          <p className="mt-4">
            For security issues and vulnerability reports:{" "}
            <a href="mailto:security@merios.life" style={MAIL_STYLE}>
              security@merios.life
            </a>
            .
          </p>
          <p className="mt-4">
            For general data questions, deletion requests, or compliance
            inquiries, please use our{" "}
            <a href="/contact?type=general" style={MAIL_STYLE}>
              contact form
            </a>
            .
          </p>
        </section>
      </LegalPageLayout>
      <Footer />
    </>
  );
}
