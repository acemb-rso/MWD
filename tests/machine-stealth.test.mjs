import test from "node:test";
import assert from "node:assert/strict";

import {
  buildMachineStealthModel,
  expireMachineStealthLifecycle,
  getHighEmissionAcquireDicePart,
  getMachineSignatureEmissionModel,
  getStealthCounterModel,
  getStealthDnParts,
  getStealthTrackingPenalty,
  goDarkMachineSignature,
  revealMachineSignature,
  setMachineTransientEmission,
} from "../src/modules/mwd/machine-stealth.js";
import { StealthEmissionAcquireProvider } from "../src/modules/modifiers/providers/stealth-emission-acquire.js";

function setPath(target, path, value) {
  const parts = String(path ?? "").split(".").filter(Boolean);
  const last = parts.pop();
  let current = target;
  for (const part of parts) {
    current[part] ??= {};
    current = current[part];
  }
  current[last] = value;
}

function machine({
  stealth = {},
  items = [],
  statuses = [],
  flags = {},
} = {}) {
  const actor = {
    type: "battlemech",
    name: "Stealth Machine",
    statuses: new Set(statuses),
    effects: statuses.map(statusId => ({
      id: `effect-${statusId}`,
      statuses: new Set([statusId]),
      flags: {},
      async update(update) {
        for (const [path, value] of Object.entries(update)) setPath(this, path, value);
      },
    })),
    items,
    flags,
    system: {
      mwd: {
        stealth: {
          enabled: false,
          rating: 0,
          mode: "passive",
          revealedUntil: null,
          detectionCap: "",
          signature: "medium",
          counteredBy: ["activeProbe", "tag", "narc", "c3", "visualClose"],
          notes: "",
          ...stealth,
        },
      },
    },
    getFlag(scope, key) {
      return this.flags?.[scope]?.[key];
    },
    async setFlag(scope, key, value) {
      this.flags ??= {};
      this.flags[scope] ??= {};
      this.flags[scope][key] = value;
      return value;
    },
    async update(update) {
      for (const [path, value] of Object.entries(update)) setPath(this, path, value);
    },
    async toggleStatusEffect(statusId, { active } = {}) {
      if (active) {
        this.statuses.add(statusId);
        if (!this.effects.find(effect => effect.statuses?.has?.(statusId))) {
          this.effects.push({
            id: `effect-${statusId}`,
            statuses: new Set([statusId]),
            flags: {},
            async update(update) {
              for (const [path, value] of Object.entries(update)) setPath(this, path, value);
            },
          });
        }
      } else {
        this.statuses.delete(statusId);
        this.effects = this.effects.filter(effect => !effect.statuses?.has?.(statusId));
      }
    },
  };
  return actor;
}

