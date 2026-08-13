import { BUSINESS } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons";

export default function WhatsAppSticky() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Organic Jaipur on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
