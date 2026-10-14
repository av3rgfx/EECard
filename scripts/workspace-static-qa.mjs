import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const supports = [
  "http://127.0.0.1:5175/",
  "http://127.0.0.1:5175/app/#/prova",
  `${pathToFileURL(resolve("docs/design/anteprima.html"))}#/spazio/overview`,
];
const b = await chromium.launch();
const results = [];
for (const support of supports) {
  const c = await b.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const p = await c.newPage();
  const errors = [],
    externalRequests = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("request", (r) => {
    if (
      /^https?:/.test(r.url()) &&
      !r.url().startsWith("http://127.0.0.1:5175/")
    )
      externalRequests.push(r.url());
  });
  const click = async (name) =>
    p.getByRole("button", { name, exact: true }).click();
  await p.goto(support);
  await p
    .getByRole("heading", { name: "La giornata, sotto controllo." })
    .waitFor();
  for (const name of [
    "Completa la pratica",
    "Controlla la data",
    "Conferma la data del contratto",
    "Continua ai documenti",
    "Aggiungi documento",
    "Collega documento di esempio",
    "Verifica e continua",
    "Prepara gli accessi",
    "Attiva accesso di esempio",
  ])
    await click(name);
  await p
    .getByRole("button", { name: "Accogli al banco", exact: true })
    .last()
    .click();
  await click("Presenta tessera di esempio");
  await p.getByLabel("Ho verificato la persona presente").check();
  await p.getByLabel("Casa e contratto", { exact: true }).selectOption("alfa");
  await click("Conferma e apri il fascicolo");
  await p.getByRole("button", { name: /Impianto elettrico/ }).click();
  const version = await p
    .getByLabel("Versione del documento", { exact: true })
    .inputValue();
  await p.keyboard.press("Escape");
  await click("Termina incontro");
  const closed = (await p.locator(".ws-visit-bar").count()) === 0;
  await click("Vista cliente");
  const personal = await p.locator(".ws-card-bottom").innerText();
  results.push({
    support,
    version,
    closed,
    personal: personal.includes("Cliente 01"),
    errors,
    externalRequests,
  });
  await c.close();
}
await b.close();
writeFileSync(
  "docs/design/verifiche-statiche-experience-0.5.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results));
if (
  results.some(
    (r) =>
      r.version !== "2" ||
      !r.closed ||
      !r.personal ||
      r.errors.length ||
      r.externalRequests.length,
  )
)
  process.exitCode = 1;
