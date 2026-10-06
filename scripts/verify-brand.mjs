import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch();
const report = [];
for (const width of [320, 390, 1240]) {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:5174/marchio/");
  await page.evaluate(() => document.fonts.ready);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  const links = await page
    .locator("a[download]")
    .evaluateAll((links) => links.map((a) => a.href));
  const downloads = [];
  for (const url of links) {
    const response = await context.request.get(url);
    downloads.push({ file: new URL(url).pathname, status: response.status() });
  }
  if (width !== 320)
    await page.screenshot({
      path: `docs/design/marchio/guide-${width}.png`,
      fullPage: true,
    });
  report.push({
    view: "guide",
    width,
    overflow,
    errors,
    violations: axe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
    downloads,
  });
  await context.close();
}
for (const [route, width] of [
  ["desktop", 1440],
  ["mobile", 1440],
  ["mobile", 390],
  ["mobile", 360],
]) {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`http://localhost:5174/${route}/`);
  await page.waitForLoadState("networkidle");
  const frame =
    page.frames().find((f) => f !== page.mainFrame()) || page.mainFrame();
  await frame.locator('a[href="#/card"]:visible').first().click();
  await frame
    .getByRole("heading", { level: 1, name: "La chiave del tuo spazio." })
    .waitFor();
  const values = await frame.evaluate(() => ({
    appWidth: innerWidth,
    overflow: document.documentElement.scrollWidth > innerWidth,
    logo: !!document.querySelector(".brand-symbol path"),
    serviceSize: parseFloat(
      getComputedStyle(document.querySelector(".card-service")).fontSize,
    ),
  }));
  report.push({ view: route, width, ...values, errors });
  await context.close();
}
const context = await browser.newContext();
const page = await context.newPage();
const network = [];
page.on("request", (r) => {
  if (/^https?:/.test(r.url())) network.push(r.url());
});
await page.goto(`file://${process.cwd()}/docs/design/anteprima.html`);
await page.locator("h1").waitFor();
await page.locator('a[href="#/documenti"]:visible').first().click();
await page
  .getByRole("button", { name: /Contratto di locazione Contratti/ })
  .click();
await page.getByRole("dialog").waitFor();
report.push({
  view: "portable",
  externalRequests: network,
  favicon: await page
    .locator('link[rel="icon"]')
    .getAttribute("href")
    .then((h) => h.startsWith("data:image/svg+xml")),
});
await context.close();
await browser.close();
writeFileSync(
  "docs/design/verifiche-legame.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  report.map(({ downloads, ...r }) => ({
    ...r,
    failedDownloads: downloads?.filter((d) => d.status !== 200),
  })),
);
if (
  report.some(
    (r) =>
      r.overflow ||
      r.errors?.length ||
      r.violations?.length ||
      r.externalRequests?.length ||
      r.downloads?.some((d) => d.status !== 200) ||
      r.serviceSize < 11,
  )
)
  process.exit(1);
