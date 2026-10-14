import {
  mkdirSync,
  copyFileSync,
  writeFileSync,
  readFileSync,
  cpSync,
} from "node:fs";
const output = ".output/public";
for (const folder of ["desktop", "mobile", "app", "anteprime"])
  mkdirSync(`${output}/${folder}`, { recursive: true });
for (const mode of ["desktop", "mobile"])
  copyFileSync(`preview/${mode}.html`, `${output}/${mode}/index.html`);
writeFileSync(
  `${output}/anteprime/index.html`,
  readFileSync("preview/index.html", "utf8").replaceAll(
    'href="./',
    'href="../',
  ),
);
copyFileSync("preview/preview.css", `${output}/preview.css`);
copyFileSync("public/favicon.svg", `${output}/favicon.svg`);
const app = readFileSync("docs/design/anteprima.html", "utf8").replace(
  "<title>EECard · Anteprima portatile</title>",
  '<meta name="robots" content="noindex, nofollow"><link rel="icon" href="../favicon.svg" type="image/svg+xml"><title>EECard · Prototipo di design</title>',
);
writeFileSync(`${output}/app/index.html`, app);
writeFileSync(
  `${output}/index.html`,
  app.replace('href="../favicon.svg"', 'href="./favicon.svg"'),
);
writeFileSync(`${output}/.nojekyll`, "");
console.log(`Anteprime condivisibili generate in ${output}/`);

// Keep the historical comparison; selected symbol and downloads have their own guide.
cpSync("docs/design/identita", `${output}/identita`, { recursive: true });

cpSync("docs/design/marchio", `${output}/marchio`, { recursive: true });
cpSync("public/brand", `${output}/brand`, { recursive: true });
