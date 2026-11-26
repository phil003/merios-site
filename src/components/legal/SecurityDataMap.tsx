import styles from "./security.module.css";

/** U+2011: a hyphen that never splits a term across two lines. */
const NBH = "\u2011";

/**
 * /security — "Where your data goes", the hero figure (Open Sky mockup
 * Security.dc.html). Built in HTML, not one wide SVG, so it stacks at 390px
 * instead of scrolling sideways. Every line restates a fact the page body
 * states (sections 2, 3, 5 and 6): nothing here is new. Server component;
 * the only motion is the CSS flow along the TLS line, off under reduced
 * motion.
 */
export default function SecurityDataMap() {
  return (
    <figure className={styles.map} aria-labelledby="security-map-title">
      <figcaption id="security-map-title" className={styles.mapTitle}>
        Where your data goes
      </figcaption>

      <div className={styles.mapGrid}>
        <p className={`${styles.mapLabel} ${styles.lPhone}`}>On your iPhone</p>
        <div className={styles.mapPhone}>
          <span aria-hidden className={styles.phoneNotch} />
          <p className={styles.phonePlate}>
            <strong>Apple Health</strong>{" "}
            <span>read only, with your permission</span>
          </p>
          <p className={styles.phonePlate}>
            <strong>iOS Keychain</strong>{" "}
            <span>sign-in tokens</span>
          </p>
          <p className={styles.phoneFoot}>Merios app</p>
        </div>

        <p className={`${styles.mapLabel} ${styles.lTransit}`}>In transit</p>
        <div className={styles.mapTransit}>
          <div aria-hidden className={styles.transitLine}>
            <span className={styles.transitGlow} />
            <span className={styles.transitFlow} />
            <span className={styles.transitDot} />
          </div>
          <div className={styles.transitText}>
            <p className={styles.transitTitle}>TLS 1.2 or higher</p>
            <p className={styles.transitSub}>every connection</p>
          </div>
        </div>

        <p className={`${styles.mapLabel} ${styles.lCloud}`}>In the EU · Ireland</p>
        <div className={styles.mapCloud}>
          <p className={styles.cloudName}>Supabase</p>
          <p className={styles.cloudSub}>AWS eu{NBH}west{NBH}1, Ireland</p>
          <ul className={styles.cloudPills}>
            <li>AES{NBH}256 at rest, and its backups</li>
            <li>Row{NBH}Level Security</li>
            <li>Private file storage</li>
          </ul>
        </div>

        <p className={`${styles.mapLabel} ${styles.lSide}`}>Only with your consent</p>
        <div className={`${styles.mapSide} ${styles.mapConsent}`}>
          <p className={styles.sideName}>OpenAI</p>
          <p className={styles.sideText}>
            reads scanned lab reports, writes reports and insights
          </p>
          <p className={styles.sideText}>
            may keep requests up to 30 days in its{" "}
            <span className={styles.nowrap}>abuse-monitoring</span> logs
          </p>
        </div>

        <div className={`${styles.mapSide} ${styles.mapErase}`}>
          <p className={styles.sideLabel}>Yours to delete</p>
          <p className={styles.sideName}>Settings › Delete my account</p>
          <p className={styles.sideText}>your account and all its data</p>
        </div>

        <div className={styles.mapNever}>
          <p className={styles.sideLabel}>No health data</p>
          <p className={styles.sideName}>Subscriptions, ads, crash reports</p>
          <p className={styles.sideText}>RevenueCat · Meta · Sentry</p>
        </div>
      </div>
    </figure>
  );
}
