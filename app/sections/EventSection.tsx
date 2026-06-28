"use client";

import { Section } from "@/app/components/Section";
import { type EventItem } from "@/lib/events";
import { type Language } from "@/lib/site-content";

interface EventSectionProps {
  t: {
    event: {
      eyebrow: string;
      date: string;
      location: string;
      theme: string;
      cta: string;
    };
  };
  lang: Language;
  event: EventItem;
}

export function EventSection({ t, lang, event }: EventSectionProps) {
  const eventTitle = lang === "mr" ? event.titleDevanagari : event.titleEnglish;
  const eventSummary = lang === "mr" ? event.summaryMarathi : event.summary;

  return (
    <Section id="events" className="event-slide" theme="green">
      <div className="event-section">
        <div className="event-copy">
          <p className="eyebrow">{t.event.eyebrow}</p>
          <h2>{eventTitle}</h2>
          <p className="organizer">
            {lang === "mr" ? event.organizer : event.organizerEnglish}
          </p>
          <dl className="event-details">
            <div>
              <dt>{t.event.date}</dt>
              <dd>{lang === "mr" ? event.dateLabel : event.dateLabelEnglish}</dd>
            </div>
            <div>
              <dt>{t.event.location}</dt>
              <dd>{lang === "mr" ? event.location : event.locationEnglish}</dd>
            </div>
            <div>
              <dt>{t.event.theme}</dt>
              <dd>{lang === "mr" ? event.theme : event.themeEnglish}</dd>
            </div>
          </dl>
          <p>{eventSummary}</p>
          <a className="primary-action" href="/register">
            {t.event.cta}
          </a>
        </div>
        <div className="help-grid">
          <article>
            <span>01</span>
            <h3>{lang === "mr" ? "नोंदणी करा" : "Register"}</h3>
            <p>
              {lang === "mr"
                ? "आपली माहिती भरून कार्यक्रमात सहभागी व्हा."
                : "Enter your details and join the event."}
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>{lang === "mr" ? "रोप आणा" : "Bring a Sapling"}</h3>
            <p>
              {lang === "mr"
                ? "शक्य असल्यास आपले रोप स्वतः आणा."
                : "Bring your own sapling if possible."}
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>{lang === "mr" ? "झाड जगवा" : "Care After Planting"}</h3>
            <p>
              {lang === "mr"
                ? "लावलेल्या झाडाची जबाबदारी स्थानिक पातळीवर घ्या."
                : "Help protect and water the tree after planting."}
            </p>
          </article>
        </div>
      </div>
    </Section>
  );
}
