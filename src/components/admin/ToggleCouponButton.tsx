"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToggleCouponButton({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function handleToggle() {
    setUpdating(true);
    const res = await fetch(`/api/admin/coupons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setUpdating(false);
      alert("Failed to update coupon.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={updating}
      className="text-sm font-medium text-brand-700 hover:text-brand-800 disabled:opacity-60"
    >
      {updating ? "Updating..." : active ? "Deactivate" : "Activate"}
    </button>
  );
}
