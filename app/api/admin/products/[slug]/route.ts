import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { findProduct, saveProduct } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin only." }, { status: 401 });
  const { slug } = await params;
  const current = await findProduct(slug, true);
  if (!current) return NextResponse.json({ error: "Rice not found." }, { status: 404 });
  const body = await request.json();
  const product = {
    ...current,
    brand: body.brand ?? current.brand,
    state: body.state ?? current.state,
    line: body.line ?? current.line,
    stockKg: body.stockKg === undefined ? current.stockKg : Number(body.stockKg),
    pricePaise: body.priceRupees === undefined ? current.pricePaise : Math.round(Number(body.priceRupees) * 100),
    archived: body.archived === undefined ? current.archived : Boolean(body.archived),
  };
  return NextResponse.json({ product: await saveProduct(product) });
}
