import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { execute, initialState } from "../src/demo/model";
import {
  emptyWorkspace,
  readSubscription,
  readWorkspace,
  work,
} from "../src/workspace/service";

function customer() {
  const s = initialState("reader");
  s.actor = "person-alfa";
  return s;
}
async function open(page: Page) {
  await page.addInitScript((s) => {
    if (!localStorage.getItem("eecard-functional-v4"))
      localStorage.setItem("eecard-functional-v4", JSON.stringify(s));
  }, customer());
  await page.goto("/#/spazio/overview");
  await page
    .getByRole("button", { name: "Gestisci abbonamento", exact: true })
    .click();
}

test("il rinnovo appartiene all'aderente, indipendentemente da locazione e card", () => {
  const s = customer(),
    u = emptyWorkspace();
  const original = structuredClone(s);
  expect(readSubscription(s, u)?.active).toBe(true);
  const result = work(s, u, { type: "cancelRenewal" });
  expect(result.ok).toBe(true);
  expect(result.state.renewalCancelled).toBe(true);
  expect(result.state.ledger).toEqual(u.ledger);
  expect(result.state.requests).toEqual(u.requests);
  expect(result.state.ownerCardBlocked).toBe(u.ownerCardBlocked);
  expect(s).toEqual(original);
  expect(u.renewalCancelled).toBe(false);
  expect(work(s, result.state, { type: "cancelRenewal" }).state.events).toEqual(
    result.state.events,
  );
  const ended = execute(s, { type: "blockOwnCard" }).state;
  ended.relationEnded = true;
  expect(work(ended, u, { type: "cancelRenewal" }).ok).toBe(true);
});

test("altri attori, account/sessione/servizio e adesione non validi non modificano il rinnovo", () => {
  const base = customer(),
    u = emptyWorkspace();
  const cases = [
    { ...base, actor: "owner-alfa" },
    { ...base, actor: "op-alfa" },
    { ...base, actor: "tech-alfa" },
    { ...base, actor: "op-beta", agency: "beta" },
    { ...base, agency: "beta" },
    { ...base, operatorAuthenticated: false },
    { ...base, serviceAvailable: false },
    { ...base, practice: { ...base.practice, account: false } },
  ];
  for (const s of cases) {
    expect(readSubscription(s, u)).toBeNull();
    expect(work(s, u, { type: "cancelRenewal" }).ok).toBe(false);
    expect(work(s, u, { type: "cancelRenewal" }).state.renewalCancelled).toBe(
      false,
    );
  }
  base.practice.membership = "terminata";
  expect(work(base, u, { type: "cancelRenewal" }).ok).toBe(false);
  const s = customer();
  expect(readSubscription(s, u, "2026-12-31")?.active).toBe(true);
  expect(readSubscription(s, u, "2027-01-01")?.active).toBe(false);
  expect(readSubscription(s, u, "2025-12-31")?.active).toBe(false);
});

test("compatibilità workspace precedente e valore corrotto esplicito", () => {
  const old: Partial<ReturnType<typeof emptyWorkspace>> = emptyWorkspace();
  delete old.renewalCancelled;
  const descriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "localStorage",
  );
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: { getItem: () => JSON.stringify(old) },
    });
    expect(readWorkspace().renewalCancelled).toBe(false);
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => JSON.stringify({ ...old, renewalCancelled: "false" }),
      },
    });
    expect(readWorkspace().notice).toContain("incompatibile");
  } finally {
    if (descriptor)
      Object.defineProperty(globalThis, "localStorage", descriptor);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});

test("annullo, conferma, ricarica e reset senza alterare documenti o stato economico", async ({
  page,
}) => {
  await open(page);
  const dialog = page.getByRole("dialog");
  const before = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("eecard-functional-v4")!),
  );
  await dialog
    .getByRole("button", { name: "Disattiva rinnovo", exact: true })
    .click();
  await expect(
    dialog.getByRole("heading", { name: "Disattivare il prossimo rinnovo?" }),
  ).toBeFocused();
  await dialog.getByRole("button", { name: "Torna al riepilogo" }).click();
  await expect(
    dialog.getByRole("button", { name: "Disattiva rinnovo", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Gestisci abbonamento", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await dialog
    .getByRole("button", { name: "Disattiva rinnovo", exact: true })
    .click();
  await dialog
    .getByRole("button", { name: "Conferma disattivazione di esempio" })
    .click();
  await expect(dialog.getByRole("status")).toContainText(
    "Rinnovo disattivato nella demo",
  );
  await expect(
    dialog.getByRole("heading", { name: "Rinnovo disattivato nella demo" }),
  ).toBeFocused();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("eecard-functional-v4")!),
    ),
  ).toEqual(before);
  await page.reload();
  await page
    .getByRole("button", { name: "Gestisci abbonamento", exact: true })
    .click();
  await expect(dialog.getByRole("status")).toContainText("Rinnovo disattivato");
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Strumenti della demo", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Ripristina scenario", exact: true })
    .click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("eecard-workspace-v1")!)
          .renewalCancelled,
    ),
  ).toBe(false);
});

test("salvataggio fallito: nessun falso successo e retry senza doppio evento", async ({
  page,
}) => {
  await open(page);
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (
        key === "eecard-workspace-v1" &&
        sessionStorage.getItem("fail-renewal") === "yes"
      )
        throw new Error("simulated quota error");
      return original.call(this, key, value);
    };
    sessionStorage.setItem("fail-renewal", "yes");
  });
  await page
    .getByRole("button", { name: "Disattiva rinnovo", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Conferma disattivazione di esempio" })
    .click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "Disdetta non salvata",
  );
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("eecard-workspace-v1")!)
          .renewalCancelled,
    ),
  ).toBe(false);
  await page.evaluate(() => sessionStorage.removeItem("fail-renewal"));
  await page
    .getByRole("button", { name: "Conferma disattivazione di esempio" })
    .click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "Rinnovo disattivato",
  );
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("eecard-workspace-v1")!).events.filter(
          (e: { action: string }) => e.action === "cancelRenewal",
        ).length,
    ),
  ).toBe(1);
});

for (const width of [360, 390, 1440])
  test(`rinnovo accessibile a ${width}px, movimento ridotto e testo 200%`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page);
    await page
      .getByRole("button", { name: "Disattiva rinnovo", exact: true })
      .click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.addStyleTag({
      content:
        ".ws-modal-content, .ws-modal-content p, .ws-modal-content button, .ws-modal-content dd, .ws-modal-content dt { font-size: 200% !important; }",
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const dialog = page.getByRole("dialog");
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    await dialog.getByRole("button", { name: "Torna al riepilogo" }).click();
  });
