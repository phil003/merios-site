import Image from "next/image";
import { AppleGlyph } from "./icons";

/* Final (Home2 "get"): the meadow at sunrise, the App Store (174 countries and
   regions since 25/11/2026, so no waitlist), and a QR code for desktop
   visitors. Under 960px the copy sits above the photo, clear of her face. */

const APP_STORE_URL = "https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-home&mt=8";

export default function Finale() {
  return (
    <section id="get" className="hv2-sec hv2-get" aria-labelledby="finale-title">
      <div className="hv2-wrap hv2-get__card">
        <div className="hv2-get__media">
          <Image
            src="/images/v2/home/meadow.jpg"
            alt="A woman walks through a meadow of tall grass at sunrise, her hand brushing the tops of the grass."
            fill
            sizes="(max-width: 1440px) 100vw, 1312px"
            className="hv2-get__img"
          />
        </div>
        <div className="hv2-get__veil" aria-hidden="true" />
        <div className="hv2-get__copy" data-rv="">
          <p className="hv2-pill">
            <span className="hv2-pill__dot" aria-hidden="true" />
            Now on the App Store
          </p>
          <h2 className="hv2-get__title" id="finale-title">
            Your health, <em>finally readable.</em>
          </h2>
          <p className="hv2-get__sub">Free on iPhone. Merios Plus when your blood test lands.</p>
          <div className="hv2-get__row">
            <a
              className="btn btn-ink hv2-btn-lg"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Merios on the App Store"
            >
              <AppleGlyph />
              Download on the App Store
            </a>
            <div className="hv2-qr">
              <Image
                src="/images/v3/qr-app-store.svg"
                alt="QR code that opens Merios on the App Store"
                width={58}
                height={58}
                unoptimized
              />
              <p>
                <b>On a computer?</b> Point your iPhone camera here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
