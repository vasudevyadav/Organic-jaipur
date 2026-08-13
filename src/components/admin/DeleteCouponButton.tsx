"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCouponButton({ id, code }: { id: string; code: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete coupon "${code}"? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      setDeleting(false);
      alert("Failed to delete coupon.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-sm font-medium text-terracotta-600 hover:text-terracotta-500 disabled:opacity-60"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
