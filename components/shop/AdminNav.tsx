import Link from "next/link";

export function AdminNav() {
  return (
    <nav className="mb-8 flex flex-wrap gap-4 text-sm uppercase tracking-[0.16em] text-[#E2B657]">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/orders">Orders</Link>
      <Link href="/admin/products">Rices</Link>
      <Link href="/admin/customers">Customers</Link>
    </nav>
  );
}
