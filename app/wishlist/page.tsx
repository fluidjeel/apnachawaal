"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { useShop } from "@/components/shop/ShopState";
import type { Product } from "@/lib/shop-catalog";

export default function WishlistPage() {
  const { wishlist, toggleWish } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/products").then((response) => response.json()).then((data) => setProducts(data.products || []));
  }, []);
  const saved = products.filter((product) => wishlist.includes(product.slug));
  return (
    <ShopChrome>
      <h1 className="text-4xl">Saved</h1>
      <ul className="mt-8 space-y-3">
        {saved.map((product) => (
          <li key={product.slug} className="flex gap-4">
            <Link href={`/shop/${product.slug}`}>{product.brand}</Link>
            <button onClick={() => toggleWish(product.slug)}>Remove</button>
          </li>
        ))}
      </ul>
    </ShopChrome>
  );
}
