"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { useShop } from "@/components/shop/ShopState";
import { gateways } from "@/lib/payments";

export default function CheckoutPage() {
  const shop = useShop();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", gateway: "razorpay" });
  const [error, setError] = useState("");

  return (
    <ShopChrome>
      <h1 className="text-4xl">Checkout</h1>
      <p className="mt-3 max-w-xl text-sm text-[#F4E6C8]/70">Payment is a placeholder. Razorpay, Stripe, and LaserPay are wired, but no money moves and no real keys are used.</p>
      <form
        className="mt-8 max-w-md space-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...form, items: shop.bag }),
          });
          const data = await response.json();
          if (!response.ok) {
            setError(data.error || "Could not start checkout.");
            return;
          }
          shop.rememberOrder(data.order.id);
          shop.clearBag();
          router.push(`/checkout/result?order=${data.order.id}&session=${data.session.sessionId}&gateway=${data.session.gateway}`);
        }}
      >
        <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name" className="w-full bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone" className="w-full bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" className="w-full bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <select value={form.gateway} onChange={(event) => setForm({ ...form, gateway: event.target.value })} className="w-full bg-[#14080E] border border-[#E2B657]/40 px-3 py-2">
          {gateways.map((gateway) => <option key={gateway} value={gateway}>{gateway}</option>)}
        </select>
        <button className="border border-[#E2B657] px-4 py-2">Place order</button>
        {error ? <p>{error}</p> : null}
      </form>
    </ShopChrome>
  );
}
