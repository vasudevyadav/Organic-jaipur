import Link from "next/link";
import { BUSINESS, CATEGORIES, SOCIAL_LINKS } from "@/lib/constants";
import NewsletterBar from "@/components/NewsletterBar";
import { ICONS } from "@/components/icons";

const CERTIFICATIONS = ["📦 Free Jaipur Delivery", "💵 Cash on Delivery", "💬 WhatsApp Order Support"];

const POLICY_LINKS = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/return-refund-policy", label: "Return & Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#fbf3df] text-forest-900">
      <NewsletterBar />
      <img
        src="/images/illustrated-farm-footer-v2.png"
        alt=""
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[430px] w-full object-cover object-bottom opacity-95"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#fbf3df] via-[#fbf3df]/96 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 md:grid-cols-[1.25fr_.75fr_.85fr_1.15fr] lg:pb-24">
        <div>
          <img
            src="/product/download.png"
            alt="Organic Jaipur"
            className="h-14 w-[240px] object-contain object-left mix-blend-multiply"
          />
          <p className="mt-5 max-w-xs font-display text-2xl leading-snug">
            Sirf Rasoi Ka Samaan Nahi,
            <br />
            Jaipur Ka Bharosa Hai.
          </p>
          <p className="mt-2 max-w-xs font-display text-sm italic text-forest-900/50">
            Rajasthan Ki Paramparik Rasoi, Seedha Aapke Ghar
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-forest-900/60">
            Shop cow and Buffalo Bilona ghee, cold-pressed oils, raw honey and lal mirch chutney with
            clear ingredients, pack sizes and storage details.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.18em] text-terracotta-500">
            Company
          </h3>
          <ul className="mt-5 space-y-3 text-sm font-semibold text-forest-900/70">
            <li>
              <Link href="/" className="hover:text-[#e7ad42]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#e7ad42]">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#e7ad42]">
                About
              </Link>
            </li>
            <li>
              <Link href="/farm-to-home" className="hover:text-[#e7ad42]">
                Farm to Home
              </Link>
            </li>
            <li>
              <Link href="/quality-promise" className="hover:text-[#e7ad42]">
                Quality Promise
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#e7ad42]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/organic-products-jaipur" className="hover:text-[#e7ad42]">
                Organic Products in Jaipur
              </Link>
            </li>
            <li>
              <Link href="/organic-products-rajasthan" className="hover:text-[#e7ad42]">
                Organic Products in Rajasthan
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-[#e7ad42]">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-[#e7ad42]">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.18em] text-terracotta-500">
            Shop
          </h3>
          <ul className="mt-5 space-y-3 text-sm font-semibold text-forest-900/70">
            {CATEGORIES.map((c) => (
              <li key={c.value}>
                <Link
                  href={`/products?category=${c.value}`}
                  className="hover:text-[#e7ad42]"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.18em] text-terracotta-500">
            Need help?
          </h3>
          <a
            href={`https://wa.me/${BUSINESS.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-xl bg-[#e7ad42] px-5 py-4 text-center text-sm font-bold text-forest-900 transition hover:bg-terracotta-500 hover:text-white"
          >
            Order on WhatsApp: Get a Reply in Minutes
          </a>
          <ul className="mt-5 space-y-2.5 text-sm leading-6 text-forest-900/60">
            <li>{BUSINESS.address}</li>
            <li>
              <a
                href={`tel:+91${BUSINESS.phone}`}
                className="hover:text-[#e7ad42]"
              >
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="break-all hover:text-[#e7ad42]"
              >
                {BUSINESS.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${BUSINESS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e7ad42]"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>

          <div className="mt-5 flex items-center gap-2.5">
            {SOCIAL_LINKS.map((social) => {
              const Icon = ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-900/15 text-forest-900/70 transition hover:border-forest-900 hover:bg-forest-900 hover:text-cream"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative border-t border-forest-900/15 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 sm:px-6">
          {CERTIFICATIONS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-forest-900/20 bg-[#fbf3df]/80 px-4 py-1.5 text-sm font-semibold text-forest-900/75 backdrop-blur"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="relative border-t border-forest-900/15 bg-[#fbf3df]/75 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-bold text-forest-900">
            © {new Date().getFullYear()} Organic Jaipur. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold text-forest-900/60 hover:text-forest-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
