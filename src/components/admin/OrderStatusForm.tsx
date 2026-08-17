"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderStatusValue } from "@/lib/constants";

export default function OrderStatusForm({
  orderId,
  status,
  approvalReason,
}: {
  orderId: string;
  status: OrderStatusValue;
  approvalReason?: string | null;
}) {
  const router = useRouter();
  const [value, setValue] = useState<OrderStatusValue>(status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");

    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: value }),
    });

    if (!res.ok) {
      setSaving(false);
      const data = await res.json().catch(() => null);
      setError(
        typeof data?.error === "string" ? data.error : "Failed to update order status."
      );
      return;
    }

    setSaving(false);
    router.refresh();
  }

  async function handleDecision(action: "APPROVE" | "REJECT") {
    const text = window.prompt(action === "APPROVE" ? "Approval note (optional)" : "Rejection reason (required)", "");
    if (text === null || (action === "REJECT" && !text.trim())) return;
    setSaving(true); setError("");
    const res = await fetch(`/api/admin/orders/${orderId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(action === "APPROVE" ? { action, note: text } : { action, reason: text }) });
    const data = await res.json().catch(() => null);
    setSaving(false);
    if (!res.ok) { setError(data?.error ?? "Could not update the held order."); return; }
    router.refresh();
  }

  if (status === "MANUAL_APPROVAL_REQUIRED") return (
    <div>
      <p className="text-sm font-semibold text-terracotta-600">Manual approval required</p>
      {approvalReason && <p className="mt-1 text-sm text-foreground/70">{approvalReason}</p>}
      <div className="mt-4 flex gap-3">
        <button type="button" disabled={saving} onClick={() => handleDecision("APPROVE")} className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-cream disabled:opacity-60">Approve</button>
        <button type="button" disabled={saving} onClick={() => handleDecision("REJECT")} className="rounded-full border border-terracotta-500 px-6 py-2.5 text-sm font-semibold text-terracotta-600 disabled:opacity-60">Reject</button>
      </div>
      {error && <p className="mt-3 text-sm text-terracotta-600">{error}</p>}
    </div>
  );

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label htmlFor="status" className="text-sm font-medium text-foreground/80">
          Order Status
        </label>
        <select
          id="status"
          value={value}
          onChange={(e) => setValue(e.target.value as OrderStatusValue)}
          className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-cream shadow-sm hover:bg-brand-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      {error && <p className="w-full text-sm text-terracotta-600">{error}</p>}
    </div>
  );
}
