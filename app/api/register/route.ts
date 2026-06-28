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

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<RegistrationInput>;
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

  // Duplicate Check: Check if name + phone already exists for this event
  try {
    const existing = await listRegistrations();
    const isDuplicate = existing.some(
      (r) =>
        r.eventId === eventId &&
        r.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
        r.phone.replace(/\s+/g, "") === formattedPhone
    );

    if (isDuplicate) {
      return NextResponse.json(
        {
          ok: false,
          message: payload.lang === "mr"
            ? "या नावाने आणि मोबाईल क्रमांकाने आधीच नोंदणी केली आहे."
            : "A registration with this name and mobile number already exists for this event."
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("Duplicate check failed:", err);
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

