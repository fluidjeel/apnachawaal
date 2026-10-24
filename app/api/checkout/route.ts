import { NextResponse } from "next/server";
import { createPlaceholderSession, isGateway } from "@/lib/payments";
import { attachPayment, createOrder, findProduct } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const gateway = String(body.gateway || "");
  const customer = {
    name: String(body.name || "").trim(),
    phone: String(body.phone || "").trim(),
    email: String(body.email || "").trim(),
  };
  const lines = Array.isArray(body.items) ? body.items : [];
  if (!isGateway(gateway) || !customer.name || customer.phone.length < 8 || lines.length === 0) {
    return NextResponse.json({ error: "Name, phone, rice, and a payment method are required." }, { status: 400 });
  }

  try {
    const items = [];
    for (const line of lines) {
      const product = await findProduct(String(line.slug));
      const qtyKg = Number(line.qtyKg);
      if (!product || !Number.isInteger(qtyKg) || qtyKg < 1 || qtyKg > 10) {
        return NextResponse.json({ error: "Each rice needs a whole number of kilograms, from 1 to 10." }, { status: 400 });
      }
      items.push({ slug: product.slug, brand: product.brand, qtyKg, pricePaise: product.pricePaise });
    }
    const order = await createOrder({ customer, items, gateway });
    const session = createPlaceholderSession(order.id, gateway, order.totalPaise);
    await attachPayment(order.id, session.sessionId);
    return NextResponse.json({ order, session });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not place the order." }, { status: 409 });
  }
}
