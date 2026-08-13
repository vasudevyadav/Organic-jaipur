"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CouponForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState(true);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const minOrderValue = String(formData.get("minOrderValue") || "").trim();
    const expiresAt = String(formData.get("expiresAt") || "").trim();

    const payload = {
      code: String(formData.get("code") || ""),
      type: String(formData.get("type") || "PERCENT"),
      value: Number(formData.get("value") || 0),
      minOrderValue: minOrderValue ? Number(minOrderValue) : undefined,
      expiresAt: expiresAt || undefined,
      active,
    };

    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setSubmitting(false);
      const data = await res.json().catch(() => null);
      setError(
        typeof data?.error === "string"
          ? data.error
          : "Please check the form fields and try again."
      );
      return;
    }

    router.push("/admin/coupons");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="code" className="text-sm font-medium text-foreground/80">
          Coupon Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          required
          minLength={3}
          placeholder="e.g. WELCOME10"
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="text-sm font-medium text-foreground/80">
            Discount Type
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue="PERCENT"
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            <option value="PERCENT">Percent Off</option>
            <option value="FIXED">Fixed Amount Off</option>
          </select>
        </div>
        <div>
          <label htmlFor="value" className="text-sm font-medium text-foreground/80">
            Value
          </label>
          <input
            id="value"
            name="value"
            type="number"
            required
            min={0}
            step="0.01"
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="minOrderValue" className="text-sm font-medium text-foreground/80">
            Minimum Order Value (₹, optional)
          </label>
          <input
            id="minOrderValue"
            name="minOrderValue"
            type="number"
            min={0}
            step="0.01"
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="expiresAt" className="text-sm font-medium text-foreground/80">
            Expiry Date (optional)
          </label>
          <input
            id="expiresAt"
            name="expiresAt"
            type="date"
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-400"
        />
        Active
      </label>

      {error && <p className="text-sm text-terracotta-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-cream shadow-md transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Add Coupon"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/coupons")}
          className="rounded-full border border-brand-200 px-7 py-3 text-sm font-semibold text-foreground/70 hover:bg-brand-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
