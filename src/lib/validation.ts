import { z } from "zod";

// Indian mobile numbers: exactly 10 digits, starting with 6-9. Strips spaces,
// dashes, +91/91 prefixes before checking so common paste formats still pass.
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const indianMobile = (message = "Enter a valid 10-digit mobile number") =>
  z.string().transform((value) => value.replace(/[\s-]/g, "").replace(/^(\+91|91)/, "")).pipe(z.string().regex(INDIAN_MOBILE_REGEX, message));

export const CATEGORY_VALUES = [
  "VEGETABLES",
  "FRUITS",
  "GHEE",
  "MUSTARD_OIL",
  "HONEY",
  "PICKLES",
] as const;

export const productSchema = z.object({
  name: z.string().min(2).max(120),
  category: z.enum(CATEGORY_VALUES),
  price: z.coerce.number().positive(),
  originalPrice: z.coerce.number().positive().optional().or(z.literal("").transform(() => undefined)),
  unit: z.string().min(1).max(40),
  weight: z.coerce.number().int().nonnegative(),
  description: z.string().min(10).max(2000),
  ingredients: z.string().max(1000).optional().or(z.literal("")),
  benefits: z.string().max(1000).optional().or(z.literal("")),
  storageInfo: z.string().max(500).optional().or(z.literal("")),
  imageUrl: z.string().min(1),
  inStock: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
});

export const productUpdateSchema = productSchema.partial();

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(20).optional().or(z.literal("")),
  message: z.string().min(5).max(2000),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(72),
  phone: indianMobile().optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(72),
});

export const addressSchema = z.object({
  label: z.string().min(1).max(40),
  line1: z.string().min(2).max(200),
  line2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(1).max(80),
  state: z.string().min(1).max(80),
  pincode: z.string().min(4).max(10),
  phone: indianMobile(),
  isDefault: z.coerce.boolean().default(false),
});

export const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().max(50),
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
  customerName: z.string().min(2).max(120),
  customerPhone: indianMobile(),
  customerEmail: z.string().email().optional().or(z.literal("")),
  addressLine1: z.string().min(2).max(200),
  addressLine2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(1).max(80),
  state: z.string().min(1).max(80),
  pincode: z.string().min(4).max(10),
  notes: z.string().max(500).optional().or(z.literal("")),
  couponCode: z.string().max(40).optional().or(z.literal("")),
  paymentMethod: z.enum(["COD", "RAZORPAY"]).default("RAZORPAY"),
});

export const trackOrderSchema = z.object({
  orderNumber: z.string().min(1),
  customerPhone: indianMobile(),
});

export const reviewSchema = z.object({
  productId: z.string().min(1),
  customerName: z.string().min(2).max(120),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(5).max(1000),
  contact: z.string().max(120).optional().or(z.literal("")),
});

export const couponSchema = z.object({
  code: z.string().min(3).max(40),
  type: z.enum(["PERCENT", "FIXED"]),
  value: z.coerce.number().positive(),
  minOrderValue: z.coerce.number().nonnegative().optional(),
  maximumDiscount: z.coerce.number().nonnegative().optional(),
  canStack: z.coerce.boolean().default(false),
  usageLimit: z.coerce.number().int().positive().optional(),
  firstOrderOnly: z.coerce.boolean().default(false),
  expiresAt: z.string().optional().or(z.literal("")),
  active: z.coerce.boolean().default(true),
});
