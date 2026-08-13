"use client";

import Link from "next/link";
import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setLoading(false);
      setError(data?.error ?? "Incorrect email or password.");
      return;
    }

    const from = searchParams.get("from") || "/account";
    router.push(from);
    router.refresh();
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
            <h1 className="mt-6 font-display text-3xl text-forest-900">Welcome back</h1>
            <p className="mt-2 text-sm text-forest-900/60">Sign in to your Organic Jaipur account.</p>
          </div>

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
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-forest-900/80">
                  Password
                </label>
                <Link
                  href="/account/forgot-password"
                  className="text-xs font-semibold text-forest-900 underline-offset-2 hover:text-terracotta-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-forest-900/60">
            New here?{" "}
            <Link
              href="/account/register"
              className="font-semibold text-forest-900 underline-offset-2 hover:text-terracotta-500 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
