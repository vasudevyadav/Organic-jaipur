"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Product } from "@prisma/client";
import { formatPrice, safeImageUrl } from "@/lib/utils";
import { categoryLabel } from "@/lib/constants";

export default function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data.products ?? []);
        }
      } catch {
        // ignore aborted/failed suggestion fetches
      }
    }, 250);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const visibleResults = query.trim().length < 2 ? [] : results;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={containerRef} className="relative">
      {open ? (
        <form
          onSubmit={handleSubmit}
          className="absolute right-0 top-1/2 z-50 flex w-64 -translate-y-1/2 items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 shadow-md sm:w-80"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-brand-600">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="text-foreground/40 hover:text-foreground/70"
          >
            ✕
          </button>

          {visibleResults.length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-lg">
              {visibleResults.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-brand-50 px-3 py-2 last:border-0 hover:bg-brand-50/60"
                >
                  <img src={safeImageUrl(p.imageUrl)} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground/90">{p.name}</p>
                    <p className="text-xs text-foreground/50">{categoryLabel(p.category)}</p>
                  </div>
                  <span className="text-sm font-semibold text-terracotta-500">
                    {formatPrice(p.price)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
