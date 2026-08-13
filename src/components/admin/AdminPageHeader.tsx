import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
};

export default function AdminPageHeader({
  eyebrow,
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  children,
}: Props) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            ← {backLabel}
          </Link>
        )}
        {eyebrow && (
          <p className="mt-1 text-xs font-bold uppercase tracking-[.16em] text-terracotta-500">
            {eyebrow}
          </p>
        )}
        <h1 className={`font-display text-3xl font-semibold text-brand-900 ${backHref ? "mt-1" : ""}`}>
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-foreground/60">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
