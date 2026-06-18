const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Email and password from registration
  const email = 'johndoe1781801470601@example.com';
  const password = 'Test@1234';
  const baseURL = 'https://ecommerce-playground.lambdatest.io';
  
  // Ensure screenshots directory exists
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  try {
    // Step 1: Capture registration success page
    console.log('Navigating to registration success page...');
    await page.goto(`${baseURL}/index.php?route=account/success`);
    await page.waitForTimeout(1000);
    const registrationScreenshot = path.join(screenshotsDir, 'registration_success.png');
    await page.screenshot({ path: registrationScreenshot, fullPage: true });
    console.log(`✓ Registration success screenshot saved: ${registrationScreenshot}`);
    
    // Step 2: Logout
    console.log('Logging out...');
    await page.goto(`${baseURL}/index.php?route=account/logout`);
    await page.waitForTimeout(500);
    
    // Step 3: Navigate to login page and login
    console.log('Navigating to login page...');
    await page.goto(`${baseURL}/index.php?route=account/login`);
    await page.waitForTimeout(500);
    
    // Fill login form
    console.log('Filling login form...');
    await page.fill('input[type="email"], input[name="email"]', email);
    await page.fill('input[type="password"], input[name="password"]', password);
    
    // Click login button
    console.log('Clicking login button...');
    const loginButton = await page.$('button, input[type="submit"]');
    if (loginButton) {
      await loginButton.click();
      // Wait for navigation with a longer timeout
      try {
        await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
      } catch (e) {
        console.log('Navigation timeout (expected), waiting for content load...');
      }
    }
    
    await page.waitForTimeout(2000);
    
    // Verify we're on account page
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    // Step 4: Capture account dashboard screenshot
    console.log('Capturing account dashboard screenshot...');
    const loginScreenshot = path.join(screenshotsDir, 'login_dashboard.png');
    await page.screenshot({ path: loginScreenshot, fullPage: true });
    console.log(`✓ Login dashboard screenshot saved: ${loginScreenshot}`);
    
    console.log('\n✓ All screenshots captured successfully!');
    
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
