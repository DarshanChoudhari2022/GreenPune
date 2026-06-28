"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  validateAdminPassword
} from "@/lib/admin-auth";
import { eventFromFormData, upsertEvent, validateEvent } from "@/lib/event-store";

export type AdminLoginState = {
  error?: string;
};

export type EventFormState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const password = String(formData.get("password") || "");

  if (!validateAdminPassword(password)) {
    return { error: "Invalid admin password." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveEvent(
  _previousState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const event = eventFromFormData(formData);
  const validation = validateEvent(event);

  if (!validation.ok) {
    return {
      ok: false,
      message: "Please fix the event details.",
      errors: validation.errors as Record<string, string>
    };
  }

  await upsertEvent(event);
  revalidatePath("/");
  revalidatePath("/register");
  revalidatePath("/admin");

  return {
    ok: true,
    message: "Event saved and published on the site."
  };
}
