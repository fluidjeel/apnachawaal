"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/shop/AdminNav";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { formatRupees } from "@/lib/shop-catalog";

export default function AdminHome() {
  const router = useRouter();
  const [summary, setSummary] = useState<{ orderCount: number; revenuePaise: number; counts: Record<string, number> } | null>(null);
  useEffect(() => {
    fetch("/api/admin/summary").then(async (response) => {
      if (response.status === 401) router.push("/admin/login");
      else setSummary(await response.json());
    });
  }, [router]);
  if (!summary) return <ShopChrome><p>Opening the desk.</p></ShopChrome>;
  return (
    <ShopChrome>
      <AdminNav />
      <h1 className="text-4xl">Desk</h1>
      <p className="mt-4">Orders {summary.orderCount}</p>
      <p>Revenue {formatRupees(summary.revenuePaise)}</p>
      <ul className="mt-6 space-y-1 text-sm">
        {Object.entries(summary.counts).map(([status, count]) => <li key={status}>{status}: {count}</li>)}
      </ul>
    </ShopChrome>
  );
}
