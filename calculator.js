export function normalizeCount(value) {
  const count = Number.parseInt(String(value ?? "").trim(), 10);
  if (!Number.isFinite(count) || count < 0) {
    return 0;
  }
  return count;
}

export function calculateItems(items, counts) {
  const rows = items.map((item) => {
    const count = normalizeCount(counts[item.id]);
    return {
      item,
      count,
      min: count * item.min,
      max: count * item.max
    };
  });

  return rows.reduce(
    (summary, row) => {
      summary.rows.push(row);
      summary.totalCount += row.count;
      summary.min += row.min;
      summary.max += row.max;
      return summary;
    },
    { rows: [], totalCount: 0, min: 0, max: 0 }
  );
}

export function formatRange(min, max) {
  const formattedMin = min.toLocaleString();
  const formattedMax = max.toLocaleString();
  return min === max ? formattedMin : `${formattedMin}-${formattedMax}`;
}
