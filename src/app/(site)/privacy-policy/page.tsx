import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { BUSINESS, FAQS_PRIVACY } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Organic Jaipur collects, uses, and protects the personal information you share with us when you browse, order, or contact us.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />
      <section className="bg-[#0f281c] px-5 py-14 text-cream sm:px-8 sm:py-16">
        <AnimatedSection className="mx-auto max-w-3xl">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase">
            <span className="h-px w-8 bg-honey-400" /> Legal
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Privacy <em className="font-normal text-honey-400">Policy.</em>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            How Organic Jaipur collects, uses, and protects the personal information you share with
            us when you browse, order, or contact us.
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
                Organic Jaipur (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates this
                website to sell A2 ghee, cold-pressed oil, honey, and pickles to customers in Jaipur.
                This Privacy Policy explains what information we collect when you use our website,
                place an order, or contact us, and how we use and protect it. By using this website,
                you agree to the practices described here.
              </p>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  1. Information We Collect
                </h2>
                <p>We collect information that you choose to give us, including:</p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>
                    <span className="font-semibold text-forest-900">Order details:</span> your name,
                    phone number, email (if provided), delivery address, and the items you order.
                  </li>
                  <li>
                    <span className="font-semibold text-forest-900">Account details:</span> if you
                    create an account, your name, email, phone number, and a securely hashed password.
                  </li>
                  <li>
                    <span className="font-semibold text-forest-900">Contact form submissions:</span>{" "}
                    your name, email, phone number, and message when you write to us.
                  </li>
                  <li>
                    <span className="font-semibold text-forest-900">Reviews:</span> your name and any
                    comment or rating you choose to submit for a product.
                  </li>
                  <li>
                    <span className="font-semibold text-forest-900">WhatsApp orders:</span> if you
                    order via WhatsApp, WhatsApp/Meta handles that conversation according to its own
                    privacy policy; we only see the messages you send us.
                  </li>
                </ul>
                <p>
                  We do not knowingly collect sensitive personal information such as payment card
                  details, since we currently accept Cash on Delivery (COD) only.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  2. How We Use Your Information
                </h2>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>To process, pack, and deliver your order to the correct address.</li>
                  <li>To contact you about order confirmation, delivery updates, or issues with an order.</li>
                  <li>To respond to questions or requests sent through our contact form or WhatsApp.</li>
                  <li>To maintain your account and order history, if you have registered with us.</li>
                  <li>To display product reviews you choose to submit publicly on the relevant product page.</li>
                  <li>To improve our products, sourcing, and delivery service based on aggregated order patterns.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  3. How We Store and Protect Your Information
                </h2>
                <p>
                  Your information is stored on our order and account database. Passwords are never
                  stored in plain text — they are hashed before being saved. We take reasonable
                  technical precautions to protect your data from unauthorized access, but no online
                  system can be guaranteed 100% secure, and we cannot promise absolute security.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  4. Sharing of Information
                </h2>
                <p>
                  We do not sell your personal information. We only share your information where
                  necessary, for example:
                </p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>With our own delivery staff, so they can deliver your order to the correct address.</li>
                  <li>
                    With service providers who host our website and database, solely to operate this
                    service.
                  </li>
                  <li>If required by law, regulation, or a valid legal request from a government authority.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  5. Cookies
                </h2>
                <p>
                  Our website may use basic cookies or similar local storage to keep you logged in and
                  to remember items in your cart. We do not currently use third-party advertising
                  cookies or trackers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  6. Your Choices
                </h2>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>You can ask us to update or correct the information on your account at any time.</li>
                  <li>You can ask us to delete your account and associated personal information, subject to any records we are legally required to retain (for example, order records for accounting purposes).</li>
                  <li>You can opt out of promotional messages by telling us via WhatsApp, phone, or the contact form.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  7. Children&apos;s Privacy
                </h2>
                <p>
                  Our website is intended for use by adults placing grocery orders. We do not knowingly
                  collect personal information from children.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  8. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time as our services change. The
                  &ldquo;Last updated&rdquo; date above reflects the latest revision. Continued use of
                  our website after changes are posted means you accept the updated policy.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-2xl text-forest-900">
                  9. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or how your information is
                  handled, please contact us:
                </p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>Phone / WhatsApp: {BUSINESS.phoneDisplay}</li>
                  <li>Address: {BUSINESS.address}</li>
                </ul>
                <p className="text-forest-900/40">
                  Registered business/legal entity name: Organic Jaipur. Grievance officer name and
                  contact (if applicable under local regulations): [Add grievance officer details
                  here].
                </p>
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
          Your privacy, answered.
        </h2>
        <div className="mt-8">
          <FaqAccordion items={FAQS_PRIVACY} />
        </div>
        <FaqJsonLd items={FAQS_PRIVACY} />
      </section>
    </main>
  );
}
