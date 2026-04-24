import { Metadata } from 'next';
import Footer from "@/components/Footer";
import LegalPageLayout, { type TocItem } from "@/components/ui/LegalPageLayout";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Merios Privacy Policy. Learn how we protect your health data with AES-256 encryption, GDPR compliance, and zero data selling. Your biomarker data stays yours.",
  alternates: {
    canonical: "https://merios.life/privacy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Merios Privacy Policy. Learn how we protect your health data with AES-256 encryption, GDPR compliance, and zero data selling.",
    url: "https://merios.life/privacy",
    type: "website",
  },
};

const tocItems: TocItem[] = [
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-your-information", label: "How we use your information" },
  { id: "data-storage-and-security", label: "Data storage & security" },
  { id: "third-party-services", label: "Third-party services" },
  { id: "your-rights", label: "Your rights" },
  { id: "gdpr-compliance", label: "GDPR compliance" },
  { id: "data-retention", label: "Data retention" },
  { id: "childrens-privacy", label: "Children's privacy" },
  { id: "changes-to-this-policy", label: "Changes to this policy" },
  { id: "contact-us", label: "Contact us" },
];

const privacyLd = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  name: "Merios Privacy Policy",
  url: "https://merios.life/privacy",
  publisher: { "@type": "Organization", name: "Merios", url: "https://merios.life" },
  dateModified: "2026-04-03",
};

const H2_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
  fontWeight: 350,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: "var(--color-ink)",
};

