import ProductForm from "@/components/admin/ProductForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <AdminPageHeader backHref="/admin/products" backLabel="Back to Products" title="Add Product" />
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8">
        <ProductForm />
      </div>
    </div>
  );
}
