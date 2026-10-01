const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 900 } });

  console.log('Navigating to app...');
  await page.goto('http://localhost:3002/different%20story/index.html');
  await page.waitForTimeout(3500); // Wait for loader

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = 900;
  console.log('Total document scroll height:', totalHeight, 'Viewport height:', vh);

  // Take screenshots of each scene
  // 1. Hero (scroll = 0)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'different story/tests/scene1_hero.png' });
  console.log('Scene 1 Hero saved');

  // 2. Work (scroll ~ 1.5 * vh)
  await page.evaluate((y) => window.scrollTo(0, y), 1.5 * vh);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'different story/tests/scene2_work.png' });
  console.log('Scene 2 Work saved');

  // 3. Record (scroll ~ 3.5 * vh)
  await page.evaluate((y) => window.scrollTo(0, y), 3.5 * vh);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'different story/tests/scene3_record.png' });
  console.log('Scene 3 Record saved');

  // 4. Principles word 0 (scroll ~ 5.5 * vh)
  await page.evaluate((y) => window.scrollTo(0, y), 5.5 * vh);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'different story/tests/scene4_principles_w0.png' });
  console.log('Scene 4 Principles w0 saved');

  // 5. Principles word 1 (scroll ~ 7.0 * vh)
  await page.evaluate((y) => window.scrollTo(0, y), 7.0 * vh);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'different story/tests/scene4_principles_w1.png' });
  console.log('Scene 4 Principles w1 saved');

  // 6. Contact (scroll = totalHeight)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'different story/tests/scene5_contact.png' });
  console.log('Scene 5 Contact saved');

  await browser.close();
})();
