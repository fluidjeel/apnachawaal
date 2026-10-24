"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/shop/AdminNav";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { formatRupees } from "@/lib/shop-catalog";

type Customer = { name: string; phone: string; email: string; orders: number; spentPaise: number };

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    fetch("/api/admin/customers").then(async (response) => {
      if (response.status === 401) router.push("/admin/login");
      else setCustomers((await response.json()).customers || []);
    });
  }, [router]);
  return (
    <ShopChrome>
      <AdminNav />
      <h1 className="text-4xl">Customers</h1>
      <ul className="mt-8 space-y-2">
        {customers.map((customer) => (
          <li key={customer.phone}>{customer.name} · {customer.phone} · {customer.orders} orders · {formatRupees(customer.spentPaise)}</li>
        ))}
      </ul>
    </ShopChrome>
  );
}
