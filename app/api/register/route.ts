import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateRegistration, type RegistrationInput } from "@/lib/registration";

const fallbackPath = path.join(process.cwd(), "data", "registrations.json");

async function saveLocal(record: RegistrationInput & { createdAt: string }) {
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
  const validation = validateRegistration(payload);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 }
    );
  }

  const record = {
    eventId: payload.eventId!,
    name: payload.name!.trim(),
    phone: payload.phone!.replace(/\s+/g, ""),
    address: payload.address!.trim(),
    canBringTree: payload.canBringTree!,
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
      return NextResponse.json(
        { ok: false, message: "Registration could not be saved.", detail: error.message },
        { status: 500 }
      );
    }
  } else {
    await saveLocal(record);
  }

  return NextResponse.json({ ok: true });
}
