import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL, CATEGORIES, STOREFRONT_CATEGORY_VALUES } from "@/lib/constants";
import { MAKING_PROCESSES } from "@/lib/making-process";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-localities";
import { RAJASTHAN_CITIES } from "@/lib/rajasthan-cities";
import { BLOG_POSTS } from "@/lib/blog-posts";

// Refresh database-backed product URLs without requiring a deployment.
export const revalidate = 3600;

const CONTENT_LAST_MODIFIED = new Date("2026-08-26T00:00:00+05:30");

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
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.4, changeFrequency: "monthly" },
  { path: "/return-refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: Array<{ slug: string; updatedAt: Date }> = [];

  try {
    products = await prisma.product.findMany({
      // Temporarily unavailable products still have useful, indexable pages.
      where: { category: { in: STOREFRONT_CATEGORY_VALUES } },
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    // Keep all static, Jaipur and Rajasthan URLs discoverable even during a
    // temporary database outage. Product URLs return on the next regeneration.
    console.error("Could not load product URLs for sitemap", error);
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: CONTENT_LAST_MODIFIED,
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
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const localityEntries: MetadataRoute.Sitemap = JAIPUR_LOCALITIES.map((locality) => ({
    url: `${SITE_URL}/organic-products-jaipur/${locality.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const rajasthanCityEntries: MetadataRoute.Sitemap = RAJASTHAN_CITIES.map((city) => ({
    url: `${SITE_URL}/organic-products-rajasthan/${city.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...productEntries,
    ...CATEGORIES.map((category) => ({
      url: `${SITE_URL}/products?category=${category.value}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...makingProcessEntries,
    ...localityEntries,
    ...rajasthanCityEntries,
    ...blogEntries,
  ];
}
