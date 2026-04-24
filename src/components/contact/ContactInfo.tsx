import type { ReactNode } from "react";

// ─── Inline SVG icons (currentColor, 20x20, stroke-width 1.25) ───────────────

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
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
      strokeWidth="1.25"
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
      strokeWidth="1.25"
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
      strokeWidth="1.25"
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
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex h-8 w-8 items-center justify-center rounded-full"
          style={{
            border: "1px solid var(--color-grid)",
            background: "var(--color-canvas-alt)",
            color: "var(--color-green-deep)",
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-ink-tertiary)",
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.375rem",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          fontWeight: 400,
        }}
      >
        {title}
      </h3>
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
  );
}

// ─── Info sidebar ────────────────────────────────────────────────────────────

export default function ContactInfo() {
  return (
    <aside aria-label="Direct channels" className="flex flex-col gap-10">
      <Block
        icon={<MailIcon />}
        eyebrow="Support"
        title="hello@merios.life"
        body={
          <>
            <a
              href="mailto:hello@merios.life"
              style={{
                color: "var(--color-ink)",
                borderBottom: "1px solid var(--color-grid)",
                paddingBottom: 1,
              }}
              className="hover:border-[color:var(--color-ink)]"
            >
              Email our team directly
            </a>
            <span
              className="mt-2 block"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--color-ink-tertiary)",
              }}
            >
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
              style={{
                color: "var(--color-ink)",
                borderBottom: "1px solid var(--color-grid)",
                paddingBottom: 1,
              }}
              className="hover:border-[color:var(--color-ink)]"
            >
              Editorial & media inquiries
            </a>
            <span
              className="mt-2 block"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--color-ink-tertiary)",
              }}
            >
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
              style={{
                color: "var(--color-ink)",
                borderBottom: "1px solid var(--color-grid)",
                paddingBottom: 1,
              }}
              className="hover:border-[color:var(--color-ink)]"
            >
              Clinical, lab & brand partnerships
            </a>
            <span
              className="mt-2 block"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--color-ink-tertiary)",
              }}
            >
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
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--color-ink-tertiary)",
            }}
          >
            Mon – Fri, CET. A human reads everything.
          </span>
        }
      />
    </aside>
  );
}
