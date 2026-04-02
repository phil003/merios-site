export default function Statement() {
  return (
    <section className="py-32 px-6 bg-beige">
      <div className="max-w-3xl mx-auto text-center fade-in">
        <blockquote className="font-serif text-3xl md:text-5xl font-normal italic leading-relaxed text-green-deep" style={{ letterSpacing: "-0.01em" }}>
          "You get your lab results back. Pages of numbers. Asterisks. Your doctor glances at it: 'Look fine.' You file it away. And your body keeps sending signals you don't understand."
        </blockquote>
        <div className="w-12 h-[1.5px] bg-green-muted/50 mx-auto mt-10 mb-8" />
        <p className="text-sm uppercase tracking-widest text-text-tertiary font-medium">
          The Problem We Solve
        </p>
      </div>
    </section>
  );
}
