import type { Metadata } from "next";
import { Mark } from "@/components/ui/Logo";
import styles from "./phil.module.css";

// Philippe's digital business card. Reached from the QR on his Apple Wallet
// pass and his event cards: add the pass to Wallet, save the contact, get
// the app. A personal page, so it stays out of the index and the sitemap.

const APP_STORE =
  "https://apps.apple.com/app/apple-store/id6760352598?pt=128637372&ct=fhs26web&mt=8";
const WALLET_PASS = "/phil/philippe-tohme.pkpass";
const VCARD = "/phil/philippe-tohme.vcf";
const ONE_PAGER = "/phil/merios-founding-program.pdf";
const WHATSAPP = "https://wa.me/33637829192";
const BOOK =
  "mailto:philippe@merios.life?subject=20%20minutes%20with%20Merios";

export const metadata: Metadata = {
  title: { absolute: "Philippe Tohme · Merios" },
  description:
    "Philippe Tohme, PharmD, founder of Merios. Add his card to Apple Wallet, save his contact or get the app.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://merios.life/phil" },
};

// Open Sky: a white card on the dawn (restyle only — same text, same links).
export default function PhilPage() {
  return (
    <main className={styles.stage}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>FHS Abu Dhabi · 20-22 Oct 2026</p>

        <Mark
          className={styles.mark}
          color="#18213F"
          cut="#FFFFFF"
          title="Merios"
        />

        <h1 className={styles.name}>Philippe Tohme</h1>
        <p className={styles.role}>PharmD · Founder of Merios</p>
        <p className={styles.tagline}>
          Your blood tests and your days, <em>finally readable together.</em>
        </p>

        <div className={styles.actions}>
          <a className="btn btn-ink" href={WALLET_PASS}>
            Add my card to Apple Wallet
          </a>
          <a className="btn btn-ghost" href={VCARD}>
            Save my contact
          </a>
          <a className="btn btn-ghost" href={WHATSAPP}>
            Message me on WhatsApp
          </a>
          <a className="btn btn-ghost" href={APP_STORE}>
            Get Merios on the App Store
          </a>
          <a className="btn btn-ghost" href={BOOK}>
            Book 20 minutes
          </a>
        </div>

        <p className={styles.clinics}>
          Longevity or executive health program?{" "}
          <a href={ONE_PAGER}>The Founding Program, in one page</a>
        </p>

        <p className={styles.tip}>
          On iPhone: open my card in Wallet and hold your phones together to
          share it.
        </p>

        <p className={styles.legal}>
          General wellness app. Not intended for medical purposes.
        </p>
      </div>
    </main>
  );
}
