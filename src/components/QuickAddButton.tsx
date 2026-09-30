"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    unit: string;
    weight: number;
    imageUrl: string;
    inStock: boolean;
  };
  fullWidth?: boolean;
};

export default function QuickAddButton({ product, fullWidth = false }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function addProduct() {
    if (added) {
      router.push("/cart");
      return;
    }
    addItem({ productId: product.id, slug: product.slug, name: product.name, price: product.price, unit: product.unit, weight: product.weight, imageUrl: product.imageUrl });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 3000);
  }

  function buyNow() {
    addItem({ productId: product.id, slug: product.slug, name: product.name, price: product.price, unit: product.unit, weight: product.weight, imageUrl: product.imageUrl });
    router.push("/checkout");
  }

  return (
    <div className={fullWidth ? "flex w-full items-center gap-2" : "inline-flex items-center gap-2"}>
      <button
        type="button"
        onClick={addProduct}
        disabled={!product.inStock}
        className={`rounded-full border border-forest-900 bg-transparent px-4 py-2 text-xs font-bold text-forest-900 transition-all hover:bg-forest-900 hover:text-cream disabled:cursor-not-allowed disabled:opacity-40 ${
          fullWidth ? "flex flex-1 items-center justify-center py-2.5 text-sm" : ""
        }`}
      >
        {added ? "Added ✓ · View cart" : product.inStock ? "Add to cart +" : "Sold out"}
      </button>
      <button
        type="button"
        onClick={buyNow}
        disabled={!product.inStock}
        className={`rounded-full bg-honey-400 px-4 py-2 text-xs font-bold text-forest-900 transition-all hover:bg-honey-500 disabled:cursor-not-allowed disabled:opacity-40 ${
          fullWidth ? "flex flex-1 items-center justify-center py-2.5 text-sm" : ""
        }`}
      >
        Buy Now
      </button>
    </div>
  );
}
