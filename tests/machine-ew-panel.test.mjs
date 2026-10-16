import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildMachineEwPanel, resolveMachineEwActionTarget } from "../src/modules/mwd/machine-ew-panel.js";
import { buildMachineEwActionChoices } from "../src/modules/mwd/machine-quick-actions.js";
import { cachePendingTokenPosition } from "../src/modules/mwd/token-measurement.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function createCombatant({ tokenId, targeting = {}, ewState = {}, moved = false } = {}) {
  return {
    tokenId,
    getFlag(scope, key) {
      if (scope !== "mwd") return null;
      if (key === "targeting") return targeting;
      if (key === "ewState") return ewState;
      if (key === "personalCombat") {
        return moved ? { actionState: { move: "advance" } } : { actionState: {} };
      }
      return null;
    },
  };
}

function createTargetToken({ id, uuid, name, statuses = [], disposition = -1, hidden = false, actorType = "vehicle" } = {}) {
  const token = {
    id,
    name,
    center: { x: 100, y: 0 },
    actor: {
      type: actorType,
      statuses: new Set(statuses),
    },
    document: {
      id,
      uuid,
      disposition,
      hidden,
    },
  };
  // Encounter enumeration resolves tokens through the combatant's document.
  token.document.object = token;
  token.document.actor = token.actor;
  return token;
}

function createEncounterCombatant(token, { moved = false } = {}) {
  const combatant = createCombatant({ tokenId: token?.document?.id ?? token?.id, moved });
  combatant.token = token?.document ?? null;
  return combatant;
}

function setSceneState({ targets = [], attackerCombatant = null, targetCombatants = [], round = 3 } = {}) {
  globalThis.game = {
    combat: {
      round,
      combatants: [
        ...(attackerCombatant ? [attackerCombatant] : []),
        ...targetCombatants,
      ],
    },
    user: {
      targets: new Set(targets),
    },
  };
}

function createAssetModule({ name = "Module", tags = [], capabilities = [], effects = [], enabled = true, state = {}, effectText = "", description = "" } = {}) {
  return {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    type: "assetModule",
    system: {
      enabled,
      tags,
      capabilities,
      state,
      effects,
      effectText,
      description,
    },
  };
}

function createMountedMechWeapon({ id = "weapon-1", name = "Weapon", keywords = [] } = {}) {
  return {
    id,
    name,
    type: "mechWeapon",
    system: {
      keywords,
    },
  };
}

function buildPanel({ system = 3, targets = [], attackerCombatant, targetCombatants = [], items = [], statuses = [] } = {}) {
  // Targets become encounter combatants so the panel exercises the real
  // encounter-enumeration path; explicit targetCombatants win on token id.
  const coveredTokenIds = new Set(targetCombatants.map(combatant => String(combatant?.tokenId ?? "").trim()));
  const encounterCombatants = [
    ...targetCombatants,
    ...targets
      .filter(target => !coveredTokenIds.has(String(target?.document?.id ?? target?.id ?? "").trim()))
      .map(target => createEncounterCombatant(target)),
  ];
  for (const combatant of targetCombatants) {
    if (combatant.token) continue;
    const match = targets.find(target => String(target?.document?.id ?? target?.id ?? "").trim() === String(combatant?.tokenId ?? "").trim());
    if (match) combatant.token = match.document;
  }
  setSceneState({ targets, attackerCombatant, targetCombatants: encounterCombatants });
  return buildMachineEwPanel({
    actor: {
      // Machine type keeps status mechanics (e.g. sensorBlind) applicable.
      type: "vehicle",
      items,
      statuses: new Set(statuses),
      system: {
        attributes: {
          system: { value: system },
        },
      },
    },
    token: { id: "attacker-token" },
  });
}

test("EW panel shows an empty state when the encounter has no eligible contacts", () => {
  const panel = buildPanel({
    attackerCombatant: createCombatant({ tokenId: "attacker-token" }),
  });

  assert.equal(panel.hasTargets, false);
  assert.equal(panel.rows.length, 0);
  assert.equal(panel.canAcquireAny, false);
  assert.equal(panel.canTargetAny, false);
  assert.match(panel.emptyState, /No eligible hostile contacts/i);
});

