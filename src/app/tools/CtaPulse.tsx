import t from "./tools.module.css";

/**
 * Decorative heartbeat horizon for the night CTA cards on /tools/* — the same
 * line as the PageHero masthead, ending on the lime dot. aria-hidden, no text.
 */
export default function CtaPulse() {
  return (
    <>
      <svg
        className={t.ctaPulse}
        aria-hidden
        focusable="false"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="tools-cta-pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
          fill="none"
          stroke="url(#tools-cta-pulse-fade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span aria-hidden className={t.ctaDot} />
    </>
  );
}
