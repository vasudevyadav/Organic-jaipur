import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { BUSINESS, MANUAL_APPROVAL_CUSTOMER_MESSAGE } from "@/lib/constants";
import OrderSuccessAnimation from "@/components/OrderSuccessAnimation";

type Props = { params: Promise<{ orderNumber: string }> };

export async function generateMetadata({ params }: Props) {
  const { orderNumber } = await params;
  return {
    title: `Order ${orderNumber} Confirmed`,
    robots: { index: false, follow: false },
  };
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;
  const order = await prisma.order.findUnique({ where: { orderNumber }, include: { items: true } });

  if (!order) notFound();

  const paidOnline = order.paymentMethod === "RAZORPAY" && order.paymentStatus === "PAID";
  const manualApproval = order.status === "MANUAL_APPROVAL_REQUIRED";
  const paymentLabel = paidOnline ? "Paid online" : order.paymentMethod === "RAZORPAY" ? "Payment after approval" : "Cash on delivery";

  return (
    <main className="min-h-[75vh] bg-[#fbf8ef] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-200/70 bg-white px-6 py-10 text-center shadow-[0_24px_70px_rgba(15,40,28,.10)] sm:px-12 sm:py-12">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-brand-500 via-honey-400 to-terracotta-500" />
        <OrderSuccessAnimation />
        <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[.22em] text-brand-700">{manualApproval ? "Order received" : "Order confirmed"}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-forest-900 sm:text-5xl">
          {manualApproval ? "We’re reviewing your order" : "Thank you for your order!"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-forest-900/60 sm:text-base">
          {manualApproval ? MANUAL_APPROVAL_CUSTOMER_MESSAGE : <>Hi {order.customerName}, your order has been received. We&apos;ll prepare it carefully and keep you updated as it moves toward your doorstep.</>}
        </p>
        <div className="mx-auto mt-7 flex max-w-md flex-col overflow-hidden rounded-2xl border border-forest-900/10 bg-[#faf7ee] sm:flex-row sm:divide-x sm:divide-forest-900/10">
          <div className="flex-1 px-5 py-3"><p className="text-[9px] font-bold uppercase tracking-wider text-forest-900/40">Order number</p><p className="mt-1 font-mono text-sm font-bold text-forest-900">{order.orderNumber}</p></div>
          <div className="flex-1 border-t border-forest-900/10 px-5 py-3 sm:border-0"><p className="text-[9px] font-bold uppercase tracking-wider text-forest-900/40">Payment</p><p className="mt-1 text-sm font-bold text-brand-700">{paymentLabel}</p></div>
        </div>

        {!manualApproval && <div className="mx-auto mt-8 flex max-w-xl items-start justify-between text-[10px] font-bold text-forest-900/45">
          {["Confirmed", "Preparing", "On the way", "Delivered"].map((step, index) => (
            <div key={step} className="relative flex flex-1 flex-col items-center gap-2">
              {index > 0 && <span className="absolute right-1/2 top-3 h-px w-full bg-forest-900/15" />}
              <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${index === 0 ? "bg-brand-600 text-white" : "border border-forest-900/15 bg-white"}`}>{index === 0 ? "✓" : index + 1}</span>
              <span className={index === 0 ? "text-brand-700" : ""}>{step}</span>
            </div>
          ))}
        </div>}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <section className="rounded-[1.5rem] border border-brand-100 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex items-center justify-between"><h2 className="font-display text-xl font-semibold text-forest-900">Order summary</h2><span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold text-brand-700">{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span></div>
        <div className="mt-4 space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 border-b border-forest-900/8 py-3 text-sm last:border-0">
              <span className="text-forest-900/70"><strong className="font-semibold text-forest-900">{item.productName}</strong><small className="mt-0.5 block text-forest-900/40">{item.unit} · {formatPrice(item.unitPrice)} × {item.quantity}</small></span>
              <span className="font-bold text-forest-900">{formatPrice(item.unitPrice * item.quantity)}</span>
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
          <div className="flex items-end justify-between border-t border-brand-100 pt-3 font-semibold text-brand-900">
            <span>Total <small className="block text-[10px] font-normal text-forest-900/45">{paymentLabel}</small></span>
            <span className="font-display text-2xl">{formatPrice(order.total)}</span>
          </div>
        </div>
      </section>

      <aside className="rounded-[1.5rem] border border-brand-100 bg-white p-6 shadow-sm sm:p-7">
        <div className="text-sm text-foreground/70">
          <p className="font-display text-xl font-semibold text-forest-900">Delivery details</p>
          <p className="mt-4 font-bold text-forest-900">{order.customerName}</p>
          <p className="mt-1">
            {order.addressLine1}
            {order.addressLine2 ? `, ${order.addressLine2}` : ""}, {order.city}, {order.state} {order.pincode}
          </p>
          <p className="mt-1">{order.customerPhone}</p>
        </div>
        <div className="mt-5 rounded-xl bg-[#faf7ee] p-4 text-xs leading-5 text-forest-900/55"><strong className="block text-forest-900">What happens next?</strong>We&apos;ll confirm preparation and delivery updates on your registered phone number.</div>
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-foreground/40">Placed on {formatDate(order.createdAt)}</p>
      </aside>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/track-order`}
          className="rounded-full border border-brand-600 px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
        >
          Track This Order
        </Link>
        <Link
          href="/products"
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-cream shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700"
        >
          Continue Shopping
        </Link>
        <a
          href={`https://wa.me/${BUSINESS.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-brand-200 px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
        >
          Questions? Chat on WhatsApp
        </a>
      </div>
      </div>
    </main>
  );
}
