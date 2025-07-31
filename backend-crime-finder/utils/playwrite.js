import { chromium, devices } from 'playwright';

async function getData() {
  // Emulate an iPhone 12 device
  const iPhone = devices['iPhone 12'];

  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    ...iPhone,
    userAgent: iPhone.userAgent,
    locale: 'en-US',
  });

  const page = await context.newPage();

  // Go to Google
  await page.goto('https://www.bing.com');

  await page.waitForTimeout(2000); // Let the page load

  // Accept cookies if the banner appears (optional)
  try {
    await page.click('#L2AGLb', { timeout: 2000 });
  } catch (e) {
    // Ignore if not present
  }

  // Type slowly (human-like)
  await page.type('textarea[name="q"]', 'what is india', { delay: 150 });

  await page.keyboard.press('Enter');

  await page.waitForTimeout(3000); // Wait for results

  await page.screenshot({ path: 'results.png' });

  await browser.close();
}

getData();
