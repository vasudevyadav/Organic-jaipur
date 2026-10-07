import { BUSINESS } from "@/lib/constants";

type BusinessMapProps = {
  className?: string;
  height?: number;
};

export default function BusinessMap({ className, height = 270 }: BusinessMapProps) {
  return (
    <iframe
      title="Organic Jaipur on Google Maps"
      src={BUSINESS.mapEmbedSrc}
      width="100%"
      height={height}
      className={className}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
