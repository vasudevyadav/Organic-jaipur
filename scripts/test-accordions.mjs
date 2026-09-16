import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';

// Start the app first. Override BASE_URL when testing another local port.
const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';
const browser = await chromium.launch();
const routes = ['/about', '/contact', '/shipping-policy', '/return-refund-policy', '/privacy-policy', '/terms-and-conditions', '/products/buffalo-bilona-ghee'];
const productRoute = routes.at(-1);
const runtimeErrors = [];

async function open(page, route) {
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded' });
  assert.equal(response.status(), 200, route);
}
async function checkFaq(page, route) {
  const entries = page.locator('details');
  assert.ok(await entries.count() >= 2, `${route}: FAQ entries`);
  const visibleContent = await entries.evaluateAll(elements => elements.map(element => ({
    question: element.querySelector('summary').textContent.trim(),
    answer: element.querySelector('p').textContent.trim(),
  })));
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(elements =>
    elements.flatMap(element => { const value = JSON.parse(element.textContent); return Array.isArray(value) ? value : [value]; })
  );
  const faqSchema = schemas.filter(schema => schema['@type'] === 'FAQPage');
  assert.equal(faqSchema.length, 1, `${route}: one FAQ schema`);
  assert.deepEqual(faqSchema[0].mainEntity.map(item => ({ question: item.name, answer: item.acceptedAnswer.text })), visibleContent, `${route}: schema matches HTML`);
  const first = entries.nth(0);
  const second = entries.nth(1);
  await second.locator('summary').click();
  await expect(second).toHaveAttribute('open', '');
  await expect(first).not.toHaveAttribute('open');
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('open', '');
  await expect(second).not.toHaveAttribute('open');
  await page.keyboard.press('Space');
  await expect(first).not.toHaveAttribute('open');
  console.log(`PASS FAQ click, keyboard and matching schema: ${route}`);
}
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', error => runtimeErrors.push(error.message));
  for (const route of routes) { await open(page, route); await checkFaq(page, route); }
  const tablist = page.getByRole('tablist', { name: 'Product quality information' });
  const tabs = tablist.getByRole('tab');
  await expect(tablist).toBeVisible();
  await tabs.first().focus();
  for (const [key, index] of [['ArrowRight', 1], ['End', 2], ['ArrowRight', 0], ['ArrowLeft', 2], ['Home', 0]]) {
    await page.keyboard.press(key);
    await expect(tabs.nth(index)).toBeFocused();
    await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    assert.equal(await tabs.evaluateAll(elements => elements.filter(element => element.tabIndex === 0).length), 1);
  }
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tabpanel')).toBeFocused();
  await tabs.nth(2).click();
  await expect(page.getByText('No lab report published here')).toBeVisible();
  // Every tab must reference a real, uniquely labelled panel.
  assert.ok(await tabs.evaluateAll(elements => elements.every(element => {
    const panel = document.getElementById(element.getAttribute('aria-controls'));
    return panel?.getAttribute('aria-labelledby') === element.id;
  })));
  console.log('PASS quality tabs: click, arrows, wraparound, Home/End, focus and ARIA');
  for (const width of [375, 320]) {
    await page.setViewportSize({ width, height: 812 });
    await tabs.first().click();
    const copy = page.locator('.process-copy');
    assert.ok(await copy.evaluateAll(elements => elements.every(element => element.clientWidth >= 180 && element.scrollWidth <= element.clientWidth + 1)), `Readable process text at ${width}px`);
    const section = page.locator('section').filter({ has: tablist });
    assert.ok(await section.evaluate(element => element.scrollWidth <= element.clientWidth + 1), `Quality section fits ${width}px`);
    await checkFaq(page, `mobile ${width}px`);
    await section.screenshot({ path: `/tmp/organic-accordion-${width}.png` });
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const plain = await noJs.newPage();
  await open(plain, '/about');
  await checkFaq(plain, 'About without JavaScript');
  assert.equal(await plain.getByRole('heading', { name: 'Farm & crop management' }).evaluate(element => getComputedStyle(element.parentElement).opacity), '1');
  await open(plain, productRoute);
  await expect(plain.getByText('No lab report published here')).toBeVisible();
  await expect(plain.getByRole('heading', { name: 'Four checkpoints. One standard.' })).toBeVisible();
  await checkFaq(plain, 'Product without JavaScript');
  console.log('PASS no-JavaScript: About content, all quality sections and FAQ interaction');
  assert.deepEqual(runtimeErrors, [], 'No browser runtime/hydration errors');
  console.log('All accordion checks passed.');
} finally { await browser.close(); }
