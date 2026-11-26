import Reveal from "@/components/ui/Reveal";
import styles from "./SubstackSubscribe.module.css";

/** Baseline, the Merios newsletter on Substack. */
const PUBLICATION_URL = "https://merioslife.substack.com";
const SUBSCRIBE_URL = `${PUBLICATION_URL}/subscribe`;

interface SubstackSubscribeProps {
  /** Extra class on the card (spacing on the host page). Optional. */
  className?: string;
}

/**
 * Substack newsletter capture (Baseline — merioslife.substack.com).
 *
 * Levier 7 of the Substack launch plan: a safety net for blog/SEO readers who
 * aren't ready to install the app yet. They subscribe here, then convert to the
 * app later via the newsletter's own CTAs (welcome email, footer, deep-dive CTAs).
 *
 * Uses the official Substack embed iframe so emails land directly in Substack —
 * no backend, works with the static export. Open Sky: the surrounding card is
 * a soft lavender plate with a glass rim (./SubstackSubscribe.module.css); the
 * iframe itself carries Substack's default form.
 *
 * Never blank: the iframe is lazy, and content blockers may hide it, so it
 * sits in a fixed-height frame over a stand-in form (a plain link to the
 * Substack sign-up page, drawn like the form; the embed's own white page
 * covers it once it loads), and a one-line "Subscribe on Substack" link
 * stays under it.
 *
 * Used under every article (/blog/[slug]) and on /early-access. Keep ArticleCTA
 * (the "get the app" banner) separate — that's the primary conversion path;
 * this is the newsletter fallback.
 */
export default function SubstackSubscribe({ className }: SubstackSubscribeProps = {}) {
  return (
    <section className={className ? `${styles.card} ${className}` : styles.card}>
      {/* a small horizon line ending on a dot (the heartbeat was retired, DA 21/11) */}
      <svg
        className={styles.pulse}
        viewBox="0 0 160 28"
        aria-hidden
        focusable="false"
      >
        <path
          d="M0 14 H148"
          fill="none"
          stroke="#18213F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="148" cy="14" r="3.6" fill="#6E8FE8" />
      </svg>

      <Reveal>
        <p className={styles.eyebrow}>Baseline · The Newsletter</p>

        <h2 className={styles.title}>
          One biomarker, explained properly, <em>every week.</em>
        </h2>

        <p className={styles.lead}>
          Plain-English deep-dives on what your labs actually mean — functional
          ranges, trends, and the studies behind them. Free, no spam.
        </p>

        <div className={styles.frame}>
          <div className={styles.embed}>
            {/* Stand-in until the embed paints (or if it never does): a link
                to the same sign-up, drawn like the form. Out of the tab
                order: the link under the frame is the keyboard path. */}
            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.standIn}
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className={styles.standInField}>Type your email…</span>
              <span className={styles.standInButton}>Subscribe</span>
            </a>
            <iframe
              src={`${PUBLICATION_URL}/embed`}
              title="Subscribe to Baseline"
              loading="lazy"
              width="100%"
              height="150"
              className={styles.iframe}
              frameBorder="0"
              scrolling="no"
            />
          </div>
        </div>

        <p className={styles.fallback}>
          Form not showing?{" "}
          <a
            href={SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fallbackLink}
          >
            Subscribe on Substack
            <span aria-hidden>↗</span>
          </a>
        </p>
      </Reveal>
    </section>
  );
}
