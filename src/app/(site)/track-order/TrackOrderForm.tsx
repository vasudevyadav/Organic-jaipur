"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ORDER_STATUS_LABELS, ORDER_STATUSES } from "@/lib/constants";
import { formatDate, formatPrice } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type OrderItem = {
  id: string;
  productName: string;
  unitPrice: number;
  unit: string;
  quantity: number;
};

type TrackedOrder = {
  orderNumber: string;
  status: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode: string | null;
  customerName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  notes: string | null;
  createdAt: string;
  items: OrderItem[];
};

// Linear delivery journey — CANCELLED is a distinct end-state handled separately below.
const TIMELINE_STATUSES = ORDER_STATUSES.filter((s) => s !== "CANCELLED");

export default function TrackOrderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setOrder(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      orderNumber: String(formData.get("orderNumber") || "").trim(),
      customerPhone: String(formData.get("customerPhone") || "").trim(),
    };

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.formErrors?.[0] ?? "We couldn't find that order. Please try again.";
        throw new Error(message);
      }

      setOrder(data.order);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const currentIndex = order ? TIMELINE_STATUSES.indexOf(order.status as typeof TIMELINE_STATUSES[number]) : -1;
  const isCancelled = order?.status === "CANCELLED";

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-[1.4rem] border border-forest-900/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="orderNumber" className="text-sm font-semibold text-forest-900/70">
              Order Number
            </label>
            <input
              id="orderNumber"
              name="orderNumber"
              type="text"
              required
              placeholder="OJ-20260807-ABCDE"
              className="mt-1 w-full rounded-xl border border-forest-900/15 px-4 py-2.5 text-sm text-forest-900 outline-none focus:border-forest-900/40"
            />
          </div>
          <div>
            <label htmlFor="customerPhone" className="text-sm font-semibold text-forest-900/70">
              Phone Number
            </label>
            <input
              id="customerPhone"
              name="customerPhone"
              type="tel"
              required
              minLength={6}
              placeholder="9876543210"
              className="mt-1 w-full rounded-xl border border-forest-900/15 px-4 py-2.5 text-sm text-forest-900 outline-none focus:border-forest-900/40"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-terracotta-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 w-full rounded-full bg-honey-400 px-7 py-3 text-sm font-bold text-forest-900 shadow-md transition-colors hover:bg-honey-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Searching..." : "Track Order"}
        </button>
      </form>

      {status === "success" && order && (
        <div className="space-y-6 rounded-[1.4rem] border border-forest-900/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-forest-900/50">
                Order Number
              </p>
              <p className="font-display text-lg font-semibold text-forest-900">
                {order.orderNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wide text-forest-900/50">
                Placed On
              </p>
              <p className="text-sm font-medium text-forest-900/80">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Status timeline */}
          {isCancelled ? (
            <div className="rounded-xl border border-terracotta-500/30 bg-terracotta-400/10 px-4 py-4 text-center">
              <p className="font-display text-base font-semibold text-terracotta-600">
                {ORDER_STATUS_LABELS.CANCELLED}
              </p>
              <p className="mt-1 text-sm text-foreground/70">
                This order was cancelled. Message us on WhatsApp if you have any questions.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between">
                {TIMELINE_STATUSES.map((s, i) => {
                  const isDone = currentIndex >= 0 && i <= currentIndex;
                  const isCurrent = i === currentIndex;
                  return (
                    <div key={s} className="flex flex-1 flex-col items-center text-center">
                      <div className="flex w-full items-center">
                        {i > 0 && (
                          <span
                            className={`h-0.5 flex-1 ${
                              isDone ? "bg-brand-600" : "bg-brand-100"
                            }`}
                          />
                        )}
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            isDone
                              ? "bg-brand-600 text-cream"
                              : "border border-brand-200 bg-white text-brand-400"
                          } ${isCurrent ? "ring-2 ring-brand-300 ring-offset-2" : ""}`}
                        >
                          {isDone ? "✓" : i + 1}
                        </span>
                        {i < TIMELINE_STATUSES.length - 1 && (
                          <span
                            className={`h-0.5 flex-1 ${
                              currentIndex > i ? "bg-brand-600" : "bg-brand-100"
                            }`}
                          />
                        )}
                      </div>
                      <span
                        className={`mt-2 max-w-20 text-[11px] font-medium sm:text-xs ${
                          isDone ? "text-brand-800" : "text-foreground/50"
                        }`}
                      >
                        {ORDER_STATUS_LABELS[s]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Items */}
          <div>
            <h3 className="font-display text-base font-semibold text-brand-900">Items</h3>
            <div className="mt-3 divide-y divide-brand-100 rounded-xl border border-brand-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground/85">{item.productName}</p>
                    <p className="text-foreground/50">
                      {item.quantity} × {item.unit} @ {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-medium text-foreground/85">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 border-t border-brand-100 pt-4 text-sm">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-foreground/70">
                <span>Discount{order.couponCode ? ` (${order.couponCode})` : ""}</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-foreground/70">
              <span>Delivery</span>
              <span>{order.shippingFee > 0 ? formatPrice(order.shippingFee) : "Free"}</span>
            </div>
            <div className="flex justify-between pt-1 font-display text-base font-semibold text-brand-900">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Delivery address */}
          <div className="border-t border-brand-100 pt-4">
            <h3 className="font-display text-base font-semibold text-brand-900">
              Delivery Address
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              {order.customerName}
              <br />
              {order.addressLine1}
              {order.addressLine2 ? `, ${order.addressLine2}` : ""}
              <br />
              {order.city}, {order.state} {order.pincode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
