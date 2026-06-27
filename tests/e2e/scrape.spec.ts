import { test, expect } from '@playwright/test';
import fs from 'fs';

test('scrape: save first page products to JSON', { tag: '@agentic' }, async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'agentic' });
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57');

  const products = page.locator('.product-layout');
  await expect(products.first()).toBeVisible();

  const items: Array<{ title: string; price: string; img: string | null }> = [];
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const card = products.nth(i);

    // getByRole is more resilient to HTML restructuring than brittle "h4 a" selectors
    const titleEl = card.getByRole('heading').getByRole('link');
    const title = (await titleEl.count()) > 0 ? await titleEl.innerText() : '';

    const priceEl = card.locator('.price').first();
    const price = (await priceEl.count()) > 0 ? await priceEl.innerText() : '';

    const imgEl = card.locator('img').first();
    const img = (await imgEl.count()) > 0 ? await imgEl.getAttribute('src') : null;

    items.push({ title, price, img });
  }

  const outDir = 'data-scrape';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(`${outDir}/page1.json`, JSON.stringify(items, null, 2));

  expect(items.length).toBeGreaterThan(0);
});
