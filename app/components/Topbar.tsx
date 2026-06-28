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
        <div className="topbar-center" />
      )}

      <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {setLang && lang && (
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="nav-about"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
              textTransform: "uppercase"
            }}
          >
            🌐 {lang === "en" ? "मराठी" : "ENGLISH"}
          </button>
        )}
        <a href={variant === "home" ? "/about" : "/"} className="nav-about">
          {variant === "home" ? "ABOUT" : "HOME"}
        </a>
      </div>
    </nav>
  );
}
