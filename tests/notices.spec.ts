import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialState, type State } from "../src/demo/model";
import { emptyWorkspace } from "../src/workspace/service";
import {
  beginBillImport,
  importBill,
  initialBills,
  readBillNotice,
  readBillSource,
  type Bill,
} from "../src/workspace/bills";

function customer() {
  const s = initialState("reader");
  s.actor = "person-alfa";
  return s;
}
function acquired(id: string, property = "casa-alfa", bills = initialBills()) {
  const s = customer();
  const draft = beginBillImport(s, bills, property, id)!;
  draft.data = readBillSource(s, property, id)!.original;
  return importBill(s, bills, property, draft, true, "Confronto sintetico")
    .bills;
}
async function open(page: Page, bills = initialBills()) {
  await page.addInitScript(
    ({ s, u }) => {
      localStorage.setItem("eecard-functional-v4", JSON.stringify(s));
      localStorage.setItem("eecard-workspace-v1", JSON.stringify(u));
    },
    { s: customer(), u: { ...emptyWorkspace(), bills } },
  );
  await page.goto("/#/spazio/utilities");
}
const dialog = (page: Page) =>
  page.getByRole("dialog", { name: "Avviso della bolletta" });

test("IN04: originale/versione coerenti, rettifica e lettura senza mutazioni", () => {
  const s = customer();
  const bills = acquired("luce-ott-rettifica");
  const before = structuredClone({ s, bills });
  const current = readBillNotice(s, bills, "casa-alfa", "bolletta-alfa")!;
  expect(current.version.amountCents).toBe(7900);
  expect(current.version.data).toEqual(current.source.original);
  expect(current.superseded).toBe(false);
  const old = readBillNotice(s, bills, "casa-alfa", "bolletta-alfa", 1)!;
  expect(old.version.amountCents).toBe(8400);
  expect(old.superseded).toBe(true);
  expect(old.source.id).toBe("luce-ott");
  expect(readBillNotice(s, bills, "casa-alfa", "bolletta-alfa", 99)).toBeNull();
  const corrupt = structuredClone(bills);
  corrupt[0].versions[1].data.amount = "1,00";
  expect(readBillNotice(s, corrupt, "casa-alfa", "bolletta-alfa")).toBeNull();
  expect({ s, bills }).toEqual(before);
});

test("IN04/PB03: titoli rivalutati su avviso, testo e originale anche storico", () => {
  const s = customer(),
    bills = acquired("luce-ott-rettifica");
  const denied: State[] = [
    ...["owner-alfa", "tech-alfa", "op-alfa", "op-beta"].map((actor) => ({
      ...s,
      actor,
    })),
    { ...s, agency: "beta" },
    { ...s, operatorAuthenticated: false },
    { ...s, serviceAvailable: false },
    { ...s, practice: { ...s.practice, account: false } },
    ...[
      { revoked: true },
      { until: "2026-10-14" },
      { from: "2026-10-15" },
      { purposes: [] },
      { actions: [] },
    ].map((patch) => ({
      ...s,
      grants: s.grants.map((g) =>
        g.id === "intestazione" ? { ...g, ...patch } : g,
      ),
    })),
  ];
  for (const state of denied)
    for (const number of [1, 2])
      expect(
        readBillNotice(state, bills, "casa-alfa", "bolletta-alfa", number),
      ).toBeNull();
  expect(readBillNotice(s, bills, "casa-propria", "bolletta-alfa")).toBeNull();
  s.actor = "owner-alfa";
  s.grants.find((g) => g.id === "delega-scaduta")!.until = "2027-01-01";
  expect(readBillNotice(s, bills, "casa-alfa", "bolletta-alfa")).not.toBeNull();
  s.grants.find((g) => g.id === "delega-scaduta")!.revoked = true;
  expect(readBillNotice(s, bills, "casa-alfa", "bolletta-alfa")).toBeNull();
});

