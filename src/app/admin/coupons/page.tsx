import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import DeleteCouponButton from "@/components/admin/DeleteCouponButton";
import ToggleCouponButton from "@/components/admin/ToggleCouponButton";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

function valueLabel(type: string, value: number): string {
  return type === "PERCENT" ? `${value}% off` : `${formatPrice(value)} off`;
}

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader eyebrow="Promotions" title="Coupons">
        <Link
          href="/admin/coupons/new"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-cream shadow-sm hover:bg-brand-700"
        >
          + Add Coupon
        </Link>
      </AdminPageHeader>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-brand-100 bg-brand-50/60 text-foreground/60">
            <tr>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Discount</th>
              <th className="px-4 py-3 font-medium">Min Order</th>
              <th className="px-4 py-3 font-medium">Expires</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b border-brand-50 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground/90">{coupon.code}</td>
                <td className="px-4 py-3 text-foreground/70">
                  {valueLabel(coupon.type, coupon.value)}
                </td>
                <td className="px-4 py-3 text-foreground/70">
                  {coupon.minOrderValue != null ? formatPrice(coupon.minOrderValue) : "—"}
                </td>
                <td className="px-4 py-3 text-foreground/70">
                  {coupon.expiresAt ? formatDate(coupon.expiresAt) : "No expiry"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      coupon.active
                        ? "bg-brand-600/10 text-brand-700"
                        : "bg-foreground/10 text-foreground/60"
                    }`}
                  >
                    {coupon.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <ToggleCouponButton id={coupon.id} active={coupon.active} />
                    <DeleteCouponButton id={coupon.id} code={coupon.code} />
                  </div>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-foreground/50">
                  No coupons yet. Add your first coupon to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
