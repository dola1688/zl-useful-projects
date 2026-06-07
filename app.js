const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 2,
});

const numberValue = (id) => {
  const value = Number.parseFloat(document.getElementById(id).value);
  return Number.isFinite(value) ? value : 0;
};

const setText = (id, value) => {
  document.getElementById(id).textContent = value;
};

const estimatorDefaults = {
  lengthMm: "1200",
  widthMm: "800",
  quantity: "6",
  priceSqm: "128",
  wastePct: "8",
  laborEach: "18",
};

function calculateEstimate() {
  const area = (numberValue("lengthMm") * numberValue("widthMm") * numberValue("quantity")) / 1000000;
  const material = area * numberValue("priceSqm") * (1 + numberValue("wastePct") / 100);
  const labor = numberValue("quantity") * numberValue("laborEach");
  const total = material + labor;

  setText("areaOut", `${area.toFixed(2)} m2`);
  setText("materialOut", money.format(material));
  setText("laborOut", money.format(labor));
  setText("estimateOut", money.format(total));
  updateQuote(total);
}

function updateQuote(baseTotal = null) {
  const subtotal = baseTotal ?? estimateTotal();
  const tax = subtotal * (numberValue("taxPct") / 100);
  const total = subtotal + tax;
  const lines = [
    `Customer: ${document.getElementById("customer").value}`,
    `Project: ${document.getElementById("projectName").value}`,
    `Delivery: ${document.getElementById("deliveryDate").value || "TBD"}`,
    `Subtotal: ${money.format(subtotal)}`,
    `Tax: ${money.format(tax)}`,
    `Total: ${money.format(total)}`,
    "",
    document.getElementById("quoteNotes").value,
  ];

  document.getElementById("quoteOutput").textContent = lines.join("\n");
}

function estimateTotal() {
  const area = (numberValue("lengthMm") * numberValue("widthMm") * numberValue("quantity")) / 1000000;
  return area * numberValue("priceSqm") * (1 + numberValue("wastePct") / 100) + numberValue("quantity") * numberValue("laborEach");
}

const tasksKey = "zl-project-tasks";
let tasks = JSON.parse(localStorage.getItem(tasksKey) || "[]");

if (tasks.length === 0) {
  tasks = [
    { name: "Confirm customer needs", status: "Done" },
    { name: "Calculate material quantity", status: "Doing" },
    { name: "Schedule delivery time", status: "Todo" },
  ];
}

function saveTasks() {
  localStorage.setItem(tasksKey, JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    const statusClass = task.status === "Done" ? "done" : task.status === "Doing" ? "doing" : "todo";
    item.innerHTML = `
      <span class="task-title">${escapeHtml(task.name)}</span>
      <span class="status-pill ${statusClass}">${task.status}</span>
      <button class="icon-btn" type="button" title="Delete" data-index="${index}">x</button>
    `;
    list.appendChild(item);
  });

  const done = tasks.filter((task) => task.status === "Done").length;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  document.querySelector(".progress-ring").style.setProperty("--progress", `${progress}%`);
  setText("progressOut", `${progress}%`);
  setText("taskStats", `${done} / ${tasks.length} tasks completed`);
  saveTasks();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("is-active"));
    document.querySelectorAll(".workspace").forEach((panel) => panel.classList.remove("is-active"));
    button.classList.add("is-active");
    document.getElementById(button.dataset.tool).classList.add("is-active");
  });
});

Object.keys(estimatorDefaults).forEach((id) => {
  document.getElementById(id).addEventListener("input", calculateEstimate);
});

["customer", "projectName", "deliveryDate", "taxPct", "quoteNotes"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => updateQuote());
});

document.getElementById("resetEstimator").addEventListener("click", () => {
  Object.entries(estimatorDefaults).forEach(([id, value]) => {
    document.getElementById(id).value = value;
  });
  calculateEstimate();
});

document.getElementById("copyQuote").addEventListener("click", async () => {
  await navigator.clipboard.writeText(document.getElementById("quoteOutput").textContent);
});

document.getElementById("addTask").addEventListener("click", () => {
  const name = document.getElementById("taskName").value.trim();
  if (!name) return;
  tasks.push({ name, status: document.getElementById("taskStatus").value });
  document.getElementById("taskName").value = "";
  renderTasks();
});

document.getElementById("taskList").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  tasks.splice(Number(button.dataset.index), 1);
  renderTasks();
});

document.getElementById("deliveryDate").valueAsDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
calculateEstimate();
renderTasks();
