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

export async function saveQuestionAction(
  _previousState: any,
  formData: FormData
) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  // Generate ID if not specified or clean it
  let id = String(formData.get("id") || "").trim();
  if (!id) {
    id = "q_" + Date.now();
  } else {
    id = id.toLowerCase().replace(/[^a-z0-9_]/g, "");
  }

  const type = String(formData.get("type") || "text") as "text" | "textarea" | "yes_no";
  const labelEnglish = String(formData.get("labelEnglish") || "").trim();
  const labelMarathi = String(formData.get("labelMarathi") || "").trim();
  const placeholderEnglish = String(formData.get("placeholderEnglish") || "").trim();
  const placeholderMarathi = String(formData.get("placeholderMarathi") || "").trim();
  const required = formData.get("required") === "true" || formData.get("required") === "on";

  if (!labelEnglish || !labelMarathi) {
    return { ok: false, message: "Labels are required in both English and Marathi." };
  }

  const { addQuestion, updateQuestion, listQuestions } = await import("@/lib/questions-store");
  const list = await listQuestions();
  const exists = list.some(q => q.id === id);

  const question = {
    id,
    type,
    labelEnglish,
    labelMarathi,
    placeholderEnglish,
    placeholderMarathi,
    required
  };

  if (exists) {
    await updateQuestion(question);
  } else {
    await addQuestion(question);
  }

  revalidatePath("/");
  revalidatePath("/register");
  revalidatePath("/admin");

  return { ok: true, message: "Question saved successfully." };
}

export async function deleteQuestionAction(
  _previousState: any,
  formData: FormData
) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") || "").trim();
  if (!id) {
    return { ok: false, message: "Question ID is required." };
  }

  const { deleteQuestion } = await import("@/lib/questions-store");
  await deleteQuestion(id);

  revalidatePath("/");
  revalidatePath("/register");
  revalidatePath("/admin");

  return { ok: true, message: "Question deleted successfully." };
}

