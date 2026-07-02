import assert from "node:assert/strict";
import test from "node:test";
import { calculateItems, formatRange, normalizeCount } from "../src/calculator.js";
import { ITEMS, SOURCES } from "../src/items.js";

test("normalizes unusable counts to zero", () => {
  assert.equal(normalizeCount(""), 0);
  assert.equal(normalizeCount("-4"), 0);
  assert.equal(normalizeCount("abc"), 0);
  assert.equal(normalizeCount("3.8"), 3);
});

test("calculates fixed and ranged item totals", () => {
  const items = ITEMS.filter((item) => ["premium-gift-box", "intimacy-case"].includes(item.id));
  const result = calculateItems(items, {
    "premium-gift-box": 3,
    "intimacy-case": 2
  });

  assert.equal(result.totalCount, 5);
  assert.equal(result.min, 23);
  assert.equal(result.max, 115);
});

test("keeps intimacy and attraction data separately calculable", () => {
  const intimacy = calculateItems(
    ITEMS.filter((item) => item.stat === "intimacy"),
    { "intimacy-case": 2 }
  );
  const attraction = calculateItems(
    ITEMS.filter((item) => item.stat === "attraction"),
    { "charm-bottle": 3 }
  );

  assert.deepEqual({ min: intimacy.min, max: intimacy.max }, { min: 8, max: 100 });
  assert.deepEqual({ min: attraction.min, max: attraction.max }, { min: 15, max: 24 });
});

test("formats ranges compactly", () => {
  assert.equal(formatRange(5, 5), "5");
  assert.equal(formatRange(1000, 2500), "1,000-2,500");
});

test("item data is complete and source-backed", () => {
  assert.equal(ITEMS.length, 20);
  assert.equal(new Set(ITEMS.map((item) => item.id)).size, ITEMS.length);
  assert.equal(SOURCES.intimacy, "https://gameofvampirestwilightsun.fandom.com/wiki/Intimacy_Items");
  assert.equal(SOURCES.attraction, "https://gameofvampirestwilightsun.fandom.com/wiki/Attraction_Items");

  for (const item of ITEMS) {
    assert.ok(item.name);
    assert.ok(item.sourceUrl);
    assert.ok(item.min >= 0);
    assert.ok(item.max >= item.min);
    assert.ok(["intimacy", "attraction"].includes(item.stat));
  }
});
