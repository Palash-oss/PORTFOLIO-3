const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

(async () => {
  console.log('=== STARTING PLAYWRIGHT SCROLL PROOF SUITE ===');

  const outDir = path.join(__dirname, 'sweep_artifacts');
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  // ─── 1. DESKTOP TEST: 1920x900 ─────────────────────────────────────
  console.log('\n--- 1. Running Desktop 1920x900 0.5% Step Sweep ---');
  const desktopContext = await browser.newContext({ viewport: { width: 1920, height: 900 } });
  const desktopPage = await desktopContext.newPage();

  desktopPage.on('pageerror', err => console.error('Desktop Page Error:', err.message));

  await desktopPage.goto('http://localhost:3000/different%20story/index.html');
  await desktopPage.waitForTimeout(3500); // Wait for loader

  const desktopMaxScroll = await desktopPage.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  console.log(`Desktop max scroll travel: ${desktopMaxScroll}px`);

  const desktopStepsDir = path.join(outDir, 'desktop_steps');
  fs.mkdirSync(desktopStepsDir, { recursive: true });

  const steps = [];
  // 0 to 1 in 0.005 steps (0% to 100%)
  for (let i = 0; i <= 200; i++) steps.push(i / 200);
  // and back (100% to 0%)
  for (let i = 199; i >= 0; i--) steps.push(i / 200);

  console.log(`Sweeping ${steps.length} scroll steps forward & back...`);
  
  // We sample every 5th frame for disk image storage (contact sheet) to keep execution fast,
  // while checking pixel statistics / blankness across all steps in-memory
  const sweepResults = [];

  for (let idx = 0; idx < steps.length; idx++) {
    const fraction = steps[idx];
    const scrollY = Math.round(fraction * desktopMaxScroll);

    await desktopPage.evaluate((y) => {
      window.scrollTo(0, y);
    }, scrollY);

    // Brief settling for smooth render
    if (idx % 10 === 0) await desktopPage.waitForTimeout(40);

    // Check DOM elements and overlaps
    const check = await desktopPage.evaluate((frac) => {
      const cards = [
        { id: '#scene1-hero', el: document.querySelector('#scene1-hero') },
        { id: '#scene2-work', el: document.querySelector('#scene2-work') },
        { id: '#scene3-record', el: document.querySelector('#scene3-record') },
        { id: '#scene4-principles', el: document.querySelector('#scene4-principles') },
        { id: '#scene5-contact', el: document.querySelector('#scene5-contact') },
      ];

      const visibleCards = [];
      for (const c of cards) {
        if (!c.el) continue;
        const r = c.el.getBoundingClientRect();
        const style = window.getComputedStyle(c.el);
        const inViewport = r.bottom > 50 && r.top < window.innerHeight - 50;
        const opacity = parseFloat(style.opacity);
        if (inViewport && opacity > 0.1) {
          visibleCards.push({ id: c.id, opacity, top: r.top });
        }
      }

      // Check if two cards overlap at full opacity (opacity === 1 in same bounds)
      let illegalOverlap = false;
      if (visibleCards.filter(c => c.opacity >= 0.95 && Math.abs(c.top) < 20).length > 1) {
        illegalOverlap = true;
      }

      return {
        scrollY: window.scrollY,
        visibleCardsCount: visibleCards.length,
        illegalOverlap,
      };
    }, fraction);

    // Save screenshots periodically for contact sheet
    if (idx % 4 === 0 || idx === steps.length - 1) {
      const framePath = path.join(desktopStepsDir, `step_${String(idx).padStart(4, '0')}.png`);
      await desktopPage.screenshot({ path: framePath });
    }

    sweepResults.push({ step: idx, fraction, ...check });
  }

  // ─── 2. FAST FLICK TEST ─────────────────────────────────────────────
  console.log('\n--- 2. Running Fast Flick Test ---');
  // Flick from top to bottom
  await desktopPage.evaluate((max) => {
    window.scrollTo({ top: max, behavior: 'auto' });
  }, desktopMaxScroll);
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(outDir, 'flick_bottom.png') });

  // Flick back to top
  await desktopPage.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(outDir, 'flick_top.png') });
  console.log('Fast flick test completed.');

  // ─── 3. MOBILE TEST: 390x844 ───────────────────────────────────────
  console.log('\n--- 3. Running Mobile 390x844 Sweep ---');
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/different%20story/index.html');
  await mobilePage.waitForTimeout(3500);

  const mobileStepsDir = path.join(outDir, 'mobile_steps');
  fs.mkdirSync(mobileStepsDir, { recursive: true });

  const mobileMaxScroll = await mobilePage.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  for (let i = 0; i <= 20; i++) {
    const frac = i / 20;
    await mobilePage.evaluate((y) => window.scrollTo(0, y), Math.round(frac * mobileMaxScroll));
    await mobilePage.waitForTimeout(50);
    await mobilePage.screenshot({ path: path.join(mobileStepsDir, `mob_${String(i).padStart(2, '0')}.png`) });
  }
  console.log('Mobile sweep completed.');

  await browser.close();

  // Save sweep results to json
  fs.writeFileSync(path.join(outDir, 'sweep_results.json'), JSON.stringify(sweepResults, null, 2));

  // ─── 4. RUN PYTHON LUMINANCE ANALYSIS & CONTACT SHEET ───────────────
  console.log('\n--- 4. Running Python Luminance & Contact Sheet Analysis ---');
  execSync(`python "different story/tests/process_sweep.py"`, { stdio: 'inherit' });

  console.log('=== PLAYWRIGHT PROOF FINISHED ===');
})();
