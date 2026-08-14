import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Providers from "@/components/Providers";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "A2 Ghee, Cold-Pressed Oil, Honey & Pickles | Organic Jaipur",
    template: "%s | Organic Jaipur",
  },
  description:
    "Own-farm A2 ghee, cold-pressed oils, raw honey and Rajasthani pickles. Free delivery in Jaipur, Cash on Delivery, shipped across Rajasthan.",
  keywords: [
    "organic Jaipur",
    "organic Rajasthan",
    "A2 ghee Jaipur",
    "A2 ghee Rajasthan",
    "bilona ghee Rajasthan",
    "cold-pressed mustard oil Jaipur",
    "cold-pressed mustard oil Rajasthan",
    "kachi ghani mustard oil",
    "raw honey Jaipur",
    "raw honey Rajasthan",
    "Rajasthani pickles online",
    "organic farm Jaipur",
    "buy A2 ghee online Jaipur",
    "organic ghee Jodhpur",
    "organic ghee Udaipur",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Organic Jaipur",
    title: "A2 Ghee, Cold-Pressed Oil, Honey & Pickles | Organic Jaipur",
    description:
      "Own-farm A2 ghee, cold-pressed oils, raw honey and Rajasthani pickles, grown and made in Jaipur, Rajasthan.",
    images: [{ url: "/images/organic-jaipur-hero-v2.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A2 Ghee, Cold-Pressed Oil, Honey & Pickles | Organic Jaipur",
    description:
      "Own-farm A2 ghee, cold-pressed oils, raw honey and Rajasthani pickles, grown and made in Jaipur, Rajasthan.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-foreground">
        <OrganizationJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
