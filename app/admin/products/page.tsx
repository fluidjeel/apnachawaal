"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/shop/AdminNav";
import { ShopChrome } from "@/components/shop/ShopChrome";
import type { Product } from "@/lib/shop-catalog";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState({ slug: "", brand: "", state: "", priceRupees: "", stockKg: "" });

  function load() {
    fetch("/api/admin/products").then(async (response) => {
      if (response.status === 401) router.push("/admin/login");
      else setProducts((await response.json()).products || []);
    });
  }
  useEffect(load, [router]);

  async function save(product: Product, patch: Record<string, unknown>) {
    await fetch(`/api/admin/products/${product.slug}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
    load();
  }

  return (
    <ShopChrome>
      <AdminNav />
      <h1 className="text-4xl">Rices</h1>
      <ul className="mt-8 space-y-4">
        {products.map((product) => (
          <li key={product.slug} className="grid gap-2 border-b border-[#E2B657]/20 pb-3 md:grid-cols-[1fr_8rem_8rem_auto]">
            <span>{product.brand} {product.archived ? "(archived)" : ""}</span>
            <input defaultValue={product.stockKg} className="bg-transparent border border-[#E2B657]/30 px-2 py-1" onBlur={(event) => save(product, { stockKg: Number(event.target.value) })} />
            <input defaultValue={product.pricePaise / 100} className="bg-transparent border border-[#E2B657]/30 px-2 py-1" onBlur={(event) => save(product, { priceRupees: Number(event.target.value) })} />
            <button onClick={() => save(product, { archived: !product.archived })}>{product.archived ? "Restore" : "Archive"}</button>
          </li>
        ))}
      </ul>
      <form
        className="mt-10 grid max-w-xl gap-2"
        onSubmit={async (event) => {
          event.preventDefault();
          await fetch("/api/admin/products", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(draft),
          });
          setDraft({ slug: "", brand: "", state: "", priceRupees: "", stockKg: "" });
          load();
        }}
      >
        <h2 className="text-xl">Add a rice</h2>
        {(["slug", "brand", "state", "priceRupees", "stockKg"] as const).map((field) => (
          <input key={field} value={draft[field]} placeholder={field} onChange={(event) => setDraft({ ...draft, [field]: event.target.value })} className="bg-transparent border border-[#E2B657]/30 px-3 py-2" />
        ))}
        <button className="border border-[#E2B657] px-4 py-2">Add</button>
      </form>
    </ShopChrome>
  );
}
