import { test, expect } from '@playwright/test';

test('home: explore site and basic smoke checks', async ({ page }) => {
  test.info().annotations.push({ type: 'tag', description: 'agentic' });
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  await expect(page).toHaveTitle(/Your Store/i);
  await expect(page.locator('header, #content, footer')).toBeVisible();
});