test("EW panel reports no active encounter when there is no combat", () => {
  globalThis.game = { user: { targets: new Set() } };
  const panel = buildMachineEwPanel({
    actor: { system: { attributes: { system: { value: 3 } } } },
    token: { id: "attacker-token" },
  });

  assert.equal(panel.rows.length, 0);
  assert.match(panel.emptyState, /No active encounter/i);
});

test("EW panel exposes Contact targets as acquire-ready but not targeting-ready", () => {
  const target = createTargetToken({
    id: "target-1",
    uuid: "Scene.scene.Token.target-1",
    name: "Enemy Contact",
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    targeting: {
      [target.document.uuid]: {
        detectionState: "contact",
        packet: null,
      },
    },
  });

  const panel = buildPanel({ targets: [target], attackerCombatant });
  const [row] = panel.rows;

  assert.equal(panel.canAcquireAny, true);
  assert.equal(panel.canTargetAny, false);
  assert.equal(row.detectionState, "contact");
  assert.equal(row.canAcquire, true);
  assert.equal(row.canTarget, false);
  assert.equal(row.acquireHint, "Acquire can upgrade to Track.");
  assert.equal(row.targetHint, "Targeting Data unavailable until Track.");
  assert.equal(row.acquireAction.enabled, true);
  assert.equal(row.targetAction.enabled, false);
  assert.deepEqual(row.compactActions.map(action => action.id), ["acquire", "target", "ecmSpike", "tagTarget"]);
  assert.equal(row.compactActions.find(action => action.id === "tagTarget")?.enabled, false);
  assert.match(row.compactActions.find(action => action.id === "tagTarget")?.title ?? "", /TAG asset module/i);
  assert.equal(row.compactActions.find(action => action.id === "acquire")?.dn, 2);
  assert.equal(row.compactActions.find(action => action.id === "target")?.dn, 2);
  assert.equal(row.compactActions.find(action => action.id === "ecmSpike")?.action, "machineEwAction");
  assert.match(panel.helpText, /automated Acquire and Fire Solution/i);
});

test("EW panel shows measured machine-scale range and distance for targets", () => {
  globalThis.canvas = {
    scene: {
      grid: {
        units: "m",
      },
    },
    grid: {
      measurePath(points) {
        const [source, target] = points;
        return { distance: Math.abs(Number(target?.x ?? 0) - Number(source?.x ?? 0)) };
      },
    },
  };

  const target = createTargetToken({
    id: "target-range",
    uuid: "Scene.scene.Token.target-range",
    name: "Enemy at Range",
  });
  target.center = { x: 140, y: 0 };

  const panel = buildMachineEwPanel({
    actor: {
      system: {
        attributes: {
          system: { value: 3 },
        },
      },
    },
    token: { id: "attacker-token", center: { x: 0, y: 0 } },
    targets: [target],
  });

  const [row] = panel.rows;
  assert.equal(row.hasRange, true);
  assert.equal(row.rangeBand, "near");
  assert.equal(row.rangeBandLabel, "Near");
  assert.equal(row.distanceLabel, "140 m");

  delete globalThis.canvas;
});

test("EW panel measures TokenDocument positions through current document coordinates", () => {
  globalThis.canvas = {
    scene: {
      grid: {
        units: "m",
      },
    },
    grid: {
      measurePath(points) {
        const [source, target] = points;
        return { distance: Math.abs(Number(target?.x ?? 0) - Number(source?.x ?? 0)) };
      },
    },
  };

  const target = createTargetToken({
    id: "target-document-range",
    uuid: "Scene.scene.Token.target-document-range",
    name: "Enemy at Current Range",
  });
  target.center = { x: 60, y: 0 };

  const panel = buildMachineEwPanel({
    actor: {
      system: {
        attributes: {
          system: { value: 3 },
        },
      },
    },
    token: {
      id: "attacker-token",
      x: 10,
      y: 0,
      object: {
        center: { x: 999, y: 0 },
        getCenterPoint: ({ x, y }) => ({ x, y }),
      },
    },
    targets: [target],
  });

  const [row] = panel.rows;
  assert.equal(row.hasRange, true);
  assert.equal(row.rangeBand, "close");
  assert.equal(row.distanceLabel, "50 m");

  delete globalThis.canvas;
});

