import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialState, execute } from "../src/demo/model";
import { emptyWorkspace, readWorkspace } from "../src/workspace/service";
import {
  availableBillSources,
  beginBillImport,
  canImportBill,
  checkBillDraft,
  importBill,
  initialBills,
  readBill,
  readBillSource,
  validBills,
  visibleBills,
} from "../src/workspace/bills";

function customer() {
  const s = initialState("reader");
  s.actor = "person-alfa";
  return s;
}
function prepared(id = "luce-nov", property = "casa-alfa") {
  const s = customer(),
    bills = initialBills();
  const draft = beginBillImport(s, bills, property, id)!;
  draft.data = readBillSource(s, property, id)!.original;
  return { s, bills, draft };
}
async function open(page: Page) {
  await page.addInitScript((s) => {
    if (!localStorage.getItem("eecard-functional-v4"))
      localStorage.setItem("eecard-functional-v4", JSON.stringify(s));
  }, customer());
  await page.goto("/#/spazio/utilities");
}
async function choose(page: Page, name = "Novembre · importo da correggere") {
  await page
    .getByRole("button", { name: "Aggiungi bolletta", exact: true })
    .click();
  await page.getByRole("button", { name, exact: false }).click();
}
async function compare(page: Page) {
  await page.getByLabel("Importo", { exact: true }).fill("96,40");
  await page
    .getByLabel("Motivo della correzione", { exact: true })
    .fill("Virgola confrontata con il facsimile");
  await page.getByRole("button", { name: "Rivedi prima di salvare" }).click();
}

test("PB01: campi errati/mancanti, importi invalidi e conferma obbligatoria", () => {
  const { s, bills, draft } = prepared();
  const original = structuredClone(s);
  expect(
    checkBillDraft(
      s,
      bills,
      "casa-alfa",
      beginBillImport(s, bills, "casa-alfa", "luce-nov")!,
    ).kind,
  ).toBe("error");
  for (const amount of [
    "",
    "NaN",
    "-1",
    "0",
    "96,4",
    "96.401",
    "1e2",
    "964,00",
    "Infinity",
  ]) {
    expect(
      importBill(
        s,
        bills,
        "casa-alfa",
        { ...draft, data: { ...draft.data, amount } },
        true,
        "correzione",
      ).ok,
    ).toBe(false);
  }
  for (const [key, value] of Object.entries({
    due: "2026-02-30",
    holder: "Altro",
    creditor: "",
    period: "2025-11",
    currency: "USD",
    supply: "DEMO-ATELIER",
    notice: "alterato",
  })) {
    expect(
      importBill(
        s,
        bills,
        "casa-alfa",
        { ...draft, data: { ...draft.data, [key]: value } },
        true,
        "correzione",
      ).ok,
    ).toBe(false);
  }
  expect(importBill(s, bills, "casa-alfa", draft, false, "correzione").ok).toBe(
    false,
  );
  expect(importBill(s, bills, "casa-alfa", draft, true, "").ok).toBe(false);
  const r = importBill(s, bills, "casa-alfa", draft, true, "Virgola corretta");
  expect(r.ok).toBe(true);
  expect(r.bills).toHaveLength(3);
  expect(r.bills.at(-1)!.versions[0].fields.amount).toMatchObject({
    proposed: "964,00",
    corrected: true,
    confidence: "incerta",
    reviewer: "person-alfa",
    source: "luce-nov",
    page: 1,
  });
  expect(validBills(r.bills)).toBe(true);
  expect(s).toEqual(original);
  expect(bills).toHaveLength(2);
});

test("PB02: duplicato idempotente, rettifica collegata, fonte precedente conservata e conflitto", () => {
  const { s, bills, draft } = prepared();
  const r = importBill(s, bills, "casa-alfa", draft, true, "Virgola");
  const replay = importBill(s, r.bills, "casa-alfa", draft, true, "Virgola");
  expect(replay.ok).toBe(true);
  expect(replay.changed).toBe(false);
  expect(replay.bills).toEqual(r.bills);
  const correction = beginBillImport(
    s,
    r.bills,
    "casa-alfa",
    "luce-ott-rettifica",
  )!;
  const revised = importBill(
    s,
    r.bills,
    "casa-alfa",
    correction,
    true,
    "Rettifica del fornitore",
  );
  expect(revised.ok).toBe(true);
  expect(revised.bills).toHaveLength(3);
  expect(revised.bills[0].versions.map((v) => v.data.amount)).toEqual([
    "84,00",
    "79,00",
  ]);
  expect(revised.bills[0].versions[0]).toEqual(bills[0].versions[0]);
  expect(validBills(revised.bills)).toBe(true);
  const old = beginBillImport(s, revised.bills, "casa-alfa", "luce-ott")!;
  expect(importBill(s, revised.bills, "casa-alfa", old, true, "").changed).toBe(
    false,
  );
  expect(
    importBill(
      s,
      bills,
      "casa-alfa",
      { ...correction, expectedVersion: 99 },
      true,
      "rettifica",
    ).ok,
  ).toBe(false);
});

