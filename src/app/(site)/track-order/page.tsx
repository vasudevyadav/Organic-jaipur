import AnimatedSection from "@/components/AnimatedSection";
import TrackOrderForm from "./TrackOrderForm";

export const metadata = {
  title: "Track Your Order",
  description:
    "Track the status of your Organic Jaipur order using your order number and phone number — from order placed to out for delivery.",
};

export default function TrackOrderPage() {
  return (
    <main className="overflow-hidden">
      <section className="bg-[#0f281c] px-5 py-14 text-cream sm:px-8 sm:py-16">
        <AnimatedSection className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase">
            <span className="h-px w-8 bg-honey-400" /> Where&apos;s My Order?
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Track Your <em className="font-normal text-honey-400">Order.</em>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Enter your order number and the phone number used while ordering to see the latest status.
          </p>
        </AnimatedSection>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <AnimatedSection delay={0.1}>
          <TrackOrderForm />
        </AnimatedSection>
      </div>
    </main>
  );
}
