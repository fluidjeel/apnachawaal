"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { formatRupees, type Product } from "@/lib/shop-catalog";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [badge, setBadge] = useState("");
  const [dish, setDish] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  const states = [...new Set(products.map((product) => product.state))];
  const badges = [...new Set(products.flatMap((product) => product.badges))];
  const dishes = [...new Set(products.flatMap((product) => product.dishes))];
  const shown = useMemo(
    () =>
      products.filter((product) => {
        const haystack = `${product.brand} ${product.line} ${product.dishes.join(" ")}`.toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (!state || product.state === state) &&
          (!badge || product.badges.includes(badge)) &&
          (!dish || product.dishes.includes(dish))
        );
      }),
    [products, query, state, badge, dish],
  );

  return (
    <ShopChrome>
      <h1 className="text-4xl font-medium tracking-tight">The ten rices</h1>
      <p className="mt-3 max-w-xl text-sm text-[#F4E6C8]/70">Prices are placeholders, not offers.</p>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rice or dish" className="bg-transparent border border-[#E2B657]/50 px-3 py-2" />
        <select value={state} onChange={(event) => setState(event.target.value)} className="bg-[#14080E] border border-[#E2B657]/50 px-3 py-2">
          <option value="">All states</option>
          {states.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={badge} onChange={(event) => setBadge(event.target.value)} className="bg-[#14080E] border border-[#E2B657]/50 px-3 py-2">
          <option value="">All badges</option>
          {badges.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={dish} onChange={(event) => setDish(event.target.value)} className="bg-[#14080E] border border-[#E2B657]/50 px-3 py-2">
          <option value="">All dishes</option>
          {dishes.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {shown.map((product) => (
          <li key={product.slug} className="border border-[#E2B657]/30 p-5">
            <Link href={`/shop/${product.slug}`} className="text-2xl text-[#E2B657]">{product.brand}</Link>
            <p className="mt-2 text-sm text-[#F4E6C8]/70">{product.state} · {product.stockKg} kg left</p>
            <p className="mt-3">{product.line}</p>
            <p className="mt-4">{formatRupees(product.pricePaise)} / kg</p>
          </li>
        ))}
      </ul>
    </ShopChrome>
  );
}
