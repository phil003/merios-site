import { Metadata } from 'next';
import Footer from "@/components/Footer";
import LegalPageLayout, { type TocItem } from "@/components/ui/LegalPageLayout";
import { BreadcrumbSchema } from "@/components/StructuredData";

// Privacy Policy v2.0.0 — the version users accept in the app
// (CURRENT_PRIVACY_VERSION in meryos/src/services/consent-service.ts).
// Bump POLICY_VERSION, POLICY_DATE and the history table together.
const POLICY_VERSION = "2.0.0";
const POLICY_DATE = "September 23, 2026";
const POLICY_DATE_ISO = "2026-09-23";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Merios Privacy Policy (v2.0.0). What health data Merios reads, why, who processes it, and how to export or delete it. Data hosted in the EU, never sold, never used for advertising.",
  alternates: {
    canonical: "https://merios.life/privacy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Merios Privacy Policy (v2.0.0). What health data Merios reads, why, who processes it, and how to export or delete it.",
    url: "https://merios.life/privacy",
    type: "website",
  },
};

const tocItems: TocItem[] = [
  { id: "who-we-are", label: "Who we are" },
  { id: "data-we-collect", label: "Data we collect" },
  { id: "how-we-use-your-data", label: "How we use your data" },
  { id: "ai-processing", label: "AI processing" },
  { id: "apple-health", label: "Apple Health data" },
  { id: "service-providers", label: "Service providers" },
  { id: "storage-and-security", label: "Storage & security" },
  { id: "legal-bases", label: "Legal bases & transfers" },
  { id: "data-retention", label: "Data retention" },
  { id: "your-rights", label: "Your rights" },
  { id: "website", label: "Our website" },
  { id: "childrens-privacy", label: "Children's privacy" },
  { id: "changes-to-this-policy", label: "Changes & version history" },
  { id: "contact-us", label: "Contact us" },
];

const privacyLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Merios Privacy Policy",
  url: "https://merios.life/privacy",
  version: POLICY_VERSION,
  dateModified: POLICY_DATE_ISO,
  publisher: { "@type": "Organization", name: "Merios", url: "https://merios.life" },
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

