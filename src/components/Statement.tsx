export default function Statement() {
  return (
    <section className="py-28 px-6 bg-beige">
      <div className="max-w-3xl mx-auto text-center fade-in">
        <blockquote className="font-serif text-2xl md:text-4xl font-normal italic leading-relaxed text-green-deep" style={{ letterSpacing: "-0.01em" }}>
          « Tu reçois tes résultats d&apos;analyses. Des pages de chiffres. Des
          astérisques. Ton médecin survole en 90&nbsp;secondes : c&apos;est
          globalement bon. Tu ranges la feuille dans un tiroir. Et ton corps
          continue de t&apos;envoyer des signaux que tu ne sais pas lire. »
        </blockquote>
        <div className="w-12 h-[1.5px] bg-green-muted/50 mx-auto mt-8 mb-8" />
        <p className="text-sm uppercase tracking-widest text-text-tertiary font-medium">
          Le problème qu&apos;on résout
        </p>
      </div>
    </section>
  );
}
