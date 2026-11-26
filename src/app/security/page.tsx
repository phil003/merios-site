import { Metadata } from "next";
import Footer from "@/components/Footer";
import LegalPageLayout, { type TocItem } from "@/components/ui/LegalPageLayout";
import legal from "@/components/legal/legalBody.module.css";
import sec from "@/components/legal/security.module.css";
import SecurityDataMap from "@/components/legal/SecurityDataMap";
import ProviderList, { type Provider } from "@/components/legal/ProviderList";
import { BreadcrumbSchema } from "@/components/StructuredData";

/** U+2011: a hyphen that never splits a term across two lines. */
const NBH = "\u2011";

export const metadata: Metadata = {
  // Already names the brand: absolute, so the layout template does not
  // append a second "| Merios".
  title: { absolute: "Security — Merios" },
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

// §10 "Contact" was removed on Nov 26, 2026: the layout's closing card
// ("Questions? Contact us") follows right after, security@ is in §8 and
// privacy@ closes §9.
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
];

/**
 * A section's eyebrow: the shipped numeral on its hairline, plus a label.
 * Visual only — the H2 keeps "N." as screen-reader text, so its text content
 * is unchanged ("1. Our approach").
 */
function Eyebrow({ n, label }: { n: number; label: string }) {
  return (
    <p aria-hidden className={sec.eyebrow}>
      <span className={sec.eyebrowNum}>{n}</span>
      <span>·</span>
      <span>{label}</span>
    </p>
  );
}

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
  dateModified: "2026-11-26",
};

// §6 — each provider's sentence is the shipped text, unchanged. `scope`,
// `tag` and `health` only restate it, for the card header and the filter.
const PROVIDERS: Provider[] = [
  {
    name: "Supabase",
    scope: "EU · Ireland",
    health: true,
    tag: "Hosts health data",
    tone: "health",
    body: (
      <>
        <strong>Supabase</strong> — Database, authentication, file
        storage and server functions, in the European Union (AWS
        eu{NBH}west{NBH}1, Ireland). Hosts all account and health data, under
        Row{NBH}Level Security.
      </>
    ),
  },
  {
    name: "OpenAI",
    scope: "AI features",
    health: true,
    tag: "Only with your consent",
    tone: "consent",
    body: (
      <>
        <strong>OpenAI</strong> — Reads scanned lab reports and writes
        reports and insights, only with your consent. OpenAI does not
        use API data for model training and may keep requests in its
        abuse{NBH}monitoring logs for up to 30 days.
      </>
    ),
  },
  {
    name: "Apple",
    scope: "Sign-in · Health · Purchases",
    health: true,
    tag: "Apple Health: read only",
    tone: "health",
    body: (
      <>
        <strong>Apple</strong> — Sign in with Apple, Apple Health and
        in{NBH}app purchases. Apple Health is read only, with your
        permission, and you can disconnect it at any time. Apple
        processes your payment; we never see your card.
      </>
    ),
  },
  {
    name: "RevenueCat",
    scope: "Subscriptions",
    health: false,
    tag: "Never health data",
    tone: "none",
    body: (
      <>
        <strong>RevenueCat</strong> — Manages subscriptions for the
        Merios iPhone app. Receives an anonymous user ID, your purchase
        and subscription status and technical device identifiers, never
        health data. It forwards trial and subscription events to Meta.
      </>
    ),
  },
  {
    name: "Meta",
    scope: "Ad measurement",
    health: false,
    tag: "Never health data",
    tone: "none",
    body: (
      <>
        <strong>Meta</strong> — Measures our ads: app installs,
        account creation and subscription events, with technical
        identifiers. Never health data.
      </>
    ),
  },
  {
    name: "Sentry",
    scope: "Crash reports",
    health: false,
    tag: "Health data scrubbed",
    tone: "none",
    body: (
      <>
        <strong>Sentry</strong> — Crash and error monitoring. Health
        data is scrubbed from reports before they are sent.
      </>
    ),
  },
  {
    name: "Resend and Substack",
    scope: "Newsletter",
    health: false,
    tag: "Never app or health data",
    tone: "none",
    body: (
      <>
        <strong>Resend and Substack</strong> — Send the Baseline
        newsletter and its welcome email. They receive your email
        address, never app or health data.
      </>
    ),
  },
  {
    name: "Vercel and Google Analytics",
    scope: "This website",
    health: false,
    tag: "No app or health data",
    tone: "none",
    body: (
      <>
        <strong>Vercel and Google Analytics</strong> — Host this website
        and measure its audience. No app or health data is processed or
        stored here.
      </>
    ),
  },
];

