# Node Log Analyzer

A dependency-free command-line tool that parses HTTP access logs and prints a compact performance report.

## Features

- Counts requests by status group
- Finds slow routes by average latency
- Calculates p95 latency
- Reads plain text logs from disk

## Run

```bash
node src/cli.mjs samples/access.log
```

## Test

```bash
npm test
```
