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
      <div className="insights-section">
        <div className="insight-copy">
          <p className="eyebrow">{t.insights.eyebrow}</p>
          <h2>{t.insights.title}</h2>
          <p>{t.insights.intro}</p>
        </div>
        <div className="projection-stage">
          {t.insights.cards.map((card, index) => (
            <article className="projection-card" key={card.title}>
              <span>0{index + 1}</span>
              <strong>{card.value}</strong>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <div className="source-row">
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
