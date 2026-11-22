import Link from "next/link";
import { Section } from "@/app/components/Section";
import type { EventItem } from "@/lib/events";
import type { content, Language } from "@/lib/site-content";

interface EventSectionProps {
  t: (typeof content)[Language];
  lang: Language;
  event: EventItem;
}

export function EventSection({ t, lang, event }: EventSectionProps) {
  const mr = lang === "mr";
  const title = mr ? event.titleDevanagari : event.titleEnglish;
  const summary = mr ? event.summaryMarathi : event.summary;
  const time = mr ? event.timeLabel : event.timeLabelEnglish;
  const performance = mr ? event.specialActMarathi : event.specialAct;
  const date = mr ? event.dateLabel : event.dateLabelEnglish;
  const location = mr ? event.location : event.locationEnglish;
  const status = {
    completed: mr ? "मोहीम संपन्न" : "Completed drive",
    open: mr ? "नोंदणी सुरू" : "Registration open",
    upcoming: mr ? "आगामी मोहीम" : "Upcoming drive"
  }[event.status];

  return (
    <Section id="events" className="event-slide" theme="light">
      <div className="featured-drive">
        <div className="featured-drive-copy">
          <p className="featured-drive-status">{status}</p>
          <h2>{title}</h2>
          <p className="featured-drive-organizer">{mr ? event.organizer : event.organizerEnglish}</p>
          {summary && <p className="featured-drive-summary">{summary}</p>}
          <div className="featured-drive-actions">
            <Link href="/register" className="featured-drive-primary">{t.event.cta}</Link>
            <Link href="/gallery">{mr ? "फोटो व व्हिडिओ" : "Photos & videos"}</Link>
            {event.whatsappUrl && (
              <a href={event.whatsappUrl} target="_blank" rel="noopener noreferrer">
                {mr ? "WhatsApp वर संपर्क" : "Contact on WhatsApp"}
              </a>
            )}
          </div>
        </div>
        <dl className="featured-drive-facts">
          {date && (
            <div>
              <dt>{t.event.date}</dt>
              <dd>{date}{time && <small>{time}</small>}</dd>
            </div>
          )}
          {location && (
            <div>
              <dt>{t.event.location}</dt>
              <dd>
                {location}
                {event.mapUrl && (
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                    {mr ? "नकाशा पहा" : "View map"}
                  </a>
                )}
              </dd>
            </div>
          )}
          {event.treesPlanted != null && event.status === "completed" && (
            <div>
              <dt>{mr ? "लावलेली झाडे" : "Trees planted"}</dt>
              <dd>{event.treesPlanted.toLocaleString(mr ? "mr-IN" : "en-IN")}</dd>
            </div>
          )}
          {performance && (
            <div>
              <dt>{mr ? "विशेष कार्यक्रम" : "Event highlight"}</dt>
              <dd>{performance}</dd>
            </div>
          )}
        </dl>
      </div>
    </Section>
  );
}
