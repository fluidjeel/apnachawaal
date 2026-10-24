import { NextResponse } from "next/server";
import { findOrder, setOrderStatus } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const order = await findOrder(String(body.orderId || ""));
  if (!order || order.paymentSessionId !== body.sessionId || order.gateway !== body.gateway) {
    return NextResponse.json({ error: "Payment session does not match this order." }, { status: 400 });
  }
  if (order.status !== "pending_payment") {
    return NextResponse.json({ order });
  }
  const updated = await setOrderStatus(order.id, "processing", `Placeholder ${order.gateway} payment accepted. No money moved.`);
  return NextResponse.json({ order: updated });
}
