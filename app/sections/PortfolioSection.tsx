import Link from "next/link";
import type { EventItem } from "@/lib/events";
import type { Language } from "@/lib/site-content";

export function PortfolioSection({ lang, events }: { lang: Language; events: EventItem[] }) {
  const mr = lang === "mr";

  return (
    <section className="archive-events">
      <div className="slide-inner">
        <header className="section-header">
          <p className="eyebrow">GreenPune</p>
          <h1 className="section-title">{mr ? "पूर्ण झालेल्या वृक्षारोपण मोहिमा" : "Completed plantation drives"}</h1>
          <Link className="archive-link" href="/gallery">{mr ? "फोटो आणि व्हिडिओ पहा" : "Browse photos and videos"}</Link>
        </header>
        {events.length === 0 ? (
          <p>{mr ? "अद्याप पूर्ण झालेल्या मोहिमा नाहीत." : "No completed drives have been published yet."}</p>
        ) : (
          <div className="archive-event-list">
            {events.map((event) => (
              <article key={event.id} className="archive-event">
                <p className="eyebrow">{mr ? event.dateLabel : event.dateLabelEnglish}</p>
                <h2>{mr ? event.titleDevanagari : event.titleEnglish}</h2>
                <p>{mr ? event.location : event.locationEnglish}</p>
                <p>{mr ? event.organizer : event.organizerEnglish}</p>
                {event.treesPlanted != null && (
                  <strong>{event.treesPlanted} {mr ? "झाडे लावली" : "trees planted"}</strong>
                )}
                {event.mapUrl && <a className="archive-link" href={event.mapUrl}>{mr ? "नकाशावर पहा" : "View location"}</a>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
