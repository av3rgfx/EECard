import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const browser = await chromium.launch();
const supports = [
  "http://127.0.0.1:5175/app/#/prova",
  `${pathToFileURL(resolve("docs/design/anteprima.html"))}#/prova`,
];
const results = [];
for (const support of supports) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  const errors = [],
    externalRequests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (
      /^https?:/.test(r.url()) &&
      !r.url().startsWith("http://127.0.0.1:5175/")
    )
      externalRequests.push(r.url());
  });
  await page.goto(support);
  await page.getByRole("heading", { name: /Una pratica/ }).waitFor();
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
  await page.getByRole("button", { name: "Apri visita circoscritta" }).click();
  await page
    .getByRole("button", { name: "Cerca nello storico", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Leggi tecnico", exact: true })
    .click();
  const version = await page
    .getByLabel("Versione", { exact: true })
    .inputValue();
  await page.getByRole("button", { name: "Chiudi visita e riepilogo" }).click();
  const closed = (
    await page
      .getByRole("region", { name: "Secondo schermo simulato" })
      .innerText()
  ).includes("Schermo neutro");
  results.push({ support, version, closed, errors, externalRequests });
  await context.close();
}
await browser.close();
writeFileSync(
  "docs/design/verifiche-statiche-demo-0.4.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results));
if (
  results.some(
    (r) =>
      r.version !== "2" ||
      !r.closed ||
      r.errors.length ||
      r.externalRequests.length,
  )
)
  process.exitCode = 1;
