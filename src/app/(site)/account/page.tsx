import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-customer";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import AccountNav from "@/components/account/AccountNav";

export const metadata = { title: "My Account" };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const [orderCount, addressCount, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId: user.id } }),
    prisma.address.count({ where: { userId: user.id } }),
    prisma.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <AccountNav name={user.name} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <p className="text-sm text-foreground/50">Total Orders</p>
          <p className="mt-1 font-display text-3xl font-semibold text-brand-900">{orderCount}</p>
          <Link href="/account/orders" className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
            View Orders →
          </Link>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <p className="text-sm text-foreground/50">Saved Addresses</p>
          <p className="mt-1 font-display text-3xl font-semibold text-brand-900">{addressCount}</p>
          <Link href="/account/addresses" className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
            Manage Addresses →
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-brand-900">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="mt-3 text-sm text-foreground/50">You haven&apos;t placed any orders yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.orderNumber}`}
                className="flex items-center justify-between rounded-xl border border-brand-50 px-4 py-3 hover:bg-brand-50/50"
              >
                <div>
                  <p className="font-mono text-sm font-medium text-foreground/90">{order.orderNumber}</p>
                  <p className="text-xs text-foreground/50">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-brand-900">{formatPrice(order.total)}</p>
                  <p className="text-xs text-foreground/60">{ORDER_STATUS_LABELS[order.status]}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 text-sm text-foreground/70">
        <p className="font-medium text-foreground/90">Account Details</p>
        <p className="mt-2">{user.email}</p>
        {user.phone && <p>{user.phone}</p>}
      </div>
    </main>
  );
}
