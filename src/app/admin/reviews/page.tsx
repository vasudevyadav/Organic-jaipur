import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import DeleteReviewButton from "@/components/admin/DeleteReviewButton";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

function stars(rating: number): string {
  const clamped = Math.max(0, Math.min(5, rating));
  return "★".repeat(clamped) + "☆".repeat(5 - clamped);
}

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true, slug: true } } },
  });

  return (
    <div>
      <AdminPageHeader eyebrow="Feedback" title="Reviews" />

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-brand-100 bg-brand-50/60 text-foreground/60">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Comment</th>
              <th className="px-4 py-3 font-medium">Verified</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b border-brand-50 last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${review.product.slug}`}
                    className="font-medium text-brand-700 hover:text-brand-800"
                  >
                    {review.product.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-foreground/70">{review.customerName}</td>
                <td className="px-4 py-3 text-honey-600" aria-label={`${review.rating} out of 5 stars`}>
                  {stars(review.rating)}
                </td>
                <td className="max-w-xs px-4 py-3 text-foreground/70">{review.comment}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      review.verifiedPurchase
                        ? "bg-brand-600/10 text-brand-700"
                        : "bg-foreground/10 text-foreground/60"
                    }`}
                  >
                    {review.verifiedPurchase ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground/70">{formatDate(review.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteReviewButton id={review.id} />
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-foreground/50">
                  No reviews yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
