import { SITE_URL } from "@/lib/constants";

type Product = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
};

type Props = {
  product: Product;
  averageRating: number;
  reviewCount: number;
};

export default function ProductJsonLd({ product, averageRating, reviewCount }: Props) {
  const absoluteImage = encodeURI(
    product.imageUrl.startsWith("http") ? product.imageUrl : `${SITE_URL}${product.imageUrl}`,
  );

  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteImage,
    url: `${SITE_URL}/products/${product.slug}`,
    brand: { "@type": "Brand", name: "Organic Jaipur" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/products/${product.slug}`,
    },
    ...(reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(averageRating.toFixed(1)),
            reviewCount,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
