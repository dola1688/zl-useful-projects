# API Mock Server

A tiny Node.js mock API for frontend practice and demos. It has no external dependencies and exposes JSON endpoints for products, orders, and health checks.

## Run

```bash
node server.mjs
```

Open:

- `http://127.0.0.1:3000/health`
- `http://127.0.0.1:3000/api/products`
- `http://127.0.0.1:3000/api/orders`

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service status |
| GET | `/api/products` | Product list |
| GET | `/api/orders` | Order list |
| POST | `/api/orders` | Create a demo order |
