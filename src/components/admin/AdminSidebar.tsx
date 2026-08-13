"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  DashboardIcon,
  BoxIcon,
  TruckIconAdmin,
  TagIcon,
  StarIconAdmin,
  MailIcon,
  LogoutIcon,
  ExternalLinkIcon,
} from "@/components/admin/icons";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true },
  { href: "/admin/products", label: "Products", icon: BoxIcon, exact: false },
  { href: "/admin/orders", label: "Orders", icon: TruckIconAdmin, exact: false },
  { href: "/admin/coupons", label: "Coupons", icon: TagIcon, exact: false },
  { href: "/admin/reviews", label: "Reviews", icon: StarIconAdmin, exact: false },
  { href: "/admin/messages", label: "Messages", icon: MailIcon, exact: false },
] as const;

function isActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col bg-brand-900 text-cream">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-honey-400 font-display text-base font-bold text-brand-900">
          OJ
        </span>
        <div className="leading-tight">
          <p className="font-display text-base font-semibold">Organic Jaipur</p>
          <p className="text-[11px] font-medium uppercase tracking-[.14em] text-cream/45">
            Admin panel
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-honey-400 text-brand-900"
                  : "text-cream/70 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-cream/10 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-cream/70 hover:bg-cream/10 hover:text-cream"
        >
          <ExternalLinkIcon className="h-4.5 w-4.5 shrink-0" />
          View Site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-cream/70 hover:bg-cream/10 hover:text-cream disabled:opacity-60"
        >
          <LogoutIcon className="h-4.5 w-4.5 shrink-0" />
          {loggingOut ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
}
