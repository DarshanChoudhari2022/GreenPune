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
      <div className="portfolio-section">
        <div className="portfolio-header">
          <p className="eyebrow">{t.portfolio.eyebrow}</p>
          <h2>{t.portfolio.title}</h2>
        </div>
        <div className="event-list">
          {events.map((event) => (
            <article key={event.id}>
              <span>{event.status}</span>
              <h3>{lang === "mr" ? event.titleDevanagari : event.titleEnglish}</h3>
              <p>{lang === "mr" ? event.dateLabel : event.dateLabelEnglish}</p>
            </article>
          ))}
          <article className="muted-card">
            <span>upcoming</span>
            <h3>{t.portfolio.nextTitle}</h3>
            <p>{t.portfolio.nextBody}</p>
          </article>
        </div>
      </div>
    </Section>
  );
}
