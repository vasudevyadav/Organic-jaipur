import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { serializeJsonLd } from "@/lib/json-ld";

type Props = {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
};

export default function BlogPostingJsonLd({ slug, title, description, image, datePublished }: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${slug}#article`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    headline: title,
    description,
    image: `${SITE_URL}${image}`,
    datePublished,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(json) }}
    />
  );
}