// §3 figure — example rows (labelled "Example data", aria-hidden).
const RLS_ROWS = [
  { owner: "You", marker: "Ferritin", value: "30 ng/mL", mine: true, bars: ["", ""] },
  { owner: "Account 7f2", marker: "", value: "", mine: false, bars: ["70%", "80%"] },
  { owner: "You", marker: "HbA1c", value: "5.2 %", mine: true, bars: ["", ""] },
  { owner: "Account c91", marker: "", value: "", mine: false, bars: ["55%", "65%"] },
];

// §5 figure — every duration is stated in the text of §5 or §6.
const KEEP = [
  {
    what: "Website sign-ups",
    where: "newsletter, contact form",
    keep: "Deleted within 30 days of your request",
    at: "28%",
  },
  {
    what: "Requests sent to OpenAI",
    where: "in its abuse\u2011monitoring logs",
    keep: "Up to 30 days",
    at: "28%",
  },
  {
    what: "Your account and all its data",
    where: "Settings › Delete my account",
    keep: "Deleted with your account",
    at: "72%",
  },
  {
    what: "Consent records",
    where: "to prove what you agreed to",
    keep: "Account life, plus 3 years",
    at: "100%",
  },
];

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
        lastUpdated="November 26, 2026"
        tocItems={tocItems}
        width="wide"
        heroVisual={<SecurityDataMap />}
      >
        <div className={sec.body}>
          {/* 1. Our approach */}
          <section id="our-approach" className={sec.section}>
            <Eyebrow n={1} label="Principles" />
            <h2 className={sec.h2}>
              <span className="sr-only">1. </span>Our <em>approach</em>
            </h2>
            <div className={sec.split}>
              <div className={sec.flow}>
                <p className={sec.lead}>
                  Security at Merios is designed in, not bolted on. Every system that
                  touches your health data — from the moment a biomarker is parsed,
                  to the long-term store that powers your score — is built around
                  three principles: encrypt by default, collect the minimum, and
                  never treat health data as a commercial asset.
                </p>
                <p>
                  Your health data belongs to you. We act as a custodian, not an
                  owner. Everything that follows — our infrastructure choices, our
                  retention windows, our disclosure posture — flows from that
                  commitment.
                </p>
              </div>
              <ol aria-hidden className={sec.principles}>
                <li>
                  <span className={sec.principleNum}>01</span>
                  <span>Encrypt by default</span>
                </li>
                <li>
                  <span className={sec.principleNum}>02</span>
                  <span>Collect the minimum</span>
                </li>
                <li>
                  <span className={sec.principleNum}>03</span>
                  <span>Never treat health data as a commercial asset</span>
                </li>
              </ol>
            </div>
          </section>

          {/* 2. Data encryption */}
          <section id="data-encryption" className={sec.section}>
            <Eyebrow n={2} label="At rest and in transit" />
            <h2 className={sec.h2}>
              <span className="sr-only">2. </span>Data <em>encryption</em>
            </h2>
            <p className={sec.lead}>
              All personal and health data is protected with industry-standard
              encryption at every layer:
            </p>
            <ul className={sec.encGrid}>
              <li className={sec.encCard}>
                <div aria-hidden className={sec.plate} data-tone="sky">
                  <span className={sec.plateLabel}>Advanced Encryption Standard</span>
                  <span className={sec.plateFigure}>
                    <span className={sec.plateUnit}>AES</span>
                    <span className={sec.plateNum}>256</span>
                  </span>
                </div>
                <p className={sec.encText}>
                  <strong>At rest:</strong> AES{NBH}256 encryption applied to the
                  managed Postgres database provided by Supabase, and to its
                  backups.
                </p>
              </li>
              <li className={sec.encCard}>
                <div aria-hidden className={sec.plate} data-tone="peach">
                  <span className={sec.plateLabel}>Transport Layer Security</span>
                  <span className={sec.plateFigure}>
                    <span className={sec.plateUnit}>TLS</span>
                    <span className={sec.plateNum}>1.2+</span>
                  </span>
                </div>
                <p className={sec.encText}>
                  <strong>In transit:</strong> TLS 1.2 or higher for every
                  connection between the mobile app, our servers, and this
                  website.
                </p>
              </li>
              <li className={sec.encCard}>
                <div aria-hidden className={sec.plate} data-tone="lavender">
                  <span className={sec.plateLabel}>On your device</span>
                  <span className={sec.plateFigure}>
                    <span className={sec.plateUnit}>iOS</span>
                    <span className={sec.plateNum} data-size="s">
                      Keychain
                    </span>
                  </span>
                </div>
                <p className={sec.encText}>
                  <strong>Sign-in tokens:</strong> kept in the iOS Keychain on
                  your device.
                </p>
              </li>
              <li className={sec.encCard}>
                <div aria-hidden className={sec.plate} data-tone="haze">
                  <span className={sec.plateLabel}>Service credentials</span>
                  <span className={sec.plateFigure}>
                    <span className={sec.plateUnit}>Secrets</span>
                    <span className={sec.plateNum} data-size="s">
                      encrypted
                    </span>
                  </span>
                </div>
                <p className={sec.encText}>
                  <strong>Secrets:</strong> secret keys and service credentials
                  are stored as encrypted environment variables on Vercel and
                  Supabase. They are never checked into source control and never
                  exposed to the browser.
                </p>
              </li>
            </ul>
          </section>

          {/* 3. Infrastructure */}
          <section id="infrastructure" className={sec.section}>
            <Eyebrow n={3} label="Where it runs" />
            <h2 className={sec.h2}>
              <span className="sr-only">3. </span>
              <em>Infrastructure</em>
            </h2>
            <p className={sec.lead}>
              Merios runs on two carefully scoped platforms, each chosen for
              its security posture:
            </p>
            <div className={sec.split}>
              <ul className={sec.rows}>
                <li>
                  <strong>Marketing site</strong> — Deployed on Vercel with a
                  global CDN, automatic HTTPS, and DDoS protection at the edge.
                  The marketing site is fully statically generated and does not
                  store user health data.
                </li>
                <li>
                  <strong>Application database</strong> — Managed Postgres on
                  Supabase, in the European Union (AWS eu{NBH}west{NBH}1, Ireland).
                  Row{NBH}Level Security (RLS) is enforced in the database itself:
                  each row of account data can be read only by the account it
                  belongs to. File storage buckets are private; no health file
                  is ever reachable through a public link.
                </li>
                <li>
                  <strong>Backups</strong> — Database backups are encrypted and
                  expire on a rolling basis.
                </li>
              </ul>

              <figure aria-hidden className={sec.rls}>
                <div className={sec.rlsHead}>
                  <span>Row{NBH}Level Security · one table</span>
                  <span>Example data</span>
                </div>
                <div className={`${sec.rlsRow} ${sec.rlsCols}`}>
                  <span>Owner</span>
                  <span>Marker</span>
                  <span>Value</span>
                  <span>Access</span>
                </div>
                {RLS_ROWS.map((r) => (
                  <div
                    key={r.owner + r.marker}
                    className={sec.rlsRow}
                    data-mine={r.mine ? "true" : "false"}
                  >
                    <span>{r.owner}</span>
                    {r.mine ? (
                      <>
                        <span>{r.marker}</span>
                        <span className={sec.rlsValue}>{r.value}</span>
                        <span className={sec.rlsAccess}>yours</span>
                      </>
                    ) : (
                      <>
                        <span className={sec.rlsBar} style={{ width: r.bars[0] }} />
                        <span className={sec.rlsBar} style={{ width: r.bars[1] }} />
                        <span className={sec.rlsAccess}>no access</span>
                      </>
                    )}
                  </div>
                ))}
                <p className={sec.rlsNote}>
                  Each row can be read only by the account it belongs to.
                </p>
              </figure>
            </div>
          </section>

          {/* 4. Authentication */}
          <section id="authentication" className={sec.section}>
            <Eyebrow n={4} label="Sign-in" />
            <h2 className={sec.h2}>
              <span className="sr-only">4. </span>
              <em>Authentication</em>
            </h2>
            <div className={`${sec.flow} ${sec.measure}`}>
              <p className={sec.lead}>
                Account creation and authenticated sessions live in the mobile
                app, available on the App Store. The marketing site exposes only
                non{NBH}authenticated forms — the newsletter and contact endpoints.
              </p>
              <p>
                Each form writes to its own purpose{NBH}specific table, and form
                submissions are never commingled with health data.
              </p>
            </div>
          </section>

          {/* 5. Data retention & deletion */}
          <section id="data-retention-and-deletion" className={sec.section}>
            <Eyebrow n={5} label="Your controls" />
            <h2 className={sec.h2}>
              <span className="sr-only">5. </span>Data retention &amp;{" "}
              <em>deletion</em>
            </h2>
            <div className={sec.split}>
              <div>
                <p className={sec.lead}>
                  You can delete any personal data we hold about you at any time.
                  There is no cost, no justification required, and no retention
                  carve{NBH}out for marketing purposes.
                </p>
                <ul className={sec.list}>
                  <li>
                    <strong>In the app:</strong>{" "}
                    {"Settings › Delete my account"} permanently deletes your
                    account and all its data.{" "}
                    {"Settings › Export my data"} gives you a complete copy
                    first, in a machine{NBH}readable format (JSON).
                  </li>
                  <li>
                    <strong>Website sign-ups</strong> (newsletter, contact
                    form): send a deletion request through our{" "}
                    <a
                      href="/contact#subject=Data%20deletion%20request&type=general"
                      className={legal.link}
                    >
                      contact form
                    </a>{" "}
                    with type <strong>General</strong>. Deletion from production
                    systems is completed within 30 days of your request.
                  </li>
                  <li>
                    Residual copies in encrypted backups are erased as those
                    backups expire.
                  </li>
                  <li>
                    Consent records are kept for the life of your account and 3
                    years after its deletion, to prove what you agreed to.
                  </li>
                </ul>
              </div>

              <div aria-hidden className={sec.controls}>
                <p className={sec.controlsHead}>
                  <span>In the app</span>
                  <span>Your controls</span>
                </p>
                <div className={sec.control}>
                  <span>
                    <span className={sec.controlTitle}>Settings › Export my data</span>
                    <span className={sec.controlSub}>
                      A complete copy, in a machine{NBH}readable format (JSON)
                    </span>
                  </span>
                  <span className={sec.controlChevron}>›</span>
                </div>
                <div className={sec.control}>
                  <span>
                    <span className={sec.controlTitle}>Settings › Delete my account</span>
                    <span className={sec.controlSub}>
                      Your account and all its data, permanently
                    </span>
                  </span>
                  <span className={sec.controlChevron}>›</span>
                </div>
                <div className={sec.control}>
                  <span>
                    <span className={sec.controlTitle}>Your consents</span>
                    <span className={sec.controlSub}>
                      Given feature by feature, withdrawable at any time
                    </span>
                  </span>
                  <span className={sec.controlChevron}>›</span>
                </div>
              </div>
            </div>

            <div aria-hidden className={sec.keep}>
              <p className={sec.keepHead}>
                <span>How long it is kept</span>
                <span>Not to scale</span>
              </p>
              <div className={sec.keepScale}>
                <span />
                <span className={sec.keepTicks}>
                  <span style={{ left: "0%" }}>0</span>
                  <span style={{ left: "28%" }}>30 days</span>
                  <span style={{ left: "72%" }}>account</span>
                  <span style={{ left: "100%" }}>+ 3 years</span>
                </span>
                <span />
              </div>
              {KEEP.map((k) => (
                <div key={k.what} className={sec.keepRow}>
                  <span>
                    <span className={sec.keepWhat}>{k.what}</span>
                    <span className={sec.keepWhere}>{k.where}</span>
                  </span>
                  <span className={sec.keepBar}>
                    <span className={sec.keepFill} style={{ width: k.at }} />
                    <span className={sec.keepDot} style={{ left: k.at }} />
                  </span>
                  <span className={sec.keepFor}>{k.keep}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Third-party services */}
          <section id="third-party-services" className={sec.section}>
            <Eyebrow n={6} label="Who sees what" />
            <h2 className={sec.h2}>
              <span className="sr-only">6. </span>Third-party <em>services</em>
            </h2>
            <p className={sec.lead}>
              Every provider that processes data for Merios is listed below,
              with what it receives. We never sell your data, and we never use
              health data for advertising or marketing. The full detail is in
              our{" "}
              <a href="/privacy" className={legal.link}>
                Privacy Policy
              </a>
              .
            </p>
            <ProviderList providers={PROVIDERS} />
          </section>

          {/* 7 + 8. Incidents: the 72 h card and the ink disclosure block */}
          <div className={sec.pair}>
            {/* 7. Breach notification */}
            <section id="breach-notification" className={sec.breach}>
              <Eyebrow n={7} label="Incidents" />
              <h2 className={sec.h2Card}>
                <span className="sr-only">7. </span>Breach <em>notification</em>
              </h2>
              <p aria-hidden className={sec.bigFigure}>
                72<span> h</span>
              </p>
              <div className={sec.flow}>
                <p>
                  If we become aware of a personal{NBH}data breach that is likely to
                  result in a risk to your rights and freedoms, we will notify
                  the supervisory authority within <strong>72{"\u00a0"}hours</strong>{" "}
                  <span className={sec.nowrap}>(GDPR Art. 33)</span>, and
                  affected users without undue delay when the breach is likely
                  to put them at high risk{" "}
                  <span className={sec.nowrap}>(Art. 34)</span>.
                </p>
                <p>
                  Notifications will describe the nature of the breach, the
                  categories of data involved, the likely consequences, and the
                  remediation steps we have taken. Notifications are sent to the
                  email address on file and, where appropriate, surfaced in{NBH}app.
                </p>
              </div>
            </section>

            {/* 8. Responsible disclosure — the page's one ink block. Each
                timing is stated once: our two response times on the tiles
                (read out, not hidden from assistive tech), the 90 days in the
                researcher's rules. */}
            <section
              id="responsible-disclosure"
              className={`night ${sec.disclosure}`}
              data-nav="dark"
            >
              <Eyebrow n={8} label="Security research" />
              <h2 className={sec.h2Card}>
                <span className="sr-only">8. </span>Responsible{" "}
                <em>disclosure</em>
              </h2>
              <div className={sec.flow}>
                <p>
                  We welcome security research. If you believe you have found a
                  vulnerability in any Merios property, please report it to{" "}
                  <a href="mailto:security@merios.life" className={legal.link}>
                    security@merios.life
                  </a>{" "}
                  with as much detail as possible — affected endpoint, reproduction
                  steps, and impact.
                </p>
                <ol className={sec.tiles}>
                  <li>
                    <span className={sec.tileNum}>3</span>{" "}
                    <span className={sec.tileText}>
                      business days to acknowledge receipt
                    </span>
                  </li>
                  <li>
                    <span className={sec.tileNum}>10</span>{" "}
                    <span className={sec.tileText}>
                      business days to a status update
                    </span>
                  </li>
                </ol>
                <p>
                  We will not pursue legal action against researchers acting in
                  good faith under standard responsible{NBH}disclosure practices, which
                  means:
                </p>
                <ul className={sec.list}>
                  <li>
                    Do not access, modify, or delete data beyond what is strictly
                    necessary to demonstrate the issue.
                  </li>
                  <li>
                    Do not exfiltrate data beyond a minimal proof{NBH}of{NBH}concept
                    sufficient to show impact.
                  </li>
                  <li>
                    Give us a reasonable period — typically 90 days — to
                    investigate and remediate before any public disclosure.
                  </li>
                  <li>
                    Do not run denial{NBH}of{NBH}service, social{NBH}engineering, or physical
                    attacks against our staff or infrastructure.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* 9. Compliance */}
          <section id="compliance" className={sec.section}>
            <Eyebrow n={9} label="GDPR and HIPAA" />
            <h2 className={sec.h2}>
              <span className="sr-only">9. </span>
              <em>Compliance</em>
            </h2>
            <div className={sec.cards}>
              <div className={sec.glassCard}>
                <p aria-hidden className={sec.cardLabel}>
                  GDPR · Article{" "}
                  <span className={sec.citation}>9(2)(a)</span>
                </p>
                <p>
                  <strong>GDPR.</strong> Where the GDPR applies, Merios relies on
                  your explicit consent{" "}
                  <span className={sec.nowrap}>(Article 9(2)(a))</span> for
                  health data, Apple Health data and each AI feature — given in
                  the app, feature by feature, and withdrawable at any time — and
                  on contract performance for your account and subscription. The
                  data controller is Merios Health LLC. See the{" "}
                  <a href="/privacy" className={legal.link}>
                    Privacy Policy
                  </a>{" "}
                  for full detail, including your rights of access, rectification,
                  erasure, portability, and objection.
                </p>
              </div>
              <div className={sec.glassCard}>
                <p aria-hidden className={sec.cardLabel}>
                  HIPAA · Not currently a covered entity
                </p>
                <p>
                  <strong>HIPAA.</strong> Merios is not currently a HIPAA covered
                  entity. We are progressively aligning our operations with
                  HIPAA{NBH}style controls — encryption at rest and in transit,
                  role{NBH}based access controls, audit logging, and the minimum
                  necessary access principle — so that covered{NBH}entity partnerships
                  are possible as the app matures.
                </p>
              </div>
            </div>
            <p className={sec.after}>
              For data protection questions, deletion requests or compliance
              inquiries, write to{" "}
              <a href="mailto:privacy@merios.life" className={legal.link}>
                privacy@merios.life
              </a>
              .
            </p>
          </section>
        </div>
      </LegalPageLayout>
      <Footer />
    </>
  );
}
