import { createSocialCard, SOCIAL_CARD_SIZE } from "@/lib/social-card";

export const alt = "Organic Jaipur — A2 ghee, cold-pressed oils, raw honey and Rajasthani pickles";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialCard();
}
