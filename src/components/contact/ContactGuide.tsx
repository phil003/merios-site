import type { CSSProperties, ReactNode } from "react";
import styles from "./contact.module.css";

// "Before you write" — what to put in a message so it can be answered first
// time, and where requests that are not messages (data export / deletion,
// vulnerability reports) actually go. Open Sky: an eyebrow and H2, then one
// glass card per topic with a Newsreader index; three columns when there is
// room. Copy comes in as props.

export type ContactGuideItem = {
  id: string;
  title: string;
  body: ReactNode;
};

type ContactGuideProps = {
  eyebrow: string;
  title: ReactNode;
  items: ContactGuideItem[];
};

export default function ContactGuide({ eyebrow, title, items }: ContactGuideProps) {
  return (
    <section aria-labelledby="contact-guide-title" className={styles.guideSection}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id="contact-guide-title" className={styles.h2}>
          {title}
        </h2>

        <div className={styles.guideGrid}>
          {items.map((item, i) => (
            <div
              key={item.id}
              data-rv=""
              className={styles.guideCard}
              style={
                {
                  "--rv-delay": `${(0.05 + i * 0.08).toFixed(2)}s`,
                } as CSSProperties
              }
            >
              <div className={styles.guideHead}>
                <h3 className={styles.guideTitle}>{item.title}</h3>
                <span aria-hidden className={styles.guideIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={styles.guideBody}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
