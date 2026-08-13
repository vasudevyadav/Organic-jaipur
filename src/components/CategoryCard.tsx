import Link from "next/link";

type CategoryCardProps = {
  href: string;
  image: string;
  name: string;
  description: string;
};

export default function CategoryCard({ href, image, name, description }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-[1.7rem] border border-forest-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-brand-50">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest-900/70 via-forest-900/0 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-semibold text-cream">{name}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-foreground/65">{description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
          Explore <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
