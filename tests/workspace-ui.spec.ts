import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialState } from "../src/demo/model";
async function seed(
  page: Page,
  scenario:
    "success" | "ended" | "revoked" | "reader" | "service" | "other" = "ended",
) {
  await page.addInitScript((s) => {
    if (!localStorage.getItem("eecard-functional-v4"))
      localStorage.setItem("eecard-functional-v4", JSON.stringify(s));
  }, initialState(scenario));
}
async function start(page: Page) {
  await page.goto("/#/spazio/overview");
}
async function navigate(page: Page, view: string) {
  await page.goto(`/#/spazio/${view}`);
}
async function prepare(page: Page) {
  await page
    .getByRole("button", { name: "Completa la pratica", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Controlla la data", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Conferma la data del contratto",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Continua ai documenti", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Aggiungi documento", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Collega documento di esempio", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Verifica e continua", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Prepara gli accessi", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Attiva accesso di esempio", exact: true })
    .click();
}
async function desk(page: Page) {
  await page
    .getByRole("button", { name: "Accogli al banco", exact: true })
    .last()
    .click();
  await page
    .getByRole("button", { name: "Presenta tessera di esempio", exact: true })
    .click();
  await page.getByLabel("Ho verificato la persona presente").check();
  await page
    .getByLabel("Casa e contratto", { exact: true })
    .selectOption("alfa");
  await page
    .getByRole("button", { name: "Conferma e apri il fascicolo", exact: true })
    .click();
}
test("ingressi esistenti aprono il prodotto e i controlli tecnici sono nei dettagli", async ({
  page,
}) => {
  for (const path of ["/", "/#/prova"]) {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { name: "La giornata, sotto controllo." }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Completa la pratica", exact: true }),
    ).toBeVisible();
    await expect(page.getByLabel("Scenario della prova")).toHaveCount(0);
    await expect(page.getByLabel("Ruolo demo", { exact: true })).toHaveCount(0);
  }
});
test("pratica guidata, banco, storico, versioni e riepilogo svuotato alla chiusura", async ({
  page,
}) => {
  await start(page);
  await prepare(page);
  await expect(
    page.getByRole("heading", { name: "La pratica è pronta." }),
  ).toBeVisible();
  await desk(page);
  await page.getByRole("button", { name: "Periodo", exact: true }).click();
  await page.getByLabel("Anno da", { exact: true }).fill("2019");
  await page.getByLabel("Anno a", { exact: true }).fill("2019");
  await expect(
    page.getByRole("button", { name: /Impianto elettrico/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Impianto elettrico/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByLabel("Versione del documento", { exact: true })
    .selectOption("1");
  await expect(
    dialog.getByText("Relazione sintetica: anno stimato 2019.", {
      exact: false,
    }),
  ).toBeVisible();
  await dialog
    .getByLabel("Versione del documento", { exact: true })
    .selectOption("2");
  await dialog
    .getByRole("button", { name: "Fonti e revisioni", exact: true })
    .click();
  await expect(
    dialog.getByText("Data originale", { exact: true }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "Mostra al cliente", exact: true })
    .click();
  await dialog
    .getByLabel("Destinatario del riepilogo")
    .selectOption("person-alfa");
  await dialog
    .getByRole("button", { name: "Conferma selezione", exact: true })
    .click();
  await expect(page.locator(".ws-client-screen")).toContainText(
    "Una selezione condivisa",
  );
  await page
    .getByRole("button", { name: "Termina incontro", exact: true })
    .click();
  await expect(page.locator(".ws-visit-bar")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Presenta tessera di esempio" }),
  ).toBeVisible();
});
test("vista personale, utenze per casa e proprietario escluso da bollette private", async ({
  page,
}) => {
  await seed(page);
  await start(page);
  await page
    .getByRole("button", { name: "Vista cliente", exact: true })
    .click();
  await expect(page.locator(".ws-card-bottom")).toContainText("Cliente 01");
  await navigate(page, "utilities");
  await expect(page.getByText("84,00 €", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Casa Atelier Casa propria/ }).click();
  await expect(page.getByText("61,00 €", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Strumenti della demo", exact: true })
    .click();
  await page.getByLabel("Attore e contesto").selectOption("owner-alfa");
  await navigate(page, "utilities");
  await expect(
    page.getByText("Nessuna bolletta disponibile", { exact: true }),
  ).toBeVisible();
});
test("richiesta locale cliente verso agenzia e persistenza", async ({
  page,
}) => {
  await seed(page, "reader");
  await start(page);
  await page
    .getByRole("button", { name: "Vista cliente", exact: true })
    .click();
  await navigate(page, "support");
  await page
    .getByRole("button", { name: "Nuova richiesta", exact: true })
    .click();
  await page.getByLabel("Qual è il problema?").fill("Rubinetto di esempio");
  await page
    .getByLabel("Descrivilo brevemente")
    .fill("Perdita sintetica, nessun recapito reale.");
  await page
    .getByRole("button", { name: "Salva richiesta di esempio", exact: true })
    .click();
  await expect(page.locator(".ws-support-row")).toContainText("Ricevuta");
  await page.reload();
  await expect(page.locator(".ws-support-row")).toContainText(
    "Rubinetto di esempio",
  );
  await page
    .getByRole("button", { name: "Vista agenzia", exact: true })
    .click();
  await navigate(page, "support");
  await page
    .getByRole("button", { name: "Prendi in carico", exact: true })
    .click();
  await expect(page.locator(".ws-support-row")).toContainText("In lavorazione");
});
test("dichiarazione, verifica e quietanza parziale restano distinti", async ({
  page,
}) => {
  await seed(page, "reader");
  await start(page);
  await page
    .getByRole("button", { name: "Vista cliente", exact: true })
    .click();
  await navigate(page, "rent");
  await page
    .getByRole("button", { name: "Collega evidenza di esempio", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Dichiara un pagamento", exact: true })
    .click();
  await page.getByLabel("Importo dichiarato (€)").fill("900");
  await page
    .getByRole("button", { name: "Registra evento di esempio" })
    .click();
  await expect(
    page.locator(".ws-rent-summary").getByText("900,00 €", { exact: true }),
  ).toHaveCount(2);
  await page
    .getByRole("button", { name: "Vista agenzia", exact: true })
    .click();
  await navigate(page, "rent");
  await page
    .getByRole("button", { name: "Registra riscontro di esempio", exact: true })
    .click();
  await page.getByLabel("Importo verificato (€)").fill("400");
  await page
    .getByLabel("Fonte del riscontro sintetico")
    .fill("Registro facsimile");
  await page
    .getByRole("button", { name: "Registra evento di esempio" })
    .click();
  await page
    .getByRole("button", { name: "Prepara quietanza facsimile" })
    .click();
  await expect(page.locator(".ws-rent-summary")).toContainText("500,00 €");
  await expect(page.locator(".ws-payment-flow")).toContainText(
    "Facsimile preparato",
  );
});
test("revoca card, fallback assistito e reset dal pannello prova", async ({
  page,
}) => {
  await seed(page, "revoked");
  await start(page);
  await page
    .getByRole("button", { name: "Accogli al banco", exact: true })
    .first()
    .click();
  await page
    .getByRole("button", { name: "Presenta tessera di esempio", exact: true })
    .click();
  await expect(
    page.getByLabel("Ho verificato la persona presente"),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Verifica assistita di esempio", exact: true })
    .click();
  await expect(
    page.getByLabel("Ho verificato la persona presente"),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Strumenti della demo", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Ripristina scenario", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "La giornata, sotto controllo." }),
  ).toBeVisible();
  await expect(page.locator(".ws-visit-bar")).toHaveCount(0);
});
for (const width of [360, 390, 1280, 1440])
  test(`layout ${width}, contrasto, tastiera e movimento ridotto`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await start(page);
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
      .getByRole("button", { name: "Completa la pratica", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("heading", { name: "Un buon inizio, per tutti." }),
    ).toBeFocused();
    await page
      .getByRole("button", { name: "Controlla la data", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Controlla la data", exact: true }),
    ).toBeFocused();
  });
test("navigazione mobile con focus confinato ed Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await start(page);
  await page
    .getByRole("button", { name: "Apri navigazione", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 10; i++) await page.keyboard.press("Tab");
  expect(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Apri navigazione", exact: true }),
  ).toBeFocused();
});

test("attivazione completa a 360 px senza sovrapposizioni della barra inferiore", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await start(page);
  await prepare(page);
  await expect(
    page.getByRole("heading", { name: "La pratica è pronta." }),
  ).toBeVisible();
});

test("ricerca globale indipendente dai filtri della libreria", async ({
  page,
}) => {
  await start(page);
  await navigate(page, "documents");
  await page.getByRole("button", { name: "Periodo", exact: true }).click();
  await page.getByLabel("Anno da", { exact: true }).fill("2019");
  await page.getByLabel("Anno a", { exact: true }).fill("2019");
  await page
    .getByRole("button", { name: "Cerca nella piattaforma", exact: true })
    .click();
  await page.getByLabel("Ricerca rapida", { exact: true }).fill("contratto");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Contratto di locazione/ })
    .click();
  await expect(page.locator(".ws-paper")).toContainText("Locazione sintetica");
});

test("anche panoramica e intestazioni rispettano il contesto Beta", async ({
  page,
}) => {
  await seed(page, "other");
  await start(page);
  await expect(page.locator("main")).not.toContainText("Casa Luce");
  await expect(page.locator("main")).not.toContainText("Cliente 01");
  await expect(page.getByText("Contesto Beta", { exact: true })).toBeVisible();
  await navigate(page, "practice");
  await expect(page.locator("main")).not.toContainText("CASA LUCE");
  await navigate(page, "rent");
  await expect(page.locator("main")).not.toContainText("CASA LUCE");
  await expect(page.locator(".ws-rent-summary")).toHaveCount(0);
});
