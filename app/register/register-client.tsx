"use client";

import { useState } from "react";
import { Topbar } from "@/app/components/Topbar";
import { type EventItem } from "@/lib/events";
import { content, type Language } from "@/lib/site-content";
import { RegisterForm } from "../register-form";
import { type QuestionItem } from "@/lib/questions-store";

export function RegisterClient({
  currentEvent,
  questions
}: {
  currentEvent: EventItem;
  questions: QuestionItem[];
}) {
  const [lang, setLang] = useState<Language>("mr");
  const t = content[lang];
  const eventTitle = lang === "mr" ? currentEvent.titleDevanagari : currentEvent.titleEnglish;

  // Sync language with localStorage preference on mount
  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("greenpune_lang") as Language;
      if (saved === "en" || saved === "mr") {
        setLang(saved);
        document.documentElement.lang = saved;
      } else {
        document.documentElement.lang = "mr";
      }
    }
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("greenpune_lang", newLang);
      document.documentElement.lang = newLang;
    }
  };

  return (
    <main className={`register-page lang-${lang}`}>
      <Topbar lang={lang} setLang={handleSetLang} variant="register" />

      <section className="register-hero register-hero-single">
        <div className="register-card fade-up delay-1">
          <p className="eyebrow fade-up delay-2">{t.registerPage.eyebrow}</p>
          <h1 className="fade-up delay-3">{t.registerPage.title}</h1>
          <p className="fade-up delay-4">{t.registerPage.body}</p>
          <div className="register-event-strip fade-up delay-5">
            <strong>{eventTitle}</strong>
            <span>{lang === "mr" ? currentEvent.dateLabel : currentEvent.dateLabelEnglish}</span>
          </div>
          <div className="fade-up" style={{ animationDelay: "0.6s" }}>
            <RegisterForm copy={t.form} eventId={currentEvent.id} questions={questions} lang={lang} />
          </div>
        </div>
      </section>
    </main>
  );
}


