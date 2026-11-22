"use client";

import { useEffect, useState } from "react";
import { Topbar } from "./Topbar";
import { FooterSection } from "@/app/sections/FooterSection";
import { GallerySection } from "@/app/sections/GallerySection";
import { PortfolioSection } from "@/app/sections/PortfolioSection";
import type { EventItem } from "@/lib/events";
import type { GalleryImage } from "@/lib/gallery-store";
import type { Language } from "@/lib/site-content";

type ArchiveProps = { events: EventItem[] } | { images: GalleryImage[] };

export function ArchivePage(props: ArchiveProps) {
  const [lang, setLang] = useState<Language>("en");
  useEffect(() => {
    if (localStorage.getItem("greenpune_lang") === "mr") setLang("mr");
  }, []);

  function changeLanguage(next: Language) {
    setLang(next);
    localStorage.setItem("greenpune_lang", next);
  }

  return (
    <>
      <main className={`archive-page lang-${lang}`} lang={lang}>
        <Topbar lang={lang} setLang={changeLanguage} />
        {"images" in props
          ? <GallerySection lang={lang} initialImages={props.images} />
          : <PortfolioSection lang={lang} events={props.events} />}
      </main>
      <FooterSection lang={lang} />
    </>
  );
}
