import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function start(page: Page) {
  await page.goto("/#/laboratorio");
}
async function activate(page: Page) {
  for (const name of [
    "Conferma fonte A",
    "Aggiungi facsimile locale",
    "Verifica rapporto simulato",
    "Prepara inviti simulati",
    "Simula accettazione e attivazione",
  ])
    await page.getByRole("button", { name, exact: true }).click();
}
async function desk(page: Page) {
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
  await page
    .getByRole("button", { name: "Cerca nello storico", exact: true })
    .click();
}
test("storia continua, ricerca, versioni, condivisione, export e reset", async ({
  page,
}) => {
  await start(page);
  await activate(page);
  await desk(page);
  await page.getByLabel("Anno da", { exact: true }).fill("2019");
  await page.getByLabel("Anno a", { exact: true }).fill("2019");
  await expect(
    page.getByText("1 risultati autorizzati", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Leggi tecnico", exact: true })
    .click();
  await page.getByLabel("Versione", { exact: true }).selectOption("1");
  await expect(
    page.getByText(
      "Relazione sintetica: anno stimato 2019. Fonte da confrontare.",
      { exact: true },
    ),
  ).toBeVisible();
  await page.getByLabel("Versione", { exact: true }).selectOption("2");
  await page
    .getByLabel("Destinatario della condivisione")
    .selectOption("person-alfa");
  await page
    .getByRole("button", { name: "Condividi sul riepilogo simulato" })
    .click();
  await expect(
    page.getByRole("region", { name: "Secondo schermo simulato" }),
  ).toContainText("recupero autorizzato");
  const dl = page.waitForEvent("download");
  await page.getByRole("button", { name: "Esporta facsimile locale" }).click();
  expect((await dl).suggestedFilename()).toContain("facsimile");
  await page.getByRole("button", { name: "Chiudi visita e riepilogo" }).click();
  await expect(
    page.getByRole("region", { name: "Secondo schermo simulato" }),
  ).toContainText("Schermo neutro");
  await expect(page.getByRole("button", { name: "Leggi tecnico" })).toHaveCount(
    0,
  );
  await page
    .getByLabel("Note anonime della prova")
    .fill("Blocco sintetico per test");
  await page
    .getByRole("button", { name: "Ripristina scenario", exact: true })
    .click();
  await expect(page.getByLabel("Note anonime della prova")).toHaveValue("");
  await expect(
    page.getByText("0/3 momenti completati", { exact: true }),
  ).toBeVisible();
});
test("ricarica conserva pratica e note ma richiede nuova visita", async ({
  page,
}) => {
  await start(page);
  await activate(page);
  await desk(page);
  await page
    .getByLabel("Note anonime della prova")
    .fill("Nota anonima sintetica");
  await page.reload();
  await expect(page.getByLabel("Note anonime della prova")).toHaveValue(
    "Nota anonima sintetica",
  );
  await expect(
    page.getByText("Visita chiusa o non confermata.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "01 · Attivazione", exact: true })
    .click();
  await expect(
    page.getByText("Collegato (simulato)", { exact: true }),
  ).toBeVisible();
});
test("card revocata, lettore e servizio con recupero; isolamento Beta", async ({
  page,
}) => {
  await start(page);
  await page.getByLabel("Scenario deterministico").selectOption("revoked");
  await page
    .getByRole("button", { name: "02 · Ritorno al banco", exact: true })
    .click();
  await page.getByRole("button", { name: "Presenta card simulata" }).click();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "Credenziale non utilizzabile" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Verifica assistita simulata" })
    .click();
  await expect(
    page.getByText("Persona selezionata: Persona Alfa 01", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Scenario deterministico").selectOption("reader");
  await page
    .getByRole("button", { name: "02 · Ritorno al banco", exact: true })
    .click();
  await page.getByRole("button", { name: "Presenta card simulata" }).click();
  await page.getByRole("button", { name: "Riprova lettore demo" }).click();
  await page.getByRole("button", { name: "Presenta card simulata" }).click();
  await expect(
    page.getByText("Persona selezionata: Persona Alfa 01", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Scenario deterministico").selectOption("service");
  await expect(
    page.getByRole("button", { name: "Conferma fonte A" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Riprova servizio demo" }).click();
  await expect(
    page.getByRole("button", { name: "Conferma fonte A" }),
  ).toHaveCount(0); // preactivated: retry correction instead
  await page.getByLabel("Scenario deterministico").selectOption("other");
  await page
    .getByRole("button", { name: "Leggi facsimile del contesto" })
    .click();
  await expect(
    page.getByText("Contratto sintetico Beta. Archivio isolato.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Pratica non disponibile nel contesto corrente.", {
      exact: false,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "02 · Ritorno al banco", exact: true })
    .click();
  await page.getByRole("button", { name: "Usa codice demo" }).click();
  await expect(
    page.getByText("Persona selezionata: Persona Alfa 01", { exact: true }),
  ).toHaveCount(0);
});
test("estensioni: bollette private, incarico, bozza e titolo dopo fine rapporto", async ({
  page,
}) => {
  await start(page);
  await page.getByLabel("Scenario deterministico").selectOption("ended");
  await page
    .getByRole("button", { name: "03 / 04 / 06 · Esplora", exact: true })
    .click();
  await expect(
    page.getByText("Energia · casa propria facsimile", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Destinatario da esplorare").selectOption("owner-alfa");
  await page.getByLabel("Casa", { exact: true }).selectOption("casa-alfa");
  await expect(
    page.getByText("Accesso negato: nessuna bolletta", { exact: false }),
  ).toBeVisible();
  await page
    .getByLabel("Destinatario da esplorare")
    .selectOption("person-alfa");
  await expect(
    page.getByText("Documenti leggibili da Persona Alfa 01:", { exact: false }),
  ).toContainText("relazione storica");
  await page
    .getByRole("button", { name: "Genera nuova versione da template" })
    .click();
  await page
    .getByRole("button", { name: "Registra revisione umana simulata" })
    .click();
  await expect(
    page.getByText("Revisione: revisionata da operatore demo", {
      exact: false,
    }),
  ).toBeVisible();
});
for (const width of [360, 390, 1280, 1440])
  test(`layout ${width}, tastiera, axe e movimento ridotto`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await start(page);
    await activate(page);
    await desk(page);
    await page
      .getByRole("button", { name: "Leggi tecnico", exact: true })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(r.violations).toEqual([]);
    await page
      .getByRole("button", { name: "02 · Ritorno al banco", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#demo-phase-title")).toBeFocused();
    expect(
      await page
        .locator(".functional-demo")
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
  });

test("percorso da tastiera e memoria locale non disponibile", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get: () => {
        throw new Error("Memoria di prova non disponibile");
      },
    });
  });
  await start(page);
  await expect(
    page.getByText("Memoria locale indisponibile:", { exact: false }),
  ).toBeVisible();
  async function enter(name: string) {
    await page.getByRole("button", { name, exact: true }).focus();
    await page.keyboard.press("Enter");
  }
  for (const name of [
    "Conferma fonte A",
    "Aggiungi facsimile locale",
    "Verifica rapporto simulato",
    "Prepara inviti simulati",
    "Simula accettazione e attivazione",
    "02 · Ritorno al banco",
    "Usa codice demo",
  ])
    await enter(name);
  await page.getByLabel("Confermo la corrispondenza").focus();
  await page.keyboard.press("Space");
  await page.getByLabel("Contesto immobile / contratto").focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await enter("Apri visita circoscritta");
  await enter("Cerca nello storico");
  await enter("Leggi tecnico");
  await expect(page.getByLabel("Versione", { exact: true })).toBeVisible();
  await enter("Chiudi visita e riepilogo");
  await expect(
    page.getByRole("region", { name: "Secondo schermo simulato" }),
  ).toContainText("Schermo neutro");
});
