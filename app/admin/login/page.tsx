"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShopChrome } from "@/components/shop/ShopChrome";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <ShopChrome>
      <h1 className="text-4xl">Admin</h1>
      <p className="mt-3 text-sm text-[#F4E6C8]/70">Default password is placeholder-admin until ADMIN_PASSWORD is set.</p>
      <form
        className="mt-6 max-w-sm space-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ password }),
          });
          if (!response.ok) {
            setError("That password did not match.");
            return;
          }
          router.push("/admin");
        }}
      >
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent border border-[#E2B657]/40 px-3 py-2" />
        <button className="border border-[#E2B657] px-4 py-2">Enter</button>
        {error ? <p>{error}</p> : null}
      </form>
    </ShopChrome>
  );
}
