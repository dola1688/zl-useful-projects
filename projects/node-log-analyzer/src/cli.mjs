import { readFile } from "node:fs/promises";
import { analyzeLog } from "./analyze.mjs";

const file = process.argv[2];

if (!file) {
  console.error("Usage: node src/cli.mjs <access-log-file>");
  process.exit(1);
}

const report = analyzeLog(await readFile(file, "utf8"));
console.log(JSON.stringify(report, null, 2));
