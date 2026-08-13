"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setLoading(false);
      setError(
        typeof data?.error === "string"
          ? data.error
          : "Could not create your account. Please check your details."
      );
      return;
    }

    router.push("/account");
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
            <h1 className="mt-6 font-display text-3xl text-forest-900">Create your account</h1>
            <p className="mt-2 text-sm text-forest-900/60">
              Save addresses, track orders, and check out faster.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-forest-900/80">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-forest-900/15 px-4 py-3 text-sm outline-none focus:border-forest-900/40"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-forest-900/80">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-forest-900/15 px-4 py-3 text-sm outline-none focus:border-forest-900/40"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-semibold text-forest-900/80">
                Phone (optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-forest-900/15 px-4 py-3 text-sm outline-none focus:border-forest-900/40"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-forest-900/80">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-forest-900/15 px-4 py-3 text-sm outline-none focus:border-forest-900/40"
              />
              <p className="mt-1.5 text-xs text-forest-900/50">At least 8 characters.</p>
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-forest-900/60">
            Already have an account?{" "}
            <Link
              href="/account/login"
              className="font-semibold text-forest-900 underline-offset-2 hover:text-terracotta-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
