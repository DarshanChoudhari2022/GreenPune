import type { Metadata } from "next";
import { RegisterClient } from "./register-client";
import { getCurrentEvent } from "@/lib/event-store";
import { listQuestions } from "@/lib/questions-store";

export const metadata: Metadata = {
  title: "Register for Tree Plantation Drive",
  description: "Register to participate in the GreenPune native tree plantation drive. Free volunteer registration with post-plantation care stewardship.",
  alternates: {
    canonical: "/register"
  },
  openGraph: {
    title: "Register for Tree Plantation Drive | GreenPune",
    description: "Register to participate in the GreenPune native tree plantation drive. Free volunteer registration.",
    url: "/register",
    type: "website"
  }
};

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const [currentEvent, questions] = await Promise.all([
    getCurrentEvent(),
    listQuestions()
  ]);

  return <RegisterClient currentEvent={currentEvent} questions={questions} />;
}
