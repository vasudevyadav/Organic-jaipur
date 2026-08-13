import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS, type OrderStatusValue } from "@/lib/constants";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/admin/StatCard";
import {
  BoxIcon,
  TruckIconAdmin,
  ClockIcon,
  RupeeIcon,
  StarIconAdmin,
  MailIcon,
} from "@/components/admin/icons";

function statusBadgeClass(status: OrderStatusValue): string {
  switch (status) {
    case "PENDING":
      return "bg-honey-400/20 text-honey-600";
    case "CONFIRMED":
    case "PACKED":
    case "OUT_FOR_DELIVERY":
      return "bg-brand-600/10 text-brand-700";
    case "DELIVERED":
      return "bg-brand-700 text-cream";
    case "CANCELLED":
      return "bg-foreground/10 text-foreground/50 line-through";
    default:
      return "bg-foreground/10 text-foreground/60";
  }
}

export default async function AdminDashboardPage() {
  const [
    productCount,
    orderCount,
    pendingOrderCount,
    revenue,
    reviewStats,
    messageCount,
    recentOrders,
    recentMessages,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.review.aggregate({ _avg: { rating: true }, _count: true }),
    prisma.contactSubmission.count(),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { items: true } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const totalRevenue = revenue._sum.total ?? 0;
  const avgRating = reviewStats._avg.rating ?? 0;

  return (
    <div>
      <AdminPageHeader eyebrow="Overview" title="Dashboard" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Products" value={String(productCount)} icon={BoxIcon} />
        <StatCard label="Orders" value={String(orderCount)} icon={TruckIconAdmin} />
        <StatCard
          label="Pending Orders"
          value={String(pendingOrderCount)}
          icon={ClockIcon}
        />
        <StatCard label="Revenue" value={formatPrice(totalRevenue)} icon={RupeeIcon} />
        <StatCard
          label="Avg Rating"
          value={reviewStats._count > 0 ? avgRating.toFixed(1) : "—"}
          sublabel={`${reviewStats._count} review${reviewStats._count === 1 ? "" : "s"}`}
          icon={StarIconAdmin}
        />
        <StatCard label="Messages" value={String(messageCount)} icon={MailIcon} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-brand-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-brand-700 hover:text-brand-800">
              View all →
            </Link>
          </div>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-brand-100 bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-brand-100 bg-brand-50/60 text-foreground/60">
                <tr>
                  <th className="px-4 py-3 font-medium">Order #</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-brand-50 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-brand-700 hover:text-brand-800"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">{order.customerName}</td>
                    <td className="px-4 py-3 text-foreground/70">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(
                          order.status,
                        )}`}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-foreground/50">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-brand-900">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm font-medium text-brand-700 hover:text-brand-800">
              View all →
            </Link>
          </div>
          <div className="mt-3 space-y-3">
            {recentMessages.length === 0 && (
              <p className="rounded-2xl border border-brand-100 bg-white p-4 text-sm text-foreground/50">
                No messages yet.
              </p>
            )}
            {recentMessages.map((s) => (
              <div key={s.id} className="rounded-2xl border border-brand-100 bg-white p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-foreground/90">{s.name}</span>
                  <span className="text-xs text-foreground/50">{formatDate(s.createdAt)}</span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-foreground/70">{s.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
