import assert from "node:assert/strict";
import { createApp } from "./server.mjs";

const server = createApp();
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;

const health = await fetch(`${base}/health`).then((response) => response.json());
assert.equal(health.ok, true);

const products = await fetch(`${base}/api/products`).then((response) => response.json());
assert.equal(products.data.length, 3);

const created = await fetch(`${base}/api/orders`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ customer: "Demo", total: 99 }),
}).then((response) => response.json());
assert.equal(created.data.customer, "Demo");

server.close();
console.log("API tests passed.");
