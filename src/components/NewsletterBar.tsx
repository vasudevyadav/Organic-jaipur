"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterBar() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
      <div>
        <p className="font-display text-lg font-semibold text-cream">
          Join the Organic Jaipur Family
        </p>
        <p className="text-sm text-cream/65">Farm-fresh updates, straight to your inbox.</p>
      </div>

      {subscribed ? (
        <p className="rounded-full bg-cream/10 px-5 py-2.5 text-sm font-medium text-honey-400">
          Thanks for subscribing! 🌿
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2 sm:w-auto">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full rounded-full border border-cream/20 bg-cream/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/50 outline-none focus:border-honey-400"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-honey-400 px-5 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-honey-500"
          >
            Join Us
          </button>
        </form>
      )}
    </div>
  );
}
