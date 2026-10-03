import Image from "next/image";
import { AppleGlyph } from "./icons";
import { heartbeatPath } from "./pulse";
import WaitlistForm from "./WaitlistForm";

/* Finale: the logo's heartbeat once more, the App Store, a QR code for
   desktop visitors, and the waitlist for everyone outside the US. */

const BEAT = heartbeatPath(150, 720, 470, 270, 150);
const APP_STORE_URL = "https://apps.apple.com/us/app/merios/id6760352598";

export default function Finale() {
  return (
    <section id="finale" className="hv3-finale" data-stage="night" data-nav="dark" aria-labelledby="finale-title">
      <div className="hv3-finale__vis" aria-hidden data-rv="none">
        <svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" focusable="false">
          <defs>
            <linearGradient id="hv3-finale-grad" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="300" y2="0">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <path className="hv3-finale__line" d={BEAT} pathLength={1000} />
          <path className="hv3-comet" d={BEAT} pathLength={1000} />
          <circle className="hv3-dot" r={9} cx={720} cy={270} />
        </svg>
      </div>
      <div className="hv3-wrap hv3-finale__inner">
        <div data-rv="" style={{ display: "grid", justifyItems: "start", gap: 30 }}>
          <span className="label">
            <span aria-hidden className="label-dot" />
            Now live · US App Store
          </span>
          <h2 className="display" id="finale-title">
            <span className="chrome-text">Your health, finally readable.</span>
          </h2>
          <div className="hv3-finale__row">
            <a
              className="btn btn-lime"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Merios on the App Store"
            >
              <AppleGlyph />
              Download on the App Store
            </a>
            <div className="glass hv3-qr">
              <div className="hv3-qr__code">
                <Image src="/images/v3/qr-app-store.svg" alt="" width={64} height={64} unoptimized />
              </div>
              <span>
                <b>On a computer?</b>Point your iPhone camera here.
              </span>
            </div>
          </div>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
