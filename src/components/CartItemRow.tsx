"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice, safeImageUrl } from "@/lib/utils";

export default function CartItemRow({ item }: { item: ReturnType<typeof useCart>["items"][number] }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <article className="group grid grid-cols-[82px_minmax(0,1fr)] gap-4 border-b border-forest-900/8 py-5 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:items-center sm:gap-5">
      <Link href={`/products/${item.slug}`} className="relative shrink-0 overflow-hidden rounded-2xl bg-[#f2eddf]">
        <img
          src={safeImageUrl(item.imageUrl)}
          alt={item.name}
          className="h-[82px] w-[82px] object-cover transition duration-500 group-hover:scale-105 sm:h-24 sm:w-24"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/products/${item.slug}`} className="line-clamp-2 font-display text-lg font-semibold leading-tight text-forest-900 transition hover:text-terracotta-500">
          {item.name}
        </Link>
        <p className="mt-1 text-[11px] font-semibold text-forest-900/45">{item.unit} · {formatPrice(item.price)} each</p>
        <button
          type="button"
          onClick={() => removeItem(item.productId)}
          className="mt-2 text-[11px] font-bold text-terracotta-500 transition hover:text-terracotta-600 sm:hidden"
        >
          Remove
        </button>
      </div>

      <div className="col-span-2 flex items-center justify-between pl-[98px] sm:col-span-1 sm:gap-6 sm:pl-0">
        <div className="flex items-center overflow-hidden rounded-full border border-forest-900/15 bg-[#faf7ee]">
          <button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="h-9 w-9 text-lg text-forest-900/70 transition hover:bg-white">−</button>
          <span className="w-7 text-center text-sm font-bold text-forest-900">{item.quantity}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.productId, Math.min(item.quantity + 1, 50))} className="h-9 w-9 text-lg text-forest-900/70 transition hover:bg-white">+</button>
        </div>
        <div className="min-w-24 text-right">
          <p className="font-display text-lg font-bold text-forest-900">{formatPrice(item.price * item.quantity)}</p>
          <button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.productId)} className="mt-1 hidden text-[10px] font-bold uppercase tracking-wide text-forest-900/35 transition hover:text-terracotta-500 sm:inline-block">Remove</button>
        </div>
      </div>
    </article>
  );
}
