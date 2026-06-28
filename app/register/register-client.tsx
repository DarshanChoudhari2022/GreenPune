"use client";

import { useState } from "react";
import { Topbar } from "@/app/components/Topbar";
import { currentEvent } from "@/lib/events";
import { content, type Language } from "@/lib/site-content";
import { RegisterForm } from "../register-form";

export function RegisterClient() {
  const [lang, setLang] = useState<Language>("mr");
  const t = content[lang];
  const eventTitle = lang === "mr" ? currentEvent.titleDevanagari : currentEvent.titleEnglish;

  return (
    <main className={`register-page lang-${lang}`}>
      <Topbar lang={lang} setLang={setLang} t={t} variant="register" />

      <section className="register-hero register-hero-single">
        <div className="register-card">
          <p className="eyebrow">{t.registerPage.eyebrow}</p>
          <h1>{t.registerPage.title}</h1>
          <p>{t.registerPage.body}</p>
          <div className="register-event-strip">
            <strong>{eventTitle}</strong>
            <span>{lang === "mr" ? currentEvent.dateLabel : currentEvent.dateLabelEnglish}</span>
          </div>
          <RegisterForm copy={t.form} eventId={currentEvent.id} />
        </div>
      </section>
    </main>
  );
}
