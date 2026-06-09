import test from "node:test";
import assert from "node:assert/strict";

import {
  buildMachineStealthModel,
  getStealthCounterModel,
  getStealthDnParts,
  getStealthTrackingPenalty,
} from "../src/modules/mwd/machine-stealth.js";

function machine({
  stealth = {},
  items = [],
  statuses = [],
} = {}) {
  return {
    type: "battlemech",
    name: "Stealth Machine",
    statuses: new Set(statuses),
    items,
    system: {
      mwd: {
        stealth: {
          enabled: false,
          rating: 0,
          mode: "passive",
          revealedUntil: null,
          detectionCap: "",
          counteredBy: ["activeProbe", "tag", "narc", "c3", "visualClose"],
          notes: "",
          ...stealth,
        },
      },
    },
  };
}

function assetModule({
  id = "module",
  name = "Asset Module",
  tags = [],
  capabilities = [],
  stealthProfile = null,
  activation = { mode: "passive", active: false },
} = {}) {
  return {
    id,
    name,
    type: "assetModule",
    canonicalType: "assetModule",
    system: {
      activation,
      tags,
      capabilities,
      targeting: stealthProfile ? { stealthProfile } : {},
    },
  };
}

test("machine stealth model uses defaults and clamps effective rating", () => {
  const disabled = buildMachineStealthModel(machine());
  assert.equal(disabled.enabled, false);
  assert.equal(disabled.effectiveRating, 0);

  const clamped = buildMachineStealthModel(machine({
    stealth: { enabled: true, rating: 8 },
  }));
  assert.equal(clamped.baseRating, 8);
  assert.equal(clamped.effectiveRating, 3);
});

test("machine stealth model includes ready module contributions", () => {
  const actor = machine({
    items: [
      assetModule({
        id: "stealth-x",
        name: "Stealth X",
        stealthProfile: { ratingBonus: 2, tags: ["electronic"] },
      }),
    ],
  });

  const model = buildMachineStealthModel(actor);
  assert.equal(model.baseRating, 0);
  assert.equal(model.contributionRating, 2);
  assert.equal(model.effectiveRating, 2);
  assert.equal(model.parts.some(part => part.id === "stealth.module.stealth-x"), true);
});

test("requiresActiveMode gates module contribution on machine stealth mode", () => {
  const stealthModule = assetModule({
    id: "active-stealth",
    stealthProfile: { ratingBonus: 2, requiresActiveMode: true },
  });

  const passive = buildMachineStealthModel(machine({
    stealth: { mode: "passive" },
    items: [stealthModule],
  }));
  assert.equal(passive.effectiveRating, 0);

  const active = buildMachineStealthModel(machine({
    stealth: { mode: "active" },
    items: [stealthModule],
  }));
  assert.equal(active.effectiveRating, 2);
});

test("stealth counter model reports reductions and bypasses", () => {
  const attacker = machine({
    items: [
      assetModule({ id: "probe", name: "Active Probe", tags: ["activeProbe"] }),
      assetModule({ id: "c3", name: "C3 Network", tags: ["c3"] }),
    ],
  });
  const target = machine({ stealth: { enabled: true, rating: 1 } });

  const counter = getStealthCounterModel(attacker, target);
  assert.equal(counter.bypass, false);
  assert.equal(counter.value, 2);
  assert.deepEqual(counter.parts.map(part => part.id), ["stealth.counter.activeProbe", "stealth.counter.c3"]);

  const tagged = getStealthCounterModel(attacker, machine({ statuses: ["tagged"] }));
  assert.equal(tagged.bypass, true);
  assert.equal(tagged.parts[0].value, "bypass");
});

test("stealth DN and attack parts cap counters at the stealth component", () => {
  const attacker = machine({
    items: [
      assetModule({ id: "probe", name: "Active Probe", tags: ["activeProbe"] }),
      assetModule({ id: "c3", name: "C3 Network", tags: ["c3"] }),
    ],
  });
  const target = machine({ stealth: { enabled: true, rating: 1 } });

  const dnParts = getStealthDnParts(attacker, target);
  assert.equal(dnParts.reduce((sum, part) => sum + Number(part.value ?? 0), 0), 0);
  assert.equal(getStealthTrackingPenalty(attacker, target), null);
});
