"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devResetLink, setDevResetLink] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => null);
    setLoading(false);
    setSubmitted(true);
    setDevResetLink(data?.resetLink ?? null);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fbf7ea] px-4 py-16">
      <AnimatedSection className="w-full max-w-md">
        <div className="rounded-[1.75rem] border border-forest-900/8 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col items-center text-center">
            <img
              src="/product/download.png"
              alt="Organic Jaipur"
              className="h-12 w-[190px] object-contain object-center mix-blend-multiply"
            />
            <h1 className="mt-6 font-display text-3xl text-forest-900">Forgot your password?</h1>
            <p className="mt-2 text-sm text-forest-900/60">
              Enter your account email and we&apos;ll generate a reset link.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-forest-900/80">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-forest-900/15 px-4 py-3 text-sm outline-none focus:border-forest-900/40"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-honey-400 px-6 py-3 text-sm font-bold text-forest-900 shadow-md transition-colors hover:bg-honey-500 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="mt-8 space-y-4">
              <p className="text-sm text-forest-900/70">
                If an account exists for that email, a password reset link has been generated.
              </p>
              {devResetLink && (
                <div className="rounded-xl border border-honey-400/40 bg-honey-400/10 p-4 text-sm">
                  <p className="font-semibold text-forest-900">Development mode notice</p>
                  <p className="mt-1 text-forest-900/70">
                    No email provider is configured yet, so here&apos;s your reset link directly:
                  </p>
                  <Link
                    href={devResetLink}
                    className="mt-2 inline-block break-all font-semibold text-forest-900 underline underline-offset-2 hover:text-terracotta-500"
                  >
                    {devResetLink}
                  </Link>
                </div>
              )}
              <Link
                href="/account/login"
                className="inline-block text-sm font-semibold text-forest-900 underline-offset-2 hover:text-terracotta-500 hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
