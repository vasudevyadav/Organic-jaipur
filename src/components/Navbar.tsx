"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { useCart } from "@/lib/cart";
import { MAKING_PROCESSES } from "@/lib/making-process";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop All" },
  { href: "/farm-to-home", label: "Farm to Home" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

type NavUser = { name: string; email: string } | null;

export default function Navbar({ user = null }: { user?: NavUser }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const timeout = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-[#fffdf8]/95 backdrop-blur-md">
      <div className="hidden bg-forest-900 text-cream sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[10px] font-bold uppercase tracking-[.16em] lg:px-8">
          <span>Rooted in Rajasthan · Made in small batches</span>
          <div className="flex items-center gap-6 text-cream/70">
            <span>Lab tested</span>
            <span>Farm direct</span>
            <span>Pan-India delivery</span>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 border-b border-forest-900/10 px-4 py-2.5 sm:px-6 lg:px-7">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
          aria-label="Organic Jaipur home"
        >
          <img
            src="/product/download.png"
            alt="Organic Jaipur"
            className="w-[190px] object-contain object-left mix-blend-multiply xl:w-[210px]"
          />
        </Link>

        <ul className="hidden items-center gap-5 whitespace-nowrap lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-2 text-[12px] font-semibold uppercase transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-terracotta-500 after:transition-transform hover:text-brand-800 xl:text-[13px] ${
                    active
                      ? "text-terracotta-600 after:scale-x-100"
                      : "text-brand-800 after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="group relative">
            <button
              type="button"
              className={`flex items-center gap-1.5 whitespace-nowrap py-2 text-[12px] font-semibold uppercase transition-colors xl:text-[13px] ${pathname.startsWith("/making-process") ? "text-terracotta-600" : "text-brand-800 group-hover:text-terracotta-500"}`}
            >
              Making Process{" "}
              <span className="text-[9px] transition-transform group-hover:rotate-180">
                ▾
              </span>
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white p-2 shadow-[0_22px_60px_rgba(15,40,28,.18)]">
                <p className="px-4 pb-2 pt-3 text-[9px] font-extrabold uppercase tracking-[.18em] text-terracotta-500">
                  See how we make
                </p>
                {MAKING_PROCESSES.map((process, index) => (
                  <Link
                    key={process.slug}
                    href={`/making-process/${process.slug}`}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-forest-900 transition hover:bg-[#faf7ee] hover:text-brand-700"
                  >
                    <span>
                      <small className="mr-3 font-mono text-[9px] text-forest-900/30">
                        0{index + 1}
                      </small>
                      {process.label}
                    </span>
                    <span>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <SearchBar />

          <Link
            href="/cart"
            aria-label={`Cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="group relative inline-flex h-10 items-center gap-2 rounded-full border border-forest-900/10 bg-white px-3 text-brand-800 shadow-sm transition hover:border-honey-400 hover:bg-[#fff8e8]"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <path
                d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="19.5" r="1.25" />
              <circle cx="17.5" cy="19.5" r="1.25" />
            </svg>
            <span className="hidden text-xs font-bold sm:inline">Cart</span>
            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-extrabold transition ${itemCount > 0 ? "bg-honey-400 text-forest-900" : "bg-forest-900/8 text-forest-900/45"}`}
            >
              {itemCount}
            </span>
          </Link>

          <Link
            href={user ? "/account" : "/account/login"}
            className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-brand-800 hover:bg-brand-50 sm:inline-flex"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path
                d="M4.5 20c1.5-3.5 4.5-5.5 7.5-5.5s6 2 7.5 5.5"
                strokeLinecap="round"
              />
            </svg>
            {user ? user.name.split(" ")[0] : "Login"}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/10 bg-white text-brand-800 shadow-sm lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-forest-900/55 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[min(88vw,390px)] flex-col bg-[#fffdf8] shadow-[-18px_0_60px_rgba(15,40,28,.24)] transition-transform duration-300 ease-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-forest-900/10 px-5 py-4">
          <img
            src="/product/download.png"
            alt="Organic Jaipur"
            className="w-[205px] object-contain object-left mix-blend-multiply"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/10 bg-white text-forest-900"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-terracotta-500">
            Explore Organic Jaipur
          </p>
          <ul>
            {NAV_LINKS.map((link, index) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="border-b border-forest-900/8">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-4 font-display lg:text-xl text-base ${active ? "text-terracotta-500" : "text-forest-900"}`}
                  >
                    <span>
                      <span className="mr-3 font-sans text-[10px] text-forest-900/35">
                        0{index + 1}
                      </span>
                      {link.label}
                    </span>
                    <span aria-hidden className="font-sans text-sm">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-terracotta-500">
              Making process
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MAKING_PROCESSES.map((process) => (
                <Link
                  key={process.slug}
                  href={`/making-process/${process.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-forest-900/10 bg-[#faf7ee] px-3 py-3 text-xs font-bold text-forest-900"
                >
                  {process.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-forest-900/10 bg-[#f7f0df] p-5">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <Link
              href={user ? "/account" : "/account/login"}
              onClick={() => setOpen(false)}
              className="rounded-full border border-forest-900/15 bg-white px-4 py-3 text-center text-sm font-bold text-forest-900"
            >
              {user ? "My Account" : "Login / Register"}
            </Link>
            <Link
              href="/track-order"
              onClick={() => setOpen(false)}
              className="rounded-full border border-forest-900/15 bg-white px-4 py-3 text-center text-sm font-bold text-forest-900"
            >
              Track Order
            </Link>
          </div>
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="mb-3 flex items-center justify-between rounded-full border border-honey-400 bg-[#fff8e8] px-5 py-3 text-sm font-bold text-forest-900"
          >
            <span>View cart</span>
            <span className="rounded-full bg-honey-400 px-2.5 py-1 text-xs">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </span>
          </Link>
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-full bg-forest-900 px-5 py-3.5 text-sm font-bold text-cream shadow-lg shadow-forest-900/15"
          >
            Shop all products →
          </Link>
          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[.14em] text-forest-900/45">
            Pure roots · Honest food · Rajasthan
          </p>
        </div>
      </aside>
    </header>
  );
}
