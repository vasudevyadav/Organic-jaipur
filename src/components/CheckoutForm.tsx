"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { Address } from "@prisma/client";
import { useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/useHydrated";
import { formatPrice, safeImageUrl } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, ONLINE_PAYMENT_DISCOUNT_PERCENT, SHIPPING_FEE } from "@/lib/constants";

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email?: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void | Promise<void>;
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

type CheckoutFormProps = {
  user: { name: string; email: string; phone: string | null } | null;
  addresses: Address[];
};

export default function CheckoutForm({ user, addresses }: CheckoutFormProps) {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart, removeItem, updateQuantity } = useCart();
  const hydrated = useHydrated();
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponOffer, setCouponOffer] = useState<{ type: "PERCENT" | "FIXED"; value: number } | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultAddress?.id ?? "new");

  const [form, setForm] = useState({
    customerName: user?.name ?? "",
    customerPhone: user?.phone ?? "",
    customerEmail: user?.email ?? "",
    addressLine1: defaultAddress?.line1 ?? "",
    addressLine2: defaultAddress?.line2 ?? "",
    city: defaultAddress?.city ?? "Jaipur",
    state: defaultAddress?.state ?? "Rajasthan",
    pincode: defaultAddress?.pincode ?? "",
    notes: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const code = window.sessionStorage.getItem("oj_coupon");
    if (!code) return;

    const timeout = window.setTimeout(() => {
      setCouponCode(code);
      setCouponInput(code);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!couponCode || subtotal <= 0) return;

    const controller = new AbortController();
    fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode, subtotal }),
      signal: controller.signal,
    })
      .then(async (res) => ({ ok: res.ok, data: await res.json().catch(() => null) }))
      .then(({ ok, data }) => {
        if (ok) {
          setDiscount(data?.discount ?? 0);
          if ((data?.type === "PERCENT" || data?.type === "FIXED") && typeof data?.value === "number") {
            setCouponOffer({ type: data.type, value: data.value });
          }
          setCouponError("");
        } else {
          setDiscount(0);
          setCouponCode(null);
          setCouponOffer(null);
          sessionStorage.removeItem("oj_coupon");
          setCouponError(data?.error ?? "This coupon is no longer valid for your cart.");
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") {
          setCouponError("Could not validate the coupon. Please try again.");
        }
      });

    return () => controller.abort();
  }, [couponCode, subtotal]);

  function selectAddress(address: Address | null) {
    if (!address) {
      setSelectedAddressId("new");
      return;
    }
    setSelectedAddressId(address.id);
    setForm((f) => ({
      ...f,
      addressLine1: address.line1,
      addressLine2: address.line2 ?? "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      customerPhone: address.phone,
    }));
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const onlinePaymentDiscount =
    paymentMethod === "RAZORPAY"
      ? ((subtotal - discount) * ONLINE_PAYMENT_DISCOUNT_PERCENT) / 100
      : 0;
  const total = Math.max(subtotal - discount - onlinePaymentDiscount + shippingFee, 0);

  async function applyCoupon() {
    const code = couponInput.trim();
    if (!code) {
      setCouponError("Enter a coupon code.");
      return;
    }

    setApplyingCoupon(true);
    setCouponError("");
    try {
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setCouponError(data?.error ?? "Invalid coupon code.");
        return;
      }

      setCouponCode(data.code);
      setCouponOffer({ type: data.type, value: data.value });
      setCouponInput(data.code);
      setDiscount(data.discount ?? 0);
      sessionStorage.setItem("oj_coupon", data.code);
    } catch {
      setCouponError("Could not apply the coupon. Please try again.");
    } finally {
      setApplyingCoupon(false);
    }
  }

  function removeCoupon() {
    setCouponCode(null);
    setCouponOffer(null);
    setCouponInput("");
    setDiscount(0);
    setCouponError("");
    sessionStorage.removeItem("oj_coupon");
  }

  function loadRazorpayCheckout() {
    if (window.Razorpay) return Promise.resolve(true);

    return new Promise<boolean>((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener("error", () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        ...form,
        couponCode: couponCode || undefined,
        paymentMethod,
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setSubmitting(false);
      setError(typeof data?.error === "string" ? data.error : "Could not place your order. Please try again.");
      return;
    }

    if (paymentMethod === "COD") {
      sessionStorage.removeItem("oj_coupon");
      clearCart();
      router.push(`/order-confirmation/${data.order.orderNumber}`);
      return;
    }

    const checkoutLoaded = await loadRazorpayCheckout();
    if (!checkoutLoaded || !window.Razorpay || !data.payment) {
      setSubmitting(false);
      setError("Secure payment window could not load. Please check your connection and try again.");
      return;
    }

    const razorpay = new window.Razorpay({
      key: data.payment.keyId,
      amount: data.payment.amount,
      currency: data.payment.currency,
      name: "Organic Jaipur",
      description: `Order ${data.order.orderNumber}`,
      order_id: data.payment.razorpayOrderId,
      prefill: {
        name: form.customerName,
        email: form.customerEmail || undefined,
        contact: form.customerPhone,
      },
      theme: { color: "#315c3b" },
      handler: async (response) => {
        try {
          const verifyResponse = await fetch("/api/orders/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderNumber: data.order.orderNumber,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verification = await verifyResponse.json().catch(() => null);
          if (!verifyResponse.ok) {
            setSubmitting(false);
            setError(typeof verification?.error === "string" ? verification.error : "Payment could not be verified. Please contact support.");
            return;
          }

          sessionStorage.removeItem("oj_coupon");
          clearCart();
          router.push(`/order-confirmation/${data.order.orderNumber}`);
        } catch {
          setSubmitting(false);
          setError("Payment verification was interrupted. Please contact support before trying again.");
        }
      },
      modal: {
        ondismiss: () => {
          setSubmitting(false);
          setError("Payment was cancelled. Your cart is still saved and you can try again.");
        },
      },
    });
    razorpay.open();
  }

  if (hydrated && itemCount === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-brand-900">Your cart is empty</h1>
        <Link href="/products" className="mt-6 inline-block rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-cream hover:bg-brand-700">
          Shop Products
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#fbf8ef] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 border-b border-forest-900/10 pb-7 sm:flex-row sm:items-end">
        <div>
          <Link href="/cart" className="text-xs font-bold uppercase tracking-[.16em] text-terracotta-500 hover:text-terracotta-600">← Return to cart</Link>
          <h1 className="mt-3 font-display text-4xl leading-none text-forest-900 sm:text-5xl">Secure checkout</h1>
          <p className="mt-3 text-sm text-forest-900/55">A few details and your order will be on its way.</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.12em] text-forest-900/50">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-800">✓</span>
          <span>Cart</span><span className="h-px w-8 bg-forest-900/15" /><span className="text-forest-900">Details</span><span className="h-px w-8 bg-forest-900/15" /><span>Confirmation</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <div className="space-y-5">
          {addresses.length > 0 && (
            <section className="rounded-[1.6rem] border border-forest-900/8 bg-white p-6 shadow-[0_8px_30px_rgba(15,40,28,.05)] sm:p-7">
              <div className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-xs font-bold text-honey-400">01</span><div><h2 className="font-display text-xl text-forest-900">Choose an address</h2><p className="text-xs text-forest-900/45">Select a saved delivery location</p></div></div>
              <div className="mt-4 space-y-2">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${
                      selectedAddressId === address.id ? "border-brand-500 bg-brand-50/70 shadow-sm" : "border-forest-900/10 hover:border-brand-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="savedAddress"
                      checked={selectedAddressId === address.id}
                      onChange={() => selectAddress(address)}
                      className="mt-1"
                    />
                    <span>
                      <span className="font-medium text-foreground/90">{address.label}</span>
                      <br />
                      {address.line1}, {address.line2 ? `${address.line2}, ` : ""}
                      {address.city}, {address.state} {address.pincode}
                    </span>
                  </label>
                ))}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm ${
                    selectedAddressId === "new" ? "border-brand-500 bg-brand-50/60" : "border-brand-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="savedAddress"
                    checked={selectedAddressId === "new"}
                    onChange={() => selectAddress(null)}
                  />
                  Use a new address
                </label>
              </div>
            </section>
          )}

          <section className="rounded-[1.6rem] border border-forest-900/8 bg-white p-6 shadow-[0_8px_30px_rgba(15,40,28,.05)] sm:p-7">
            <div className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-xs font-bold text-honey-400">{addresses.length > 0 ? "02" : "01"}</span><div><h2 className="font-display text-xl text-forest-900">Contact &amp; delivery</h2><p className="text-xs text-forest-900/45">Where should we deliver your order?</p></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" value={form.customerName} onChange={(v) => setForm((f) => ({ ...f, customerName: v }))} required />
              <Field label="Phone" type="tel" value={form.customerPhone} onChange={(v) => setForm((f) => ({ ...f, customerPhone: v }))} required />
              <Field label="Email (optional)" type="email" value={form.customerEmail} onChange={(v) => setForm((f) => ({ ...f, customerEmail: v }))} className="sm:col-span-2" />
              <Field label="Address Line 1" value={form.addressLine1} onChange={(v) => setForm((f) => ({ ...f, addressLine1: v }))} required className="sm:col-span-2" />
              <Field label="Address Line 2 (optional)" value={form.addressLine2} onChange={(v) => setForm((f) => ({ ...f, addressLine2: v }))} className="sm:col-span-2" />
              <Field label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} required />
              <Field label="State" value={form.state} onChange={(v) => setForm((f) => ({ ...f, state: v }))} required />
              <Field label="Pincode" value={form.pincode} onChange={(v) => setForm((f) => ({ ...f, pincode: v }))} required />
            </div>
            <div className="mt-4">
              <label className="text-xs font-bold uppercase tracking-wide text-forest-900/55">Delivery Notes <span className="font-normal normal-case text-forest-900/35">(optional)</span></label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={2}
                placeholder="Landmark, preferred delivery time, or special instructions"
                className="mt-2 w-full rounded-xl border border-forest-900/12 bg-[#fcfaf5] px-4 py-3 text-sm outline-none transition focus:border-honey-500 focus:bg-white focus:ring-4 focus:ring-honey-400/10"
              />
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-forest-900/8 bg-white p-6 shadow-[0_8px_30px_rgba(15,40,28,.05)] sm:p-7">
            <div className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-xs font-bold text-honey-400">{addresses.length > 0 ? "03" : "02"}</span><div><h2 className="font-display text-xl text-forest-900">Payment</h2><p className="text-xs text-forest-900/45">Simple and secure payment</p></div></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PaymentOption
                selected={paymentMethod === "RAZORPAY"}
                title="Pay Online"
                description="UPI, cards, netbanking & wallets"
                icon="₹"
                badge={`SAVE ${ONLINE_PAYMENT_DISCOUNT_PERCENT}%`}
                onClick={() => setPaymentMethod("RAZORPAY")}
              />
              <PaymentOption
                selected={paymentMethod === "COD"}
                title="Cash on Delivery"
                description="Pay when your order reaches you"
                icon="⌂"
                onClick={() => setPaymentMethod("COD")}
              />
            </div>
          </section>
        </div>

        <aside className="sticky top-28 overflow-hidden rounded-[1.7rem] border border-forest-900/8 bg-white shadow-[0_18px_50px_rgba(15,40,28,.1)]">
          <div className="bg-forest-900 px-6 py-5 text-white"><div className="flex items-center justify-between"><h2 className="font-display text-2xl">Your order</h2><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold">{itemCount} item{itemCount === 1 ? "" : "s"}</span></div><p className="mt-1 text-xs text-white/45">Review before placing your order</p></div>
          <div className="p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="border-b border-forest-900/8 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f3eee1]"><img src={safeImageUrl(item.imageUrl)} alt={item.name} className="h-full w-full object-cover" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-display text-sm leading-tight text-forest-900">{item.name}</p>
                    <p className="mt-1 text-[10px] font-semibold text-forest-900/40">{item.unit} · {formatPrice(item.price)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-forest-900">{formatPrice(item.price * item.quantity)}</p>
                    <p className="mt-0.5 text-[10px] text-forest-900/40">{formatPrice(item.price)} × {item.quantity}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between pl-[76px]">
                  <div className="flex items-center overflow-hidden rounded-full border border-forest-900/15">
                    <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="h-7 w-8 text-base text-forest-900/70 hover:bg-forest-900/5">−</button>
                    <span className="w-7 text-center text-xs font-bold text-forest-900">{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.productId, Math.min(item.quantity + 1, 50))} className="h-7 w-8 text-base text-forest-900/70 hover:bg-forest-900/5">+</button>
                  </div>
                  <button type="button" onClick={() => removeItem(item.productId)} className="text-[11px] font-bold text-terracotta-500 hover:text-terracotta-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-forest-900/10 pt-5">
            <label htmlFor="checkout-coupon" className="text-[10px] font-bold uppercase tracking-[.12em] text-forest-900/50">Coupon code</label>
            {couponCode ? (
              <div className="mt-2 flex items-center justify-between rounded-xl border border-brand-300 bg-brand-50 px-4 py-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-brand-800">{couponCode}</p>
                    {couponOffer && (
                      <span className="rounded-full bg-brand-700 px-2 py-0.5 text-[9px] font-extrabold text-white">
                        {couponOffer.type === "PERCENT" ? `${couponOffer.value}% OFF` : `${formatPrice(couponOffer.value)} OFF`}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[10px] text-brand-700">You save {formatPrice(discount)} on this order</p>
                </div>
                <button type="button" onClick={removeCoupon} className="text-xs font-bold text-terracotta-500 hover:text-terracotta-600">Remove</button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <input id="checkout-coupon" value={couponInput} onChange={(event) => setCouponInput(event.target.value.toUpperCase())} placeholder="Enter coupon" className="min-w-0 flex-1 rounded-xl border border-forest-900/15 px-3 py-2.5 text-sm uppercase outline-none focus:border-brand-500" />
                <button type="button" onClick={applyCoupon} disabled={applyingCoupon || subtotal <= 0} className="rounded-xl bg-forest-900 px-4 text-xs font-bold text-white hover:bg-forest-800 disabled:opacity-50">{applyingCoupon ? "..." : "Apply"}</button>
              </div>
            )}
            {couponError && <p className="mt-2 text-xs text-terracotta-600">{couponError}</p>}
          </div>
          <div className="mt-5 space-y-3 border-t border-forest-900/10 pt-5 text-sm">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-700">
                <span>
                  Discount ({couponCode}{couponOffer?.type === "PERCENT" ? ` · ${couponOffer.value}%` : ""})
                </span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}
            {onlinePaymentDiscount > 0 && (
              <div className="flex justify-between rounded-xl border border-brand-300 bg-brand-50 px-3 py-2.5 font-bold text-brand-800">
                <span>Online payment discount ({ONLINE_PAYMENT_DISCOUNT_PERCENT}%)</span>
                <span>−{formatPrice(onlinePaymentDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-foreground/70">
              <span>Delivery</span>
              <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex items-end justify-between border-t border-forest-900/10 pt-4 font-bold text-forest-900">
              <span>Total</span>
              <span className="font-display text-3xl">{formatPrice(total)}</span>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-terracotta-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-honey-400 px-7 py-4 text-sm font-bold text-forest-900 shadow-[0_12px_30px_rgba(240,184,77,.3)] transition hover:-translate-y-0.5 hover:bg-honey-500 disabled:opacity-60"
          >
            {submitting ? (paymentMethod === "RAZORPAY" ? "Opening Secure Payment..." : "Placing Order...") : (paymentMethod === "RAZORPAY" ? `Pay ${formatPrice(total)} Securely` : "Place Order (Cash on Delivery)")}
          </button>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[9px] font-bold uppercase tracking-wide text-forest-900/45"><span>Secure order</span><span>Pure products</span><span>Real support</span></div>
          </div>
        </aside>
      </form>
      </div>
    </main>
  );
}

function PaymentOption({
  selected,
  title,
  description,
  icon,
  badge,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
        selected ? "border-brand-500 bg-brand-50/60" : "border-forest-900/10 hover:border-brand-300"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-base shadow-sm">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-sm font-bold text-forest-900">
          {title}
          {badge && <span className="rounded-full bg-honey-400 px-2 py-0.5 text-[9px] font-extrabold tracking-wide text-forest-900">{badge}</span>}
        </span>
        <span className="mt-1 block text-[11px] leading-snug text-foreground/55">{description}</span>
      </span>
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${selected ? "bg-brand-600 text-white" : "border border-forest-900/20"}`}>
        {selected ? "✓" : ""}
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-bold uppercase tracking-wide text-forest-900/55">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-forest-900/12 bg-[#fcfaf5] px-4 py-3 text-sm outline-none transition focus:border-honey-500 focus:bg-white focus:ring-4 focus:ring-honey-400/10"
      />
    </div>
  );
}
