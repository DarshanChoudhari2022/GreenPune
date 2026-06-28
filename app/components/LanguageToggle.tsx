"use client";

import { type Language } from "@/lib/site-content";

interface LanguageToggleProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export function LanguageToggle({ lang, setLang }: LanguageToggleProps) {
  return (
    <div className="language-toggle" role="radiogroup" aria-label="Language">
      <button
        className={lang === "mr" ? "active" : ""}
        onClick={() => setLang("mr")}
        role="radio"
        aria-checked={lang === "mr"}
        type="button"
      >
        मराठी
      </button>
      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => setLang("en")}
        role="radio"
        aria-checked={lang === "en"}
        type="button"
      >
        ENGLISH
      </button>
    </div>
  );
}
