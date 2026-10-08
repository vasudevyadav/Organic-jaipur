export const RAJASTHAN_SHIPPING_CHARGE = 100;
export const INDIA_SHIPPING_CHARGE = 150;

export type ShippingReason =
  | "Empty Cart"
  | "Jaipur Free Delivery"
  | "Rajasthan Flat Shipping"
  | "India Flat Shipping";

export type ShippingResult = {
  shippingCharge: number;
  isFreeShipping: boolean;
  reason: ShippingReason;
  message: string;
  amountToFreeShipping: number;
};

export type ShippingInput = {
  city?: string | null;
  state?: string | null;
  orderValue: number;
  totalWeight: number;
};

export function normalizeLocation(value?: string | null): string {
  return (value ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-IN");
}

export function calculateShipping(input: ShippingInput): ShippingResult {
  const orderValue = Number.isFinite(input.orderValue) ? Math.max(0, input.orderValue) : 0;

  if (orderValue === 0) {
    return { shippingCharge: 0, isFreeShipping: true, reason: "Empty Cart", message: "Delivery calculated at checkout", amountToFreeShipping: 0 };
  }

  const city = normalizeLocation(input.city);
  const state = normalizeLocation(input.state);
  if (city === "jaipur" && state === "rajasthan") {
    return { shippingCharge: 0, isFreeShipping: true, reason: "Jaipur Free Delivery", message: "Free delivery in Jaipur", amountToFreeShipping: 0 };
  }

  if (state === "rajasthan") {
    return { shippingCharge: RAJASTHAN_SHIPPING_CHARGE, isFreeShipping: false, reason: "Rajasthan Flat Shipping", message: `Rajasthan delivery ₹${RAJASTHAN_SHIPPING_CHARGE}`, amountToFreeShipping: 0 };
  }

  return { shippingCharge: INDIA_SHIPPING_CHARGE, isFreeShipping: false, reason: "India Flat Shipping", message: `All India delivery ₹${INDIA_SHIPPING_CHARGE}`, amountToFreeShipping: 0 };
}

export const SHIPPING_POLICY_SUMMARY = `Delivery is free within Jaipur. A flat ₹${RAJASTHAN_SHIPPING_CHARGE} delivery charge applies elsewhere in Rajasthan, and a flat ₹${INDIA_SHIPPING_CHARGE} delivery charge applies outside Rajasthan across India. Cash on Delivery and online payment are available at checkout.`;
