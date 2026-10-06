import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.DESIGN_LAB_URL || "http://localhost:5175";
const directory = "docs/design/esplorazioni/screenshots";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const captures = [];
for (const v of [1, 2, 3]) {
  for (const [view, width, suffix, query] of [
    ["home", 1440, "home-desktop", ""],
    ["home", 390, "home-mobile", ""],
    ["card", 1440, "tessera", ""],
    ["card", 390, "tessera-critica", "&state=critical"],
    ["affitto", 1440, "affitto", ""],
    ["affitto", 390, "affitto-ridotto", "&motion=reduce"],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height: width === 390 ? 844 : 1000 },
    });
    await page.goto(`${base}/?v=${v}&view=${view}${query}`);
    await page.evaluate(() => document.fonts.ready);
    if (view === "affitto")
      await page.locator(".process-steps li").nth(2).locator("button").click();
    if (suffix === "tessera-critica")
      await page.getByRole("checkbox", { name: "Prova un nome lungo" }).check();
    // Capture the first viewport for homes, the complete task for detail/process.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(180);
    const file = `${directory}/${v}-${suffix}.png`;
    await page.screenshot({ path: file, fullPage: view !== "home" });
    captures.push({ v, view, width, file });
    await page.close();
  }
}
await writeFile(
  "docs/design/esplorazioni/screenshots.json",
  JSON.stringify(captures, null, 2) + "\n",
);
await browser.close();
console.log(`${captures.length} screenshot salvati in ${directory}`);
