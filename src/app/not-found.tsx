import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Organic Jaipur page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center bg-[#fbf8ef] px-5 py-20 sm:px-8">
      <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-forest-900/10 bg-white p-8 text-center shadow-sm sm:p-14">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-terracotta-500">404 · Page not found</p>
        <h1 className="mt-4 font-display text-4xl text-forest-900 sm:text-6xl">This page has moved or no longer exists.</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-forest-900/65">Browse the current Organic Jaipur range or return to the homepage to find product, delivery and contact information.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="rounded-full bg-forest-900 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800">Shop current products</Link>
          <Link href="/" className="rounded-full border border-forest-900/15 px-6 py-3 text-sm font-bold text-forest-900 hover:bg-forest-900/5">Return home</Link>
        </div>
      </section>
    </main>
  );
}
