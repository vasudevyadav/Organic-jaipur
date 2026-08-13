"use client";

import { useEffect, useState } from "react";
import type { Review } from "@prisma/client";
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews ?? []);
        setAverage(data.average ?? 0);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  function handleSubmitted(review: Review) {
    setReviews((prev) => [review, ...prev]);
    setAverage((prevAvg) => {
      const newCount = reviews.length + 1;
      return (prevAvg * reviews.length + review.rating) / newCount;
    });
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <RatingStars rating={average} count={reviews.length} size="md" />
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-5">
          <ReviewForm productId={productId} onSubmitted={handleSubmitted} />
        </div>
      )}

      <div className="mt-6 space-y-4">
        {loading && <p className="text-sm text-foreground/50">Loading reviews...</p>}
        {!loading && reviews.length === 0 && (
          <p className="text-sm text-foreground/50">Be the first to review this product.</p>
        )}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
