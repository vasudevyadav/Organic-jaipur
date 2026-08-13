import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-customer";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import AccountNav from "@/components/account/AccountNav";

export const metadata = { title: "My Orders" };

export default async function AccountOrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <AccountNav name={user.name} />

      <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-brand-100 bg-brand-50/60 text-foreground/60">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-brand-50 last:border-0">
                <td className="px-4 py-3 font-mono text-foreground/90">{order.orderNumber}</td>
                <td className="px-4 py-3 text-foreground/70">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3 text-foreground/70">{order.items.length}</td>
                <td className="px-4 py-3 font-medium text-brand-900">{formatPrice(order.total)}</td>
                <td className="px-4 py-3 text-foreground/70">{ORDER_STATUS_LABELS[order.status]}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/account/orders/${order.orderNumber}`} className="text-sm font-medium text-brand-700 hover:text-brand-800">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-foreground/50">
                  You haven&apos;t placed any orders yet.{" "}
                  <Link href="/products" className="font-semibold text-brand-700 hover:text-brand-800">
                    Start shopping
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
