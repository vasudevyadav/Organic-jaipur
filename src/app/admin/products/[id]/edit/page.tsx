import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        backHref="/admin/products"
        backLabel="Back to Products"
        title="Edit Product"
      />
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
