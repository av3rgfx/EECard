import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialState } from "../src/demo/model";
import {
  initialBills,
  beginBillImport,
  readBillSource,
  importBill,
} from "../src/workspace/bills";
import { paymentGate, simulatePayment } from "../src/proposal/payment";

const customer = () => {
  const s = initialState("reader");
  s.actor = "person-alfa";
  return s;
};
async function open(page: Page) {
  await page.goto("/#/casa/home");
}
async function scenario(page: Page, name: string) {
  await page.getByRole("button", { name: "Proposta · simulazione" }).click();
  await page.getByLabel("Scenario di confronto").selectOption(name);
  await page.getByRole("button", { name: "Proposta · simulazione" }).click();
}
async function confirm(page: Page, outcome = "accepted") {
  await page
    .getByRole("button", { name: "Verifica e paga", exact: true })
    .first()
    .click();
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Continua al pagamento simulato" })
    .click();
  await page
    .getByText("Esplora un esito della simulazione", { exact: true })
    .click();
  await page.getByLabel("Esito da mostrare").selectOption(outcome);
  await page.getByRole("button", { name: /Conferma simulazione/ }).click();
}
test("proposta: policy pagamento, revoca, rettifica, duplicati e ledger intatto", () => {
  const s = customer(),
    bills = initialBills(),
    before = structuredClone({ s, bills });
  expect(
    simulatePayment(
      s,
      bills,
      "casa-alfa",
      "bolletta-alfa",
      1,
      [],
      false,
      "accepted",
    ).error,
  ).toBeTruthy();
  const first = simulatePayment(
    s,
    bills,
    "casa-alfa",
    "bolletta-alfa",
    1,
    [],
    true,
    "unknown",
  );
  expect(first.error).toBeNull();
  expect(
    simulatePayment(
      s,
      bills,
      "casa-alfa",
      "bolletta-alfa",
      1,
      first.attempts,
      true,
      "accepted",
    ).error,
  ).toContain("Non ripetere");
  for (const denied of [
    { ...s, actor: "owner-alfa" },
    { ...s, actor: "tech-alfa" },
    { ...s, agency: "beta" },
    { ...s, operatorAuthenticated: false },
    { ...s, serviceAvailable: false },
    { ...s, grants: [] },
  ]) {
    expect(
      simulatePayment(
        denied,
        bills,
        "casa-alfa",
        "bolletta-alfa",
        1,
        [],
        true,
        "accepted",
      ).error,
    ).toContain("Accesso non disponibile");
  }
  const draft = beginBillImport(s, bills, "casa-alfa", "luce-ott-rettifica")!;
  draft.data = readBillSource(s, "casa-alfa", "luce-ott-rettifica")!.original;
  const revised = importBill(
    s,
    bills,
    "casa-alfa",
    draft,
    true,
    "Prova rettifica",
  ).bills;
  expect(
    paymentGate(s, revised, "casa-alfa", "bolletta-alfa", 1, []),
  ).toContain("sostituita");
  expect(
    paymentGate(s, revised, "casa-alfa", "bolletta-alfa", 2, first.attempts),
  ).toContain("Non ripetere");
  const failed = simulatePayment(
    s,
    bills,
    "casa-alfa",
    "bolletta-alfa",
    1,
    [],
    true,
    "failed",
  );
  expect(
    paymentGate(s, bills, "casa-alfa", "bolletta-alfa", 1, failed.attempts),
  ).toBeNull();
  expect({ s, bills }).toEqual(before);
});

