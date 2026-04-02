const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#blog" },
    { label: "FAQ", href: "#" },
    { label: "Support", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Legal", href: "#" },
  ],
};

const socials = [
  { label: "IG", title: "Instagram", href: "#" },
  { label: "X", title: "X (Twitter)", href: "#" },
  { label: "LI", title: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 px-6 md:px-12 bg-cream border-t border-green-primary/6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand */}
        <div>
          <div className="font-serif text-2xl font-semibold text-green-deep mb-3">merios</div>
          <p className="text-sm text-text-tertiary max-w-[280px] leading-relaxed">
            Health intelligence in your pocket. Understand your body. Act on your health.
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
        <p className="text-xs text-text-tertiary">© 2026 Merios. All rights reserved.</p>
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
