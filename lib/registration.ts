import { listQuestions } from "./questions-store";

export type RegistrationInput = {
  eventId: string;
  lang: "en" | "mr";
  name: string;
  phoneCountryCode: string;
  phone: string;
  address: string;
  answers: Record<string, string>;
};

export async function validateRegistration(
  input: Partial<RegistrationInput>,
  preferredLang: "en" | "mr" = "mr"
) {
  const errors: Record<string, string> = {};
  const isMarathi = preferredLang === "mr";

  if (!input.name || input.name.trim().length < 2) {
    errors.name = isMarathi ? "कृपया योग्य नाव टाका." : "Please enter a valid name.";
  }

  const countryCode = input.phoneCountryCode?.trim().replace(/\+/g, "") ?? "";
  if (countryCode !== "91") {
    errors.phoneCountryCode = isMarathi ? "देश कोड +91 असावा." : "Country code must be +91.";
  }

  const phone = input.phone?.replace(/\s+/g, "") ?? "";
  if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.phone = isMarathi
      ? "कृपया १० अंकी वैध संपर्क क्रमांक टाका."
      : "Please enter a valid 10-digit mobile number.";
  }

  // Address is optional, no validation required

  // Validate custom questions
  const questions = await listQuestions();
  const answers = input.answers || {};

  for (const question of questions) {
    const value = answers[question.id];
    if (question.required) {
      if (question.type === "yes_no") {
        if (value !== "yes" && value !== "no") {
          errors[`answers_${question.id}`] = isMarathi
            ? "कृपया एक पर्याय निवडा."
            : "Please select an option.";
        }
      } else {
        if (!value || value.trim().length === 0) {
          errors[`answers_${question.id}`] = isMarathi
            ? "कृपया विचारलेली माहिती भरा."
            : "Please fill out this field.";
        }
      }
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}

