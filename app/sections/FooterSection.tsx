"use client";

import { Section } from "@/app/components/Section";

interface FooterSectionProps {
  t: {
    footer: {
      line: string;
      share: string;
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
        </div>
        <a href="/register" className="fade-up delay-2">{t.footer.share}</a>
      </footer>
    </Section>
  );
}

