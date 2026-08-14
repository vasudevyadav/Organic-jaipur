export default function JourneyScrollLine() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-forest-900/10 md:block">
      <div className="absolute inset-x-0 top-0 h-full bg-linear-to-b from-honey-400 via-honey-400/70 to-forest-900/10" />
    </div>
  );
}
