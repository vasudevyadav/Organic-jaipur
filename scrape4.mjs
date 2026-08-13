import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const targets = [
  { url: "https://en.wikipedia.org/wiki/Ghee", key: "ghee" },
  { url: "https://en.wikipedia.org/wiki/Mustard_oil", key: "mustard-oil" },
  { url: "https://en.wikipedia.org/wiki/Honey", key: "honey" },
  { url: "https://en.wikipedia.org/wiki/Vegetable", key: "vegetables" },
  { url: "https://en.wikipedia.org/wiki/Fruit", key: "fruits" },
  { url: "https://en.wikipedia.org/wiki/Gir_cattle", key: "farm" },
];

for (const t of targets) {
  await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(800);
  const srcs = await page.$$eval("img", (imgs) =>
    imgs.map((img) => img.src).filter((s) => s && s.includes("upload.wikimedia.org"))
  );
  console.log(t.key, JSON.stringify(srcs.slice(0, 5)));
}
await browser.close();
