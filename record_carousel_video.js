const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function recordCarouselVideo() {
  const videosDir = path.join(__dirname, 'videos');
  
  // Create videos directory if it doesn't exist
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }
  
  console.log('Starting browser with video recording...');
  const browser = await chromium.launch();
  
  // Create context with video recording
  const context = await browser.newContext({
    recordVideo: {
      dir: videosDir,
      size: { width: 1280, height: 720 }
    }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to home page...');
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Wait a bit for carousel to fully load
    await page.waitForTimeout(2000);
    
    console.log('Starting carousel interaction for 5 minutes...');
    const startTime = Date.now();
    const duration = 5 * 60 * 1000; // 5 minutes in milliseconds
    let clickCount = 0;
    let carouselIndex = 0;
    
    // Interact with carousel for 5 minutes
    while (Date.now() - startTime < duration) {
      try {
        const carouselHandles = await page.$$('.carousel');
        if (carouselHandles.length === 0) {
          throw new Error('No carousels found');
        }
        
        const carouselHandle = carouselHandles[carouselIndex % carouselHandles.length];
        await carouselHandle.scrollIntoViewIfNeeded();
        await carouselHandle.hover();
        await page.waitForTimeout(400);
        
        const buttonType = Math.random() > 0.5 ? 'prev' : 'next';
        const selector = buttonType === 'prev' ? 'a.carousel-control-prev' : 'a.carousel-control-next';
        const buttonHandle = await carouselHandle.$(selector);
        
        if (!buttonHandle) {
          throw new Error(`No ${buttonType} button found`);
        }
        
        const visible = await buttonHandle.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.visibility !== 'hidden' && style.display !== 'none' && parseFloat(style.opacity || '1') > 0 && style.pointerEvents !== 'none';
        });
        
        if (visible) {
          await buttonHandle.evaluate((el) => el.click());
        } else {
          await buttonHandle.evaluate((el) => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
            el.click();
          });
        }
        
        clickCount++;
        console.log(`Click ${clickCount}: ${buttonType.toUpperCase()} button (Carousel ${carouselIndex})`);
        
        carouselIndex = (carouselIndex + 1) % carouselHandles.length;
      } catch (e) {
        console.log('Error clicking button:', e.message.substring(0, 50));
      }
      
      // Wait between clicks
      await page.waitForTimeout(600);
      
      // Occasionally scroll to different carousel
      if (clickCount % 20 === 0 && clickCount > 0) {
        await page.evaluate(() => {
          window.scrollBy(0, 200);
        });
        await page.waitForTimeout(500);
        console.log(`[Scrolled] (${clickCount} total clicks)`);
      }
      
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      if (elapsed % 60 === 0 && elapsed > 0) {
        console.log(`\n⏱️  Recording progress: ${elapsed} seconds elapsed (${Math.floor(elapsed / 60)} minutes)`);
        console.log(`📊 Carousel clicks: ${clickCount}\n`);
      }
    }
    
    console.log(`\n✓ Carousel interaction complete!`);
    console.log(`✓ Total clicks: ${clickCount}`);
    
  } catch (error) {
    console.error('Error during recording:', error.message);
  } finally {
    // Close context to save video
    await context.close();
    
    // Wait for video to be written
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const files = fs.readdirSync(videosDir);
    const videoFiles = files.filter(f => f.endsWith('.webm'));
    
    if (videoFiles.length > 0) {
      // Get the last created video file
      const videoFile = videoFiles.sort().pop();
      const videoPath = path.join(videosDir, videoFile);
      const stats = fs.statSync(videoPath);
      
      console.log(`\n✅ VIDEO SAVED SUCCESSFULLY!`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`  📁 File Name: ${videoFile}`);
      console.log(`  📂 Location: ${videosDir}`);
      console.log(`  💾 File Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  🎥 Duration: ~5 minutes`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    } else {
      console.log('⚠️  No video files found');
    }
    
    await browser.close();
  }
}

recordCarouselVideo().catch(console.error);
