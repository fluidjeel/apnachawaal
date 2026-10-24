import { NextResponse } from "next/server";
import { listOrders } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const phone = url.searchParams.get("phone") || "";
  const ids = new Set((url.searchParams.get("ids") || "").split(",").filter(Boolean));
  const orders = (await listOrders()).filter(
    (order) => (phone && order.customer.phone === phone) || ids.has(order.id),
  );
  return NextResponse.json({ orders });
}
