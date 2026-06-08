import { indexNotes, searchNotes } from "./index-notes.mjs";

const [root, query] = process.argv.slice(2);

if (!root || !query) {
  console.error("Usage: node src/search.mjs <notes-directory> <query>");
  process.exit(1);
}

const results = searchNotes(await indexNotes(root), query);
for (const result of results) {
  console.log(`${result.score}  ${result.title}  ${result.file}`);
}
