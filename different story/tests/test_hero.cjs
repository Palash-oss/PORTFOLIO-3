const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 900 } });
  const page = await context.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:3000/different%20story/index.html ...');
  await page.goto('http://localhost:3000/different%20story/index.html');

  // Wait 4s for loader (3.2s) + scramble to resolve (0.8s)
  await page.waitForTimeout(4000);

  const heroTexts = await page.evaluate(() => {
    const query = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        text: el.innerText.trim(),
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        opacity: style.opacity,
        visibility: style.visibility,
        display: style.display,
        transform: style.transform,
      };
    };

    return {
      name: query('.hero-name'),
      role: query('.hero-role'),
      bio: query('.hero-bio'),
      contact: query('.hero-contact-link'),
      scrollHint: query('.hero-scroll-hint'),
      sun: query('#hero-sun'),
      canvas: query('.hero-canvas-wrap canvas'),
    };
  });

  console.log('Hero elements status:', JSON.stringify(heroTexts, null, 2));

  if (!fs.existsSync('different story/tests')) {
    fs.mkdirSync('different story/tests', { recursive: true });
  }
  await page.screenshot({ path: 'different story/tests/hero_test.png' });
  console.log('Saved different story/tests/hero_test.png');

  await browser.close();
})();
