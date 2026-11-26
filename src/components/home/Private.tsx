import Image from "next/image";
import { Arrow } from "./icons";

/* Privacy (Home2 "08"): four facts from the privacy policy and /security,
   next to the hands-and-mug photo. The one place on the page, with the
   footer, that says Merios is not a medical device. */

const FACTS: [string, string][] = [
  ["Never sold", "Your data is never sold, and your health data is never used for advertising."],
  ["Hosted in Europe", "Stored in Ireland, encrypted in transit and at rest."],
  [
    "Values, not scans",
    "Merios saves only the values you confirm, never the photo or PDF. The AI service that reads a scan (OpenAI) may keep the request up to 30 days for abuse monitoring, never for training.",
  ],
  ["Yours to delete", "Export or erase everything from inside the app, in a few taps."],
];

export default function Private() {
  return (
    <section id="private" className="hv2-sec hv2-private" aria-labelledby="private-title">
      <div className="hv2-wrap hv2-private__grid">
        <div className="hv2-private__copy">
          <p className="hv2-eyebrow">08 · Privacy</p>
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
            <a className="hv2-textlink hv2-textlink--flow" href="/privacy">
              Read the privacy{" "}
              <span className="hv2-nowrap">
                policy <Arrow width={16} />
              </span>
            </a>
            <a className="hv2-textlink hv2-textlink--flow" href="/security">
              See where your data goes, and who sees{" "}
              <span className="hv2-nowrap">
                what <Arrow width={16} />
              </span>
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
