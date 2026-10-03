// Small inline glyphs used across the homepage. Decorative: aria-hidden.

export function AppleGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.18)} viewBox="0 0 17 20" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM11.6 3c.7-.9 1.2-2 1-3.2-1 .1-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"
      />
    </svg>
  );
}

export function Arrow({ className, width = 18 }: { className?: string; width?: number }) {
  return (
    <svg className={className} width={width} height={Math.round(width * 0.7)} viewBox="0 0 20 14" aria-hidden focusable="false">
      <path
        d="M1 7h17M12 1l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden focusable="false">
      <circle cx="11" cy="11" r="10" fill="currentColor" opacity="0.16" />
      <path
        d="M6.5 11.3l3 3 6-6.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
