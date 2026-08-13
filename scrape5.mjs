import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function tryUrl(url, label) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);
    const title = await page.title();
    console.log(label, "TITLE:", title);
    return true;
  } catch (e) {
    console.log(label, "FAILED", e.message);
    return false;
  }
}

await tryUrl("https://pixabay.com/images/search/ghee/", "pixabay");
await tryUrl("https://openverse.org/search?q=ghee%20jar", "openverse");
await browser.close();
