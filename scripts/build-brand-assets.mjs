import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";
const geometry = JSON.parse(readFileSync("src/brand-geometry.json", "utf8"));
const output = "public/brand";
mkdirSync(output, { recursive: true });
function svg(paths, color, background = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="${color}">${background}${paths.map((d) => `<path d="${d}"/>`).join("")}</svg>\n`;
}
for (const [master, paths] of Object.entries(geometry)) {
  for (const [tone, color] of Object.entries({
    bruno: "#48280f",
    bianco: "#ffffff",
    nero: "#000000",
    albicocca: "#ffa15e",
  })) {
    writeFileSync(`${output}/legame-${master}-${tone}.svg`, svg(paths, color));
  }
}
const favicon = svg(
  geometry.small,
  "#48280f",
  '<rect width="96" height="96" rx="24" fill="#ffa15e"/>',
);
writeFileSync("public/favicon.svg", favicon);
writeFileSync(`${output}/favicon.svg`, favicon);
const browser = await chromium.launch();
for (const size of [16, 32, 180, 512]) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<style>html,body{margin:0;width:100%;height:100%}svg{display:block;width:100%;height:100%}</style>${favicon}`,
  );
  await page.screenshot({
    path: `${output}/favicon-${size}.png`,
    omitBackground: true,
  });
  await page.close();
}
await browser.close();
console.log(
  "Legame: 8 SVG masters, SVG favicon and 4 PNG sizes generated from the shared geometry.",
);

// Package the same generated masters with the maintained usage guide.
writeFileSync(`${output}/LEGGIMI.md`, readFileSync("docs/design/MARCHIO.md"));
execFileSync("python3", [
  "-c",
  "from pathlib import Path; import zipfile; p=Path('public/brand'); z=zipfile.ZipFile(p/'legame-assets.zip','w',zipfile.ZIP_DEFLATED); [z.write(f,f.name) for f in sorted(p.iterdir()) if f.suffix in ['.svg','.png','.md']]; z.close()",
]);
