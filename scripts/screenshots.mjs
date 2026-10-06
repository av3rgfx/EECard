import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const browser = await chromium.launch();
mkdirSync("docs/design/screenshots", { recursive: true });
for (const width of [1440, 1280, 390, 360]) {
  const context = await browser.newContext({
    viewport: { width, height: width < 700 ? 844 : 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173");
  await page.evaluate(() => document.fonts.ready);
  const prefix = width < 700 ? "mobile" : "desktop";
  await page.screenshot({
    path: `docs/design/screenshots/${prefix}-proprietario-${width}.png`,
    fullPage: true,
  });
  if ([1440, 390].includes(width)) {
    for (const route of [
      "documenti",
      "affitto",
      "assistenza",
      "card",
      "accesso",
      "design-system",
    ]) {
      await page.goto(`http://127.0.0.1:5173/#/${route}`);
      await page.screenshot({
        path: `docs/design/screenshots/${prefix}-${route}-${width}.png`,
        fullPage: true,
      });
    }
    await page
      .getByLabel("Ruolo demo", { exact: true })
      .selectOption("inquilino");
    await page.goto("http://127.0.0.1:5173/#/home");
    await page.screenshot({
      path: `docs/design/screenshots/${prefix}-inquilino-${width}.png`,
      fullPage: true,
    });
    await page
      .getByLabel("Ruolo demo", { exact: true })
      .selectOption("agenzia");
    await page.screenshot({
      path: `docs/design/screenshots/${prefix}-agenzia-${width}.png`,
      fullPage: true,
    });
    await page.goto("http://127.0.0.1:5173/#/documenti");
    await page
      .getByRole("button", { name: /Contratto di locazione Contratti/ })
      .click();
    await page.getByRole("button", { name: "Condividi", exact: true }).click();
    await page.getByLabel("Destinatario").selectOption("Sofia Bianchi");
    await page.screenshot({
      path: `docs/design/screenshots/${prefix}-condivisione-${width}.png`,
      fullPage: false,
    });
  }
  await context.close();
}
await browser.close();
