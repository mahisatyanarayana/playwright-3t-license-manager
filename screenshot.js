const playwright = require('playwright');

(async () => {
  for (const browserType of ['chromium']) {
    const browser = await playwright.chromium.launch({
      headless: false
  });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://license.studio3t.com/');
    
    await page.click('"CONTINUE"');
    await page.waitForTimeout(10000);
    await page.screenshot({ path: `3t-${browserType}.png` });
    await browser.close();
  }
})();