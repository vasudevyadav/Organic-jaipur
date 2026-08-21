import { BUSINESS, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { serializeJsonLd } from "@/lib/json-ld";

export default function OrganizationJsonLd() {
  const sameAs = SOCIAL_LINKS.map((link) => link.href);
  const postalCodeMatch = BUSINESS.address.match(/\b(\d{6})\b/);
  const streetAddress = BUSINESS.address
    .replace(/,?\s*Jaipur,?\s*Rajasthan\s*\d{6}\s*$/i, "")
    .trim();

  const json = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Store"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/product/download.png`,
    telephone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    currenciesAccepted: "INR",
    paymentAccepted: "Cash on Delivery",
    hasMap: BUSINESS.mapLink,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      ...(postalCodeMatch ? { postalCode: postalCodeMatch[1] } : {}),
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Jaipur" },
      { "@type": "State", name: "Rajasthan" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneDisplay,
      contactType: "customer service",
      areaServed: "IN-RJ",
      availableLanguage: ["Hindi", "English"],
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd([json, website]) }}
    />
  );
}
