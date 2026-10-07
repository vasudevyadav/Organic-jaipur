import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { serializeJsonLd } from "@/lib/json-ld";

type Props = {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  section: string;
  keywords: string[];
};

export default function BlogPostingJsonLd({
  slug,
  title,
  description,
  image,
  datePublished,
  section,
  keywords,
}: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${slug}#article`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    headline: title,
    description,
    image: `${SITE_URL}${image}`,
    datePublished,
    dateModified: datePublished,
    articleSection: section,
    keywords,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: {
      "@id": `${SITE_URL}/#organization`,
      name: "Organic Jaipur team",
      url: `${SITE_URL}/about`,
    },
    reviewedBy: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
    about: keywords.map((name) => ({ "@type": "Thing", name })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(json) }}
    />
  );
}
