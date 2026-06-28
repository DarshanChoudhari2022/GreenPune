import type { Metadata } from "next";
import { RegisterClient } from "./register-client";
import { getCurrentEvent } from "@/lib/event-store";

export const metadata: Metadata = {
  title: "Register | GreenPune Events",
  description: "Register for the GreenPune tree plantation event."
};

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const currentEvent = await getCurrentEvent();

  return <RegisterClient currentEvent={currentEvent} />;
}
