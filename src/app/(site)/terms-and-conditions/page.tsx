import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { BUSINESS, FAQS_TERMS } from "@/lib/constants";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "The terms and conditions that apply when you browse, order from, or use the Organic Jaipur website.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="overflow-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Terms and Conditions", href: "/terms-and-conditions" },
        ]}
      />
      <section className="bg-[#0f281c] px-5 py-14 text-cream sm:px-8 sm:py-16">
        <AnimatedSection className="mx-auto max-w-3xl">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase">
            <span className="h-px w-8 bg-honey-400" /> Legal
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Terms{" "}
            <em className="font-normal text-honey-400">and Conditions.</em>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            The terms and conditions that apply when you browse, order from, or
            use the Organic Jaipur website.
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
                These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use
                of the Organic Jaipur website and your purchase of products from
                us. By browsing this website or placing an order, you agree to
                these Terms. Please read them carefully.
              </p>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  1. About Us
                </h2>
                <p>
                  Organic Jaipur is a Jaipur-based business selling A2 ghee,
                  cold-pressed oil, raw honey, and traditional pickles, grown
                  and made on our own farm and delivered to homes within Jaipur.
                  Registered business/legal entity name: Organic Jaipur.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  2. Orders
                </h2>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>
                    Orders can be placed through this website or via WhatsApp.
                    Placing an order is an offer to buy; we confirm the order
                    once we have verified stock and delivery availability for
                    your area.
                  </li>
                  <li>
                    Product descriptions, weights/units, and images are provided
                    for guidance. Since many of our products are natural farm
                    produce, slight variation in size, colour, or weight between
                    batches is normal and not a defect.
                  </li>
                  <li>
                    We reserve the right to refuse or cancel an order — for
                    example, if an item is out of stock, if the delivery address
                    falls outside our current Jaipur delivery area, or in case
                    of a suspected error in pricing or order details.
                  </li>
                  <li>
                    Currently, we accept Cash on Delivery (COD) only. Please
                    ensure someone is available at the delivery address to
                    receive and pay for the order.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  3. Pricing
                </h2>
                <p>
                  Prices shown on the website are in Indian Rupees (₹) and are
                  current at the time of browsing but may change due to seasonal
                  availability, input costs, or other factors. The price
                  applicable to your order is the price confirmed with you at
                  the time of order confirmation. Any coupon or discount codes
                  are subject to their own stated conditions and may be
                  withdrawn or changed at any time.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  4. Delivery
                </h2>
                <p>
                  We currently deliver only within Jaipur. Please see our{" "}
                  <Link
                    href="/shipping-policy"
                    className="font-semibold text-terracotta-500 hover:text-terracotta-600"
                  >
                    Shipping Policy
                  </Link>{" "}
                  for details on delivery areas and timelines.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  5. Returns and Refunds
                </h2>
                <p>
                  Please see our{" "}
                  <Link
                    href="/return-refund-policy"
                    className="font-semibold text-terracotta-500 hover:text-terracotta-600"
                  >
                    Return &amp; Refund Policy
                  </Link>{" "}
                  for how we handle damaged, incorrect, or defective items.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  6. Accounts
                </h2>
                <p>
                  If you create an account, you are responsible for keeping your
                  login details confidential and for any activity carried out
                  through your account. Please notify us if you suspect any
                  unauthorised use of your account.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  7. Reviews and Content
                </h2>
                <p>
                  If you submit a product review or other content, you confirm
                  it is honest, based on your own experience, and does not
                  contain anything unlawful, abusive, or misleading. We may
                  remove reviews that violate this or that we reasonably believe
                  to be fake.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  8. Intellectual Property
                </h2>
                <p>
                  The Organic Jaipur name, logo, photographs, and website
                  content are our property or used with permission, and may not
                  be copied or reused without our consent.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  9. Limitation of Liability
                </h2>
                <p>
                  We work hard to ensure our products are fresh, safe, and
                  accurately described. However, to the extent permitted by law,
                  we are not liable for indirect losses arising from delays,
                  natural variation in farm produce, or misuse of a product
                  after delivery. Nothing in these Terms limits any liability
                  that cannot be excluded under applicable Indian consumer
                  protection law.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  10. Changes to These Terms
                </h2>
                <p>
                  We may update these Terms from time to time to reflect changes
                  in our operations. The &ldquo;Last updated&rdquo; date above
                  reflects the latest revision. Continued use of our website
                  after changes are posted means you accept the updated Terms.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  11. Governing Law
                </h2>
                <p>
                  These Terms are governed by the laws of India, and disputes
                  will be subject to the jurisdiction of the courts in Jaipur,
                  Rajasthan.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  12. Contact Us
                </h2>
                <p>
                  For any questions about these Terms, please reach out to us:
                </p>
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
          Our terms, answered.
        </h2>
        <div className="mt-8">
          <FaqAccordion items={FAQS_TERMS} />
        </div>
        <FaqJsonLd items={FAQS_TERMS} />
      </section>
    </main>
  );
}
