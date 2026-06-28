"use client";

import Image from "next/image";
import { Section } from "@/app/components/Section";
import { type Language } from "@/lib/site-content";

interface HeroSectionProps {
  t: {
    hero: {
      eyebrow: string;
      title: string;
      body: string;
      primary: string;
      secondary: string;
    };
  };
  lang: Language;
}

export function HeroSection({ t, lang }: HeroSectionProps) {
  return (
    <Section id="top" className="hero-slide" theme="light">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.body}</p>
          <div className="hero-actions">
            <a className="primary-action" href="/register">
              {t.hero.primary}
            </a>
            <a className="secondary-action" href="#insights">
              {t.hero.secondary}
            </a>
          </div>
        </div>
        <div className="impact-visual">
          <div className="impact-photo primary-photo">
            <Image
              alt="Community tree plantation in a green urban space"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 44vw"
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85"
            />
          </div>
          <div className="impact-photo secondary-photo">
            <Image
              alt="Hands caring for a small sapling"
              fill
              sizes="(max-width: 900px) 48vw, 18vw"
              src="https://images.unsplash.com/photo-1524602585632-a2a01c12307c?auto=format&fit=crop&w=800&q=85"
            />
          </div>
          <div className="impact-meter">
            <span>{lang === "mr" ? "ध्येय" : "Goal"}</span>
            <strong>{lang === "mr" ? "सावली + जगवणे" : "Shade + Survival"}</strong>
          </div>
        </div>
      </div>
    </Section>
  );
}
