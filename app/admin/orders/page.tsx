"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/shop/AdminNav";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { formatRupees } from "@/lib/shop-catalog";

type Order = { id: string; status: string; totalPaise: number; customer: { name: string; phone: string } };
const statuses = ["processing", "shipped", "delivered", "cancelled", "returned"];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  function load() {
    fetch("/api/admin/orders").then(async (response) => {
      if (response.status === 401) router.push("/admin/login");
      else setOrders((await response.json()).orders || []);
    });
  }
  useEffect(load, [router]);
  return (
    <ShopChrome>
      <AdminNav />
      <h1 className="text-4xl">Orders</h1>
      <ul className="mt-8 space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border-b border-[#E2B657]/20 pb-3">
            <p>{order.id} · {order.customer.name} · {order.customer.phone} · {formatRupees(order.totalPaise)}</p>
            <p className="text-sm">Now {order.status}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  className="border border-[#E2B657]/40 px-2 py-1 text-xs"
                  onClick={async () => {
                    await fetch(`/api/admin/orders/${order.id}`, {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ status }),
                    });
                    load();
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </ShopChrome>
  );
}
