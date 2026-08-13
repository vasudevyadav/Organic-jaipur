export default function RatingStars({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const rounded = Math.round(rating);
  const starClass = size === "md" ? "text-base" : "text-xs";

  return (
    <div className="flex items-center gap-1.5">
      <span className={`${starClass} text-honey-500`} aria-hidden>
        {"★".repeat(rounded)}
        <span className="text-brand-100">{"★".repeat(5 - rounded)}</span>
      </span>
      {typeof count === "number" && (
        <span className="text-xs text-foreground/50">
          {rating > 0 ? `${rating.toFixed(1)} (${count})` : "No reviews yet"}
        </span>
      )}
    </div>
  );
}
