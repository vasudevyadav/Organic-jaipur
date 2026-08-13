import { TRUST_BADGES } from "@/lib/constants";
import { ICONS } from "@/components/icons";
import AnimatedSection from "@/components/AnimatedSection";

export default function TrustBadges() {
  return (
    <section className="bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = ICONS[badge.icon];
            return (
              <AnimatedSection key={badge.title} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-brand-100 bg-cream px-4 py-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600/10 text-brand-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-sm font-semibold text-brand-800 sm:text-base">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-foreground/65 sm:text-sm">{badge.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
