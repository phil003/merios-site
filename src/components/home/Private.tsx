import { Arrow } from "./icons";

/* Four facts from the privacy policy (v2.0.0). */

const FACTS: [string, string][] = [
  ["Never sold", "Your data is never sold, and your health data is never used for advertising."],
  ["Hosted in Europe", "Stored in Ireland, encrypted in transit and at rest."],
  ["Scans not kept", "A scanned photo or PDF is read, then discarded. Only the values you confirm are saved."],
  ["Yours to delete", "Export or erase everything from inside the app, in a few taps."],
];

export default function Private() {
  return (
    <section className="hv3-private" data-stage="fog" aria-labelledby="private-title">
      <div className="hv3-wrap">
        <div className="hv3-private__box" data-rv="">
          <div className="hv3-private__intro">
            <h2 id="private-title">Your data stays yours.</h2>
            <p>
              Merios is a wellness app, not a medical device. It reads your data
              to explain it, and for nothing else.
            </p>
            <a className="hv3-private__link" href="/privacy">
              Read the privacy policy <Arrow width={16} />
            </a>
          </div>
          <div className="hv3-facts4">
            {FACTS.map(([label, body]) => (
              <div key={label} className="hv3-fact4">
                <span className="label">{label}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
