import CountUp from "./CountUp";

/* Key figures under the hero (Home2). Each one restates a fact the page makes
   below: 160+ biomarkers, most reports read in under a minute, 365 days of
   Apple Health, data never sold. */

export default function Numbers() {
  return (
    <section className="hv2-numbers" aria-label="Merios in numbers">
      <div className="hv2-wrap">
        <ul className="hv2-numbers__grid">
          <li>
            <p className="hv2-num">
              <span>
                <CountUp to={160} />+
              </span>
            </p>
            <p className="hv2-num__label">blood markers, each one placed in its range and explained</p>
          </li>
          <li>
            <p className="hv2-num">
              <span>&lt;1</span>
              <small>min</small>
            </p>
            <p className="hv2-num__label">for most reports, from photo to plain English</p>
          </li>
          <li>
            <p className="hv2-num">
              <CountUp to={365} />
            </p>
            <p className="hv2-num__label">days of Apple Health, read on your first day</p>
          </li>
          <li>
            <p className="hv2-num">0</p>
            <p className="hv2-num__label">bytes of your data sold. Ever.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
