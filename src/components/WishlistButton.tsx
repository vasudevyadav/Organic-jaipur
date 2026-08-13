"use client";

import { useWishlist } from "@/lib/wishlist";

export default function WishlistButton({
  productId,
  className = "",
  showLabel = false,
}: {
  productId: string;
  className?: string;
  showLabel?: boolean;
}) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(productId);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border transition-all ${
        showLabel
          ? active
            ? "border-terracotta-500 bg-[#fff1ea] px-5 py-3 text-terracotta-500"
            : "border-terracotta-500/35 bg-white px-5 py-3 text-terracotta-500 hover:border-terracotta-500 hover:bg-[#fff1ea]"
          : "h-11 w-11 border-terracotta-500/25 bg-white text-terracotta-500 shadow-lg hover:scale-105 hover:border-terracotta-500"
      } ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        className="text-terracotta-500"
      >
        <path d="M12 21s-7.5-4.6-10-9.2C.4 8.5 2 4.5 6 4c2.2-.3 3.9.8 6 3 2.1-2.2 3.8-3.3 6-3 4 .5 5.6 4.5 4 7.8C19.5 16.4 12 21 12 21Z" strokeLinejoin="round" />
      </svg>
      {showLabel && <span className="text-sm font-bold">{active ? "Saved to wishlist ✓" : "♡ Add to wishlist"}</span>}
    </button>
  );
}
