const numbers = [
  { value: "130+", label: "Biomarqueurs" },
  { value: "13", label: "Catégories" },
  { value: "6", label: "Piliers de santé" },
  { value: "100%", label: "Français & RGPD" },
];

export default function Numbers() {
  return (
    <section className="py-20 px-6 bg-beige">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center fade-in">
        {numbers.map((n, i) => (
          <div key={i}>
            <h3 className="font-serif text-4xl font-semibold text-green-deep mb-1.5">{n.value}</h3>
            <p className="text-xs uppercase tracking-wider text-text-tertiary font-medium">{n.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
