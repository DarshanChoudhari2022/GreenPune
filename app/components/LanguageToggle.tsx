"use client";

import { type Language } from "@/lib/site-content";

interface LanguageToggleProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export function LanguageToggle({ lang, setLang }: LanguageToggleProps) {
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
