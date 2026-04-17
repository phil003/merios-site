interface GrainOverlayProps {
  opacity?: number;
  baseFrequency?: number;
  className?: string;
}

export default function GrainOverlay({
  opacity = 0.035,
  baseFrequency = 0.9,
  className = "",
}: GrainOverlayProps) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="merios-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#merios-grain)" opacity={opacity} />
    </svg>
  );
}
