import Logo, { Mark } from "@/components/ui/Logo";

type Link = { label: string; href: string };

const COLUMNS: { title: string; links: Link[] }[] = [
  {
    // Tech / methodology persona — the "how it works under the hood" path.
    title: "Methodology",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "The science", href: "/science" },
      { label: "Calculators", href: "/tools" },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    // Health / practical persona — the "what does my result mean" path.
    title: "Health library",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Blood tests", href: "/blog/category/blood-tests" },
      { label: "Biomarkers", href: "/blog/category/biomarkers" },
      { label: "Longevity", href: "/blog/category/longevity" },
      { label: "Hormones", href: "/blog/category/hormones" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Early access", href: "/early-access" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="v3-footer night" data-nav="dark">
      <div className="v3-footer__inner">
        <div className="v3-footer__top">
          {/* Brand */}
          <div className="v3-footer__brand">
            <Logo size="2rem" cut="#0E1316" />
            <p>
              One score for every biomarker you&rsquo;ve ever produced.
              Quiet, composite, and built to last a decade.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="v3-footer__col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The full logo, set big — never cropped */}
        <div className="v3-footer__lockup" aria-hidden>
          <Mark cut="#0C1013" color="#E3E7EB" style={{ width: "0.955em", height: "1.05em", flex: "none" }} />
          <span>Merios</span>
        </div>

        {/* Bottom strip */}
        <div className="v3-footer__bottom">
          <p>© {currentYear} Merios Health LLC · All rights reserved</p>
          <div className="v3-footer__locale" aria-label="Locale — English (French coming soon)">
            <span aria-current="true">EN</span>
            <span aria-hidden className="v3-footer__locale-rule" />
            <span>FR</span>
          </div>
        </div>

        {/* Medical disclaimer — App Store compliance (must not be removed) */}
        <p className="v3-footer__disclaimer">
          <strong>Medical disclaimer.</strong>{" "}
          Merios is a wellness companion, not a medical device. It does not
          diagnose, treat, cure, or prevent any disease. Health scores and
          biological age estimates are algorithmic, not clinically validated.
          Always consult a qualified healthcare professional for medical
          advice and the interpretation of your lab results.
        </p>
      </div>
    </footer>
  );
}
