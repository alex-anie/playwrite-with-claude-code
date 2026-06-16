// @type {import('@playwright/test').PlaywrightTestConfig}
const config = {
  testDir: './tests/e2e',
  outputDir: 'reports/test-results',
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-report' }]],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
};

module.exports = config;
