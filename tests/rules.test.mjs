import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAppliedSummary,
  commitUsage,
  evaluatePhase,
  normalizeCarrier,
  prepareUsageCommit,
} from "../src/modules/mwd/rules.js";

function actor() {
  const state = { flags: { mwd: {} }, writes: [] };
  return {
    id: "actor-1",
    type: "battlemech",
    flags: state.flags,
    writes: state.writes,
    async setFlag(scope, key, value) {
      this.flags[scope] ??= {};
      this.flags[scope][key] = value;
      this.writes.push({ scope, key, value });
    },
  };
}

test("rule carrier normalization preserves typed output schemas and null limit semantics", () => {
  const carrier = normalizeCarrier({
    rules: [{
      id: "guardian",
      label: "Guardian ECM",
      phase: "ewTargeting",
      selector: { actorTypes: ["battlemech"], tags: ["ew"] },
      requires: [{ fact: "module.active", op: "eq", value: true }],
      outputs: [
        { type: "dicePart", value: 2, tags: ["sensor"] },
        { type: "cqPart", ar: 5, dr: 1 },
        { type: "derivedStatus", key: "ecmShrouded" },
      ],
      limits: { perActivation: null, perRound: 1 },
    }],
  });

  assert.equal(carrier.rules.length, 1);
  assert.deepEqual(carrier.rules[0].limits, { perActivation: null, perRound: 1 });
  assert.equal(carrier.rules[0].outputs[0].type, "dicePart");
  assert.equal(carrier.rules[0].outputs[0].value, 2);
  assert.equal(carrier.rules[0].outputs[1].ar, 5);
  assert.equal(carrier.rules[0].outputs[2].type, "derivedStatus");
});

test("rule normalization preserves character-specific output schemas", () => {
  const carrier = normalizeCarrier({
    rules: [{
      id: "quality-rules",
      label: "Quality Rules",
      sourceType: "quality",
      phase: "activationBudget",
      mode: "optional",
      presentation: { defaultEnabled: false, label: "Use quality?" },
      outputs: [
        { type: "activationBudgetAdjustment", resource: "fa", value: 1 },
        { type: "burnRuleAdjustment", trigger: "extraSA", value: -1, min: 0 },
        { type: "conditionPenaltyAdjustment", track: "physical", value: -1, minPenalty: 0 },
        { type: "edgeEventHook", trigger: "edgeSpentRollFailed", effect: { type: "burnDelta", value: 1 } },
        { type: "creationBudgetAdjustment", budget: "inventoryPoints", value: 2 },
        { type: "personalSpeedAdjustment", value: -2, unit: "meters" },
        { type: "initiativeAdjustment", value: -2, appliesTo: "total" },
        { type: "actionCostAdjustment", actionId: "reduceBurn", resource: "sa", value: 1 },
        { type: "aimBonusAdjustment", value: -1, appliesTo: "fireSolution" },
        { type: "actionEffectAdjustment", actionId: "aim", key: "bonus", value: -1 },
      ],
    }, {
      id: "narrative",
      phase: "characterCreation",
      mode: "narrative",
      enabled: false,
      outputs: [{ type: "creationBudgetAdjustment", budget: "inventoryPoints", value: 2 }],
    }],
  });

  const [rule, narrative] = carrier.rules;
  assert.equal(rule.sourceType, "quality");
  assert.equal(rule.mode, "optional");
  assert.equal(rule.presentation.label, "Use quality?");
  assert.equal(rule.outputs[0].type, "activationBudgetAdjustment");
  assert.equal(rule.outputs[0].phase, "activationBudget");
  assert.equal(rule.outputs[1].trigger, "extraSA");
  assert.equal(rule.outputs[2].minPenalty, 0);
  assert.deepEqual(rule.outputs[3].effect, { type: "burnDelta", value: 1 });
  assert.equal(rule.outputs[4].budget, "inventoryPoints");
  assert.equal(rule.outputs[5].unit, "meters");
  assert.equal(rule.outputs[6].appliesTo, "total");
  assert.equal(rule.outputs[7].resource, "sa");
  assert.equal(rule.outputs[8].appliesTo, "fireSolution");
  assert.equal(rule.outputs[9].key, "bonus");
  assert.equal(narrative.mode, "narrative");
  assert.equal(narrative.enabled, false);
});

