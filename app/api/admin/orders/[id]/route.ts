import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { setOrderStatus, type OrderStatus } from "@/lib/store";

export const dynamic = "force-dynamic";

const allowed: OrderStatus[] = ["processing", "shipped", "delivered", "cancelled", "returned"];

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin only." }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const status = String(body.status) as OrderStatus;
  if (!allowed.includes(status)) return NextResponse.json({ error: "Unknown status." }, { status: 400 });
  const order = await setOrderStatus(id, status, `Set by admin to ${status}.`);
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ order });
}
