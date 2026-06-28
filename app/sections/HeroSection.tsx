"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  t: {
    hero: {
      titleLine1: string;
      titleLine2Start: string;
      titleHighlight: string;
      titleLine2End: string;
      body: string;
      primary: string;
      stat: string;
    };
  };
}

export function HeroSection({ t }: HeroSectionProps) {
  // Split the stat text by newlines to render br tags
  const statLines = t.hero.stat.split("\n");

  return (
    <section className="hero-slide">
      <div className="hero-inner">
        <h1 className="hero-heading">
          <div className="hero-line">{t.hero.titleLine1}</div>
          <div className="hero-line">
            {t.hero.titleLine2Start}
            <span className="text-leaf">{t.hero.titleHighlight}</span>
            {t.hero.titleLine2End}
          </div>
        </h1>

        <div className="hero-tree">
          <Image
            alt="Lush green tree"
            src="/images/hero-tree.png"
            width={700}
            height={800}
            priority
            quality={100}
            className="tree-img"
          />
        </div>

        <div className="hero-bottom-grid">
          <div className="hero-stat-box">
            {statLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < statLines.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="hero-cta-box">
            <p>
              {t.hero.body}
            </p>
            <Link href="/register" className="plant-btn">
              {t.hero.primary}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
