import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderStatusValue } from "@/lib/constants";
import type { OrderStatus } from "@prisma/client";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type Props = {
  searchParams: Promise<{ status?: string }>;
};

function statusBadgeClass(status: OrderStatusValue): string {
  switch (status) {
    case "PENDING":
    case "PAYMENT_PENDING":
      return "bg-honey-400/20 text-honey-600";
    case "MANUAL_APPROVAL_REQUIRED":
      return "bg-terracotta-500/15 text-terracotta-600";
    case "CONFIRMED":
    case "PACKED":
    case "OUT_FOR_DELIVERY":
      return "bg-brand-600/10 text-brand-700";
    case "DELIVERED":
      return "bg-brand-700 text-cream";
    case "CANCELLED":
    case "REJECTED":
      return "bg-foreground/10 text-foreground/50 line-through";
    case "REFUNDED":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-foreground/10 text-foreground/60";
  }
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const activeStatus =
    status && ORDER_STATUSES.includes(status as OrderStatusValue)
      ? (status as OrderStatusValue)
      : undefined;

  const orders = await prisma.order.findMany({
    where: activeStatus ? { status: activeStatus as OrderStatus } : {},
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <AdminPageHeader eyebrow="Fulfillment" title="Orders" />

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/admin/orders"
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            !activeStatus
              ? "bg-brand-600 text-cream"
              : "border border-brand-200 text-foreground/70 hover:bg-brand-50"
          }`}
        >
          All
        </Link>
        {ORDER_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              activeStatus === s
                ? "bg-brand-600 text-cream"
                : "border border-brand-200 text-foreground/70 hover:bg-brand-50"
            }`}
          >
            {ORDER_STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-brand-100 bg-brand-50/60 text-foreground/60">
            <tr>
              <th className="px-4 py-3 font-medium">Order #</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Placed</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-brand-50 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground/90">{order.orderNumber}</td>
                <td className="px-4 py-3 text-foreground/70">{order.customerName}</td>
                <td className="px-4 py-3 text-foreground/70">{order.items.length}</td>
                <td className="px-4 py-3 text-foreground/70">{formatPrice(order.total)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(
                      order.status
                    )}`}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground/70">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-sm font-medium text-brand-700 hover:text-brand-800"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-foreground/50">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
