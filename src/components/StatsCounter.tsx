import AnimatedSection from "@/components/AnimatedSection";
import { STATS } from "@/lib/constants";

export default function StatsCounter() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
      <div className="grid overflow-hidden rounded-3xl border border-brand-100 md:grid-cols-2">
        <div className="relative min-h-[280px] bg-brand-100">
          <img
            src="/images/farm-photo.jpg"
            alt="Organic Jaipur farm"
            className="h-full w-full object-cover"
          />
        </div>
        <AnimatedSection className="flex flex-col justify-center bg-honey-400/90 px-8 py-12 text-center sm:px-12">
          <h2 className="font-display text-2xl font-semibold text-forest-900 sm:text-3xl">
            Every Number Tells a Story
          </h2>
          <p className="mt-2 text-sm text-forest-900/70">
            असली उपज, असली भरोसा
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <span className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">
                  {stat.value}
                </span>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-forest-900/70 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
