import test from "node:test";
import assert from "node:assert/strict";

import { buildCombatAwarenessPreview } from "../src/modules/combat/combat-awareness-preview.js";

function installGlobals({ sourceToken = null, targetToken = null, sourceCombatant = null, targetCombatant = null, distance = 60 } = {}) {
  const combatants = new Map();
  if (sourceToken && sourceCombatant) combatants.set(sourceToken.id, sourceCombatant);
  if (targetToken && targetCombatant) combatants.set(targetToken.id, targetCombatant);

  globalThis.game = {
    user: { targets: targetToken ? new Set([targetToken]) : new Set() },
    combat: { round: 1, combatants },
    system: { grid: { units: "m" } },
  };
  globalThis.canvas = {
    scene: { grid: { units: "m" } },
    grid: { measurePath: () => ({ distance }) },
    tokens: {
      controlled: sourceToken ? [sourceToken] : [],
      placeables: [sourceToken, targetToken].filter(Boolean),
      get: id => [sourceToken, targetToken].find(token => token?.id === id) ?? null,
    },
  };
}

function characterActor({ name = "Character", reflexes = 3, armorDefense = 0 } = {}) {
  return {
    id: `${name}-id`,
    uuid: `Actor.${name}`,
    name,
    type: "character",
    statuses: new Set(),
    system: {
      attributes: { reflexes: { value: reflexes } },
      skills: {},
    },
    getAttributeValue(key) {
      return Number(this.system.attributes?.[key]?.value ?? 0);
    },
    getPersonalCombatLoadout() {
      return armorDefense
        ? { activeArmor: { id: "armor", defenseBonus: armorDefense, isDestroyed: false } }
        : { activeArmor: null };
    },
  };
}

function machineActor({
  name = "Machine",
  type = "battlemech",
  statuses = [],
  handling = 4,
  system = 3,
  movement = { ground: 120 },
} = {}) {
  return {
    id: `${name}-id`,
    uuid: `Actor.${name}`,
    name,
    type,
    statuses: new Set(statuses),
    items: [],
    system: {
      attributes: {
        handling: { value: handling },
        system: { value: system },
      },
      movement,
      mwd: { crits: [], locations: {} },
    },
    getAttributeValue(key) {
      return Number(this.system.attributes?.[key]?.value ?? 0);
    },
  };
}

function token(id, actor, uuid = `Scene.scene.Token.${id}`) {
  return {
    id,
    uuid,
    name: actor.name,
    actor,
    center: { x: 0, y: 0 },
    document: { id, uuid, actor, name: actor.name },
  };
}

function combatant({ tokenId, targetUuid = "", detectionState = "contact", packet = null, moved = false } = {}) {
  return {
    id: `${tokenId}-combatant`,
    tokenId,
    actor: null,
    getFlag(scope, key) {
      if (scope !== "mwd") return {};
      if (key === "targeting") {
        return targetUuid
          ? { [targetUuid]: { detectionState, packet } }
          : {};
      }
      if (key === "personalCombat") {
        return moved
          ? { actionState: { move: { moved: true, movementKind: "run", round: 1 } } }
          : { actionState: {} };
      }
      return {};
    },
  };
}

test("combat awareness with no target shows modifier-only state and no weapon AR", () => {
  const actor = characterActor();
  installGlobals();

  const preview = buildCombatAwarenessPreview(actor, { targetTokens: [] });

  assert.equal(preview.targetState, "none");
  assert.equal(preview.target, null);
  assert.equal(preview.machineContext, null);
  assert.equal(preview.self.arTotal, 0);
  assert.equal(preview.self.arMods.length, 0);
  assert.equal(preview.self.drBase[0].label, "Self REF + REF");
  assert.equal(preview.self.drBase[0].value, 6);
  assert.equal(preview.self.drKnownTotal, 6);
  assert.equal(preview.warnings[0], "Select one target for DN, tracking, and target defense.");
});

