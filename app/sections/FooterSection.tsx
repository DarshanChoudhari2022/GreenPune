"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { content, type Language } from "@/lib/site-content";

export function PublicFooter() {
  const pathname = usePathname();
  if (!["/about", "/faq", "/privacy", "/register", "/thank-you"].includes(pathname)) return null;
  return <FooterSection />;
}

export function FooterSection({ lang = "en" }: { lang?: Language }) {
  const marathi = lang === "mr";
  const { footer } = content[lang];

  return (
    <footer id="contact" className="site-footer" lang={lang}>
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div>
            <Link href="/" className="site-footer-brand">GreenPune</Link>
            <p>{footer.line}</p>
          </div>
          <nav aria-label={marathi ? "पृष्ठे" : "Footer navigation"}>
            <h2>{marathi ? "पृष्ठे" : "Explore"}</h2>
            <ul>
              <li><Link href="/">{marathi ? "मुख्यपृष्ठ" : "Home"}</Link></li>
              <li><Link href="/about">{marathi ? "आमच्याबद्दल" : "About"}</Link></li>
              <li><Link href="/register">{marathi ? "नोंदणी" : "Volunteer registration"}</Link></li>
              <li><Link href="/faq">{marathi ? "प्रश्नोत्तरे" : "FAQ"}</Link></li>
              <li><Link href="/events">{marathi ? "पूर्ण झालेल्या मोहिमा" : "Completed events"}</Link></li>
              <li><Link href="/gallery">{marathi ? "गॅलरी" : "Gallery"}</Link></li>
            </ul>
          </nav>
          <div>
            <h2>{marathi ? "संपर्क" : "Contact"}</h2>
            <ul>
              <li><a href="mailto:hello@greenpune.in">hello@greenpune.in</a></li>
              <li><a href="https://wa.me/919623130157">WhatsApp <bdi>+91 96231 30157</bdi></a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer-meta">
          <p>{footer.poweredBy || "Powered by"} <a href="https://www.bracketdex.com/">BracketDex</a></p>
          <div>
            <Link href="/privacy">{marathi ? "गोपनीयता धोरण" : "Privacy policy"}</Link>
          </div>
        </div>
        <span className="site-footer-wordmark" aria-hidden="true">GreenPune</span>
      </div>
    </footer>
  );
}
