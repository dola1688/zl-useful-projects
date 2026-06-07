# ZL Useful Projects

A GitHub portfolio monorepo with practical frontend tools, JavaScript practice modules, a static dashboard, and a small Node.js mock API.

## Main App

The repository root contains a GitHub Pages-ready browser toolkit:

- Material Estimator: calculate sheet area, waste, labor, and totals.
- Quote Builder: prepare a clean customer-facing quote summary.
- Work Tracker: manage lightweight project tasks in local browser storage.

Open `index.html` in a browser. No build step is required.

## More Projects

### `projects/js-algorithm-lab`

Readable JavaScript implementations for algorithms and utilities:

- Binary search
- Deep clone
- Event emitter
- LRU cache
- Debounce and throttle helpers

Run:

```bash
cd projects/js-algorithm-lab
node test/run-tests.mjs
```

### `projects/data-dashboard-starter`

A responsive dashboard starter with KPI cards, a canvas chart, and a filterable table.

Run by opening `projects/data-dashboard-starter/index.html` in a browser.

### `projects/api-mock-server`

A dependency-free Node.js mock API for frontend demos and integration practice.

Run:

```bash
cd projects/api-mock-server
node server.mjs
```

## Quality Checks

The root project includes a GitHub Actions workflow that verifies the static files on every push and pull request.

```bash
node scripts/verify-files.mjs
```

## License

MIT
