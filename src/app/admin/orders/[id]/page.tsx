import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        backHref="/admin/orders"
        backLabel="Back to Orders"
        title={order.orderNumber}
        subtitle={`Placed on ${formatDate(order.createdAt)}`}
      />

      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8">
        <OrderStatusForm orderId={order.id} status={order.status} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-brand-900">Customer</h2>
          <dl className="mt-3 space-y-1 text-sm text-foreground/70">
            <div>
              <dt className="inline font-medium text-foreground/80">Name: </dt>
              <dd className="inline">{order.customerName}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-foreground/80">Phone: </dt>
              <dd className="inline">{order.customerPhone}</dd>
            </div>
            {order.customerEmail && (
              <div>
                <dt className="inline font-medium text-foreground/80">Email: </dt>
                <dd className="inline">{order.customerEmail}</dd>
              </div>
            )}
            <div>
              <dt className="inline font-medium text-foreground/80">Payment: </dt>
              <dd className="inline">{order.paymentMethod}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-brand-900">Shipping Address</h2>
          <p className="mt-3 text-sm text-foreground/70">
            {order.addressLine1}
            {order.addressLine2 ? `, ${order.addressLine2}` : ""}
            <br />
            {order.city}, {order.state} {order.pincode}
          </p>
          {order.notes && (
            <p className="mt-3 text-sm text-foreground/70">
              <span className="font-medium text-foreground/80">Notes: </span>
              {order.notes}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-brand-100 bg-brand-50/60 text-foreground/60">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Unit</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Qty</th>
              <th className="px-4 py-3 font-medium text-right">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-brand-50 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground/90">{item.productName}</td>
                <td className="px-4 py-3 text-foreground/70">{item.unit}</td>
                <td className="px-4 py-3 text-foreground/70">{formatPrice(item.unitPrice)}</td>
                <td className="px-4 py-3 text-foreground/70">{item.quantity}</td>
                <td className="px-4 py-3 text-right text-foreground/70">
                  {formatPrice(item.unitPrice * item.quantity)}
                </td>
              </tr>
            ))}
            {order.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-foreground/50">
                  No items on this order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-xs space-y-2 rounded-2xl border border-brand-100 bg-white p-6 text-sm">
          <div className="flex justify-between text-foreground/70">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-foreground/70">
            <span>Discount{order.couponCode ? ` (${order.couponCode})` : ""}</span>
            <span>-{formatPrice(order.discount)}</span>
          </div>
          <div className="flex justify-between text-foreground/70">
            <span>Shipping</span>
            <span>{formatPrice(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between border-t border-brand-100 pt-2 font-semibold text-brand-900">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