test("EW panel uses pending token move coordinates before canvas centers refresh", () => {
  globalThis.canvas = {
    scene: {
      grid: {
        units: "m",
      },
    },
    grid: {
      measurePath(points) {
        const [source, target] = points;
        return { distance: Math.abs(Number(target?.x ?? 0) - Number(source?.x ?? 0)) };
      },
    },
  };

  const target = createTargetToken({
    id: "target-pending-range",
    uuid: "Scene.scene.Token.target-pending-range",
    name: "Enemy After Move",
  });
  target.center = { x: 60, y: 0 };
  target.document.x = 60;
  target.document.y = 0;
  target.object = {
    center: { x: 60, y: 0 },
    getCenterPoint: ({ x, y }) => ({ x, y }),
  };

  cachePendingTokenPosition(target.document, { x: 280 });

  const panel = buildMachineEwPanel({
    actor: {
      system: {
        attributes: {
          system: { value: 3 },
        },
      },
    },
    token: { id: "attacker-token", center: { x: 0, y: 0 } },
    targets: [target],
  });

  const [row] = panel.rows;
  assert.equal(row.hasRange, true);
  assert.equal(row.rangeBand, "far");
  assert.equal(row.distanceLabel, "280 m");

  delete globalThis.canvas;
});

test("EW panel shows capped targeting data and penalties for Track targets", () => {
  const target = createTargetToken({
    id: "target-2",
    uuid: "Scene.scene.Token.target-2",
    name: "Tracked Enemy",
    statuses: ["ecmShrouded"],
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    targeting: {
      [target.document.uuid]: {
        detectionState: "track",
        packet: { id: "packet-1", value: 5, round: 3, expiresAfterRound: 3 },
      },
    },
  });
  const targetCombatant = createCombatant({ tokenId: "target-2", moved: true });

  const panel = buildPanel({
    system: 3,
    targets: [target],
    attackerCombatant,
    targetCombatants: [targetCombatant],
  });
  const [row] = panel.rows;

  assert.equal(panel.canAcquireAny, true);
  assert.equal(panel.canTargetAny, true);
  assert.equal(row.hasPacket, true);
  assert.equal(row.packetValue, 3);
  assert.equal(row.packetCap, 3);
  assert.equal(row.trackingPenalty, 2);
  assert.equal(row.canAcquire, true);
  assert.equal(row.canTarget, true);
  assert.equal(row.acquireHint, "Acquire can upgrade to Lock.");
  assert.equal(row.targetHint, "Targeting Data available.");
  assert.equal(row.acquireAction.title, "Acquire can upgrade to Lock.");
  assert.equal(row.targetAction.title, "Targeting Data available.");
});

test("EW panel keeps blind targets informational only and lock targets optimized", () => {
  const blindTarget = createTargetToken({
    id: "target-3",
    uuid: "Scene.scene.Token.target-3",
    name: "Unseen Enemy",
  });
  const lockTarget = createTargetToken({
    id: "target-4",
    uuid: "Scene.scene.Token.target-4",
    name: "Locked Enemy",
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    targeting: {
      [lockTarget.document.uuid]: {
        detectionState: "lock",
        packet: null,
      },
    },
  });

  const panel = buildPanel({
    targets: [blindTarget, lockTarget],
    attackerCombatant,
  });
  const blindRow = panel.rows.find(row => row.targetTokenId === "target-3");
  const lockRow = panel.rows.find(row => row.targetTokenId === "target-4");

  assert.equal(blindRow.canAcquire, true);
  assert.equal(blindRow.canTarget, false);
  assert.equal(blindRow.acquireHint, "Acquire can establish Contact (DN 1).");
  assert.equal(blindRow.targetAction.title, "Track or Lock is required before generating targeting data.");
  assert.equal(lockRow.canAcquire, false);
  assert.equal(lockRow.canTarget, true);
  assert.equal(lockRow.acquireAction.title, "Target is already at Lock.");
  assert.equal(lockRow.targetHint, "Targeting solution optimized.");
});

