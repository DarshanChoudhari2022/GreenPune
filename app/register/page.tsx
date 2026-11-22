import { pageMetadata } from "@/lib/site-metadata";
import { RegisterClient } from "./register-client";
import { getCurrentEvent } from "@/lib/event-store";
import { listQuestions } from "@/lib/questions-store";

export const metadata = pageMetadata(
  "/register",
  "Register for Tree Plantation Drive",
  "Register to participate in the GreenPune native tree plantation drive. Free volunteer registration with post-plantation care stewardship."
);

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const [currentEvent, questions] = await Promise.all([
    getCurrentEvent(),
    listQuestions()
  ]);

  return <RegisterClient currentEvent={currentEvent} questions={questions} />;
}
