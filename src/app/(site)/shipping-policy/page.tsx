import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { BUSINESS, FAQS_SHIPPING } from "@/lib/constants";

export const metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "Delivery areas, timelines, and charges for Organic Jaipur orders — free doorstep delivery within Jaipur, plus courier shipping across Rajasthan, for A2 ghee, cold-pressed oil, honey, and pickles.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="overflow-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Shipping & Delivery Policy", href: "/shipping-policy" },
        ]}
      />
      <section className="bg-[#0f281c] px-5 py-14 text-cream sm:px-8 sm:py-16">
        <AnimatedSection className="mx-auto max-w-3xl">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase">
            <span className="h-px w-8 bg-honey-400" /> Legal
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Shipping &amp; <em className="font-normal text-honey-400">Delivery Policy.</em>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Delivery areas, timelines, and charges for Organic Jaipur orders — free doorstep
            delivery within Jaipur, plus courier shipping across Rajasthan, for A2 ghee,
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
                This policy explains how we deliver orders placed with Organic Jaipur. It applies to
                all our products — A2 ghee, cold-pressed oil, honey, and pickles.
              </p>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  1. Delivery Area
                </h2>
                <p>
                  We offer free doorstep delivery within Jaipur, Rajasthan, and also ship across
                  Rajasthan — including Jodhpur, Udaipur, Kota, Ajmer, Bikaner and other cities — via
                  courier. If your address falls outside the areas we currently service, we&apos;ll let
                  you know at the time of order confirmation so you&apos;re not left waiting.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  2. Delivery Charges
                </h2>
                <p>
                  Delivery is currently free on orders within our Jaipur service area. For orders
                  shipped to other cities in Rajasthan via courier, any applicable shipping charge will
                  be clearly shown on the checkout page before you confirm your order, and the amount
                  stated at checkout always applies over anything mentioned here.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  3. Delivery Timelines
                </h2>
                <p>
                  Ghee, cold-pressed oil, honey and pickles are shelf-stable and are typically
                  dispatched within a day or two of order confirmation.
                </p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>
                    <span className="font-semibold text-forest-900">Within Jaipur:</span> orders run on
                    our local, short-cycle delivery model and usually arrive the same or next day.
                    Orders placed later in the day may be scheduled for delivery the following day,
                    since we plan delivery routes daily.
                  </li>
                  <li>
                    <span className="font-semibold text-forest-900">Rest of Rajasthan:</span> orders are
                    shipped via courier and typically take a few extra days depending on the
                    destination city.
                  </li>
                  <li>
                    We&apos;ll confirm the expected delivery window with you on WhatsApp or by phone
                    after you order.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  4. Order Confirmation &amp; Communication
                </h2>
                <p>
                  After you place an order (via the website or WhatsApp), we confirm availability and
                  the expected delivery window with you directly. Please keep your phone reachable —
                  our delivery team may call or message ahead of arrival.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  5. Receiving Your Order
                </h2>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>
                    Please ensure someone is available at the delivery address during the confirmed
                    delivery window, since we accept Cash on Delivery (COD) only and need someone to
                    receive and pay for the order.
                  </li>
                  <li>
                    Please inspect your order at the time of delivery. Report any damage or
                    discrepancy to our delivery person immediately, or contact us the same day — see
                    our{" "}
                    <Link
                      href="/return-refund-policy"
                      className="font-semibold text-terracotta-500 hover:text-terracotta-600"
                    >
                      Return &amp; Refund Policy
                    </Link>{" "}
                    for details.
                  </li>
                  <li>
                    If we&apos;re unable to reach you or deliver on the scheduled attempt, we&apos;ll
                    try to reschedule via WhatsApp or phone.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  6. Delays
                </h2>
                <p>
                  Occasionally, weather, traffic, farm harvest timing, or unforeseen circumstances may
                  delay a delivery. We&apos;ll do our best to keep you informed if this happens with
                  your order.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  7. Questions
                </h2>
                <p>
                  For any delivery-related questions or to track an existing order, use our{" "}
                  <Link
                    href="/track-order"
                    className="font-semibold text-terracotta-500 hover:text-terracotta-600"
                  >
                    Track Order
                  </Link>{" "}
                  page, or contact us directly:
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
          Shipping &amp; delivery, answered.
        </h2>
        <div className="mt-8">
          <FaqAccordion items={FAQS_SHIPPING} />
        </div>
        <FaqJsonLd items={FAQS_SHIPPING} />
      </section>
    </main>
  );
}
