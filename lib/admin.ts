import { cookies } from "next/headers";

export const adminCookie = "apna_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "placeholder-admin";
}

export async function isAdmin() {
  const jar = await cookies();
  return jar.get(adminCookie)?.value === "ok";
}
