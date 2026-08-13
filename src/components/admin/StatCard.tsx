type Props = {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function StatCard({ label, value, sublabel, icon: Icon }: Props) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[.1em] text-foreground/45">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-brand-900">{value}</p>
      {sublabel && <p className="mt-1 text-xs text-foreground/50">{sublabel}</p>}
    </div>
  );
}
