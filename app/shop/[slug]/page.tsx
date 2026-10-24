"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { useShop } from "@/components/shop/ShopState";
import { formatRupees, type Product } from "@/lib/shop-catalog";

type Review = { id: string; name: string; rating: number; text: string };

export default function RiceShopPage() {
  const slug = String(useParams().slug || "");
  const shop = useShop();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [note, setNote] = useState({ name: "", rating: "5", text: "" });
  const [message, setMessage] = useState("");

  function load() {
    fetch("/api/products").then((response) => response.json()).then((data) => {
      setProduct((data.products || []).find((item: Product) => item.slug === slug) || null);
    });
    fetch(`/api/reviews?slug=${slug}`).then((response) => response.json()).then((data) => setReviews(data.reviews || []));
  }
  useEffect(load, [slug]);

  if (!product) return <ShopChrome><p>Looking up that rice.</p></ShopChrome>;

  return (
    <ShopChrome>
      <p className="text-xs uppercase tracking-[0.18em] text-[#E2B657]">{product.state}</p>
      <h1 className="mt-2 text-4xl">{product.brand}</h1>
      <p className="mt-4 max-w-xl">{product.line}</p>
      <p className="mt-4">{formatRupees(product.pricePaise)} / kg · {product.stockKg} kg in stock</p>
      <p className="mt-1 text-sm text-[#F4E6C8]/60">{product.priceNote}</p>
      <p className="mt-4 text-sm">{product.badges.join(" · ")}</p>
      <p className="mt-2 text-sm">Dishes: {product.dishes.join(", ")}</p>
      <div className="mt-6 flex gap-3">
        <button className="border border-[#E2B657] px-4 py-2" onClick={() => shop.add(product.slug)}>Add 1 kg to bag</button>
        <button className="border border-[#E2B657]/50 px-4 py-2" onClick={() => shop.toggleWish(product.slug)}>
          {shop.wishlist.includes(product.slug) ? "Saved" : "Save"}
        </button>
      </div>
      <form
        className="mt-12 max-w-md space-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch("/api/reviews", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ slug, name: note.name, rating: Number(note.rating), text: note.text }),
          });
          const data = await response.json();
          setMessage(data.error || "Note saved.");
          if (response.ok) setNote({ name: "", rating: "5", text: "" });
          load();
        }}
      >
        <h2 className="text-xl">Notes from the table</h2>
        <input value={note.name} onChange={(event) => setNote({ ...note, name: event.target.value })} placeholder="Name" className="w-full bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <input value={note.rating} onChange={(event) => setNote({ ...note, rating: event.target.value })} placeholder="Rating 1-5" className="w-full bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <textarea value={note.text} onChange={(event) => setNote({ ...note, text: event.target.value })} placeholder="What did you cook?" className="w-full bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <button className="border border-[#E2B657] px-4 py-2">Leave a note</button>
        {message ? <p>{message}</p> : null}
      </form>
      <ul className="mt-6 space-y-3">
        {reviews.map((review) => (
          <li key={review.id} className="border-t border-[#E2B657]/20 pt-3">
            <p>{review.name} · {review.rating}/5</p>
            <p className="text-sm text-[#F4E6C8]/75">{review.text}</p>
          </li>
        ))}
      </ul>
    </ShopChrome>
  );
}
