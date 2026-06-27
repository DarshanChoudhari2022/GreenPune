export type RegistrationInput = {
  eventId: string;
  name: string;
  phone: string;
  address: string;
  canBringTree: "yes" | "no";
};

export function validateRegistration(input: Partial<RegistrationInput>) {
  const errors: Partial<Record<keyof RegistrationInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = "कृपया योग्य नाव टाका.";
  }

  const phone = input.phone?.replace(/\s+/g, "") ?? "";
  if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.phone = "कृपया १० अंकी संपर्क क्रमांक टाका.";
  }

  if (!input.address || input.address.trim().length < 6) {
    errors.address = "कृपया पूर्ण पत्ता टाका.";
  }

  if (input.canBringTree !== "yes" && input.canBringTree !== "no") {
    errors.canBringTree = "कृपया एक पर्याय निवडा.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}
