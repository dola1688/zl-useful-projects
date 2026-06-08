import assert from "node:assert/strict";
import { searchNotes } from "../src/index-notes.mjs";

const notes = [
  { file: "a.md", title: "Glass Order", content: "Glass delivery notes" },
  { file: "b.md", title: "Planning", content: "Quote workflow" },
];

const results = searchNotes(notes, "glass");
assert.equal(results.length, 1);
assert.equal(results[0].file, "a.md");
assert.equal(results[0].score, 3);

console.log("Markdown search tests passed.");
