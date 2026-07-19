import Image from "next/image";

interface PhoneMockupProps {
  className?: string;
}

/**
 * Hero phone mockup — real app screenshot in an ink bezel.
 *
 * Was a hand-drawn inline SVG approximation of the dashboard; now renders the
 * actual home screen (score 88 + 12-month trend + 4 pillars) captured from the
 * design mockup at native iPhone resolution (1179×2556). The frame mirrors the
 * AppPreview treatment (ink body, 44px outer radius, 37px screen radius,
 * 1px warm highlight inset) so both phones on the page read as one device.
 *
 * The screenshot bakes in its own status bar + Dynamic Island, so the frame
 * draws neither. `priority` keeps the image on the preload critical path —
 * on desktop it is the largest above-the-fold element (LCP candidate) and
 * must not wait for intersection-triggered lazy loading.
 */
export default function PhoneMockup({ className = "" }: PhoneMockupProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[44px] ${className}`}
      style={{
        background: "var(--color-ink)",
        padding: 7,
        boxShadow: "inset 0 0 0 1px rgba(247,245,239,0.10)",
      }}
    >
      <Image
        src="/screens/hero-home.png"
        alt="The Merios app home screen showing a composite health score of 88, up 4.2 this month, a 12-month score trend, and the four pillars — Blood 84, Sleep 76, Movement 91 and Stress 72"
        width={1179}
        height={2556}
        priority
        sizes="(max-width: 767px) 340px, 380px"
        className="block h-auto w-full rounded-[37px]"
      />
    </div>
  );
}
