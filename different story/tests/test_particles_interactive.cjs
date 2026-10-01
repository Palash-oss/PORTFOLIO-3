const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 900 } });
  
  await page.goto('http://localhost:3000/different%20story/index.html');
  await page.waitForTimeout(3500);

  // 1. Screenshot rest state
  await page.screenshot({ path: 'different story/tests/particles_rest.png' });
  console.log('Saved particles_rest.png');

  // 2. Move mouse right across the statue's cheek/forehead (e.g. x: 400, y: 350)
  await page.mouse.move(400, 350);
  await page.waitForTimeout(100);
  await page.mouse.move(380, 280);
  await page.waitForTimeout(100);
  await page.mouse.move(350, 220);
  await page.waitForTimeout(100);

  // Screenshot during dispersion
  await page.screenshot({ path: 'different story/tests/particles_dispersed.png' });
  console.log('Saved particles_dispersed.png');

  // 3. Move mouse away and wait for particles to spring back
  await page.mouse.move(1200, 500);
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'different story/tests/particles_returned.png' });
  console.log('Saved particles_returned.png');

  await browser.close();
  console.log('Interactivity test complete!');
})();
