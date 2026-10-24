import { NextResponse } from "next/server";
import { adminCookie, adminPassword } from "@/lib/admin";

export async function POST(request: Request) {
  const body = await request.json();
  if (String(body.password || "") !== adminPassword()) {
    return NextResponse.json({ error: "Wrong admin password." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie, "ok", { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}
