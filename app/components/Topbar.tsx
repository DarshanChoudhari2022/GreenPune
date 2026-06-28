"use client";

import { type Language } from "@/lib/site-content";

interface TopbarProps {
  lang?: Language;
  setLang?: (lang: Language) => void;
  variant?: "home" | "register";
}

export function Topbar({ lang, setLang, variant = "home" }: TopbarProps) {
  return (
    <nav className="topbar">
      <div className="topbar-left">
        <a href="/" className="brand-text">
          <span className="drop">☘️</span>
          <div className="brand-stack">
            <span className="brand-bold">GREEN</span>
            <span className="brand-light">PUNE</span>
          </div>
        </a>
      </div>

      {variant === "home" ? (
        <div className="topbar-center">
          <span className="save-the-text">SAVE THE:</span>
          <a href="/about#ocean" className="nav-pill nav-pill-outline">OCEAN</a>
          <a href="/about#forest" className="nav-pill nav-pill-solid">FOREST</a>
        </div>
      ) : (
        <div className="topbar-center">
          {setLang && lang && (
            <div className="lang-switcher-pills" style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`nav-pill ${lang === "en" ? "nav-pill-solid" : "nav-pill-outline"}`}
              >
                ENGLISH
              </button>
              <button
                type="button"
                onClick={() => setLang("mr")}
                className={`nav-pill ${lang === "mr" ? "nav-pill-solid" : "nav-pill-outline"}`}
              >
                मराठी
              </button>
            </div>
          )}
        </div>
      )}

      <div className="topbar-right">
        <a href={variant === "home" ? "/about" : "/"} className="nav-about">
          {variant === "home" ? "ABOUT" : "HOME"}
        </a>
      </div>
    </nav>
  );
}
