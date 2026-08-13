import type { Review } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import RatingStars from "@/components/RatingStars";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-foreground/90">
            {review.customerName}
            {review.verifiedPurchase && (
              <span className="ml-2 rounded-full bg-brand-600/10 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                Verified Buyer
              </span>
            )}
          </p>
          <RatingStars rating={review.rating} />
        </div>
        <span className="whitespace-nowrap text-xs text-foreground/45">{formatDate(review.createdAt)}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/75">{review.comment}</p>
    </div>
  );
}
