import { readFile } from "node:fs/promises";

const requiredFiles = ["index.html", "styles.css", "app.js", "README.md"];

for (const file of requiredFiles) {
  const content = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  if (!content.trim()) {
    throw new Error(`${file} is empty`);
  }
}

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
for (const id of ["estimator", "quote", "tracker"]) {
  if (!html.includes(`id="${id}"`)) {
    throw new Error(`Missing workspace: ${id}`);
  }
}

console.log("Static project files verified.");
