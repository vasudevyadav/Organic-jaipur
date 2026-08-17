export const FREE_SHIPPING_THRESHOLD = 1499;
export const JAIPUR_FREE_DELIVERY = true;

export const WEIGHT_SLABS = [
  { maxWeightGrams: 500, charge: 59 },
  { maxWeightGrams: 1000, charge: 79 },
  { maxWeightGrams: 2000, charge: 99 },
  { maxWeightGrams: 3000, charge: 129 },
  { maxWeightGrams: 5000, charge: 159 },
  { maxWeightGrams: Number.POSITIVE_INFINITY, charge: 199 },
] as const;

export type ShippingReason =
  | "Empty Cart"
  | "Jaipur Free Delivery"
  | "Rajasthan Free Delivery"
  | "Rajasthan Weight Based Shipping"
  | "Rajasthan Partial Shipping"
  | "Default Shipping";

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

export function getWeightBasedShipping(totalWeight: number): number {
  const weight = Number.isFinite(totalWeight) ? Math.max(0, totalWeight) : 0;
  return WEIGHT_SLABS.find((slab) => weight <= slab.maxWeightGrams)!.charge;
}

// Kept separate so non-Rajasthan delivery can evolve without changing Rajasthan rules.
export function calculateDefaultShipping(input: ShippingInput): number {
  void input;
  return 0;
}

export function calculateShipping(input: ShippingInput): ShippingResult {
  const orderValue = Number.isFinite(input.orderValue) ? Math.max(0, input.orderValue) : 0;
  const totalWeight = Number.isFinite(input.totalWeight) ? Math.max(0, input.totalWeight) : 0;
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - orderValue, 0);

  if (orderValue === 0) {
    return { shippingCharge: 0, isFreeShipping: true, reason: "Empty Cart", message: "Free Delivery", amountToFreeShipping };
  }

  const city = normalizeLocation(input.city);
  const state = normalizeLocation(input.state);
  if (JAIPUR_FREE_DELIVERY && city === "jaipur") {
    return { shippingCharge: 0, isFreeShipping: true, reason: "Jaipur Free Delivery", message: "Free Delivery", amountToFreeShipping };
  }

  if (state === "rajasthan") {
    const weightCharge = getWeightBasedShipping(totalWeight);
    if (orderValue >= FREE_SHIPPING_THRESHOLD && totalWeight <= 3000) {
      return { shippingCharge: 0, isFreeShipping: true, reason: "Rajasthan Free Delivery", message: "Free Delivery", amountToFreeShipping: 0 };
    }
    if (orderValue >= FREE_SHIPPING_THRESHOLD) {
      const shippingCharge = weightCharge / 2;
      return { shippingCharge, isFreeShipping: false, reason: "Rajasthan Partial Shipping", message: "50% Shipping Applied", amountToFreeShipping: 0 };
    }
    return { shippingCharge: weightCharge, isFreeShipping: false, reason: "Rajasthan Weight Based Shipping", message: `Shipping ₹${weightCharge}`, amountToFreeShipping };
  }

  const shippingCharge = calculateDefaultShipping(input);
  return { shippingCharge, isFreeShipping: shippingCharge === 0, reason: "Default Shipping", message: shippingCharge === 0 ? "Free Delivery" : `Shipping ₹${shippingCharge}`, amountToFreeShipping };
}
