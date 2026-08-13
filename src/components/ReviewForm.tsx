"use client";

import { useState, type FormEvent } from "react";
import type { Review } from "@prisma/client";

export default function ReviewForm({
  productId,
  onSubmitted,
}: {
  productId: string;
  onSubmitted: (review: Review) => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, customerName, rating, comment, contact }),
    });

    const data = await res.json().catch(() => null);
    setSubmitting(false);

    if (!res.ok) {
      setError(typeof data?.error === "string" ? data.error : "Could not submit your review.");
      return;
    }

    onSubmitted(data.review);
    setCustomerName("");
    setComment("");
    setContact("");
    setRating(5);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-100 bg-white p-5">
      <h3 className="font-display text-base font-semibold text-brand-900">Write a Review</h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-foreground/80">Your Name</label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)}
                {"☆".repeat(5 - n)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-foreground/80">Your Review</label>
        <textarea
          required
          minLength={5}
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-foreground/80">
          Email or Phone used at checkout (optional, verifies your purchase)
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      {error && <p className="mt-3 text-sm text-terracotta-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-cream hover:bg-brand-700 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
