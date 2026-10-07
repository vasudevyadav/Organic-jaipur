import AnimatedSection from "@/components/AnimatedSection";
import BusinessMap from "@/components/BusinessMap";
import { BUSINESS } from "@/lib/constants";

export default function BusinessLocationSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="business-location-heading">
      <AnimatedSection className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-forest-900/10 bg-[#faf7ee] shadow-[0_20px_60px_rgba(15,40,28,.1)] lg:grid-cols-[.72fr_1.28fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-terracotta-500">
              Google Business Verified Location
            </p>
            <h2 id="business-location-heading" className="mt-3 font-display text-4xl leading-tight text-forest-900">
              Visit Organic Jaipur
            </h2>
            <p className="mt-4 text-sm leading-7 text-forest-900/60">{BUSINESS.address}</p>
            <p className="mt-3 text-sm leading-6 text-forest-900/50">
              Open the approved Google Business listing for directions and location details.
            </p>
            <a
              href={BUSINESS.mapDirectionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-fit rounded-full bg-forest-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-terracotta-500"
            >
              Get directions →
            </a>
          </div>
          <BusinessMap height={420} className="block min-h-[320px] h-full" />
        </div>
      </AnimatedSection>
    </section>
  );
}
