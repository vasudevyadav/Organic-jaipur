import type { Coupon } from "@prisma/client";
import { MAX_ORDER_DISCOUNT, ONLINE_PAYMENT_DISCOUNT_PERCENT } from "@/lib/constants";

export const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function calculateOrderDiscount({
  subtotal,
  coupon,
  paymentMethod,
}: {
  subtotal: number;
  coupon: Coupon | null;
  paymentMethod: "COD" | "RAZORPAY";
}) {
  if (!Number.isFinite(subtotal) || subtotal < 0) throw new Error("Invalid subtotal.");

  const rawCouponDiscount = coupon
    ? coupon.type === "PERCENT"
      ? money((subtotal * coupon.value) / 100)
      : money(coupon.value)
    : 0;
  if (!Number.isFinite(rawCouponDiscount) || rawCouponDiscount < 0) {
    throw new Error("Invalid coupon discount.");
  }

  const couponDiscount = money(Math.min(rawCouponDiscount, coupon?.maximumDiscount ?? subtotal));
  const mayStackPaymentOffer = !coupon || coupon.canStack;
  const paymentDiscount = paymentMethod === "RAZORPAY" && mayStackPaymentOffer
    ? money(((subtotal - couponDiscount) * ONLINE_PAYMENT_DISCOUNT_PERCENT) / 100)
    : 0;
  const finalDiscount = money(couponDiscount + paymentDiscount);

  if (finalDiscount < 0 || finalDiscount > subtotal) {
    throw new Error("Calculated discount is outside the valid order range.");
  }

  return {
    rawCouponDiscount,
    couponDiscount,
    paymentDiscount,
    finalDiscount,
    requiresManualApproval: finalDiscount > MAX_ORDER_DISCOUNT,
  };
}
