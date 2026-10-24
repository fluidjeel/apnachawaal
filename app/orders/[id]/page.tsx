"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { formatRupees } from "@/lib/shop-catalog";

type Order = {
  id: string;
  status: string;
  gateway: string;
  totalPaise: number;
  items: { brand: string; qtyKg: number }[];
  history: { at: string; status: string; note: string }[];
};

export default function OrderPage() {
  const id = String(useParams().id || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState("");

  function load() {
    fetch(`/api/orders/${id}`).then((response) => response.json()).then((data) => setOrder(data.order || null));
  }
  useEffect(load, [id]);

  async function act(action: "cancel" | "return") {
    const response = await fetch(`/api/orders/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await response.json();
    setMessage(data.error || `Order is now ${data.order.status}.`);
    load();
  }

  if (!order) return <ShopChrome><p>Looking up the order.</p></ShopChrome>;
  return (
    <ShopChrome>
      <h1 className="text-4xl">{order.id}</h1>
      <p className="mt-3">{order.status} · {order.gateway} · {formatRupees(order.totalPaise)}</p>
      <ul className="mt-6">{order.items.map((item) => <li key={item.brand}>{item.brand} · {item.qtyKg} kg</li>)}</ul>
      <div className="mt-6 flex gap-3">
        <button className="border border-[#E2B657] px-4 py-2" onClick={() => act("cancel")}>Cancel</button>
        <button className="border border-[#E2B657]/50 px-4 py-2" onClick={() => act("return")}>Request return</button>
      </div>
      {message ? <p className="mt-4">{message}</p> : null}
      <ol className="mt-8 space-y-2 text-sm">
        {order.history.map((entry) => <li key={entry.at}>{entry.status}: {entry.note}</li>)}
      </ol>
    </ShopChrome>
  );
}
