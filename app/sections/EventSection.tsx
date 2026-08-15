"use client";

import { Section } from "@/app/components/Section";
import { type EventItem } from "@/lib/events";
import { type Language } from "@/lib/site-content";

interface EventSectionProps {
  t: {
    event: {
      eyebrow: string;
      date: string;
      time?: string;
      location: string;
      theme: string;
      trees?: string;
      danceAct?: string;
      cta: string;
      whatsapp?: string;
      mapPin?: string;
    };
  };
  lang: Language;
  event: EventItem;
}

export function EventSection({ t, lang, event }: EventSectionProps) {
  const eventTitle = lang === "mr" ? event.titleDevanagari : event.titleEnglish;
  const eventSummary = lang === "mr" ? event.summaryMarathi : event.summary;
  const timeLabel = lang === "mr" ? event.timeLabel : event.timeLabelEnglish;
  const danceActText = lang === "mr" ? event.specialActMarathi : event.specialAct;

  return (
    <Section id="events" className="event-slide" theme="green">
      <div className="event-section fade-up delay-1">
        <div className="event-copy fade-up delay-2">
          <div className="event-status-badge">
            <span className="badge-tag">
              {lang === "mr" ? "उपक्रम संपन्न — ११:०० ते २:००" : "Completed Event — 11 AM to 2 PM"}
            </span>
            <span className="badge-highlight">
              🌳 {event.treesPlanted} {lang === "mr" ? "झाडे लावली" : "Trees Planted"}
            </span>
          </div>

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
              <dt>{t.event.time || (lang === "mr" ? "वेळ" : "Timing")}</dt>
              <dd>{timeLabel}</dd>
            </div>
            <div>
              <dt>{t.event.location}</dt>
              <dd>
                {lang === "mr" ? event.location : event.locationEnglish}
                {event.mapUrl && (
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-pin-link"
                    title="Open map location"
                  >
                    📍 {t.event.mapPin || (lang === "mr" ? "नकाशा" : "Map")}
                  </a>
                )}
              </dd>
            </div>
            <div>
              <dt>{lang === "mr" ? "संपर्क व्यक्ती" : "Contact Person"}</dt>
              <dd>
                <strong>{event.contactPerson}</strong> ({event.contactPhone})
              </dd>
            </div>
            <div>
              <dt>{t.event.danceAct || (lang === "mr" ? "जनजागृती नृत्य" : "Special Act")}</dt>
              <dd className="special-act-dd">🎭 {danceActText}</dd>
            </div>
          </dl>

          <div className="locality-pills">
            <span className="pill-item">🌱 {lang === "mr" ? "वनस्पती: कडू निंब, पिंपळ, वड, करंज" : "Native Species: Neem, Peepal, Banyan, Karanj"}</span>
            <span className="pill-item">💧 {lang === "mr" ? "३ वर्षे पाणी व देखभाल नियोजन" : "3-Year Care & Water Schedule"}</span>
          </div>

          <p className="event-summary-text">{eventSummary}</p>

          <div className="event-cta-group">
            <a className="primary-action" href="/register">
              {t.event.cta}
            </a>
            <a
              className="whatsapp-action"
              href={event.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 {lang === "mr" ? "मयांक गोहर यांच्याशी WhatsApp वर बोला" : "Chat on WhatsApp with Mayank"}
            </a>
          </div>
        </div>

        <div className="help-grid fade-up delay-3">
          <article className="fade-up" style={{ animationDelay: "0.4s" }}>
            <span>01</span>
            <h3>{lang === "mr" ? "११० झाडे लावली" : "110 Trees Planted"}</h3>
            <p>
              {lang === "mr"
                ? "आनंदवन, महादेववाडी येथे नागरिकांच्या सहभागाने ११० रोपे लावली."
                : "Planted 110 native tree saplings at Anandvan, Mahadevwadi with local residents."}
            </p>
          </article>
          <article className="fade-up" style={{ animationDelay: "0.5s" }}>
            <span>02</span>
            <h3>{lang === "mr" ? "सांस्कृतिक जनजागृती" : "Cultural Awareness Act"}</h3>
            <p>
              {lang === "mr"
                ? "चोक्सी स्कूल पुणे च्या विद्यार्थ्यांनी पर्यावरण जनजागृती नृत्य सादर केले."
                : "Choksi School Pune students performed an inspiring tree plantation dance."}
            </p>
          </article>
          <article className="fade-up" style={{ animationDelay: "0.6s" }}>
            <span>03</span>
            <h3>{lang === "mr" ? "संपर्क व सहभाग" : "Contact & Support"}</h3>
            <p>
              {lang === "mr"
                ? "अधिक माहितीसाठी मयांक गोहर (+91 9623130157) यांच्याशी थेट WhatsApp वर संपर्क साधा."
                : "For details & next drive participation, contact Mayank Goher (+91 9623130157)."}
            </p>
          </article>
        </div>
      </div>
    </Section>
  );
}
