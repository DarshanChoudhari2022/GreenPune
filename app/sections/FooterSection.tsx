"use client";

import Link from "next/link";
import { Section } from "@/app/components/Section";
import { CookieSettingsButton } from "@/app/components/CookieSettingsButton";

interface FooterSectionProps {
  t: {
    footer: {
      line: string;
      share: string;
      poweredBy?: string;
    };
  };
}

export function FooterSection({ t }: FooterSectionProps) {
  return (
    <Section id="contact" className="footer-slide" theme="dark">
      <footer className="footer-content fade-up delay-1" style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <strong>GreenPune</strong>
          <p>{t.footer.line}</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "13px" }}>
            <Link href="/" style={{ border: "none", padding: 0, textDecoration: "underline" }}>Home</Link>
            <Link href="/about" style={{ border: "none", padding: 0, textDecoration: "underline" }}>About</Link>
            <Link href="/register" style={{ border: "none", padding: 0, textDecoration: "underline" }}>Register</Link>
            <Link href="/faq" style={{ border: "none", padding: 0, textDecoration: "underline" }}>FAQ</Link>
            <Link href="/privacy" style={{ border: "none", padding: 0, textDecoration: "underline" }}>Privacy Policy</Link>
            <CookieSettingsButton
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "13px",
                textDecoration: "underline"
              }}
            />
          </div>
          <p className="powered-by-text" style={{ marginTop: "4px" }}>
            {t.footer.poweredBy || "Powered by"}{" "}
            <a
              href="https://www.bracketdex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="powered-by-link"
            >
              BracketDex
            </a>
          </p>
        </div>
        <Link href="/register" className="fade-up delay-2">
          {t.footer.share}
        </Link>
      </footer>
    </Section>
  );
}


