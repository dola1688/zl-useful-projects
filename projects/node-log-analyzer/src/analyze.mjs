export function parseLine(line) {
  const match = line.match(/^(\S+) (\S+) (\d{3}) (\d+)ms$/);
  if (!match) return null;
  return {
    method: match[1],
    path: match[2],
    status: Number(match[3]),
    latencyMs: Number(match[4]),
  };
}

export function analyzeLog(text) {
  const rows = text.split(/\r?\n/).map(parseLine).filter(Boolean);
  const statusGroups = { "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0 };
  const routeStats = new Map();
  const latencies = [];

  for (const row of rows) {
    const group = `${Math.floor(row.status / 100)}xx`;
    if (group in statusGroups) statusGroups[group]++;
    latencies.push(row.latencyMs);

    const key = `${row.method} ${row.path}`;
    const current = routeStats.get(key) ?? { count: 0, totalLatency: 0 };
    current.count++;
    current.totalLatency += row.latencyMs;
    routeStats.set(key, current);
  }

  latencies.sort((a, b) => a - b);
  const p95Index = Math.max(0, Math.ceil(latencies.length * 0.95) - 1);
  const slowRoutes = [...routeStats.entries()]
    .map(([route, stat]) => ({
      route,
      count: stat.count,
      averageLatencyMs: Math.round(stat.totalLatency / stat.count),
    }))
    .sort((a, b) => b.averageLatencyMs - a.averageLatencyMs)
    .slice(0, 5);

  return {
    totalRequests: rows.length,
    statusGroups,
    p95LatencyMs: latencies[p95Index] ?? 0,
    slowRoutes,
  };
}
