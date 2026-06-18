import { test, expect } from '@playwright/test';

test('categories: open Phone, Tablets & iPod and count products', { tag: '@agentic' }, async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'agentic' });
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57');
  // wait for product grid
  const products = page.locator('.product-layout');
  await expect(products.first()).toBeVisible();
  const count = await products.count();
  console.log('productCount', count);
  expect(count).toBeGreaterThan(0);
});
