# Markdown Note Search

A small Node.js CLI that indexes Markdown notes and searches title/body content.

## Features

- Recursively reads `.md` files
- Extracts the first heading as a title
- Scores matches in title and body
- Prints concise search results

## Run

```bash
node src/search.mjs samples glass
```

## Test

```bash
npm test
```
