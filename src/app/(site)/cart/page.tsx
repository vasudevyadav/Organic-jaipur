"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/useHydrated";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import CartItemRow from "@/components/CartItemRow";
import AnimatedSection from "@/components/AnimatedSection";

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, itemCount } = useCart();
  const hydrated = useHydrated();
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [applying, setApplying] = useState(false);

  const discount = coupon?.discount ?? 0;
  const total = Math.max(subtotal - discount, 0);

  async function applyCoupon() {
    if (!couponInput.trim()) return;
    setApplying(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim(), items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCoupon(null);
        setCouponError(data.error ?? "Invalid coupon code.");
        return;
      }
      setCoupon({ code: data.code, discount: data.discount });
    } finally {
      setApplying(false);
    }
  }

  function proceedToCheckout() {
    if (coupon) {
      sessionStorage.setItem("oj_coupon", coupon.code);
    } else {
      sessionStorage.removeItem("oj_coupon");
    }
    router.push("/checkout");
  }

  function removeCoupon() {
    setCoupon(null);
    setCouponInput("");
    setCouponError("");
    sessionStorage.removeItem("oj_coupon");
  }

  if (!hydrated) return null;

  if (itemCount === 0) {
    return (
      <main className="overflow-hidden">
        <section className="bg-[#0f281c] px-5 py-14 text-cream sm:px-8 sm:py-16">
          <AnimatedSection className="mx-auto max-w-7xl">
            <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase">
              <span className="h-px w-8 bg-honey-400" /> Your Cart
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
              Ready to check out<em className="font-normal text-honey-400">?</em>
            </h1>
          </AnimatedSection>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <p className="text-5xl">🛒</p>
          <h2 className="mt-4 font-display text-2xl text-forest-900">Your cart is empty</h2>
          <p className="mt-2 text-forest-900/60">Browse our farm-fresh produce and add something you&apos;ll love.</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-honey-400 px-7 py-3 text-sm font-bold text-forest-900 shadow-md hover:bg-honey-500"
          >
            Shop Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] overflow-hidden bg-[#fbf8ef]">
      <section className="relative overflow-hidden bg-[#0f281c] px-5 py-10 text-cream sm:px-8 sm:py-12">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/5" />
        <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full border border-honey-400/10" />
        <AnimatedSection className="relative mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase"><span className="h-px w-8 bg-honey-400" /> Your Cart</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">Your basket, <em className="font-normal text-honey-400">thoughtfully filled.</em></h1>
            <p className="mt-3 text-sm text-cream/50">Review quantities and savings before secure checkout.</p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold backdrop-blur">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-honey-400 px-2 text-forest-900">{itemCount}</span>
            item{itemCount === 1 ? "" : "s"} in your cart
          </div>
        </AnimatedSection>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/products" className="text-xs font-bold uppercase tracking-[.14em] text-terracotta-500 hover:text-terracotta-600">← Continue shopping</Link>
          <span className="hidden text-xs font-semibold text-forest-900/45 sm:block">Prices include all applicable taxes</span>
        </div>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <section className="rounded-[1.7rem] border border-forest-900/8 bg-white p-5 shadow-[0_12px_40px_rgba(15,40,28,.06)] sm:p-7">
            <div className="mb-6 flex items-end justify-between border-b border-forest-900/10 pb-5">
              <div><h2 className="font-display text-2xl text-forest-900">Cart items</h2><p className="mt-1 text-xs text-forest-900/45">Quantity can be updated here</p></div>
              <span className="text-xs font-bold text-forest-900/45">{itemCount} total</span>
            </div>
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}
          </section>

          <aside className="sticky top-28 overflow-hidden rounded-[1.7rem] border border-forest-900/8 bg-white shadow-[0_18px_50px_rgba(15,40,28,.1)]">
            <div className="bg-forest-900 px-6 py-5 text-white"><h2 className="font-display text-2xl">Order summary</h2><p className="mt-1 text-xs text-white/45">Complete your purchase securely</p></div>
            <div className="p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-forest-900/45">Have a coupon?</p>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="min-w-0 flex-1 rounded-xl border border-forest-900/15 bg-[#fcfaf5] px-3 py-2.5 text-sm uppercase outline-none focus:border-brand-500"
              />
              <button
                type="button"
                onClick={applyCoupon}
                disabled={applying}
                className="rounded-xl bg-forest-900 px-4 py-2 text-xs font-bold text-white hover:bg-forest-800 disabled:opacity-60"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="mt-1.5 text-xs text-terracotta-500">{couponError}</p>}
            {coupon && (
              <div className="mt-2 flex items-center justify-between rounded-xl border border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700"><span>✓ {coupon.code} applied</span><button type="button" onClick={removeCoupon} className="font-bold text-terracotta-500">Remove</button></div>
            )}

            <div className="mt-5 space-y-2.5 border-t border-forest-900/10 pt-5 text-sm">
              <div className="flex justify-between text-forest-900/60">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-700">
                  <span>Discount</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-forest-900/60">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="rounded-xl bg-honey-400/15 px-3 py-2 text-xs font-bold text-forest-900">
                  ₹{FREE_SHIPPING_THRESHOLD - subtotal} aur add karein aur Rajasthan mein FREE DELIVERY paayein (up to 3kg)
                </p>
              )}
              <div className="flex justify-between border-t border-forest-900/10 pt-2.5 text-base font-bold text-forest-900">
                <span>Items total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={proceedToCheckout}
              className="mt-6 w-full rounded-full bg-honey-400 px-7 py-4 text-sm font-bold text-forest-900 shadow-[0_12px_30px_rgba(240,184,77,.3)] transition hover:-translate-y-0.5 hover:bg-honey-500"
            >
              Continue to Secure Checkout
            </button>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[9px] font-bold uppercase tracking-wide text-forest-900/40"><span>Secure pay</span><span>Pure products</span><span>Real support</span></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
