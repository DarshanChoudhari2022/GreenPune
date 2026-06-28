import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { events as fallbackEvents, type EventItem } from "./events";

const fallbackPath = path.join(process.cwd(), "data", "events.json");

function normalizeStatus(status: FormDataEntryValue | null): EventItem["status"] {
  if (status === "completed" || status === "upcoming" || status === "open") {
    return status;
  }
  return "upcoming";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function eventFromFormData(formData: FormData): EventItem {
  const titleEnglish = String(formData.get("titleEnglish") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const id =
    String(formData.get("id") || "").trim() ||
    slugify(`${titleEnglish || "greenpune-event"}-${date || Date.now()}`);

  return {
    id,
    title: titleEnglish,
    titleEnglish,
    titleDevanagari: String(formData.get("titleDevanagari") || titleEnglish).trim(),
    organizer: String(formData.get("organizer") || "").trim(),
    organizerEnglish: String(formData.get("organizerEnglish") || "").trim(),
    date,
    dateLabel: String(formData.get("dateLabel") || "").trim(),
    dateLabelEnglish: String(formData.get("dateLabelEnglish") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    locationEnglish: String(formData.get("locationEnglish") || "").trim(),
    theme: String(formData.get("theme") || "").trim(),
    themeEnglish: String(formData.get("themeEnglish") || "").trim(),
    summary: String(formData.get("summary") || "").trim(),
    summaryMarathi: String(formData.get("summaryMarathi") || "").trim(),
    status: normalizeStatus(formData.get("status"))
  };
}

export function validateEvent(event: EventItem) {
  const errors: Partial<Record<keyof EventItem, string>> = {};

  if (!event.titleEnglish || event.titleEnglish.length < 3) {
    errors.titleEnglish = "English title is required.";
  }
  if (!event.titleDevanagari || event.titleDevanagari.length < 3) {
    errors.titleDevanagari = "Marathi title is required.";
  }
  if (!event.date) {
    errors.date = "Date is required.";
  }
  if (!event.dateLabel || !event.dateLabelEnglish) {
    errors.dateLabel = "Date labels are required.";
  }
  if (!event.location || !event.locationEnglish) {
    errors.location = "Location is required in both languages.";
  }
  if (!event.summary || !event.summaryMarathi) {
    errors.summary = "Summary is required in both languages.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}

async function readLocalEvents() {
  try {
    const raw = await fs.readFile(fallbackPath, "utf8");
    const events = JSON.parse(raw) as EventItem[];
    return events.length > 0 ? events : fallbackEvents;
  } catch {
    return fallbackEvents;
  }
}

async function writeLocalEvents(events: EventItem[]) {
  await fs.mkdir(path.dirname(fallbackPath), { recursive: true });
  await fs.writeFile(fallbackPath, JSON.stringify(events, null, 2));
}

export async function listEvents(): Promise<EventItem[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_EVENTS_TABLE || "events";

  if (supabaseUrl && supabaseKey && process.env.SUPABASE_EVENTS_TABLE) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase error listing events, falling back to local:", error.message);
      } else if (data) {
        return (data || []).map((record) => ({
          id: record.id,
          title: record.title_english,
          titleEnglish: record.title_english,
          titleDevanagari: record.title_devanagari,
          organizer: record.organizer,
          organizerEnglish: record.organizer_english,
          date: record.date,
          dateLabel: record.date_label,
          dateLabelEnglish: record.date_label_english,
          location: record.location,
          locationEnglish: record.location_english,
          theme: record.theme,
          themeEnglish: record.theme_english,
          summary: record.summary,
          summaryMarathi: record.summary_marathi,
          status: record.status
        }));
      }
    } catch (e: any) {
      console.error("Supabase exception listing events, falling back to local:", e.message || e);
    }
  }

  return readLocalEvents();
}

export async function getCurrentEvent() {
  const events = await listEvents();
  return events.find((event) => event.status === "open") || events[0] || fallbackEvents[0];
}

export async function upsertEvent(event: EventItem) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_EVENTS_TABLE || "events";

  if (supabaseUrl && supabaseKey && process.env.SUPABASE_EVENTS_TABLE) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from(table).upsert({
        id: event.id,
        title_english: event.titleEnglish,
        title_devanagari: event.titleDevanagari,
        organizer: event.organizer,
        organizer_english: event.organizerEnglish,
        date: event.date,
        date_label: event.dateLabel,
        date_label_english: event.dateLabelEnglish,
        location: event.location,
        location_english: event.locationEnglish,
        theme: event.theme,
        theme_english: event.themeEnglish,
        summary: event.summary,
        summary_marathi: event.summaryMarathi,
        status: event.status
      });

      if (!error) {
        return;
      }
      console.error("Supabase upsert event error, falling back to local:", error.message);
    } catch (e: any) {
      console.error("Supabase upsert event exception, falling back to local:", e.message || e);
    }
  }

  const events = await readLocalEvents();
  const nextEvents = event.status === "open"
    ? events.map((item) => ({ ...item, status: item.id === event.id ? item.status : "upcoming" as const }))
    : events;
  const index = nextEvents.findIndex((item) => item.id === event.id);

  if (index >= 0) {
    nextEvents[index] = event;
  } else {
    nextEvents.unshift(event);
  }

  await writeLocalEvents(nextEvents);
}
