import { FAQPageSchema } from "@/components/StructuredData";

/*
 * "Who Merios is for" + a short FAQ (20/11/2026, SEO/GEO plan).
 * Plain, quotable sentences: AI answer engines can only cite what a page
 * states outright. Facts below match the product and the privacy policy;
 * prices live on /pricing only, so this block never goes stale.
 */

const FOR: [string, string][] = [
  [
    "You already have lab results",
    "PDFs from Quest, Labcorp, your doctor or a longevity panel. Merios reads every line against your lab's own range and keeps every report on one timeline.",
  ],
  [
    "You wear an Apple Watch",
    "Sleep, heart rate, heart rate variability and activity, already counted on your iPhone, read next to your blood work.",
  ],
  [
    "You want the trend, not one result",
    "Each of 160+ biomarkers is followed from report to report, so you see where a marker is heading, not just where it stands today.",
  ],
  [
    "You don't want another membership",
    "No new blood draw and no testing plan to buy. The daily view is free; Merios Plus adds report scanning, blood trends and biological age.",
  ],
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Merios?",
    a: "Merios is a preventive health platform for iPhone. It reads your blood test reports and your Apple Health data together, explains each of 160+ biomarkers in plain English against your lab's own range, and tracks how they change over time next to your sleep, heart rate and activity.",
  },
  {
    q: "Can Merios read the blood test results I already have?",
    a: "Yes. With Merios Plus you scan a PDF or a photo of a report from any lab. Merios extracts each marker with its unit and reference range, you confirm the values, and they join your timeline. The scanned file is read, then discarded.",
  },
  {
    q: "Does Merios work with Apple Watch?",
    a: "Yes, through Apple Health, where your Apple Watch stores sleep, heart rate, heart rate variability and activity. Merios reads that data, read-only, and shows it next to your blood work so you can see what moved together.",
  },
  {
    q: "Is Merios a medical device?",
    a: "No. Merios is a wellness product. It helps you read and follow your own data; it does not diagnose, treat or replace your clinician. A result that worries you is one to discuss with your doctor.",
  },
  {
    q: "Where is my health data stored?",
    a: "In Ireland, encrypted in transit and at rest. Merios never sells your data and never uses health data for advertising, and you can export or delete everything from inside the app.",
  },
  {
    q: "How much does Merios cost?",
    a: "The daily view is free for good. Merios Plus, which adds blood report scanning, blood trends, biological age and a monthly report, is a subscription with a free trial; current prices are on the pricing page.",
  },
];

export default function WhoFor() {
  return (
    <>
      <FAQPageSchema questions={FAQ} />
      <section className="hv3-private hv3-whofor" data-stage="fog" aria-labelledby="whofor-title">
        <div className="hv3-wrap">
          <div className="hv3-private__box" data-rv="">
            <div className="hv3-private__intro">
              <h2 id="whofor-title">Who Merios is for.</h2>
              <p>
                Merios is a preventive health platform for iPhone. It reads your
                blood work and your Apple Health data together, and shows how
                they move over time.
              </p>
              <p>
                It is not a lab and does not order tests. It is a wellness tool,
                not a medical device.
              </p>
            </div>
            <div className="hv3-facts4">
              {FOR.map(([label, body]) => (
                <div key={label} className="hv3-fact4">
                  <span className="label">{label}</span>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="hv3-private hv3-faq" data-stage="fog" aria-labelledby="homefaq-title">
        <div className="hv3-wrap">
          <div className="hv3-private__box" data-rv="">
            <div className="hv3-private__intro">
              <h2 id="homefaq-title">Questions, answered.</h2>
              <p>The short version. Everything else is in the FAQ.</p>
              <a className="hv3-private__link" href="/faq">
                Read the full FAQ
              </a>
            </div>
            <div className="hv3-facts4">
              {FAQ.map((item) => (
                <div key={item.q} className="hv3-fact4">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
