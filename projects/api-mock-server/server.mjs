import { createServer } from "node:http";

const products = [
  { id: 1, name: "Clear Glass Panel", price: 128, stock: 42 },
  { id: 2, name: "Aluminum Frame", price: 76, stock: 18 },
  { id: 3, name: "Sealant Kit", price: 24, stock: 80 },
];

const orders = [
  { id: 101, customer: "Northwind Glass", total: 2380, status: "paid" },
  { id: 102, customer: "Metro Build", total: 1540, status: "pending" },
];

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body ? JSON.parse(body) : {}));
    request.on("error", reject);
  });
}

export function createApp() {
  return createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");

    if (request.method === "OPTIONS") return sendJson(response, 204, {});
    if (request.method === "GET" && url.pathname === "/health") {
      return sendJson(response, 200, { ok: true, service: "api-mock-server" });
    }
    if (request.method === "GET" && url.pathname === "/api/products") {
      return sendJson(response, 200, { data: products });
    }
    if (request.method === "GET" && url.pathname === "/api/orders") {
      return sendJson(response, 200, { data: orders });
    }
    if (request.method === "POST" && url.pathname === "/api/orders") {
      const body = await readBody(request);
      const order = { id: Date.now(), status: "pending", ...body };
      orders.push(order);
      return sendJson(response, 201, { data: order });
    }

    sendJson(response, 404, { error: "Not found" });
  });
}

if (import.meta.url === `file://${process.argv[1].replaceAll("\\", "/")}`) {
  createApp().listen(3000, "127.0.0.1", () => {
    console.log("API mock server running at http://127.0.0.1:3000");
  });
}
