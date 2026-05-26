import test from "node:test";
import assert from "node:assert/strict";

import { getAurasAffecting } from "../src/modules/mwd/asset-module-auras.js";
import {
  applyAssetModuleSpend,
  previewAssetModuleSpend,
  resetAssetModuleUses,
} from "../src/modules/mwd/asset-module-state.js";
import { registerAssetModuleRuntimeHandlers } from "../src/modules/mwd/asset-module-runtime-handlers.js";
import { previewMachineAttackDamage } from "../src/modules/mwd/critical-hits.js";
import { buildBattlemechHeatModel, recordBattlemechAttackHeat, resolveBattlemechHeatActivation } from "../src/modules/mwd/machine-heat.js";

function withHooks(handlers, fn) {
  const previous = globalThis.Hooks;
  globalThis.Hooks = {
    call(name, context) {
      for (const handler of handlers[name] ?? []) handler(context);
      return true;
    },
  };
  return Promise.resolve()
    .then(fn)
    .finally(() => {
      if (previous === undefined) delete globalThis.Hooks;
      else globalThis.Hooks = previous;
    });
}

function withRegisteredRuntimeHandlers(fn) {
  const previous = globalThis.Hooks;
  const handlers = {};
  globalThis.Hooks = {
    on(name, handler) {
      handlers[name] ??= [];
      handlers[name].push(handler);
    },
    call(name, context) {
      for (const handler of handlers[name] ?? []) handler(context);
      return true;
    },
  };
  registerAssetModuleRuntimeHandlers();
  return Promise.resolve()
    .then(fn)
    .finally(() => {
      if (previous === undefined) delete globalThis.Hooks;
      else globalThis.Hooks = previous;
    });
}

function makeFlagActor(initial = {}) {
  let flags = JSON.parse(JSON.stringify(initial));
  return {
    getFlag(scope, key) {
      return scope === "mwd" && key === "assetModuleState" ? flags : null;
    },
    async setFlag(scope, key, value) {
      if (scope !== "mwd" || key !== "assetModuleState") throw new Error("unexpected flag write");
      flags = value;
    },
    get flags() {
      return flags;
    },
  };
}

test("asset module charge preview does not spend and apply commits once", async () => {
  const actor = makeFlagActor({
    "Item.module": {
      charges: { current: 1, max: 1 },
      uses: { activation: { probe: 0 } },
    },
  });

  const preview = previewAssetModuleSpend(actor, "Item.module", {
    charges: 1,
    useScope: "activation",
    useId: "probe",
    useMax: 1,
  });
  assert.equal(preview.ok, true);
  assert.equal(actor.flags["Item.module"].charges.current, 1);

  const committed = await applyAssetModuleSpend(actor, "Item.module", {
    charges: 1,
    useScope: "activation",
    useId: "probe",
    useMax: 1,
  });
  assert.equal(committed.ok, true);
  assert.equal(actor.flags["Item.module"].charges.current, 0);
  assert.equal(actor.flags["Item.module"].uses.activation.probe, 1);

  const blocked = previewAssetModuleSpend(actor, "Item.module", {
    charges: 1,
    useScope: "activation",
    useId: "probe",
    useMax: 1,
  });
  assert.equal(blocked.ok, false);

  await resetAssetModuleUses(actor, { scope: "activation" });
  assert.equal(actor.flags["Item.module"].uses.activation, undefined);
});

test("heat profile hooks can contribute dissipation without replacing heat flow", () => withHooks({
  "mwd.collectHeatProfile": [
    context => {
      context.dissipationModifier += 2;
    },
  ],
}, () => {
  const model = buildBattlemechHeatModel({
    monitors: { heat: { value: 4, max: 10 } },
    hybrid: { heat: { dissipation: 3 } },
    mwd: {
      heat: { pendingGenerated: 0, thresholds: { runningHot: 3, overheated: 5, shutdown: 7 } },
      crits: [],
      locations: {},
    },
  });
  assert.equal(model.dissipation, 5);
  assert.equal(model.effectiveDissipation, 5);
}));

test("heat generated hook mutates the contribution packet before commit callers use it", () => withHooks({
  "mwd.beforeHeatGenerated": [
    context => {
      context.contribution.total += 1;
    },
  ],
}, async () => {
  const actor = {
    type: "battlemech",
    system: {
      mwd: { heat: { pendingGenerated: 0 }, crits: [] },
    },
    items: new Map([["laser", { system: { heat: 2, damageType: "energy" } }]]),
    async update(update) {
      this.system.mwd.heat.pendingGenerated = update["system.mwd.heat.pendingGenerated"];
    },
  };
  const result = await recordBattlemechAttackHeat(actor, { weaponIds: ["laser"] });
  assert.equal(result.contribution.total, 3);
  assert.equal(result.pendingGenerated, 3);
}));

