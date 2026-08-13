import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
};

export default function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`pause-on-hover overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max items-center">
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
