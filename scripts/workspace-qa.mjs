import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const origin = process.env.EECARD_WORKSPACE_ORIGIN || "http://127.0.0.1:5173";
const browser = await chromium.launch();
const report = { version: "0.5", support: origin, checks: [] };
mkdirSync("docs/design/screenshots/experience-0.5", { recursive: true });
for (const width of [360, 390, 1280, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 950 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [],
    external = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (
      /^https?:/.test(r.url()) &&
      new URL(r.url()).origin !== new URL(origin).origin
    )
      external.push(r.url());
  });
  const click = async (name) =>
    page.getByRole("button", { name, exact: true }).click();
  const go = async (view) => page.goto(`${origin}/#/spazio/${view}`);
  async function capture(state, screenshot = true) {
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    const brokenImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.src),
      );
    report.checks.push({
      width,
      state,
      overflow,
      brokenImages,
      violations: result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      errors: [...errors],
      externalRequests: [...external],
    });
    if (screenshot) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `docs/design/screenshots/experience-0.5/${state}-${width}.png`,
        fullPage: true,
      });
    }
  }
  await go("overview");
  await capture("agenzia");
  await click("Completa la pratica");
  await capture("pratica");
  await click("Controlla la data");
  await capture("fonti");
  await click("Conferma la data del contratto");
  await click("Continua ai documenti");
  await click("Aggiungi documento");
  await click("Collega documento di esempio");
  await click("Verifica e continua");
  await click("Prepara gli accessi");
  await click("Attiva accesso di esempio");
  await capture("attivazione");
  await go("desk");
  await click("Presenta tessera di esempio");
  await page.getByLabel("Ho verificato la persona presente").check();
  await page
    .getByLabel("Casa e contratto", { exact: true })
    .selectOption("alfa");
  await capture("banco");
  await click("Conferma e apri il fascicolo");
  await capture("documenti");
  await page.getByRole("button", { name: /Impianto elettrico/ }).click();
  await capture("documento");
  await click("Fonti e revisioni");
  await capture("revisioni", false);
  await page.keyboard.press("Escape");
  await click("Termina incontro");
  await click("Vista cliente");
  await capture("personale");
  await go("utilities");
  await capture("utenze");
  await go("support");
  await click("Nuova richiesta");
  await page.getByLabel("Qual è il problema?").fill("Rubinetto di esempio");
  await page
    .getByLabel("Descrivilo brevemente")
    .fill("Richiesta sintetica, senza recapiti o dati reali.");
  await capture("richiesta");
  await click("Salva richiesta di esempio");
  await capture("richiesta-salvata", false);
  await click("Vista agenzia");
  await go("drafts");
  await click("Compila dai dati della pratica");
  await capture("bozza");
  if ([390, 1440].includes(width)) {
    await page
      .getByRole("button", { name: "Strumenti della prova", exact: true })
      .click();
    await page.getByLabel("Scenario della prova").selectOption("other");
    await capture("panoramica-beta");
    await go("documents");
    await capture("agenzia-beta");
    await page
      .getByRole("button", { name: "Strumenti della prova", exact: true })
      .click();
    await page.getByLabel("Scenario della prova").selectOption("revoked");
    await go("desk");
    await click("Presenta tessera di esempio");
    await capture("card-revocata");
    await page
      .getByRole("button", { name: "Strumenti della prova", exact: true })
      .click();
    await page.getByLabel("Scenario della prova").selectOption("service");
    await capture("servizio-indisponibile");
  }
  await context.close();
}
await browser.close();
writeFileSync(
  "docs/design/verifiche-experience-0.5.json",
  JSON.stringify(report, null, 2),
);
const bad = report.checks.filter(
  (r) =>
    r.overflow ||
    r.brokenImages.length ||
    r.violations.length ||
    r.errors.length ||
    r.externalRequests.length,
);
console.log(
  `${report.checks.length} viste controllate; ${bad.length} con anomalie.`,
);
if (bad.length) {
  console.log(JSON.stringify(bad));
  process.exitCode = 1;
}
