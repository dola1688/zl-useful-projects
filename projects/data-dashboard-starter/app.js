const orders = [
  { customer: "Northwind Glass", status: "Paid", total: 12400, month: "Jan" },
  { customer: "Blue River Studio", status: "Pending", total: 8200, month: "Feb" },
  { customer: "Evergreen Homes", status: "Paid", total: 15600, month: "Mar" },
  { customer: "Metro Build", status: "Overdue", total: 6100, month: "Apr" },
  { customer: "Sunrise Design", status: "Paid", total: 9900, month: "May" },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function renderMetrics(items) {
  const total = items.reduce((sum, order) => sum + order.total, 0);
  document.querySelector("#revenue").textContent = currency.format(total);
  document.querySelector("#orders").textContent = String(items.length);
  document.querySelector("#average").textContent = currency.format(items.length ? total / items.length : 0);
}

function renderRows(items) {
  document.querySelector("#rows").innerHTML = items.map((order) => `
    <tr>
      <td>${order.customer}</td>
      <td><span class="status ${order.status}">${order.status}</span></td>
      <td>${currency.format(order.total)}</td>
    </tr>
  `).join("");
}

function drawChart(items) {
  const canvas = document.querySelector("#chart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const max = Math.max(...items.map((order) => order.total), 1);
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#dbe3ef";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = 30 + i * 58;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(width - 20, y);
    ctx.stroke();
  }
  items.forEach((order, index) => {
    const x = 70 + index * 160;
    const barHeight = (order.total / max) * 220;
    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(x, height - 48 - barHeight, 54, barHeight);
    ctx.fillStyle = "#607086";
    ctx.fillText(order.month, x + 14, height - 22);
  });
}

function render() {
  const keyword = document.querySelector("#filter").value.trim().toLowerCase();
  const filtered = orders.filter((order) => order.customer.toLowerCase().includes(keyword) || order.status.toLowerCase().includes(keyword));
  renderMetrics(filtered);
  renderRows(filtered);
  drawChart(filtered);
}

document.querySelector("#filter").addEventListener("input", render);
render();
