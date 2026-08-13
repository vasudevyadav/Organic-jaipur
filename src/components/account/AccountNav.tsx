"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
];

export default function AccountNav({ name }: { name: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6 border-b border-forest-900/8 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-forest-900/45">Welcome back</p>
        <h1 className="mt-1 font-display text-2xl text-forest-900 sm:text-3xl">{name}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-forest-900 text-cream"
                  : "border border-forest-900/15 text-forest-900/70 hover:border-forest-900/30 hover:text-forest-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-full border border-terracotta-500 px-4 py-2 text-sm font-semibold text-terracotta-500 transition-colors hover:bg-terracotta-500/10 disabled:opacity-60"
        >
          {loggingOut ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
}
