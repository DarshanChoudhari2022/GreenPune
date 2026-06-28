import { cookies } from "next/headers";

const cookieName = "greenpune_admin";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "greenpune-admin";
}

function getSessionValue() {
  const rawCreds = `greenpune:${getAdminPassword()}`;
  if (typeof btoa === "function") {
    return btoa(rawCreds).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return Buffer.from(rawCreds).toString("base64url");
}


export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value === getSessionValue();
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, getSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export function validateAdminPassword(password: string) {
  return password === getAdminPassword();
}