test("damage preview hook reduces incoming machine damage before HarmEngine apply data", () => withHooks({
  "mwd.beforeMachineDamagePreview": [
    context => {
      context.adjustedIncoming = Math.max(0, context.damageIncoming - 2);
      context.contributions.push({ source: "Shield", value: -2 });
    },
  ],
}, () => {
  const actor = {
    type: "battlemech",
    name: "Target",
    system: {
      monitors: {
        armor: { value: 3, max: 3 },
        structure: { value: 5, max: 5 },
      },
      mwd: { locations: {} },
    },
  };
  const preview = previewMachineAttackDamage({ actor, payload: { damage: 5 } });
  assert.equal(preview.damageIncoming, 5);
  assert.equal(preview.adjustedIncoming, 3);
  assert.equal(preview.machine.armorAbsorbed, 3);
  assert.equal(preview.machine.structureDamage, 0);
  assert.deepEqual(preview.assetModuleContributions, [{ source: "Shield", value: -2 }]);
}));

test("registered runtime damage packets reduce machine damage preview generically", () => withRegisteredRuntimeHandlers(() => {
  const actor = {
    type: "battlemech",
    name: "Target",
    items: [{
      id: "shield",
      type: "assetModule",
      system: {
        enabled: true,
        runtime: {
          packets: [{
            id: "shield-block",
            kind: "incomingDamageReduction",
            appliesTo: ["kinetic"],
            value: 2,
          }],
        },
      },
    }],
    system: {
      monitors: {
        armor: { value: 1, max: 1 },
        structure: { value: 5, max: 5 },
      },
      mwd: { locations: {} },
    },
  };
  const preview = previewMachineAttackDamage({ actor, payload: { damage: 4, damageType: "kinetic" } });
  assert.equal(preview.adjustedIncoming, 2);
  assert.equal(preview.machine.structureDamage, 1);
  assert.equal(preview.assetModuleContributions[0].sourceName, "Asset Module");
}));

test("registered runtime heat packets can adjust activation heat before dissipation", () => withRegisteredRuntimeHandlers(() => {
  const result = resolveBattlemechHeatActivation({
    type: "battlemech",
    items: [{
      id: "coolant",
      type: "assetModule",
      system: {
        enabled: true,
        runtime: {
          packets: [{
            id: "coolant-burst",
            kind: "currentHeatAdjustment",
            timing: "dissipation",
            value: -2,
          }],
        },
      },
    }],
    system: {
      monitors: { heat: { value: 4, max: 10 } },
      hybrid: { heat: { dissipation: 1 } },
      mwd: {
        heat: { pendingGenerated: 3, thresholds: { runningHot: 3, overheated: 5, shutdown: 7 } },
        crits: [],
        locations: {},
      },
    },
  });
  assert.equal(result.generated, 1);
  assert.equal(result.newHeat, 4);
}));

test("aura resolver ignores out-of-radius and wrong allegiance targets", () => {
  const sourceActor = {
    type: "battlemech",
    items: [{
      id: "module-1",
      type: "assetModule",
      system: {
        enabled: true,
        runtime: {
          packets: [{
            id: "guardian-aura",
            kind: "aura",
            radius: 180,
            allegiance: "ally",
            grants: [{ kind: "ewState", state: "ecmShrouded" }],
          }],
        },
      },
    }],
  };
  const allyActor = { type: "battlemech", items: [] };
  const enemyActor = { type: "battlemech", items: [] };
  const sourceToken = { actor: sourceActor, document: { disposition: 1, x: 0, y: 0, width: 1, height: 1 } };
  const allyToken = { actor: allyActor, document: { disposition: 1, x: 90, y: 0, width: 1, height: 1 } };
  const enemyToken = { actor: enemyActor, document: { disposition: -1, x: 90, y: 0, width: 1, height: 1 } };
  const distantAllyToken = { actor: allyActor, document: { disposition: 1, x: 300, y: 0, width: 1, height: 1 } };
  const previousCanvas = globalThis.canvas;
  globalThis.canvas = {
    scene: { grid: { distance: 1 } },
    grid: { size: 1 },
    tokens: { placeables: [sourceToken, allyToken, enemyToken, distantAllyToken] },
  };
  try {
    assert.equal(getAurasAffecting(allyToken, { targetToken: allyToken, sourceTokens: [sourceToken] }).length, 1);
    assert.equal(getAurasAffecting(enemyToken, { targetToken: enemyToken, sourceTokens: [sourceToken] }).length, 0);
    assert.equal(getAurasAffecting(allyActor, { targetToken: distantAllyToken, sourceTokens: [sourceToken] }).length, 0);
  } finally {
    if (previousCanvas === undefined) delete globalThis.canvas;
    else globalThis.canvas = previousCanvas;
  }
});
