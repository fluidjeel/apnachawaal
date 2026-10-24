import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import type { Product } from "@/lib/shop-catalog";
import { findProduct, listProducts, saveProduct } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin only." }, { status: 401 });
  return NextResponse.json({ products: await listProducts(true) });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin only." }, { status: 401 });
  const body = await request.json();
  const slug = String(body.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  if (!slug || !String(body.brand || "").trim()) {
    return NextResponse.json({ error: "A slug and a brand name are required." }, { status: 400 });
  }
  if (await findProduct(slug, true)) return NextResponse.json({ error: "That rice already exists." }, { status: 409 });
  const product: Product = {
    slug,
    name: String(body.name || body.brand),
    brand: String(body.brand),
    state: String(body.state || ""),
    line: String(body.line || ""),
    badges: [],
    dishes: [],
    pricePaise: Math.round(Number(body.priceRupees || 0) * 100),
    stockKg: Number(body.stockKg || 0),
    archived: false,
    image: "/mockups/modern-rice.jpg",
    priceNote: "Added in admin. Not a real offer until you price it.",
  };
  return NextResponse.json({ product: await saveProduct(product) });
}