test("PB01/PB02: illeggibile recuperabile, senza codice/multipagina, domiciliazione e pagato non sono incassi", () => {
  const { s, bills } = prepared();
  const unreadable = beginBillImport(
    s,
    bills,
    "casa-alfa",
    "luce-illeggibile",
  )!;
  expect(importBill(s, bills, "casa-alfa", unreadable, true, "").ok).toBe(
    false,
  );
  const noCode = prepared("atelier-nov", "casa-propria");
  const r = importBill(s, bills, "casa-propria", noCode.draft, true, "");
  expect(r.ok).toBe(true);
  expect(r.bills.at(-1)!.versions[0].data.notice).toBe("");
  expect(r.bills.at(-1)!.versions[0].fields.supply.page).toBe(2);
  expect(readBillSource(s, "casa-propria", "atelier-nov")?.debit).toContain(
    "indicata",
  );
  expect(
    importBill(s, bills, "casa-alfa", prepared("luce-set").draft, true, "").ok,
  ).toBe(true);
  expect(readBillSource(s, "casa-alfa", "luce-set")?.payment).toContain(
    "non verificato",
  );
});

test("PB03: isolamento completo letture/fonti/comandi, revoca, tempo e cambio contesto durante il flusso", () => {
  const { s, bills, draft } = prepared();
  const saved = importBill(
    s,
    bills,
    "casa-alfa",
    draft,
    true,
    "correzione",
  ).bills;
  const denied = [
    { ...s, actor: "owner-alfa" },
    { ...s, actor: "tech-alfa" },
    { ...s, actor: "op-alfa" },
    { ...s, actor: "op-beta", agency: "beta" },
    { ...s, agency: "beta" },
    { ...s, operatorAuthenticated: false },
    { ...s, serviceAvailable: false },
    { ...s, practice: { ...s.practice, account: false } },
    {
      ...s,
      grants: s.grants.map((g) =>
        g.id === "intestazione" ? { ...g, revoked: true } : g,
      ),
    },
    {
      ...s,
      grants: s.grants.map((g) =>
        g.id === "intestazione" ? { ...g, until: "2026-10-14" } : g,
      ),
    },
    {
      ...s,
      grants: s.grants.map((g) =>
        g.id === "intestazione" ? { ...g, from: "2026-10-15" } : g,
      ),
    },
    {
      ...s,
      grants: s.grants.map((g) =>
        g.id === "intestazione" ? { ...g, purposes: [] } : g,
      ),
    },
  ];
  for (const state of denied) {
    expect(canImportBill(state, "casa-alfa")).toBeFalsy();
    expect(availableBillSources(state, "casa-alfa")).toEqual([]);
    expect(readBillSource(state, "casa-alfa", "luce-nov")).toBeNull();
    expect(visibleBills(state, saved, "casa-alfa")).toEqual([]);
    expect(readBill(state, saved, "casa-alfa", "import-luce-nov")).toBeNull();
    expect(importBill(state, saved, "casa-alfa", draft, true, "retry").ok).toBe(
      false,
    );
  }
  expect(importBill(s, bills, "casa-propria", draft, true, "").ok).toBe(false);
  expect(readBillSource(s, "casa-propria", "luce-nov")).toBeNull();
  expect(readBill(s, saved, "casa-propria", "import-luce-nov")).toBeNull();
  const autonomous = execute(s, { type: "blockOwnCard" }).state;
  autonomous.relationEnded = true;
  expect(canImportBill(autonomous, "casa-alfa")).toBe(true);
});