function assetModule({
  id = "module",
  name = "Asset Module",
  tags = [],
  capabilities = [],
  stealthProfile = null,
  rules = [],
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
      rules,
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

test("reveal lifecycle reduces effective stealth and expires", async () => {
  const actor = machine({ stealth: { enabled: true, rating: 2 } });

  await revealMachineSignature(actor, { reason: "weaponAttack", round: 4, turn: 2 });
  const revealed = buildMachineStealthModel(actor);

  assert.equal(revealed.revealed, true);
  assert.equal(revealed.revealPenalty, 1);
  assert.equal(revealed.counterableRating, 1);
  assert.equal(revealed.effectiveRating, 1);
  assert.equal(actor.statuses.has("signatureRevealed"), true);

  await expireMachineStealthLifecycle(actor, { timing: "startActivation" });
  const expired = buildMachineStealthModel(actor);

  assert.equal(expired.revealed, false);
  assert.equal(expired.effectiveRating, 2);
  assert.equal(actor.statuses.has("signatureRevealed"), false);
});

test("signature mapping separates low stealth from high emission", () => {
  const low = buildMachineStealthModel(machine({
    stealth: { enabled: true, rating: 0, signature: "low" },
  }));
  assert.equal(low.contributionRating, 1);
  assert.equal(low.effectiveRating, 1);

  const high = buildMachineStealthModel(machine({
    stealth: { enabled: true, rating: 2, signature: "high" },
  }));
  assert.equal(high.contributionRating, 0);
  assert.equal(high.emission.effectiveEmissionRating, 1);
  assert.equal(high.counterableRating, 2);
  assert.equal(high.effectiveRating, 1);
});

test("emission model separates authored transient and fallback status sources", async () => {
  const actor = machine({
    stealth: { enabled: true, rating: 2 },
    items: [
      assetModule({
        id: "thermal-bank",
        name: "Thermal Bank",
        rules: [{
          id: "thermal-bank-emission",
          label: "Thermal Bank High Emission",
          phase: "assetModuleEffect",
          outputs: [{
            type: "derivedStatus",
            id: "thermal-bank-emission.highEmission",
            label: "Thermal Bank",
            key: "highEmission",
            value: 1,
          }],
        }],
      }),
    ],
  });
  actor.statuses.add("highEmission");

  await setMachineTransientEmission(actor, { rating: 1, reason: "activeProbe" });
  const emission = getMachineSignatureEmissionModel(actor);

  assert.equal(emission.authoredEmissionRating, 1);
  assert.equal(emission.transientEmissionRating, 1);
  assert.equal(emission.statusEmissionRating, 0);
  assert.equal(emission.effectiveEmissionRating, 2);
});

test("high emission counters stealth and grants acquire dice without changing DN parts", () => {
  const attacker = machine();
  const target = machine({
    stealth: { enabled: true, rating: 2, signature: "high" },
  });

  const counter = getStealthCounterModel(attacker, target);
  assert.equal(counter.parts.some(part => part.id === "stealth.counter.highEmission" && part.value === -1), true);

  const dnParts = getStealthDnParts(attacker, target);
  assert.equal(dnParts.find(part => part.id === "target.stealth")?.value, 2);
  assert.equal(dnParts.find(part => part.id === "stealth.counter.highEmission")?.value, -1);

  const attackPart = getStealthTrackingPenalty(attacker, target);
  assert.equal(attackPart.value, -1);

  const acquirePart = getHighEmissionAcquireDicePart(attacker, target);
  assert.equal(acquirePart.value, 1);
});

test("high emission acquire provider emits target dice bonus", () => {
  const provider = new StealthEmissionAcquireProvider();
  const attacker = machine();
  const target = machine({
    stealth: { enabled: true, rating: 1, signature: "high" },
  });

  const mods = provider.collect({
    actor: attacker,
    payload: { intent: "acquire" },
    resolved: { intent: "acquire", acquire: { targetActor: target } },
  });

  assert.equal(mods.length, 1);
  assert.equal(mods[0].id, "acquire.highEmission");
  assert.equal(mods[0].value, 1);
});

test("duplicate high emission sources only count once per source", () => {
  const target = machine({
    items: [
      assetModule({
        id: "duplicate-emitter",
        name: "Duplicate Emitter",
        tags: ["highEmission"],
        rules: [{
          id: "duplicate-emitter-emission",
          label: "Duplicate Emitter High Emission",
          phase: "assetModuleEffect",
          outputs: [{
            type: "derivedStatus",
            id: "duplicate-emitter-emission.highEmission",
            label: "Duplicate Emitter",
            key: "highEmission",
            value: 1,
          }],
        }],
      }),
    ],
  });

  const emission = getMachineSignatureEmissionModel(target);
  assert.equal(emission.authoredEmissionRating, 1);
  assert.equal(emission.parts.length, 1);
});

test("go dark clears system-owned lifecycle state but not authored or manual emission", async () => {
  const actor = machine({
    stealth: { enabled: true, rating: 2, mode: "active" },
    statuses: ["highEmission"],
    items: [
      assetModule({
        id: "authored-emitter",
        name: "Authored Emitter",
        rules: [{
          id: "authored-emitter-emission",
          label: "Authored Emitter High Emission",
          phase: "assetModuleEffect",
          outputs: [{
            type: "derivedStatus",
            id: "authored-emitter-emission.highEmission",
            label: "Authored Emitter",
            key: "highEmission",
            value: 1,
          }],
        }],
      }),
    ],
  });

  await revealMachineSignature(actor, { reason: "weaponAttack" });
  await setMachineTransientEmission(actor, { rating: 1, reason: "activeProbe" });
  await goDarkMachineSignature(actor);

  const model = buildMachineStealthModel(actor);
  assert.equal(model.revealed, false);
  assert.equal(model.mode, "passive");
  assert.equal(model.emission.authoredEmissionRating, 1);
  assert.equal(model.emission.transientEmissionRating, 0);
  assert.equal(actor.statuses.has("highEmission"), false);

  const manual = machine({
    stealth: { enabled: true, rating: 2 },
    statuses: ["highEmission"],
  });
  await goDarkMachineSignature(manual);
  assert.equal(manual.statuses.has("highEmission"), true);
});

test("go dark does not restore suppressed stealth", async () => {
  const actor = machine({
    stealth: { enabled: true, rating: 2, mode: "suppressed" },
  });

  await revealMachineSignature(actor);
  await goDarkMachineSignature(actor);
  const model = buildMachineStealthModel(actor);

  assert.equal(model.mode, "suppressed");
  assert.equal(model.effectiveRating, 0);
});
