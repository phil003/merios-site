import Logo from "@/components/ui/Logo";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

type Link = { label: string; href: string };

const COLUMNS: { title: string; links: Link[] }[] = [
  {
    // Tech / methodology persona — the "how it works under the hood" path.
    title: "Methodology",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "The science", href: "/science" },
      { label: "Tools", href: "/tools" },
      { label: "Compare", href: "/compare" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    // Health / practical persona — the "what does my result mean" path.
    // Every topic hub is listed, under the title the Journal gives it
    // (src/lib/blog-categories.ts): these links are what keep the least-linked
    // hubs reachable, and in Google's index.
    title: "Health library",
    links: [
      { label: "Blog", href: "/blog" },
      ...BLOG_CATEGORIES.map((c) => ({ label: c.title, href: `/blog/category/${c.slug}` })),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Get the app", href: "/early-access" },
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
    <footer className="v3-footer">
      <div className="v3-footer__inner">
        <div className="v3-footer__top">
          {/* Brand */}
          <div className="v3-footer__brand">
            <Logo size="1.5rem" />
            <p>
              The preventive health platform. Your blood tests and your daily
              data, read together in plain English.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="v3-footer__col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The wordmark, set big — lowercase, like the logo */}
        <div className="v3-footer__lockup" aria-hidden>
          <span>merios</span>
        </div>

        {/* Bottom strip */}
        <div className="v3-footer__bottom">
          <p>© {currentYear} Merios Health LLC · All rights reserved</p>
        </div>

        {/* Medical disclaimer — App Store compliance (must not be removed) */}
        <p className="v3-footer__disclaimer">
          <strong>Medical disclaimer.</strong>{" "}
          Merios is a preventive health platform, not a medical device. It does
          not diagnose, treat, cure, or prevent any disease. Health scores and
          biological age estimates are algorithmic, not clinically validated.
          Always consult a qualified healthcare professional for medical
          advice and the interpretation of your lab results.
        </p>
      </div>
    </footer>
  );
}