test("PB03: delega dedicata valida/scaduta/revocata, lettura non implica acquisizione", () => {
  const s = customer(),
    bills = initialBills();
  s.actor = "owner-alfa";
  expect(canImportBill(s, "casa-alfa")).toBe(false);
  s.grants.find((g) => g.id === "delega-scaduta")!.until = "2027-01-01";
  expect(canImportBill(s, "casa-alfa")).toBe(true);
  const draft = beginBillImport(s, bills, "casa-alfa", "luce-ott-rettifica")!;
  expect(importBill(s, bills, "casa-alfa", draft, true, "rettifica").ok).toBe(
    true,
  );
  s.grants.find((g) => g.id === "delega-scaduta")!.revoked = true;
  expect(importBill(s, bills, "casa-alfa", draft, true, "rettifica").ok).toBe(
    false,
  );
  const own = customer();
  own.grants.find((g) => g.id === "intestazione")!.id = "titolo-solo-lettura";
  expect(visibleBills(own, bills, "casa-alfa")).toHaveLength(1);
  expect(canImportBill(own, "casa-alfa")).toBe(false);
});

test("workspace precedente compatibile; importi, fonti e versioni corrotti producono reset esplicito", () => {
  const descriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "localStorage",
  );
  const old: Partial<ReturnType<typeof emptyWorkspace>> = emptyWorkspace();
  delete old.bills;
  const read = (value: unknown) => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: { getItem: () => JSON.stringify(value) },
    });
    return readWorkspace();
  };
  try {
    expect(read(old).bills).toEqual(initialBills());
    for (const corrupt of [null, {}, [], [{ id: "bad" }]])
      expect(read({ ...old, bills: corrupt }).notice).toContain(
        "incompatibile",
      );
    const b = initialBills();
    b[0].versions[0].data.amount = "1";
    expect(read({ ...old, bills: b }).notice).toContain("incompatibile");
    const d = initialBills();
    d.push(structuredClone(d[0]));
    expect(validBills(d)).toBe(false);
  } finally {
    if (descriptor)
      Object.defineProperty(globalThis, "localStorage", descriptor);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});

test("percorso completo, errore, conferma/annullo, persistenza, duplicato, rettifica e storico", async ({
  page,
}) => {
  await open(page);
  const base = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("eecard-functional-v4")!),
  );
  await choose(page);
  await expect(
    page.getByRole("heading", { name: "L’originale, accanto ai tuoi dati" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Rivedi prima di salvare" }).click();
  await expect(page.getByRole("alert")).toContainText("Importo");
  await compare(page);
  await page.getByRole("button", { name: "Annulla importazione" }).click();
  await expect(
    page.getByRole("button", { name: "Aggiungi bolletta", exact: true }),
  ).toBeFocused();
  await choose(page);
  await compare(page);
  await page
    .getByRole("button", { name: "Conferma e salva nel browser" })
    .dblclick();
  await expect(
    page.getByRole("status").filter({ hasText: "Bolletta salvata" }),
  ).toBeVisible();
  const u = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("eecard-workspace-v1")!),
  );
  expect(u.bills).toHaveLength(3);
  expect(
    u.events.filter((e: { action: string }) => e.action === "importBill"),
  ).toHaveLength(1);
  expect(u.ledger).toEqual(emptyWorkspace().ledger);
  expect(u.renewalCancelled).toBe(false);
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("eecard-functional-v4")!),
    ),
  ).toEqual(base);
  await page.reload();
  await expect(page.getByText("96,40 €", { exact: true })).toBeVisible();
  await choose(page);
  await compare(page);
  await expect(
    page.getByRole("heading", { name: "Originale già presente" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Apri quella già presente" }).click();
  await expect(
    page.getByRole("heading", { name: "Dati confermati · versione 1" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await choose(page, "Ottobre · rettifica del fornitore");
  await page
    .getByLabel("Motivo della correzione", { exact: true })
    .fill("Nuovo originale del fornitore");
  await page.getByRole("button", { name: "Rivedi prima di salvare" }).click();
  await page
    .getByRole("button", { name: "Conferma rettifica", exact: true })
    .click();
  await expect(page.getByText("79,00 €", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Apri bolletta" }).first().click();
  await page.getByLabel("Versione", { exact: true }).selectOption("1");
  await expect(page.getByText("84,00 €", { exact: true })).toBeVisible();
  await page.getByLabel("Versione", { exact: true }).selectOption("2");
  await expect(page.getByText("79,00 €", { exact: true })).toBeVisible();
});

test("errore persistenza: nessun falso successo, retry conserva campi e un solo evento; reset", async ({
  page,
}) => {
  await open(page);
  await choose(page);
  await compare(page);
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "eecard-workspace-v1" && sessionStorage.getItem("fail-bill"))
        throw new Error("quota");
      return original.call(this, key, value);
    };
    sessionStorage.setItem("fail-bill", "yes");
  });
  await page
    .getByRole("button", { name: "Conferma e salva nel browser" })
    .click();
  await expect(page.getByRole("alert")).toContainText("Bolletta non salvata");
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("eecard-workspace-v1")!).bills.length,
    ),
  ).toBe(2);
  await page.evaluate(() => sessionStorage.removeItem("fail-bill"));
  await page
    .getByRole("button", { name: "Conferma e salva nel browser" })
    .click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("eecard-workspace-v1")!).bills.length,
    ),
  ).toBe(3);
  await page
    .getByRole("button", { name: "Strumenti della demo", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Ripristina scenario", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("eecard-workspace-v1")!).bills,
    ),
  ).toEqual(initialBills());
});

