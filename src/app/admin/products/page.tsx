import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { categoryLabel } from "@/lib/constants";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader eyebrow="Catalog" title="Products">
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-cream shadow-sm hover:bg-brand-700"
        >
          + Add Product
        </Link>
      </AdminPageHeader>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-brand-100 bg-brand-50/60 text-foreground/60">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-brand-50 last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <span className="font-medium text-foreground/90">{product.name}</span>
                </td>
                <td className="px-4 py-3 text-foreground/70">
                  {categoryLabel(product.category)}
                </td>
                <td className="px-4 py-3 text-foreground/70">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.inStock
                        ? "bg-brand-600/10 text-brand-700"
                        : "bg-foreground/10 text-foreground/60"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground/70">{product.featured ? "Yes" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-sm font-medium text-brand-700 hover:text-brand-800"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-foreground/50">
                  No products yet. Add your first product to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
