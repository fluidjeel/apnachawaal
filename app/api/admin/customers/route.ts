import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { listOrders } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin only." }, { status: 401 });
  const orders = await listOrders();
  const byPhone = new Map<string, { name: string; phone: string; email: string; orders: number; spentPaise: number }>();
  for (const order of orders) {
    const key = order.customer.phone;
    const current = byPhone.get(key) || { ...order.customer, orders: 0, spentPaise: 0 };
    current.orders += 1;
    if (!["pending_payment", "payment_failed", "cancelled"].includes(order.status)) current.spentPaise += order.totalPaise;
    byPhone.set(key, current);
  }
  return NextResponse.json({ customers: [...byPhone.values()] });
}
