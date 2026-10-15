import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 900 },
    reducedMotion: "reduce",
  });
  const errors = [],
    requests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (/^https?:/.test(r.url())) requests.push(r.url());
  });
  await page.goto(
    `${pathToFileURL(resolve("docs/design/anteprima.html"))}#/spazio/overview`,
  );
  await page
    .getByRole("button", { name: "Strumenti della prova", exact: true })
    .click();
  await page.getByLabel("Scenario della prova").selectOption("reader");
  await page
    .getByRole("button", { name: "Vista cliente", exact: true })
    .click();
  await page.evaluate(() => {
    location.hash = "/spazio/utilities";
  });
  await page
    .getByRole("button", { name: "Aggiungi bolletta", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Novembre · importo da correggere",
      exact: false,
    })
    .click();
  await page.getByLabel("Importo", { exact: true }).fill("96,40");
  await page
    .getByLabel("Motivo della correzione", { exact: true })
    .fill("Confronto sul facsimile incluso");
  await page.getByRole("button", { name: "Rivedi prima di salvare" }).click();
  await page
    .getByRole("button", { name: "Conferma e salva nel browser" })
    .click();
  await page.getByText("96,40 €", { exact: true }).waitFor();
  await page.reload();
  await page.getByText("96,40 €", { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  assert.deepEqual(requests, []);
  const count = await page.evaluate(
    () => JSON.parse(localStorage.getItem("eecard-workspace-v1")).bills.length,
  );
  assert.equal(count, 3);
  const result = {
    support: "docs/design/anteprima.html",
    viewport: "390x900 Chromium emulato",
    importPersisted: true,
    billCount: count,
    javascriptErrors: errors,
    externalRequests: requests,
  };
  writeFileSync(
    "docs/progetto/importazione-bollette-2026-10-15/portable-check.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result));
} finally {
  await browser.close();
}