test("evaluatePhase emits advisory outputs and disabled reasons without writing state", () => {
  const machine = actor();
  const result = evaluatePhase({
    actor: machine,
    carrierItems: [{
      id: "module-1",
      name: "Guardian ECM",
      system: {
        rules: [{
          id: "guardian",
          label: "Guardian ECM",
          phase: "ewTargeting",
          selector: { actorTypes: ["battlemech"], tags: ["ew"] },
          requires: [{ fact: "module.active", op: "eq", value: true }],
          outputs: [{ type: "derivedStatus", key: "ecmShrouded" }],
        }, {
          id: "disabled",
          label: "Disabled Rule",
          phase: "ewTargeting",
          selector: { tags: ["missing"] },
          outputs: [{ type: "dicePart", value: 99 }],
        }],
      },
    }],
    phase: "ewTargeting",
    facts: {
      actorType: "battlemech",
      tags: ["ew"],
      module: { active: true },
    },
  });

  assert.equal(result.entries.length, 1);
  assert.equal(result.outputs[0].type, "derivedStatus");
  assert.equal(result.outputs[0].key, "ecmShrouded");
  assert.equal(result.disabled.length, 1);
  assert.match(result.disabled[0].reason, /Selector did not match/);
  assert.deepEqual(machine.writes, []);
});

test("limit zero disables while omitted limits are unlimited", () => {
  const machine = actor();
  const result = evaluatePhase({
    actor: machine,
    carrierItems: [{
      id: "module-1",
      name: "Limited Module",
      system: {
        rules: [{
          id: "unlimited",
          phase: "test",
          outputs: [{ type: "dicePart", value: 1 }],
        }, {
          id: "zero",
          phase: "test",
          outputs: [{ type: "dicePart", value: 1 }],
          limits: { perActivation: 0 },
        }],
      },
    }],
    phase: "test",
    facts: {},
  });

  assert.equal(result.entries.some(entry => entry.ruleId === "unlimited"), true);
  assert.equal(result.entries.some(entry => entry.ruleId === "zero"), false);
  assert.match(result.disabled.find(entry => entry.ruleId === "zero").reason, /unavailable/);
});

test("legacy zero-limit traits should migrate to omitted rule limits", () => {
  const migrated = normalizeCarrier({
    rules: [{
      id: "migrated-quality",
      phase: "rollBuild",
      outputs: [{ type: "dicePart", value: 1 }],
      limits: {},
    }],
  });
  const literalZero = normalizeCarrier({
    rules: [{
      id: "literal-zero",
      phase: "rollBuild",
      outputs: [{ type: "dicePart", value: 1 }],
      limits: { perActivation: 0, perRound: 0, perScene: 0 },
    }],
  });

  assert.deepEqual(migrated.rules[0].limits, {});
  assert.deepEqual(literalZero.rules[0].limits, { perActivation: 0, perRound: 0, perScene: 0 });
});

test("disabled rules are reported without advisory outputs", () => {
  const result = evaluatePhase({
    carrierItems: [{
      id: "quality-1",
      name: "Equipped",
      system: {
        rules: [{
          id: "disabled-creation",
          enabled: false,
          phase: "characterCreation",
          mode: "narrative",
          outputs: [{ type: "creationBudgetAdjustment", budget: "inventoryPoints", value: 2 }],
        }],
      },
    }],
    phase: "characterCreation",
    facts: {},
  });

  assert.equal(result.entries.length, 0);
  assert.equal(result.outputs.length, 0);
  assert.match(result.disabled[0].reason, /disabled/);
});

test("usage commits are explicit and carrier-local", async () => {
  const machine = actor();
  const result = evaluatePhase({
    actor: machine,
    carrierItems: [{
      id: "module-1",
      name: "Once Module",
      system: {
        rules: [{
          id: "once",
          phase: "test",
          outputs: [{ type: "dicePart", value: 1 }],
          limits: { perScene: 1 },
        }],
      },
    }],
    phase: "test",
    facts: {},
    runtime: { sceneId: "scene-1" },
  });

  const prepared = prepareUsageCommit({ entries: result.entries });
  assert.equal(prepared.usageMutations.length, 1);
  assert.equal(machine.writes.length, 0);

  await commitUsage({ actor: machine, usageMutations: prepared.usageMutations, runtime: { sceneId: "scene-1" } });
  assert.equal(machine.flags.mwd.ruleUsage.scene["scene-1"]["module-1:once"], 1);
  assert.equal(machine.writes.length, 1);
});

test("buildAppliedSummary returns explainable source rows", () => {
  assert.deepEqual(buildAppliedSummary([
    { label: "Guardian ECM", value: 2, sourceName: "Guardian ECM" },
  ]), [
    { label: "Guardian ECM", value: "2", source: "Guardian ECM" },
  ]);
});
