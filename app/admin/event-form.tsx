"use client";

import { useActionState, useState } from "react";
import { type EventItem } from "@/lib/events";
import { saveEvent } from "./actions";

async function translateText(text: string): Promise<string> {
  if (!text || !text.trim()) return "";
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=mr&dt=t&q=${encodeURIComponent(text.trim())}`;
    const res = await fetch(url);
    if (!res.ok) return "";
    const json = await res.json();
    if (json && json[0]) {
      return json[0].map((x: any) => x[0]).join("");
    }
  } catch (error) {
    console.error("Translation failed:", error);
  }
  return "";
}

export function EventForm({ event }: { event: EventItem }) {
  const [state, formAction, pending] = useActionState(saveEvent, {});

  const [formDataState, setFormDataState] = useState({
    status: event.status || "open",
    date: event.date || "",
    titleEnglish: event.titleEnglish || "",
    titleDevanagari: event.titleDevanagari || "",
    organizerEnglish: event.organizerEnglish || "",
    organizer: event.organizer || "",
    dateLabelEnglish: event.dateLabelEnglish || "",
    dateLabel: event.dateLabel || "",
    locationEnglish: event.locationEnglish || "",
    location: event.location || "",
    themeEnglish: event.themeEnglish || "",
    theme: event.theme || "",
    summary: event.summary || "",
    summaryMarathi: event.summaryMarathi || "",
  });

  const [translating, setTranslating] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoTranslate = async (englishKey: keyof typeof formDataState, marathiKey: keyof typeof formDataState, force = false) => {
    const englishVal = formDataState[englishKey];
    const marathiVal = formDataState[marathiKey];

    // Only translate if there is English text AND (Marathi is empty OR force translate is clicked)
    if (englishVal && (force || !marathiVal)) {
      setTranslating((prev) => ({ ...prev, [marathiKey]: true }));
      const translated = await translateText(englishVal);
      if (translated) {
        setFormDataState((prev) => ({ ...prev, [marathiKey]: translated }));
      }
      setTranslating((prev) => ({ ...prev, [marathiKey]: false }));
    }
  };

  return (
    <form action={formAction} className="admin-event-form">
      <input name="id" type="hidden" value={event.id} />
      <div className="admin-form-grid">
        <label>
          <span>Status</span>
          <select 
            value={formDataState.status} 
            name="status"
            onChange={handleChange}
          >
            <option value="open">Open current event</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          <span>Date</span>
          <input 
            value={formDataState.date} 
            name="date" 
            type="date"
            onChange={handleChange}
          />
        </label>

        {/* Title */}
        <label>
          <span>English title</span>
          <input 
            value={formDataState.titleEnglish} 
            name="titleEnglish"
            onChange={handleChange}
            onBlur={() => handleAutoTranslate("titleEnglish", "titleDevanagari")}
          />
        </label>
        <label style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span>Marathi title</span>
            {translating.titleDevanagari ? (
              <span style={{ fontSize: "11px", color: "var(--leaf)", fontWeight: "normal" }}>Translating...</span>
            ) : (
              formDataState.titleEnglish && (
                <button 
                  type="button" 
                  style={{ background: "none", border: "none", color: "var(--leaf)", fontSize: "11px", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                  onClick={() => handleAutoTranslate("titleEnglish", "titleDevanagari", true)}
                >
                  Translate
                </button>
              )
            )}
          </div>
          <input 
            value={formDataState.titleDevanagari} 
            name="titleDevanagari"
            onChange={handleChange}
          />
        </label>

        {/* Organizer */}
        <label>
          <span>English organizer</span>
          <input 
            value={formDataState.organizerEnglish} 
            name="organizerEnglish"
            onChange={handleChange}
            onBlur={() => handleAutoTranslate("organizerEnglish", "organizer")}
          />
        </label>
        <label style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span>Marathi organizer</span>
            {translating.organizer ? (
              <span style={{ fontSize: "11px", color: "var(--leaf)", fontWeight: "normal" }}>Translating...</span>
            ) : (
              formDataState.organizerEnglish && (
                <button 
                  type="button" 
                  style={{ background: "none", border: "none", color: "var(--leaf)", fontSize: "11px", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                  onClick={() => handleAutoTranslate("organizerEnglish", "organizer", true)}
                >
                  Translate
                </button>
              )
            )}
          </div>
          <input 
            value={formDataState.organizer} 
            name="organizer"
            onChange={handleChange}
          />
        </label>

        {/* Date Label */}
        <label>
          <span>English date label</span>
          <input 
            value={formDataState.dateLabelEnglish} 
            name="dateLabelEnglish"
            onChange={handleChange}
            onBlur={() => handleAutoTranslate("dateLabelEnglish", "dateLabel")}
          />
        </label>
        <label style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span>Marathi date label</span>
            {translating.dateLabel ? (
              <span style={{ fontSize: "11px", color: "var(--leaf)", fontWeight: "normal" }}>Translating...</span>
            ) : (
              formDataState.dateLabelEnglish && (
                <button 
                  type="button" 
                  style={{ background: "none", border: "none", color: "var(--leaf)", fontSize: "11px", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                  onClick={() => handleAutoTranslate("dateLabelEnglish", "dateLabel", true)}
                >
                  Translate
                </button>
              )
            )}
          </div>
          <input 
            value={formDataState.dateLabel} 
            name="dateLabel"
            onChange={handleChange}
          />
        </label>

        {/* Location */}
        <label>
          <span>English location</span>
          <input 
            value={formDataState.locationEnglish} 
            name="locationEnglish"
            onChange={handleChange}
            onBlur={() => handleAutoTranslate("locationEnglish", "location")}
          />
        </label>
        <label style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span>Marathi location</span>
            {translating.location ? (
              <span style={{ fontSize: "11px", color: "var(--leaf)", fontWeight: "normal" }}>Translating...</span>
            ) : (
              formDataState.locationEnglish && (
                <button 
                  type="button" 
                  style={{ background: "none", border: "none", color: "var(--leaf)", fontSize: "11px", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                  onClick={() => handleAutoTranslate("locationEnglish", "location", true)}
                >
                  Translate
                </button>
              )
            )}
          </div>
          <input 
            value={formDataState.location} 
            name="location"
            onChange={handleChange}
          />
        </label>

        {/* Theme */}
        <label>
          <span>English theme</span>
          <input 
            value={formDataState.themeEnglish} 
            name="themeEnglish"
            onChange={handleChange}
            onBlur={() => handleAutoTranslate("themeEnglish", "theme")}
          />
        </label>
        <label style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span>Marathi theme</span>
            {translating.theme ? (
              <span style={{ fontSize: "11px", color: "var(--leaf)", fontWeight: "normal" }}>Translating...</span>
            ) : (
              formDataState.themeEnglish && (
                <button 
                  type="button" 
                  style={{ background: "none", border: "none", color: "var(--leaf)", fontSize: "11px", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                  onClick={() => handleAutoTranslate("themeEnglish", "theme", true)}
                >
                  Translate
                </button>
              )
            )}
          </div>
          <input 
            value={formDataState.theme} 
            name="theme"
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Summary */}
      <label>
        <span>English summary</span>
        <textarea 
          value={formDataState.summary} 
          name="summary" 
          rows={3}
          onChange={handleChange}
          onBlur={() => handleAutoTranslate("summary", "summaryMarathi")}
        />
      </label>
      <label style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <span>Marathi summary</span>
          {translating.summaryMarathi ? (
            <span style={{ fontSize: "11px", color: "var(--leaf)", fontWeight: "normal" }}>Translating...</span>
          ) : (
            formDataState.summary && (
              <button 
                type="button" 
                style={{ background: "none", border: "none", color: "var(--leaf)", fontSize: "11px", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                onClick={() => handleAutoTranslate("summary", "summaryMarathi", true)}
              >
                Translate
              </button>
            )
          )}
        </div>
        <textarea 
          value={formDataState.summaryMarathi} 
          name="summaryMarathi" 
          rows={3}
          onChange={handleChange}
        />
      </label>

      {state.message ? (
        <p className={state.ok ? "admin-success" : "admin-error"}>{state.message}</p>
      ) : null}
      <button disabled={pending} type="submit">
        {pending ? "Publishing..." : "Publish event"}
      </button>
    </form>
  );
}
