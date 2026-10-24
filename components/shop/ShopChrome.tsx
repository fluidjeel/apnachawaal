"use client";

import Link from "next/link";
import { useShop } from "@/components/shop/ShopState";

export function ShopChrome({ children }: { children: React.ReactNode }) {
  const { bag, wishlist } = useShop();
  const count = bag.reduce((sum, item) => sum + item.qtyKg, 0);
  return (
    <div className="min-h-screen bg-[#14080E] text-[#F4E6C8]">
      <header className="flex items-center gap-5 px-[6vw] py-6 text-[0.68rem] uppercase tracking-[0.18em] text-[#E2B657]">
        <Link href="/">ApnaChawal</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/wishlist">Saved {wishlist.length}</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/cart" className="ml-auto">
          Bag {count}
        </Link>
      </header>
      <main className="px-[6vw] pb-20">{children}</main>
    </div>
  );
}
