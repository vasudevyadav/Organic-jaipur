import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const queries = [
  { q: "ghee jar wooden", key: "ghee" },
  { q: "mustard oil bottle", key: "mustard-oil" },
  { q: "honey jar wooden spoon", key: "honey" },
  { q: "fresh vegetables basket", key: "vegetables" },
  { q: "fresh fruits basket", key: "fruits" },
  { q: "indian cow farm field", key: "farm" },
];

const results = {};

for (const { q, key } of queries) {
  const url = `https://unsplash.com/s/photos/${encodeURIComponent(q.replace(/\s+/g, "-"))}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(2500);
  const srcs = await page.$$eval("img[src*='images.unsplash.com/photo-']", (imgs) =>
    imgs.map((img) => img.src).filter(Boolean)
  );
  // dedupe and take first 6
  const unique = [...new Set(srcs)].slice(0, 6);
  results[key] = unique;
  console.log(key, unique.length, "found");
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
