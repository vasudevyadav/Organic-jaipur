"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { MenuIcon, CloseIcon } from "@/components/admin/icons";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-brand-50/40">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-brand-50/40 lg:flex">
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="fixed inset-y-0 left-0 w-64">
          <AdminSidebar />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 shadow-xl">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-cream/10 text-cream"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-brand-100 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 text-brand-800"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <span className="font-display text-base font-semibold text-brand-900">
            Organic Jaipur — Admin
          </span>
        </div>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
