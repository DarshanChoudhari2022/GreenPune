"use server";

import { currentEvent } from "@/lib/events";
import { validateRegistration, type RegistrationInput } from "@/lib/registration";

export type RegisterState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof RegistrationInput, string>>;
};

export async function registerParticipant(
  _previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const input: RegistrationInput = {
    eventId: String(formData.get("eventId") || currentEvent.id),
    lang: "mr",
    name: String(formData.get("name") || ""),
    phoneCountryCode: String(formData.get("phoneCountryCode") || "+91"),
    phone: String(formData.get("phone") || ""),
    address: String(formData.get("address") || ""),
    answers: {
      canBringTree: String(formData.get("canBringTree") || "")
    }
  };

  const validation = await validateRegistration(input, "mr");
  if (!validation.ok) {
    return {
      ok: false,
      message: "कृपया आवश्यक माहिती तपासा.",
      errors: validation.errors
    };
  }


  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";
  const response = await fetch(`${baseUrl}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store"
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "नोंदणी जतन झाली नाही. कृपया पुन्हा प्रयत्न करा."
    };
  }

  return {
    ok: true,
    message: "धन्यवाद! तुमची नोंदणी यशस्वी झाली."
  };
}
