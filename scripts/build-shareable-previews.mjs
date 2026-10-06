import {
  mkdirSync,
  copyFileSync,
  writeFileSync,
  readFileSync,
  cpSync,
} from "node:fs";
const output = ".output/public";
for (const folder of ["desktop", "mobile", "app"])
  mkdirSync(`${output}/${folder}`, { recursive: true });
for (const mode of ["desktop", "mobile"])
  copyFileSync(`preview/${mode}.html`, `${output}/${mode}/index.html`);
copyFileSync("preview/index.html", `${output}/index.html`);
copyFileSync("preview/preview.css", `${output}/preview.css`);
copyFileSync("public/favicon.svg", `${output}/favicon.svg`);
const app = readFileSync("docs/design/anteprima.html", "utf8").replace(
  "<title>EECard · Anteprima portatile</title>",
  '<meta name="robots" content="noindex, nofollow"><link rel="icon" href="../favicon.svg" type="image/svg+xml"><title>EECard · Prototipo di design</title>',
);
writeFileSync(`${output}/app/index.html`, app);
writeFileSync(`${output}/.nojekyll`, "");
console.log(`Anteprime condivisibili generate in ${output}/`);

// Review-only identity concepts; no candidate is applied to the product yet.
cpSync("docs/design/identita", `${output}/identita`, { recursive: true });
