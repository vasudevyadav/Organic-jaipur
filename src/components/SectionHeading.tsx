import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`${alignClass} ${className}`}>
      <div
        className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-brand-600 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-6 bg-brand-600/50" />
        {label}
        {align === "center" && <span className="h-px w-6 bg-brand-600/50" />}
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold text-brand-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-foreground/70 ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
