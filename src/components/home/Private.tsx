import Image from "next/image";
import { Arrow } from "./icons";

/* Privacy (Home2 "06"): four facts from the privacy policy, next to the
   hands-and-mug photo. */

const FACTS: [string, string][] = [
  ["Never sold", "Your data is never sold, and your health data is never used for advertising."],
  ["Hosted in Europe", "Stored in Ireland, encrypted in transit and at rest."],
  ["Scans not kept", "A scanned photo or PDF is read, then discarded. Only the values you confirm are saved."],
  ["Yours to delete", "Export or erase everything from inside the app, in a few taps."],
];

export default function Private() {
  return (
    <section id="private" className="hv2-sec hv2-private" aria-labelledby="private-title">
      <div className="hv2-wrap hv2-private__grid">
        <div className="hv2-private__copy">
          <p className="hv2-eyebrow">07 · Privacy</p>
          <h2 className="hv2-h2" id="private-title">
            Your data stays <em>yours.</em>
          </h2>
          <p className="hv2-lead">
            Merios is a preventive health platform, not a medical device. It
            reads your data to explain it, and for nothing else.
          </p>
          <ul className="hv2-private__facts">
            {FACTS.map(([label, body]) => (
              <li key={label}>
                <h3>{label}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
          <p className="hv2-private__links">
            <a className="hv2-textlink" href="/privacy">
              Read the privacy policy <Arrow width={16} />
            </a>
            <a className="hv2-textlink" href="/security">
              See where your data goes, and who sees what <Arrow width={16} />
            </a>
          </p>
        </div>
        <div className="hv2-private__photo" data-rv="">
          <Image
            src="/images/v2/home/hands_mug.jpg"
            alt="Hands holding a warm mug of tea on a wooden railing above a misty lake at sunrise."
            width={1200}
            height={1489}
            sizes="(max-width: 920px) 92vw, 520px"
          />
        </div>
      </div>
    </section>
  );
}
