import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

export type RegistrationRecord = {
  id?: string;
  eventId: string;
  name: string;
  phone: string;
  address: string;
  canBringTree: "yes" | "no";
  createdAt: string;
};

const fallbackPath = path.join(process.cwd(), "data", "registrations.json");

export async function listRegistrations(): Promise<RegistrationRecord[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_TABLE || "event_registrations";

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from(table)
      .select("id,event_id,name,phone,address,can_bring_tree,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((record) => ({
      id: record.id,
      eventId: record.event_id,
      name: record.name,
      phone: record.phone,
      address: record.address,
      canBringTree: record.can_bring_tree ? "yes" : "no",
      createdAt: record.created_at
    }));
  }

  try {
    const raw = await fs.readFile(fallbackPath, "utf8");
    const records = JSON.parse(raw) as RegistrationRecord[];
    return records.toReversed();
  } catch {
    return [];
  }
}
