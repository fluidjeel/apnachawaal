"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { useShop } from "@/components/shop/ShopState";
import { formatRupees, type Product } from "@/lib/shop-catalog";

export default function CartPage() {
  const shop = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/products").then((response) => response.json()).then((data) => setProducts(data.products || []));
  }, []);
  const rows = shop.bag.map((item) => ({ ...item, product: products.find((product) => product.slug === item.slug) }));
  const total = rows.reduce((sum, row) => sum + (row.product?.pricePaise || 0) * row.qtyKg, 0);

  return (
    <ShopChrome>
      <h1 className="text-4xl">Bag</h1>
      <ul className="mt-8 max-w-xl space-y-4">
        {rows.map((row) => (
          <li key={row.slug} className="flex items-center justify-between border-b border-[#E2B657]/20 pb-3">
            <span>{row.product?.brand || row.slug}</span>
            <span className="flex items-center gap-3">
              <button onClick={() => shop.setQty(row.slug, row.qtyKg - 1)}>-</button>
              <span>{row.qtyKg} kg</span>
              <button onClick={() => shop.setQty(row.slug, row.qtyKg + 1)}>+</button>
              <span>{row.product ? formatRupees(row.product.pricePaise * row.qtyKg) : ""}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6">Total {formatRupees(total)}</p>
      <Link href="/checkout" className="mt-6 inline-block border border-[#E2B657] px-4 py-2">Checkout</Link>
    </ShopChrome>
  );
}
