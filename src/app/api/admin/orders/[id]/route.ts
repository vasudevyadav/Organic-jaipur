import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ORDER_STATUSES } from "@/lib/constants";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const order = await prisma.order.findUnique({ where: { id: (await params).id }, include: { items: true } });
  return order ? NextResponse.json({ order }) : NextResponse.json({ error: "Order not found" }, { status: 404 });
}

async function refundCapturedPayment(paymentId: string, amount: number) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("Razorpay refund credentials are not configured.");
  const response = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/refund`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ amount: Math.round(amount * 100), notes: { reason: "Manual approval rejected" } }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Razorpay refund failed (${response.status}).`);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  if (body?.action === "APPROVE") {
    if (existing.status !== "MANUAL_APPROVAL_REQUIRED") return NextResponse.json({ error: "Only held orders can be approved." }, { status: 409 });
    const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) : "";
    const order = await prisma.order.update({ where: { id }, data: {
      status: existing.paymentMethod === "RAZORPAY" && existing.paymentStatus !== "PAID" ? "PAYMENT_PENDING" : "CONFIRMED",
      approvedBy: process.env.ADMIN_APPROVER_NAME || "Admin", approvedAt: new Date(), approvalNote: note || null,
    }, include: { items: true } });
    return NextResponse.json({ order });
  }

  if (body?.action === "REJECT") {
    if (existing.status !== "MANUAL_APPROVAL_REQUIRED") return NextResponse.json({ error: "Only held orders can be rejected." }, { status: 409 });
    const reason = typeof body.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    if (!reason) return NextResponse.json({ error: "A rejection reason is required." }, { status: 400 });
    if (existing.paymentStatus === "PAID") {
      if (!existing.razorpayPaymentId) return NextResponse.json({ error: "Paid order has no payment ID; refund was not attempted." }, { status: 409 });
      await prisma.order.update({ where: { id }, data: { status: "REJECTED", paymentStatus: "REFUND_PENDING", rejectionReason: reason } });
      try {
        await refundCapturedPayment(existing.razorpayPaymentId, existing.total);
      } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Refund failed." }, { status: 502 });
      }
      const order = await prisma.order.update({ where: { id }, data: { status: "REFUNDED", paymentStatus: "REFUNDED" }, include: { items: true } });
      return NextResponse.json({ order });
    }
    const order = await prisma.order.update({ where: { id }, data: { status: "REJECTED", rejectionReason: reason }, include: { items: true } });
    return NextResponse.json({ order });
  }

  if (!body || typeof body.status !== "string" || !ORDER_STATUSES.includes(body.status)) return NextResponse.json({ error: `status must be one of: ${ORDER_STATUSES.join(", ")}` }, { status: 400 });
  if (existing.status === "MANUAL_APPROVAL_REQUIRED") return NextResponse.json({ error: "Use Approve or Reject for a held order." }, { status: 409 });
  const order = await prisma.order.update({ where: { id }, data: { status: body.status }, include: { items: true } });
  return NextResponse.json({ order });
}
