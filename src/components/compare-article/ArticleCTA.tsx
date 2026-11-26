import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import a from "@/components/blog-article/article.module.css";

/**
 * Final comparison CTA — "Try Merios →" linking to /early-access. Open Sky:
 * the article template's sunrise band (not an ink block), the headline with
 * its italic human words, the ink pill, and the app's compare screen
 * (example data, labelled on the frame's top edge so the label never covers
 * the screen's own date line).
 */
export default function ArticleCTA() {
  return (
    <section className={a.cta} aria-labelledby="compare-cta-title">
      <div className={a.ctaInner}>
        <Reveal className={a.ctaCopy}>
          <div className={`label ${a.ctaLabel}`}>
            <span aria-hidden className="label-dot" />
            <span>Ready to decide?</span>
          </div>
          <h2 id="compare-cta-title" className={a.ctaTitle}>
            See your health in <em>one clear score.</em>
          </h2>
          <div className={a.ctaActions}>
            <a href="/early-access" className="btn btn-ink">
              Try Merios
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </a>
          </div>
        </Reveal>

        <div className={a.ctaFigure}>
          <div className={a.ctaScreen}>
            <Image
              src="/images/v2/screens/compare.jpg"
              alt="The Merios compare screen, with example data: LDL across two panels, 112 to 104 mg/dL."
              width={780}
              height={1688}
              sizes="(min-width: 900px) 260px, 200px"
              className={a.ctaShot}
            />
          </div>
          <span className={a.ctaTag}>Example data</span>
        </div>
      </div>
    </section>
  );
}
