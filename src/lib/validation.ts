import { z } from "zod";

export const CATEGORY_VALUES = [
  "VEGETABLES",
  "FRUITS",
  "GHEE",
  "MUSTARD_OIL",
  "HONEY",
] as const;

export const productSchema = z.object({
  name: z.string().min(2).max(120),
  category: z.enum(CATEGORY_VALUES),
  price: z.coerce.number().positive(),
  originalPrice: z.coerce.number().positive().optional().or(z.literal("").transform(() => undefined)),
  unit: z.string().min(1).max(40),
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
  phone: z.string().max(20).optional().or(z.literal("")),
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
  phone: z.string().min(6).max(20),
  isDefault: z.coerce.boolean().default(false),
});

export const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().max(50),
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
  customerName: z.string().min(2).max(120),
  customerPhone: z.string().min(6).max(20),
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
  customerPhone: z.string().min(6).max(20),
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
  expiresAt: z.string().optional().or(z.literal("")),
  active: z.coerce.boolean().default(true),
});
