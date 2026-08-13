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
    addItem({ productId: product.id, slug: product.slug, name: product.name, price: product.price, unit: product.unit, imageUrl: product.imageUrl });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 3000);
  }

  return (
    <button
      type="button"
      onClick={addProduct}
      disabled={!product.inStock}
      className={`rounded-full bg-forest-900 px-4 py-2 text-xs font-bold text-cream transition-all hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-40 ${
        fullWidth ? "flex w-full items-center justify-center py-2.5 text-sm" : ""
      }`}
    >
      {added ? "Added ✓ · View cart" : product.inStock ? "Add to cart +" : "Sold out"}
    </button>
  );
}
