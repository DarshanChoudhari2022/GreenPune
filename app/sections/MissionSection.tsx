"use client";

import { Section } from "@/app/components/Section";

interface MissionSectionProps {
  t: {
    mission: {
      eyebrow: string;
      title: string;
      body: string;
    };
    stats: readonly (readonly [string, string])[];
  };
}

export function MissionSection({ t }: MissionSectionProps) {
  return (
    <Section id="mission" className="mission-slide" theme="light">
      <div className="intro-band fade-up delay-1">
        <div className="mission-header">
          <p className="eyebrow">{t.mission.eyebrow}</p>
          <h2>{t.mission.title}</h2>
        </div>
        <p className="mission-body fade-up delay-2">{t.mission.body}</p>
        <div className="stats-grid fade-up delay-3">
          {t.stats.map(([value, label], index) => (
            <article key={label} style={{ animationDelay: `${0.3 + index * 0.1}s` }} className="fade-up">
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

