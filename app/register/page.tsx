import type { Metadata } from "next";
import { RegisterClient } from "./register-client";
import { getCurrentEvent } from "@/lib/event-store";
import { listQuestions } from "@/lib/questions-store";

export const metadata: Metadata = {
  title: "Register | GreenPune Events",
  description: "Register for the GreenPune tree plantation event."
};

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const [currentEvent, questions] = await Promise.all([
    getCurrentEvent(),
    listQuestions()
  ]);

  return <RegisterClient currentEvent={currentEvent} questions={questions} />;
}
