import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-customer";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import AccountNav from "@/components/account/AccountNav";

type Props = { params: Promise<{ orderNumber: string }> };

export async function generateMetadata({ params }: Props) {
  const { orderNumber } = await params;
  return { title: `Order ${orderNumber}` };
}

export default async function AccountOrderDetailPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const { orderNumber } = await params;
  const order = await prisma.order.findUnique({ where: { orderNumber }, include: { items: true } });

  if (!order || order.userId !== user.id) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <AccountNav name={user.name} />

      <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-sm text-foreground/50">{order.orderNumber}</p>
            <p className="mt-1 font-display text-xl font-semibold text-brand-900">
              {ORDER_STATUS_LABELS[order.status]}
            </p>
          </div>
          <p className="text-sm text-foreground/50">Placed on {formatDate(order.createdAt)}</p>
        </div>

        <div className="mt-6 space-y-2 border-t border-brand-100 pt-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-foreground/70">
              <span>
                {item.productName} × {item.quantity} ({item.unit})
              </span>
              <span>{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1.5 border-t border-brand-100 pt-4 text-sm">
          <div className="flex justify-between text-foreground/70">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-brand-700">
              <span>Discount{order.couponCode ? ` (${order.couponCode})` : ""}</span>
              <span>−{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-foreground/70">
            <span>Delivery</span>
            <span>{order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between border-t border-brand-100 pt-2 text-base font-semibold text-brand-900">
            <span>Total (Cash on Delivery)</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="mt-6 border-t border-brand-100 pt-4 text-sm text-foreground/70">
          <p className="font-medium text-foreground/90">Delivered to</p>
          <p className="mt-1">
            {order.addressLine1}
            {order.addressLine2 ? `, ${order.addressLine2}` : ""}, {order.city}, {order.state} {order.pincode}
          </p>
          <p className="mt-1">{order.customerPhone}</p>
        </div>
      </div>

      <Link href="/account/orders" className="mt-6 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
        ← Back to Orders
      </Link>
    </main>
  );
}
