import type { ReactNode } from "react";
import styles from "./contact.module.css";

// ─── Inline SVG icons (currentColor, 20x20, stroke-width 1.5) ────────────────

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PressIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h13v16H7a3 3 0 0 1-3-3V4z" />
      <path d="M17 8h3v9a3 3 0 0 1-3 3" />
      <path d="M8 8h5" />
      <path d="M8 12h5" />
      <path d="M8 16h5" />
    </svg>
  );
}

function PartnershipIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="8" cy="9" r="3.25" />
      <circle cx="16" cy="9" r="3.25" />
      <path d="M2.5 19c0-2.8 2.4-4.75 5.5-4.75S13.5 16.2 13.5 19" />
      <path d="M10.5 19c0-2.8 2.4-4.75 5.5-4.75S21.5 16.2 21.5 19" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

// ─── Block ───────────────────────────────────────────────────────────────────
// Open Sky: the direct channels sit on the page's one ink block (see
// src/app/contact/page.tsx), under its "Direct channels" h2. Sky icons in
// glass discs, lavender eyebrows, white h3 titles; an email address is itself
// the mailto link. Styles: ./contact.module.css.

type BlockProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  /** mailto target: the title (the address) becomes the link. */
  email?: string;
  body: ReactNode;
};

function Block({ icon, eyebrow, title, email, body }: BlockProps) {
  return (
    <div className={styles.block}>
      <span aria-hidden className={styles.blockIcon}>
        {icon}
      </span>
      <div className={styles.blockText}>
        <span className={styles.blockEyebrow}>{eyebrow}</span>
        <h3 className={styles.blockTitle}>
          {email ? (
            <a href={`mailto:${email}`} className={styles.blockLink}>
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <div className={styles.blockBody}>{body}</div>
      </div>
    </div>
  );
}

// ─── Info sidebar ────────────────────────────────────────────────────────────

export default function ContactInfo({ labelledBy }: { labelledBy?: string }) {
  return (
    <aside
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : "Direct channels"}
      className={styles.channels}
    >
      <Block
        icon={<MailIcon />}
        eyebrow="Support"
        title="hello@merios.life"
        email="hello@merios.life"
        body={
          <span className={styles.helper}>
            General product & account questions.
          </span>
        }
      />

      <Block
        icon={<PressIcon />}
        eyebrow="Press"
        title="press@merios.life"
        email="press@merios.life"
        body={
          <span className={styles.helper}>
            Editorial & media inquiries. Press kit on request.
          </span>
        }
      />

      <Block
        icon={<PartnershipIcon />}
        eyebrow="Partnerships"
        title="partners@merios.life"
        email="partners@merios.life"
        body={
          <span className={styles.helper}>
            Clinical, lab & brand partnerships. For labs, clinicians, and
            distribution.
          </span>
        }
      />

      <Block
        icon={<ClockIcon />}
        eyebrow="Response time"
        title="Within 24 hours"
        body={
          <span className={styles.helper}>
            Mon – Fri, CET. A human reads everything.
          </span>
        }
      />
    </aside>
  );
}
