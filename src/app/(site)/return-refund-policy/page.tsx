import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { BUSINESS, FAQS_RETURNS } from "@/lib/constants";

export const metadata = {
  title: "Return & Refund Policy",
  description:
    "How Organic Jaipur handles returns, replacements, and refunds for A2 ghee, cold-pressed oil, honey, and pickles.",
};

export default function ReturnRefundPolicyPage() {
  return (
    <main className="overflow-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Return & Refund Policy", href: "/return-refund-policy" },
        ]}
      />
      <section className="hero-grain relative isolate min-h-[360px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[400px]">
        <img src="/images/generated/banner-shop-farm-v3.jpg" alt="Organic Jaipur products at a Rajasthan farm" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,29,20,.93)_0%,rgba(8,29,20,.72)_46%,rgba(8,29,20,.2)_82%)]" />
        <AnimatedSection className="relative mx-auto flex min-h-[360px] max-w-3xl flex-col justify-center px-5 py-14 sm:min-h-[400px] sm:px-8 sm:py-16">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] text-honey-400 uppercase">
            <span className="h-px w-8 bg-honey-400" /> Legal
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Pareshani Aapki, <em className="font-normal text-honey-400">Zimmedari Hamari.</em>
          </h1>
          <p className="mt-2 font-display text-base italic text-honey-400/70">Bharose Ka Rishta</p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            How Organic Jaipur handles returns, replacements, and refunds for our A2 ghee,
            cold-pressed oil, honey, and pickles.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-[#fffdf8] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40">
              Last updated: 7 August 2026
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.06} className="mt-6">
            <div className="space-y-8 text-base leading-7 text-forest-900/70">
              <p>
                We want you to be happy with every order. Our range is entirely shelf-stable:
                A2 ghee, cold-pressed oil, honey, and pickles. This policy sets out one clear set of
                rules that applies across our whole range.
              </p>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  1. Ghee, Cold-Pressed Oil, Honey &amp; Pickles
                </h2>
                <p>
                  For all our shelf-stable products, we accept a return for replacement or refund if,
                  within 1 day of delivery:
                </p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>The product is unopened and in its original packaging, or</li>
                  <li>The product is defective, contaminated, leaking, or otherwise not as described.</li>
                </ul>
                <p>
                  We don&apos;t accept returns of opened products for reasons of personal taste
                  preference, since these are consumable food items. Any return or replacement must be
                  reported to us within 1 day of delivery. Please contact us as soon as possible if
                  there&apos;s an issue.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  2. How to Report an Issue
                </h2>
                <ol className="ml-5 list-decimal space-y-1.5">
                  <li>
                    Contact us on WhatsApp or phone at {BUSINESS.phoneDisplay}, or via our{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-terracotta-500 hover:text-terracotta-600"
                    >
                      Contact
                    </Link>{" "}
                    page, with your order number and a description (and photo, where possible) of the
                    issue.
                  </li>
                  <li>
                    You can find your order number using our{" "}
                    <Link
                      href="/track-order"
                      className="font-semibold text-terracotta-500 hover:text-terracotta-600"
                    >
                      Track Order
                    </Link>{" "}
                    page.
                  </li>
                  <li>We&apos;ll review the issue and confirm the resolution with you directly.</li>
                </ol>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  3. How Refunds Work
                </h2>
                <p>
                  Since we currently accept Cash on Delivery (COD) only, there is no online payment for
                  us to reverse automatically. Depending on the situation, a valid claim will be
                  resolved by one of the following, as agreed with you:
                </p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>Free replacement of the item on your next delivery, or</li>
                  <li>Store credit towards a future order, or</li>
                  <li>A refund via bank transfer or UPI to an account/ID you provide.</li>
                </ul>
                <p>
                  The processing time for a refund by bank transfer or UPI is [Add specific refund
                  processing timeframe here] from when the claim is confirmed. Replacements and store
                  credit are typically arranged faster since they don&apos;t depend on a bank transfer.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  4. Cancellations
                </h2>
                <p>
                  You can cancel an order before it has been packed or dispatched by contacting us on
                  WhatsApp or phone with your order number. Once an order is out for delivery, we may
                  not be able to cancel it.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  5. Questions
                </h2>
                <p>If anything here is unclear, or you have an issue with an order, reach out to us:</p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>Phone / WhatsApp: {BUSINESS.phoneDisplay}</li>
                  <li>Address: {BUSINESS.address}</li>
                </ul>
              </section>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Common questions
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Returns &amp; refunds, answered.
        </h2>
        <div className="mt-8">
          <FaqAccordion items={FAQS_RETURNS} />
        </div>
        <FaqJsonLd items={FAQS_RETURNS} />
      </section>
    </main>
  );
}