test("IN04: stesso telefono, Escape e ritorno alla bolletta senza eventi o pagamenti", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Apri bolletta" }).click();
  const before = await page.evaluate(() => ({ ...localStorage }));
  const trigger = page.getByRole("button", {
    name: "Mostra avviso",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(
    dialog(page).locator(".notice-total").filter({ hasText: "84,00" }),
  ).toBeVisible();
  await expect(
    dialog(page).getByText("Stato del pagamento ignoto", { exact: true }),
  ).toBeVisible();
  await expect(
    dialog(page).getByRole("region", {
      name: "Alternativa testuale sullo stesso telefono",
    }),
  ).toContainText("DEMO-OTT-LUCE");
  await expect(dialog(page)).not.toContainText("Autore:");
  await expect(dialog(page)).not.toContainText("Motivo:");
  await dialog(page)
    .getByText("Apri originale completo", { exact: true })
    .click();
  await expect(dialog(page).getByRole("article")).toContainText("84,00 €");
  await page.keyboard.press("Escape");
  await expect(dialog(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.getByLabel("Versione", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual(before);
});

test("IN04: storico superato, originale corrispondente e passaggio alla rettifica corrente", async ({
  page,
}) => {
  await open(page, acquired("luce-ott-rettifica"));
  await page.getByRole("button", { name: "Apri bolletta" }).click();
  await page.getByLabel("Versione", { exact: true }).selectOption("1");
  await page
    .getByRole("button", { name: "Mostra avviso", exact: true })
    .click();
  await expect(dialog(page)).toContainText("Versione superata");
  await expect(
    dialog(page).locator(".notice-total").filter({ hasText: "84,00" }),
  ).toBeVisible();
  await dialog(page)
    .getByText("Apri originale completo", { exact: true })
    .click();
  await expect(dialog(page).getByRole("article")).toContainText(
    "fonte luce-ott · revisione 1",
  );
  await dialog(page)
    .getByRole("button", { name: "Mostra versione corrente" })
    .click();
  await expect(
    dialog(page).locator(".notice-total").filter({ hasText: "79,00" }),
  ).toBeVisible();
  await expect(dialog(page)).not.toContainText("Versione superata");
  await dialog(page)
    .getByText("Apri originale completo", { exact: true })
    .click();
  await expect(dialog(page).getByRole("article")).toContainText(
    "fonte luce-ott-rettifica · revisione 2",
  );
});

for (const item of [
  {
    id: "atelier-nov",
    property: "casa-propria",
    message: "Codice assente nell’originale.",
    status: "Domiciliazione indicata",
  },
  {
    id: "luce-set",
    property: "casa-alfa",
    message: "Formato non supportato",
    status: "Pagamento indicato, non verificato",
  },
  {
    id: "luce-dic-codice-illeggibile",
    property: "casa-alfa",
    message: "Codice illeggibile.",
    status: "Stato del pagamento ignoto",
  },
])
  test(`IN04: recupero ${item.id}`, async ({ page }) => {
    await open(page, acquired(item.id, item.property));
    if (item.property === "casa-propria")
      await page.getByRole("button", { name: /Casa Atelier/ }).click();
    await page
      .getByRole("button", { name: "Mostra avviso", exact: true })
      .last()
      .click();
    await expect(dialog(page)).toContainText(item.message);
    await expect(dialog(page)).toContainText(item.status);
    if (item.id === "luce-set")
      await expect(dialog(page)).toContainText("La scadenza è trascorsa");
    await dialog(page)
      .getByText("Apri originale completo", { exact: true })
      .click();
    await expect(dialog(page).getByRole("article")).toBeVisible();
    if (item.id === "atelier-nov")
      await expect(dialog(page).getByRole("article")).toContainText(
        "Pagina 2 di 2",
      );
    await expect(
      dialog(page).locator("a[href], canvas, input[type=file]"),
    ).toHaveCount(0);
    await dialog(page)
      .getByRole("button", { name: "Chiudi avviso", exact: true })
      .click();
    await expect(dialog(page)).toHaveCount(0);
  });

for (const width of [360, 390, 1440])
  test(`IN04: layout, axe, tastiera e testo 200% a ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page);
    await page
      .getByRole("button", { name: "Mostra avviso", exact: true })
      .click();
    for (const original of [false, true]) {
      if (original)
        await dialog(page)
          .getByText("Apri originale completo", { exact: true })
          .click();
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
    await dialog(page)
      .getByText("Apri originale completo", { exact: true })
      .click();
    await dialog(page).evaluate((el) => {
      el.scrollTop = 0;
    });
    await page.screenshot({
      path: test.info().outputPath(`avviso-${width}.png`),
      fullPage: false,
    });
    await page.addStyleTag({
      content:
        ".bill-notice p, .bill-notice button, .bill-notice dt, .bill-notice dd, .bill-notice summary { font-size: 200% !important; }",
    });
    expect(
      await dialog(page).evaluate((el) =>
        [...el.querySelectorAll("*")]
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
          })
          .map((e) => e.tagName + ":" + e.className),
      ),
    ).toEqual([]);
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog(page).evaluate((el) =>
          el.contains(document.activeElement),
        ),
      ).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Mostra avviso", exact: true }),
    ).toBeFocused();
  });

// Controlled component harness exercises revocation while the dialog is open;
// changing roles via the app UI is intentionally unavailable behind a modal.
test("IN04/PB03: revoca e cambio contesto rimuovono avviso e originale già aperti", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(
    async ({ state, bills }: { state: State; bills: Bill[] }) => {
      const reactPath = "/node_modules/.vite/deps/react.js",
        domPath = "/node_modules/.vite/deps/react-dom_client.js",
        panelPath = "/src/workspace/BillsPanel.tsx";
      const React = await import(reactPath),
        { createRoot } = (await import(domPath)).default,
        { BillsPanel } = await import(panelPath);
      document.getElementById("root")!.style.display = "none";
      const host = document.createElement("div");
      document.body.append(host);
      const root = createRoot(host);
      (
        window as unknown as {
          renderNotice: (s: State, property?: string) => void;
        }
      ).renderNotice = (s, property = "casa-alfa") =>
        root.render(
          React.default.createElement(BillsPanel, {
            state: s,
            bills,
            property,
            save: () => ({ ok: false }),
          }),
        );
      (window as unknown as { renderNotice: (s: State) => void }).renderNotice(
        state,
      );
    },
    { state: customer(), bills: initialBills() },
  );
  await page
    .getByRole("button", { name: "Mostra avviso", exact: true })
    .click();
  await dialog(page)
    .getByText("Apri originale completo", { exact: true })
    .click();
  const s = customer();
  s.grants.find((g) => g.id === "intestazione")!.revoked = true;
  await page.evaluate(
    (s) =>
      (window as unknown as { renderNotice: (s: State) => void }).renderNotice(
        s,
      ),
    s,
  );
  await expect(dialog(page)).toContainText("Avviso non disponibile");
  await expect(dialog(page).getByRole("article")).toHaveCount(0);
  await expect(dialog(page)).not.toContainText("DEMO-OTT-LUCE");
  await page.evaluate(
    (s) =>
      (
        window as unknown as { renderNotice: (s: State, p: string) => void }
      ).renderNotice(s, "casa-propria"),
    customer(),
  );
  await expect(dialog(page)).not.toContainText("DEMO-OTT-LUCE");
});