const BOX_STYLE: React.CSSProperties = {
  borderColor: "var(--color-grid)",
  background: "var(--color-canvas-alt)",
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
        subline={`Version ${POLICY_VERSION}`}
        lastUpdated={POLICY_DATE}
        tocItems={tocItems}
      >
        {/* Intro */}
        <section>
          <p>
            This Privacy Policy explains what personal data Merios collects, why, who processes it on our behalf, and how you stay in control of it. It applies to the Merios iOS app and to this website. It is version {POLICY_VERSION}, in effect since {POLICY_DATE}; it is the version you are asked to accept in the app.
          </p>
          <div className="border rounded-md p-6 mt-6" style={BOX_STYLE}>
            <p>
              <strong>Merios is a wellness companion, not a medical device.</strong> It does not provide medical advice and does not diagnose, treat, cure or prevent any disease. Scores and biological age estimates are algorithmic calculations, not clinically validated measurements. Always consult a qualified healthcare professional before making health decisions.
            </p>
          </div>
          <div className="border rounded-md p-6 mt-6" style={BOX_STYLE}>
            <p style={{ fontWeight: 600, color: "var(--color-ink)" }}>The short version</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>We never sell your data and never use your health data for advertising or marketing.</li>
              <li>Your data is hosted in the European Union (Ireland), encrypted in transit and at rest, and only you can access it.</li>
              <li>Apple Health is read only, with your permission, and you can disconnect it at any time.</li>
              <li>The two AI features (reading a lab report, writing your reports) are optional and each needs your consent.</li>
              <li>You can export or delete everything from inside the app, in a few taps.</li>
            </ul>
          </div>
        </section>

        {/* 1 */}
        <section>
          <h2 id="who-we-are" className="mt-16" style={H2_STYLE}>
            1. Who We Are
          </h2>
          <p className="mt-4">
            Merios is published by <strong>Merios Health LLC</strong>, a limited liability company registered in Wyoming, United States (&ldquo;Merios,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). Merios Health LLC is the data controller for the personal data described in this policy.
          </p>
          <p className="mt-4">
            Data protection contact: <strong>privacy@merios.life</strong>
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 id="data-we-collect" className="mt-20" style={H2_STYLE}>
            2. Data We Collect
          </h2>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Account data</h3>
          <p>
            Your email address (or the address relayed by Sign in with Apple), your name if you provide it, your date of birth and your biological sex. Your date of birth is used to confirm you are 18 or older and, with your sex, to interpret your data against the right reference ranges.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Apple Health data</h3>
          <p>
            If you connect Apple Health, we read the data types you allow, including up to 365 days of history when you first connect: activity (steps, distance, active energy, exercise and stand time, flights climbed), heart (heart rate, resting and walking heart rate, heart rate variability, heart rate recovery), sleep, vitals (respiratory rate, blood oxygen, blood pressure, blood glucose, wrist and basal body temperature, VO2 max), body measurements (weight, height, body fat, lean mass), mobility, time in daylight, mindful minutes and, if you track them in Apple Health, menstrual cycle data and symptoms. See Section 5 for the rules that apply to this data.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Blood test results</h3>
          <p>
            Biomarker values you enter by hand or confirm after scanning a lab report, with their dates and units, and the photos or PDFs you choose to scan (see Section 4: they are processed to read the values and are not stored by Merios).
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Journal and cycle</h3>
          <p>
            What you choose to log: how you feel, symptoms, sleep, stress, exercise, nutrition, medications, a free-text daily note and, if you use cycle tracking, your period days and related symptoms.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Data we derive</h3>
          <p>
            Your daily Merios Score and its pillars (Activity, Recovery, Zen), your personal baselines, biomarker trends, biological age estimate, insights and, if you subscribe to Merios Plus, your written reports.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Consent and subscription records</h3>
          <p>
            Which consents you gave or withdrew, when, and under which policy version; your subscription status (never your payment card, which Apple handles).
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Technical data</h3>
          <p>
            Crash reports and diagnostics (device model, OS and app version, error traces) and product events such as &ldquo;subscription screen viewed&rdquo; or &ldquo;plan selected&rdquo;, linked to your account, which tell us whether the app works. These events never contain health values.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 id="how-we-use-your-data" className="mt-20" style={H2_STYLE}>
            3. How We Use Your Data
          </h2>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>Compute your daily score, pillars, baselines and biological age estimate</li>
            <li>Show your trends and your blood results over time, in plain language</li>
            <li>Read the values from a lab report you scan, when you ask for it (Section 4)</li>
            <li>Write your monthly report and insights, if you subscribe and consent (Section 4)</li>
            <li>Manage your account and subscription, and send service emails (sign-in, password reset, account notices)</li>
            <li>Fix crashes, measure whether key screens work, and keep the service secure</li>
            <li>Comply with our legal obligations</li>
          </ul>
          <p className="mt-4">
            We <strong>never</strong> sell your data to anyone, and we <strong>never</strong> use your health data or your Apple Health data for advertising, marketing or data mining. We do not share it with data brokers or advertisers, and we do not use it to train AI models.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 id="ai-processing" className="mt-20" style={H2_STYLE}>
            4. AI Processing
          </h2>
          <p className="mt-4">
            Two features use OpenAI&rsquo;s API. Each is optional, is asked for when you first use it, and can be switched off at any time in Settings &rsaquo; Privacy &amp; Consents.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Reading a lab report</h3>
          <p>
            When you scan a lab report, the photo or PDF is sent over an encrypted connection to OpenAI, which reads the biomarker values; a second automated pass re-checks the reading against the same document and flags anything you should verify. You review the values before they are saved. Merios does not store the photo or PDF: only the values you confirm are kept in your account.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Reports and insights</h3>
          <p>
            If you subscribe to Merios Plus and consent to AI insights, your reports are written by an OpenAI model from <strong>aggregated figures</strong> (for example monthly averages, score trends and biomarker changes), never from raw daily Apple Health samples, then checked automatically against our wellness charter so they stay non-medical.
          </p>

          <h3 className="mt-8 mb-3" style={H3_STYLE}>Safeguards</h3>
          <p>
            OpenAI processes this data under a data processing agreement, does not use it to train its models and does not retain it after processing (zero data retention). Every AI request is logged by Merios with a request ID, without its content, for audit purposes.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 id="apple-health" className="mt-20" style={H2_STYLE}>
            5. Apple Health Data
          </h2>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>Merios reads Apple Health data only with your permission and never writes to Apple Health.</li>
            <li>It is used only to provide the Merios features described in this policy: scores, baselines, trends, insights and reports.</li>
            <li>It is never used for advertising, marketing or data mining, and never sold or shared with data brokers, advertisers or any third party not needed to run Merios.</li>
            <li>It is never stored in iCloud by Merios. It is synced to your Merios account, encrypted in transit and at rest.</li>
            <li>Only aggregated figures may be sent to our AI provider for your reports; raw samples are never sent to third parties.</li>
            <li>You can stop access at any time in iOS Settings &rsaquo; Health &rsaquo; Data Access &amp; Devices &rsaquo; Merios, and delete the data already synced by deleting your account.</li>
          </ul>
        </section>

        {/* 6 */}
        <section>
          <h2 id="service-providers" className="mt-20" style={H2_STYLE}>
            6. Service Providers
          </h2>
          <p className="mt-4">
            We rely on the following providers (sub-processors). Each receives only what it needs to do its job.
          </p>
          <ul className="mt-4 space-y-3 list-disc pl-5">
            <li>
              <strong>Supabase</strong> (database, authentication, file storage, server functions): hosts all your account and health data, in the European Union (AWS eu-west-1, Ireland).
            </li>
            <li>
              <strong>OpenAI</strong> (United States): reads scanned lab reports and writes reports and insights, only with your consent (Section 4).
            </li>
            <li>
              <strong>Apple</strong>: Sign in with Apple, Apple Health on your device, and in-app purchases. Apple processes your payment; we never see your card.
            </li>
            <li>
              <strong>RevenueCat</strong> (United States): manages subscriptions. Receives an anonymous user ID and your purchase and subscription status, never health data.
            </li>
            <li>
              <strong>Sentry</strong>: crash and error monitoring. Receives technical diagnostics; health data is scrubbed from reports before they are sent.
            </li>
            <li>
              <strong>Resend</strong> and <strong>Substack</strong>: send the Baseline newsletter and its welcome email. They receive your email address, never app or health data.
            </li>
            <li>
              <strong>Vercel</strong> and <strong>Google Analytics</strong>: host this website and measure its audience (Section 11). They receive no app or health data.
            </li>
          </ul>
        </section>

        {/* 7 */}
        <section>
          <h2 id="storage-and-security" className="mt-20" style={H2_STYLE}>
            7. Storage &amp; Security
          </h2>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>Data is stored on Supabase in the European Union (Ireland).</li>
            <li>Encrypted in transit (TLS 1.2 or higher) and at rest (AES-256).</li>
            <li>Row Level Security: each row in the database can be read only by the account it belongs to.</li>
            <li>Sign-in tokens are kept in the iOS Keychain on your device.</li>
            <li>File storage buckets are private; no health file is ever reachable through a public link.</li>
          </ul>
          <p className="mt-4">
            No system is perfectly secure. If a breach affecting your data occurs, we will notify you and the competent authorities as required by law.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 id="legal-bases" className="mt-20" style={H2_STYLE}>
            8. Legal Bases &amp; International Transfers
          </h2>
          <p className="mt-4">Where the GDPR or a similar law applies, we rely on:</p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li><strong>Your explicit consent</strong> (GDPR Art. 9(2)(a)) for health data, Apple Health data and each AI feature. You give it in the app, feature by feature, and can withdraw it at any time; withdrawal does not affect processing done before it.</li>
            <li><strong>Performance of our contract with you</strong> for your account and subscription.</li>
            <li><strong>Our legitimate interests</strong> for crash diagnostics, product events and security, which never involve health values.</li>
            <li><strong>Legal obligations</strong>, for example keeping consent records.</li>
          </ul>
          <p className="mt-4">
            Your data is hosted in the EU. Some providers listed in Section 6 are based in the United States; where data is transferred there, we rely on the safeguards provided for by law, such as the European Commission&rsquo;s Standard Contractual Clauses or the provider&rsquo;s certification under the EU-U.S. Data Privacy Framework.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 id="data-retention" className="mt-20" style={H2_STYLE}>
            9. Data Retention
          </h2>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>Your account and health data are kept as long as your account exists.</li>
            <li>Scanned lab report photos and PDFs are not stored by Merios; OpenAI does not retain them after processing.</li>
            <li>When you delete your account in the app, your account and all its data are deleted permanently. Residual copies in encrypted backups are erased as those backups expire.</li>
            <li>AI request logs (without content) are kept for 12 months.</li>
            <li>Consent records are kept for the life of your account and 3 years after deletion, to prove what you agreed to.</li>
          </ul>
        </section>

        {/* 10 */}
        <section>
          <h2 id="your-rights" className="mt-20" style={H2_STYLE}>
            10. Your Rights
          </h2>
          <p className="mt-4">Wherever you live, you can do most of this yourself in the app:</p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li><strong>Access and portability:</strong> Settings &rsaquo; Export my data gives you a complete copy in a machine-readable format (JSON).</li>
            <li><strong>Rectification:</strong> edit your profile, your journal and your biomarker values in the app.</li>
            <li><strong>Deletion:</strong> Settings &rsaquo; Delete my account erases your account and all its data.</li>
            <li><strong>Withdraw consent:</strong> Settings &rsaquo; Privacy &amp; Consents, feature by feature; Apple Health access from iOS Settings.</li>
            <li><strong>Objection and restriction</strong>, and any other right your local law gives you (including under the GDPR and US state privacy laws): write to <strong>privacy@merios.life</strong>. We answer within one month.</li>
          </ul>
          <p className="mt-4">
            You can also lodge a complaint with your local data protection authority.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 id="website" className="mt-20" style={H2_STYLE}>
            11. Our Website
          </h2>
          <p className="mt-4">
            merios.life is hosted by Vercel. We measure its audience with Vercel Web Analytics and Google Analytics (pages visited, referring site, approximate location, device and browser type). If you subscribe to the Baseline newsletter or use the contact form, we keep your email address and message to send the newsletter or answer you; every newsletter has an unsubscribe link. The free calculators on the site run in your browser. None of this is linked to your app account or health data.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2 id="childrens-privacy" className="mt-20" style={H2_STYLE}>
            12. Children&rsquo;s Privacy
          </h2>
          <p className="mt-4">
            Merios is for adults 18 and older. The app asks for your date of birth before an account is created and blocks anyone under 18. If we learn that we hold data from someone under 18, we delete the account and its data. Parents or guardians can contact <strong>privacy@merios.life</strong>.
          </p>
        </section>

        {/* 13 */}
        <section>
          <h2 id="changes-to-this-policy" className="mt-20" style={H2_STYLE}>
            13. Changes &amp; Version History
          </h2>
          <p className="mt-4">
            Each version of this policy has a number. When a change affects what data we process, where it goes or who has access, the app shows you what changed and asks you to accept the new version before you continue; your acceptance is recorded with the version number. Other changes are announced on this page.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li><strong>2.0.0 (September 2026):</strong> Merios 2.0. Import of up to 365 days of Apple Health history for daily scores and baselines; journal and cycle logging; reports written by an AI model from aggregated figures only and checked against our wellness charter; clarified that scanned lab report files are not stored.</li>
            <li><strong>1.2.0 (April 28, 2026):</strong> separate consent for AI insights.</li>
            <li><strong>1.1.0 (April 27, 2026):</strong> automated second pass re-checking lab report readings.</li>
            <li><strong>1.0.0 (April 11, 2026):</strong> first version.</li>
          </ul>
        </section>

        {/* 14 */}
        <section>
          <h2 id="contact-us" className="mt-20" style={H2_STYLE}>
            14. Contact Us
          </h2>
          <p className="mt-4">
            Questions about this policy or your data:
          </p>
          <div className="border rounded-md p-6 mt-6" style={BOX_STYLE}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 17,
                color: "var(--color-ink)",
              }}
            >
              Merios Health LLC
            </p>
            <p className="mt-2">
              Email: <strong>privacy@merios.life</strong>
            </p>
            <p className="mt-1">Wyoming, United States</p>
          </div>
        </section>
      </LegalPageLayout>

      <Footer />
    </>
  );
}
