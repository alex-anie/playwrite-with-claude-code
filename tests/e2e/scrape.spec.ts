import { test, expect } from '@playwright/test';
const fs = require('fs');

test('scrape: save first page products to JSON', { tag: '@agentic' }, async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'agentic' });
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57');
  const products = page.locator('.product-layout');
  await expect(products.first()).toBeVisible();
  const items = [];
  for (let i = 0; i < await products.count(); i++) {
    const p = products.nth(i);
    const title = await p.locator('h4 a').innerText().catch(() => '');
    const price = await p.locator('.price').innerText().catch(() => '');
    const img = await p.locator('img').getAttribute('src').catch(() => '');
    items.push({ title, price, img });
  }
  const outDir = 'data-scrape';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(`${outDir}/page1.json`, JSON.stringify(items, null, 2));
  expect(items.length).toBeGreaterThan(0);
});
