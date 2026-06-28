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
      <div className="intro-band">
        <div className="mission-header">
          <p className="eyebrow">{t.mission.eyebrow}</p>
          <h2>{t.mission.title}</h2>
        </div>
        <p className="mission-body">{t.mission.body}</p>
        <div className="stats-grid">
          {t.stats.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
