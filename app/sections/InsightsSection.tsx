"use client";

import { Section } from "@/app/components/Section";

interface InsightsSectionProps {
  t: {
    insights: {
      eyebrow: string;
      title: string;
      intro: string;
      cards: readonly { readonly title: string; readonly value: string; readonly text: string }[];
      sourcesTitle: string;
      sources: readonly { readonly label: string; readonly href: string }[];
    };
  };
}

export function InsightsSection({ t }: InsightsSectionProps) {
  return (
    <Section id="insights" className="insights-slide" theme="dark">
      <div className="insights-section fade-up delay-1">
        <div className="insight-copy fade-up delay-2">
          <p className="eyebrow">{t.insights.eyebrow}</p>
          <h2>{t.insights.title}</h2>
          <p>{t.insights.intro}</p>
        </div>
        <div className="projection-stage fade-up delay-3">
          {t.insights.cards.map((card, index) => (
            <article className="projection-card fade-up" key={card.title} style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <span>0{index + 1}</span>
              <strong>{card.value}</strong>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <div className="source-row fade-up delay-4">
          <strong>{t.insights.sourcesTitle}</strong>
          {t.insights.sources.map((source) => (
            <a href={source.href} key={source.href} rel="noreferrer" target="_blank">
              {source.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

