import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch();
const report = [];
for (const width of [390, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
  });
  const page = await context.newPage();
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
    "agenzia",
  ]) {
    await page.goto(`http://127.0.0.1:5173/#/${route}`);
    if (route === "agenzia")
      await page
        .getByLabel("Ruolo demo", { exact: true })
        .selectOption("agenzia");
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const violations = r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    }));
    if (violations.length)
      console.log(width, route, JSON.stringify(violations));
    report.push({ width, route, violations });
  }
  await context.close();
}
writeFileSync(
  "docs/design/audit-accessibilita.json",
  JSON.stringify(report, null, 2),
);
await browser.close();
