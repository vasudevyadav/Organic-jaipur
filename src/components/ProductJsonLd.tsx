import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd } from "@/lib/json-ld";
import { productDisplayName } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
  unit: string;
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
    "@id": `${SITE_URL}/products/${product.slug}#product`,
    sku: product.id,
    name: `${productDisplayName(product.name, product.unit)} - ${product.unit}`,
    description: product.description,
    image: absoluteImage,
    url: `${SITE_URL}/products/${product.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/products/${product.slug}#webpage`,
      url: `${SITE_URL}/products/${product.slug}`,
      name: `${productDisplayName(product.name, product.unit)} - ${product.unit}`,
    },
    brand: { "@type": "Brand", name: "Organic Jaipur" },
    category: "Organic food",
    size: product.unit,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/products/${product.slug}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization` },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 1,
        merchantReturnLink: `${SITE_URL}/return-refund-policy`,
      },
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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(json) }}
    />
  );
}
