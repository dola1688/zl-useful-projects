import { readFile } from "node:fs/promises";

for (const file of ["index.html", "styles.css", "app.js"]) {
  const content = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  if (content.length < 100) throw new Error(`${file} looks incomplete`);
}

console.log("Dashboard files verified.");
