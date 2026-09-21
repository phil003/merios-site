import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import TSATCalculator from "@/components/calculators/TSATCalculator";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const TITLE = "TSAT Calculator (Transferrin Saturation)";
const DESCRIPTION =
  "Free TSAT calculator. Transferrin saturation is serum iron divided by TIBC, times 100. Enter serum iron with TIBC, UIBC or transferrin — whichever your lab printed — and get your percentage.";

const FAQ_ITEMS = [
  { q: "What is the TSAT formula?", a: "Transferrin saturation equals serum iron divided by total iron-binding capacity, multiplied by 100, with both values in micrograms per deciliter. A serum iron of 90 with a TIBC of 320 gives 90 divided by 320, or 28.1 percent. If your panel reports UIBC instead of TIBC, add UIBC to serum iron to get TIBC first. If it reports transferrin in grams per litre, multiply by 125 to get TIBC in micrograms per deciliter." },
  { q: "Is transferrin saturation the same as iron saturation?", a: "Yes. Iron saturation, transferrin saturation, TSAT and the line printed simply as sat percent all name the same calculated value: the share of your transferrin carrying capacity that currently holds iron. Laboratories use the terms interchangeably, which is why two reports can look like they measured different things. It is not the same as ferritin, which measures stored iron rather than iron in transit." },
  { q: "Is a transferrin saturation of 28 percent normal?", a: "Yes. A TSAT of 28 percent sits inside the band most laboratories report as normal, which runs roughly 20 to 50 percent, and inside the tighter 25 to 35 percent zone where iron supply is comfortable rather than merely acceptable. If you feel unwell with a value there, the answer is more likely in ferritin, CRP or somewhere outside the iron panel." },
  { q: "What is a low transferrin saturation?", a: "Below 20 percent is the classic iron-deficiency pattern, and it can appear before hemoglobin falls. Below 10 percent is markedly low. Because TSAT is calculated from serum iron, which swings through the day and after an iron-containing meal, a low value is usually confirmed on a fasting morning draw rather than acted on from a single reading." },
  { q: "Why is my ferritin normal but my transferrin saturation low?", a: "This is the single most useful thing TSAT reveals. Ferritin is an acute-phase reactant, so inflammation, infection, obesity and liver disease all raise it — which can make ferritin look reassuring while iron stores are genuinely depleted. TSAT is far less affected by inflammation, so a low TSAT alongside a normal ferritin often means the ferritin is masking a real deficiency." },
  { q: "What is the difference between TIBC and UIBC?", a: "TIBC is the total capacity of transferrin to carry iron. UIBC is the portion of that capacity not currently occupied. They are related simply: TIBC equals serum iron plus UIBC. Labs report one or the other depending on their assay, which is why this calculator accepts both." },
  { q: "Does Merios store these numbers?", a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server." }
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/transferrin-saturation-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/transferrin-saturation-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/transferrin-saturation-calculator#tool",
    name: TITLE,
    alternateName: "Transferrin Saturation (TSAT) Calculator",
    url: "https://merios.life/tools/transferrin-saturation-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: "StatPearls. Iron-Binding Capacity. NCBI Bookshelf NBK559119.",
    inLanguage: "en",
  };
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: TITLE, url: "https://merios.life/tools/transferrin-saturation-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Transferrin saturation — iron in transit"
        title="TSAT calculator"
        subline="Serum iron divided by TIBC, times 100. Enter what your panel actually printed — TIBC, UIBC or transferrin — and get your saturation. Ferritin can look fine while this number does not."
        align="left"
      />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <TSATCalculator />
          <section className="mt-14 max-w-[720px]" style={{ fontFamily: "var(--font-sans)" }}>
            <h2 style={h2Style}>The TSAT formula</h2>
            <p style={pStyle}>
              Transferrin saturation is not measured directly. It is a ratio, calculated from two numbers your lab
              already printed:
            </p>
            <p style={formulaStyle}>TSAT (%) = serum iron ÷ TIBC × 100</p>
            <p style={pStyle}>
              Both values are in micrograms per deciliter on a US panel. A serum iron of 90 with a TIBC of 320 gives
              90 ÷ 320 = 0.281, so a saturation of 28.1 percent. That is the whole calculation — the difficulty is
              almost never the arithmetic, it is that your report may not contain a line called TIBC at all.
            </p>

            <h2 style={h2Style}>When your lab prints UIBC or transferrin instead</h2>
            <p style={pStyle}>
              Three assays are in common use, and most calculators only handle the first one. All three get you to
              the same place:
            </p>
            <p style={pStyle}>
              <strong>TIBC</strong> — use it directly. <strong>UIBC</strong>, the unsaturated portion, adds to serum
              iron to give TIBC: 90 + 230 = 320. <strong>Transferrin</strong> in grams per litre converts with a
              factor of 125, because one milligram per deciliter of transferrin binds about 1.25 micrograms per
              deciliter of iron and one gram per litre is 100 milligrams per deciliter: 2.56 × 125 = 320.
            </p>
            <p style={pStyle}>
              A factor of about 25 also circulates for the transferrin path, and it is correct in its own context:
              it gives TIBC in micromoles per litre, for use with a serum iron also reported in micromoles per litre.
              Applied to a US panel, where serum iron is in micrograms per deciliter, it produces saturations far
              above 100 percent — physiologically impossible, and a common way to frighten yourself over nothing. The
              toggle above picks the right path so the question does not arise.
            </p>

            <h2 style={h2Style}>Reading the percentage you get</h2>
            <p style={pStyle}>
              Most US laboratories print a normal range of roughly 20 to 50 percent. The tighter 25 to 35 percent
              band shown with your result is the zone where iron supply is comfortable rather than merely inside the
              lab range — the distinction between a normal result and a good one, which is the distinction most panels
              never make.
            </p>

            <div style={tableWrapStyle}>
              <table style={tableStyle}>
                <caption style={captionStyle}>
                  Transferrin saturation bands commonly used in adults. Reference intervals differ between
                  laboratories and assays — compare against the range printed on your own report.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" style={thStyle}>TSAT</th>
                    <th scope="col" style={thStyle}>How it is usually read</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>Under 20%</th>
                    <td style={tdStyle}>The classic iron-deficiency pattern. Can appear before hemoglobin falls, so it often precedes anemia.</td>
                  </tr>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>20–25%</th>
                    <td style={tdStyle}>Inside most flagged intervals but below the typical middle. Not diagnostic alone; read with ferritin and symptoms.</td>
                  </tr>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>25–35%</th>
                    <td style={tdStyle}>Where most adults sit. Iron supply and carrying capacity are broadly matched.</td>
                  </tr>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>35–45%</th>
                    <td style={tdStyle}>Still within many reported ranges. A recent iron supplement or a non-fasting draw can put a normal person here.</td>
                  </tr>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>45% and above</th>
                    <td style={tdStyle}>The usual threshold for investigating iron overload, including hereditary hemochromatosis, when it persists on a repeat fasting sample.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={pStyle}>
              The width of that lab interval is the point. A report that flags nothing between 20 and 50 percent
              prints a result of 21 percent and a result of 45 percent without comment, despite the two pointing in
              opposite directions. Where you sit inside the interval, and which way it moves between panels, carries
              more information than whether a flag appeared.
            </p>
            <p style={pStyle}>
              Below 20 percent is the classic deficiency pattern and can appear before hemoglobin falls. Above 45
              percent, repeated on a fasting sample, is the usual trigger to investigate iron overload including
              hereditary hemochromatosis. Two things move the number without your iron having changed: a
              non-fasting draw or a recent iron supplement pushes it up, and anything that shifts transferrin —
              pregnancy, oral contraceptives, liver disease — moves the ratio from the denominator. A fasting morning
              draw is the one worth comparing over time.
            </p>

            <h2 style={h2Style}>Why TSAT catches what ferritin misses</h2>
            <p style={pStyle}>
              Ferritin is the marker most people know, and it is a good one — but it has a well-documented blind spot.
              Ferritin is an acute-phase reactant, meaning it rises with inflammation, infection, obesity and liver
              disease regardless of how much iron you actually have. That is how someone can be told their{" "}
              <Link href="/blog/ferritin-30-low-normal" style={linkStyle}>ferritin is normal</Link> while being
              genuinely iron deficient. Transferrin saturation is not distorted the same way, so a low TSAT alongside
              a normal-looking ferritin is one of the most informative patterns on a panel — the case covered in{" "}
              <Link href="/blog/ferritin-vs-iron-saturation" style={linkStyle}>ferritin versus iron saturation</Link>.
            </p>

            <h2 style={h2Style}>Reading it alongside the rest of your panel</h2>
            <p style={pStyle}>
              TSAT is rarely interpreted alone. Low TSAT with{" "}
              <Link href="/blog/low-ferritin-normal-hemoglobin" style={linkStyle}>normal hemoglobin</Link> suggests
              depletion that has not yet become anemia. Low TSAT with a low{" "}
              <Link href="/blog/mcv-mch-blood-test-meaning" style={linkStyle}>MCV and MCH</Link> points toward
              established iron-deficiency anemia. If you have been supplementing without improvement, the reasons are
              covered in{" "}
              <Link href="/blog/iron-supplements-not-working" style={linkStyle}>why iron supplements stop working</Link>.
            </p>
            <p style={pStyle}>
              One saturation is a snapshot of a value that moves. The pattern worth having is the same fasting draw
              tracked across several panels, with ferritin beside it — which is what{" "}
              <Link href="/early-access" style={linkStyle}>Merios</Link> is built to do from the reports you already
              have.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.4vw, 2rem)", fontWeight: 300,
  letterSpacing: "-0.02em", color: "var(--color-ink)", marginBottom: "0.75rem", marginTop: "3rem",
};
const pStyle: React.CSSProperties = {
  fontSize: 16, lineHeight: 1.7, color: "var(--color-ink-secondary)", marginBottom: "1.1rem",
};
const formulaStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: 15, lineHeight: 1.6, color: "var(--color-ink)",
  marginBottom: "1.1rem", padding: "0.85rem 1rem", borderRadius: 10,
  background: "color-mix(in srgb, var(--color-pulse) 10%, var(--color-canvas))",
  border: "1px solid color-mix(in srgb, var(--color-pulse) 26%, transparent)",
};
const linkStyle: React.CSSProperties = { color: "var(--color-green-deep)", textUnderlineOffset: "3px" };
const tableWrapStyle: React.CSSProperties = { overflowX: "auto", marginBottom: "1.4rem" };
const tableStyle: React.CSSProperties = {
  width: "100%", borderCollapse: "collapse", fontSize: 15, lineHeight: 1.55,
};
const captionStyle: React.CSSProperties = {
  captionSide: "bottom", textAlign: "left", fontSize: "0.8125rem",
  color: "var(--color-ink-tertiary)", paddingTop: "0.6rem", lineHeight: 1.5,
};
const thStyle: React.CSSProperties = {
  textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.18em",
  textTransform: "uppercase", color: "var(--color-ink-tertiary)", fontWeight: 500,
  padding: "0.5rem 0.75rem 0.5rem 0", borderBottom: "1px solid var(--color-grid)",
};
const tdKeyStyle: React.CSSProperties = {
  textAlign: "left", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-ink)",
  fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top",
  padding: "0.7rem 1rem 0.7rem 0", borderBottom: "1px solid var(--color-grid)",
};
const tdStyle: React.CSSProperties = {
  fontSize: 15, lineHeight: 1.55, color: "var(--color-ink-secondary)", verticalAlign: "top",
  padding: "0.7rem 0", borderBottom: "1px solid var(--color-grid)",
};
