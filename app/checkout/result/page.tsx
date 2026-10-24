"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";

function Result() {
  const params = useSearchParams();
  const orderId = params.get("order") || "";
  const sessionId = params.get("session") || "";
  const gateway = params.get("gateway") || "";
  const [message, setMessage] = useState("This is a placeholder checkout. Choose a result.");

  async function finish(path: string, next: string) {
    const response = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ orderId, sessionId, gateway }),
    });
    const data = await response.json();
    setMessage(data.error || `${next} Order ${data.order?.id || orderId} is ${data.order?.status || "unchanged"}.`);
  }

  return (
    <ShopChrome>
      <h1 className="text-4xl">Payment</h1>
      <p className="mt-4 max-w-xl">{message}</p>
      <p className="mt-2 text-sm text-[#F4E6C8]/60">Gateway {gateway}. Session {sessionId}.</p>
      <div className="mt-6 flex gap-3">
        <button className="border border-[#E2B657] px-4 py-2" onClick={() => finish("/api/payments/confirm", "Payment accepted.")}>Simulate success</button>
        <button className="border border-[#E2B657]/50 px-4 py-2" onClick={() => finish("/api/payments/fail", "Payment declined.")}>Simulate failure</button>
      </div>
      <Link href={`/orders/${orderId}`} className="mt-8 inline-block">Track this order</Link>
    </ShopChrome>
  );
}

export default function PaymentResultPage() {
  return <Suspense fallback={<ShopChrome><p>Opening payment.</p></ShopChrome>}><Result /></Suspense>;
}
