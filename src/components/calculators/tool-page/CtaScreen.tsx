import Image from "next/image";
import css from "./toolPage.module.css";

/** The app screens of the v2 redesign (780 × 1688, example data). */
const SCREENS = {
  "bio-age": {
    src: "/images/v2/screens/bio-age.jpg",
    alt: "The Merios biological age screen, with example data: a phenotypic age of 32.2 years.",
  },
  "blood-panel": {
    src: "/images/v2/screens/blood-panel.jpg",
    alt: "The Merios blood panel screen, with example data: 42 markers grouped by system.",
  },
  compare: {
    src: "/images/v2/screens/compare.jpg",
    alt: "The Merios panel comparison screen, with example data: LDL cholesterol from 112 to 104 mg/dL.",
  },
  today: {
    src: "/images/v2/screens/today.jpg",
    alt: "The Merios Today screen, with example data: 7h24 of sleep and a recovery of 76.",
  },
} as const;

export type ScreenKey = keyof typeof SCREENS;

/**
 * The app screen that sits at the foot of a CTA block, cut by its bottom edge,
 * labelled "Example data" on the screen itself (the alt text says it too, so
 * the visible label is hidden from screen readers).
 */
export default function CtaScreen({ screen }: { screen: ScreenKey }) {
  const { src, alt } = SCREENS[screen];
  return (
    <div className={css.screen}>
      <div className={css.screenFrame}>
        <Image src={src} alt={alt} width={780} height={1688} sizes="(max-width: 760px) 200px, 260px" />
        <p aria-hidden className={css.screenTag}>
          <span className={css.screenDot} />
          Example data
        </p>
      </div>
    </div>
  );
}
