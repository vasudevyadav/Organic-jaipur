import AnimatedSection from "@/components/AnimatedSection";
import TrackOrderForm from "./TrackOrderForm";

export const metadata = {
  title: "Track Your Order",
  description:
    "Track the status of your Organic Jaipur order using your order number and phone number, from order placed to out for delivery.",
};

export default function TrackOrderPage() {
  return (
    <main className="overflow-hidden">
      <section className="hero-grain relative isolate min-h-[360px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[400px]">
        <img src="/images/generated/banner-shop-farm-v3.jpg" alt="Organic Jaipur products at a Rajasthan farm" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,29,20,.93)_0%,rgba(8,29,20,.72)_46%,rgba(8,29,20,.2)_82%)]" />
        <AnimatedSection className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-center px-5 py-14 sm:min-h-[400px] sm:px-8 sm:py-16">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] text-honey-400 uppercase">
            <span className="h-px w-8 bg-honey-400" /> Where&apos;s My Order?
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Order Aapka, <em className="font-normal text-honey-400">Nazar Hamari.</em>
          </h1>
          <p className="mt-2 font-display text-base italic text-honey-400/70">Aapka Order, Hamari Zimmedari</p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
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
