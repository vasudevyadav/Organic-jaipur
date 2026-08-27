"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { formatDate, formatPrice } from "@/lib/utils";

type TrackedOrder = {
  orderNumber: string;
  status: string;
  total: number;
  city: string;
  createdAt: string;
  items: Array<{ id: string; quantity: number }>;
};

const STEPS = ["Placed", "Confirmed", "Packed", "On the way", "Delivered"];

const STATUS_STEP: Record<string, number> = {
  PENDING: 0,
  PAYMENT_PENDING: 0,
  MANUAL_APPROVAL_REQUIRED: 0,
  CONFIRMED: 1,
  PACKED: 2,
  OUT_FOR_DELIVERY: 3,
  DELIVERED: 4,
};

export default function HeaderOrderTracker() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const timeout = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setOrder(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      orderNumber: String(formData.get("orderNumber") || "").trim(),
      customerPhone: String(formData.get("customerPhone") || "").trim(),
    };

    try {
      const response = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.formErrors?.[0] ?? "Order nahi mila. Details dobara check karein.";
        throw new Error(message);
      }

      setOrder(data.order);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Kuch galat hua. Dobara try karein.");
    } finally {
      setSubmitting(false);
    }
  }

  const currentStep = order ? (STATUS_STEP[order.status] ?? -1) : -1;
  const stopped = order && ["CANCELLED", "REJECTED", "REFUNDED"].includes(order.status);
  const itemCount = order?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Track order"
        aria-expanded={open}
        aria-controls="header-order-tracker"
        className={`inline-flex h-10 items-center justify-center gap-2 rounded-full border px-2.5 text-brand-800 shadow-sm transition xl:px-3 ${
          open
            ? "border-honey-400 bg-[#fff8e8]"
            : "border-forest-900/10 bg-white hover:border-honey-400 hover:bg-[#fff8e8]"
        }`}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M4 7h11v10H4zM15 10h3l2 3v4h-5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="18" r="1.5" />
          <circle cx="17.5" cy="18" r="1.5" />
        </svg>
        <span className="hidden text-xs font-bold xl:inline">Track</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close order tracker"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-forest-900/25 backdrop-blur-[1px]"
          />
          <section
            id="header-order-tracker"
            role="dialog"
            aria-modal="true"
            aria-labelledby="header-order-tracker-title"
            className="fixed inset-x-3 top-[72px] z-[70] max-h-[calc(100dvh-84px)] overflow-y-auto rounded-[1.5rem] border border-forest-900/10 bg-[#fffdf8] p-5 shadow-[0_24px_70px_rgba(15,40,28,.28)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+12px)] sm:w-[400px]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">Quick Tracking</p>
                <h2 id="header-order-tracker-title" className="mt-1 font-display text-2xl text-forest-900">
                  Order Kahan Pahuncha?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close order tracker"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-white text-forest-900"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div>
                <label htmlFor="header-order-number" className="text-xs font-bold text-forest-900/65">Order ID</label>
                <input
                  id="header-order-number"
                  name="orderNumber"
                  required
                  autoComplete="off"
                  placeholder="OJ-20260807-ABCDE"
                  className="mt-1 w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm text-forest-900 outline-none focus:border-honey-400"
                />
              </div>
              <div>
                <label htmlFor="header-order-phone" className="text-xs font-bold text-forest-900/65">Checkout Phone Number</label>
                <input
                  id="header-order-phone"
                  name="customerPhone"
                  type="tel"
                  required
                  minLength={6}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="9876543210"
                  className="mt-1 w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm text-forest-900 outline-none focus:border-honey-400"
                />
              </div>

              {error && <p role="alert" className="rounded-xl bg-terracotta-400/10 px-3 py-2.5 text-xs font-semibold leading-5 text-terracotta-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center rounded-full bg-forest-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-800 disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? "Order dhoondh rahe hain..." : "Status Dekhiye →"}
              </button>
            </form>

            {order && (
              <div className="mt-5 rounded-[1.2rem] border border-forest-900/10 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.14em] text-forest-900/40">{order.orderNumber}</p>
                    <p className={`mt-1 text-sm font-extrabold ${stopped ? "text-terracotta-600" : "text-brand-700"}`}>
                      {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS] ?? order.status.replaceAll("_", " ")}
                    </p>
                  </div>
                  <p className="text-right text-[10px] leading-4 text-forest-900/50">{formatDate(order.createdAt)}<br />{order.city}</p>
                </div>

                {!stopped && (
                  <div className="mt-4 flex items-start">
                    {STEPS.map((step, index) => (
                      <div key={step} className="flex min-w-0 flex-1 flex-col items-center text-center">
                        <div className="flex w-full items-center">
                          {index > 0 && <span className={`h-0.5 flex-1 ${currentStep >= index ? "bg-brand-600" : "bg-brand-100"}`} />}
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${currentStep >= index ? "bg-brand-600 text-white" : "border border-brand-200 bg-white text-brand-400"}`}>
                            {currentStep >= index ? "✓" : index + 1}
                          </span>
                          {index < STEPS.length - 1 && <span className={`h-0.5 flex-1 ${currentStep > index ? "bg-brand-600" : "bg-brand-100"}`} />}
                        </div>
                        <span className="mt-1.5 text-[8px] font-semibold leading-3 text-forest-900/55">{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-forest-900/8 pt-3 text-xs text-forest-900/60">
                  <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
                  <strong className="text-sm text-forest-900">{formatPrice(order.total)}</strong>
                </div>
              </div>
            )}

            <Link href="/track-order" onClick={() => setOpen(false)} className="mt-4 flex justify-center text-xs font-bold text-brand-700 underline underline-offset-4">
              Full tracking details dekhiye
            </Link>
          </section>
        </>
      )}
    </div>
  );
}