test("EW panel enumerates eligible hostile encounter contacts without canvas targets", () => {
  const hostileB = createTargetToken({ id: "encounter-b", uuid: "Scene.scene.Token.encounter-b", name: "Enemy Atlas" });
  const hostileA = createTargetToken({ id: "encounter-a", uuid: "Scene.scene.Token.encounter-a", name: "Enemy Marauder" });
  const neutral = createTargetToken({ id: "encounter-n", uuid: "Scene.scene.Token.encounter-n", name: "Bystander", disposition: 0 });
  const hidden = createTargetToken({ id: "encounter-h", uuid: "Scene.scene.Token.encounter-h", name: "Ambusher", hidden: true });
  const person = createTargetToken({ id: "encounter-p", uuid: "Scene.scene.Token.encounter-p", name: "Infantry", actorType: "character" });

  setSceneState({
    targets: [],
    attackerCombatant: createCombatant({ tokenId: "attacker-token" }),
    targetCombatants: [hostileB, hostileA, neutral, hidden, person].map(token => createEncounterCombatant(token)),
  });
  const panel = buildMachineEwPanel({
    actor: { system: { attributes: { system: { value: 3 } } } },
    token: { id: "attacker-token" },
  });

  assert.deepEqual(panel.rows.map(row => row.targetTokenId), ["encounter-a", "encounter-b"]);
  const [rowA, rowB] = panel.rows;
  assert.equal(rowA.identityMasked, true);
  assert.equal(rowA.displayName, "Unknown Contact A");
  assert.equal(rowA.tokenName, "Unknown Contact A");
  assert.equal(rowB.displayName, "Unknown Contact B");
  assert.equal(rowA.distanceVisible, false);
  assert.equal(rowA.exactDistanceVisible, false);
  assert.equal(rowA.hasTrackingPenalty, false);
  assert.equal(rowA.canAcquire, true);
  assert.equal(panel.canAcquireAny, true);
});

test("EW panel reveals identity and band at Contact and exact distance only from Track", () => {
  globalThis.canvas = {
    scene: { grid: { units: "m" } },
    grid: {
      measurePath(points) {
        const [source, target] = points;
        return { distance: Math.abs(Number(target?.x ?? 0) - Number(source?.x ?? 0)) };
      },
    },
  };

  const contactTarget = createTargetToken({ id: "mask-contact", uuid: "Scene.scene.Token.mask-contact", name: "Enemy Contact" });
  contactTarget.center = { x: 140, y: 0 };
  const trackTarget = createTargetToken({ id: "mask-track", uuid: "Scene.scene.Token.mask-track", name: "Tracked Enemy" });
  trackTarget.center = { x: 200, y: 0 };
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    targeting: {
      [contactTarget.document.uuid]: { detectionState: "contact", packet: null },
      [trackTarget.document.uuid]: { detectionState: "track", packet: null },
    },
  });

  setSceneState({
    attackerCombatant,
    targetCombatants: [contactTarget, trackTarget].map(token => createEncounterCombatant(token)),
  });
  const panel = buildMachineEwPanel({
    actor: { system: { attributes: { system: { value: 3 } } } },
    token: { id: "attacker-token", center: { x: 0, y: 0 } },
  });

  const contactRow = panel.rows.find(row => row.targetTokenId === "mask-contact");
  const trackRow = panel.rows.find(row => row.targetTokenId === "mask-track");
  assert.equal(contactRow.identityMasked, false);
  assert.equal(contactRow.displayName, "Enemy Contact");
  assert.equal(contactRow.distanceVisible, true);
  assert.equal(contactRow.exactDistanceVisible, false);
  assert.equal(trackRow.exactDistanceVisible, true);
  assert.equal(trackRow.distanceLabel, "200 m");

  delete globalThis.canvas;
});

