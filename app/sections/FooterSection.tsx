"use client";

import { Section } from "@/app/components/Section";

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
      <footer className="footer-content fade-up delay-1">
        <div>
          <strong>GreenPune</strong>
          <p>{t.footer.line}</p>
          <p className="powered-by-text">
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
        <a href="/register" className="fade-up delay-2">{t.footer.share}</a>
      </footer>
    </Section>
  );
}

