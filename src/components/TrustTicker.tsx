import Marquee from "@/components/Marquee";
import { TRUST_BADGES } from "@/lib/constants";
import { ICONS } from "@/components/icons";

export default function TrustTicker() {
  return (
    <div className="border-y border-forest-800 bg-forest-900 py-3 text-cream">
      <Marquee>
        {TRUST_BADGES.map((badge) => {
          const Icon = ICONS[badge.icon];
          return (
            <span key={badge.title} className="mx-6 flex items-center gap-2 text-sm font-medium tracking-wide whitespace-nowrap">
              <Icon className="h-4 w-4 text-honey-400" />
              {badge.title}
              <span className="ml-6 text-cream/30">•</span>
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
