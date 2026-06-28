import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateRegistration, type RegistrationInput } from "@/lib/registration";
import { listRegistrations } from "@/lib/registration-store";

const fallbackPath = path.join(process.cwd(), "data", "registrations.json");

async function saveLocal(record: any) {
  await fs.mkdir(path.dirname(fallbackPath), { recursive: true });

  let existing: unknown[] = [];
  try {
    existing = JSON.parse(await fs.readFile(fallbackPath, "utf8")) as unknown[];
  } catch {
    existing = [];
  }

  existing.push(record);
  await fs.writeFile(fallbackPath, JSON.stringify(existing, null, 2));
}

/**
 * Fast duplicate check — queries Supabase with a targeted filter instead of
 * pulling every registration into memory.  Falls back to the full-list approach
 * only when Supabase is not configured.
 */
async function isDuplicatePhone(
  eventId: string,
  phone: string
): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_TABLE || "event_registrations";

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { count, error } = await supabase
        .from(table)
        .select("id", { count: "exact", head: true })
        .eq("event_id", eventId)
        .eq("phone", phone);

      if (!error && typeof count === "number") {
        return count > 0;
      }
      if (error) {
        console.error("Supabase duplicate-check error (non-blocking):", error.message);
      }
      return false;
    } catch (err: any) {
      console.error("Duplicate check exception (non-blocking):", err.message || err);
      return false;
    }
  }

  // Local fallback: scan the JSON file
  try {
    const existing = await listRegistrations();
    return existing.some(
      (r) =>
        r.eventId === eventId &&
        r.phone.replace(/\s+/g, "") === phone
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let payload: Partial<RegistrationInput>;

  try {
    payload = (await request.json()) as Partial<RegistrationInput>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const validation = await validateRegistration(payload, payload.lang || "mr");

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 }
    );
  }

  // Combine country code and 10-digit phone number
  const cleanPhone = (payload.phone || "").replace(/\s+/g, "");
  const formattedPhone = `+91${cleanPhone}`;
  const trimmedName = (payload.name || "").trim();
  const eventId = payload.eventId || "";

  // Fast duplicate check — phone number only
  const duplicate = await isDuplicatePhone(eventId, formattedPhone);
  if (duplicate) {
    return NextResponse.json(
      {
        ok: false,
        message: payload.lang === "mr"
          ? "या मोबाईल क्रमांकाने आधीच नोंदणी झाली आहे. कृपया दुसरा मोबाईल क्रमांक वापरा."
          : "This mobile number is already registered. Please use a different mobile number."
      },
      { status: 400 }
    );
  }

  // Extract canBringTree for backward compatibility with older entries
  const canBringTree = payload.answers?.canBringTree === "yes" ? "yes" : "no";

  const record = {
    eventId,
    name: trimmedName,
    phone: formattedPhone,
    address: (payload.address || "").trim(),
    canBringTree,
    answers: payload.answers || {},
    createdAt: new Date().toISOString()
  };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_TABLE || "event_registrations";

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from(table).insert({
      event_id: record.eventId,
      name: record.name,
      phone: record.phone,
      address: record.address,
      can_bring_tree: record.canBringTree === "yes",
      created_at: record.createdAt
    });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { 
          ok: false, 
          message: payload.lang === "mr"
            ? `नोंदणी जतन करता आली नाही. (त्रुटी: ${error.message})`
            : `Registration could not be saved. (Error: ${error.message})`, 
          detail: error.message 
        },
        { status: 500 }
      );
    }
  } else {
    try {
      await saveLocal(record);
    } catch (err: any) {
      console.error("Save Local Error:", err);
      return NextResponse.json(
        {
          ok: false,
          message: payload.lang === "mr"
            ? `स्थानिक नोंदणी जतन करताना त्रुटी आली. (त्रुटी: ${err.message || err})`
            : `Failed to save registration locally. (Error: ${err.message || err})`
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  try {
    const list = await listRegistrations();
    return NextResponse.json({ ok: true, count: list.length });
  } catch (err: any) {
    console.error("GET count error:", err);
    return NextResponse.json({ ok: false, count: 0 }, { status: 500 });
  }
}
