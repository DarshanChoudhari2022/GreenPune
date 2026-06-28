"use client";

import { Section } from "@/app/components/Section";
import { type EventItem } from "@/lib/events";
import { type Language } from "@/lib/site-content";

interface PortfolioSectionProps {
  t: {
    portfolio: {
      eyebrow: string;
      title: string;
      nextTitle: string;
      nextBody: string;
    };
  };
  lang: Language;
  events: EventItem[];
}

export function PortfolioSection({ t, lang, events }: PortfolioSectionProps) {
  return (
    <Section className="portfolio-slide" theme="light">
      <div className="portfolio-section fade-up delay-1">
        <div className="portfolio-header fade-up delay-2">
          <p className="eyebrow">{t.portfolio.eyebrow}</p>
          <h2>{t.portfolio.title}</h2>
        </div>
        <div className="event-list fade-up delay-3">
          {events.map((event, index) => (
            <article key={event.id} className="fade-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <span>{event.status}</span>
              <h3>{lang === "mr" ? event.titleDevanagari : event.titleEnglish}</h3>
              <p>{lang === "mr" ? event.dateLabel : event.dateLabelEnglish}</p>
            </article>
          ))}
          <article className="muted-card fade-up" style={{ animationDelay: `${0.3 + events.length * 0.1}s` }}>
            <span>upcoming</span>
            <h3>{t.portfolio.nextTitle}</h3>
            <p>{t.portfolio.nextBody}</p>
          </article>
        </div>
      </div>
    </Section>
  );
}

