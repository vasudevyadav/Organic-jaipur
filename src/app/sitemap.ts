import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL, STOREFRONT_CATEGORY_VALUES } from "@/lib/constants";
import { MAKING_PROCESSES } from "@/lib/making-process";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-localities";
import { RAJASTHAN_CITIES } from "@/lib/rajasthan-cities";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/organic-products-jaipur", priority: 0.85, changeFrequency: "weekly" },
  { path: "/organic-products-rajasthan", priority: 0.85, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/farm-to-home", priority: 0.6, changeFrequency: "monthly" },
  { path: "/quality-promise", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.4, changeFrequency: "monthly" },
  { path: "/return-refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { category: { in: STOREFRONT_CATEGORY_VALUES }, inStock: true },
    select: { slug: true, updatedAt: true },
  });

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const makingProcessEntries: MetadataRoute.Sitemap = MAKING_PROCESSES.map((process) => ({
    url: `${SITE_URL}/making-process/${process.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const localityEntries: MetadataRoute.Sitemap = JAIPUR_LOCALITIES.map((locality) => ({
    url: `${SITE_URL}/organic-products-jaipur/${locality.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const rajasthanCityEntries: MetadataRoute.Sitemap = RAJASTHAN_CITIES.map((city) => ({
    url: `${SITE_URL}/organic-products-rajasthan/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...productEntries,
    ...makingProcessEntries,
    ...localityEntries,
    ...rajasthanCityEntries,
  ];
}