test("EW panel gates acquisition and annotates held states when the observer is Sensor Blind", () => {
  // No canvas measurement in this test, so every contact counts as beyond Close.
  const blindTarget = createTargetToken({ id: "sb-blind", uuid: "Scene.scene.Token.sb-blind", name: "Distant Enemy" });
  const trackTarget = createTargetToken({ id: "sb-track", uuid: "Scene.scene.Token.sb-track", name: "Held Track" });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    targeting: {
      [trackTarget.document.uuid]: { detectionState: "track", packet: null },
    },
  });

  const panel = buildPanel({
    targets: [blindTarget, trackTarget],
    attackerCombatant,
    statuses: ["sensorBlind"],
  });

  assert.equal(panel.sensorBlind, true);
  assert.match(panel.observerNotice, /Sensor Blind/i);
  const blindRow = panel.rows.find(row => row.targetTokenId === "sb-blind");
  const trackRow = panel.rows.find(row => row.targetTokenId === "sb-track");
  assert.equal(blindRow.canAcquire, false);
  assert.match(blindRow.acquireAction.title, /Close range/i);
  assert.equal(trackRow.detectionState, "track");
  assert.equal(trackRow.liveFeedAvailable, false);
  assert.match(trackRow.liveFeedNotice, /live sensor feed unavailable/i);
  assert.equal(trackRow.canTarget, false);
  assert.match(trackRow.targetAction.title, /targeting data/i);
});

test("EW action target selection chooses the first eligible targeted token", () => {
  const panel = {
    rows: [
      { targetTokenId: "blind", canAcquire: false, canTarget: false },
      { targetTokenId: "contact", canAcquire: true, canTarget: false },
      { targetTokenId: "track", canAcquire: true, canTarget: true },
    ],
  };

  assert.equal(resolveMachineEwActionTarget(panel, "acquire")?.targetTokenId, "contact");
  assert.equal(resolveMachineEwActionTarget(panel, "targeting")?.targetTokenId, "track");
  assert.equal(resolveMachineEwActionTarget(panel, "acquireTarget")?.targetTokenId, "contact");
  assert.equal(resolveMachineEwActionTarget(panel, "generateFireSolution")?.targetTokenId, "track");
});

test("EW quick action menu exposes canonical player-facing actions", () => {
  const target = createTargetToken({
    id: "target-1",
    uuid: "Scene.scene.Token.target-1",
    name: "Tracked Target",
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    targeting: {
      [target.document.uuid]: { detectionState: "track" },
    },
  });
  setSceneState({ targets: [target], attackerCombatant, targetCombatants: [createEncounterCombatant(target)] });

  const actions = buildMachineEwActionChoices({
    system: { attributes: { system: { value: 3 } } },
  }, {
    token: { id: "attacker-token" },
    includeDisabled: true,
  });

  assert.deepEqual(actions.map(action => action.id), [
    "sensorSweep",
    "acquireTarget",
    "generateFireSolution",
    "spotIndirect",
    "ecmSpike",
    "epmFilter",
    "breakLock",
    "defensiveJink",
    "suppressBeacon",
    "swat",
    "tagTarget",
    "narcTarget",
    "shareTargetingData",
  ]);
  assert.equal(actions.find(action => action.id === "acquireTarget")?.intent, "acquireTarget");
  assert.equal(actions.find(action => action.id === "generateFireSolution")?.intent, "generateFireSolution");
  assert.equal(actions.find(action => action.id === "spotIndirect")?.intent, "spotIndirect");
  assert.equal(actions.find(action => action.id === "generateFireSolution")?.disabled, false);
});

