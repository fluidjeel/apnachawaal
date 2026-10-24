"use client";

import Link from "next/link";
import { useShop } from "@/components/shop/ShopState";

export function ShopLinks() {
  const count = useShop().bag.reduce((sum, item) => sum + item.qtyKg, 0);
  return (
    <span className="ml-auto flex gap-4">
      <Link href="/shop">Shop</Link>
      <Link href="/cart">Bag {count}</Link>
    </span>
  );
}
