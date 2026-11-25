import { AppleGlyph, Arrow, Check } from "./icons";

/* Free and Plus (Home2 "05"): a glass card and the frame's one ink block.
   Facts as of the App Store listing (Oct 2026): the daily side is free for
   good; Merios Plus is $44/year after a 7-day free trial on the annual plan,
   with monthly and weekly plans also available. */

const FREE = [
  "Your Merios Score and three rings, every morning",
  "365 days imported from Apple Health, read only",
  "Live monitor, journal and cycle",
  "Enter a marker by hand and see it in its range",
];
const PLUS = [
  "Photo and PDF scans, every marker read and tracked report to report",
  "Biological age, recomputed with every new report",
  "Links between your blood work and your daily data",
  "Your monthly report, written from your own numbers",
];

export default function Plans() {
  return (
    <section id="plans" className="hv2-sec hv2-plans" aria-labelledby="plans-title">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">05 · Free and Plus</p>
        <div className="hv2-headrow">
          <h2 className="hv2-h2" id="plans-title">
            Start free. <em>Add Plus when your blood test lands.</em>
          </h2>
          <p className="hv2-lead">
            Your score, your rings and your year stay free for good. Plus adds
            the half your watch cannot see.
          </p>
        </div>

        <div className="hv2-plans__grid" data-rv="">
          <article className="hv2-plan hv2-plan--free">
            <h3 className="hv2-plan__name">
              Merios <span className="hv2-plan__pill">Free</span>
            </h3>
            <p className="hv2-plan__price">
              <b>$0</b>
              <span>for good</span>
            </p>
            <p className="hv2-plan__note">No card. No trial clock.</p>
            <ul>
              {FREE.map((f) => (
                <li key={f}>
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <a className="hv2-plan__cta" href="/early-access">
              <AppleGlyph size={15} />
              Download free
            </a>
          </article>

          <article className="hv2-plan hv2-plan--plus">
            <h3 className="hv2-plan__name">
              Merios Plus <span className="hv2-plan__pill">7 days free</span>
            </h3>
            <p className="hv2-plan__price">
              <b>$44</b>
              <span>a year</span>
            </p>
            <p className="hv2-plan__note">
              After a 7-day free trial on the annual plan · monthly and weekly
              plans also available
            </p>
            <ul>
              {PLUS.map((f) => (
                <li key={f}>
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <a className="hv2-plan__cta" href="/early-access">
              Start 7 days free <Arrow className="btn-arrow" width={16} />
            </a>
            <p className="hv2-plan__cancel">Cancel any time in the App Store. Cancelling deletes nothing.</p>
          </article>
        </div>
        <p className="hv2-plans__fine">Prices in US dollars. The App Store shows the price for your country.</p>
      </div>
    </section>
  );
}
