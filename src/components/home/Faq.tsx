import { FAQPageSchema } from "@/components/StructuredData";
import { Arrow } from "./icons";
import { keepHyphens } from "./text";

/*
 * The home FAQ (20/11/2026, SEO/GEO plan) and its FAQPage JSON-LD. Plain,
 * quotable answers, all visible on the page. Facts match the product and the
 * privacy policy; prices live on /pricing only, so this block never goes stale.
 */

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Merios?",
    a: "Merios is a preventive health platform for iPhone. It reads your blood test reports and your Apple Health data together, explains each of 160+ biomarkers in plain English against your lab's own range, and tracks how they change over time next to your sleep, heart rate and activity.",
  },
  {
    q: "Can Merios read the blood test results I already have?",
    a: "Yes. With Merios Plus you scan a PDF or a photo of a report from any lab. Merios extracts each marker with its unit and reference range, you confirm the values, and they join your timeline. Merios does not keep the scanned file; the AI service that reads it (OpenAI) may keep the request for up to 30 days for abuse monitoring, never for training.",
  },
  {
    q: "Does Merios work with Apple Watch?",
    a: "Yes, through Apple Health, where your Apple Watch stores sleep, heart rate, heart rate variability and activity. Merios reads that data, read-only, and shows it next to your blood work so you can see what moved together.",
  },
  {
    q: "Is Merios a medical device?",
    a: "No. Merios is a preventive health platform. It helps you read and follow your own data; it does not diagnose, treat or replace your clinician. A result that worries you is one to discuss with your doctor.",
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

export default function Faq() {
  return (
    <>
      <FAQPageSchema questions={FAQ} />
      <section id="faq" className="hv2-sec hv2-faq" aria-labelledby="homefaq-title">
        <div className="hv2-wrap hv2-faq__grid">
          <div className="hv2-faq__intro">
            <p className="hv2-eyebrow">10 · Questions</p>
            <h2 className="hv2-h2" id="homefaq-title">
              Questions, <em>answered.</em>
            </h2>
            <p className="hv2-lead">The short version. Everything else is in the FAQ.</p>
            <a className="hv2-textlink hv2-faq__all" href="/faq">
              Read the full FAQ <Arrow width={16} />
            </a>
          </div>
          <div className="hv2-faq__list">
            {FAQ.map((item) => (
              <div key={item.q} className="hv2-qa">
                <h3>{item.q}</h3>
                <p>{keepHyphens(item.a)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
