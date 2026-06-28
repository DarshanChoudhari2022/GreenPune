"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/app/components/Topbar";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { HeroSection } from "@/app/sections/HeroSection";
import { MissionSection } from "@/app/sections/MissionSection";
import { EventSection } from "@/app/sections/EventSection";
import { InsightsSection } from "@/app/sections/InsightsSection";
import { PortfolioSection } from "@/app/sections/PortfolioSection";
import { FooterSection } from "@/app/sections/FooterSection";
import { type EventItem } from "@/lib/events";
import { content, type Language } from "@/lib/site-content";

export function HomeClient({ events }: { events: EventItem[] }) {
  const [lang, setLang] = useState<Language>("en");
  const t = content[lang];
  const currentEvent = events.find((event) => event.status === "open") || events[0];

  useEffect(() => {
    document.documentElement.classList.add("ppt-mode");
    return () => {
      document.documentElement.classList.remove("ppt-mode");
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <main className={`site-shell lang-${lang}`}>
        <Topbar lang={lang} setLang={setLang} variant="home" />
        <HeroSection t={t} />
        <MissionSection t={t} />
        <EventSection t={t} lang={lang} event={currentEvent} />
        <InsightsSection t={t} />
        <PortfolioSection t={t} lang={lang} events={events} />
        <FooterSection t={t} />

        <a className="floating-register" href="/register" aria-label="Open registration form">
          {t.nav.register}
        </a>
      </main>
    </>
  );
}
