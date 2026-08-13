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
    default: "Organic Jaipur | A2 Ghee, Cold-Pressed Oil, Honey & Pickles in Jaipur",
    template: "%s | Organic Jaipur",
  },
  description:
    "Organic Jaipur brings you A2 Bilona ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles — grown and made on our own farm in Jaipur, Rajasthan. 100% organic, chemical-free, and lab-tested.",
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
    title: "Organic Jaipur | A2 Ghee, Cold-Pressed Oil, Honey & Pickles in Jaipur",
    description:
      "A2 Bilona ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles — grown and made on our own farm in Jaipur, Rajasthan.",
    images: [{ url: "/images/organic-jaipur-hero-v2.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Organic Jaipur | A2 Ghee, Cold-Pressed Oil, Honey & Pickles in Jaipur",
    description:
      "A2 Bilona ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles — grown and made on our own farm in Jaipur, Rajasthan.",
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
