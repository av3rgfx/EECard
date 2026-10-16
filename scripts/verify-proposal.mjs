import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const base =
  process.env.EECARD_PROPOSAL_URL ||
  pathToFileURL(resolve("docs/design/anteprima.html")).href;
const output = process.env.EECARD_PROPOSAL_QA || "/tmp/eecard-proposal-qa";
mkdirSync(output, { recursive: true });
const browser = await chromium.launch();
const errors = [],
  external = [],
  checks = [];
for (const width of [360, 390, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: width > 700 ? 1050 : 844 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (
      /^https?:/.test(request.url()) &&
      !/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/)/.test(request.url())
    )
      external.push(request.url());
  });
  await page.goto(`${base.split("#")[0]}#/casa/home`);
  await page.locator(".cp-welcome").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `${output}/home-${width}.png`,
    fullPage: true,
  });
  const homeFit = await page.evaluate(
    () => document.documentElement.scrollWidth <= innerWidth,
  );
  await page
    .getByRole("button", { name: "Verifica e paga", exact: true })
    .click();
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Continua al pagamento simulato" })
    .click();
  await page.screenshot({
    path: `${output}/conferma-${width}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: /Conferma simulazione/ }).click();
  await page
    .getByRole("heading", { name: "Passaggio completato. Verifica in attesa." })
    .waitFor();
  await page.screenshot({
    path: `${output}/esito-${width}.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Chiedi una verifica", exact: true })
    .click();
  await page
    .getByLabel("Raccontaci cosa serve")
    .fill("Vorrei verificare il riscontro di questa bolletta di esempio.");
  await page.getByRole("button", { name: "Rivedi la richiesta" }).click();
  await page.screenshot({
    path: `${output}/assistenza-${width}.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Conferma richiesta di esempio" })
    .click();
  await page
    .getByRole("button", { name: "Segui la richiesta", exact: true })
    .click();
  await page.locator(".cp-request").waitFor();
  const flowFit = await page.evaluate(
    () => document.documentElement.scrollWidth <= innerWidth,
  );
  checks.push({ width, homeFit, flowFit, payment: true, assistance: true });
  await page.close();
}
await browser.close();
const report = { base, checks, errors, external };
writeFileSync(`${output}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (
  errors.length ||
  external.length ||
  checks.some((c) => !c.homeFit || !c.flowFit)
)
  process.exitCode = 1;
