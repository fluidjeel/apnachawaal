import { NextResponse } from "next/server";
import { addReview, findProduct, listReviews } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") || undefined;
  return NextResponse.json({ reviews: await listReviews(slug) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const slug = String(body.slug || "");
  const name = String(body.name || "").trim();
  const text = String(body.text || "").trim();
  const rating = Number(body.rating);
  if (!(await findProduct(slug)) || !name || !text || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "A rice, a name, a rating from 1 to 5, and a note are required." }, { status: 400 });
  }
  return NextResponse.json({ review: await addReview({ slug, name, rating, text }) });
}
