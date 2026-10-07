// Build the isolated review surface, then inline local resources for offline review.
// Does not modify the existing product or Sites output (.output/public).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
execFileSync("npx", ["tsc", "-p", "design-lab/tsconfig.json"], {
  stdio: "inherit",
});
execFileSync(
  "npx",
  ["vite", "build", "--config", "design-lab/vite.config.ts"],
  { stdio: "inherit" },
);
const root = resolve(".output/design-lab");
let html = await readFile(resolve(root, "index.html"), "utf8");
for (const match of [
  ...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g),
]) {
  const script = await readFile(resolve(root, match[1]), "utf8");
  html = html.replace(
    match[0],
    () =>
      `<script type="module">${script.replaceAll("</script", "<\\/script")}</script>`,
  );
}
for (const match of [...html.matchAll(/<link\b[^>]*href="([^"]+)"[^>]*>/g)]) {
  if (match[0].includes("stylesheet")) {
    const css = await readFile(resolve(root, match[1]), "utf8");
    html = html.replace(match[0], () => `<style>${css}</style>`);
  } else if (match[0].includes("icon")) {
    const icon = await readFile(resolve(root, match[1]));
    html = html.replace(
      match[1],
      `data:image/svg+xml;base64,${icon.toString("base64")}`,
    );
  }
}
const licenses = [
  ["Manrope — SIL OFL 1.1", "docs/design/LICENSE-Manrope.txt"],
  [
    "Prototype picker — Emil Kowalski skills",
    "design-lab/LICENSE-Emil-skills.txt",
  ],
  ["Lucide icons", "node_modules/lucide-react/LICENSE"],
  ["React", "node_modules/react/LICENSE"],
];
for (const [name, path] of licenses) {
  const license = await readFile(path, "utf8");
  html = html.replace(
    "</body>",
    () =>
      `<script type="text/plain" data-license="${name}">${license.replaceAll("</script", "<\\/script")}</script></body>`,
  );
}
await mkdir("docs/design/esplorazioni", { recursive: true });
await writeFile("docs/design/esplorazioni/anteprima.html", html);
console.log("Anteprima autonoma: docs/design/esplorazioni/anteprima.html");
