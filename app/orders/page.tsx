"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { useShop } from "@/components/shop/ShopState";
import { formatRupees } from "@/lib/shop-catalog";

type Order = { id: string; status: string; totalPaise: number; createdAt: string };

export default function OrdersPage() {
  const { orderIds } = useShop();
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  function load(nextPhone = phone) {
    const params = new URLSearchParams({ phone: nextPhone, ids: orderIds.join(",") });
    fetch(`/api/orders?${params}`).then((response) => response.json()).then((data) => setOrders(data.orders || []));
  }
  useEffect(() => {
    load();
  }, [orderIds]);

  return (
    <ShopChrome>
      <h1 className="text-4xl">Your orders</h1>
      <form className="mt-6 flex gap-3" onSubmit={(event) => { event.preventDefault(); load(); }}>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone used at checkout" className="bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <button className="border border-[#E2B657] px-4 py-2">Find</button>
      </form>
      <ul className="mt-8 space-y-3">
        {orders.map((order) => (
          <li key={order.id}>
            <Link href={`/orders/${order.id}`}>{order.id}</Link>
            <span className="ml-3 text-sm text-[#F4E6C8]/70">{order.status} · {formatRupees(order.totalPaise)}</span>
          </li>
        ))}
      </ul>
    </ShopChrome>
  );
}
