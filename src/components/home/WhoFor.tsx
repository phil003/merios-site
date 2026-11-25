/*
 * "Who Merios is for" (20/11/2026, SEO/GEO plan), in Open Sky glass cards.
 * Plain, quotable sentences: AI answer engines can only cite what a page
 * states outright. Facts match the product and the privacy policy; prices
 * live on /pricing only, so this block never goes stale.
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

export default function WhoFor() {
  return (
    <section id="who" className="hv2-sec hv2-who" aria-labelledby="whofor-title">
      <div className="hv2-wrap hv2-who__grid">
        <div className="hv2-who__intro">
          <p className="hv2-eyebrow">06 · Who it&rsquo;s for</p>
          <h2 className="hv2-h2" id="whofor-title">
            Who Merios <em>is for.</em>
          </h2>
          <p className="hv2-lead">
            Merios is a preventive health platform for iPhone. It reads your
            blood work and your Apple Health data together, and shows how they
            move over time.
          </p>
          <p className="hv2-who__body">
            It is not a lab and does not order tests. It is a wellness tool, not
            a medical device.
          </p>
        </div>
        <ul className="hv2-who__cards" data-rv="">
          {FOR.map(([label, body]) => (
            <li key={label}>
              <h3>{label}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
