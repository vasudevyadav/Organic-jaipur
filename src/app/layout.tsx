import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Providers from "@/components/Providers";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
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
  icons: {
    icon: [{ url: "/favicon-96.png", sizes: "96x96", type: "image/png" }],
  },
  title: {
    default: `${SITE_NAME}: Best A2 Ghee & Organic Products`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Organic Jaipur Store — own-farm A2 ghee, cold-pressed oils, raw honey & pickles. Free Jaipur delivery, COD.",
  keywords: [
    "organic jaipur store",
    "organic jaipur",
    "organic products near me",
    "best a2 ghee",
    "a2 ghee near me",
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
    siteName: SITE_NAME,
    title: `${SITE_NAME}: Best A2 Ghee & Organic Products`,
    description:
      "Organic Jaipur Store: own-farm A2 ghee, cold-pressed oils, raw honey and Rajasthani pickles, grown and made in Jaipur, Rajasthan.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}: Best A2 Ghee & Organic Products`,
    description:
      "Organic Jaipur Store: own-farm A2 ghee, cold-pressed oils, raw honey and Rajasthani pickles, grown and made in Jaipur, Rajasthan.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-foreground">
        <OrganizationJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
