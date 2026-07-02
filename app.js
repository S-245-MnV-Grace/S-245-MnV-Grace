import { calculateItems, formatRange, normalizeCount } from "./calculator.js";
import { ITEMS } from "./items.js";

const STORAGE_KEY = "gov-item-range-calculator";
const groupsRoot = document.querySelector("#item-groups");
const summaryRange = document.querySelector("#summary-range");
const summaryCount = document.querySelector("#summary-count");
const summaryStatLabel = document.querySelector("#summary-stat-label");
const copyButton = document.querySelector("#copy-summary");
const resetButton = document.querySelector("#reset-current");
const modeButtons = [...document.querySelectorAll("[data-mode]")];

let activeMode = "intimacy";
let savedCounts = loadCounts();

function loadCounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function saveCounts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCounts));
}

function getModeItems() {
  return ITEMS.filter((item) => item.stat === activeMode);
}

function groupItems(items) {
  return items.reduce((groups, item) => {
    if (!groups.has(item.group)) {
      groups.set(item.group, []);
    }
    groups.get(item.group).push(item);
    return groups;
  }, new Map());
}

function getCount(itemId) {
  return normalizeCount(savedCounts[itemId]);
}

function setMode(mode) {
  activeMode = mode;
  modeButtons.forEach((button) => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  render();
}

function render() {
  const items = getModeItems();
  groupsRoot.replaceChildren(...renderGroups(items));
  updateSummary();
}

function renderGroups(items) {
  return [...groupItems(items)].map(([groupName, groupItemsList]) => {
    const section = document.createElement("section");
    section.className = "group";
    section.setAttribute("aria-labelledby", `${slug(groupName)}-title`);

    const header = document.createElement("div");
    header.className = "group-title";
    header.innerHTML = `
      <h2 id="${slug(groupName)}-title">${groupName}</h2>
      <span>${describeGroup(groupItemsList)}</span>
    `;

    const list = document.createElement("div");
    list.className = "items";
    list.append(...groupItemsList.map(renderItemRow));

    section.append(header, list);
    return section;
  });
}

function renderItemRow(item) {
  const row = document.createElement("article");
  row.className = "item-row";
  row.dataset.itemId = item.id;
  const countValue = getCount(item.id);

  const art = item.imageUrl
    ? `<img src="${item.imageUrl}" alt="">`
    : `<span class="fallback-mark" aria-hidden="true"></span>`;

  row.innerHTML = `
    <div class="item-main">
      <div class="item-art" data-family="${item.group}" aria-hidden="true">${art}</div>
      <div class="item-copy">
        <span class="item-name">${item.name}</span>
        <span class="item-value">${formatRange(item.min, item.max)} ${labelForStat(item.stat)}${item.targetType === "random" ? " to random Lover" : ""}</span>
      </div>
    </div>
    <div class="count-field">
      <label for="${item.id}-count">Count</label>
      <input id="${item.id}-count" inputmode="numeric" pattern="[0-9]*" min="0" step="1" type="number" value="${countValue || ""}" data-count-for="${item.id}">
    </div>
    <div class="subtotal" aria-live="polite">
      <span>Subtotal</span>
      <strong data-subtotal-for="${item.id}">0</strong>
    </div>
  `;

  row.querySelector("input").addEventListener("input", (event) => {
    savedCounts[item.id] = normalizeCount(event.currentTarget.value);
    event.currentTarget.value = savedCounts[item.id] || "";
    saveCounts();
    updateSummary();
  });

  return row;
}

function updateSummary() {
  const items = getModeItems();
  const summary = calculateItems(items, savedCounts);
  const statLabel = labelForStat(activeMode);

  summaryStatLabel.textContent = `${statLabel} range`;
  summaryRange.textContent = formatRange(summary.min, summary.max);
  summaryCount.textContent = summary.totalCount.toLocaleString();

  summary.rows.forEach((row) => {
    const subtotal = document.querySelector(`[data-subtotal-for="${row.item.id}"]`);
    if (subtotal) {
      subtotal.textContent = formatRange(row.min, row.max);
    }
  });
}

function copyCurrentSummary() {
  const items = getModeItems();
  const summary = calculateItems(items, savedCounts);
  const statLabel = labelForStat(activeMode);
  const enteredRows = summary.rows.filter((row) => row.count > 0);
  const lines = [
    `Game of Vampires ${statLabel} range: ${formatRange(summary.min, summary.max)}`,
    `Items entered: ${summary.totalCount}`,
    ...enteredRows.map((row) => `${row.item.name} x${row.count}: ${formatRange(row.min, row.max)}`)
  ];

  navigator.clipboard.writeText(lines.join("\n")).then(
    () => showToast("Summary copied."),
    () => showToast("Copy failed.")
  );
}

function resetCurrent() {
  getModeItems().forEach((item) => {
    delete savedCounts[item.id];
  });
  saveCounts();
  render();
}

function showToast(message) {
  document.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  window.setTimeout(() => toast.remove(), 2400);
}

function labelForStat(stat) {
  return stat === "intimacy" ? "Intimacy" : "Attraction";
}

function describeGroup(items) {
  const randomCount = items.filter((item) => item.targetType === "random").length;
  return randomCount === items.length ? "Random Lover" : "Chosen Lover";
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});
copyButton.addEventListener("click", copyCurrentSummary);
resetButton.addEventListener("click", resetCurrent);

render();
