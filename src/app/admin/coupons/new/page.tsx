import CouponForm from "@/components/admin/CouponForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function NewCouponPage() {
  return (
    <div className="max-w-2xl">
      <AdminPageHeader backHref="/admin/coupons" backLabel="Back to Coupons" title="Add Coupon" />
      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8">
        <CouponForm />
      </div>
    </div>
  );
}
