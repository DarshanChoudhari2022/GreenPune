"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { currentEvent } from "@/lib/events";
import { content, type Language } from "@/lib/site-content";
import { RegisterForm } from "../register-form";

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
        MR
      </button>
    </div>
  );
}

export function RegisterClient() {
  const [lang, setLang] = useState<Language>("mr");
  const t = content[lang];
  const eventTitle = lang === "mr" ? currentEvent.titleDevanagari : currentEvent.titleEnglish;

  return (
    <main className={`register-page lang-${lang}`}>
      <nav className="topbar register-topbar" aria-label="Registration navigation">
        <Link className="brand" href="/">
          <Image
            alt="GreenPune"
            className="brand-logo"
            height={42}
            priority
            src="/images/greenpune-logo.png"
            width={176}
          />
        </Link>
        <div className="nav-actions">
          <LanguageToggle lang={lang} setLang={setLang} />
          <Link className="nav-cta" href="/">Home</Link>
        </div>
      </nav>

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
