import type { ReactNode } from "react";

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

type BlockProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  body: ReactNode;
};

function Block({ icon, eyebrow, title, body }: BlockProps) {
  return (
    <div
      className="flex gap-4 border-b py-6 first:pt-0 last:border-b-0 last:pb-0"
      style={{ borderColor: "var(--color-grid)" }}
    >
      <span
        aria-hidden
        className="mt-0.5 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full"
        style={{
          background: "var(--color-ink)",
          color: "var(--color-lime)",
        }}
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-2">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-ink-tertiary)",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 1.1rem + 0.45vw, 1.45rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-ink)",
            fontWeight: 720,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            lineHeight: 1.55,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.005em",
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

// Link + helper presentation shared by the three mail blocks.
const LINK_CLASS =
  "font-medium underline decoration-2 underline-offset-4 transition-colors duration-200 decoration-[color-mix(in_srgb,var(--color-lime-deep)_70%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-lime)_55%,transparent)] hover:decoration-[var(--color-ink)]";

const HELPER_STYLE = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.08em",
  lineHeight: 1.5,
  color: "var(--color-ink-tertiary)",
} as const;

// ─── Info sidebar ────────────────────────────────────────────────────────────

export default function ContactInfo() {
  return (
    <aside aria-label="Direct channels" className="flex flex-col">
      <Block
        icon={<MailIcon />}
        eyebrow="Support"
        title="hello@merios.life"
        body={
          <>
            <a
              href="mailto:hello@merios.life"
              style={{ color: "var(--color-ink)" }}
              className={LINK_CLASS}
            >
              Email our team directly
            </a>
            <span className="mt-2 block" style={HELPER_STYLE}>
              General product & account questions.
            </span>
          </>
        }
      />

      <Block
        icon={<PressIcon />}
        eyebrow="Press"
        title="press@merios.life"
        body={
          <>
            <a
              href="mailto:press@merios.life"
              style={{ color: "var(--color-ink)" }}
              className={LINK_CLASS}
            >
              Editorial & media inquiries
            </a>
            <span className="mt-2 block" style={HELPER_STYLE}>
              Press kit on request.
            </span>
          </>
        }
      />

      <Block
        icon={<PartnershipIcon />}
        eyebrow="Partnerships"
        title="partners@merios.life"
        body={
          <>
            <a
              href="mailto:partners@merios.life"
              style={{ color: "var(--color-ink)" }}
              className={LINK_CLASS}
            >
              Clinical, lab & brand partnerships
            </a>
            <span className="mt-2 block" style={HELPER_STYLE}>
              For labs, clinicians, and distribution.
            </span>
          </>
        }
      />

      <Block
        icon={<ClockIcon />}
        eyebrow="Response time"
        title="Within 24 hours"
        body={
          <span style={HELPER_STYLE}>
            Mon – Fri, CET. A human reads everything.
          </span>
        }
      />
    </aside>
  );
}
