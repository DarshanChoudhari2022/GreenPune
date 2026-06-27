"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { currentEvent, events } from "@/lib/events";
import { content, type Language } from "@/lib/site-content";

function useScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function LanguageToggle({
  lang,
  setLang
}: {
  lang: Language;
  setLang: (lang: Language) => void;
}) {
  return (
    <div className="language-toggle" aria-label="Language selector">
      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => setLang("en")}
        type="button"
      >
        EN
      </button>
      <button
        className={lang === "mr" ? "active" : ""}
        onClick={() => setLang("mr")}
        type="button"
      >
        मराठी
      </button>
    </div>
  );
}

export function HomeClient() {
  const [lang, setLang] = useState<Language>("mr");
  const t = content[lang];
  const eventTitle = lang === "mr" ? currentEvent.titleDevanagari : currentEvent.titleEnglish;
  const eventSummary = lang === "mr" ? currentEvent.summaryMarathi : currentEvent.summary;

  useScrollReveal();

  return (
    <main className={`site-shell lang-${lang}`}>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="GreenPune home">
          <span className="brand-mark">GP</span>
          <span>GreenPune</span>
        </a>
        <div className="nav-links">
          <a href="#events">{t.nav.events}</a>
          <a href="#mission">{t.nav.mission}</a>
          <a href="#insights">{t.nav.insights}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="nav-actions">
          <LanguageToggle lang={lang} setLang={setLang} />
          <a className="nav-cta" href="/register">{t.nav.join}</a>
        </div>
      </nav>

      <section className="hero mobile-first-hero" id="top">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.body}</p>
          <div className="hero-actions">
            <a className="primary-action" href="/register">{t.hero.primary}</a>
            <a className="secondary-action" href="#insights">{t.hero.secondary}</a>
          </div>
        </div>
        <div className="poster-orbit" data-reveal>
          <div className="poster-card">
            <Image
              alt={`${eventTitle} poster`}
              fill
              priority
              sizes="(max-width: 900px) 86vw, 34vw"
              src={currentEvent.poster}
            />
          </div>
          <div className="orbit-chip chip-one">CO2</div>
          <div className="orbit-chip chip-two">Shade</div>
          <div className="orbit-chip chip-three">Water</div>
        </div>
      </section>

      <section className="intro-band" id="mission">
        <div data-reveal>
          <p className="eyebrow">{t.mission.eyebrow}</p>
          <h2>{t.mission.title}</h2>
        </div>
        <p data-reveal>{t.mission.body}</p>
        <div className="stats-grid">
          {t.stats.map(([value, label]) => (
            <article data-reveal key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="event-section" id="events">
        <div className="event-poster" data-reveal>
          <Image
            alt={`${eventTitle} poster`}
            fill
            sizes="(max-width: 900px) 92vw, 38vw"
            src={currentEvent.poster}
          />
        </div>
        <div className="event-copy" data-reveal>
          <p className="eyebrow">{t.event.eyebrow}</p>
          <h2>{eventTitle}</h2>
          <p className="organizer">
            {lang === "mr" ? currentEvent.organizer : currentEvent.organizerEnglish}
          </p>
          <dl className="event-details">
            <div>
              <dt>{t.event.date}</dt>
              <dd>{lang === "mr" ? currentEvent.dateLabel : currentEvent.dateLabelEnglish}</dd>
            </div>
            <div>
              <dt>{t.event.location}</dt>
              <dd>{lang === "mr" ? currentEvent.location : currentEvent.locationEnglish}</dd>
            </div>
            <div>
              <dt>{t.event.theme}</dt>
              <dd>{lang === "mr" ? currentEvent.theme : currentEvent.themeEnglish}</dd>
            </div>
          </dl>
          <p>{eventSummary}</p>
          <a className="primary-action" href="/register">{t.event.cta}</a>
        </div>
      </section>

      <section className="insights-section" id="insights">
        <div className="insight-copy" data-reveal>
          <p className="eyebrow">{t.insights.eyebrow}</p>
          <h2>{t.insights.title}</h2>
          <p>{t.insights.intro}</p>
        </div>
        <div className="projection-stage">
          {t.insights.cards.map((card, index) => (
            <article className="projection-card" data-reveal key={card.title}>
              <span>0{index + 1}</span>
              <strong>{card.value}</strong>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <div className="source-row" data-reveal>
          <strong>{t.insights.sourcesTitle}</strong>
          {t.insights.sources.map((source) => (
            <a href={source.href} key={source.href} rel="noreferrer" target="_blank">
              {source.label}
            </a>
          ))}
        </div>
      </section>

      <section className="portfolio-section">
        <div data-reveal>
          <p className="eyebrow">{t.portfolio.eyebrow}</p>
          <h2>{t.portfolio.title}</h2>
        </div>
        <div className="event-list">
          {events.map((event) => (
            <article data-reveal key={event.id}>
              <span>{event.status}</span>
              <h3>{lang === "mr" ? event.titleDevanagari : event.titleEnglish}</h3>
              <p>{lang === "mr" ? event.dateLabel : event.dateLabelEnglish}</p>
            </article>
          ))}
          <article className="muted-card" data-reveal>
            <span>upcoming</span>
            <h3>{t.portfolio.nextTitle}</h3>
            <p>{t.portfolio.nextBody}</p>
          </article>
        </div>
      </section>

      <footer id="contact">
        <div>
          <strong>GreenPune</strong>
          <p>{t.footer.line}</p>
        </div>
        <a href="/register">{t.footer.share}</a>
      </footer>

      <a className="floating-register" href="/register" aria-label="Open registration form">
        {t.nav.register}
      </a>
    </main>
  );
}
