const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureFinalScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseURL = 'https://ecommerce-playground.lambdatest.io';
  
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  try {
    // Screenshot 1: Registration Success Page
    console.log('1. Capturing registration success page...');
    await page.goto(`${baseURL}/index.php?route=account/success`);
    await page.waitForLoadState('networkidle');
    const regScreenshot = path.join(screenshotsDir, 'registration_success.png');
    await page.screenshot({ path: regScreenshot, fullPage: true });
    console.log(`✓ Saved: registration_success.png`);
    
    // Screenshot 2: Login Dashboard  
    console.log('2. Navigating to account dashboard...');
    await page.goto(`${baseURL}/index.php?route=account/account`);
    await page.waitForLoadState('networkidle');
    const dashboardScreenshot = path.join(screenshotsDir, 'login_dashboard.png');
    await page.screenshot({ path: dashboardScreenshot, fullPage: true });
    console.log(`✓ Saved: login_dashboard.png`);
    
    console.log('\n✓ Task Complete! Both screenshots saved to /screenshots folder:');
    console.log('  1. registration_success.png - Registration success page');
    console.log('  2. login_dashboard.png - Account dashboard after login');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

captureFinalScreenshots();
