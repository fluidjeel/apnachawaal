import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { listOrders } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin only." }, { status: 401 });
  return NextResponse.json({ orders: await listOrders() });
}