test("combat awareness exposes character target REF defense and armor defense", () => {
  const actor = characterActor({ name: "Shooter" });
  const targetActor = characterActor({ name: "Guard", reflexes: 3, armorDefense: 2 });
  const targetToken = token("target", targetActor);
  installGlobals({ targetToken });

  const preview = buildCombatAwarenessPreview(actor, { targetTokens: [targetToken] });

  assert.equal(preview.targetState, "single");
  assert.equal(preview.target.name, "Guard");
  assert.equal(preview.target.defenseBase[0].label, "Target REF + REF");
  assert.equal(preview.target.defenseBase[0].value, 6);
  assert.equal(preview.target.armorDefense[0].label, "Armor Defense");
  assert.equal(preview.target.armorDefense[0].value, 2);
  assert.equal(preview.target.drTotalKnown, 8);
});

test("machine awareness shows range DN, motion DN, tracking dice, detection, and targeting data without weapon AR", () => {
  const actor = machineActor({ name: "Archer", statuses: ["braced"] });
  const targetActor = machineActor({ name: "Vindicator", statuses: ["entrenchedHullDown"], handling: 4, movement: { ground: 120 } });
  const sourceToken = token("source", actor);
  const targetToken = token("target", targetActor);
  const sourceCombatant = combatant({
    tokenId: sourceToken.id,
    targetUuid: targetToken.uuid,
    detectionState: "lock",
    packet: { id: "packet", value: 3, persistent: false, round: 1, expiresAfterRound: 1 },
  });
  sourceCombatant.actor = actor;
  const targetCombatant = combatant({ tokenId: targetToken.id, moved: true });
  targetCombatant.actor = targetActor;
  installGlobals({ sourceToken, targetToken, sourceCombatant, targetCombatant, distance: 60 });

  const preview = buildCombatAwarenessPreview(actor, {
    sourceToken,
    targetTokens: [targetToken],
  });

  assert.equal(preview.self.arMods.some(part => part.id === "machineState.attackAr" && part.value === 1), true);
  assert.equal(preview.self.drBase[0].label, "Self Handling + Handling");
  assert.equal(preview.self.drBase[0].value, 8);
  assert.equal(preview.machineContext.rangeBand, "near");
  assert.equal(preview.machineContext.rangeDn[0].label, "Base DN (Near)");
  assert.equal(preview.machineContext.rangeDn[0].value, 3);
  assert.equal(preview.machineContext.motionDn.some(part => part.id === "machineMotion.actions" && part.value === 2), true);
  assert.equal(preview.machineContext.trackingPenalty.some(part => part.id === "machineMotion.tracking" && part.value === -2), true);
  assert.equal(preview.machineContext.trackingPenalty.some(part => part.id === "ew.trackingPenalty" && part.value === -1), true);
  assert.equal(preview.machineContext.detectionStateLabel, "Lock");
  assert.equal(preview.machineContext.targetingDataSummary, "+3 available");
  assert.equal(preview.target.drMods.some(part => part.id === "machineState.defenseDr" && part.value === 5), true);
});

test("lock is context only and multiple targets suppress target-specific math", () => {
  const actor = machineActor({ name: "Archer" });
  const sourceToken = token("source", actor);
  const firstTarget = token("target-a", machineActor({ name: "Target A" }));
  const secondTarget = token("target-b", machineActor({ name: "Target B" }));
  const sourceCombatant = combatant({
    tokenId: sourceToken.id,
    targetUuid: firstTarget.uuid,
    detectionState: "lock",
    packet: null,
  });
  installGlobals({ sourceToken, targetToken: firstTarget, sourceCombatant });

  const single = buildCombatAwarenessPreview(actor, {
    sourceToken,
    targetTokens: [firstTarget],
  });
  assert.equal(single.machineContext.detectionStateLabel, "Lock");
  assert.equal(single.machineContext.rangeDn.some(part => /Lock/i.test(part.label)), false);
  assert.equal(single.machineContext.motionDn.some(part => /Lock/i.test(part.label)), false);
  assert.equal(single.machineContext.trackingPenalty.some(part => /Lock/i.test(part.label)), false);

  const multiple = buildCombatAwarenessPreview(actor, {
    sourceToken,
    targetTokens: [firstTarget, secondTarget],
  });
  assert.equal(multiple.targetState, "multiple");
  assert.equal(multiple.target, null);
  assert.equal(multiple.machineContext, null);
  assert.equal(multiple.warnings[0], "Select one target for detailed CQ awareness.");
});
