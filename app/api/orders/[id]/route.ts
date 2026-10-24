import { NextResponse } from "next/server";
import { findOrder, setOrderStatus, type OrderStatus } from "@/lib/store";

export const dynamic = "force-dynamic";

const customerMoves: Record<string, { to: OrderStatus; from: OrderStatus[]; note: string }> = {
  cancel: {
    to: "cancelled",
    from: ["pending_payment", "payment_failed", "processing"],
    note: "Cancelled by the customer.",
  },
  return: {
    to: "return_requested",
    from: ["delivered"],
    note: "Return requested by the customer.",
  },
};

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await findOrder(id);
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ order });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const move = customerMoves[String(body.action)];
  const order = await findOrder(id);
  if (!order || !move) return NextResponse.json({ error: "That update is not available." }, { status: 400 });
  if (!move.from.includes(order.status)) {
    return NextResponse.json({ error: `This order cannot be ${body.action}d from ${order.status}.` }, { status: 409 });
  }
  return NextResponse.json({ order: await setOrderStatus(id, move.to, move.note) });
}
