import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

type CTASectionProps = {
  title: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export default function CTASection({
  title,
  subtitle,
  primaryHref = "/products",
  primaryLabel = "Shop Now",
}: CTASectionProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-brand-700 px-8 py-12 text-center text-cream sm:flex-row sm:justify-between sm:text-left">
      <div>
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-cream/80">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={primaryHref}
          className="whitespace-nowrap rounded-full bg-cream px-7 py-3 text-sm font-semibold text-brand-800 shadow-md transition-transform hover:scale-105"
        >
          {primaryLabel}
        </Link>
        <a
          href={`https://wa.me/${BUSINESS.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full border border-cream/40 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
