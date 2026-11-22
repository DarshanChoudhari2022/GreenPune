import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "greenpune_admin";
const sessionSeconds = 8 * 60 * 60;

function getAdminPassword() {
  const configured = process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== "production") return configured || "greenpune-admin";
  return configured && configured !== "greenpune-admin" ? configured : undefined;
}

function sign(expiry: string, password: string) {
  return createHmac("sha256", password).update(`greenpune-admin:${expiry}`).digest("base64url");
}

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function isAdminAuthenticated() {
  const password = getAdminPassword();
  if (!password) return false;
  const cookieStore = await cookies();
  const match = cookieStore.get(cookieName)?.value.match(/^(\d+)\.([\w-]+)$/);
  if (!match || Number(match[1]) <= Date.now()) return false;
  return equal(match[2], sign(match[1], password));
}

export async function setAdminSession() {
  const password = getAdminPassword();
  if (!password) throw new Error("Admin login is not configured.");
  const expiry = String(Date.now() + sessionSeconds * 1000);
  const cookieStore = await cookies();
  cookieStore.set(cookieName, `${expiry}.${sign(expiry, password)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionSeconds
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export function validateAdminPassword(password: string) {
  const configured = getAdminPassword();
  return Boolean(configured && equal(password, configured));
}
