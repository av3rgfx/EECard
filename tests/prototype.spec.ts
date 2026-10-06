import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const role = async (page: any, value: string) =>
  page.getByLabel("Ruolo demo", { exact: true }).selectOption(value);
const navigate = async (page: any, path: string) => page.goto(`/#/${path}`);
test("condivisione documento, permessi e revoca", async ({ page }) => {
  await navigate(page, "documenti");
  await page
    .getByRole("button", { name: /Contratto di locazione Contratti/ })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Condividi", exact: true }).click();
  await page.getByLabel("Destinatario").selectOption("Sofia Bianchi");
  await page
    .getByRole("button", { name: "Conferma condivisione demo" })
    .click();
  await expect(
    dialog.getByText("Sola lettura · 7 giorni · Attiva"),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Revoca", exact: true }).click();
  await expect(
    dialog.getByText("Sola lettura · 7 giorni · Revocata"),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await role(page, "inquilino");
  await navigate(page, "documenti");
  await expect(
    page.getByRole("button", { name: /Planimetria catastale/ }),
  ).toHaveCount(0);
});
test("bonifico: caricamento, dichiarazione, verifica e quietanza separati", async ({
  page,
}) => {
  await navigate(page, "home");
  await role(page, "inquilino");
  await navigate(page, "affitto");
  await page
    .getByRole("button", { name: "Aggiungi prova di bonifico" })
    .click();
  await page.getByRole("button", { name: "Usa allegato dimostrativo" }).click();
  await page.getByRole("button", { name: "Carica prova demo" }).click();
  await expect(
    page.getByRole("dialog").getByText("Documento caricato", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Dichiara pagamento", exact: true })
    .click();
  await expect(
    page.getByRole("dialog").getByText("Pagamento dichiarato", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Conferma incasso verificato" }),
  ).toHaveCount(0);
  await page.keyboard.press("Escape");
  await role(page, "agenzia");
  await page.getByRole("button", { name: "Incassi", exact: true }).click();
  await page.getByRole("button", { name: /Casa Tortona · Ottobre/ }).click();
  await page
    .getByLabel("Fonte di verifica")
    .fill("Estratto conto demo, movimento DEMO-104");
  await page
    .getByRole("button", { name: "Conferma incasso verificato" })
    .click();
  await expect(
    page.getByRole("dialog").getByText("Incasso verificato", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("dialog").getByText(/Q-DEMO-P1/)).toHaveCount(0);
  await page.getByRole("button", { name: "Genera quietanza demo" }).click();
  await expect(page.getByRole("dialog").getByText(/Q-DEMO-P1/)).toBeVisible();
  await page.reload();
  await expect(page.getByText("Incassi da verificare")).toBeVisible();
});
test("richiesta con errore recuperabile, assegnazione, tecnico e conclusione", async ({
  page,
}) => {
  await navigate(page, "home");
  await role(page, "inquilino");
  await navigate(page, "assistenza");
  await page.getByRole("button", { name: "Nuova richiesta" }).click();
  await page
    .getByLabel("In poche parole")
    .fill("Perdita dal lavandino del bagno");
  await page
    .getByLabel("Descrivi il problema")
    .fill(
      "Da questa mattina il rubinetto perde alla base. Nessun pericolo immediato.",
    );
  await page.getByRole("button", { name: "Usa allegato dimostrativo" }).click();
  await page.getByLabel("Simula errore di invio").check();
  await page.getByRole("button", { name: "Invia richiesta demo" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Invio non riuscito" }),
  ).toBeVisible();
  await expect(page.getByLabel("In poche parole")).toHaveValue(
    "Perdita dal lavandino del bagno",
  );
  await page.getByLabel("Simula errore di invio").uncheck();
  await page.getByRole("button", { name: "Invia richiesta demo" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await role(page, "agenzia");
  await page
    .getByRole("button", { name: /Perdita dal lavandino del bagno/ })
    .click();
  await page.getByRole("button", { name: "Assegna incarico demo" }).click();
  await expect(
    page.getByRole("dialog").getByText("Assegnata", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await role(page, "tecnico");
  await page
    .getByRole("button", { name: /Perdita dal lavandino del bagno/ })
    .click();
  await page
    .getByRole("button", { name: "Simula accettazione del tecnico" })
    .click();
  await page.getByRole("button", { name: "Concludi intervento demo" }).click();
  await expect(
    page.getByRole("dialog").getByText("Conclusa", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await navigate(page, "affitto");
  await expect(
    page.getByText("Questo spazio non fa parte dell’incarico"),
  ).toBeVisible();
});
test("blocco persistente e sostituzione senza riattivare la vecchia card", async ({
  page,
}) => {
  await navigate(page, "card");
  await page.getByRole("button", { name: /Blocca la card/ }).click();
  await page.getByRole("button", { name: "Conferma blocco" }).click();
  await expect(
    page.getByRole("button", { name: /Card bloccata/ }),
  ).toBeDisabled();
  await page.reload();
  await expect(
    page.getByRole("button", { name: /Card bloccata/ }),
  ).toBeDisabled();
  await page.getByRole("button", { name: /Sostituisci la card/ }).click();
  await page
    .getByRole("button", { name: "Genera card sostitutiva demo" })
    .click();
  await expect(
    page.getByText("Credenziali precedenti revocate: EE · 2048"),
  ).toBeVisible();
  await expect(page.locator(".card-id")).toContainText("2049");
});
test("invito scaduto, OTP errato e attivazione simulata", async ({ page }) => {
  await navigate(page, "accesso");
  await page.getByRole("button", { name: "Simula invito scaduto" }).click();
  await expect(page.getByRole("alert")).toContainText("invito è scaduto");
  await page.getByRole("button", { name: "Continua con l’invito" }).click();
  await page.getByLabel("Codice di verifica").fill("999999");
  await page.getByRole("button", { name: "Verifica codice" }).click();
  await expect(page.getByRole("alert")).toContainText("non corrisponde");
  await page.getByLabel("Codice di verifica").fill("123456");
  await page.getByRole("button", { name: "Verifica codice" }).click();
  await page.getByRole("button", { name: "Entra nella demo" }).click();
  await expect(
    page.getByRole("heading", { name: "Bentornata, Sofia." }),
  ).toBeVisible();
});
test("file non valido rifiutato, senza stato di successo", async ({ page }) => {
  await navigate(page, "affitto");
  await page
    .getByRole("button", { name: "Aggiungi prova di bonifico" })
    .click();
  await page.getByLabel("Prova di bonifico", { exact: true }).setInputFiles({
    name: "eseguibile.exe",
    mimeType: "application/octet-stream",
    buffer: Buffer.from("demo"),
  });
  await expect(page.getByRole("alert")).toContainText("Scegli un PDF");
  await page.getByRole("button", { name: "Carica prova demo" }).click();
  await expect(
    page.getByRole("dialog").getByText("In scadenza", { exact: true }),
  ).toBeVisible();
});
for (const width of [360, 390, 1280, 1440])
  test(`layout ${width}, schermate e accessibilità`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of [
      "home",
      "immobili",
      "documenti",
      "affitto",
      "utenze",
      "assistenza",
      "consulenze",
      "card",
      "profilo",
      "accesso",
      "design-system",
    ]) {
      await navigate(page, route);
      await expect(page.locator("h1").first()).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        route,
      ).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
test("focus confinato, Escape, ritorno al controllo e movimento ridotto", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await navigate(page, "card");
  const button = page.getByRole("button", { name: /Blocca la card/ });
  await button.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBeTruthy();
  }
  await expect(dialog).toHaveCSS("transform", "none");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(button).toBeFocused();
});
test("stress 320px, liste 0/1/1284, dati lunghi e testo al 200%", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const scenario of ["worst", "empty", "one", "many"])
    for (const route of ["home", "documenti", "card"]) {
      await page.goto(`/?data=${scenario}#/${route}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${scenario}/${route}`,
      ).toBeTruthy();
    }
  await page.goto("/?data=many#/documenti");
  await expect(page.locator(".document-row")).toHaveCount(10);
  await page.getByRole("button", { name: "Successivi" }).click();
  await expect(page.getByText("Pagina 2 di 129")).toBeVisible();
  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto("/?data=worst#/home");
  await page.addStyleTag({ content: "html {font-size: 200% !important}" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
});
test("revoca nasconde contenuti, fine contratto limita azioni e errore riprovabile", async ({
  page,
}) => {
  await page.goto("/?data=revoked#/documenti");
  await expect(
    page.getByRole("heading", { name: "Accesso revocato" }),
  ).toBeVisible();
  await expect(page.locator(".document-row")).toHaveCount(0);
  await page.goto("/?data=ended#/assistenza");
  await expect(
    page.getByRole("button", { name: "Nuova richiesta" }),
  ).toBeDisabled();
  await page.goto("/?data=error#/home");
  await page.getByRole("button", { name: "Riprova" }).click();
  await expect(
    page.getByRole("heading", { name: "Bentornato, Alessandro." }),
  ).toBeVisible();
});
test("mobile: documento, pannello scrollabile e controllo formale agenzia", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await navigate(page, "documenti");
  await page
    .getByRole("button", { name: /Contratto di locazione Contratti/ })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Condividi", exact: true }).click();
  await page.getByLabel("Destinatario").selectOption("Sofia Bianchi");
  await page.setViewportSize({ width: 390, height: 450 });
  await page
    .getByRole("button", { name: "Conferma condivisione demo" })
    .click();
  await expect(
    page.getByText("Sola lettura · 7 giorni · Attiva"),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    audit.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "Chiudi pannello" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await role(page, "agenzia");
  await page.getByRole("button", { name: "Documenti", exact: true }).click();
  await page.getByRole("button", { name: /Planimetria catastale/ }).click();
  await page
    .getByRole("button", { name: "Segna controllo formale demo" })
    .click();
  await expect(
    page.getByRole("dialog").getByText("Controllato", { exact: true }),
  ).toBeVisible();
});
test("incasso parziale mantiene il residuo e non chiude la rata", async ({
  page,
}) => {
  await navigate(page, "affitto");
  await page
    .getByRole("button", { name: "Aggiungi prova di bonifico" })
    .click();
  await page.getByRole("button", { name: "Usa allegato dimostrativo" }).click();
  await page.getByRole("button", { name: "Carica prova demo" }).click();
  await page.getByLabel("Importo dichiarato (€)").fill("400");
  await page
    .getByRole("button", { name: "Dichiara pagamento", exact: true })
    .click();
  await page
    .getByLabel("Fonte di verifica")
    .fill("Movimento parziale dimostrativo 001");
  await page
    .getByRole("button", { name: "Conferma incasso verificato" })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "Incasso parziale: residuo 550,00",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByText("Incasso parziale verificato")).toBeVisible();
  await navigate(page, "home");
  await expect(
    page.locator(".summary-stats>div").nth(1).locator("strong"),
  ).toContainText("01");
});

test("il salto al contenuto conserva pagina e filtri, anche al reload", async ({
  page,
}) => {
  await navigate(page, "documenti");
  await page.getByLabel("Cerca documenti").fill("contratto");
  const skip = page.getByRole("link", { name: "Vai al contenuto" });
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect(page).toHaveURL(/#\/documenti$/);
  await expect(page.getByLabel("Cerca documenti")).toHaveValue("contratto");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tutto al suo posto.",
  );
});

test("ricerca mobile e orientamento nelle sezioni del menu Altro", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await navigate(page, "documenti");
  await page.getByLabel("Cerca documenti").fill("nessunrisultato");
  const clear = page.getByRole("button", { name: "Cancella ricerca" });
  const box = await clear.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await clear.click();
  await expect(page.getByLabel("Cerca documenti")).toBeFocused();
  await expect(page.getByLabel("Cerca documenti")).toHaveValue("");
  await navigate(page, "affitto");
  const more = page.getByRole("button", { name: "Altro, apri menu" });
  await expect(more).toHaveAttribute("aria-current", "true");
  await expect(more).toHaveAttribute("aria-expanded", "false");
  await more.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  // Base UI makes background controls inert while the modal is open.
  await expect(
    page.locator('button[aria-label="Altro, apri menu"]'),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(more).toBeFocused();
  await expect(more).toHaveAttribute("aria-expanded", "false");
});

test("tessera: intestatario e identificativo restano dentro i margini", async ({
  page,
}) => {
  for (const width of [320, 390, 900, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/?data=worst#/card");
    await page.locator(".card-bottom strong").waitFor();
    const bounds = await page.locator(".digital-card").evaluate((card) => {
      const rect = card.getBoundingClientRect();
      const css = getComputedStyle(card);
      const name = card
        .querySelector(".card-bottom strong")!
        .getBoundingClientRect();
      const id = card.querySelector(".card-id")!.getBoundingClientRect();
      return {
        left: rect.left + parseFloat(css.paddingLeft),
        right: rect.right - parseFloat(css.paddingRight),
        nameLeft: name.left,
        nameRight: name.right,
        idLeft: id.left,
        idRight: id.right,
      };
    });
    expect(bounds.nameLeft).toBeGreaterThanOrEqual(bounds.left - 1);
    expect(bounds.idRight).toBeLessThanOrEqual(bounds.right + 1);
    expect(bounds.nameRight).toBeLessThanOrEqual(bounds.idLeft);
  }
});
