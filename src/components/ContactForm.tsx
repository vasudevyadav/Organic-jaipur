"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error?.formErrors?.[0] ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-xl text-white">✓</span>
        <p className="mt-4 font-display text-2xl font-semibold text-brand-800">Message received</p>
        <p className="mt-1 text-sm text-foreground/70">
          Your message has been received. We&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wide text-forest-900/55">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="Full name"
            className="mt-2 w-full rounded-xl border border-forest-900/12 bg-[#fcfaf5] px-4 py-3.5 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wide text-forest-900/55">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-forest-900/12 bg-[#fcfaf5] px-4 py-3.5 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wide text-forest-900/55">
          Phone <span className="text-foreground/40">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Mobile number"
          className="mt-2 w-full rounded-xl border border-forest-900/12 bg-[#fcfaf5] px-4 py-3.5 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wide text-forest-900/55">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={5}
          rows={5}
          placeholder="Mention the product, order number or batch number if relevant..."
          className="mt-2 w-full rounded-xl border border-forest-900/12 bg-[#fcfaf5] px-4 py-3.5 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-terracotta-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-honey-400 px-7 py-4 text-sm font-bold text-forest-900 shadow-[0_12px_30px_rgba(240,184,77,.3)] transition hover:-translate-y-0.5 hover:bg-honey-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
