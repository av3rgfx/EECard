import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const files = readdirSync("dist/assets");
let css = files
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(`dist/assets/${f}`, "utf8"))
  .join("\n");
css = css.replace(
  /url\((?:\.\/)?([^)]*\.woff2)\)/g,
  (_, file) =>
    `url(data:font/woff2;base64,${readFileSync(`dist/assets/${file.split("/").at(-1)}`).toString("base64")})`,
);
const jsFile = files.find((f) => /^index-.*\.js$/.test(f));
const js = readFileSync(`dist/assets/${jsFile}`, "utf8").replace(
  /<\/script/gi,
  "<\\/script",
);
const assets = {};
for (const file of readdirSync("public/images"))
  assets[`images/${file}`] =
    `data:image/jpeg;base64,${readFileSync(`public/images/${file}`).toString("base64")}`;
assets["documento-demo.pdf"] =
  `data:application/pdf;base64,${readFileSync("public/documento-demo.pdf").toString("base64")}`;
const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"><meta name="theme-color" content="#f7f8f4"><title>EECard · Anteprima portatile</title><style>${css}</style></head><body><div id="root"></div><script>window.__EECARD_ASSETS__=${JSON.stringify(assets)}</script><script type="module">${js}</script></body></html>`;
writeFileSync("docs/design/anteprima.html", html);
console.log(
  `Anteprima autonoma: docs/design/anteprima.html (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB).`,
);
