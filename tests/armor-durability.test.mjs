import test from "node:test";
import assert from "node:assert/strict";

test("normal armor durability max derives from rating", async () => {
  const { normalizeArmorDurabilityForRating } = await import("../src/modules/mwd/personal-damage.js");

  assert.deepEqual(
    normalizeArmorDurabilityForRating(8, { current: 99, max: 99 }),
    { current: 8, max: 8 }
  );
  assert.deepEqual(
    normalizeArmorDurabilityForRating(8, { current: 0, max: 0 }),
    { current: 8, max: 8 }
  );
});

test("normal armor durability preserves runtime damage", async () => {
  const { normalizeArmorDurabilityForRating } = await import("../src/modules/mwd/personal-damage.js");

  assert.deepEqual(
    normalizeArmorDurabilityForRating(8, { current: 5, max: 8 }),
    { current: 5, max: 8 }
  );
  assert.deepEqual(
    normalizeArmorDurabilityForRating(8, { current: 0, max: 8 }),
    { current: 0, max: 8 }
  );
});

test("rating edits refill only armor that was already full", async () => {
  const { normalizeArmorDurabilityForRating } = await import("../src/modules/mwd/personal-damage.js");

  assert.deepEqual(
    normalizeArmorDurabilityForRating(10, { current: 8, max: 8 }, {
      previousRating: 8,
      previousDurability: { current: 8, max: 8 },
      ratingChanged: true,
      currentChanged: false,
    }),
    { current: 10, max: 10 }
  );
  assert.deepEqual(
    normalizeArmorDurabilityForRating(10, { current: 4, max: 8 }, {
      previousRating: 8,
      previousDurability: { current: 4, max: 8 },
      ratingChanged: true,
      currentChanged: false,
    }),
    { current: 4, max: 10 }
  );
});
