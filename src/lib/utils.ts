import { BUSINESS } from "./constants";

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

/** Encode each public-file path segment without encoding the `/` separators. */
export function safeImageUrl(url: string): string {
  if (!url.startsWith("/")) return url;
  const optimizedUrl =
    url.startsWith("/product/") &&
    !url.startsWith("/product/optimized/") &&
    !url.endsWith("/download.png") &&
    url.toLowerCase().endsWith(".png")
      ? `/product/optimized/${url.slice("/product/".length, -4)}.jpg`
      : url;

  return optimizedUrl
    .split("/")
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join("/");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function whatsappOrderLink(productName: string): string {
  const message = `Hi Organic Jaipur, I'd like to order: ${productName}. Please share availability and delivery details.`;
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const ORDER_NUMBER_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderNumber(): string {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += ORDER_NUMBER_ALPHABET[Math.floor(Math.random() * ORDER_NUMBER_ALPHABET.length)];
  }
  return `OJ-${datePart}-${suffix}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
