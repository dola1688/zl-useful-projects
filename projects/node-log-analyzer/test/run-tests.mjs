import assert from "node:assert/strict";
import { analyzeLog, parseLine } from "../src/analyze.mjs";

assert.deepEqual(parseLine("GET / 200 42ms"), {
  method: "GET",
  path: "/",
  status: 200,
  latencyMs: 42,
});
assert.equal(parseLine("bad line"), null);

const report = analyzeLog("GET / 200 10ms\nPOST /api 500 90ms\nGET / 404 20ms");
assert.equal(report.totalRequests, 3);
assert.equal(report.statusGroups["2xx"], 1);
assert.equal(report.statusGroups["4xx"], 1);
assert.equal(report.statusGroups["5xx"], 1);
assert.equal(report.p95LatencyMs, 90);

console.log("Log analyzer tests passed.");
