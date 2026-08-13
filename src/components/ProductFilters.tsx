"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/constants";

const SORT_OPTIONS = [
  { value: "", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const inStockOnly = searchParams.get("inStock") === "true";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const activeCount = [category, sort, inStockOnly, minPrice, maxPrice].filter(Boolean).length;

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [drawerOpen]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/products");
    setDrawerOpen(false);
  }

  const content = (
    <div className="divide-y divide-forest-900/10">
      <div className="pb-6">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-terracotta-500"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta-500/10">01</span> Category</p>
        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => updateParam("category", "")}
            className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left text-sm font-bold transition ${
              !category ? "border-forest-900 bg-forest-900 text-white shadow-sm" : "border-forest-900/10 bg-white text-forest-900/65 hover:border-brand-400"
            }`}
          >
            All products <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${!category ? "border-honey-400 bg-honey-400 text-[10px] text-forest-900" : "border-forest-900/15"}`}>{!category ? "✓" : ""}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => updateParam("category", c.value)}
              className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left text-sm font-bold transition ${
                category === c.value ? "border-forest-900 bg-forest-900 text-white shadow-sm" : "border-forest-900/10 bg-white text-forest-900/65 hover:border-brand-400"
              }`}
            >
              {c.label} <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${category === c.value ? "border-honey-400 bg-honey-400 text-[10px] text-forest-900" : "border-forest-900/15"}`}>{category === c.value ? "✓" : ""}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="py-6">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-terracotta-500"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta-500/10">02</span> Price Range</p>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            aria-label="Minimum price"
            className="w-full rounded-xl border border-forest-900/10 bg-[#faf7ee] px-3 py-2.5 text-sm outline-none transition focus:border-honey-500 focus:bg-white"
          />
          <span className="text-forest-900/40">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            aria-label="Maximum price"
            className="w-full rounded-xl border border-forest-900/10 bg-[#faf7ee] px-3 py-2.5 text-sm outline-none transition focus:border-honey-500 focus:bg-white"
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between py-6 text-sm font-bold text-forest-900/70">
        <span>In stock only</span>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => updateParam("inStock", e.target.checked ? "true" : "")}
          className="h-5 w-5 accent-[#0f281c]"
        />
      </label>

      <div className="py-6">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-terracotta-500"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta-500/10">03</span> Sort By</p>
        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="mt-3 w-full rounded-xl border border-forest-900/10 bg-[#faf7ee] px-3 py-3 text-sm font-semibold text-forest-900/70 outline-none transition focus:border-honey-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {(category || sort || inStockOnly || minPrice || maxPrice) && (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-6 w-full rounded-full border border-terracotta-500/25 px-4 py-2.5 text-sm font-bold text-terracotta-500 transition hover:bg-terracotta-500 hover:text-white"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl bg-forest-900 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-forest-900/15"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </svg>
          <span className="flex items-center gap-2">Filters & Sort {activeCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-honey-400 text-[10px] text-forest-900">{activeCount}</span>}</span><span>Open →</span>
        </button>
      </div>

      <aside className="hidden self-start lg:block lg:w-72 lg:shrink-0">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[1.5rem] border border-forest-900/10 bg-[#fbf8ef] shadow-[0_14px_40px_rgba(15,40,28,.09)]">
          <div className="border-b border-forest-900/8 bg-forest-900 px-6 py-5 text-cream">
            <div className="flex items-center justify-between"><h2 className="font-display text-xl">Refine your shelf</h2>{activeCount > 0 && <span className="rounded-full bg-honey-400 px-2 py-1 text-[10px] font-bold text-forest-900">{activeCount} active</span>}</div>
            <p className="mt-1 text-xs text-white/50">Find exactly what your kitchen needs.</p>
          </div>
          <div className="p-5">{content}</div>
        </div>
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-forest-900/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[min(92vw,420px)] flex-col bg-[#fbf8ef] shadow-2xl">
            <div className="flex items-center justify-between bg-forest-900 px-6 py-5 text-white">
              <div><h2 className="font-display text-2xl">Refine products</h2><p className="mt-1 text-xs text-white/50">Choose what matters to you</p></div>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{content}</div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="m-5 mt-0 rounded-full bg-honey-400 px-6 py-3.5 text-sm font-bold text-forest-900 shadow-lg"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
