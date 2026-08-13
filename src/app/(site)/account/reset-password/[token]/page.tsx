"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: params.token, password }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "This reset link is invalid or has expired.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/account/login"), 2000);
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
            <h1 className="mt-6 font-display text-3xl text-forest-900">Reset your password</h1>
            <p className="mt-2 text-sm text-forest-900/60">Choose a new password for your account.</p>
          </div>

          {success ? (
            <p className="mt-8 rounded-lg border border-forest-900/10 bg-forest-900/5 px-4 py-3 text-sm text-forest-900">
              Password updated. Redirecting you to sign in...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="password" className="text-sm font-semibold text-forest-900/80">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-forest-900/15 px-4 py-3 text-sm outline-none focus:border-forest-900/40"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-forest-900/80">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-forest-900/15 px-4 py-3 text-sm outline-none focus:border-forest-900/40"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-terracotta-500/20 bg-terracotta-500/10 px-4 py-3 text-sm text-terracotta-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-honey-400 px-6 py-3 text-sm font-bold text-forest-900 shadow-md transition-colors hover:bg-honey-500 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-forest-900/60">
            <Link
              href="/account/login"
              className="font-semibold text-forest-900 underline-offset-2 hover:text-terracotta-500 hover:underline"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
