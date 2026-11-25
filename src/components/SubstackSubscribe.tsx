import Reveal from "@/components/ui/Reveal";
import styles from "./SubstackSubscribe.module.css";

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
 * Drop it into an article once (see /blog/[slug]/page.tsx). Keep ArticleCTA (the
 * "get the app" banner) separate — that's the primary conversion path; this is
 * the newsletter fallback.
 */
export default function SubstackSubscribe() {
  return (
    <section className={styles.card}>
      {/* the logo's heartbeat, as a small ornament */}
      <svg
        className={styles.pulse}
        viewBox="0 0 160 28"
        aria-hidden
        focusable="false"
      >
        <path
          d="M0 14 H62 L67 19 L73 3 L81 26 L86 14 H148"
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
          <iframe
            src="https://merioslife.substack.com/embed"
            title="Subscribe to Baseline"
            loading="lazy"
            width="100%"
            height="150"
            style={{
              border: "1.5px solid rgb(24 33 63 / 0.12)",
              borderRadius: 16,
              background: "#FFFFFF",
              maxWidth: 480,
              boxShadow: "0 18px 36px -24px rgb(36 48 110 / 0.45)",
            }}
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </Reveal>
    </section>
  );
}
