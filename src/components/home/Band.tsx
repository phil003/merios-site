import Image from "next/image";
import AmbientVideo from "./AmbientVideo";

/* "The idea" band (Home2): friends on a ridge at dawn, the loop playing only
   while it is on screen, over its own first frame. */

export default function Band() {
  return (
    <section className="hv2-band" aria-labelledby="band-title">
      <div className="hv2-band__media">
        <Image
          src="/videos/v2/loop_ridge_poster.jpg"
          alt="Two friends on a grassy ridge at dawn, watching the sun rise over misty valleys."
          fill
          sizes="100vw"
          className="hv2-band__img"
        />
        <AmbientVideo src="/videos/v2/loop_ridge.mp4" className="hv2-band__video" loop />
      </div>
      <div className="hv2-band__veil" aria-hidden="true" />
      <div className="hv2-wrap hv2-band__inner" data-rv="">
        <p className="hv2-eyebrow hv2-eyebrow--ink">The idea</p>
        <h2 className="hv2-h2 hv2-band__title" id="band-title">
          Health, like a clear <em>morning.</em>
        </h2>
        <p className="hv2-band__lead">
          No jargon, no red alerts, no noise. Just what changed, and what it
          means for you.
        </p>
      </div>
    </section>
  );
}
