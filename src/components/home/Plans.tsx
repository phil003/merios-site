import { Check } from "./icons";
import { keepHyphens } from "./text";

/* Free and Plus (Home2 v24, "06"): a glass card and the frame's one ink block.
   The one place on the page that says what is free and what is Plus. Facts
   as of the App Store listing: the daily side is free for good; Merios Plus is
   $44 a year with a 3-day free trial on the annual plan, with monthly and
   weekly plans also available. Prices in US dollars. */

const FREE = [
  "Your Merios Score and three rings, every morning",
  "365 days imported from Apple Health, read only",
  "Live monitor, journal and cycle",
  "Any marker by hand, placed in its range",
];
const PLUS = [
  "Photo and PDF scans, every marker read and tracked",
  "Biological age, recomputed with every new report",
  "Links between your blood and your daily data",
  "A monthly report, written from your own numbers",
];

export default function Plans() {
  return (
    <section id="plans" className="hv2-sec hv2-plans" aria-labelledby="plans-title">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">06 · Free and Plus</p>
        <div className="hv2-headrow">
          <h2 className="hv2-h2" id="plans-title">
            Start free. <em>Add Plus when your blood test lands.</em>
          </h2>
          <p className="hv2-lead">
            Your score, your rings and your year stay free for good. Plus reads
            the half your watch cannot see.
          </p>
        </div>

        <div className="hv2-plans__grid" data-rv="">
          <article className="hv2-plan hv2-plan--free">
            <h3 className="hv2-plan__name">Merios Free</h3>
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
              Get Merios free
            </a>
          </article>

          <article className="hv2-plan hv2-plan--plus">
            <h3 className="hv2-plan__name">Merios Plus</h3>
            <p className="hv2-plan__price">
              <b>$44</b>
              <span>a year</span>
            </p>
            <p className="hv2-plan__note">
              {keepHyphens("3-day free trial on the annual plan · monthly and weekly plans too")}
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
              <span>{keepHyphens("Start the 3-day free trial")}</span>
            </a>
          </article>
        </div>
        <p className="hv2-plans__fine">
          Cancel any time in the App Store; canceling deletes nothing. Prices
          in US dollars, as on the US App Store. The App Store shows the price
          for your country.
        </p>
      </div>
    </section>
  );
}
