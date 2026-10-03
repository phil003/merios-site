import Reveal from "@/components/ui/Reveal";
import styles from "@/components/blog-article/article.module.css";

/**
 * Substack newsletter capture (Baseline — merioslife.substack.com).
 *
 * Levier 7 of the Substack launch plan: a safety net for blog/SEO readers who
 * aren't ready to install the app yet. They subscribe here, then convert to the
 * app later via the newsletter's own CTAs (welcome email, footer, deep-dive CTAs).
 *
 * Uses the official Substack embed iframe so emails land directly in Substack —
 * no backend, works with the static export. The surrounding card is a lilac
 * pop "sticker" in the site v3 art direction; the iframe itself carries
 * Substack's default form.
 *
 * Drop it into an article once (see /blog/[slug]/page.tsx). Keep ArticleCTA (the
 * "get the app" banner) separate — that's the primary conversion path; this is
 * the newsletter fallback.
 */
export default function SubstackSubscribe() {
  return (
    <section className={styles.subscribe}>
      {/* the logo's heartbeat, as a small ornament */}
      <svg
        className={styles.subscribePulse}
        viewBox="0 0 160 28"
        aria-hidden
        focusable="false"
      >
        <path
          d="M0 14 H62 L67 19 L73 3 L81 26 L86 14 H148"
          fill="none"
          stroke="#10231A"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="148" cy="14" r="3.6" fill="#10231A" />
      </svg>

      <Reveal>
        <div className={`label ${styles.subscribeLabel}`}>
          <span aria-hidden className={styles.inkDot} />
          <span>Baseline · The Newsletter</span>
        </div>

        <h2 className={styles.subscribeTitle}>
          One biomarker, explained properly, every week.
        </h2>

        <p className={styles.subscribeLead}>
          Plain-English deep-dives on what your labs actually mean — functional
          ranges, trends, and the studies behind them. Free, no spam.
        </p>

        <div className={styles.subscribeFrame}>
          <iframe
            src="https://merioslife.substack.com/embed"
            title="Subscribe to Baseline"
            loading="lazy"
            width="100%"
            height="150"
            style={{
              border: "1px solid rgb(16 35 26 / 0.14)",
              borderRadius: 16,
              background: "#FFFFFF",
              maxWidth: 480,
              boxShadow: "0 18px 36px -24px rgb(16 35 26 / 0.45)",
            }}
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </Reveal>
    </section>
  );
}
