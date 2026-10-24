"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type BagItem = { slug: string; qtyKg: number };

type ShopContextValue = {
  bag: BagItem[];
  wishlist: string[];
  orderIds: string[];
  add: (slug: string, qtyKg?: number) => void;
  setQty: (slug: string, qtyKg: number) => void;
  clearBag: () => void;
  toggleWish: (slug: string) => void;
  rememberOrder: (id: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function read(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

export function ShopState({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orderIds, setOrderIds] = useState<string[]>([]);

  useEffect(() => {
    setBag(read("apna-bag") || []);
    setWishlist(read("apna-wish") || []);
    setOrderIds(read("apna-orders") || []);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("apna-bag", JSON.stringify(bag));
  }, [bag, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("apna-wish", JSON.stringify(wishlist));
  }, [wishlist, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("apna-orders", JSON.stringify(orderIds));
  }, [orderIds, ready]);

  const value: ShopContextValue = {
    bag,
    wishlist,
    orderIds,
    add: (slug, qtyKg = 1) =>
      setBag((current) => {
        const found = current.find((item) => item.slug === slug);
        if (!found) return [...current, { slug, qtyKg }];
        return current.map((item) => (item.slug === slug ? { ...item, qtyKg: Math.min(10, item.qtyKg + qtyKg) } : item));
      }),
    setQty: (slug, qtyKg) => setBag((current) => (qtyKg < 1 ? current.filter((item) => item.slug !== slug) : current.map((item) => (item.slug === slug ? { ...item, qtyKg } : item)))),
    clearBag: () => setBag([]),
    toggleWish: (slug) => setWishlist((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug])),
    rememberOrder: (id) => setOrderIds((current) => (current.includes(id) ? current : [id, ...current])),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("Shop state is missing.");
  return value;
}
