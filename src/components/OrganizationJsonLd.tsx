import { BUSINESS, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export default function OrganizationJsonLd() {
  const sameAs = SOCIAL_LINKS.filter((link) => link.href !== "#").map((link) => link.href);
  const postalCodeMatch = BUSINESS.address.match(/\b(\d{6})\b/);
  const streetAddress = BUSINESS.address
    .replace(/,?\s*Jaipur,?\s*Rajasthan\s*\d{6}\s*$/i, "")
    .trim();

  const json = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/product/download.png`,
    telephone: BUSINESS.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      ...(postalCodeMatch ? { postalCode: postalCodeMatch[1] } : {}),
      addressCountry: "IN",
    },
    areaServed: ["Jaipur", "Rajasthan"],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
