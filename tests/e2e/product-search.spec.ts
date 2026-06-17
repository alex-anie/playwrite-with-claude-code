import { test, expect } from '@playwright/test';

/**
 * Product Search & Navigation Tests
 * Site: https://ecommerce-playground.lambdatest.io/
 *
 * Generated with Claude Code + Playwright MCP Server.
 * Claude navigated the site, identified the search flow,
 * and produced these assertions based on observed DOM structure.
 */

test.describe('Product Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should return results for a valid search query', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: /search/i });
    await searchInput.fill('iPhone');
    await searchInput.press('Enter');

    // Wait for results to load
    await page.waitForURL(/search/);

    // Verify at least one product card is displayed
    const productCards = page.locator('.product-thumb');
    await expect(productCards.first()).toBeVisible();
  });

  test('should show no results message for invalid search', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: /search/i });
    await searchInput.fill('xyzproductnotexist123');
    await searchInput.press('Enter');

    await page.waitForURL(/search/);

    // Verify empty state message appears
    const emptyMessage = page.getByText(/no results/i).or(
      page.getByText(/no product/i)
    );
    await expect(emptyMessage).toBeVisible();
  });

  test('should navigate to a product detail page from search results', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: /search/i });
    await searchInput.fill('MacBook');
    await searchInput.press('Enter');

    await page.waitForURL(/search/);

    // Click the first product result
    const firstProduct = page.locator('.product-thumb').first();
    await firstProduct.locator('h4 a, .caption a').first().click();

    // Verify the product detail page loaded by checking for the
    // "Product Code:" label, which only appears on product detail pages.
    await expect(page.getByText(/product code/i)).toBeVisible({ timeout: 10000 });

    // Confirm the URL route changed to a product detail route.
    // Note: this site keeps the original search term as a query param
    // on the product page (e.g. ...route=product/product&search=MacBook),
    // so checking for the absence of "search" isn't reliable — we check
    // for the presence of the product route instead.
    await expect(page).toHaveURL(/route=product\/product/);
  });
});

