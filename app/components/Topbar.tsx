"use client";

import Image from "next/image";
import Link from "next/link";
import { type Language } from "@/lib/site-content";
import { LanguageToggle } from "./LanguageToggle";

interface TopbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: {
    nav: {
      events: string;
      mission: string;
      insights: string;
      contact: string;
      join: string;
      register: string;
    };
  };
  variant?: "home" | "register";
}

export function Topbar({ lang, setLang, t, variant = "home" }: TopbarProps) {
  const isRegister = variant === "register";

  return (
    <nav
      className={`topbar ${isRegister ? "register-topbar" : ""}`}
      aria-label="Primary navigation"
      data-pinned
    >
      <Link className="brand" href="/" aria-label="GreenPune home">
        <Image
          alt="GreenPune"
          className="brand-logo"
          height={42}
          priority
          src="/images/greenpune-logo.png"
          width={176}
        />
      </Link>

      {!isRegister && (
        <div className="nav-links">
          <a href="#events">{t.nav.events}</a>
          <a href="#mission">{t.nav.mission}</a>
          <a href="#insights">{t.nav.insights}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
      )}

      <div className="nav-actions">
        <LanguageToggle lang={lang} setLang={setLang} />
        <Link className="nav-cta" href={isRegister ? "/" : "/register"}>
          {isRegister ? "Home" : t.nav.join}
        </Link>
      </div>
    </nav>
  );
}
