import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const base =
  process.env.EECARD_DEMO_URL || "http://127.0.0.1:5173/#/laboratorio";
const browser = await chromium.launch();
const report = { support: base, synthetic: true, checks: [] };
mkdirSync("docs/design/screenshots/demo-0.4", { recursive: true });
for (const width of [360, 390, 1280, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [],
    external = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (
      /^https?:/.test(r.url()) &&
      new URL(r.url()).origin !== new URL(base).origin
    )
      external.push(r.url());
  });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  async function check(state, screenshot = true) {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    report.checks.push({
      width,
      state,
      overflow,
      violations: result.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
      errors: [...errors],
      externalRequests: [...external],
    });
    if (screenshot) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `docs/design/screenshots/demo-0.4/${state}-${width}.png`,
        fullPage: true,
      });
    }
  }
  await check("pf01");
  for (const name of [
    "Conferma fonte A",
    "Aggiungi facsimile locale",
    "Verifica rapporto simulato",
    "Prepara inviti simulati",
    "Simula accettazione e attivazione",
  ])
    await page.getByRole("button", { name, exact: true }).click();
  await page
    .getByRole("button", { name: "02 · Ritorno al banco", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Usa codice demo", exact: true })
    .click();
  await page.getByLabel("Confermo la corrispondenza").check();
  await page.getByLabel("Contesto immobile / contratto").selectOption("alfa");
  await page
    .getByRole("button", { name: "Apri visita circoscritta", exact: true })
    .click();
  await check("pf02");
  await page
    .getByRole("button", { name: "Cerca nello storico", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Leggi tecnico", exact: true })
    .click();
  await page
    .getByLabel("Destinatario della condivisione")
    .selectOption("person-alfa");
  await page
    .getByRole("button", { name: "Condividi sul riepilogo simulato" })
    .click();
  await check("pf05");
  await page
    .getByRole("button", { name: "03 / 04 / 06 · Esplora", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Genera nuova versione da template" })
    .click();
  await check("estensioni");
  if ([390, 1440].includes(width))
    for (const scenario of [
      "incomplete",
      "revoked",
      "ended",
      "other",
      "reader",
      "service",
    ]) {
      await page.getByLabel("Scenario deterministico").selectOption(scenario);
      if (["revoked", "reader", "other"].includes(scenario)) {
        await page
          .getByRole("button", { name: "02 · Ritorno al banco", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Presenta card simulata", exact: true })
          .click();
      }
      await check(scenario, ["revoked", "other", "service"].includes(scenario));
    }
  await context.close();
}
await browser.close();
writeFileSync(
  "docs/design/verifiche-demo-0.4.json",
  JSON.stringify(report, null, 2),
);
const bad = report.checks.filter(
  (r) =>
    r.overflow ||
    r.violations.length ||
    r.errors.length ||
    r.externalRequests.length,
);
console.log(
  `${report.checks.length} viste controllate, ${bad.length} con anomalie.`,
);
if (bad.length) {
  console.log(JSON.stringify(bad));
  process.exitCode = 1;
}