test("EW TAG and C3 actions are enabled only by mounted gear", () => {
  const target = createTargetToken({
    id: "target-1",
    uuid: "Scene.scene.Token.target-1",
    name: "Tracked Target",
  });
  const attackerCombatant = createCombatant({
    tokenId: "attacker-token",
    targeting: {
      [target.document.uuid]: { detectionState: "track" },
    },
  });
  setSceneState({ targets: [target], attackerCombatant, targetCombatants: [createEncounterCombatant(target)] });

  const actionsWithoutModules = buildMachineEwActionChoices({
    items: [],
    system: { attributes: { system: { value: 3 } } },
  }, {
    token: { id: "attacker-token" },
    includeDisabled: true,
  });
  assert.equal(actionsWithoutModules.find(action => action.id === "tagTarget")?.disabled, true);
  assert.match(actionsWithoutModules.find(action => action.id === "tagTarget")?.reason ?? "", /TAG Designator/i);
  assert.equal(actionsWithoutModules.find(action => action.id === "shareTargetingData")?.disabled, true);
  assert.match(actionsWithoutModules.find(action => action.id === "shareTargetingData")?.reason ?? "", /C3 asset module/i);

  const actionsWithModules = buildMachineEwActionChoices({
    items: [
      createMountedMechWeapon({ id: "tag-weapon", name: "TAG Designator", keywords: ["tag"] }),
      createAssetModule({ name: "C3 Network", tags: ["c3"] }),
    ],
    system: {
      attributes: { system: { value: 3 } },
      mwd: { hardpoints: [{ id: "support-1", itemId: "tag-weapon" }] },
    },
  }, {
    token: { id: "attacker-token" },
    includeDisabled: true,
  });
  assert.equal(actionsWithModules.find(action => action.id === "tagTarget")?.disabled, false);
  assert.equal(actionsWithModules.find(action => action.id === "shareTargetingData")?.disabled, false);

  const actionsWithInactiveC3 = buildMachineEwActionChoices({
    items: [
      createMountedMechWeapon({ id: "tag-weapon", name: "TAG Designator", keywords: ["tag"] }),
      createAssetModule({ name: "C3 Network", tags: ["c3"], enabled: false }),
    ],
    system: { attributes: { system: { value: 3 } } },
  }, {
    token: { id: "attacker-token" },
    includeDisabled: true,
  });
  assert.equal(actionsWithInactiveC3.find(action => action.id === "shareTargetingData")?.disabled, true);
});

test("EW quick action menu keeps unavailable target-gated actions visible with reasons", () => {
  setSceneState({ targets: [], attackerCombatant: createCombatant({ tokenId: "attacker-token" }) });

  const actions = buildMachineEwActionChoices({
    system: { attributes: { system: { value: 3 } } },
  }, {
    token: { id: "attacker-token" },
    includeDisabled: true,
  });

  assert.equal(actions.find(action => action.id === "sensorSweep")?.disabled, false);
  assert.equal(actions.find(action => action.id === "acquireTarget")?.disabled, true);
  assert.match(actions.find(action => action.id === "acquireTarget")?.reason ?? "", /detection state/i);
  assert.equal(actions.find(action => action.id === "spotIndirect")?.disabled, true);
  assert.match(actions.find(action => action.id === "spotIndirect")?.reason ?? "", /before spotting for indirect fire/i);
  assert.equal(actions.find(action => action.id === "tagTarget")?.disabled, true);
  assert.match(actions.find(action => action.id === "tagTarget")?.reason ?? "", /TAG Designator/i);
});

test("machine layouts surface EW controls through combat awareness on battlemech and vehicle sheets", async () => {
  const [battlemechLayoutRaw, vehicleLayoutRaw, combatAwarenessRaw] = await Promise.all([
    readFile(path.join(repoRoot, "templates/v2/layouts/battlemech.layout.json"), "utf8"),
    readFile(path.join(repoRoot, "templates/v2/layouts/vehicle.layout.json"), "utf8"),
    readFile(path.join(repoRoot, "templates/v2/ui/combat-awareness-preview.hbs"), "utf8"),
  ]);

  assert.match(battlemechLayoutRaw, /"partial": "mwd\.v2\.ui\.combat-awareness-preview"/);
  assert.match(vehicleLayoutRaw, /"partial": "mwd\.v2\.ui\.combat-awareness-preview"/);
  assert.match(combatAwarenessRaw, /data-action="\{\{action\.action\}\}"/);
  assert.match(combatAwarenessRaw, /row\.compactActions/);
});