test("cambio casa cancella la bozza, copia illeggibile recuperabile, nessun upload o URL esterno", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (
      /^https?:/.test(r.url()) &&
      !r.url().startsWith("http://127.0.0.1:5173")
    )
      external.push(r.url());
  });
  await open(page);
  await choose(page, "Copia illeggibile");
  await expect(page.getByRole("alert")).toContainText("illeggibile");
  await page
    .getByRole("button", { name: "Scegli una copia leggibile" })
    .click();
  await page
    .getByRole("button", {
      name: "Novembre · importo da correggere",
      exact: false,
    })
    .click();
  await page.getByRole("button", { name: "Casa Atelier Casa propria" }).click();
  await expect(page.getByLabel("Importo", { exact: true })).toHaveCount(0);
  await expect(page.getByText("96,40 €", { exact: true })).toHaveCount(0);
  await choose(page, "Novembre · senza codice");
  await page.getByRole("button", { name: "Rivedi prima di salvare" }).click();
  await expect(
    page.getByText(/Domiciliazione: indicata nell’originale.*L’importazione/),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Conferma e salva nel browser" })
    .click();
  await expect(page.getByText("58,20 €", { exact: true })).toBeVisible();
  expect(await page.locator('input[type="file"]').count()).toBe(0);
  expect(external).toEqual([]);
});

for (const width of [360, 390, 1440])
  test(`IN03 confronto/conferma accessibili ${width}px, tastiera e testo 200%`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page);
    await choose(page);
    if (width < 700) {
      await page
        .getByRole("button", { name: "Originale", exact: true })
        .click();
      await expect(
        page.getByRole("article", { name: "Originale sintetico" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Dati da controllare" }).click();
    }
    for (const step of ["compare", "confirm"]) {
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.screenshot({
        path: test.info().outputPath(`bolletta-${step}-${width}.png`),
        fullPage: true,
      });
      if (step === "compare") await compare(page);
    }
    await page.addStyleTag({
      content:
        ".bill-panel, .bill-panel input, .bill-panel button, .bill-panel p, .bill-panel dt, .bill-panel dd { font-size: 200% !important; }",
    });
    expect(
      await page.evaluate(() =>
        [...document.querySelectorAll(".bill-panel *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.right > innerWidth;
          })
          .map((el) => ({
            tag: el.tagName,
            class: el.className,
            text: el.textContent?.slice(0, 70),
          })),
      ),
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Aggiungi bolletta", exact: true }),
    ).toBeFocused();
  });

test("seconda copia con fonte diversa non crea un secondo dovuto", () => {
  const { s, bills, draft } = prepared();
  const saved = importBill(s, bills, "casa-alfa", draft, true, "Virgola").bills;
  const copy = beginBillImport(s, saved, "casa-alfa", "luce-nov-copia")!;
  expect(checkBillDraft(s, saved, "casa-alfa", copy).kind).toBe("duplicate");
  expect(importBill(s, saved, "casa-alfa", copy, true, "").bills).toEqual(
    saved,
  );
});

test("cambio attore e chiusura sessione eliminano anche originale e bozza visibili", async ({
  page,
}) => {
  await open(page);
  await choose(page);
  await compare(page);
  await page
    .getByRole("button", { name: "Strumenti della demo", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Chiudi sessione", exact: true })
    .click();
  await expect(
    page.getByText("Il tuo spazio è chiuso", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Conferma e salva nel browser" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("article", { name: "Originale sintetico" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Rientra nella demo", exact: true })
    .click();
  // A new session must not silently restore an unfinished acquisition.
  await choose(page);
  await compare(page);
  await page
    .getByRole("button", { name: "Strumenti della demo", exact: true })
    .click();
  await page.getByLabel("Attore e contesto").selectOption("owner-alfa");
  await page.goto("/#/spazio/utilities");
  await expect(
    page.getByRole("heading", { name: "Nessuna bolletta disponibile" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Aggiungi bolletta", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("article", { name: "Originale sintetico" }),
  ).toHaveCount(0);
});