test("proposta: pagamento completo, IN04, annullo e ritorno al riscontro", async ({
  page,
}) => {
  await open(page);
  await page
    .getByRole("button", { name: "Verifica e paga", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Continua al pagamento simulato" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Mostra avviso e originale" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Stato del pagamento ignoto",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Mostra avviso e originale" }),
  ).toBeFocused();
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Continua al pagamento simulato" })
    .click();
  await page.getByRole("button", { name: "Annulla", exact: true }).click();
  await expect(page.getByRole("checkbox")).not.toBeChecked();
  await page
    .getByRole("button", { name: "Torna ai pagamenti", exact: true })
    .click();
  await expect(
    page.getByText("Non hai ancora simulato un pagamento.", { exact: false }),
  ).toBeVisible();
  await confirm(page);
  await expect(
    page.getByRole("heading", {
      name: "Passaggio completato. Verifica in attesa.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Non emessa", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Torna ai pagamenti", exact: true })
    .last()
    .click();
  await page.getByRole("button", { name: /SIM-1/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "Passaggio completato. Verifica in attesa.",
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("eecard-workspace-v1")),
  ).toBeNull();
});

test("proposta: esito ignoto blocca un nuovo tentativo e conserva il contesto assistenza", async ({
  page,
}) => {
  await open(page);
  await confirm(page, "unknown");
  await expect(
    page.getByRole("heading", { name: "L’esito non è ancora noto." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Torna ai pagamenti", exact: true })
    .last()
    .click();
  await page
    .getByRole("button", { name: "Verifica e paga", exact: true })
    .click();
  await expect(
    page.getByText(/Esiste già un tentativo da verificare/),
  ).toBeVisible();
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Chiedi una verifica", exact: true })
    .click();
  await expect(page.getByText(/Bolletta collegata:/)).toContainText(
    "v1 · Casa Luce",
  );
});

test("proposta: errore recuperabile e assistenza completa senza invii", async ({
  page,
}) => {
  await open(page);
  await confirm(page, "failed");
  await page.getByRole("button", { name: "Ricontrolla e riprova" }).click();
  await expect(page.getByRole("checkbox")).not.toBeChecked();
  await page
    .getByRole("button", { name: "Non sono sicuro, chiedi aiuto" })
    .click();
  await page
    .getByLabel("Raccontaci cosa serve")
    .fill("Vorrei verificare il pagamento della bolletta di esempio.");
  await page.getByRole("button", { name: "Rivedi la richiesta" }).click();
  await page.getByRole("button", { name: "Modifica", exact: true }).click();
  await expect(page.getByLabel("Raccontaci cosa serve")).toHaveValue(
    /Vorrei verificare/,
  );
  await page.getByRole("button", { name: "Rivedi la richiesta" }).click();
  await page
    .getByRole("button", { name: "Conferma richiesta di esempio" })
    .click();
  await page
    .getByRole("button", { name: "Segui la richiesta", exact: true })
    .click();
  await expect(page.locator(".cp-request")).toContainText("Ricevuta");
  await expect(page.locator(".cp-request")).toContainText("Da assegnare");
});

test("proposta: domiciliazione e pagamento indicato richiedono verifica, non un nuovo pagamento", async ({
  page,
}) => {
  await open(page);
  await scenario(page, "debit");
  await page.getByRole("link", { name: "Pagamenti", exact: true }).click();
  await page
    .locator(".cp-row")
    .filter({ hasText: "Domiciliazione indicata" })
    .getByRole("button")
    .click();
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  await expect(
    page.getByText("È indicata una domiciliazione: verifica prima l’addebito."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Chiedi una verifica" }).click();
  await expect(
    page.getByText(/Per Casa Atelier la demo dispone/),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Rivedi la richiesta" }),
  ).toBeDisabled();
  await scenario(page, "paid");
  await page.getByRole("link", { name: "Pagamenti", exact: true }).click();
  await page
    .locator(".cp-row")
    .filter({ hasText: "Pagamento indicato" })
    .getByRole("button")
    .click();
  await expect(
    page.getByText(/Il documento indica un pagamento: verifica/),
  ).toBeVisible();
});

test("proposta: densità contestuale, nessuna urgenza, IN01 e diniego", async ({
  page,
}) => {
  await open(page);
  await scenario(page, "many");
  await expect(page.locator(".cp-houses.compact article")).toHaveCount(2);
  await page.locator(".cp-house-select select").selectOption("casa-alfa");
  await expect(page.locator(".cp-houses.expanded article")).toHaveCount(1);
  await page.getByRole("button", { name: "Vedi immobili" }).click();
  await expect(page.locator(".cp-houses.expanded article")).toHaveCount(1);
  await scenario(page, "calm");
  await expect(
    page.getByText("Oggi non ci sono azioni urgenti."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Segui la richiesta", exact: true })
    .click();
  await expect(page.locator(".cp-request")).toContainText("In lavorazione");
  await page.getByRole("link", { name: "Profilo", exact: true }).click();
  await page
    .getByRole("button", { name: "Gestisci abbonamento", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Disattiva rinnovo", exact: true })
    .click();
  await page.getByRole("button", { name: "Conferma disattivazione" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Rinnovo disattivato in questa visita",
  );
  await page.keyboard.press("Escape");
  await scenario(page, "denied");
  await expect(page.locator(".cp-priority")).toHaveCount(0);
  await page.getByRole("link", { name: "Pagamenti", exact: true }).click();
  await expect(
    page.getByText("Nessuna bolletta accessibile.", { exact: false }),
  ).toBeVisible();
});

for (const width of [360, 390, 1440])
  test(`proposta: layout e accessibilità a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page);
    for (const view of ["home", "payments", "assistance", "profile"]) {
      await page.goto(`/#/casa/${view}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const audit = await new AxeBuilder({ page }).analyze();
      expect(
        audit.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
    await page.goto("/#/casa/home");
    await page
      .getByRole("button", { name: "Verifica e paga", exact: true })
      .click();
    expect(
      (await new AxeBuilder({ page }).analyze()).violations.map((v) => v.id),
    ).toEqual([]);
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });

test("proposta: IN03 rettifica aggiorna il pagamento, IN04 conserva lo storico", async ({
  page,
}) => {
  await open(page);
  await page
    .getByRole("button", { name: "Paga una bolletta", exact: true })
    .click();
  await page.getByRole("button", { name: "Aggiungi / apri bollette" }).click();
  await page
    .getByRole("button", { name: "Aggiungi bolletta", exact: true })
    .click();
  await page
    .getByRole("button", { name: /Ottobre · rettifica del fornitore/ })
    .click();
  await page
    .getByLabel(/Motivo/)
    .fill("Rettifica sintetica del fornitore da confrontare.");
  await page.getByRole("button", { name: "Rivedi prima di salvare" }).click();
  await page.getByRole("button", { name: /Conferma/ }).click();
  await page
    .getByRole("button", { name: "Torna ai pagamenti", exact: true })
    .click();
  await expect(page.locator(".cp-row")).toContainText("79,00");
  await page
    .getByRole("button", { name: "Verifica e paga", exact: true })
    .click();
  await expect(page.locator(".cp-bill-summary")).toContainText(
    "VERSIONE 2 CORRENTE",
  );
  await page.getByRole("button", { name: "Mostra avviso e originale" }).click();
  await expect(page.getByRole("dialog")).toContainText("79,00");
});
