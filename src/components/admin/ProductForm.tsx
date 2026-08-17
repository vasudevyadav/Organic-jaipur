"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@prisma/client";

type ProductFormProps = {
  product?: Product;
};

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(product);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const originalPrice = String(formData.get("originalPrice") || "");
    const payload = {
      name: String(formData.get("name") || ""),
      category: String(formData.get("category") || ""),
      price: Number(formData.get("price") || 0),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      unit: String(formData.get("unit") || ""),
      weight: Number(formData.get("weight") || 0),
      description: String(formData.get("description") || ""),
      ingredients: String(formData.get("ingredients") || ""),
      benefits: String(formData.get("benefits") || ""),
      storageInfo: String(formData.get("storageInfo") || ""),
      imageUrl: String(formData.get("imageUrl") || ""),
      inStock,
      featured,
    };

    const url = isEditing ? `/api/products/${product!.id}` : "/api/products";
    const method = isEditing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setSubmitting(false);
      const data = await res.json().catch(() => null);
      setError(
        typeof data?.error === "string"
          ? data.error
          : "Please check the form fields and try again."
      );
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground/80">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          defaultValue={product?.name}
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-medium text-foreground/80">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={product?.category ?? CATEGORIES[0].value}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="unit" className="text-sm font-medium text-foreground/80">
            Unit (e.g. 1 kg, 500 g, 1 litre)
          </label>
          <input
            id="unit"
            name="unit"
            type="text"
            required
            defaultValue={product?.unit ?? "1 kg"}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="weight" className="text-sm font-medium text-foreground/80">Shipping Weight (grams)</label>
        <input id="weight" name="weight" type="number" required min={0} step={1} defaultValue={product?.weight ?? 0} className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="text-sm font-medium text-foreground/80">
            Price (₹)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            required
            min={0}
            step="0.01"
            defaultValue={product?.price}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="originalPrice" className="text-sm font-medium text-foreground/80">
            Original Price (₹, optional — for showing a discount)
          </label>
          <input
            id="originalPrice"
            name="originalPrice"
            type="number"
            min={0}
            step="0.01"
            defaultValue={product?.originalPrice ?? ""}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" className="text-sm font-medium text-foreground/80">
          Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          required
          placeholder="/images/products/vegetables.jpg"
          defaultValue={product?.imageUrl}
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
        <p className="mt-1 text-xs text-foreground/50">
          Use an existing path (e.g. /images/products/fruits.jpg) or a full image URL.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-foreground/80">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          rows={4}
          defaultValue={product?.description}
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ingredients" className="text-sm font-medium text-foreground/80">
            Ingredients (optional)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={2}
            defaultValue={product?.ingredients ?? ""}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="benefits" className="text-sm font-medium text-foreground/80">
            Benefits (optional)
          </label>
          <textarea
            id="benefits"
            name="benefits"
            rows={2}
            defaultValue={product?.benefits ?? ""}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="storageInfo" className="text-sm font-medium text-foreground/80">
          Storage Information (optional)
        </label>
        <input
          id="storageInfo"
          name="storageInfo"
          type="text"
          defaultValue={product?.storageInfo ?? ""}
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-400"
          />
          In Stock
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-400"
          />
          Featured on Home Page
        </label>
      </div>

      {error && <p className="text-sm text-terracotta-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-cream shadow-md transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-full border border-brand-200 px-7 py-3 text-sm font-semibold text-foreground/70 hover:bg-brand-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
