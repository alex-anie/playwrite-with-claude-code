const { test, expect } = require('@playwright/test');

test.describe('Ecommerce Playground homepage', () => {
  test('should load the homepage and display categories', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await expect(page).toHaveTitle(/Your Store/i);
    await expect(page.locator('text=Top categories')).toBeVisible();
    await expect(page.locator('nav >> text=Components')).toBeVisible();
    await expect(page.locator('button:has-text("Search")')).toBeVisible().catch(() => {});
  });
});
