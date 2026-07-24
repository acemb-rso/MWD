import test from "node:test";
import assert from "node:assert/strict";

const { buildSkillDisplay } = await import("../src/modules/mwd/skills.js");

function allRows(display) {
  return [...(display.left ?? []), ...(display.right ?? [])];
}

function makeSystem() {
  return {
    attributes: {
      strength: { value: 3 },
      reflexes: { value: 4 },
      intelligence: { value: 2 },
      guts: { value: 2 },
      charisma: { value: 2 },
    },
    skills: {
      athletics: { rating: 0, bonus: 0, specializations: ["running"] },
      firearms: { rating: 0, bonus: 0, specializations: [] },
      gunnery: { rating: 1, bonus: 0, specializations: [] },
      perception: { rating: 0, bonus: 1, specializations: [] },
      science: { rating: 0, bonus: 0, specializations: [] },
    },
  };
}

test("skill display can hide skills that only roll their linked attribute", () => {
  const rows = allRows(buildSkillDisplay(makeSystem(), {
    bonusBySkill: { firearms: 1 },
    hideStatOnly: true,
  }));
  const codes = rows.map(row => row.code);

  assert.equal(codes.includes("science"), false);
  assert.equal(codes.includes("athletics"), true);
  assert.equal(codes.includes("firearms"), true);
  assert.equal(codes.includes("gunnery"), true);
  assert.equal(codes.includes("perception"), true);
});

test("skill display shows stat-only skills by default", () => {
  const rows = allRows(buildSkillDisplay(makeSystem()));
  assert.equal(rows.some(row => row.code === "science"), true);
});
