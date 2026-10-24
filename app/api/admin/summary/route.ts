import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { listOrders, listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin only." }, { status: 401 });
  const [orders, products] = await Promise.all([listOrders(), listProducts(true)]);
  const paid = orders.filter((order) => !["pending_payment", "payment_failed", "cancelled"].includes(order.status));
  const counts = Object.fromEntries(
    ["pending_payment", "processing", "shipped", "delivered", "cancelled", "return_requested", "returned", "payment_failed"].map(
      (status) => [status, orders.filter((order) => order.status === status).length],
    ),
  );
  return NextResponse.json({
    orderCount: orders.length,
    revenuePaise: paid.reduce((sum, order) => sum + order.totalPaise, 0),
    counts,
    lowStock: products.filter((product) => !product.archived && product.stockKg < 5),
  });
}