const H3_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  fontWeight: 500,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: "var(--color-green-deep)",
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Privacy", url: "https://merios.life/privacy" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyLd) }}
      />
      <LegalPageLayout
        eyebrow="Privacy"
        title="Privacy Policy"
        lastUpdated="April 3, 2026"
        tocItems={tocItems}
      >
        {/* Intro */}
        <section>
          <p>
            At Merios ("we," "us," "our," or the "Company"), operated by Merios LLC, a US-based corporation, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your information. This Privacy Policy explains our practices regarding personal data and health information.
          </p>
          <p className="mt-4">
            Please read this policy carefully. By using Merios, you consent to the practices described herein.
          </p>
        </section>

        {/* Section 1 */}
        <section>
          <h2 id="information-we-collect" className="mt-16" style={H2_STYLE}>
            1. Information We Collect
          </h2>
          <p className="mt-4">
            We collect information you provide directly and automatically through your use of Merios:
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Personal Information
          </h3>
          <p>
            Email address, name, age, gender, and other profile information you provide when creating an account.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Health Data
          </h3>
          <p>
            Blood test results, biomarkers, Apple Health data (steps, heart rate, sleep), daily health check-ins, symptoms, medications, and other health metrics you choose to share. This health information is highly sensitive and is treated with the highest level of care.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Usage Data
          </h3>
          <p>
            Device information, browser type, IP address, pages visited, time spent on features, and interaction patterns. We use this to improve the app and understand user behavior.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 id="how-we-use-your-information" className="mt-20" style={H2_STYLE}>
            2. How We Use Your Information
          </h2>
          <p className="mt-4">We use the information we collect to:</p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>Provide, maintain, and improve the Merios service</li>
            <li>Calculate your personalized health scores and insights</li>
            <li>Send you service-related announcements and account notifications</li>
            <li>Respond to your requests and support inquiries</li>
            <li>Improve our algorithms and analytics capabilities</li>
            <li>Detect and prevent fraud or misuse of the platform</li>
            <li>Comply with legal obligations and enforce our terms</li>
            <li>With your consent, send you wellness tips and marketing communications</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 id="data-storage-and-security" className="mt-20" style={H2_STYLE}>
            3. Data Storage & Security
          </h2>
          <p className="mt-4">
            We take the security of your data very seriously. Your information is:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>
              <strong>Encrypted at rest</strong> using industry-standard encryption (AES-256)
            </li>
            <li>
              <strong>Encrypted in transit</strong> using TLS/SSL protocols
            </li>
            <li>
              <strong>Stored on Supabase</strong>, a secure PostgreSQL platform with enterprise-grade infrastructure
            </li>
            <li>
              <strong>Hosted in secure data centers</strong> located in the United States and European Union with redundancy and backup systems
            </li>
            <li>
              <strong>Protected by access controls</strong> limiting who can view or modify your data
            </li>
          </ul>
          <p className="mt-4">
            While we employ best practices, no system is perfectly secure. We encourage you to use strong passwords and protect your account credentials.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 id="third-party-services" className="mt-20" style={H2_STYLE}>
            4. Third-Party Services
          </h2>
          <p className="mt-4">
            We use third-party service providers to help us operate Merios:
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Supabase
          </h3>
          <p>
            Our database and backend infrastructure provider. Your data is encrypted and stored securely within their systems. See their privacy policy at supabase.com.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            OpenAI
          </h3>
          <p>
            We use OpenAI's API for health data analysis and insight generation. OpenAI operates under a <strong>zero retention policy</strong>, meaning your data is not stored or used to train their models. Your health data is processed exclusively for your benefit within the Merios platform.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            RevenueCat
          </h3>
          <p>
            We use RevenueCat for subscription management and billing. Payment data is handled securely and complies with PCI-DSS standards.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Apple HealthKit
          </h3>
          <p>
            If you choose to connect Apple Health, we access health metrics with your explicit permission. You can revoke access at any time through iOS Settings.
          </p>

          <p className="mt-4">
            We do not share your health data with third parties except as necessary to provide the service and in compliance with your consent and applicable law.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 id="your-rights" className="mt-20" style={H2_STYLE}>
            5. Your Rights
          </h2>
          <p className="mt-4">
            Depending on your location, you have the following rights regarding your data:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>
              <strong>Right to Access:</strong> Request a copy of all personal data we hold about you
            </li>
            <li>
              <strong>Right to Rectification:</strong> Correct inaccurate information
            </li>
            <li>
              <strong>Right to Deletion:</strong> Request deletion of your data (subject to legal retention requirements)
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Receive your data in a portable format
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Opt out of non-essential data processing
            </li>
            <li>
              <strong>Right to Object:</strong> Object to processing of your data for marketing or analytics
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, contact us at <strong>privacy@merios.life</strong>.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 id="gdpr-compliance" className="mt-20" style={H2_STYLE}>
            6. GDPR Compliance
          </h2>
          <p className="mt-4">
            For users in the European Union and those subject to GDPR:
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Legal Basis for Processing
          </h3>
          <p>
            We process your data on the basis of: (1) your explicit consent, (2) contract performance (providing the service), (3) legal compliance, and (4) legitimate interests (improving service quality and security).
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Data Controller
          </h3>
          <p>
            Merios LLC, US. For GDPR inquiries, contact <strong>legal@merios.life</strong>.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>
            Data Subject Rights
          </h3>
          <p>
            You have rights outlined in Section 5, plus the right to lodge a complaint with your local data protection authority.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 id="data-retention" className="mt-20" style={H2_STYLE}>
            7. Data Retention
          </h2>
          <p className="mt-4">
            We retain your personal and health data for as long as your account is active. If you request deletion of your account:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>Your data will be deleted within 30 days of your request</li>
            <li>Backups may retain data for an additional 30 days for safety and recovery purposes</li>
            <li>Data required for legal compliance or to resolve disputes will be retained as needed</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 id="childrens-privacy" className="mt-20" style={H2_STYLE}>
            8. Children's Privacy
          </h2>
          <p className="mt-4">
            Merios is not intended for individuals under 18 years old. We do not knowingly collect information from minors. If we become aware that a user is under 18, we will delete their account and associated data. Parents or guardians who believe a child's information has been collected should contact us immediately at <strong>privacy@merios.life</strong>.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 id="changes-to-this-policy" className="mt-20" style={H2_STYLE}>
            9. Changes to This Policy
          </h2>
          <p className="mt-4">
            We may update this Privacy Policy periodically. Material changes will be communicated via email or a prominent notice in the app. Your continued use of Merios after changes constitutes your acceptance of the updated policy. We encourage you to review this policy regularly.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 id="contact-us" className="mt-20" style={H2_STYLE}>
            10. Contact Us
          </h2>
          <p className="mt-4">
            If you have questions or concerns about this Privacy Policy or our privacy practices, please contact:
          </p>
          <div
            className="border rounded-md p-6 mt-6"
            style={{
              borderColor: "var(--color-grid)",
              background: "var(--color-canvas-alt)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 17,
                color: "var(--color-ink)",
              }}
            >
              Merios LLC
            </p>
            <p className="mt-2">
              Email: <strong>privacy@merios.life</strong>
            </p>
            <p className="mt-1">United States</p>
          </div>
        </section>
      </LegalPageLayout>
      <Footer />
    </>
  );
}
