const footerLinks = {
  Produit: [
    { label: "L'idée", href: "#concept" },
    { label: "Comment ça marche", href: "#fonctionnement" },
    { label: "Tarifs", href: "#" },
  ],
  Ressources: [
    { label: "Blog", href: "#blog" },
    { label: "FAQ", href: "#" },
    { label: "Support", href: "#" },
  ],
  Légal: [
    { label: "Confidentialité", href: "#" },
    { label: "CGU", href: "#" },
    { label: "Mentions légales", href: "#" },
  ],
};

const socials = [
  { label: "IG", title: "Instagram", href: "#" },
  { label: "TK", title: "TikTok", href: "#" },
  { label: "IN", title: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 px-6 md:px-12 bg-cream border-t border-green-primary/6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand */}
        <div>
          <div className="font-serif text-2xl font-semibold text-green-deep mb-3">merios</div>
          <p className="text-sm text-text-tertiary max-w-[280px] leading-relaxed">
            L&apos;intelligence de ta santé, au creux de ta main. Comprends ton
            corps. Agis pour ta santé.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex gap-12 md:gap-14 flex-wrap">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs uppercase tracking-[0.12em] text-text-tertiary font-semibold mb-4">
                {title}
              </h4>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-sm text-text-secondary hover:text-green-primary transition-colors mb-2.5"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-green-primary/6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-text-tertiary">© 2026 Merios. Tous droits réservés.</p>
        <div className="flex gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              title={s.title}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-text-secondary hover:bg-green-deep hover:text-white transition-all"
              style={{ background: "rgba(45,90,61,0.06)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
