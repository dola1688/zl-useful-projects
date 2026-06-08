import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export async function findMarkdownFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) files.push(...await findMarkdownFiles(fullPath));
    else if (entry.name.endsWith(".md")) files.push(fullPath);
  }

  return files;
}

export async function indexNotes(root) {
  const files = await findMarkdownFiles(root);
  return Promise.all(files.map(async (file) => {
    const content = await readFile(file, "utf8");
    const title = content.match(/^#\s+(.+)$/m)?.[1] ?? file;
    return { file, title, content };
  }));
}

export function searchNotes(notes, query) {
  const term = query.toLowerCase();
  return notes
    .map((note) => {
      const titleMatches = note.title.toLowerCase().includes(term) ? 2 : 0;
      const bodyMatches = note.content.toLowerCase().split(term).length - 1;
      return { ...note, score: titleMatches + bodyMatches };
    })
    .filter((note) => note.score > 0)
    .sort((a, b) => b.score - a.score);
}
