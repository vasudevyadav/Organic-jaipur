"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    unit: string;
    imageUrl: string;
    inStock: boolean;
  };
};

export default function ProductPurchasePanel({ product }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        unit: product.unit,
        imageUrl: product.imageUrl,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  const controls = (
    <>
      <div className="flex items-center gap-1 rounded-full border border-forest-900/15 bg-[#faf7ee] p-1">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-10 w-10 rounded-full text-lg text-forest-900/70 transition hover:bg-white"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold text-forest-900">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => Math.min(50, q + 1))}
          className="h-10 w-10 rounded-full text-lg text-forest-900/70 transition hover:bg-white"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="flex-1 rounded-full border border-forest-900 px-6 py-3.5 text-sm font-bold text-forest-900 transition hover:bg-forest-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {added ? `Added ${quantity} to Cart ✓` : `Add ${quantity} to Cart`}
      </button>

      <button
        type="button"
        onClick={handleBuyNow}
        disabled={!product.inStock}
        className="flex-1 rounded-full bg-honey-400 px-6 py-3.5 text-sm font-bold text-forest-900 shadow-[0_10px_25px_rgba(240,184,77,.28)] transition hover:-translate-y-0.5 hover:bg-honey-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Buy Now
      </button>
    </>
  );

  return (
    <>
      <div className="mt-7 hidden grid-cols-[auto_1fr_1fr] items-center gap-3 rounded-[1.35rem] border border-forest-900/8 bg-[#faf7ee] p-3 sm:grid">{controls}</div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-forest-900/10 rounded-2xl border border-forest-900/8 py-4 text-center text-[10px] leading-4 text-forest-900/50">
        <span className="px-2"><b className="block text-xs text-forest-900">Free delivery</b>Across Jaipur</span>
        <span className="px-2"><b className="block text-xs text-forest-900">Secure checkout</b>COD available</span>
        <span className="px-2"><b className="block text-xs text-forest-900">Real support</b>On WhatsApp</span>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-forest-900/10 bg-white p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] sm:hidden">
        <span className="shrink-0 text-sm font-semibold text-terracotta-500">{formatPrice(product.price)}</span>
        {controls}
      </div>
    </>
  );
}
